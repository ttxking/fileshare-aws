import { useSetAtom } from 'jotai'
import { filesAtom } from '@/atoms/files'
import { UploadProps, App, Upload } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { uploadFile } from '@/service/uploadFile'
import type { UploadRequestOption } from 'rc-upload/lib/interface'
import { useState } from 'react'
import { RcFile } from 'antd/es/upload'

const { Dragger } = Upload

export const UploadFileSection = () => {
  const { message } = App.useApp()
  const setFiles = useSetAtom(filesAtom)
  const [uploadFiles, setUploadFiles] = useState<RcFile[]>([])

  const props: UploadProps = {
    name: 'file',
    multiple: true,
    beforeUpload: (_, fileList) => {
      setUploadFiles(fileList)
    },
    fileList: uploadFiles
  }

  const onUpload = async (options: UploadRequestOption) => {
    console.log(options)
    const { onSuccess, onError, file } = options
    try {
      let fileName
      if (typeof file === 'string') {
        fileName = file
      } else {
        fileName = file.name
      }
      const response = await uploadFile(new Blob([file]), fileName)
      if (onSuccess !== undefined) {
        onSuccess({ ...response, fileName })
      }
    } catch (err) {
      if (err instanceof Error) {
        if (onError !== undefined) {
          onError(err)
        }
      } else {
        console.error('Unknown error: ', err)
      }
    }
  }

  return (
    <Dragger style={{ padding: '2rem' }} customRequest={onUpload} {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">
        Support for a single upload. Strictly prohibited from uploading company
        data or other banned files.
      </p>
    </Dragger>
  )
}
