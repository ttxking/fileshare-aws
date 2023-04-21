import { PutObjectCommand, PutObjectCommandInputType } from "@aws-sdk/client-s3";
import { s3Client } from "./s3Client";
import JSZip from 'jszip';

export const uploadFile = async (blob: Blob, fileName: string) => {
  try {

    const zip = new JSZip();
    zip.file(fileName, blob)
    const content = await zip.generateAsync({ type: 'blob' })

    const uploadParams = {
      Bucket: 'sa2023-fileshare-storage',
      Key: fileName + '.zip',
      Body: content,
    } satisfies PutObjectCommandInputType

    const results = await s3Client.send(new PutObjectCommand(uploadParams));
    console.log(
      "Successfully created " +
      uploadParams.Key +
      " and uploaded it to " +
      uploadParams.Bucket +
      "/" +
      uploadParams.Key
    );
    return results; // For unit tests.
  } catch (err) {
    console.error("Error", err);
  }
}