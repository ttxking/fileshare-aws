import { S3Client } from "@aws-sdk/client-s3";
// Set the AWS Region.
const REGION = "ap-southeast-1"; //e.g. "us-east-1"
const CREDENTIAL = {
  accessKeyId: 'AKIAXAPDX7S5FIW55RKG',
  secretAccessKey: 'cFE842ZqbtJoA1cvvoP4aNKDNuK6z5luzvHG+YTF',
};
// Create an Amazon S3 service client object.
const s3Client = new S3Client({ region: REGION, credentials: CREDENTIAL });
export { s3Client };