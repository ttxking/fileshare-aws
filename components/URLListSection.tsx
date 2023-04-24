import { linksAtom } from "@/atoms/files";
import { deleteLink } from "@/service/delete";
import { DeleteOutlined, DownloadOutlined } from "@ant-design/icons";
import { Button, List, Result, Space, Typography } from "antd";
import { useAtom } from "jotai";

const { Title, Link } = Typography;

export const URLListSection = () => {
  const [links, setLinks] = useAtom(linksAtom);

  const onDeleteLink = async (fileId: string) => {
    try {
      await deleteLink(fileId);

      setLinks((links) => links.filter((link) => link !== fileId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Title level={2}>Links</Title>
      {links.length === 0 ? (
        <Result title="Empty" subTitle="Try uploading files!" />
      ) : (
        <List
          dataSource={links}
          itemLayout="horizontal"
          renderItem={(item) => (
            <List.Item>
              <Link
                href={`${window.location.origin}/files/${item}`}
                target="_blank"
                copyable={{
                  text: `${window.location.origin}/files/${item}`,
                }}
                type="secondary"
              >
                {item}
              </Link>
              <Button
                icon={<DeleteOutlined />}
                danger
                onClick={() => onDeleteLink(item)}
              />
            </List.Item>
          )}
        />
      )}
    </>
  );
};
