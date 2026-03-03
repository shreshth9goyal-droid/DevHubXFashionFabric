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
import { ArrowLeft, Trash2, Mail, Phone, Calendar, RefreshCw } from "lucide-react"
import Link from "next/link"
import { toast } from "@/hooks/use-toast"
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

interface Enquiry {
  id: string
  name: string
  email: string
  phone: string
  message: string
  createdAt: string
}

export default function AdminEnquiriesPage() {
  const router = useRouter()
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => {
    fetchEnquiries()
  }, [])

  const fetchEnquiries = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/admin/enquiries")
      const data = await response.json()

      if (data.success) {
        setEnquiries(data.enquiries)
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to fetch enquiries",
          variant: "destructive",
        })
      }
    } catch (err) {
      console.error(err)
      toast({
        title: "Error",
        description: "An error occurred while fetching enquiries",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return

    try {
      const response = await fetch(`/api/admin/enquiries?id=${deleteId}`, {
        method: "DELETE",
      })
      const data = await response.json()

      if (data.success) {
        toast({
          title: "Success",
          description: "Enquiry deleted successfully",
        })
        setEnquiries(enquiries.filter((e) => e.id !== deleteId))
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to delete enquiry",
          variant: "destructive",
        })
      }
    } catch (err) {
      console.error(err)
      toast({
        title: "Error",
        description: "An error occurred while deleting the enquiry",
        variant: "destructive",
      })
    } finally {
      setDeleteId(null)
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

  return (
    <div className="container mx-auto py-4 px-4 md:py-10">
      <div className="flex flex-col gap-4 mb-6">
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
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0 pb-7">
          <div>
            <CardTitle className="text-xl md:text-2xl font-bold">Contact Enquiries</CardTitle>
            <CardDescription className="text-sm">
              View all messages submitted via the contact form
            </CardDescription>
          </div>
          <Button onClick={fetchEnquiries} variant="outline" size="sm" className="gap-2" disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[150px]">Date</TableHead>
                  <TableHead className="min-w-[150px]">Name</TableHead>
                  <TableHead className="min-w-[200px]">Contact Info</TableHead>
                  <TableHead className="min-w-[300px]">Message</TableHead>
                  <TableHead className="w-[100px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-10">
                      Loading enquiries...
                    </TableCell>
                  </TableRow>
                ) : enquiries.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-10 text-neutral-500">
                      No enquiries found.
                    </TableCell>
                  </TableRow>
                ) : (
                  enquiries.map((enquiry) => (
                    <TableRow key={enquiry.id} className="align-top">
                      <TableCell className="whitespace-nowrap">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-3 w-3 text-neutral-400" />
                          {formatDate(enquiry.createdAt)}
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold">{enquiry.name}</TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 text-sm truncate max-w-[200px]" title={enquiry.email}>
                            <Mail className="h-3 w-3 text-[#00712C]" />
                            {enquiry.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-3 w-3 text-[#00712C]" />
                            {enquiry.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-neutral-600 line-clamp-3 md:line-clamp-none whitespace-pre-wrap">
                          {enquiry.message}
                        </p>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => setDeleteId(enquiry.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this enquiry from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
