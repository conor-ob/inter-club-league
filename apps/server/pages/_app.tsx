import 'raf/polyfill'
import 'setimmediate'

import { Popover, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  ChevronLeftIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import {
  seasonIdFromStageId,
  stageNumberFromStageId
} from '@inter-club-league/utils'
import { GoogleAnalytics } from '@next/third-parties/google'
import { GcBadge } from 'app/components/gc/gc-badge'
import { Skeleton } from 'app/components/loading/skeleton'
import { colors } from 'app/design/colors'
import { useRedirectQuery } from 'app/graphql/use-redirect-query'
import { Provider } from 'app/provider'
import cx from 'classnames'
import { AppProps } from 'next/app'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { ParsedUrlQuery } from 'querystring'
import React, { Fragment } from 'react'
import { Text, TouchableOpacity, View, useColorScheme } from 'react-native'
import PWAInstallComponent from '../components/pwa-install.jsx'

import '../global.css'

export default function App({ Component, pageProps }: AppProps) {
  const colorScheme = useColorScheme()

  return (
    <>
      <Head>
        <title>ICL</title>
        <meta name='description' content='Inter Club League' />
        <link rel='icon' href='/favicon.ico' />

        <meta name='application-name' content='ICL' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta name='apple-mobile-web-app-title' content='ICL' />
        <meta name='description' content='Inter Club League' />
        <meta name='format-detection' content='telephone=no' />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta
          name='theme-color'
          content={colors[colorScheme ?? 'light'].background}
        />
        <meta
          name='background-color'
          content={colors[colorScheme ?? 'light'].background}
        />

        <link rel='manifest' href='/manifest.json' />
        <link rel='apple-touch-icon' href='/assets/icon/apple-touch-icon.png' />
        <link rel='shortcut icon' href='/favicon.ico' />

        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
        />
      </Head>
      <Provider>
        <PWAInstallComponent
          install-description='Install the app for the best experience'
          disable-screenshots='true'
          onInstallSuccess={undefined}
          onInstallFail={undefined}
          onUserChoiceResult={undefined}
          onInstallAvailable={undefined}
          onInstallHowTo={undefined}
          onInstallGallery={undefined}
        />
        <Navigation />
        <div className='h-16' />
        <Component {...pageProps} />
        <div id='pwa-safe-area' className='h-14' />
        <footer
          id='pwa-safe-area'
          className='bg-background border-t-quarternary fixed bottom-0 left-0 right-0 z-50 h-20 border-t'
        >
          <p className='text-center text-white'>Footer</p>
        </footer>
        {process.env.NODE_ENV === 'production' && (
          <GoogleAnalytics gaId='G-78W6EQTCKS' />
        )}
      </Provider>
    </>
  )
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='bg-background flex min-h-screen w-full justify-center'>
      <div className='w-full max-w-3xl'>
        <Navigation />
        {children}
      </div>
    </div>
  )
}

