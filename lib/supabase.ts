import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

// Create a Supabase client with service role key for server-side operations
// This is initialized safely to prevent build-time crashes
export const supabaseAdmin = (supabaseUrl && supabaseServiceRoleKey) 
  ? createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : null as any

// Create a Supabase client for client-side operations
export const createSupabaseClient = () => {
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Supabase client-side credentials missing")
  }
  return createClient(supabaseUrl, supabaseAnonKey)
}

/**
 * Upload a file to Supabase Storage
 * @param file - File to upload
 * @param bucket - Storage bucket name (e.g., "catalogue-images", "catalogue-pdfs")
 * @param path - Path within the bucket
 * @returns Public URL of the uploaded file
 */
export async function uploadToSupabase(
  file: File | Buffer,
  bucket: string,
  path: string
): Promise<string> {
  try {
    // Validate environment variables
    if (!supabaseUrl || !supabaseServiceRoleKey) {
      throw new Error("Supabase credentials are not configured. Check your .env file.")
    }

    const fileBuffer = file instanceof File
      ? Buffer.from(await file.arrayBuffer())
      : file

    console.log(`Uploading to Supabase: bucket="${bucket}", path="${path}"`)

    // Ensure bucket exists (or at least try to use the single 'catalogue' bucket)
    const targetBucket = "catalogue" // Single bucket for all files
    
    // Upload file to Supabase Storage
    const { data, error } = await supabaseAdmin.storage
      .from(targetBucket)
      .upload(path, fileBuffer, {
        contentType: file instanceof File ? file.type : 'application/octet-stream',
        upsert: true
      })

    if (error) {
      console.error("Supabase upload error:", error)

      // If bucket not found, try to create it (only works with service role key)
      if (error.message.includes("Bucket not found")) {
        console.log(`Bucket "${targetBucket}" not found, attempting to create it...`)
        try {
          const { error: createError } = await supabaseAdmin.storage.createBucket(targetBucket, {
            public: true
          })
          if (!createError) {
             // Retry upload once
             const { data: retryData, error: retryError } = await supabaseAdmin.storage
               .from(targetBucket)
               .upload(path, fileBuffer, {
                 contentType: file instanceof File ? file.type : 'application/octet-stream',
                 upsert: true
               })
             if (!retryError) return supabaseAdmin.storage.from(targetBucket).getPublicUrl(retryData.path).data.publicUrl
          }
        } catch (e) {
          console.error("Failed to auto-create bucket:", e)
        }
        throw new Error(`Storage bucket "${targetBucket}" does not exist. Please create it manually in Supabase as a "Public" bucket.`)
      }

      if (error.message.includes("Access denied") || error.message.includes("permission")) {
        throw new Error(`Access denied to bucket "${targetBucket}". Check your storage policies.`)
      }

      throw new Error(`Upload failed: ${error.message}`)
    }

    console.log("Upload successful, getting public URL...")

    // Get public URL
    const { data: { publicUrl } } = supabaseAdmin.storage
      .from(targetBucket)
      .getPublicUrl(data.path)

    console.log(`File uploaded successfully: ${publicUrl}`)

    return publicUrl
  } catch (error: any) {
    console.error("Error uploading to Supabase:", error)
    throw error
  }
}

/**
 * Delete a file from Supabase Storage
 * @param bucket - Storage bucket name
 * @param path - Path of the file to delete
 */
export async function deleteFromSupabase(
  bucket: string,
  path: string
): Promise<void> {
  try {
    const { error } = await supabaseAdmin.storage
      .from(bucket)
      .remove([path])

    if (error) {
      console.error("Supabase delete error:", error)
      throw new Error(`Delete failed: ${error.message}`)
    }
  } catch (error) {
    console.error("Error deleting from Supabase:", error)
    throw error
  }
}

/**
 * List files in a Supabase Storage bucket
 * @param bucket - Storage bucket name
 * @param path - Path within the bucket (optional)
 */
export async function listSupabaseFiles(
  bucket: string,
  path?: string
) {
  try {
    const { data, error } = await supabaseAdmin.storage
      .from(bucket)
      .list(path, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'created_at', order: 'desc' }
      })

    if (error) {
      console.error("Supabase list error:", error)
      throw new Error(`List failed: ${error.message}`)
    }

    return data
  } catch (error) {
    console.error("Error listing Supabase files:", error)
    throw error
  }
}
