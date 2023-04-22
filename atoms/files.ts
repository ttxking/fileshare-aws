import { UploadFile } from 'antd/es/upload'
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

const linksAtom = atomWithStorage('links', [] as string[])

const uploadFilesAtom = atom([] as UploadFile[])

const filesAtom = atom((get) => {
  const uploadFiles = get(uploadFilesAtom)
  return uploadFiles.map((file) => file as unknown as File)
})

export { linksAtom, uploadFilesAtom, filesAtom }
