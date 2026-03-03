const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function clearAndReseedBlogPosts() {
    console.log('Clearing existing blog posts...')

    try {
        // Delete all existing blog posts
        const deleted = await prisma.blogPost.deleteMany({})
        console.log(`✓ Deleted ${deleted.count} existing blog posts`)

        console.log('\nReseeding with plain text content...')

        // Now run the regular seed
        const { execSync } = require('child_process')
        execSync('node seed-blog-posts.js', { stdio: 'inherit' })

    } catch (error) {
        console.error('Error:', error)
        throw error
    } finally {
        await prisma.$disconnect()
    }
}

clearAndReseedBlogPosts()
    .catch((error) => {
        console.error('Operation failed:', error)
        process.exit(1)
    })
