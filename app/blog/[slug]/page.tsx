export const dynamic = "force-dynamic"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { AnimateIn } from "@/components/animate-in"
import { Button } from "@/components/ui/button"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { BlogShareButtons } from "@/components/blog-share-buttons"
import { DUMMY_BLOG_POSTS } from "@/lib/dummy-data"

async function getBlogPost(slug: string) {
  try {
    const blogPost = await prisma.blogPost.findUnique({
      where: {
        slug,
        published: true,
      },
    })
    
    return blogPost
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return null
  }
}

async function getRelatedPosts(currentSlug: string, category: string) {
  try {
    const relatedPosts = await prisma.blogPost.findMany({
      where: {
        published: true,
        slug: { not: currentSlug },
        category,
      },
      take: 2,
      orderBy: { createdAt: "desc" },
    })
    
    return relatedPosts
  } catch (error) {
    console.error("Error fetching related posts:", error)
    return []
  }
}

function formatDate(date: Date) {
  const day = date.getDate().toString().padStart(2, '0')
  const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
  const month = monthNames[date.getMonth()]
  return { day, month }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const blogPost = await getBlogPost(slug)

  if (!blogPost) {
    notFound()
  }

  const relatedPosts = await getRelatedPosts(blogPost.slug, blogPost.category)
  const dateObj = formatDate(new Date(blogPost.createdAt))

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Back Button */}
        <section className="pt-8 pb-4 bg-white">
          <div className="container px-4 md:px-6">
            <AnimateIn>
              <Button
                asChild
                variant="outline"
                className="hover:bg-[#00712C] hover:text-white hover:border-[#00712C] transition-colors"
              >
                <Link href="/blog" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Blog
                </Link>
              </Button>
            </AnimateIn>
          </div>
        </section>

        {/* Date Badge Section */}
        <section className="py-4 bg-white">
          <div className="container px-4 md:px-6">
            <AnimateIn>
              <div className="inline-flex items-center gap-2 bg-neutral-100 px-5 py-3 rounded-xl border border-neutral-200 shadow-sm">
                <div className="text-center">
                  <div className="text-3xl font-bold text-black leading-none">{dateObj.day}</div>
                  <div className="text-xs font-bold text-[#00712C] mt-1">{dateObj.month}</div>
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* Hero Section with Image and Title Side by Side */}
        <section className="py-8 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Image */}
              <AnimateIn direction="left">
                <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src={blogPost.image}
                    alt={blogPost.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </AnimateIn>

              {/* Title */}
              <AnimateIn direction="right">
                <div>
                  <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                    {blogPost.title}
                  </h1>
                  <div className="flex items-center gap-4 text-sm text-black mt-4">
                    <span className="font-semibold">{blogPost.category}</span>
                    <span>/</span>
                    <span>by {blogPost.author}</span>
                    <span>/</span>
                    <span>{new Date(blogPost.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  </div>
                </div>
              </AnimateIn>
            </div>
          </div>
        </section>

        {/* Blog Content */}
        <section className="py-16 bg-white">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              {/* Article Content */}
              <AnimateIn delay={0.2}>
                <article className="text-black text-lg leading-relaxed space-y-6">
                  {(blogPost as any).content?.split('\n').map((line: string, index: number) => {
                    const trimmedLine = line.trim()

                    // Skip empty lines
                    if (!trimmedLine) {
                      return null
                    }

                    // Check if line is a header (starts with ##)
                    if (trimmedLine.startsWith('## ')) {
                      const headerText = trimmedLine.substring(3).trim()
                      return (
                        <h2
                          key={index}
                          className="text-2xl md:text-3xl font-bold text-gray-900 mt-8 mb-4 pb-3 border-b-2 border-[#00712C] bg-gradient-to-r from-green-50 to-transparent px-4 py-3 rounded-lg"
                        >
                          {headerText}
                        </h2>
                      )
                    }

                    // Check if line is an image (markdown format: ![alt](url))
                    const imageMatch = trimmedLine.match(/^!\[([^\]]*)\]\(([^)]+)\)$/)
                    if (imageMatch) {
                      const [, alt, url] = imageMatch
                      return (
                        <div key={index} className="my-8">
                          <div className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-lg">
                            <Image
                              src={url}
                              alt={alt || 'Article image'}
                              fill
                              className="object-cover"
                            />
                          </div>
                          {alt && (
                            <p className="text-sm text-black text-center mt-2 italic">
                              {alt}
                            </p>
                          )}
                        </div>
                      )
                    }

                    // Regular paragraph
                    return (
                      <p key={index} className="text-black">
                        {line}
                      </p>
                    )
                  })}
                </article>
              </AnimateIn>

              {/* Share Section */}
              <AnimateIn delay={0.3}>
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-semibold mb-4 text-black">Share this article</h3>
                  <BlogShareButtons slug={blogPost.slug} title={blogPost.title} />
                </div>
              </AnimateIn>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <AnimateIn delay={0.4}>
                  <div className="mt-12 pt-8 border-t border-gray-200">
                    <h3 className="text-2xl font-bold mb-6 text-black">Related Articles</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {relatedPosts.map((post) => (
                        <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                          <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="relative h-48 w-full">
                              <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <div className="p-4">
                              <h4 className="font-semibold text-black group-hover:text-[#00712C] transition-colors line-clamp-2">
                                {post.title}
                              </h4>
                              <p className="text-sm text-black mt-2 line-clamp-2">
                                {post.excerpt}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </AnimateIn>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
