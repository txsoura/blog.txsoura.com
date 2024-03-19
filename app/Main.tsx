'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import { rss2jsApi } from 'app/services/rss2jsApi'
import Tag from '@/components/Tag'

const MAX_DISPLAY = 3

interface Posts {
  // title, description, pubDate, link, categories, guid
  title: string
  description: string
  pubDate: string
  link: string
  categories: [string]
  guid: string
}

export default function Home() {
  const mediumFeedXml = process.env.NEXT_PUBLIC_MEDIUM_PUBLIC_URL
  const mediumPublicPage = process.env.NEXT_PUBLIC_MEDIUM_DOMAIN_URL
  const [posts, setPosts] = useState<Posts[]>([])

  const getFeedPosts = useCallback(async () => {
    try {
      const response = await rss2jsApi.get('', {
        params: {
          rss_url: mediumFeedXml,
        },
      })
      setPosts(response.data.items)

      console.log(response.data.items)
      console.log('===========================')
    } catch (error) {
      //error handling
    } finally {
      // setLoading(false)
    }
  }, [mediumFeedXml])

  useEffect(() => {
    getFeedPosts()
  }, [getFeedPosts])

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Publicações
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'Sem publicações.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { title, description, pubDate, link, categories, guid } = post
            return (
              <li key={guid} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={pubDate}>{formatDate(pubDate, siteMetadata.locale)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={link}
                              target="_blank"
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                        </div>
                        <div className="flex max-w-lg flex-wrap">
                          {categories.map((t) => {
                            return (
                              <div key={t} className="mb-2 mr-5 mt-2">
                                <Tag text={t} />
                              </div>
                            )
                          })}
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          <div>
                            <div dangerouslySetInnerHTML={{ __html: description.slice(0, 300) }} />{' '}
                            ...
                          </div>
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={link}
                          target="_blank"
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Ler mais: "${title}"`}
                        >
                          Ler mais &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>

      {mediumPublicPage && posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href={mediumPublicPage}
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="Todas as publicações"
          >
            Todas as publicações &rarr;
          </Link>
        </div>
      )}
    </>
  )
}
