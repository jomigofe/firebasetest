import React, { useEffect } from 'react'
import Head                 from 'next/head'

import '../styles/styles.scss'

const MyApp = ({Component, pageProps, router}) => {

  return (
    <>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <Component key={router.route} router={router} {...pageProps} />
    </>
  )
}

export default MyApp