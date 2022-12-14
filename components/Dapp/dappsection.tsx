import { useWeb3React } from "@web3-react/core";
import "../../styles/Home.module.css";
import { useState, useEffect } from "react";
import { ConnectWallet } from "../Web3Modal/WalletConnect";
import District from "../../assets/District.png";
import Image from "next/image";
import twitter from "../../assets/twitter.png";
import chat from "../../assets/chat.png";
import "react-datetime/css/react-datetime.css";
import Chart from "../../assets/Chart.png";
import { Contract } from "@ethersproject/contracts";
import Swal from "sweetalert2";
import { abiObject } from "../../contracts/abi.mjs";
import {
  ExternalProvider,
  JsonRpcFetchFunc,
  Web3Provider,
} from "@ethersproject/providers";
import Typewriter from "typewriter-effect";
import claim from "../../assets/claim.png";
import { formatEther } from "@ethersproject/units";
export default function DappComponent(props: any) {
  const { account, chainId, active } = useWeb3React();
  const showConnectAWallet = Boolean(!account);
  const context = useWeb3React();
  const { library } = context;
  const [balance, setbalance] = useState(Number);
  const [totaldistributed, settotaldistributed] = useState(Number);
  const [distict, setdistrictactive] = useState(false);
  const [buttonhidden, setbuttonhidden] = useState(true);
  const [loading, setLoading] = useState(false);
  const [pendingreflections, setpendingreflections] = useState(Number);
  const [uniswaprovider, setuniswapprivder] = useState();
  //const D82contract = "0x00000000000000000000000000000";

  useEffect(() => {
    async function Fetchbalance() {
      if (!account) {
        console.log({
          message: "Hold On there Partner, there seems to be an Account err!",
        });
        return;
      }

      try {
        setLoading(true);
        const abi = abiObject;
        const provider = new Web3Provider(
          library?.provider as ExternalProvider | JsonRpcFetchFunc
        );
        const contractaddress = "0xFC2C1EdBc2715590667c7c4BE0563010aBC9E205"; // "clienttokenaddress"
        const contract = new Contract(contractaddress, abi, provider);
        const balance = await new contract.balanceOf(account); //.claim(account,amount)
        const Claimtxid = await balance;
        const finalbalance = Number(balance);
        const Fixeddecimals = finalbalance.toFixed(2);
        const Numberify = Number(Fixeddecimals);
        setbalance(Numberify);
        console.log(Numberify);

        return Claimtxid;
        /////
      } catch (error) {
        console.log(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }

    async function PendingReflections() {
      try {
        setLoading(true);
        const abi = abiObject;
        const provider = new Web3Provider(
          library?.provider as ExternalProvider | JsonRpcFetchFunc
        );
        const contractaddress = "0xFC2C1EdBc2715590667c7c4BE0563010aBC9E205"; // "clienttokenaddress"
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
    async function FetchDistributed() {
      try {
        setLoading(true);
        const abi = abiObject;
        const provider = new Web3Provider(
          library?.provider as ExternalProvider | JsonRpcFetchFunc
        );
        const contractaddress = "0xFC2C1EdBc2715590667c7c4BE0563010aBC9E205"; // "clienttokenaddress"
        const contract = new Contract(contractaddress, abi, provider);
        const rewardToken = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
        const Reflections = await contract.getTotalDividendsDistributed(
          rewardToken
        );
        const finalnumber = Number(Reflections);
        settotaldistributed(finalnumber);
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
    Fetchbalance();
    FetchDistributed();
  }, [account]);

  useEffect(() => {
    async function setvisibility() {
      if (props.ended === false) {
        setbuttonhidden(true);
      } else setbuttonhidden(false);
    }
    console.log(props.ended);
    setvisibility();
  });

  async function Claim() {
    if (!account) {
      Swal.fire({
        icon: "error",
        title: "Connect Your Wallet to Claim Your Reflections",
        timer: 5000,
      });
    }
    try {
      setLoading(true);
      const HasReflections =
        pendingreflections == 0
          ? Swal.fire({
              icon: "error",
              title: "Currently You Do Not Have Any Reflections",
              timer: 5000,
            })
          : setLoading(false);
      await HasReflections;
      const abi = abiObject;
      const provider = new Web3Provider(
        library?.provider as ExternalProvider | JsonRpcFetchFunc
      );
      const signer = provider.getSigner();
      const contractaddress = "0xFC2C1EdBc2715590667c7c4BE0563010aBC9E205"; // "clienttokenaddress"
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
  const decimalpendingreflections = insertDecimal(pendingreflections);
  const formattedRelfections = numberWithCommas(decimalpendingreflections);

  const Decimal_DistributedReflections = insertDecimal(totaldistributed);
  const formatted_distribution = numberWithCommas(
    Decimal_DistributedReflections
  );

  const Decimal_balance = insertDecimal(balance / 1000000000000);
  const formatted_balance = numberWithCommas(Decimal_balance);

  const jsonRpcUrlMap = {
    1: ["https://mainnet.infura.io/v3/fc5d70bd4f49467289b3babe3d8edd97"],
    3: ["https://ropsten.infura.io/v3/<YOUR_INFURA_PROJECT_ID>"],
  };

  return (
    <>
      {buttonhidden || account ? (
        <>
          {distict ? (
            <div className="absolute transition-all">
              <div className="flex flex-row ">
                <div className="flex flex-col text-left text-white">
                  <p className={"my-8"}></p>
                  <div className="pt-5 grid grid-cols-4  mx-20">
                    <div className="mr-28 bg-transparent justify-center text-center col-span-3  h-fit">
                      <h1
                        style={{ fontFamily: "Audiowide" }}
                        className={"text-bold text-gray-100 text-3xl"}
                      >
                        Claim Reflections
                      </h1>
                      <p
                        style={{ fontFamily: "Audiowide" }}
                        className={"text-gray-100 text-xl"}
                      >
                        {" "}
                        Your pending Reflections: <br /> ${
                          formattedRelfections
                        }{" "}
                        USDC
                      </p>
                      <Image
                        className="cursor-pointer justify-center justify-self-center text-gray-500 hover:scale-110 duration-700 transition-all dark:hover:text-white"
                        onClick={() => Claim()}
                        height={150}
                        width={350}
                        src={claim}
                      ></Image>
                    </div>

                    <div className="bg-transparent justify-center col-span-1 text-center h-fit">
                      <Image
                        className="elevation-24 cursor-pointer text-gray-500 hover:scale-110 transition-all duration-700 dark:hover:text-white"
                        onClick={() => setdistrictactive(false)}
                        height={160}
                        width={160}
                        src={District}
                      ></Image>
                    </div>
                    <div
                      style={{ fontFamily: "Audiowide" }}
                      className="text-left elevation-24 bg-regalpurple rounded-2xl px-4 mb-2 col-span-4 h-fit pb-3 pt-10"
                    >
                      <div
                        style={{ fontFamily: "Audiowide" }}
                        className="text-bold text-gray-100 text-3xl"
                      >
                        <Typewriter
                          options={{
                            strings: ["District 82"],
                            wrapperClassName: "Audiowide",
                            autoStart: true,
                            loop: true,
                            deleteSpeed: 1500000000000000,
                          }}
                        />
                      </div>
                      <div
                        onClick={() =>
                          window.open(
                            "https://etherscan.io/token/0xfc2c1edbc2715590667c7c4be0563010abc9e205/"
                          )
                        }
                        className="cursor-pointer text-gray-100 text-1xl hover:text-gray-300"
                      >
                        <Typewriter
                          options={{
                            strings: [
                              "Token address: 0xFC2C1EdBc2715590667c7c4BE0563010aBC9E205",
                            ],
                            wrapperClassName: "Audiowide",
                            autoStart: true,
                            loop: true,
                            deleteSpeed: 1500000000000000,
                            delay: 10,
                          }}
                        />
                      </div>
                      <span className=" text-gray-100 text-xl">
                        <Typewriter
                          options={{
                            strings: [
                              `Total Reflections Distributed: $ ${formatted_distribution}`,
                            ],
                            autoStart: true,
                            loop: true,
                            deleteSpeed: 1500000000000000,
                            delay: 10,
                          }}
                        />
                      </span>
                    </div>
                    <div className="text-left elevation-10 bg-regalpurple rounded-2xl px-4 col-span-4 mb-10 h-fit py-10">
                      <span
                        onClick={() =>
                          window.open(
                            `https://app.zerion.io/${account}/overview`
                          )
                        }
                        className="cursor-pointer text-gray-100 text-1xl hover:text-gray-300"
                      >
                        <Typewriter
                          options={{
                            strings: [`Your Account: ${account}`],
                            wrapperClassName: "Audiowide",
                            autoStart: true,
                            loop: true,
                            deleteSpeed: 1500000000000000,
                            delay: 40,
                          }}
                        />
                      </span>
                      <span className=" text-gray-100 text-xl">
                        <Typewriter
                          options={{
                            strings: [`Your D82 Balance: ${formatted_balance}`],
                            autoStart: true,
                            loop: true,
                            deleteSpeed: 1500000000000000,
                            delay: 20,
                          }}
                        />
                      </span>
                      <span className=" text-gray-100 text-xl">
                        <Typewriter
                          options={{
                            strings: [
                              `Your Percentage of the supply: ${(
                                formatted_balance / 100000
                              ).toFixed(4)} %`,
                            ],
                            autoStart: true,
                            loop: true,
                            deleteSpeed: 1500000000000000,
                            delay: 30,
                          }}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="items-center justify-center w-96 content-center flex flex-col text-center text-white"></div>
            </div>
          ) : (
            <div
              className={
                buttonhidden
                  ? "text-center content-left absolute duration-1000 opacity-0 transition-all text-white"
                  : "text-center text-white opacity-1 transition-all duration-1000 absolute"
              }
            >
              <div className="grid grid-cols-9 gap-8 xl:gap-12">
                <div className={"cursor-pointer w-20 h-20 "}>
                  <Image
                    className="text-gray-500 elevation-24 hover:text-gray-900 hover:scale-110 transition-all duration-700 dark:hover:text-white"
                    onClick={() => setdistrictactive(true)}
                    height={100}
                    width={100}
                    src={District}
                  ></Image>
                  <p style={{ fontFamily: "Audiowide" }}> District82</p>
                </div>
                <div                   className={
                    "bg-transparent w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28"
                  }></div>
                <div
                  className={
                    "bg-transparent w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28"
                  }
                ></div>
                <div
                  className={
                    "bg-transparent w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28"
                  }
                ></div>
                <div
                  className={
                    "bg-transparent w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28"
                  }
                ></div>
                <div
                  className={
                    "bg-transparent w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28"
                  }
                ></div>

                <div
                  className={
                    "bg-transparent w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28"
                  }
                >
                  {" "}
                  <div className={"w-20 h-20"}>

                  </div>
                </div>
                <div
                  className={
                    "bg-transparentw-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28"
                  }
                ></div>
                <div
                  className={
                    "bg-transparent w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28"
                  }
                ></div>
                <div
                  className={
                    "bg-transparent w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28"
                  }
                >                    <Image
                className="cursor-pointer text-gray-500 hover:scale-110 transition-all duration-700 dark:hover:text-white"
                onClick={() =>
                  window.open("https://twitter.com/TheDistrict82")
                }
                height={100}
                width={100}
                src={twitter}
              ></Image>
              <p style={{ fontFamily: "Audiowide" }}> Social net</p></div>
                <div
                  className={
                    "bg-transparent w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28"
                  }
                ></div>
                <div
                  className={
                    "bg-transparent w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28"
                  }
                ></div>

                <div className={"w-20 h-20"}>

                </div>
                <div
                  className={
                    "bg-transparent w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28"
                  }
                ></div>
                <div
                  className={
                    "bg-transparent w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28"
                  }
                ></div>
                <div
                  className={
                    "bg-transparent w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28"
                  }
                ></div>
                <div
                  className={
                    "bg-transparent w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28"
                  }
                ></div>
                <div
                  className={
                    "bg-transparent w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28"
                  }
                ></div>
                <div
                  className={
                    "bg-transparent w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28"
                  }
                >                  <Image
                className="cursor-pointer text-gray-500 hover:scale-110 transition-all duration-700 dark:hover:text-white"
                onClick={() => window.open("https://t.me/Collective333")}
                height={100}
                width={100}
                src={chat}
              ></Image>
              <p style={{ fontFamily: "Audiowide" }}> Chat</p></div>
                <div
                  className={
                    "bg-transparent w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28"
                  }
                ></div>
                <div
                  className={
                    "bg-transparent w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28"
                  }
                ></div>
                <div
                  className={
                    "bg-transparent w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28"
                  }
                ></div>
                <div
                  className={
                    "bg-transparent w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28"
                  }
                ></div>
                                <div
                  className={
                    "bg-transparent w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28"
                  }
                ></div>
                <div
                  className={
                    "bg-transparent w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28"
                  }
                ></div>
                <div
                  className={
                    "bg-transparent w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28"
                  }
                ></div>
                <div
                  className={
                    "bg-transparent w-12 h-12 lg:w-20 lg:h-20 2xl:w-28 2xl:h-28"
                  }
                ></div>
                <div className={"w-20 h-20"}>
                  <Image
                    className="cursor-pointer text-gray-500 hover:scale-110 transition-all duration-700 dark:hover:text-white"
                    onClick={() =>
                      window.open(
                        "https://dextools.io/app/en/ether/pair-explorer/0xc4b478a43b357f9e76c7d6dc27eef8d78980eb5d"
                      )
                    }
                    height={100}
                    width={100}
                    src={Chart}
                  ></Image>
                  <p style={{ fontFamily: "Audiowide" }}> Chart </p>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="transition-all duration-1000 absolute flex flex-col mr-20 justify-center content-center items-center">
            <ConnectWallet></ConnectWallet>
          </div>
        </>
      )}
    </>
  );
}
