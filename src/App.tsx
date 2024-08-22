import React, { useState, useEffect } from 'react';
import './App.css';
import Hamster from './icons/Hamster';
import { binanceLogo, dailyCipher, dailyCombo, dailyReward, dollarCoin, hamsterCoin, mainCharacter } from './images';
import Info from './icons/Info';
import Settings from './icons/Settings';
import Mine from './icons/Mine';
import Friends from './icons/Friends';
import Coins from './icons/Coins';
import '@rainbow-me/rainbowkit/styles.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
  gnosis
} from 'wagmi/chains';
import { QueryClientProvider, QueryClient, } from "@tanstack/react-query";

import { getDefaultConfig, RainbowKitProvider, } from '@rainbow-me/rainbowkit';
const App: React.FC = () => {
  const levelNames = [
    "Bronze",    // From 0 to 4999 coins
    "Silver",    // From 5000 coins to 24,999 coins
    "Gold",      // From 25,000 coins to 99,999 coins
    "Platinum",  // From 100,000 coins to 999,999 coins
    "Diamond",   // From 1,000,000 coins to 2,000,000 coins
    "Epic",      // From 2,000,000 coins to 10,000,000 coins
    "Legendary", // From 10,000,000 coins to 50,000,000 coins
    "Master",    // From 50,000,000 coins to 100,000,000 coins
    "GrandMaster", // From 100,000,000 coins to 1,000,000,000 coins
    "Lord"       // From 1,000,000,000 coins to ∞
  ];


  const config = getDefaultConfig({
    appName: 'decimalAt-web',
    projectId: '1e696e3657a96f5ea6d833e37d8a85c4',
    chains: [
      mainnet,
      polygon,
      optimism,
      arbitrum,
      base,
      zora,
      gnosis
    ],
    //ssr: true, // If your dApp uses server side rendering (SSR)
  });

  const levelMinPoints = [
    0,        // Bronze
    5000,     // Silver
    25000,    // Gold
    100000,   // Platinum
    1000000,  // Diamond
    2000000,  // Epic
    10000000, // Legendary
    50000000, // Master
    100000000,// GrandMaster
    1000000000// Lord
  ];

  // const [levelIndex, setLevelIndex] = useState(6);
  const levelIndex = 6
  const [points, setPoints] = useState(22749365);
  const [clicks, setClicks] = useState<{ id: number, x: number, y: number }[]>([]);
  const pointsToAdd = 11;
  const profitPerHour = 126420;

  const [dailyRewardTimeLeft, setDailyRewardTimeLeft] = useState("");
  const [dailyCipherTimeLeft, setDailyCipherTimeLeft] = useState("");
  const [dailyComboTimeLeft, setDailyComboTimeLeft] = useState("");

  const calculateTimeLeft = (targetHour: number) => {
    const now = new Date();
    const target = new Date(now);
    target.setUTCHours(targetHour, 0, 0, 0);

    if (now.getUTCHours() >= targetHour) {
      target.setUTCDate(target.getUTCDate() + 1);
    }

    const diff = target.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    const paddedHours = hours.toString().padStart(2, '0');
    const paddedMinutes = minutes.toString().padStart(2, '0');

    return `${paddedHours}:${paddedMinutes}`;
  };

  useEffect(() => {
    const updateCountdowns = () => {
      setDailyRewardTimeLeft(calculateTimeLeft(0));
      setDailyCipherTimeLeft(calculateTimeLeft(19));
      setDailyComboTimeLeft(calculateTimeLeft(12));
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `perspective(1000px) rotateX(${-y / 10}deg) rotateY(${x / 10}deg)`;
    setTimeout(() => {
      card.style.transform = '';
    }, 100);

    setPoints(points + pointsToAdd);
    setClicks([...clicks, { id: Date.now(), x: e.pageX, y: e.pageY }]);
  };

  const handleAnimationEnd = (id: number) => {
    setClicks((prevClicks) => prevClicks.filter(click => click.id !== id));
  };

  const calculateProgress = () => {
    if (levelIndex >= levelNames.length - 1) {
      return 100;
    }
    const currentLevelMin = levelMinPoints[levelIndex];
    const nextLevelMin = levelMinPoints[levelIndex + 1];
    const progress = ((points - currentLevelMin) / (nextLevelMin - currentLevelMin)) * 100;
    return Math.min(progress, 100);
  };

  // useEffect(() => {
  //   const currentLevelMin = levelMinPoints[levelIndex];
  //   const nextLevelMin = levelMinPoints[levelIndex + 1];
  //   if (points >= nextLevelMin && levelIndex < levelNames.length - 1) {
  //     setLevelIndex(levelIndex + 1);
  //   } else if (points < currentLevelMin && levelIndex > 0) {
  //     setLevelIndex(levelIndex - 1);
  //   }
  // }, [points, levelIndex, levelMinPoints, levelNames.length]);

  const formatProfitPerHour = (profit: number) => {
    if (profit >= 1000000000) return `+${(profit / 1000000000).toFixed(2)}B`;
    if (profit >= 1000000) return `+${(profit / 1000000).toFixed(2)}M`;
    if (profit >= 1000) return `+${(profit / 1000).toFixed(2)}K`;
    return `+${profit}`;
  };

  // useEffect(() => {
  //   const pointsPerSecond = Math.floor(profitPerHour / 3600);
  //   const interval = setInterval(() => {
  //     setPoints(prevPoints => prevPoints + pointsPerSecond);
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, [profitPerHour]);

  const queryClient = new QueryClient();



  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <div className="bg-black flex justify-center">
            <div className="w-full bg-black text-white h-screen font-bold flex flex-col max-w-xl">
              <div className="px-4 z-10">
                <div className="flex items-center justify-between pt-4">
                  <div className="flex items-center space-x-2 pt-4">
                    <div className="p-1 rounded-lg bg-[#1d2025]">
                      <Hamster size={24} className="text-[#d4d4d4]" />
                    </div>
                    <div className="flex items-center pb-3">
                      <p className="text-sm">Nikandr (CEO)</p>
                    </div>
                  </div>
                  <div className="ml-auto flex items-center ">
                    <ConnectButton showBalance={true} />
                  </div>
                </div>
                <div className="flex items-center justify-between space-x-4 mt-1">
                  <div className="flex items-center w-1/3">
                    <div className="w-full">
                      <div className="flex justify-between">
                        <p className="text-sm">{levelNames[levelIndex]}</p>
                        <p className="text-sm">{levelIndex + 1} <span className="text-[#95908a]">/ {levelNames.length}</span></p>
                      </div>
                      <div className="flex items-center mt-1 border-2 border-[#43433b] rounded-full">
                        <div className="w-full h-2 bg-[#43433b]/[0.6] rounded-full">
                          <div className="progress-gradient h-2 rounded-full" style={{ width: `${calculateProgress()}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center w-2/3 border-2 border-[#43433b] rounded-full px-4 py-[2px] bg-[#43433b]/[0.6] max-w-64">
                    <img src={binanceLogo} alt="Exchange" className="w-8 h-8" />
                    <div className="h-[32px] w-[2px] bg-[#43433b] mx-2"></div>
                    <div className="flex-1 text-center">
                      <p className="text-xs text-[#85827d] font-medium">Profit per hour</p>
                      <div className="flex items-center justify-center space-x-1">
                        <img src={dollarCoin} alt="Dollar Coin" className="w-[18px] h-[18px]" />
                        <p className="text-sm">{formatProfitPerHour(profitPerHour)}</p>
                        <Info size={20} className="text-[#43433b]" />
                      </div>
                    </div>
                    <div className="h-[32px] w-[2px] bg-[#43433b] mx-2"></div>
                    <Settings className="text-white" />
                  </div>
                </div>
              </div>

              <div className="flex-grow mt-4 bg-[#f3ba2f] rounded-t-[48px] relative top-glow z-0">
                <div className="absolute top-[2px] left-0 right-0 bottom-0 bg-[#1d2025] rounded-t-[46px]">
                  <div className="px-4 mt-6 flex justify-between gap-2">
                    <div className="bg-[#272a2f] rounded-lg px-4 py-2 w-full relative">
                      <div className="dot"></div>
                      <img src={dailyReward} alt="Daily Reward" className="mx-auto w-12 h-12" />
                      <p className="text-[10px] text-center text-white mt-1">Daily reward</p>
                      <p className="text-[10px] font-medium text-center text-gray-400 mt-2">{dailyRewardTimeLeft}</p>
                    </div>
                    <div className="bg-[#272a2f] rounded-lg px-4 py-2 w-full relative">
                      <div className="dot"></div>
                      <img src={dailyCipher} alt="Daily Cipher" className="mx-auto w-12 h-12" />
                      <p className="text-[10px] text-center text-white mt-1">Daily cipher</p>
                      <p className="text-[10px] font-medium text-center text-gray-400 mt-2">{dailyCipherTimeLeft}</p>
                    </div>
                    <div className="bg-[#272a2f] rounded-lg px-4 py-2 w-full relative">
                      <div className="dot"></div>
                      <img src={dailyCombo} alt="Daily Combo" className="mx-auto w-12 h-12" />
                      <p className="text-[10px] text-center text-white mt-1">Daily combo</p>
                      <p className="text-[10px] font-medium text-center text-gray-400 mt-2">{dailyComboTimeLeft}</p>
                    </div>
                  </div>

                  <div className="px-4 mt-4 flex justify-center">
                    {/* <div className="px-4 py-2 flex items-center space-x-2">
                      <img src={dollarCoin} alt="Dollar Coin" className="w-10 h-10" />
                      <p className="text-4xl text-white">{points.toLocaleString()}</p>
                    </div> */}
                  </div>

                  <div className="px-4 mt-4 flex justify-center">
                    <div
                      className="w-80 h-80 p-4 rounded-full circle-outer"
                      onClick={handleCardClick}
                    >
                      <div className="w-full h-full rounded-full circle-inner">
                        <img src={mainCharacter} alt="Main Character" className="w-full h-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom fixed div */}
            <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-xl bg-[#272a2f] flex justify-around items-center z-50 rounded-3xl text-xs">
              <div className="text-center text-[#85827d] w-1/5 bg-[#1c1f24] m-1 p-2 rounded-2xl">
                <img src={binanceLogo} alt="Exchange" className="w-8 h-8 mx-auto" />
                <p className="mt-1">Exchange</p>
              </div>
              <div className="text-center text-[#85827d] w-1/5">
                <Mine className="w-8 h-8 mx-auto" />
                <p className="mt-1">Mine</p>
              </div>
              <div className="text-center text-[#85827d] w-1/5">
                <Friends className="w-8 h-8 mx-auto" />
                <p className="mt-1">Friends</p>
              </div>
              <div className="text-center text-[#85827d] w-1/5">
                <Coins className="w-8 h-8 mx-auto" />
                <p className="mt-1">Earn</p>
              </div>
              <div className="text-center text-[#85827d] w-1/5">
                <img src={hamsterCoin} alt="Airdrop" className="w-8 h-8 mx-auto" />
                <p className="mt-1">Airdrop</p>
              </div>
            </div>

            {clicks.map((click) => (
              <div
                key={click.id}
                className="absolute text-5xl font-bold opacity-0 text-white pointer-events-none"
                style={{
                  top: `${click.y - 42}px`,
                  left: `${click.x - 28}px`,
                  animation: `float 1s ease-out`
                }}
                onAnimationEnd={() => handleAnimationEnd(click.id)}
              >
                {pointsToAdd}
              </div>
            ))}
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default App;
// import { useState, useEffect } from 'react';
// import './App.css';
// import Hamster from './icons/Hamster';
// import Mine from './icons/Mine';
// import Info from './icons/Info';
// import Friends from './icons/Friends';
// import Settings from './icons/Settings';
// import Coins from './icons/Coins';
// import { dailyReward, dollarCoin, mainCharacter, dailyCipher, dailyCombo, binanceLogo, hamsterCoin } from './images';

// interface PopUp {
//   id: number;
//   text: string;
// }

// function App() {
//   const [counter, setCounter] = useState<number>(0);
//   const [popUps, setPopUps] = useState<PopUp[]>([]);

//   const levelNames = [
//     "Bronze",    // From 0 to 4999 coins
//     "Silver",    // From 5000 coins to 24,999 coins
//     "Gold",      // From 25,000 coins to 99,999 coins
//     "Platinum",  // From 100,000 coins to 999,999 coins
//     "Diamond",   // From 1,000,000 coins to 2,000,000 coins
//     "Epic",      // From 2,000,000 coins to 10,000,000 coins
//     "Legendary", // From 10,000,000 coins to 50,000,000 coins
//     "Master",    // From 50,000,000 coins to 100,000,000 coins
//     "GrandMaster", // From 100,000,000 coins to 1,000,000,000 coins
//     "Lord"       // From 1,000,000,000 coins to ∞
//   ];

//   const levelMinPoints = [
//     0,        // Bronze
//     5000,     // Silver
//     25000,    // Gold
//     100000,   // Platinum
//     1000000,  // Diamond
//     2000000,  // Epic
//     10000000, // Legendary
//     50000000, // Master
//     100000000,// GrandMaster
//     1000000000// Lord
//   ];

//   const [levelIndex, setLevelIndex] = useState(6);
//   const [points, setPoints] = useState(22749365);
//   const [clicks, setClicks] = useState<{ id: number, x: number, y: number }[]>([]);
//   const profitPerHour = 126420;
//   const pointsToAdd = 11;

//   const calculateProgress = () => {
//     if (levelIndex >= levelNames.length - 1) {
//       return 100;
//     }
//     const currentLevelMin = levelMinPoints[levelIndex];
//     const nextLevelMin = levelMinPoints[levelIndex + 1];
//     const progress = ((points - currentLevelMin) / (nextLevelMin - currentLevelMin)) * 100;
//     return Math.min(progress, 100);
//   };

//   useEffect(() => {
//     const currentLevelMin = levelMinPoints[levelIndex];
//     const nextLevelMin = levelMinPoints[levelIndex + 1];
//     if (points >= nextLevelMin && levelIndex < levelNames.length - 1) {
//       setLevelIndex(levelIndex + 1);
//     } else if (points < currentLevelMin && levelIndex > 0) {
//       setLevelIndex(levelIndex - 1);
//     }
//   }, [points, levelIndex, levelMinPoints, levelNames.length]);


//   const formatProfitPerHour = (profit: number) => {
//     if (profit >= 1000000000) return `+${(profit / 1000000000).toFixed(2)}B`;
//     if (profit >= 1000000) return `+${(profit / 1000000).toFixed(2)}M`;
//     if (profit >= 1000) return `+${(profit / 1000).toFixed(2)}K`;
//     return `+${profit}`;
//   };



//   const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
//     const card = e.currentTarget;
//     const rect = card.getBoundingClientRect();
//     const x = e.clientX - rect.left - rect.width / 2;
//     const y = e.clientY - rect.top - rect.height / 2;
//     card.style.transform = `perspective(1000px) rotateX(${-y / 10}deg) rotateY(${x / 10}deg)`;
//     setTimeout(() => {
//       card.style.transform = '';
//     }, 100);

//     setCounter((prev) => prev + 1);

//     // Add the pop-up effect
//     const newPopUp: PopUp = { id: Date.now(), text: '+1' };
//     setPopUps((prev) => [...prev, newPopUp]);

//     // Remove the pop-up after animation ends
//     setTimeout(() => {
//       setPopUps((prev) => prev.filter((pop) => pop.id !== newPopUp.id));
//     }, 1000);
//     setPoints(points + pointsToAdd);
//     setClicks([...clicks, { id: Date.now(), x: e.pageX, y: e.pageY }]);
//   };

//   useEffect(() => {
//     const pointsPerSecond = Math.floor(profitPerHour / 3600);
//     const interval = setInterval(() => {
//       setPoints(prevPoints => prevPoints + pointsPerSecond);
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [profitPerHour]);

//   const handleAnimationEnd = (id: number) => {
//     setClicks((prevClicks) => prevClicks.filter(click => click.id !== id));
//   };


//   const [dailyRewardTimeLeft, setDailyRewardTimeLeft] = useState("");
//   const [dailyCipherTimeLeft, setDailyCipherTimeLeft] = useState("");
//   const [dailyComboTimeLeft, setDailyComboTimeLeft] = useState("");

//   const calculateTimeLeft = (targetHour: number) => {
//     const now = new Date();
//     const target = new Date(now);
//     target.setUTCHours(targetHour, 0, 0, 0);

//     if (now.getUTCHours() >= targetHour) {
//       target.setUTCDate(target.getUTCDate() + 1);
//     }

//     const diff = target.getTime() - now.getTime();
//     const hours = Math.floor(diff / (1000 * 60 * 60));
//     const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

//     const paddedHours = hours.toString().padStart(2, '0');
//     const paddedMinutes = minutes.toString().padStart(2, '0');

//     return `${paddedHours}:${paddedMinutes}`;
//   };

//   useEffect(() => {
//     const updateCountdowns = () => {
//       setDailyRewardTimeLeft(calculateTimeLeft(0));
//       setDailyCipherTimeLeft(calculateTimeLeft(19));
//       setDailyComboTimeLeft(calculateTimeLeft(12));
//     };

//     updateCountdowns();
//     const interval = setInterval(updateCountdowns, 60000); // Update every minute

//     return () => clearInterval(interval);
//   }, []);



//   return (
//     <div className='bg-black flex justify-center items-center min-h-screen'>
//       <div className='w-full bg-black text-white h-screen font-bold flex flex-col max-w-xl'>
//         <div className='px-4 z-10'>
//           <div className="flex items-center space-x-2 pt-2">
//             <div className='p-1 rounded-lg bg-[#1d2825]'>
//               <Hamster size={24} className='text-[#d4d4d4]' />
//             </div>
//           </div>
//           <div>
//             <p className='text-sm'>Nernay (CEO)</p>
//           </div>
//           <div className='flex items-center justify-between space-x-4 mt-1'>
//             <div className='flex items-center w-1/3'>
//               <div className='w-full'>
//                 <div className='flex justify-between'>
//                   <p className='text-sm'>{levelNames[levelIndex]} <span className='text-[#95908a]'>/  {levelNames.length}</span></p>
//                 </div>
//                 <div className='flex items-center mt-1 border-2 border-[#43433b] rounded-full'>
//                   <div className='w-full h-2 bg-[#43433b]/[0.6] rounded-full'>
//                     <div className='progress-gradient h-2 rounded-full w-[80px]' style={{ width: `${calculateProgress()}%` }}></div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className='flex items-center w-2/3 border-2 border-[#43433b] rounded-full px-4 py-[2px] bg-[#43433b]/[0.6] max-w-64'>
//               {/* <img src={binanceLogo} alt='Exchange' className='w-8 h-8'/> */}
//               <div className='flex-1 text-center'>
//                 <p className='text-xs text-[#85827d]'>Profit per hour</p>
//                 <div className='flex items-center justify-center space-x-1'>
//                   <img src={dollarCoin} className='w-[30px]' alt="Dollar Coin" />
//                   <p className='text-sm'>{formatProfitPerHour(profitPerHour)}</p>
//                   <Info size={20} className='text-[#43433b]' />
//                 </div>
//               </div>
//               <Settings className='text-white' />
//             </div>
//           </div>
//         </div>

//         <div className='flex-grow mt-4 bg-[#f3ba2f] rounded-t-[48px] relative top-glow z-0'>
//           <div className='absolute top-[2px] left-0 right-0 bottom-0 bg-[#1d2025] rounded-t-[46px]'>
//             <div className='px-4 mt-6 flex justify-between gap-2'>
//               <div className='flex flex-col'>
//                 <div className='flex flex-row'>
//                   <div className='bg-[#272a2f] rounded-lg px-4 py-2 w-full relative'>
//                     <div className='dot'></div>
//                     <img src={dailyReward} alt='Daily Reward' className='mx-auto w-12 h-12' />
//                     <p className='text-[10px] text-center text-white mt-1'>Daily reward</p>
//                     <p className='text-[10px] font-medium text-center'>{dailyRewardTimeLeft}</p>
//                   </div>
//                   <div className='bg-[#272a2f] rounded-lg px-4 py-2 w-full relative'>
//                     <div className='dot'></div>
//                     <img src={dailyCipher} alt='Daily Cipher' className='mx-auto w-12 h-12' />
//                     <p className='text-[10px] text-center text-white mt-1'>Daily cipher</p>
//                     <p className='text-[10px] font-medium text-center'>{dailyCipherTimeLeft}</p>
//                   </div>
//                   <div className='bg-[#272a2f] rounded-lg px-4 py-2 w-full relative'>
//                     <div className='dot'></div>
//                     <img src={dailyCombo} alt='Daily Combo' className='mx-auto w-12 h-12' />
//                     <p className='text-[10px] text-center text-white mt-1'>Daily combo</p>
//                     <p className='text-[10px] font-medium text-center'>{dailyComboTimeLeft}</p>
//                   </div>
//                 </div>
//                 <div className="px-4 mt-4 flex justify-center">
//                   <div className="px-4 py-2 flex items-center space-x-2">
//                     <img src={dollarCoin} alt="Dollar Coin" className="w-10 h-10" />
//                     <p className="text-4xl text-white">{points.toLocaleString()}</p>
//                   </div>
//                 </div>
//                 {/* Additional content can be added here */}
//                 <div className='flex flex-col items-center justify-center px-4 mt-4'>
//                   <div className='w-80 h-80 p-4 rounded-full circle-outer' onClick={handleCardClick}>
//                     <div className='w-full h-full rounded-full circle-inner'>
//                       <img src={mainCharacter} className='w-full h-full' alt="Main Character" />
//                       {popUps.map((popUp) => (
//                         <div key={popUp.id} className='text-[#00ff00] text-lg pop-up'>
//                           {popUp.text}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                   <div className='relative mt-4 flex flex-col items-center'>
//                     <div className='flex text-white justify-center'>Count {counter}</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Bottom fixed div */}
//         <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-xl bg-[#272a2f] flex justify-around items-center z-50 rounded-3xl text-xs">
//           <div className="text-center text-[#85827d] w-1/5 bg-[#1c1f24] m-1 p-2 rounded-2xl">
//             <img src={binanceLogo} alt="Exchange" className="w-8 h-8 mx-auto" />
//             <p className="mt-1">Exchange</p>
//           </div>
//           <div className="text-center text-[#85827d] w-1/5">
//             <Mine className="w-8 h-8 mx-auto" />
//             <p className="mt-1">Mine</p>
//           </div>
//           <div className="text-center text-[#85827d] w-1/5">
//             <Friends className="w-8 h-8 mx-auto" />
//             <p className="mt-1">Friends</p>
//           </div>
//           <div className="text-center text-[#85827d] w-1/5">
//             <Coins className="w-8 h-8 mx-auto" />
//             <p className="mt-1">Earn</p>
//           </div>
//           <div className="text-center text-[#85827d] w-1/5">
//             <img src={hamsterCoin} alt="Airdrop" className="w-8 h-8 mx-auto" />
//             <p className="mt-1">Airdrop</p>
//           </div>
//         </div>
//       </div>
//       {clicks.map((click) => (
//         <div
//           key={click.id}
//           className="absolute text-5xl font-bold opacity-0 text-white pointer-events-none"
//           style={{
//             top: `${click.y - 42}px`,
//             left: `${click.x - 28}px`,
//             animation: `float 1s ease-out`
//           }}
//           onAnimationEnd={() => handleAnimationEnd(click.id)}
//         >
//           {pointsToAdd}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default App;
// import { useState } from 'react';
// import './App.css';
// import Hamster from './icons/Hamster';
// import { dailyReward, dollarCoin, mainCharacter, dailyCipher, dailyCombo , binanceLogo } from './images';
// import Mine from './icons/Mine';
// import Info from './icons/Info';
// import Friends from './icons/Friends';
// import Settings from './icons/Settings';
// import Coins from './icons/Coins';
// import { hamsterCoin } from './images';

// function App() {
//   const [counter, setCounter] = useState(0);
//   const [popUps, setPopUps] = useState([]);
//   const profitPerHour = 126780;

//   const handleCardClick = (e: { currentTarget: any; clientX: number; clientY: number; }) => {
//     const card = e.currentTarget;
//     const rect = card.getBoundingClientRect();
//     const x = e.clientX - rect.left - rect.width / 2;
//     const y = e.clientY - rect.top - rect.height / 2;
//     card.style.transform = `perspective(1000px) rotateX(${-y / 10}deg) rotateY(${x / 10}deg)`;
//     setTimeout(() => {
//       card.style.transform = '';
//     }, 100);

//     setCounter((prev) => prev + 1);

//     // Add the pop-up effect
//     const newPopUp = { id: Date.now(), text: '+1' };
//     setPopUps((prev) => [...prev, newPopUp]);

//     // Remove the pop-up after animation ends
//     setTimeout(() => {
//       setPopUps((prev) => prev.filter((pop) => pop.id !== newPopUp.id));
//     }, 1000);
//   };

//   return (
//     <div className='bg-black flex justify-center items-center min-h-screen'>
//       <div className='w-full bg-black text-white h-screen font-bold flex flex-col max-w-xl'>
//         <div className='px-4 z-10'>
//           <div className="flex items-center space-x-2 pt-2">
//             <div className='p-1 rounded-lg bg-[#1d2825]'>
//               <Hamster size={24} className='text-[#d4d4d4]' />
//             </div>
//           </div>
//           <div>
//             <p className='text-sm'>Nernay (CEO)</p>
//           </div>
//           <div className='flex items-center justify-between space-x-4 mt-1'>
//             <div className='flex items-center w-1/3'>
//               <div className='w-full'>
//                 <div className='flex justify-between'>
//                   <p className='text-sm'>7 <span className='text-[#95908a]'>/ 10</span></p>
//                 </div>
//                 <div className='flex items-center mt-1 border-2 border-[#43433b] rounded-full'>
//                   <div className='w-full h-2 bg-[#43433b]/[0.6] rounded-full'>
//                     <div className='progress-gradient h-2 rounded-full w-[80px]'>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className='flex items-center w-2/3 border-2 border-[#43433b] rounded-full px-4 py-[2px] bg-[#43433b]/[0.6] max-w-64'>
//               {/* <img src={binanceLogo} alt='Exchange' className='w-8 h-8'/> */}
//               <div className='flex-1 text-center'>
//                 <p className='text-xs text-[#85827d]'>Profit per hour</p>
//                 <div className='flex items-center justify-center space-x-1'>
//                   <img src={dollarCoin} className='w-[30px]' />
//                   <p className='text-sm'>+126.42KX</p>
//                   <Info size={20} className='text-[#43433b]' />
//                 </div>
//               </div>
//               <Settings className='text-white' />
//             </div>
//           </div>
//         </div>

//         <div className='flex-grow mt-4 bg-[#f3ba2f] rounded-t-[48px] relative top-glow z-0'>
//           <div className='absolute top-[2px] left-0 right-0 bottom-0 bg-[#1d2025] rounded-t-[46px]'>
//             <div className='px-4 mt-6 flex justify-between gap-2'>
//               <div className='flex flex-col'>
//                 <div className='flex flex-row '>
//               <div className='bg-[#272a2f] rounded-lg px-4 py-2 w-full relative'>
//                 <div className='dot'></div>
//                 <img src={dailyReward} alt='Daily Reward' className='mx-auto w-12 h-12'/>
//                 <p className='text-[10px] text-center text-white mt-1'>Daily reward</p>
//                 <p className='text-[10px] font-medium text-center'>10 22</p>
//               </div>
//               <div className='bg-[#272a2f] rounded-lg px-4 py-2 w-full relative'>
//                 <div className='dot'></div>
//                 <img src={dailyCipher} alt='Daily Reward' className='mx-auto w-12 h-12'/>
//                 <p className='text-[10px] text-center text-white mt-1'>Daily cipher</p>
//                 <p className='text-[10px] font-medium text-center'>10 22</p>
//               </div>
//               <div className='bg-[#272a2f] rounded-lg px-4 py-2 w-full relative'>
//                 <div className='dot'></div>
//                 <img src={ dailyCombo} alt='Daily Reward' className='mx-auto w-12 h-12'/>
//                 <p className='text-[10px] text-center text-white mt-1'>Daily combo</p>
//                 <p className='text-[10px] font-medium text-center'>10 22</p>
//               </div>
//               </div>
//               {/* Additional content can be added here */}
//               <div className='flex flex-col  items-center justify-center px-4 mt-4'>
//                 <div className='w-80 h-80 p-4 rounded-full circle-outer' onClick={handleCardClick}>
//                   <div className='w-full h-full rounded-full circle-inner'>
//                     <img src={mainCharacter} className='w-full h-full' />
//                     {popUps.map((popUp) => (
//                     <div key={popUp.id} className='text-[#00ff00] text-lg pop-up'>
//                       {popUp.text}
//                     </div>
//                      ))}
//                   </div>
//                 </div>
//                 <div className='relative mt-4 flex flex-col items-center'>
//                   <div className='flex text-white justify-center'>Count {counter}</div>
//                   {/* {popUps.map((popUp) => (
//                     <div key={popUp.id} className='text-[#00ff00] text-lg pop-up'>
//                       {popUp.text}
//                     </div>
//                   ))} */}
//                 </div>
//               </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* <div className='flex flex-col items-center justify-center px-4 mt-4'>
//       <div className='w-80 h-80 p-4 rounded-full circle-outer' onClick={handleCardClick}>
//         <div className='w-full h-full rounded-full circle-inner'>
//           <img src={mainCharacter} className='w-full h-full' />
//         </div>
//       </div>
//       <div className='relative mt-4 flex flex-col items-center'>
//         <div className='flex text-white justify-center'>Count {counter}</div>
//         {popUps.map((popUp) => (
//           <div key={popUp.id} className='text-[#00ff00] text-lg pop-up'>
//             {popUp.text}
//           </div>
//         ))}
//       </div>
//     </div> */}
//     {/* Bottom fixed div */}
//     <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-xl bg-[#272a2f] flex justify-around items-center z-50 rounded-3xl text-xs">
//         <div className="text-center text-[#85827d] w-1/5 bg-[#1c1f24] m-1 p-2 rounded-2xl">
//           <img src={binanceLogo} alt="Exchange" className="w-8 h-8 mx-auto" />
//           <p className="mt-1">Exchange</p>
//         </div>
//         <div className="text-center text-[#85827d] w-1/5">
//           <Mine className="w-8 h-8 mx-auto" />
//           <p className="mt-1">Mine</p>
//         </div>
//         <div className="text-center text-[#85827d] w-1/5">
//           <Friends className="w-8 h-8 mx-auto" />
//           <p className="mt-1">Friends</p>
//         </div>
//         <div className="text-center text-[#85827d] w-1/5">
//           <Coins className="w-8 h-8 mx-auto" />
//           <p className="mt-1">Earn</p>
//         </div>
//         <div className="text-center text-[#85827d] w-1/5">
//           <img src={hamsterCoin} alt="Airdrop" className="w-8 h-8 mx-auto" />
//           <p className="mt-1">Airdrop</p>
//         </div>
//       </div>
//       </div>
//     </div>

// <div className='bg-black flex justify-center'>
//   <div className='w-full bg-black text-white h-screen font-bold flex flex-col max-w-xl'>
//     <div className='px-4 z-10'>
//       <div className="flex item-center space-x-2 pt-2">
//         <div className='p-1 rounded-lg bg-[#1d2825]'>
//           <Hamster size={24} className='text-[#d4d4d4]' />
//         </div>
//       </div>
//       <div>
//         <p className='text-sm'>Nernay (CEO)</p>
//       </div>
//       <div className='flex items-center justify-between space-x-4 mt-1'>
//         <div className='flex items-center w-1/3'>
//           <div className='w-full'>
//             <div className='flex justify-between'>
//               <p className='text-sm'>7 <span className='text-[#95908a]'>/ 10</span></p>
//             </div>
//             <div className='flex items-center mt-1 border-2 border-[#43433b] rounded-full'>
//               <div className='w-full h-2 bg-[#43433b]/[0.6] rounded-full '>
//                 <div className='progress-gradient h-2 rounded-full' style= {{width:"80px"}}>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className='flex items-center w-2/3 border-2 border-[#43433b] rounded-full px-4 py-[2px] bg-[#43433b]/[0.6] max-w-64'>
//           {/* <img src={binanceLogo} alt='Exchange' className='w-8 h-8'/> */}
//           <div className='flex-1 text-center'>
//             <p className='text-xs text-[#85827d]'>Profit per hour</p>
//             <div className='flex items-center justify-center space-x-1'>
//               <img src={dollarCoin} style={{width:"30px"}}/>
//               <p className='text-sm'>+126.42KX</p>
//               <Info size={20} className='text-[#43433b]'/>
//             </div>
//           </div>
//           <Settings className='text-white'/>
//         </div>
//       </div>
//     </div>

//     <div className='flow-grow mt-4 bg-[#f3ba2f] rounded-t-[48px] relative top-glow z-0'>
//       <div className='absolute top-[2px] left-0 right-0 bottom-0 bg-[#1d2025] rounded-t-[46px]'>
//         <div className='px-4 mt-6 flex justify-between gap-2'>

//         </div>

//       </div>

//     </div>

//     <div className='flex flex-col items-center justify-center px-4 mt-4'>
//       <div className='w-80 h-80 p-4 rounded-full circle-outer' onClick={handleCardClick}>
//         <div className='w-full h-full rounded-full circle-inner'>
//           <img src={mainCharacter} className='w-full h-full' />
//         </div>
//       </div>
//       <div className='relative mt-4 flex flex-col items-center'>
//         <div className='flex text-white justify-center'>Count {counter}</div>
//         {popUps.map((popUp) => (
//           <div key={popUp.id} className='text-[#00ff00] text-lg pop-up'>
//             {popUp.text}
//           </div>
//         ))}
//       </div>
//     </div>
//   </div>
// </div>
//   );
// }

// export default App;
// import { useState } from 'react';
// import './App.css'
// import Hamster from './icons/Hamster'
// import { mainCharacter } from './images';

// function App() {


//   // const levelNames = [
//   //   "Bronze",    // From 0 to 4999 coins
//   //   "Silver",    // From 5000 coins to 24,999 coins
//   //   "Gold",      // From 25,000 coins to 99,999 coins
//   //   "Platinum",  // From 100,000 coins to 999,999 coins
//   //   "Diamond",   // From 1,000,000 coins to 2,000,000 coins
//   //   "Epic",      // From 2,000,000 coins to 10,000,000 coins
//   //   "Legendary", // From 10,000,000 coins to 50,000,000 coins
//   //   "Master",    // From 50,000,000 coins to 100,000,000 coins
//   //   "GrandMaster", // From 100,000,000 coins to 1,000,000,000 coins
//   //   "Lord"       // From 1,000,000,000 coins to ∞
//   // ];

//   // const levelMinPoints = [
//   //   0,        // Bronze
//   //   5000,     // Silver
//   //   25000,    // Gold
//   //   100000,   // Platinum
//   //   1000000,  // Diamond
//   //   2000000,  // Epic
//   //   10000000, // Legendary
//   //   50000000, // Master
//   //   100000000,// GrandMaster
//   //   1000000000// Lord
//   // ];

//   // const [levelIndex, setlevelIndex] = useState(6);
//   // const [points, setPoints] = useState(22749365);

//   const [counter, setCounter] = useState(0);

//   // const calculateProgress = () => {
//   //   if (levelIndex >= levelNames.length - 1) {
//   //     return 100;
//   //   }
//   //   const currentLevelMin = levelMinPoints[levelIndex];
//   //   const nextLevelMin = levelMinPoints[levelIndex + 1];
//   //   const progress = ((points - currentLevelMin) / (nextLevelMin - currentLevelMin)) * 100;
//   //   return Math.min(progress, 100);
//   // };


//   const handleCardClick = (e: { currentTarget: any; clientX: number; clientY: number; pageX: any; pageY: any; }) => {
//     const card = e.currentTarget;
//     const rect = card.getBoundingClientRect();
//     const x = e.clientX - rect.left - rect.width / 2;
//     const y = e.clientY - rect.top - rect.height / 2;
//     card.style.transform = `perspective(1000px) rotateX(${-y / 10}deg) rotateY(${x / 10}deg)`;
//     setTimeout(() => {
//       card.style.transform = '';
//     }, 100);
//     setCounter((prev) => prev + 1)
//     // setPoints(points + pointsToAdd);
//     // setClicks([...clicks, { id: Date.now(), x: e.pageX, y: e.pageY }]);
//   };

//   // const handleAnimationEnd = (id: number) => {
//   //   setClicks((prevClicks) => prevClicks.filter(click => click.id !== id));
//   // };



//   return (
//     <div className='bg-black flex justify-center'>
//       <div className='w-full bg-black text-white h-screen font-bold flex flex-col max-w-xl'>
//         <div className='px-4 z-10'>
//           <div className="flex item-center space-x-2 pt-2">
//             <div className='p-1 rounded-lg bg-[#1d2825]'>
//               <Hamster size={24} className='text-[#d4d4d4]' />
//             </div>
//           </div>
//           <div>
//             <p className='text-sm'>Nernay (CEO)</p>
//           </div>
//           <div className='flex items-center justify-between space-x-4 mt-1'>

//             <div className='flex items-center w-1/3'>
//               <div className='w-full'>
//                 <div className='flex justify-between'>
//                   {/* <p className='text-sm'>{levelNames[levelIndex]}</p> */}
//                   <p className='text-sm'>7 <span className='text-[#95908a]'>/ 10</span></p>
//                 </div>
//                 <div className='flex items-center mt-1 border-2 border-[#43433b] rounder-full'>
//                   <div className='w-full h-2 bg-[#43433b]/[0.6] rounded-full '>
//                     <div className='progress-gradient h-2 rounded-full'>

//                     </div>

//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className='flex flex-col items-center justify-center px-4 mt-4'>
//           <div className='w-80 h-80 p-4 rounded-full circle-outer' onClick={handleCardClick}>
//             <div className='w-full h-full rounded-full circle-inner'>
//               <img src={mainCharacter} className='w-full h-full' />
//             </div>
//           </div>
//           <div className='flex text-white mt-4 justify-center'>Count {counter}</div>
//         </div>

//         {/* <div className=' flex flex-col item-center  px-4 mt-4 flex '>
//           <div className='w-80 h-80 p-4 rounded-full circle-outer' onClick={handleCardClick}>
//             <div className='w-full h-full rounded-full circle-inner'>
//               <img src={mainCharacter} className='w-full h-full' />
//             </div>
//           </div>
//              <div className='flex text-white item-center'>Count {counter}</div>

//         </div> */}
//       </div>
//     </div>
//   )
// }

// export default App
