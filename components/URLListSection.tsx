import { List, Result, Typography } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";

const { Text, Title } = Typography;

interface DataType {
  url: string;
}

export const URLListSection = () => {
  const [list, setList] = useState<DataType[]>([]);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const baseURL =
      "https://e1cfkwgoec.execute-api.ap-southeast-1.amazonaws.com/default/files/";
    const fetchUrlList = async () => {
      try {
        const response = await axios.get(baseURL);
        setList(response.data);
      } catch (err: any) {
        console.error(err);
        setIsError(true);
      }
    };
    fetchUrlList();
  }, []);

  return (
    <>
      <Title level={2}>Links</Title>
      {isError ? (
        <Result
          status="500"
          title="500"
          subTitle="Sorry, something went wrong."
        />
      ) : (
        <List
          dataSource={list}
          itemLayout="horizontal"
          renderItem={(item: { url: string }) => (
            <List.Item>
              <Text copyable type="secondary">
                {item.url}
              </Text>
            </List.Item>
          )}
        />
      )}
    </>
  );
};
