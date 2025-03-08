"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useDataContext } from "@/context/DataContext";
import { MdOutlineSettings } from "react-icons/md";
import { FaFaceSmileWink } from "react-icons/fa6";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  RewardsSection,
  BalanceScore,
  LeaderBoardCard,
  SettingsCard,
  ExchangeComponent,
  ExploreBody,
  SelectedPost,
  CreatePollBody,
  HistoryBody,
} from "./_components/sidebar-body-components";
import {
  RewardHeader,
  ExploreHeader,
  SelectedPostHeader,
  CreatePollHeader,
  SettingsHeader,
  ExchangeHeader,
  AssetsHeader,
  LeaderboardHeader,
  HistoryHeader,
} from "./_components/sidebar-header-components";
import toast from "react-hot-toast";
import { ConnectButton2 } from "@/components/Header/ConnectButton";
import ChainDropdown from "@/components/ChainDropdown";

interface PoolData {
  poolId: number;
  question: string;
  category: string;
  parameter: string;
  pollType: number;
  totalAmount: number;
  totalBets: number;
  finalScore: number;
  startTime: number;
  endTime: number;
  resultDeclareTime: number;
  poolEnded: boolean;
}

const sidebarItems = [
  "Explore",
  "Create",
  "History",
  "Assets",
  // "Leaderboard",
  "Rewards",
  "Exchange",
];

