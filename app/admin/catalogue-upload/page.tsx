"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import { Loader2, Trash2, Edit, LogOut, Download as DownloadIcon, TrendingUp, Eye, BookOpen, KeyRound, ArrowLeft } from "lucide-react"
import { signOut } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"

interface Catalogue {
  id: string
  title: string
  subtitle: string
  description?: string | null
  category: string
  coverImage: string
  pdfUrl: string
  color: string
  published: boolean
  _count?: {
    downloads: number
  }
}

interface Download {
  id: string
  userName: string | null
  userEmail: string | null
  userPhone: string | null
  ipAddress: string | null
  downloadedAt: string
  catalogue: {
    title: string
    category: string
  }
}

export default function AdminCatalogueUploadPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [catalogues, setCatalogues] = useState<Catalogue[]>([])
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [viewDownloadsId, setViewDownloadsId] = useState<string | null>(null)
  const [downloads, setDownloads] = useState<Download[]>([])
  const [downloadCount, setDownloadCount] = useState(0)
  const [totalDownloads, setTotalDownloads] = useState(0)

  // Form state
  const [title, setTitle] = useState("")
  const [subtitle, setSubtitle] = useState("")
  const [description, setDescription] = useState("")
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [category, setCategory] = useState("Hospitality")
  const [color, setColor] = useState("bg-neutral-100")
  const [published, setPublished] = useState(true)
  const [uploadingPdf, setUploadingPdf] = useState(false)
  const [uploadingCover, setUploadingCover] = useState(false)

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login")
    } else if (status === "authenticated" && (session?.user as any)?.role !== "admin") {
      toast.error("Unauthorized - Admin access required")
      router.push("/")
    }
  }, [status, session, router])

  // Fetch catalogues
  const fetchCatalogues = async () => {
    try {
      const response = await fetch("/api/catalogue/downloads")
      if (response.ok) {
        const data = await response.json()
        setCatalogues(data.catalogues)
        setTotalDownloads(data.totalDownloads)
      }
    } catch (error) {
      console.error("Error fetching catalogues:", error)
    }
  }

  const fetchCatalogueDownloads = async (catalogueId: string) => {
    try {
      const response = await fetch(`/api/catalogue/${catalogueId}/downloads`)
      if (response.ok) {
        const data = await response.json()
        setDownloads(data.downloads)
        setDownloadCount(data.count)
      }
    } catch (error) {
      console.error("Error fetching downloads:", error)
      toast.error("Failed to load download details")
    }
  }

  const handleViewDownloads = async (catalogueId: string) => {
    setViewDownloadsId(catalogueId)
    await fetchCatalogueDownloads(catalogueId)
  }

  useEffect(() => {
    if (status === "authenticated" && (session?.user as any)?.role === "admin") {
      fetchCatalogues()
    }
  }, [status, session])

  const uploadFile = async (file: File, type: "pdf" | "image") => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("type", type)

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error("Upload failed")
    }

    const data = await response.json()
    return data.url
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Upload files
      let pdfUrl = ""
      let coverImageUrl = ""
      let catalogueId = editingId

      if (!editingId) {
        // New catalogue - files are required
        if (!pdfFile || !coverFile) {
          toast.error("Please upload both PDF and cover image")
          setIsLoading(false)
          return
        }

        setUploadingPdf(true)
        pdfUrl = await uploadFile(pdfFile, "pdf")
        setUploadingPdf(false)

        setUploadingCover(true)
        coverImageUrl = await uploadFile(coverFile, "image")
        setUploadingCover(false)
      } else {
        // Editing - files are optional
        if (pdfFile) {
          setUploadingPdf(true)
          pdfUrl = await uploadFile(pdfFile, "pdf")
          setUploadingPdf(false)
        }

        if (coverFile) {
          setUploadingCover(true)
          coverImageUrl = await uploadFile(coverFile, "image")
          setUploadingCover(false)
        }
      }

      // Create or update catalogue
      const catalogueData = {
        title,
        subtitle,
        description: description || null,
        category,
        ...(pdfUrl && { pdfUrl }),
        ...(coverImageUrl && { coverImage: coverImageUrl }),
        color,
        published,
      }

      const url = editingId ? `/api/catalogue/${editingId}` : "/api/catalogue"
      const method = editingId ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(catalogueData),
      })

      if (!response.ok) {
        throw new Error("Failed to save catalogue")
      }

      const savedCatalogue = await response.json()
      catalogueId = savedCatalogue.id

      // If a new PDF was uploaded, convert it to images for page flip
      if (pdfUrl && catalogueId) {
        toast.info("Converting PDF pages for flip view...")

        try {
          const convertResponse = await fetch("/api/catalogue/convert-pdf", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              pdfUrl: pdfUrl,
              catalogueId: catalogueId,
            }),
          })

          if (convertResponse.ok) {
            const convertData = await convertResponse.json()
            console.log(`PDF processed: ${convertData.numPages} pages ready`)
          } else {
            const errorData = await convertResponse.json().catch(() => ({}))
            console.warn("PDF conversion note:", errorData.error || "Limited flipbook support")
          }
        } catch (convertError) {
          console.warn("PDF helper note:", convertError)
        }
      }

      toast.success(editingId ? "Catalogue updated successfully!" : "Catalogue created successfully!")

      // Reset form
      setTitle("")
      setSubtitle("")
      setDescription("")
      setPdfFile(null)
      setCoverFile(null)
      setColor("bg-neutral-100")
      setEditingId(null)

      // Refresh catalogues
      fetchCatalogues()
    } catch (error) {
      console.error("Error saving catalogue:", error)
      toast.error("Failed to save catalogue")
    } finally {
      setIsLoading(false)
      setUploadingPdf(false)
      setUploadingCover(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/catalogue/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete catalogue")
      }

      toast.success("Catalogue deleted successfully!")
      fetchCatalogues()
    } catch (error) {
      console.error("Error deleting catalogue:", error)
      toast.error("Failed to delete catalogue")
    } finally {
      setDeleteId(null)
    }
  }

  const handleEdit = (catalogue: Catalogue) => {
    setEditingId(catalogue.id)
    setTitle(catalogue.title)
    setSubtitle(catalogue.subtitle || "")
    setDescription(catalogue.description || "")
    setCategory(catalogue.category || "Hospitality")
    setPublished(catalogue.published !== undefined ? catalogue.published : true)
    setColor(catalogue.color)
    toast.info(`Editing: ${catalogue.title}`)
    // Scroll to form
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setTitle("")
    setSubtitle("")
    setDescription("")
    setPdfFile(null)
    setCoverFile(null)
    setColor("bg-neutral-100")
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" })
  }

  // Show loading while checking authentication
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  // Only render if authenticated and admin
  if (status !== "authenticated" || (session?.user as any)?.role !== "admin") {
    return null
  }

  const colorOptions = [
    { value: "bg-neutral-100", label: "Neutral" },
    { value: "bg-amber-50", label: "Amber" },
    { value: "bg-blue-100", label: "Blue" },
    { value: "bg-green-100", label: "Green" },
    { value: "bg-orange-50", label: "Orange" },
    { value: "bg-purple-50", label: "Purple" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-amber-50/20 to-neutral-50">
      <div className="container mx-auto px-4 py-4 md:py-12">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-6 md:mb-12">
          <Button
            asChild
            variant="outline"
            className="gap-2 w-fit"
          >
            <Link href="/admin">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-2">
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight">
                Catalogue Management
              </h1>
              <div className="flex items-center gap-3 text-neutral-600">
                <div className="flex items-center gap-2 bg-white px-3 md:px-4 py-2 rounded-full shadow-sm border border-neutral-200">
                  <DownloadIcon className="h-4 w-4 text-[#00712C]" />
                  <span className="text-xs md:text-sm font-medium">Total Downloads:</span>
                  <span className="text-xs md:text-sm font-bold text-[#00712C]">{totalDownloads}</span>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="flex gap-3">
            <Button
              asChild
              variant="outline"
              className="gap-2 hover:bg-green-50 hover:border-green-200 transition-all shadow-sm"
            >
              <Link href="/admin/change-password">
                <KeyRound className="h-4 w-4" />
                Change Password
              </Link>
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="gap-2 hover:bg-red-50 hover:border-red-200 hover:text-red-700 transition-all shadow-sm"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div> */}
        </div>

        {/* Upload Form */}
        <Card className="mb-6 md:mb-12 shadow-lg border-2 border-neutral-200 overflow-hidden">
          <div className="bg-gradient-to-r from-green-700 to-green-800 px-4 md:px-8 py-4 md:py-6">
            <CardHeader className="p-0">
              <CardTitle className="text-xl md:text-2xl font-bold text-white flex items-center gap-3">
                {editingId ? (
                  <>
                    <Edit className="h-6 w-6" />
                    Edit Catalogue
                  </>
                ) : (
                  <>
                    <BookOpen className="h-6 w-6" />
                    Upload New Catalogue
                  </>
                )}
              </CardTitle>
              <CardDescription className="text-green-50 mt-2 text-sm md:text-base">
                {editingId ? "Update catalogue details and files" : "Add a new catalogue to your collection"}
              </CardDescription>
            </CardHeader>
          </div>
          <CardContent className="p-4 md:p-8 bg-white">
            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
              <div className="space-y-4 md:space-y-6">
                {/* Title Section */}
                <div className="bg-neutral-50 p-4 md:p-6 rounded-xl border border-neutral-200">
                  <h3 className="text-base md:text-lg font-semibold text-neutral-800 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 md:w-8 md:h-8 bg-[#00712C] text-white rounded-full flex items-center justify-center text-xs md:text-sm font-bold">1</span>
                    Basic Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-sm font-semibold text-neutral-700">Catalogue Title *</Label>
                      <Input
                        id="title"
                        placeholder="e.g., AMOHA Collection"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        disabled={isLoading}
                        className="border-neutral-300 focus:border-green-700 focus:ring-green-700 h-12 text-base"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-sm font-semibold text-neutral-700">Category *</Label>
                      <Select value={category} onValueChange={setCategory} disabled={isLoading}>
                        <SelectTrigger className="h-12 border-neutral-300 focus:border-green-700 focus:ring-green-700">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Hospitality">Hospitality</SelectItem>
                          <SelectItem value="Restaurant & Chef">Restaurant & Chef</SelectItem>
                          <SelectItem value="Spa / Salons">Spa / Salons</SelectItem>
                          <SelectItem value="Healthcare">Healthcare</SelectItem>
                          <SelectItem value="Airline">Airline</SelectItem>
                          <SelectItem value="Corporate">Corporate</SelectItem>
                          <SelectItem value="Schools">Schools</SelectItem>
                          <SelectItem value="Others">Others</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="subtitle" className="text-sm font-semibold text-neutral-700">Subtitle</Label>
                      <Input
                        id="subtitle"
                        placeholder="e.g., Uniform Designs by Rohit & Abhishek Kamra"
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                        disabled={isLoading}
                        className="border-neutral-300 focus:border-green-700 focus:ring-green-700 h-12 text-base"
                      />
                    </div>
                  </div>
                </div>

                {/* Description Section */}
                <div className="bg-neutral-50 p-6 rounded-xl border border-neutral-200">
                  <h3 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-[#00712C] text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                    Description & Details
                  </h3>
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-sm font-semibold text-neutral-700">Description</Label>
                    <textarea
                      id="description"
                      placeholder="Enter description points, one per line. e.g.:&#10;First look at new collections & colour palettes&#10;Style tips & collabs with fashion stylists&#10;A curated vision of uniforms built to last"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      disabled={isLoading}
                      rows={5}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent resize-none text-base"
                    />
                    <p className="text-xs text-neutral-500 flex items-start gap-2">
                      <span className="text-[#00712C] mt-0.5">ℹ️</span>
                      <span>Enter each point on a new line. These will appear as bullet points on the catalogue card.</span>
                    </p>
                  </div>
                </div>

                {/* Visual Customization */}
                <div className="bg-neutral-50 p-6 rounded-xl border border-neutral-200">
                  <h3 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-[#00712C] text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                    Visual Customization
                  </h3>
                  <div className="space-y-2">
                    <Label htmlFor="color" className="text-sm font-semibold text-neutral-700">Card Background Color</Label>
                    <Select value={color} onValueChange={setColor} disabled={isLoading}>
                      <SelectTrigger className="h-12 border-neutral-300 focus:border-green-700 focus:ring-green-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {colorOptions.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            <div className="flex items-center gap-2">
                              <div className={`w-4 h-4 rounded ${opt.value} border border-neutral-300`} />
                              {opt.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* File Uploads */}
                <div className="bg-neutral-50 p-6 rounded-xl border border-neutral-200">
                  <h3 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-[#00712C] text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                    File Uploads
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="pdf" className="text-sm font-semibold text-neutral-700 flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-[#00712C]" />
                        PDF File {!editingId && <span className="text-red-500">*</span>}
                      </Label>
                      <div className="relative">
                        <Input
                          id="pdf"
                          type="file"
                          accept=".pdf"
                          onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                          disabled={isLoading}
                          required={!editingId}
                          className="border-neutral-300 focus:border-green-700 focus:ring-green-700 h-12 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#00712C] file:text-white hover:file:bg-[#00712C]"
                        />
                      </div>
                      {pdfFile && (
                        <p className="text-xs text-green-600 flex items-center gap-1">
                          ✓ {pdfFile.name}
                        </p>
                      )}
                      {uploadingPdf && (
                        <div className="flex items-center gap-2 text-sm text-[#00712C]">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Uploading PDF...</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cover" className="text-sm font-semibold text-neutral-700 flex items-center gap-2">
                        <Eye className="h-4 w-4 text-[#00712C]" />
                        Cover Image {!editingId && <span className="text-red-500">*</span>}
                      </Label>
                      <div className="relative">
                        <Input
                          id="cover"
                          type="file"
                          accept="image/*"
                          onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
                          disabled={isLoading}
                          required={!editingId}
                          className="border-neutral-300 focus:border-green-700 focus:ring-green-700 h-12 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#00712C] file:text-white hover:file:bg-[#00712C]"
                        />
                      </div>
                      {coverFile && (
                        <p className="text-xs text-green-600 flex items-center gap-1">
                          ✓ {coverFile.name}
                        </p>
                      )}
                      {uploadingCover && (
                        <div className="flex items-center gap-2 text-sm text-[#00712C]">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Uploading image...</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-neutral-200">
                <Button
                  type="submit"
                  className="bg-[#00712C] hover:bg-[#00712C] h-12 px-8 text-base font-semibold shadow-md hover:shadow-lg transition-all"
                  disabled={isLoading || uploadingPdf || uploadingCover}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      {uploadingPdf ? "Uploading PDF..." : uploadingCover ? "Uploading Image..." : "Saving..."}
                    </>
                  ) : editingId ? (
                    <>
                      <Edit className="mr-2 h-5 w-5" />
                      Update Catalogue
                    </>
                  ) : (
                    <>
                      <BookOpen className="mr-2 h-5 w-5" />
                      Publish Catalogue
                    </>
                  )}
                </Button>
                {editingId && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancelEdit}
                    disabled={isLoading}
                    className="h-12 px-6 text-base border-2 hover:bg-neutral-100"
                  >
                    Cancel Edit
                  </Button>
                )}
              </div>
              
              <div className="flex items-center space-x-2 py-4 px-2 bg-green-50/50 rounded-lg border border-green-100 mt-6">
                <Switch 
                  id="published-toggle" 
                  checked={published} 
                  onCheckedChange={setPublished}
                  disabled={isLoading}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label 
                    htmlFor="published-toggle"
                    className="text-sm font-bold text-[#00712C] cursor-pointer"
                  >
                    Published
                  </Label>
                  <p className="text-xs text-neutral-500">
                    If enabled, this catalogue will be visible on the public website.
                  </p>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Existing Catalogues */}
        <Card className="shadow-lg border-2 border-neutral-200">
          <CardHeader className="bg-gradient-to-r from-neutral-800 to-neutral-900 text-white rounded-t-lg pb-6">
            <CardTitle className="text-2xl font-bold flex items-center gap-3">
              <BookOpen className="h-6 w-6" />
              Existing Catalogues
            </CardTitle>
            <CardDescription className="text-neutral-300 text-base">
              Manage your published catalogues • {catalogues.length} total
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 bg-white">
            {catalogues.length === 0 ? (
              <div className="text-center py-16">
                <BookOpen className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
                <p className="text-neutral-500 text-lg">
                  No catalogues yet. Upload your first one above!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {catalogues.map((catalogue) => (
                  <div
                    key={catalogue.id}
                    className={`${catalogue.color} rounded-xl overflow-hidden border-2 border-neutral-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
                  >
                    <div className="aspect-[3/4] relative border-b-2 border-neutral-300">
                      <img
                        src={catalogue.coverImage}
                        alt={catalogue.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-5 bg-white/80 backdrop-blur-sm">
                      <div className="flex justify-between items-center mb-2 gap-2">
                        <h3 className="font-bold text-xl text-neutral-900 line-clamp-1">{catalogue.title}</h3>
                        <div className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full border shrink-0 ${catalogue.published ? 'bg-green-100 text-[#00712C] border-green-200' : 'bg-yellow-100 text-yellow-700 border-yellow-200'}`}>
                          {catalogue.published ? 'Published' : 'Draft'}
                        </div>
                      </div>
                      {catalogue.subtitle && (
                        <p className="text-sm text-neutral-600 mb-3 line-clamp-2">
                          {catalogue.subtitle}
                        </p>
                      )}
                      {/* Download Stats */}
                      <div className="flex items-center gap-2 mb-4 text-[#00712C] bg-green-50 px-3 py-2 rounded-lg border border-green-200 shadow-sm">
                        <DownloadIcon className="h-4 w-4" />
                        <span className="text-sm font-bold">{catalogue._count?.downloads || 0}</span>
                        <span className="text-sm">downloads</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 hover:bg-green-50 hover:border-green-300 hover:text-[#00712C] transition-all"
                            onClick={() => handleEdit(catalogue)}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-white hover:bg-red-600 border-red-300 hover:border-red-600 transition-all px-3"
                            onClick={() => setDeleteId(catalogue.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-800 transition-all"
                            onClick={() => window.open(`/catalogue/flip/${catalogue.id}`, '_blank')}
                          >
                            <BookOpen className="h-4 w-4 mr-1" />
                            Flip Book
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 hover:bg-purple-50 hover:border-purple-300 hover:text-purple-800 transition-all"
                            onClick={() => handleViewDownloads(catalogue.id)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the catalogue
              from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDelete(deleteId)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Download Details Dialog */}
      <AlertDialog open={!!viewDownloadsId} onOpenChange={() => setViewDownloadsId(null)}>
        <AlertDialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[#00712C]" />
              Download Details
            </AlertDialogTitle>
            <AlertDialogDescription>
              Total downloads: <span className="font-semibold text-[#00712C]">{downloadCount}</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex-1 overflow-y-auto">
            {downloads.length === 0 ? (
              <p className="text-center text-neutral-500 py-8">
                No downloads yet for this catalogue.
              </p>
            ) : (
              <div className="space-y-3">
                {downloads.map((download) => (
                  <div
                    key={download.id}
                    className="border border-neutral-200 rounded-lg p-4 bg-neutral-50"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-neutral-500 text-xs">Downloaded At</p>
                        <p className="font-medium">
                          {new Date(download.downloadedAt).toLocaleString()}
                        </p>
                      </div>
                      {download.userName && (
                        <div>
                          <p className="text-neutral-500 text-xs">Name</p>
                          <p className="font-medium">{download.userName}</p>
                        </div>
                      )}
                      {download.userEmail && (
                        <div>
                          <p className="text-neutral-500 text-xs">Email</p>
                          <p className="font-medium">{download.userEmail}</p>
                        </div>
                      )}
                      {download.userPhone && (
                        <div>
                          <p className="text-neutral-500 text-xs">Phone</p>
                          <p className="font-medium">{download.userPhone}</p>
                        </div>
                      )}
                      {download.ipAddress && (
                        <div>
                          <p className="text-neutral-500 text-xs">IP Address</p>
                          <p className="font-medium text-xs">{download.ipAddress}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
