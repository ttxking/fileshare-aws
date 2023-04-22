import { BulbOutlined } from '@ant-design/icons'
import { Space } from 'antd'
import { Layout, Typography, Divider, ConfigProvider, theme } from 'antd'
import { useState } from 'react'

import { UploadFileSection } from '../components/UploadFileSection'
import { URLListSection } from '../components/URLListSection'
import { Footer } from '../components/Footer'
import Head from 'next/head'
import { useAtom } from 'jotai'
import { themeAtom } from '@/atoms/files'

const { Title, Paragraph } = Typography
const { Content } = Layout

export default function Home() {
  const { defaultAlgorithm, darkAlgorithm } = theme
  const [atom, setAtom] = useAtom(themeAtom)

  const handleClick = () => {
    setAtom( atom === 'dark' ? 'light' : 'dark')
  }

  return (
    <>
      <Head>
        <title>File Sharing</title>
      </Head>
      <ConfigProvider
        theme={{
          algorithm: atom === 'dark' ? darkAlgorithm : defaultAlgorithm
        }}
      >
        <Layout style={{ minHeight: '100dvh', minWidth: '100dvw' }}>
          <Content
            style={{
              padding: '24px 50px 0 50px',
              maxWidth: '1200px',
              minWidth: '700px',
              margin: '0 auto'
            }}
          >
            <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Title level={1}>File Sharing</Title>
              <BulbOutlined
                onClick={handleClick}
                style={{ color: '#1890ff', fontSize: '1.5rem' }}
              />
            </Space>
            <Paragraph>
              Upload a file then share link to your friends.
            </Paragraph>
            <UploadFileSection />
            <Divider />
            <URLListSection />
          </Content>
          <Footer />
        </Layout>
      </ConfigProvider>
    </>
  )
}
