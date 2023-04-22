import JSZip from 'jszip'
import axios from 'axios'

export type UploadFileRequest = {
  content: string
  name: string
}

export type UploadFileResponse = {
  message: string
  fileId: string
}

const uploadFile = async (blob: Blob, fileName: string) => {
  const zip = new JSZip()
  zip.file(fileName, blob)
  const content = await zip.generateAsync({ type: 'base64' })
  const body = {
    name: fileName + '.zip',
    content
  }
  const response = await axios.post<UploadFileResponse>(
    'https://e1cfkwgoec.execute-api.ap-southeast-1.amazonaws.com/prod/files',
    body
  )
  return response.data
}

export { uploadFile }
