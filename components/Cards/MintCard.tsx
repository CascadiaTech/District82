import "tailwindcss-elevation";
import React, { useCallback, useEffect, useState } from "react";
import { animated } from "react-spring";
import { useSpring } from "react-spring/web";
import ScrollpositionAnimation from "../../hooks/OnScroll";
import Swal from "sweetalert2";
import { abiObject } from "../../contracts/abi.mjs";
import {
  ExternalProvider,
  JsonRpcFetchFunc,
  JsonRpcSigner,
  Web3Provider,
} from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { Contract } from "@ethersproject/contracts";
import { formatEther, parseEther } from "@ethersproject/units";
export default function MintCardComponent() {
  const [loading, setLoading] = useState(false);
  const [totalSupply, settotalySupply] = useState(Number);
  const [MintPrice, setpubmintprice] = useState(Number);
  const [pubmintactive, setpubmintactive] = useState(Boolean);
  const { account, chainId, active } = useWeb3React();
  const showConnectAWallet = Boolean(!account);
  const context = useWeb3React();
 // const [lib, setlib] = useState(JsonRpcSigner)
  const { library } = context;
  const [quantity, setquantity] = useState(Number);
  if (typeof window !== "undefined") {
    useEffect(() => {
      // Update the document title using the browser API
      ScrollpositionAnimation();
    }, [window.scrollY]);
  }

  useEffect(() => {
    async function FetchtotalSupply() {
      try {
        //setLoading(true)
        const provider = new Web3Provider(
          library?.provider as ExternalProvider | JsonRpcFetchFunc
        );
        const NFTabi = abiObject;
        const contractaddress = "0x8ea2b6Ca51B7C7225b34988FC762F94Dd025a8d4";
        const contract = new Contract(contractaddress, NFTabi, provider);
        const Totalminted = await contract.totalSupply();
        const FinalResult = Number(Totalminted);
        const minted = FinalResult;
        settotalySupply(minted);
        return minted;
      } catch (error) {
        console.log(error);
      } finally {
      }
    }

    async function FetchPublicMintPrice() {
      try {
        //setLoading(true)
        const provider = new Web3Provider(
          library?.provider as ExternalProvider | JsonRpcFetchFunc
        );
        const NFTabi = abiObject;
        const contractaddress = "0x8ea2b6Ca51B7C7225b34988FC762F94Dd025a8d4";
        const contract = new Contract(contractaddress, NFTabi, provider);
        const Mintprice = await contract.PUB_MINT_PRICE();
        const MintPriceformatted = formatEther(Mintprice);
        const FinalResult = Number(MintPriceformatted);
        const PublicMintPrice = FinalResult;
        setpubmintprice(PublicMintPrice);
        return PublicMintPrice;
      } catch (error) {
        console.log(error);
      } finally {
      }
    }

    async function FetchPublicMintActive() {
      try {
        //setLoading(true)
        const provider = new Web3Provider(
          library?.provider as ExternalProvider | JsonRpcFetchFunc
        );
        const NFTabi = abiObject;
        const contractaddress = "0x8ea2b6Ca51B7C7225b34988FC762F94Dd025a8d4";
        const contract = new Contract(contractaddress, NFTabi, provider);
        const Mintactive = await contract.pubMintActive();
        setpubmintactive(Mintactive);
        return Mintactive;
      } catch (error) {
        console.log(error);
      } finally {
      }
    }

    FetchPublicMintPrice();
    FetchtotalSupply();
    FetchPublicMintActive();
  }, [MintPrice, account, library?.provider, totalSupply]);

  const handleMint = useCallback(async () => {
    if (!account || !quantity || !library) {
      Swal.fire({
        icon: "error",
        title: "connect your wallet to mint, and enter mint quantity",
      });
    }

    try {
      setLoading(true);
      const data = abiObject;
      const abi = data;
      const contractaddress = "0x8ea2b6Ca51B7C7225b34988FC762F94Dd025a8d4"; // "clienttokenaddress"

      const provider = new Web3Provider(
        library?.provider);
      //const provider = getDefaultProvider()
      const signer = await provider.getSigner()
      await signer
      //setlib(signer as JsonRpcSigner)
      const contract = new Contract(contractaddress, abi, signer);
      const ethervalue = quantity * 20000000;
      const etherstringvalue = JSON.stringify(ethervalue);
      const MintNFT = await contract.publicMint(quantity, {
        value: parseEther(etherstringvalue),
      }); //.claim()
     // const MintNFT = await contract.publicMint(1, {
      //  value: 0.02,
     // });
      //const hexMessage = utils.hexlify(utils.toUtf8Bytes(MintNFT))
      const signtransaction = await signer.sendTransaction(MintNFT);
      const Claimtxid = await signtransaction;
      Swal.fire({
        icon: "success",
        title: "Congratulations you have minted a Welcome Back Trump NFT",
        text: "go see your item on opensea",
      });
      return Claimtxid;
      /////
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, []);


  //md:clip-path-clipsides border-t-4 border-b-4
  return (
    <div className="flex flex-col content-center items-center text-center mx-auto justify-center js-show-on-scroll">
      <h5
        style={{ fontFamily: "Cinzel, serif" }}
        className="text-center mt-12 text-2xl sm:text-3xl mb:mb-2 text-4xl font-bold tracking-tight text-gray-100 dark:text-white"
      >
        Welcome Back Trump Collection
      </h5>
      <button
        onClick={() => handleMint()}
        style={{ fontFamily: "Cinzel, serif" }}
        type="button"
        className="w-screen mb-12 justify-center elevation-10 align-center hover:elevation-50 md:w-96 h-24 clip-path-mycorners justify-self-center mt-10
        text-gray-100 bg-blue-700 transition ease-in-out duration-700 hover:scale-105 bg-blue-800 focus:ring-4
        focus:ring-blue-300 font-medium rounded-lg text-4xl px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 
        focus:outline-none dark:focus:ring-blue-800 text-4xl"
      >
        Mint
      </button>
      <input
        className="bg-gray-50 mb-12 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(e) => {
          if (Number(e.target.value) > 0) {
            setquantity(Number(e.target.value));
          }
        }}
        type="number"
        id="fname"
        name="order_size"
        placeholder="amount of nfts"
      ></input>
    </div>
  );
}
