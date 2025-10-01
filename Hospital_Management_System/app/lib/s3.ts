import AWS from 'aws-sdk';
import { env } from 'process';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export async function uploadToS3(file: Buffer, fileName: string, contentType: string): Promise<string> {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET!,
    Key: `lab-reports/${Date.now()}-${fileName}`,
    Body: file,
    ContentType: contentType,
    ACL: 'public-read',
  };

  const result = await s3.upload(params).promise();
  return result.Location;
}
