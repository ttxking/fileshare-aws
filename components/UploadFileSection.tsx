import { uploadFile } from "@/service/putObject";
import { InboxOutlined } from "@ant-design/icons";
import { UploadProps, message, Upload } from "antd";
import type { UploadRequestOption } from "rc-upload/lib/interface";

const { Dragger } = Upload

const props: UploadProps = {
  name: "file",
  async onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

export const UploadFileSection = () => {

  const onUpload = async (options: UploadRequestOption) => {
    const { onSuccess, onError, file } = options;
    try {
      const result = await uploadFile(
        new Blob([options.file]),
        options.file.name as string
      );
      onSuccess("Ok");
    } catch (err: any) {
      console.log("Eroor: ", err);
      onError({ err });
    }
  };
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
  );
};