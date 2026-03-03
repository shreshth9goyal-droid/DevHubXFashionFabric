const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const prisma = new PrismaClient();

async function createAdmin() {
  const email = "admin@fashionfabric.in";
  const password = "Admin@FashionFabric@2026";
  const name = "Admin";
  const role = "admin";

  console.log(`Checking if admin user exists: ${email}...`);

  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    console.log('✅ Admin user already exists.');
    
    // Check if password needs updating to the new standard
    const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordMatch) {
        console.log('Updating password to: Admin@FashionFabric@2026');
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.update({
            where: { email },
            data: { password: hashedPassword, role: "admin" }
        });
        console.log('✅ Password updated.');
    } else {
        console.log('✅ Password already correct.');
    }
  } else {
    console.log(`Creating new admin user: ${email}...`);
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role
      }
    });
    
    console.log('✅ Admin user created successfully.');
  }

  console.log('\n--- ADMIN CREDENTIALS ---');
  console.log(`Email: ${email}`);
  console.log(`Password: ${password}`);
  console.log('-------------------------\n');
}

createAdmin()
  .catch((e) => {
    console.error('❌ Error creating admin:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
