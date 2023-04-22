import { BulbOutlined } from '@ant-design/icons'
import {
  Button,
  Space,
  Layout,
  Typography,
  Divider,
  ConfigProvider,
  theme as appTheme,
  App
} from 'antd'
import { useAtomValue, useSetAtom } from 'jotai'
import { useCallback } from 'react'
import { UploadFileSection } from '../components/UploadFileSection'
import { URLListSection } from '../components/URLListSection'
import { Footer } from '../components/Footer'
import Head from 'next/head'
import { upload } from '@/service/upload'
import { filesAtom, linksAtom } from '@/atoms/files'
import { useAtom } from 'jotai'
import { themeAtom } from '@/atoms/theme'

const { Title, Paragraph } = Typography
const { Content } = Layout

export default function Home() {
  const { message } = App.useApp()
  const { defaultAlgorithm, darkAlgorithm } = appTheme
  const files = useAtomValue(filesAtom)
  const setLinks = useSetAtom(linksAtom)
  const [theme, setTheme] = useAtom(themeAtom)

  const handleClick = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const handleUpload = useCallback(async () => {
    try {
      const response = await upload(...files)
      setLinks((links) => [...links, response.fileId])
      message.success('Upload success')
    } catch (err) {
      if (err instanceof Error) {
        message.error('Upload error')
      } else {
        message.error('Unknown error')
      }
      console.error('Error: ', err)
    }
  }, [files, setLinks, message])

  return (
    <>
      <Head>
        <title>File Sharing</title>
      </Head>
      <ConfigProvider
        theme={{
          algorithm: theme === 'dark' ? darkAlgorithm : defaultAlgorithm
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
              <Button onClick={handleUpload} disabled={files.length === 0}>
                Upload
              </Button>
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
