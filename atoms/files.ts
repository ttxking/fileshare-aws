import { atomWithStorage } from 'jotai/utils'

type File = {
  fileId: string
  fileName: string
}

const filesAtom = atomWithStorage('files', [] as File[])

export { filesAtom }
