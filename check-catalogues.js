const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const catalogues = await prisma.catalogue.findMany();
  console.log(JSON.stringify(catalogues, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
