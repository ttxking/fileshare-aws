import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { Space, UploadProps } from "antd";
import {
  message,
  Layout,
  Upload,
  Typography,
  Divider,
  List,
} from "antd";
import { useEffect, useState } from "react";
import { uploadFile } from "@/service/putObject";
import zip from 'jszip'

const { Dragger } = Upload;
const { Title, Paragraph, Text } = Typography;
const { Content, Footer } = Layout;

const props: UploadProps = {
  name: "file",
  async customRequest(options){
    // zip().file('file1', options.file);
    // const content = await zip().generateAsync({ type: "blob" });
    // const file = new File([content], options.filename || 'filename', {type: content.type, lastModified:new Date().getTime()})
    uploadFile(new Blob([options.file]))
  },
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

interface DataType {
  url: string;
}

const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

export default function Home() {
  const [list, setList] = useState<DataType[]>([]);
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        setData(res.results);
        setList(res.results);
      });
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: '24px 50px 0 50px', maxWidth: '1200px', margin: '0 auto'}}>
        <Title level={1}>File Sharing</Title>
        <Paragraph>Upload a file then share link to your friends.</Paragraph>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single upload. Strictly prohibited from
            uploading company data or other banned files.
          </p>
        </Dragger>
        <Divider />
        <Title level={2}>Links</Title>
        <List
          dataSource={list}
          itemLayout="horizontal"
          renderItem={(item) => (
            <List.Item>
              <Text copyable type="secondary">
                1231231{item.url}
              </Text>
            </List.Item>
          )}
        />
      </Content>
      <Footer>
        <Space direction="horizontal" size="small" style={{ display: 'flex', justifyContent: 'space-between'}}>
          <Text type="secondary">01219449 Principles of Software Architecture Course Group Project</Text>
          <Text type="secondary">Software and Knowledge Engineering, Kasetsart University</Text>
        </Space>
      </Footer>
    </Layout>
  );
}
