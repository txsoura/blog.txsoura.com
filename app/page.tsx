import { Analytics } from '@vercel/analytics/react'
import Main from './Main'

export default async function Page() {
  return (
    <>
      <Analytics />
      <Main />
    </>
  )
}
