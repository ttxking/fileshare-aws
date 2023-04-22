import { UploadProps, Upload } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { useAtom } from 'jotai'
import { uploadFilesAtom } from '@/atoms/files'

const { Dragger } = Upload

export const UploadFileSection = () => {
  const [uploadFiles, setUploadFiles] = useAtom(uploadFilesAtom)

  const props: UploadProps = {
    name: 'file',
    multiple: true,
    onRemove: (file) => {
      const index = uploadFiles.indexOf(file)
      const newFileList = uploadFiles.slice()
      newFileList.splice(index, 1)
      setUploadFiles(newFileList)
    },
    beforeUpload: (_, fileList) => {
      setUploadFiles(fileList)
      return false
    },
    fileList: uploadFiles
  }

  return (
    <Dragger style={{ padding: '2rem' }} {...props}>
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
