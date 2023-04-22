import { linksAtom } from '@/atoms/files'
import { List, Result, Typography } from 'antd'
import { useAtomValue } from 'jotai'

const { Title, Link } = Typography

export const URLListSection = () => {
  const links = useAtomValue(linksAtom)

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
                  text: `${window.location.origin}/files/${item}`
                }}
                type="secondary"
              >
                {item}
              </Link>
            </List.Item>
          )}
        />
      )}
    </>
  )
}
