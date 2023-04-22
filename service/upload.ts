import JSZip from 'jszip'
import { axiosFileAPI } from './axios'

export type UploadFileRequest = {
  content: string
  name: string
}

export type UploadFileResponse = {
  message: string
  fileId: string
}

const upload = async (...files: File[]) => {
  const zip = new JSZip()
  const fileName = files.map((file) => file.name).join('+')
  files.forEach((file) => {
    console.log(new Blob([file], { type: file.type }))
    zip.file(file.name, new Blob([file]))
  })
  const content = await zip.generateAsync({ type: 'base64' })
  const response = await axiosFileAPI.post<UploadFileResponse>('/', {
    name: fileName + '.zip',
    content
  })
  return response.data
}

export { upload }
