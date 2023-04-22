import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { App as AntAPP } from 'antd'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AntAPP>
      <Component {...pageProps} />
    </AntAPP>
  )
}
