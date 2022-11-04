import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Web3ReactProvider } from '@web3-react/core'

import { Web3Provider } from '@ethersproject/providers'
import { useEffect } from 'react'
import {connectors } from '../components/Web3Modal/connectors'
import { useWeb3React } from '@web3-react/core'

const { chainId, account, activate, active, library, deactivate } =
useWeb3React<Web3Provider>();
function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const provider = window.localStorage.getItem("provider");
    if (provider) activate(connectors as any[typeof provider]);
  }, []);
  return(
  <Web3ReactProvider getLibrary={getLibrary}>
   <Component {...pageProps} />
   </Web3ReactProvider>
  )
}

export default MyApp
