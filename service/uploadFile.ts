import { PutObjectCommand, PutObjectCommandInputType } from "@aws-sdk/client-s3";
import { s3Client } from "./s3Client";
import JSZip from 'jszip';
import axios from 'axios'

export const uploadFile = async (blob: Blob, fileName: string) => {
  try {

    const zip = new JSZip();
    zip.file(fileName, blob)
    const content = await zip.generateAsync({ type: 'base64' })

    const uploadParams = {
      Bucket: 'sa2023-fileshare-storage',
      Key: fileName + '.zip',
      Body: content,
    } satisfies PutObjectCommandInputType

    const body = {
      name: fileName + '.zip',
      content
    }
    const response = await axios.post('https://e1cfkwgoec.execute-api.ap-southeast-1.amazonaws.com/default/files', body)
    console.log('abc', response)
    // const results = await s3Client.send(new PutObjectCommand(uploadParams));
    console.log(
      "Successfully created " +
      uploadParams.Key +
      " and uploaded it to " +
      uploadParams.Bucket +
      "/" +
      uploadParams.Key
    );
    return response; // For unit tests.
  } catch (err) {
    console.error("Error", err);
  }
}