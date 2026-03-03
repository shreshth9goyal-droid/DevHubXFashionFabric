"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Download {
  id: string
  userName: string | null
  userEmail: string | null
  userPhone: string | null
  ipAddress: string | null
  userAgent: string | null
  downloadedAt: string
  catalogue?: {
    title: string
    category: string
  }
}

export default function AdminDownloadsPage() {
  const router = useRouter()
  const [downloads, setDownloads] = useState<Download[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchDownloads()
  }, [])

  const fetchDownloads = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/admin/downloads")
      const data = await response.json()

      if (response.ok) {
        setDownloads(data.downloads)
      } else {
        setError(data.error || "Failed to fetch downloads")
      }
    } catch (err) {
      setError("An error occurred while fetching downloads")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const exportToCSV = () => {
    const headers = ["Name", "Email", "Phone", "IP Address", "Downloaded At"]
    const rows = downloads.map((d) => [
      d.userName || "",
      d.userEmail || "",
      d.userPhone || "",
      d.ipAddress || "",
      formatDate(d.downloadedAt),
    ])

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `catalogue-downloads-${new Date().toISOString().split("T")[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-lg">Loading downloads...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-lg text-red-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-4 px-4 md:py-10">
      <Button
        asChild
        variant="outline"
        className="gap-2 mb-4 w-fit"
      >
        <Link href="/admin">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
      </Button>
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0 pb-7">
          <div>
            <CardTitle className="text-xl md:text-2xl font-bold">Catalogue Downloads</CardTitle>
            <CardDescription className="text-sm">
              View all users who have downloaded catalogues
            </CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={exportToCSV} variant="outline" size="sm" className="flex-1 sm:flex-none">
              Export to CSV
            </Button>
            <Button onClick={fetchDownloads} variant="outline" size="sm" className="flex-1 sm:flex-none">
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 text-sm text-muted-foreground">
            Total Downloads: {downloads.length}
          </div>
          <div className="border rounded-lg overflow-auto max-h-[600px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[150px] md:w-[200px]">Name</TableHead>
                  <TableHead className="min-w-[200px] md:w-[250px]">Email</TableHead>
                  <TableHead className="min-w-[120px] md:w-[150px]">Phone</TableHead>
                  <TableHead className="min-w-[120px] md:w-[150px]">IP Address</TableHead>
                  <TableHead className="min-w-[150px] md:w-[200px]">Downloaded At</TableHead>
                  <TableHead className="min-w-[200px] md:w-[300px]">User Agent</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {downloads.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      No downloads found
                    </TableCell>
                  </TableRow>
                ) : (
                  downloads.map((download) => (
                    <TableRow key={download.id}>
                      <TableCell className="font-medium">
                        {download.userName || "N/A"}
                      </TableCell>
                      <TableCell>{download.userEmail || "N/A"}</TableCell>
                      <TableCell>{download.userPhone || "N/A"}</TableCell>
                      <TableCell>{download.ipAddress || "N/A"}</TableCell>
                      <TableCell>{formatDate(download.downloadedAt)}</TableCell>
                      <TableCell className="max-w-[300px] truncate" title={download.userAgent || ""}>
                        {download.userAgent || "N/A"}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
