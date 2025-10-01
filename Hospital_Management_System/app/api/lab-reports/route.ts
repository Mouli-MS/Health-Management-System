import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';
import { uploadToS3 } from '../../lib/s3';

export async function GET(request: NextRequest) {
  try {
    const labReports = await prisma.labReport.findMany({
      include: { patient: true },
      orderBy: { reportDate: 'desc' },
    });

    return NextResponse.json(labReports);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch lab reports' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const patientId = formData.get('patientId') as string;
    const reportType = formData.get('reportType') as string;
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Save file to S3
    const bytes = await file.arrayBuffer();
    const fileBuffer = Buffer.from(bytes);
    const fileUrl = await uploadToS3(fileBuffer, file.name, file.type);

    // Save to database
    const labReport = await prisma.labReport.create({
      data: {
        patientId: parseInt(patientId),
        reportType,
        reportDate: new Date(),
        fileUrl,
      },
      include: { patient: true },
    });

    return NextResponse.json(labReport, { status: 201 });
  } catch (error) {
    console.error('Lab report upload error:', error);
    return NextResponse.json({ error: 'Failed to upload lab report' }, { status: 500 });
  }
}
