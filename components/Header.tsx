import siteMetadata from '@/data/siteMetadata'
import Logo from '@/data/logo.svg'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'

const Header = () => {
  const subscribeUrl = process.env.NEXT_PUBLIC_MEDIUM_SUBSCRIBE_URL

  return (
    <header className="flex items-center justify-between py-10">
      <div>
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          <div className="flex items-center justify-between">
            <div className="mr-3">
              <Logo />
            </div>
            {typeof siteMetadata.headerTitle === 'string' ? (
              <div className="hidden h-6 text-2xl font-semibold sm:block">
                {siteMetadata.headerTitle}
              </div>
            ) : (
              siteMetadata.headerTitle
            )}
          </div>
        </Link>
      </div>
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        {subscribeUrl && (
          <Link
            href={subscribeUrl}
            target="_blank"
            className="hidden font-medium text-gray-900 dark:text-gray-100 sm:block"
          >
            Subscreva-se
          </Link>
        )}

        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
