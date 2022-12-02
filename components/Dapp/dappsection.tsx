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
        <div className="absolute transition-all">
 
          <div className="z-0 flex flex-row ">
            <div className="cursor-pointer flex flex-col text-left text-white">
              <p> District 82 </p>
              <p> Token Adress: 0x00000000000000000000000000000000000</p>
              <p> Your Account: {account}</p>
              <p> Total relfections distributed: $12,213</p>
              <p> Your pending Relfections:</p>
            </div>
            <Image
              className="cursor-pointer text-gray-500 hover:text-gray-900 dark:hover:text-white"
              onClick={() => setdistrictactive(false)}
              height={100}
              width={120}
              src={d82}
            ></Image>
          </div>
        </div>
      ) : (
        <div
          className={
            buttonhidden
              ? "text-center content-left absolute duration-1000 opacity-0 transition-all text-white"
              : "text-center text-white opacity-1 transition-all duration-1000 absolute"
          }
        >
          <div className="">
          </div>
          <div className="grid grid-cols-6 lg:gap-4 xl:gap-12">
            <div className={'w-20 h-20'}>
            <Image
              className="cursor-pointer text-gray-500 hover:text-gray-900 dark:hover:text-white"
              onClick={() => window.open("twitter.com/TheDistrict82")}
              height={100}
              width={100}
              src={twitter}
            ></Image>
            <p> Social net</p>
            </div>
            <div className={'w-20 h-20'}>
            <Image
              className="cursor-pointer text-gray-500 hover:text-gray-900 dark:hover:text-white"
              onClick={() => setdistrictactive(true)}
              height={100}
              width={100}
              src={d82}
            ></Image>
            <p> The District</p>
            </div>
            <div className={'bg-transparent w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28'}>3</div>
            <div className={'bg-black w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28'}>4</div>
            <div className={'bg-black w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28'}>5</div>
            <div className={'bg-black w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28'}>6</div>
            
            <div className={'bg-black w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28'}>1</div>
            <div className={'bg-black w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28'}>2</div>
            <div className={'bg-black w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28'}>3</div>
            <div className={'bg-black w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28'}>4</div>
            <div className={'bg-black w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28'}>5</div>
            <div className={'bg-black w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28'}>6</div>

            <div className={'w-20 h-20'}>
            <Image
              className="cursor-pointer text-gray-500 hover:text-gray-900 dark:hover:text-white"
              onClick={() => window.open("t.me/Collective333")}
              height={100}
              width={100}
              src={telegram}
            ></Image>
            <p> Chat</p>
            </div>
            <div className={'bg-black w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28'}>2</div>
            <div className={'bg-black w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28'}>3</div>
            <div className={'bg-black w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28'}>4</div>
            <div className={'bg-black w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28'}>5</div>
            <div className={'bg-black w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28'}>6</div>
            <div className={'bg-black w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28'}>1</div>
            <div className={'bg-black w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28'}>2</div>
            <div className={'bg-black w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28'}>3</div>
            <div className={'bg-black w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28'}>4</div>
            <div className={'bg-black w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28'}>5</div>
            <div className={'w-20 h-20'}>
            <Image
              className="cursor-pointer text-gray-500 hover:text-gray-900 dark:hover:text-white"
              onClick={() =>
                window.open(
                  "dextools.io/app/en/ether/pair-explorer/0xc4b478a43b357f9e76c7d6dc27eef8d78980eb5d"
                )
              }
              height={100}
              width={100}
              src={dextools}
            ></Image>
            <p> Chart </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