const LaunchPage: React.FC = () => {
  const { address, chain } = useAccount();
  const {
    totalPools,
    tokenBalance,
    placeBet,
    mintNft,
    nftMintedAllReady,
    convertUSDetoBuzz,
    convertBuzztoUSDe,
  } = useDataContext();

  const [investment, setInvestment] = useState(0);
  const [scorePrediction, setScorePrediction] = useState(0);
  const [selected, setSelected] = useState("Explore");
  const [selectedPost, setSelectedPost] = useState<PoolData | null>(null);

  const [fromToken, setFromToken] = useState({
    symbol: "Moyaki",
    amount: tokenBalance.usdeBalance,
  });
  const [toToken, setToToken] = useState({
    symbol: "BUZZ",
    amount: tokenBalance.buzzBalance,
  });
  const [maxTokenBalances, setMaxTokenBalances] = useState({
    fromBalance: tokenBalance.usdeBalance,
    toBalance: tokenBalance.buzzBalance,
  });
  const [isCalculating, setIsCalculating] = useState(false);
  const [actionButtonText, setActionButtonText] = useState("Exchange");
  const [isTransacting, setIsTransacting] = useState(false);

  const handleSubmit = async () => {
    console.log(selectedPost?.poolId, scorePrediction, investment);
    await placeBet(
      +selectedPost?.poolId,
      +investment.toString(),
      scorePrediction
    );
  };

  const handleSwap = () => {
    setFromToken((prev) => ({
      symbol: prev.symbol === "Moyaki" ? "BUZZ" : "Moyaki",
      amount: 0,
    }));
    setToToken((prev) => ({
      symbol: prev.symbol === "BUZZ" ? "Moyaki" : "BUZZ",
      amount: 0,
    }));

    if (fromToken.symbol === "Moyaki") {
      setMaxTokenBalances({
        fromBalance: tokenBalance.buzzBalance,
        toBalance: tokenBalance.usdeBalance,
      });
    } else {
      setMaxTokenBalances({
        fromBalance: tokenBalance.usdeBalance,
        toBalance: tokenBalance.buzzBalance,
      });
    }
  };

  const handleAction = useCallback(async () => {
    if (!address || !fromToken.amount) {
      toast.error("Missing required information");
      return;
    }
    setIsTransacting(true);
    if (fromToken.symbol === "Moyaki") {
      console.log("converting Moyaki to Buzz");
      await convertUSDetoBuzz(fromToken.amount);
      setIsTransacting(false);
      setIsCalculating(false);
    } else {
      console.log("converting Buzz to Moyaki");
      await convertBuzztoUSDe(fromToken.amount);
      setIsTransacting(false);
      setIsCalculating(false);
    }
  }, [address, fromToken.amount]);

  const handleFromAmountChange = (e: any) => {
    setIsCalculating(true);
    if (fromToken.symbol === "Moyaki") {
      setFromToken((prev) => ({ ...prev, amount: +e.target.value }));
      setToToken((prev) => ({
        ...prev,
        amount: +e.target.value * 10,
      }));
      setIsCalculating(false);
    } else {
      setFromToken((prev) => ({ ...prev, amount: +e.target.value }));
      setToToken((prev) => ({
        ...prev,
        amount: +e.target.value / 10,
      }));
      setIsCalculating(false);
    }
  };

  const mintYourNft = async () => {
    await mintNft();
  };

  const handleMax = () => {
    setInvestment(tokenBalance?.buzzBalance);
  };

  return (
    <div className="flex items-center justify-center h-[100vh] bg-change-primary-bg orbitron-launch">
      <div className="w-[85%] h-[90%] shadow-lg rounded-lg flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-change-secondary-bg shadow-lg p-4 flex flex-col">
          <h1 className="text-2xl font-bold text-white"> 💰 BUZZIFY 💸</h1>
          <nav className="flex flex-col mt-6 space-y-3">
            {sidebarItems.map((item) => (
              <SidebarItem
                key={item}
                label={item}
                active={selected === item}
                onClick={() => {
                  setSelected(item);
                  setSelectedPost(null);
                }}
              />
            ))}
          </nav>
          {/* User Profile */}
          <div className="mt-2 flex flex-col p-0 gap-y-2 w-full">
            <div className="flex justify-between mt-2 w-full">
              <ConnectButton2 />
              <button onClick={() => setSelected("Settings")}>
                <MdOutlineSettings size={25} />
              </button>
            </div>
            <ChainDropdown />
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="flex items-center bg-change-secondary-bg  opacity-90 shadow-lg px-4 py-3 justify-center">
            {selected === "Explore" && !selectedPost && (
              <>
                <ExploreHeader />
              </>
            )}
            {selected === "Explore" && selectedPost && (
              <>
                <SelectedPostHeader
                  selectedPost={selectedPost}
                  setSelectedPost={setSelectedPost}
                />
              </>
            )}
            {selected === "History" && (
              <>
                <HistoryHeader />
              </>
            )}
            {selected === "Create" && (
              <>
                <CreatePollHeader />
              </>
            )}
            {selected === "Settings" && (
              <>
                <SettingsHeader />
              </>
            )}
            {selected === "Exchange" && (
              <>
                <ExchangeHeader />
              </>
            )}
            {selected === "Assets" && (
              <>
                <AssetsHeader />
              </>
            )}
            {selected === "Leaderboard" && (
              <>
                <LeaderboardHeader />
              </>
            )}{" "}
            {selected === "Rewards" && (
              <>
                <RewardHeader />
              </>
            )}
          </header>

          {/* Content Section */}
          <div className="p-6 bg-change-secondary-bg shadow-lg h-full overflow-y-scroll scrollbar-thin">
            {selected === "Explore" && !selectedPost && (
              <>
                <ExploreBody
                  transformedPoolsData={totalPools}
                  setSelectedPost={setSelectedPost}
                />
              </>
            )}
            {selected === "Settings" && <SettingsCard />}
            {selectedPost && (
              <>
                <SelectedPost
                  selectedPost={selectedPost}
                  investment={investment}
                  setInvestment={setInvestment}
                  scorePrediction={scorePrediction}
                  setScorePrediction={setScorePrediction}
                  handleSubmit={handleSubmit}
                  handleMax={handleMax}
                  tokenBalance={tokenBalance}
                />
              </>
            )}
            {selected === "Rewards" && (
              <RewardsSection
                onClick={mintYourNft}
                nftMintedAllReady={nftMintedAllReady}
              />
            )}

            {selected === "Assets" && (
              <>
                <div className="flex justify-center items-center flex-col">
                  <BalanceScore
                    setSelected={setSelected}
                    setSelectedPost={setSelectedPost}
                  />
                </div>
              </>
            )}
            {selected === "Exchange" && (
              <>
                <ExchangeComponent
                  fromToken={fromToken}
                  toToken={toToken}
                  isCalculating={isCalculating}
                  actionButtonText={actionButtonText}
                  isTransacting={isTransacting}
                  handleFromAmountChange={handleFromAmountChange}
                  handleSwap={handleSwap}
                  handleAction={handleAction}
                  maxTokenBalances={maxTokenBalances}
                />
              </>
            )}
            {selected === "Leaderboard" && <LeaderBoardCard />}
            {selected === "Create" && <CreatePollBody />}

            {selected === "History" && (
              <>
                <HistoryBody />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const SidebarItem: React.FC<{
  label: string;
  active?: boolean;
  onClick?: () => void;
}> = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center p-2 rounded-lg ${active ? "bg-gray-200 text-black" : "hover:bg-gray-200 hover:text-black"}`}
  >
    <span className="ml-3 font-semibold">➡ {label}</span>
  </button>
);

export default LaunchPage;
