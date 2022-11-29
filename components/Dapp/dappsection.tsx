import { useWeb3React } from "@web3-react/core";
import { useState, useEffect } from "react";
import { ConnectWallet } from "../Web3Modal/WalletConnect";
import d82 from '../../assets/d82.png'
import Image from "next/image";
import twitter from '../../assets/twitter.png'
import telegram from '../../assets/telegram.png'
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import dextools from '../../assets/dextools.png'
export default function DappComponent(props: any) {
  const { account, chainId, active } = useWeb3React();
  const showConnectAWallet = Boolean(!account);
  const context = useWeb3React();
  const { library } = context;
  const [distict, setdistrictactive] = useState(false);
  const [buttonhidden, setbuttonhidden] = useState(true);
  
  useEffect(() => {
    async function setvisibility() {
      if (props.ended === false) {
        setbuttonhidden(true);
      } else setbuttonhidden(false);
    }
    console.log(props.ended);
    setvisibility();
  });

  return (
<>
      {distict ? (
        <div className=" absolute -translate-y-56 transition-all  -translate-x-16">
          {" "}
          <div className='flex flex-row '>
          <div className='flex flex-col text-left mr-24'>
          <p> District 82 </p>
          <p> Token Adress: 0x00000000000000000000000000000000000</p>
          <p> Your Account: {account}</p>
          <p> Total relfections distributed: $12,213</p>
          <p> Your pending Relfections:</p>
          </div>
          <Image className='cursor-pointer text-gray-500 hover:text-gray-900 dark:hover:text-white' onClick={() => setdistrictactive(false)} height={100} width={120} src={d82}></Image>
          </div>
        </div>
      ) : (
        <div
        className={
          buttonhidden
            ? "text-center content-left absolute duration-1000 opacity-0 transition-all text-white"
            : "text-center text-white opacity-1 transition-all duration-1000 text-left absolute"
        }
      >
        <div className='absolute -translate-x-96 -translate-y-28'>  
              <Image className='cursor-pointer text-gray-500 hover:text-gray-900 dark:hover:text-white' onClick={() => window.open('twitter.com/TheDistrict82')} height={100} width={100} src={twitter}></Image>
      <p> Social net</p>
      <Image className='cursor-pointer text-gray-500 hover:text-gray-900 dark:hover:text-white' onClick={() => setdistrictactive(true)} height={100} width={100} src={d82}></Image>
      <p> The District</p>
      <Image className='cursor-pointer text-gray-500 hover:text-gray-900 dark:hover:text-white' onClick={() => window.open('t.me/Collective333')} height={100} width={100} src={telegram}></Image>
      <p> Chat</p>
      <Image className='cursor-pointer text-gray-500 hover:text-gray-900 dark:hover:text-white' onClick={() => window.open('dextools.io/app/en/ether/pair-explorer/0xc4b478a43b357f9e76c7d6dc27eef8d78980eb5d')} height={100} width={100} src={dextools}></Image>
      <p> Chart </p>
      </div>
      </div>
      
      )}
      </>

  );
}
