"use client"

import { useEffect, useState } from "react"
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
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface CatalogueSubmission {
  id: string
  firstName: string
  lastName: string
  email: string
  companyName: string | null
  phoneNumber: string
  country: string
  state: string | null
  ipAddress: string | null
  userAgent: string | null
  otpVerified: boolean
  createdAt: string
  updatedAt: string
}

export default function CatalogueSubmissionsPage() {
  const [submissions, setSubmissions] = useState<CatalogueSubmission[]>([])
  const [filteredSubmissions, setFilteredSubmissions] = useState<CatalogueSubmission[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [countryFilter, setCountryFilter] = useState("")

  useEffect(() => {
    fetchSubmissions()
  }, [])

  useEffect(() => {
    filterSubmissions()
  }, [searchTerm, countryFilter, submissions])

  const fetchSubmissions = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/admin/catalogue-submissions?t=" + Date.now())
      const data = await response.json()
      
      if (data.success) {
        setSubmissions(data.submissions)
        setFilteredSubmissions(data.submissions)
      }
    } catch (error) {
      console.error("Error fetching submissions:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterSubmissions = () => {
    let filtered = submissions

    if (searchTerm) {
      filtered = filtered.filter((sub) =>
        sub.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.phoneNumber.includes(searchTerm) ||
        (sub.companyName && sub.companyName.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    if (countryFilter) {
      filtered = filtered.filter((sub) => 
        sub.country.toLowerCase() === countryFilter.toLowerCase()
      )
    }

    setFilteredSubmissions(filtered)
  }

  const exportToCSV = () => {
    const headers = [
      "First Name",
      "Last Name",
      "Email",
      "Company Name",
      "Phone Number",
      "Country",
      "State",
      "OTP Verified",
      "IP Address",
      "Submitted At"
    ]

    const csvData = filteredSubmissions.map((sub) => [
      sub.firstName,
      sub.lastName,
      sub.email,
      sub.companyName || "",
      sub.phoneNumber,
      sub.country,
      sub.state || "",
      sub.otpVerified ? "Yes" : "No",
      sub.ipAddress || "",
      new Date(sub.createdAt).toLocaleString()
    ])

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(","))
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    
    link.setAttribute("href", url)
    link.setAttribute("download", `catalogue-submissions-${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = "hidden"
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const uniqueCountries = Array.from(new Set(submissions.map((sub) => sub.country)))

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading submissions...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-4 md:py-8">
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
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">Catalogue Submissions</CardTitle>
          <CardDescription className="text-sm">
            View and manage all catalogue download requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters and Actions */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6">
            <Input
              placeholder="Search by name, email, phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:flex-1 md:w-96"
            />
            
            <select
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              className="px-3 py-2 border rounded-md w-full sm:w-auto"
            >
              <option value="">All Countries</option>
              {uniqueCountries.map((country) => (
                <option key={country} value={country}>
                  {country.charAt(0).toUpperCase() + country.slice(1)}
                </option>
              ))}
            </select>

            <Button onClick={exportToCSV} variant="outline" className="sm:ml-auto w-full sm:w-auto" size="sm">
              Export to CSV
            </Button>

            <Button onClick={fetchSubmissions} variant="outline" className="w-full sm:w-auto" size="sm">
              Refresh
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{submissions.length}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Filtered Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{filteredSubmissions.length}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Verified Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {submissions.filter((s) => s.otpVerified).length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Table */}
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[150px]">Name</TableHead>
                  <TableHead className="min-w-[200px]">Email</TableHead>
                  <TableHead className="min-w-[150px]">Company</TableHead>
                  <TableHead className="min-w-[120px]">Phone</TableHead>
                  <TableHead className="min-w-[100px]">Country</TableHead>
                  <TableHead className="min-w-[100px]">State</TableHead>
                  <TableHead className="min-w-[100px]">Verified</TableHead>
                  <TableHead className="min-w-[150px]">Submitted At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubmissions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground">
                      No submissions found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSubmissions.map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell className="font-medium">
                        {submission.firstName} {submission.lastName}
                      </TableCell>
                      <TableCell>{submission.email}</TableCell>
                      <TableCell>{submission.companyName || "-"}</TableCell>
                      <TableCell>{submission.phoneNumber}</TableCell>
                      <TableCell className="capitalize">{submission.country}</TableCell>
                      <TableCell className="capitalize">{submission.state || "-"}</TableCell>
                      <TableCell>
                        {submission.otpVerified ? (
                          <Badge variant="default" className="bg-green-600">
                            Verified
                          </Badge>
                        ) : (
                          <Badge variant="secondary">Not Verified</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {new Date(submission.createdAt).toLocaleString()}
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
