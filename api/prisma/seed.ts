import { hashSync } from 'bcrypt';
import { BasicRole, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const admin = {
  email: 'user@admin.app',
  username: '+22966171231',
  phone: '+22966171231',
  fullname: 'Mireille SOVI',
  password: hashSync('72536', 3),
};

const main = async () => {
  await prisma.auth.upsert({
    where: { email: admin.email },
    create: {
      ...admin,
      role: BasicRole.ADMIN,
    },
    update: {},
  });
};

main().then(async () => {
  await prisma.$disconnect();
});
