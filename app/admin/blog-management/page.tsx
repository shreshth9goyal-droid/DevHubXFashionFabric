"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { toast } from "@/hooks/use-toast"
import { Pencil, Trash2, Plus, ArrowLeft, Eye, Upload, X, Heading2, Image as ImageIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image: string
  category: string
  author: string
  published: boolean
  createdAt: string
  updatedAt: string
  publishedAt: string | null
}

export default function BlogManagementPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [postToDelete, setPostToDelete] = useState<string | null>(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [uploadingContentImage, setUploadingContentImage] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    image: "",
    category: "TRENDS",
    author: "Deepak Goyal",
    published: true,
    publishedAt: "",
  })

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login")
    } else if (status === "authenticated") {
      fetchBlogPosts()
    }
  }, [status, router])

  const fetchBlogPosts = async () => {
    try {
      const response = await fetch("/api/blog?includeUnpublished=true")
      if (response.ok) {
        const data = await response.json()
        setBlogPosts(data)
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch blog posts",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error fetching blog posts:", error)
      toast({
        title: "Error",
        description: "An error occurred while fetching blog posts",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "title" && !isEditing ? { slug: generateSlug(value) } : {}),
    }))

    // Update image preview when URL changes
    if (name === "image") {
      setImagePreview(value)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file",
        description: "Please upload an image file",
        variant: "destructive",
      })
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB",
        variant: "destructive",
      })
      return
    }

    setUploadingImage(true)

    try {
      const uploadFormData = new FormData()
      uploadFormData.append("file", file)
      uploadFormData.append("type", "image")

      const response = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData,
      })

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      const data = await response.json()

      setFormData((prev) => ({ ...prev, image: data.url }))
      setImagePreview(data.url)

      toast({
        title: "Success",
        description: "Image uploaded successfully",
      })
    } catch (error) {
      console.error("Error uploading image:", error)
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      })
    } finally {
      setUploadingImage(false)
      // Reset file input
      e.target.value = ""
    }
  }

  const clearImage = () => {
    setFormData((prev) => ({ ...prev, image: "" }))
    setImagePreview("")
  }

  const insertHeader = () => {
    const textarea = document.getElementById("content") as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = formData.content.substring(start, end)
    const headerText = selectedText || "Header Text"

    const beforeText = formData.content.substring(0, start)
    const afterText = formData.content.substring(end)

    const newContent = `${beforeText}\n\n## ${headerText}\n\n${afterText}`

    setFormData((prev) => ({ ...prev, content: newContent }))

    // Set cursor position after the inserted header
    setTimeout(() => {
      textarea.focus()
      const newPosition = start + 5 + headerText.length
      textarea.setSelectionRange(newPosition, newPosition)
    }, 0)
  }

  const handleContentImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file",
        description: "Please upload an image file",
        variant: "destructive",
      })
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB",
        variant: "destructive",
      })
      return
    }

    setUploadingContentImage(true)

    try {
      const uploadFormData = new FormData()
      uploadFormData.append("file", file)
      uploadFormData.append("type", "image")

      const response = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData,
      })

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      const data = await response.json()

      // Insert image markdown at cursor position
      const textarea = document.getElementById("content") as HTMLTextAreaElement
      if (textarea) {
        const start = textarea.selectionStart
        const beforeText = formData.content.substring(0, start)
        const afterText = formData.content.substring(start)

        const imageMarkdown = `\n\n![Image](${data.url})\n\n`
        const newContent = `${beforeText}${imageMarkdown}${afterText}`

        setFormData((prev) => ({ ...prev, content: newContent }))

        // Set cursor position after the inserted image
        setTimeout(() => {
          textarea.focus()
          const newPosition = start + imageMarkdown.length
          textarea.setSelectionRange(newPosition, newPosition)
        }, 0)
      }

      toast({
        title: "Success",
        description: "Image uploaded and inserted successfully",
      })
    } catch (error) {
      console.error("Error uploading image:", error)
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      })
    } finally {
      setUploadingContentImage(false)
      // Reset file input
      e.target.value = ""
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = "/api/blog"
      const method = isEditing ? "PUT" : "POST"
      const body = isEditing ? { id: editingPost?.id, ...formData } : formData

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: `Blog post ${isEditing ? "updated" : "created"} successfully`,
        })
        resetForm()
        fetchBlogPosts()
      } else {
        const error = await response.json()
        toast({
          title: "Error",
          description: error.error || `Failed to ${isEditing ? "update" : "create"} blog post`,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error saving blog post:", error)
      toast({
        title: "Error",
        description: "An error occurred while saving the blog post",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (post: BlogPost) => {
    setIsEditing(true)
    setEditingPost(post)
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      image: post.image,
      category: post.category,
      author: post.author,
      published: post.published,
      publishedAt: post.publishedAt ? new Date(post.publishedAt).toISOString().split('T')[0] : "",
    })
    setImagePreview(post.image)
  }

  const handleDelete = async () => {
    if (!postToDelete) return

    setLoading(true)
    try {
      const response = await fetch(`/api/blog?id=${postToDelete}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Blog post deleted successfully",
        })
        fetchBlogPosts()
      } else {
        toast({
          title: "Error",
          description: "Failed to delete blog post",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error deleting blog post:", error)
      toast({
        title: "Error",
        description: "An error occurred while deleting the blog post",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
      setDeleteDialogOpen(false)
      setPostToDelete(null)
    }
  }

  const resetForm = () => {
    setIsEditing(false)
    setEditingPost(null)
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      image: "",
      category: "BLOG",
      author: "BLOGUSER",
      published: false,
      publishedAt: "",
    })
    setImagePreview("")
  }

  if (status === "loading" || loading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-center">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    )
  }

  if (status === "unauthenticated") {
    return null
  }

  return (
    <div className="container mx-auto py-4 px-4 md:py-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-neutral-800">Blog Management</h1>
        <Button asChild variant="outline" className="w-fit">
          <Link href="/admin" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      {/* Create/Edit Form */}
      <Card className="mb-6 md:mb-8">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">{isEditing ? "Edit Blog Post" : "Create New Blog Post"}</CardTitle>
          <CardDescription className="text-sm">
            {isEditing ? "Update the blog post details below" : "Fill in the details to create a new blog post"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter blog post title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  required
                  placeholder="blog-post-slug"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt *</Label>
              <Textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                required
                placeholder="Brief description of the blog post"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content *</Label>

              {/* Formatting Toolbar */}
              <div className="flex gap-2 p-2 bg-neutral-50 border rounded-md">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={insertHeader}
                  title="Insert Highlighted Header"
                  className="flex items-center gap-2"
                >
                  <Heading2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Add Header</span>
                </Button>

                <div className="relative">
                  <Input
                    type="file"
                    id="contentImageUpload"
                    accept="image/*"
                    onChange={handleContentImageUpload}
                    disabled={uploadingContentImage}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById("contentImageUpload")?.click()}
                    disabled={uploadingContentImage}
                    title="Upload and Insert Image"
                    className="flex items-center gap-2"
                  >
                    <ImageIcon className="h-4 w-4" />
                    <span className="hidden sm:inline">
                      {uploadingContentImage ? "Uploading..." : "Add Image"}
                    </span>
                  </Button>
                </div>
              </div>

              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                required
                placeholder="Write your article content here..."
                rows={15}
                className="text-base leading-relaxed font-mono"
              />
              <div className="text-sm text-neutral-600 space-y-1 bg-blue-50 p-3 rounded-md border border-blue-200">
                <p className="font-semibold text-blue-900">Formatting Guide:</p>
                <ul className="list-disc list-inside space-y-1 text-blue-800">
                  <li><code className="bg-blue-100 px-1 rounded">## Header Text</code> - Creates a highlighted header</li>
                  <li><code className="bg-blue-100 px-1 rounded">![Image](url)</code> - Inserts an image (auto-added when you upload)</li>
                  <li>Use the buttons above to easily insert headers and images</li>
                  <li>Line breaks will be preserved automatically</li>
                </ul>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Image *</Label>
              <div className="space-y-3">
                {/* Image Preview */}
                {imagePreview && (
                  <div className="relative">
                    <div className="relative h-48 w-full rounded-lg overflow-hidden border">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={clearImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}

                {/* Upload Button */}
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Input
                      type="file"
                      id="imageUpload"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => document.getElementById("imageUpload")?.click()}
                      disabled={uploadingImage}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      {uploadingImage ? "Uploading..." : "Upload Image"}
                    </Button>
                  </div>
                </div>

                {/* URL Input */}
                <div className="space-y-1">
                  <Label htmlFor="image" className="text-sm text-neutral-600">Or enter image URL</Label>
                  <Input
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    required
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <p className="text-xs text-neutral-500">
                  Upload an image (max 5MB) or provide a URL. Supported formats: JPG, PNG, GIF, WebP
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <div className="flex gap-2">
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TRENDS">TRENDS</SelectItem>
                      <SelectItem value="GUIDES">GUIDES</SelectItem>
                      <SelectItem value="NEWS">NEWS</SelectItem>
                      <SelectItem value="BLOG">GENERAL BLOG</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  placeholder="BLOGUSER"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="publishedAt">Publish Date (Optional)</Label>
              <Input
                type="date"
                id="publishedAt"
                name="publishedAt"
                value={formData.publishedAt}
                onChange={handleInputChange}
                placeholder="Select publish date"
              />
              <p className="text-sm text-neutral-500">
                Leave empty to use current date when publishing. This date will be shown on the blog post.
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="published"
                checked={formData.published}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, published: checked }))
                }
              />
              <Label htmlFor="published">Publish immediately</Label>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Button type="submit" disabled={loading} className="w-full sm:w-auto">
                {loading ? "Saving..." : isEditing ? "Update Blog Post" : "Create Blog Post"}
              </Button>
              {isEditing && (
                <Button type="button" variant="outline" onClick={resetForm} className="w-full sm:w-auto">
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Blog Posts List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">All Blog Posts</CardTitle>
          <CardDescription className="text-sm">Manage your existing blog posts</CardDescription>
        </CardHeader>
        <CardContent>
          {blogPosts.length === 0 ? (
            <p className="text-center text-neutral-500 py-8">No blog posts yet. Create your first one above!</p>
          ) : (
            <div className="space-y-4">
              {blogPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 md:p-4 border rounded-lg hover:bg-neutral-50 transition-colors gap-3"
                >
                  <div className="flex items-start gap-3 md:gap-4 flex-1">
                    <div className="relative h-16 w-24 sm:h-20 sm:w-32 rounded overflow-hidden flex-shrink-0">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                        <h3 className="font-semibold text-base md:text-lg truncate">{post.title}</h3>
                        {post.published ? (
                          <span className="text-xs bg-green-100 text-[#00712C] px-2 py-1 rounded w-fit">
                            Published
                          </span>
                        ) : (
                          <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded w-fit">
                            Draft
                          </span>
                        )}
                      </div>
                      <p className="text-xs md:text-sm text-neutral-600 mb-2 line-clamp-2">{post.excerpt}</p>
                      <div className="text-xs text-neutral-500 flex flex-col sm:flex-row sm:items-center gap-1">
                        <span className="truncate">Slug: {post.slug}</span>
                        <span className="hidden sm:inline mx-2">•</span>
                        <span className="whitespace-nowrap">Created: {new Date(post.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end sm:justify-start">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(`/blog/${post.slug}`, "_blank")}
                      className="flex-1 sm:flex-none"
                    >
                      <Eye className="h-4 w-4" />
                      <span className="ml-1 sm:hidden">View</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(post)}
                      className="flex-1 sm:flex-none"
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="ml-1 sm:hidden">Edit</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        setPostToDelete(post.id)
                        setDeleteDialogOpen(true)
                      }}
                      className="flex-1 sm:flex-none"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="ml-1 sm:hidden">Delete</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="max-w-[90%] sm:max-w-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg md:text-xl">Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-sm">
              This action cannot be undone. This will permanently delete the blog post.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            <AlertDialogCancel onClick={() => setPostToDelete(null)} className="w-full sm:w-auto">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700 w-full sm:w-auto">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
