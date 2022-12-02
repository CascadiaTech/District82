import { useWeb3React } from "@web3-react/core";
import { useState, useEffect } from "react";
import { ConnectWallet } from "../Web3Modal/WalletConnect";
import d82 from "../../assets/d82.png";
import Image from "next/image";
import twitter from "../../assets/twitter.png";
import telegram from "../../assets/telegram.png";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import dextools from '../../assets/dextools.png'
import { Contract } from "@ethersproject/contracts";
import Swal from "sweetalert2";
import { abiObject } from "../../contracts/abi.mjs";
import { ExternalProvider, JsonRpcFetchFunc, Web3Provider } from "@ethersproject/providers";
export default function DappComponent(props: any) {
  const { account, chainId, active } = useWeb3React();
  const showConnectAWallet = Boolean(!account);
  const context = useWeb3React();
  const { library } = context;
  const [distict, setdistrictactive] = useState(false);
  const [buttonhidden, setbuttonhidden] = useState(true);
  const [loading, setLoading] = useState(false);
  const [pendingreflections, setpendingreflections] = useState(Number);
  const [uniswaprovider, setuniswapprivder] = useState();
  const D82contract = "0x00000000000000000000000000000";

  
  useEffect(() => {
    async function setvisibility() {
      if (props.ended === false) {
        setbuttonhidden(true);
      } else setbuttonhidden(false);
    }
    console.log(props.ended);

    async function PendingReflections() {
      try {
        setLoading(true);
        const abi = abiObject;
        const provider = new Web3Provider(
          library?.provider as ExternalProvider | JsonRpcFetchFunc
        );
        const contractaddress = "0x103b603D95F769a8184c1e7cd49c81Bc826aB6E8"; // "clienttokenaddress"
        const contract = new Contract(contractaddress, abi, provider);
        const rewardToken = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
        const Reflections = await contract.withdrawableDividendOf(
          account,
          rewardToken
        ); //.claim()
        //const FinalReflections = BigNumber.from(Reflections)
        // const test = formatEther(String(Reflections))
        const finalnumber = Number(Reflections);
        setpendingreflections(finalnumber);
        console.log(Reflections);

        return finalnumber;
      } catch (error) {
        console.log(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
    PendingReflections();
    setvisibility();
  }, [account]);

  
  async function Claim() {
    if (!account) {
      Swal.fire({
        icon: "error",
        title: "Connect Your Wallet to Claim Your Reflections",
        timer: 5000,
      });
    }
    if (pendingreflections <= 0) {
      Swal.fire({
        icon: "error",
        title: "Currently You Do Not Have Any Reflections",
        timer: 5000,
      });
    }
    try {
      setLoading(true);
      const abi = abiObject;
      const provider = new Web3Provider(
        library?.provider as ExternalProvider | JsonRpcFetchFunc
      );
      const signer = provider.getSigner();
      const contractaddress = "0x103b603D95F769a8184c1e7cd49c81Bc826aB6E8"; // "clienttokenaddress"
      const contract = new Contract(contractaddress, abi, signer);
      const ClaimTokens = await contract.claim(); //.claim()
      const signtransaction = await signer.signTransaction(ClaimTokens);
      const Claimtxid = await signtransaction;
      console.log(Claimtxid);

      return Claimtxid;
      /////
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  function numberWithCommas(num: any) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function insertDecimal(num: any) {
    return Number((num / 1000000).toFixed(3));
  }
  console.log(insertDecimal(pendingreflections));
  const test2 = insertDecimal(pendingreflections);
  const formattedBalance = numberWithCommas(test2);

  const jsonRpcUrlMap = {
    1: ["https://mainnet.infura.io/v3/fc5d70bd4f49467289b3babe3d8edd97"],
    3: ["https://ropsten.infura.io/v3/<YOUR_INFURA_PROJECT_ID>"],
  };

  return (
    <>
      {distict ? (
        <div className="absolute transition-all">
          <div className="flex flex-row ">
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
          <div className="items-center justify-center w-96 content-center flex flex-col text-center text-white">
            <h1> Claim Your relfection</h1>
            <p> Your pending relfections: xxxxxx</p>
            <button
              style={{ fontFamily: "Cinzel, serif" }}
              type="button"
              className="tn: mx-0 w-full elevation-10 hover:elevation-50 sm: mx-24 md: mx-48 h-24 clip-path-mycorners justify-self-center mt-10
            text-gray-100 bg-gray-400 transition ease-in-out duration-700 hover:bg-gray-800 hover:text-white focus:ring-4
            focus:ring-blue-300 font-medium rounded-lg text-3xl px-5 py-2.5 mb-6 dark:bg-blue-600 dark:hover:bg-blue-700 
            focus:outline-none dark:focus:ring-blue-800 text-4xl lg: mx-48"
            >
              Claim
            </button>
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
          <div className=""></div>
          <div className="grid grid-cols-6 lg:gap-4 xl:gap-12">
            <div className={"w-20 h-20"}>
              <Image
                className="cursor-pointer text-gray-500 hover:text-gray-900 dark:hover:text-white"
                onClick={() => window.open("twitter.com/TheDistrict82")}
                height={100}
                width={100}
                src={twitter}
              ></Image>
              <p> Social net</p>
            </div>
            <div className={"w-20 h-20"}>
              <Image
                className="cursor-pointer text-gray-500 hover:text-gray-900 dark:hover:text-white"
                onClick={() => setdistrictactive(true)}
                height={100}
                width={100}
                src={d82}
              ></Image>
              <p> The District</p>
            </div>
            <div
              className={
                "bg-transparent w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28"
              }
            >
              3
            </div>
            <div
              className={"bg-black w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28"}
            >
              4
            </div>
            <div
              className={"bg-black w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28"}
            >
              5
            </div>
            <div
              className={"bg-black w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28"}
            >
              6
            </div>

            <div
              className={"bg-black w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28"}
            >
              1
            </div>
            <div
              className={"bg-black w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28"}
            >
              2
            </div>
            <div
              className={"bg-black w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28"}
            >
              3
            </div>
            <div
              className={"bg-black w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28"}
            >
              4
            </div>
            <div
              className={"bg-black w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28"}
            >
              5
            </div>
            <div
              className={"bg-black w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28"}
            >
              6
            </div>

            <div className={"w-20 h-20"}>
              <Image
                className="cursor-pointer text-gray-500 hover:text-gray-900 dark:hover:text-white"
                onClick={() => window.open("t.me/Collective333")}
                height={100}
                width={100}
                src={telegram}
              ></Image>
              <p> Chat</p>
            </div>
            <div
              className={"bg-black w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28"}
            >
              2
            </div>
            <div
              className={"bg-black w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28"}
            >
              3
            </div>
            <div
              className={"bg-black w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28"}
            >
              4
            </div>
            <div
              className={"bg-black w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28"}
            >
              5
            </div>
            <div
              className={"bg-black w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28"}
            >
              6
            </div>
            <div
              className={"bg-black w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28"}
            >
              1
            </div>
            <div
              className={"bg-black w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28"}
            >
              2
            </div>
            <div
              className={"bg-black w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28"}
            >
              3
            </div>
            <div
              className={"bg-black w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28"}
            >
              4
            </div>
            <div
              className={"bg-black w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28"}
            >
              5
            </div>
            <div className={"w-20 h-20"}>
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
