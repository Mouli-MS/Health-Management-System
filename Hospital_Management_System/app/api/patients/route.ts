import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  try {
    const patients = await prisma.patient.findMany({
      include: {
        appointments: true,
        bills: true,
        labReports: true,
      },
    });
    return NextResponse.json(patients);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch patients' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, dob, gender, phone, email, address } = await request.json();

    const patient = await prisma.patient.create({
      data: {
        firstName,
        lastName,
        dob: new Date(dob),
        gender,
        phone,
        email,
        address,
      },
    });

    return NextResponse.json(patient, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create patient' }, { status: 500 });
  }
}
