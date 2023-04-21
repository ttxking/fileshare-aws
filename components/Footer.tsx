import { Space, Typography } from "antd";
import { Layout } from 'antd'

const { Footer: AntdFooter } = Layout
const { Text } = Typography;

export const Footer = () => {
  return (
    <AntdFooter>
      <Space
        direction="horizontal"
        size="small"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Text type="secondary">
          01219449 Principles of Software Architecture Course Group Project
        </Text>
        <Text type="secondary">
          Software and Knowledge Engineering, Kasetsart University
        </Text>
      </Space>
    </AntdFooter>
  );
};
