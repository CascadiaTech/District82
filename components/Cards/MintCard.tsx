import "tailwindcss-elevation";
import React, { useEffect, useState } from "react";
import { animated } from "react-spring";
import { useSpring } from "react-spring/web";
import ScrollpositionAnimation from "../../hooks/OnScroll";
import Swal from "sweetalert2";
import { abiObject } from "../../contracts/abi.mjs";
import { ExternalProvider, JsonRpcFetchFunc, Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { Contract } from "@ethersproject/contracts";
import { formatEther, parseEther } from '@ethersproject/units'
export default function MintCardComponent() {

  const [loading, setLoading] = useState(false)
  const [totalSupply, settotalySupply] = useState(Number)
  const [MintPrice, setpubmintprice] = useState(Number)
  const [wlmintprice, setwlmintprice] = useState(Number)
  const [Externalacc, setExternalacc] = useState(Boolean)
  const [isWhitelisted, setisWhitelisted] = useState(Boolean)
  const [pubmintactive, setpubmintactive ] = useState(Boolean)
  const { account } = useWeb3React()
  const showConnectAWallet = Boolean(!account)
  const context = useWeb3React()
  const { library } = context

  const [ quantity, setquantity ] = useState(Number)
  if (typeof window !== "undefined") {
    useEffect(() => {
      // Update the document title using the browser API
      ScrollpositionAnimation();
    }, [window.scrollY]);
  }

  useEffect(() => {
    async function FetchExternalacc() {
      try {
        //setLoading(true)
        const response = fetch('https://rwuejgug9a.execute-api.us-east-2.amazonaws.com/fetchuserinfohello', {
          method: 'GET',
        })
        const data = (await response).json()
        return data
      } catch (error) {
        console.log(error)
      } finally {
        console.log('success')
      }
    }

    async function FetchisWhitelisted() {
      try {
        //setLoading(true)
        const data = abiObject
        const abi = data
        const provider = new Web3Provider(library?.provider as ExternalProvider | JsonRpcFetchFunc)
        const contractaddress = '0x26937cBe389C7524798DD4577d1d14AFc3948e9c' // "clienttokenaddress"
        const contract = new Contract(contractaddress, abi, provider)
        const whitelistMint = await contract.isWhitelisted(account) //.claim()
        const Claimtxid = await whitelistMint
        return Claimtxid
      } catch (error) {
        console.log(error)
      } finally {
        console.log('success')
      }
    }

    async function FetchtotalSupply() {
      try {
        //setLoading(true)
        const provider = new Web3Provider(library?.provider as ExternalProvider | JsonRpcFetchFunc)
        const NFTabi = abiObject
        const contractaddress = '0x26937cBe389C7524798DD4577d1d14AFc3948e9c'
        const contract = new Contract(contractaddress, NFTabi, provider)
        const Totalminted = await contract.totalSupply()
        const FinalResult = Number(Totalminted)
        const minted = FinalResult
        settotalySupply(minted)
        return minted
      } catch (error) {
        console.log(error)
      } finally {
      }
    }

    
    async function FetchPublicMintPrice() {
      try {
        //setLoading(true)
        const provider = new Web3Provider(library?.provider as ExternalProvider | JsonRpcFetchFunc)
        const NFTabi = abiObject
        const contractaddress = '0x26937cBe389C7524798DD4577d1d14AFc3948e9c'
        const contract = new Contract(contractaddress, NFTabi, provider)
        const Mintprice = await contract.PUB_MINT_PRICE()
        const MintPriceformatted = formatEther(Mintprice)
        const FinalResult = Number(MintPriceformatted)
        const PublicMintPrice = FinalResult
        setpubmintprice(PublicMintPrice)
        return PublicMintPrice
      } catch (error) {
        console.log(error)
      } finally {
      }
    }

    async function FetchWLMintPrice() {
      try {
        //setLoading(true)
        const provider = new Web3Provider(library?.provider as ExternalProvider | JsonRpcFetchFunc)
        const NFTabi = abiObject
        const contractaddress = '0x26937cBe389C7524798DD4577d1d14AFc3948e9c'
        const contract = new Contract(contractaddress, NFTabi, provider)
        const Mintprice = await contract.WL_MINT_PRICE()
        const MintPriceformatted = formatEther(Mintprice)
        const FinalResult = Number(MintPriceformatted)
        const Wlmintprice = FinalResult
        setwlmintprice(Wlmintprice)
        return Wlmintprice
      } catch (error) {
        console.log(error)
      } finally {
      }
    }
    async function FetchPublicMintActive() {
      try {
        //setLoading(true)
        const provider = new Web3Provider(library?.provider as ExternalProvider | JsonRpcFetchFunc)
        const NFTabi = abiObject
        const contractaddress = '0x26937cBe389C7524798DD4577d1d14AFc3948e9c'
        const contract = new Contract(contractaddress, NFTabi, provider)
        const Mintactive= await contract.pubMintActive()
        setpubmintactive(Mintactive)
        return Mintactive
      } catch (error) {
        console.log(error)
      } finally {
      }
    }
    async function fetchacc() {
      try {
        const response = fetch('https://apemotorcycleclubuserinfo.herokuapp.com/', {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'text/html',
            accept: 'text/html',
          },
        })
        const data = (await response).json()
        const awaitarray = await data
        //const stringarray = JSON.stringify(awaitarray)
        const isFound = awaitarray.some((element: any) => {
          if (element.account === account) {
            return true
          }
          return false
        })
        return isFound
      } catch (error) {
        console.log(error)
      } finally {
        console.log('success, you have created an account!')
      }
    }
    fetchacc().then((result) => setExternalacc(result))
    FetchPublicMintPrice()
    FetchWLMintPrice()
    FetchtotalSupply()
    FetchPublicMintActive()
    FetchisWhitelisted().then((result) => setisWhitelisted(result))
  }, [MintPrice, account, library?.provider, totalSupply]
    )

 async function handleMint() {

    try {
      //setLoading(true)
      const data = abiObject
      const abi = data
      const contractaddress = '0x26937cBe389C7524798DD4577d1d14AFc3948e9c' // "clienttokenaddress"

        const provider = new Web3Provider(library?.provider as ExternalProvider | JsonRpcFetchFunc)
        //const provider = getDefaultProvider()
        const signer = provider.getSigner()
        const contract = new Contract(contractaddress, abi, signer)
        const ethervalue = quantity * MintPrice
        const etherstringvalue = JSON.stringify(ethervalue)
        const MintNFT = await contract.publicMint(quantity, { value: parseEther(etherstringvalue) }) //.claim()
        const signtransaction = await signer.signTransaction(MintNFT)
        const Claimtxid = await signtransaction
        return Claimtxid
      
    } catch (error) {
      console.log(error)
      setLoading(false)
    } finally {
      Swal.fire('Congratulations! You have minted an ApeMotorcycleClub NFT', 'success')
    }

}



  //md:clip-path-clipsides border-t-4 border-b-4
  return (
    <div className="h-96 mt-56 js-show-on-scroll relative justify-self-auto w-full md:absolute justify-self-end  pr-10 md:mt-80 z-index-50 content-start justify-start items-right mb-60 bg-transparent shadow-md hover:bg-white-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <div className="flex flex-row items-right justify-end w-screen">
        <div className="invisible sm:invisible md:visible w-1/3 lg:visible justify-self-end content-end justify-right bg-white h-2 rounded-full w-1/2"></div>
      </div>
      <h5
        style={{ fontFamily: "Cinzel, serif" }}
        className="mt-12 text-2xl sm:text-3xl mb:mb-2 text-4xl font-bold text-right mr-12 tracking-tight text-gray-100 dark:text-white"
      >
        Welcome Back Trump Collection
      </h5>
      <button
      onClick={() => handleMint()}
        style={{ fontFamily: "Cinzel, serif" }}
        type="button"
        className="w-screen elevation-10 hover:elevation-50 md:w-96 h-24 clip-path-mycorners justify-self-start mt-10
        text-gray-100 bg-blue-700 transition ease-in-out duration-700 hover:scale-105 bg-blue-800 focus:ring-4
        focus:ring-blue-300 font-medium rounded-lg text-4xl px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 
        focus:outline-none dark:focus:ring-blue-800 text-4xl"
      >
        Mint
      </button>
      <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => { if (Number(e.target.value) > 0) {setquantity(Number(e.target.value))}}}
              type="number"
              id="fname"
              name="order_size"
              placeholder="size of order"
            ></input>
      <p className="sm:mr-16 mt-10 text-right font-normal text-white dark:text-gray-400">
        You can ony mint 1 NFT per wallet
      </p>
      <div className="flex flex-row items-right mt-10 justify-end w-screen">
        <div className="w-screen invisible sm:invisible md:visible w-1/2 lg:visible justify-self-end content-end justify-right bg-white h-2 rounded-full w-3/4 "></div>
      </div>
    </div>
  );
}
