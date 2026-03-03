"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Link2 } from "lucide-react"

export function BlogShareButtons({ title, slug }: { title: string, slug: string }) {
  const [url, setUrl] = useState("")

  useEffect(() => {
    setUrl(window.location.href)
  }, [])

  const shareUrl = url || `https://www.fashionfabric.info/blog/${slug}`
  const encodedUrl = encodeURIComponent(shareUrl)
  const encodedTitle = encodeURIComponent(title)

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
    alert("Link copied to clipboard!")
  }

  return (
    <div className="flex flex-wrap gap-4">
      <Button
        variant="outline"
        size="sm"
        className="hover:bg-[#00712C] hover:text-white hover:border-[#00712C] transition-colors"
        asChild
      >
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="hover:bg-[#00712C] hover:text-white hover:border-[#00712C] transition-colors"
        asChild
      >
        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </a>
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="hover:bg-[#00712C] hover:text-white hover:border-[#00712C] transition-colors"
        asChild
      >
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="hover:bg-[#00712C] hover:text-white hover:border-[#00712C] transition-colors"
        asChild
      >
        <a
          href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp
        </a>
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="hover:bg-[#00712C] hover:text-white hover:border-[#00712C] transition-colors flex items-center gap-2"
        onClick={handleCopyLink}
      >
        <Link2 className="w-4 h-4" />
        Copy Link
      </Button>
    </div>
  )
}
