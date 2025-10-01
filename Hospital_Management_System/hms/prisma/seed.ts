import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create an admin user
  await prisma.user.upsert({
    where: { email: 'admin@hospital.com' },
    update: {},
    create: {
      email: 'admin@hospital.com',
      password: 'hashed-password', // Replace with hashed password
      role: 'Admin',
    },
  });

  // Create sample patients
  await prisma.patient.createMany({
    data: [
      {
        firstName: 'John',
        lastName: 'Doe',
        dob: new Date('1980-01-01'),
        gender: 'Male',
        phone: '1234567890',
        email: 'john.doe@example.com',
        address: '123 Main St',
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        dob: new Date('1990-05-15'),
        gender: 'Female',
        phone: '0987654321',
        email: 'jane.smith@example.com',
        address: '456 Elm St',
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
