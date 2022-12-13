import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import HeaderComponent from "../components/Header/HeaderComponent";
import "tailwindcss-elevation";
import FooterComponent from "../components/Footer/FooterComponent";
import DualCardComponent from "../components/DualCards/DualCardComponent";
import ScrollpositionAnimation from "../hooks/OnScroll";
import React, { useEffect, useRef, useState } from 'react';
import "@uniswap/widgets/fonts.css";
import { useWeb3React } from "@web3-react/core";
import DappComponent from "../components/Dapp/dappsection";
const Home: NextPage = () => {
  const { account, chainId, active } = useWeb3React();
  const showConnectAWallet = Boolean(!account);
  const context = useWeb3React();
  const { library } = context;
const [isended, setisended] = useState(false)
const videoRef: any = useRef(null);
useEffect(() => {
  videoRef.current.defaultMuted = true;
})

const attemptPlay = () => {
  videoRef &&
  videoRef.current &&
  videoRef.current.load() &&
  videoRef.current.play().catch((error: any) => {console.log("error attempting to play", error)})
}
useEffect(() => {
attemptPlay()
},[])
  function RenderButtons(){
    setisended(true)
  }
 // dangerouslySetInnerHTML={{
 //   __html: `<video className="app__backgroundVideo" autoplay loop muted playsinline>
//<source src='./newvideo.mp4' type="video/mp4" />
//Your browser does not support the video tag.
//</video>`,
  //}}


  return (
    <>

<div className=" h-screen flex flex-col items-center justify-center text-center text-white py-0 px-3">
  
    <div className="video-docker absolute top-0 left-0 w-full h-full overflow-hidden">
        <video ref={videoRef} className="min-w-full min-h-full absolute object-cover" playsInline onEnded={()=>RenderButtons()} autoPlay muted >
        <source src="./newbackground.mp4" type='video/mp4'/> Your browser does not support the video tag, update your browser
        </video>

    </div>
    <DappComponent ended={isended}></DappComponent>
</div>


    



        </>
  );
};

export default Home;
