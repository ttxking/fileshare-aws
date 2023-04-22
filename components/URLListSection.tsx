import { filesAtom } from '@/atoms/files'
import { List, Result, Typography } from 'antd'
import { useAtomValue } from 'jotai'

const { Text, Title } = Typography

export const URLListSection = () => {
  const files = useAtomValue(filesAtom)

  return (
    <>
      <Title level={2}>Links</Title>
      {files.length === 0 ? (
        <Result title="Empty" subTitle="Try uploading files!" />
      ) : (
        <List
          dataSource={files}
          itemLayout="horizontal"
          renderItem={(item) => (
            <List.Item>
              <Text
                copyable={{
                  text: `${window.location.origin}/files/${item.fileId}`
                }}
                type="secondary"
              >
                {item.fileId}
              </Text>
            </List.Item>
          )}
        />
      )}
    </>
  )
}
