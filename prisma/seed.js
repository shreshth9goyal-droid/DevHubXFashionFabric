const { PrismaClient } = require('@prisma/client')
require('dotenv').config()
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding database...')

    // Create admin user with a strong password
    // Strong password requirements: min 12 chars, uppercase, lowercase, number, special char
    const strongPassword = process.env.ADMIN_PASSWORD || 'FashionAdmin@2026!'

    // Validate password strength
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]).{12,}$/
    if (!passwordRegex.test(strongPassword)) {
        console.error('❌ Password does not meet security requirements!')
        console.error('Requirements: min 12 characters, uppercase, lowercase, number, special character')
        process.exit(1)
    }

    const hashedPassword = await bcrypt.hash(strongPassword, 12) // Increased bcrypt rounds for better security

    const admin = await prisma.user.upsert({
        where: { email: 'admin@fashionfabric.com' },
        update: {},
        create: {
            email: 'admin@fashionfabric.com',
            password: hashedPassword,
            name: 'Admin',
            role: 'admin',
        },
    })

    console.log('✅ Admin user created:', admin.email)
    console.log('📧 Email: admin@fashionfabric.com')
    console.log('🔑 Password:', strongPassword)
    console.log('\n⚠️  IMPORTANT: Store this password securely and change it after first login!')
    console.log('💡 Set ADMIN_PASSWORD environment variable to use a custom password')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
