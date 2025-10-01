import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const patientId = searchParams.get('patientId');

    let bills;
    if (patientId) {
      bills = await prisma.bill.findMany({
        where: { patientId: parseInt(patientId) },
        include: { patient: true },
      });
    } else {
      bills = await prisma.bill.findMany({
        include: { patient: true },
      });
    }

    return NextResponse.json(bills);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch bills' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { patientId, amount, status } = await request.json();

    const bill = await prisma.bill.create({
      data: {
        patientId: parseInt(patientId),
        amount: parseFloat(amount),
        status: status || 'Pending',
      },
      include: { patient: true },
    });

    return NextResponse.json(bill, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create bill' }, { status: 500 });
  }
}
