import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Hash the admin password
  const hashedPassword = await bcrypt.hash('admin123', 12);

  // Create an admin user
  await prisma.user.upsert({
    where: { email: 'admin@hospital.com' },
    update: {},
    create: {
      email: 'admin@hospital.com',
      password: hashedPassword,
      role: 'Admin',
    },
  });

  // Create a doctor user
  await prisma.user.upsert({
    where: { email: 'doctor@hospital.com' },
    update: {},
    create: {
      email: 'doctor@hospital.com',
      password: hashedPassword,
      role: 'Doctor',
    },
  });

  // Create a reception user
  await prisma.user.upsert({
    where: { email: 'reception@hospital.com' },
    update: {},
    create: {
      email: 'reception@hospital.com',
      password: hashedPassword,
      role: 'Reception',
    },
  });

  // Create sample patients
  await prisma.patient.upsert({
    where: { email: 'john.doe@example.com' },
    update: {},
    create: {
      firstName: 'John',
      lastName: 'Doe',
      dob: new Date('1980-01-01'),
      gender: 'Male',
      phone: '1234567890',
      email: 'john.doe@example.com',
      address: '123 Main St',
    },
  });

  await prisma.patient.upsert({
    where: { email: 'jane.smith@example.com' },
    update: {},
    create: {
      firstName: 'Jane',
      lastName: 'Smith',
      dob: new Date('1990-05-15'),
      gender: 'Female',
      phone: '0987654321',
      email: 'jane.smith@example.com',
      address: '456 Elm St',
    },
  });

  // Create sample appointments
  await prisma.appointment.createMany({
    data: [
      {
        patientId: 1,
        doctorId: 2, // Doctor user ID
        appointmentDate: new Date('2024-10-01T10:00:00Z'),
        status: 'Scheduled',
      },
    ],
  });

  // Create sample bills
  await prisma.bill.createMany({
    data: [
      {
        patientId: 1,
        amount: 150.00,
        status: 'Paid',
      },
    ],
  });

  console.log('Database seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
