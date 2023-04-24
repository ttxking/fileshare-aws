import { themeAtom } from '@/atoms/theme'
import { axiosFileAPI } from '@/service/axios'
import { BulbOutlined } from '@ant-design/icons'
import { Layout, Typography, Button, Space, theme, ConfigProvider } from 'antd'
import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const { Title } = Typography
const { Content } = Layout

type Detail = {
  presignedUrl: string
  file_name: string
}

export default function FileDetail() {
  const router = useRouter()
  const { query } = router
  const [detail, setDetail] = useState<Detail>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [atom, setAtom] = useAtom(themeAtom)
  const { defaultAlgorithm, darkAlgorithm } = theme

  const handleClick = () => {
    setAtom(atom === 'dark' ? 'light' : 'dark')
  }

  const downloadFile = async () => {
    if (detail?.presignedUrl) {
      const res = await axiosFileAPI.get(detail?.presignedUrl)
      const link = document.createElement('a')
      link.href = 'data:application/zip;base64,' + res.data
      link.setAttribute('download', detail.file_name)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  useEffect(() => {
    if (query.id) {
      setIsLoading(true)
      const fetch = async () => {
        const res = await axiosFileAPI.get(`/${query.id}`)
        setDetail(res.data)
      }
      fetch()
      setIsLoading(false)
    }
  }, [query])

  return (
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
          <Space direction="vertical">
            <Button onClick={() => router.push('/')}>Back</Button>
            <Title level={2}>{detail?.file_name}</Title>
            {!isLoading ? (
              <>
                <Button onClick={() => downloadFile()}>Download</Button>
              </>
            ) : null}
          </Space>
        </Content>
      </Layout>
    </ConfigProvider>
  )
}
