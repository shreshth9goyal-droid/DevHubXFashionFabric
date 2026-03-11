const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const result = await prisma.catalogue.updateMany({
    where: { title: "Corporate Book" },
    data: {
      coverImage: "/images/catalogue/CORPORATE-WEAR-SUIT.png"
    }
  });
  console.log(`Updated ${result.count} catalogue(s).`);
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
