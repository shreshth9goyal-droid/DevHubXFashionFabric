"use client"

import { useEffect, useState } from "react"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { KeyRound, FileText, LogOut, Mail, Download, Users, BookOpen, Loader2 } from "lucide-react"

interface Stats {
  enquiries: number
  submissions: number
  downloads: number
  blogs: number
  catalogues: number
}

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState<Stats | null>(null)
  const [loadingStats, setLoadingStats] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/portal")
    } else if (status === "authenticated") {
      fetchStats()
    }
  }, [status, router])

  const fetchStats = async () => {
    try {
      setLoadingStats(true)
      const response = await fetch("/api/admin/stats")
      const data = await response.json()
      if (data.success) {
        setStats(data.stats)
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error)
    } finally {
      setLoadingStats(false)
    }
  }

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  if (status === "loading") {
    return (
      <div className="container mx-auto py-10 flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-[#00712C]" />
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="container mx-auto py-6 px-4 lg:py-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Admin Dashboard</h1>
          <p className="text-neutral-500 mt-1">Welcome back, {session.user?.email}</p>
        </div>
        <div className="flex flex-wrap gap-3 w-full sm:w-auto">
          <Button 
            variant="outline" 
            className="gap-2 flex-1 sm:flex-none border-neutral-200"
            onClick={() => handleNavigation("/admin/change-password")}
          >
            <KeyRound className="h-4 w-4" />
            Password
          </Button>
          <Button 
            variant="destructive" 
            className="gap-2 flex-1 sm:flex-none bg-red-600 hover:bg-red-700"
            onClick={() => signOut({ callbackUrl: "/admin/system-exclusive-login-gate" })}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Contact Enquiries */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <div>
              <CardTitle className="text-xl font-bold">Contact Enquiries</CardTitle>
              <CardDescription>Customer messages</CardDescription>
            </div>
            <div className="h-12 w-12 bg-green-50 rounded-full flex items-center justify-center">
              <Mail className="h-6 w-6 text-[#00712C]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">
                {loadingStats ? "..." : stats?.enquiries ?? 0}
              </div>
              <Button size="sm" variant="outline" onClick={() => handleNavigation("/admin/enquiries")}>
                View Enquiries
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Catalogue Submissions */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <div>
              <CardTitle className="text-xl font-bold">Catalogue Submissions</CardTitle>
              <CardDescription>Form submissions for downloads</CardDescription>
            </div>
            <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">
                {loadingStats ? "..." : stats?.submissions ?? 0}
              </div>
              <Button size="sm" variant="outline" onClick={() => handleNavigation("/admin/catalogue-submissions")}>
                View Submissions
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Download Records */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <div>
              <CardTitle className="text-xl font-bold">Download Tracking</CardTitle>
              <CardDescription>Actual file download events</CardDescription>
            </div>
            <div className="h-12 w-12 bg-purple-50 rounded-full flex items-center justify-center">
              <Download className="h-6 w-6 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">
                {loadingStats ? "..." : stats?.downloads ?? 0}
              </div>
              <Button size="sm" variant="outline" onClick={() => handleNavigation("/admin/downloads")}>
                View Downloads
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Blog Management */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <div>
              <CardTitle className="text-xl font-bold">Blog Posts</CardTitle>
              <CardDescription>Content management</CardDescription>
            </div>
            <div className="h-12 w-12 bg-orange-50 rounded-full flex items-center justify-center">
              <FileText className="h-6 w-6 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">
                {loadingStats ? "..." : stats?.blogs ?? 0}
              </div>
              <Button size="sm" variant="outline" onClick={() => handleNavigation("/admin/blog-management")}>
                Manage Blogs
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Catalogue Management */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <div>
              <CardTitle className="text-xl font-bold">Catalogues</CardTitle>
              <CardDescription>Available PDF catalogues</CardDescription>
            </div>
            <div className="h-12 w-12 bg-amber-50 rounded-full flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">
                {loadingStats ? "..." : stats?.catalogues ?? 0}
              </div>
              <Button size="sm" variant="outline" onClick={() => handleNavigation("/admin/catalogue-upload")}>
                Manage Catalogues
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
