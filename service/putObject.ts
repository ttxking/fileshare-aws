import zip from "jszip";
import { PutObjectCommand, PutObjectCommandInputType } from "@aws-sdk/client-s3";
import { s3Client } from "./s3Client";

export const uploadFile = async (blob: Blob) => {
  try {
    // convert to Uint8Array
    const arrayPromise = new Promise<ArrayBuffer>((resolve) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        resolve(reader.result as ArrayBuffer)
      }
      reader.readAsArrayBuffer(blob)
    })
    const arr = await arrayPromise as ArrayBuffer
    const uint8arr = new Uint8Array(arr)
    console.log(uint8arr)
    const uploadParams = {
      Bucket: '',
      Key: '',
      Body: uint8arr,
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
    console.log("Error", err);
  }
}