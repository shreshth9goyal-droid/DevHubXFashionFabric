const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding catalogues...');

  const catalogues = [
    {
      id: "cat1", // Using same ID as dummy data for continuity
      title: "Hospitality & Luxury Resorts 2024",
      subtitle: "Premium Uniform Collection",
      description: "Front Office Attire\nHousekeeping Comfort-wear\nF&B Service Styles",
      category: "HOSPITALITY",
      coverImage: "/images/bg-imges-hero-sections/image-01.jpg",
      pdfUrl: "https://irlbjqultodcnayxblng.supabase.co/storage/v1/object/public/catalogue/sample.pdf",
      color: "bg-neutral-100",
      published: true,
    },
    {
      id: "cat2",
      title: "Healthcare Excellence Series",
      subtitle: "Protective & Professional",
      description: "Antimicrobial Scrubs\nPatient Gowns\nLab Coats",
      category: "HEALTHCARE",
      coverImage: "/images/bg-imges-hero-sections/image-02.jpg",
      pdfUrl: "https://irlbjqultodcnayxblng.supabase.co/storage/v1/object/public/catalogue/sample.pdf",
      color: "bg-neutral-100",
      published: true,
    }
  ];

  for (const cat of catalogues) {
    await prisma.catalogue.upsert({
      where: { id: cat.id },
      update: cat,
      create: cat,
    });
  }

  console.log('✅ Catalogues seeded.');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
