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
import MintCardComponent from "../components/Cards/MintCard";
import trump from "../assets/trumpimages/trump.jpg";
import test from '../public/test.mp4'
import DappComponent from "../components/Dapp/dappsection";
const Home: NextPage = () => {
  const { account, chainId, active } = useWeb3React();
  const showConnectAWallet = Boolean(!account);
  const context = useWeb3React();
  const { library } = context;
const [buttonhidden, isbuttonhidden] = useState(true)
const [isended, setisended] = useState(false)
const videoRef: any = useRef(undefined) as React.MutableRefObject<undefined>;
useEffect(() => {
  //videoRef.current.defaultMuted = true;
})
useEffect(() => {
  //async function loadandplay() {
  //const load = videoRef.current.load()
  //await load
 // videoRef.current.play()
 // } 
//loadandplay()
},[])
  function RenderButtons(){
    setisended(true)
  }
 
//          
//<video ref={videoRef} className="w-screen h-screen" autoPlay muted playsInline onEnded={()=>RenderButtons()}>
////<source src="./newvideo.mp4" type='video/mp4'/>
//</video>
  return (
    <>
    <main className={styles.main}>
    <div
          dangerouslySetInnerHTML={{
            __html: `<video className="app__backgroundVideo" autoplay loop muted playsinline>
      <source src='./newvideo.mp4' type="video/mp4" />
      Your browser does not support the video tag.
</video>`,
          }}
        />

<DappComponent ended={isended}></DappComponent>
</main>
        </>
  );
};

export default Home;
