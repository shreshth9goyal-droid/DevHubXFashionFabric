const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const sampleBlogPosts = [
    {
        title: "How Hospital Nurse Uniform Design Impacts Efficiency and Care",
        slug: "hospital-nurse-uniform-design",
        excerpt: "When we think of hospital efficiency, our thoughts typically revolve around advanced machinery, cutting-edge technology, and skilled medical professionals. But there's another crucial element that often goes unnoticed: the design of hospital nurse uniforms.",
        image: "https://i0.wp.com/www.usa.edu/wp-content/uploads/2023/12/nurse-qualities-hero.jpg?resize=1200%2C628&ssl=1",
        content: `When we think of hospital efficiency, our thoughts typically revolve around advanced machinery, cutting-edge technology, and skilled medical professionals. But there's another crucial element that often goes unnoticed: the design of hospital nurse uniforms.

The Role of Uniform Design in Healthcare

Hospital nurse uniforms are more than just attire—they're essential tools that can significantly impact both efficiency and patient care. A well-designed uniform can enhance mobility, provide comfort during long shifts, and even contribute to infection control.

Key Design Elements That Matter

Fabric Selection: The choice of fabric is crucial in healthcare settings. Modern nurse uniforms use breathable, antimicrobial fabrics that resist bacterial growth, allow air circulation for comfort, are easy to clean and maintain, and withstand frequent washing at high temperatures.

Functional Pockets: Nurses carry essential tools throughout their shifts. Well-placed pockets for pens, scissors, notepads, and medical instruments ensure everything is within reach, saving valuable time during critical moments.

Mobility and Comfort: Nurses are constantly moving—bending, reaching, and walking miles during a single shift. Uniforms with stretch panels and ergonomic cuts allow for unrestricted movement while maintaining a professional appearance.

Impact on Patient Care

The connection between uniform design and patient care is often overlooked, but it's significant. When nurses are comfortable and can move freely, they can respond more quickly to patient needs. Moreover, professional-looking uniforms instill confidence in patients and their families.

Modern Innovations in Uniform Design

Today's uniform manufacturers are incorporating innovative features such as moisture-wicking technology, four-way stretch fabrics, anti-static properties, fade-resistant colors, and ergonomic seam placement.

Conclusion

The design of hospital nurse uniforms plays a vital role in healthcare delivery. By prioritizing functionality, comfort, and hygiene, hospitals can support their nursing staff in providing the best possible care to patients. As we continue to advance in medical technology, let's not forget the importance of these fundamental tools that healthcare professionals wear every day.`,
        category: "BLOG",
        author: "BLOGUSER",
        published: true,
    },
    {
        title: "Airport Ground Staff Uniforms in India: Design, Comfort, and Safety",
        slug: "airport-ground-staff-uniforms-india",
        excerpt: "Have you ever thought why some airport ground staff look so professional and confident? It's not just about appearance—it's about how their uniforms are designed to balance comfort, safety, and professionalism.",
        image: "/images/blog/airport-uniform.jpg",
        content: `Have you ever thought why some airport ground staff look so professional and confident? It's not just about appearance—it's about how their uniforms are designed to balance comfort, safety, and professionalism.

The Importance of Airport Uniforms

Airport ground staff work in demanding environments where they face various challenges throughout their shifts. Their uniforms must meet multiple requirements simultaneously.

Key Features of Quality Airport Uniforms

Weather Resistance: Airport staff often work outdoors, exposed to various weather conditions. Modern uniforms incorporate water-resistant fabrics, UV protection, temperature regulation technology, and wind-resistant materials.

Safety Features: Safety is paramount in airport operations. Uniforms include high-visibility elements, reflective strips for low-light conditions, fire-resistant materials where required, and reinforced areas for durability.

Professional Appearance: First impressions matter in the aviation industry. Well-designed uniforms convey professionalism and build passenger confidence.

Comfort Considerations

Ground staff often work 8-12 hour shifts. Comfort features include breathable fabrics, ergonomic cuts, stretchable materials, and moisture management.

Conclusion

Quality airport ground staff uniforms are an investment in employee comfort, safety, and the overall professional image of the airline or airport.`,
        category: "BLOG",
        author: "BLOGUSER",
        published: true,
    },
    {
        title: "Key Questions Hotel Owners Should Ask Before Choosing a Uniform Manufacturer",
        slug: "hotel-uniform-manufacturer-questions",
        excerpt: "Let's be honest. In your mind while running a successful hotel, uniforms might not be the first thing on your priority list. But here's the thing—the right uniform manufacturer can make a significant difference.",
        image: "/images/blog/hotel-uniform.jpg",
        content: `Let's be honest. In your mind while running a successful hotel, uniforms might not be the first thing on your priority list. But here's the thing—the right uniform manufacturer can make a significant difference in your hotel's image and staff satisfaction.

Essential Questions to Ask

What is Your Experience in Hospitality Uniforms?

Look for manufacturers with proven experience in the hospitality industry. They should understand the unique requirements of hotel staff across different departments.

What Fabric Options Do You Offer?

Different roles require different fabrics. Consider durability for housekeeping staff, elegance for front desk personnel, heat-resistant materials for kitchen staff, and easy-care fabrics for maintenance teams.

Can You Provide Customization?

Your uniforms should reflect your brand identity. Ask about logo embroidery options, custom color matching, design modifications, and size range availability.

What is Your Production Timeline?

Understanding lead times is crucial for planning, especially during hotel openings, seasonal staff increases, and uniform refresh programs.

What After-Sales Support Do You Provide?

Ongoing support is important. Look for easy reordering processes, size exchange policies, replacement for defective items, and care and maintenance guidance.

Budget Considerations

While cost is important, focus on value. Consider fabric quality and durability, longevity of uniforms, replacement frequency, and overall cost per wear.

Conclusion

Choosing the right uniform manufacturer is a strategic decision. Ask these questions to ensure you partner with a supplier who understands your needs and can deliver quality uniforms that enhance your hotel's professional image.`,
        category: "BLOG",
        author: "BLOGUSER",
        published: true,
    },
]

async function seedBlogPosts() {
    console.log('Starting blog posts seeding...')

    try {
        // Check if blog posts already exist
        const existingPosts = await prisma.blogPost.findMany()

        if (existingPosts.length > 0) {
            console.log(`Found ${existingPosts.length} existing blog posts. Skipping seed.`)
            console.log('If you want to reseed, delete existing posts first.')
            return
        }

        // Create blog posts
        for (const post of sampleBlogPosts) {
            const created = await prisma.blogPost.create({
                data: post,
            })
            console.log(`✓ Created blog post: "${created.title}"`)
        }

        console.log(`\n✅ Successfully seeded ${sampleBlogPosts.length} blog posts!`)
        console.log('\nYou can view them at:')
        console.log('- Public: http://localhost:3000/blog')
        console.log('- Admin: http://localhost:3000/admin/blog-management')

    } catch (error) {
        console.error('Error seeding blog posts:', error)
        throw error
    } finally {
        await prisma.$disconnect()
    }
}

// Run the seed function
seedBlogPosts()
    .catch((error) => {
        console.error('Seeding failed:', error)
        process.exit(1)
    })
