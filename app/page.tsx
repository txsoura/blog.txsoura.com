import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Main from './Main'

export default async function Page() {
  return (
    <>
      <Analytics />
      <SpeedInsights />
      <Main />
    </>
  )
}