function Navigation() {
  const { loading, data, error } = useRedirectQuery({ seasonId: undefined })
  const navigation = [
    {
      name: 'GC',
      path: '/gc',
      href: `/gc/${data?.redirects.currentStageId ? data.redirects.currentStageId : ''}`
    },
    {
      name: 'Results',
      path: '/results',
      href: `/results/${data?.redirects.currentStageId ? data.redirects.currentStageId : ''}`
    },
    {
      name: 'Schedule',
      path: '/schedule',
      href: `/schedule/${data?.redirects.currentSeasonId ? data.redirects.currentSeasonId : ''}`
    }
  ]

  const router = useRouter()
  const pathname = router.pathname
  const query = router.query

  function isCurrent(path: string): boolean {
    return pathname.startsWith(path)
  }

  function getTitle(pathname: string, query: ParsedUrlQuery): React.ReactNode {
    if (pathname.startsWith('/gc')) {
      const stageId = query?.id
      return (
        <View className='flex-row items-center'>
          <GcBadge />
          <View className='w-2' />
          {typeof stageId === 'string' && stageId ? (
            <Text className='text-primary font-inter-medium text-lg'>{`Stage ${stageNumberFromStageId(stageId)}`}</Text>
          ) : (
            <Skeleton className='h-6 w-20 rounded-md' />
          )}
        </View>
      )
    } else if (pathname.startsWith('/results/category')) {
      const stageId = query?.id
      return (
        <View className='flex-row items-center'>
          <TouchableOpacity activeOpacity={0.6} onPress={() => router.back()}>
            <ChevronLeftIcon className='h-6 w-6' />
          </TouchableOpacity>
          <View className='w-4' />
          <GcBadge text='Results' />
          <View className='w-2' />
          {typeof stageId === 'string' && stageId ? (
            <Text className='text-primary font-inter-medium text-lg'>{`Stage ${stageNumberFromStageId(stageId)}`}</Text>
          ) : (
            <Skeleton className='h-6 w-20 rounded-md' />
          )}
        </View>
      )
    } else if (pathname.startsWith('/results')) {
      const stageId = query?.id
      return (
        <View className='flex-row items-center'>
          <GcBadge text='Results' />
          <View className='w-2' />
          {typeof stageId === 'string' && stageId ? (
            <Text className='text-primary font-inter-medium text-lg'>{`Stage ${stageNumberFromStageId(stageId)}`}</Text>
          ) : (
            <Skeleton className='h-6 w-20 rounded-md' />
          )}
        </View>
      )
    } else if (pathname.startsWith('/schedule/stage')) {
      const stageId = query?.id
      return (
        <View className='flex-row items-center'>
          <TouchableOpacity activeOpacity={0.6}>
            <Link
              href={`/schedule/${data?.redirects.currentSeasonId ? data.redirects.currentSeasonId : ''}`}
            >
              <ChevronLeftIcon className='h-6 w-6' />
            </Link>
          </TouchableOpacity>
          <View className='w-4' />
          {typeof stageId === 'string' && stageId ? (
            <GcBadge text={seasonIdFromStageId(stageId)} />
          ) : (
            <Skeleton className='h-6 w-10 rounded-md' />
          )}
          <View className='w-2' />
          {typeof stageId === 'string' && stageId ? (
            <Text className='text-primary font-inter-medium text-lg'>{`Stage ${stageNumberFromStageId(stageId)}`}</Text>
          ) : (
            <Skeleton className='h-6 w-20 rounded-md' />
          )}
        </View>
      )
    } else if (pathname.startsWith('/schedule')) {
      const seasonId = query?.id
      return (
        <View className='flex-row items-center'>
          {typeof seasonId === 'string' && seasonId ? (
            <GcBadge text={seasonId} />
          ) : (
            <Skeleton className='h-6 w-10 rounded-md' />
          )}
          <View className='w-2' />
          <Text className='text-primary font-inter-medium text-lg'>
            Schedule
          </Text>
        </View>
      )
    } else {
      return (
        <View className='flex-row items-center'>
          <GcBadge />
          <View className='w-2' />
          <Skeleton className='h-6 w-20 rounded-md' />
        </View>
      )
    }
  }

  return (
    <Popover
      as='header'
      className='bg-background border-b-quarternary fixed left-0 right-0 top-0 z-50 border-b'
    >
      {({ open }) => (
        <>
          <div className='mx-auto max-w-7xl px-4'>
            <div className='relative flex h-16 items-center justify-between'>
              <div className='px-2'>{getTitle(pathname, query)}</div>
              <div className='absolute inset-y-0 right-0 flex items-center sm:hidden'>
                {/* Mobile menu button*/}
                <Popover.Button className='hover:bg-card text-secondary hover:text-primary relative inline-flex items-center justify-center rounded-xl p-2 focus:outline-none focus:ring-0'>
                  <span className='absolute -inset-0.5' />
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XMarkIcon className='block h-8 w-8' aria-hidden='true' />
                  ) : (
                    <Bars3Icon className='block h-8 w-8' aria-hidden='true' />
                  )}
                </Popover.Button>
              </div>
              <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-end'>
                <div className='hidden sm:block'>
                  <div className='flex space-x-4'>
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cx(
                          isCurrent(item.path)
                            ? 'bg-card text-primary'
                            : 'text-secondary hover:bg-card hover:text-primary',
                          'font-inter-medium rounded-xl px-3 py-2 text-base'
                        )}
                        aria-current={isCurrent(item.path) ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Transition.Root as={Fragment}>
            <div className='lg:hidden'>
              <Transition.Child
                as={Fragment}
                enter='duration-150 ease-out'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='duration-150 ease-in'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <Popover.Overlay className='fixed inset-0 z-20 bg-black bg-opacity-25 dark:bg-opacity-75' />
              </Transition.Child>

              <Transition.Child
                as={Fragment}
                enter='duration-150 ease-out'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='duration-150 ease-in'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Popover.Panel
                  focus
                  className='top-18 absolute inset-x-0 z-30 mx-auto w-full max-w-3xl origin-top transform px-4 transition sm:hidden'
                >
                  <div className='bg-background space-y-2 rounded-xl px-4 py-4'>
                    {navigation.map((item) => (
                      <Popover.Button
                        key={item.name}
                        as={Link}
                        href={item.href}
                        className={cx(
                          'focus:outline-none focus:ring-0',
                          isCurrent(item.path)
                            ? 'bg-card text-primary'
                            : 'text-secondary hover:bg-card hover:text-primary',
                          'font-inter-medium block rounded-xl px-3 py-2 text-base'
                        )}
                        aria-current={isCurrent(item.path) ? 'page' : undefined}
                      >
                        {item.name}
                      </Popover.Button>
                    ))}
                  </div>
                </Popover.Panel>
              </Transition.Child>
            </div>
          </Transition.Root>
        </>
      )}
    </Popover>
  )
}
