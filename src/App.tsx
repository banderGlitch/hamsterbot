import { useState } from 'react';
import './App.css';
import Hamster from './icons/Hamster';
import { mainCharacter } from './images';

function App() {
  const [counter, setCounter] = useState(0);
  const [popUps, setPopUps] = useState([]);

  const handleCardClick = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `perspective(1000px) rotateX(${-y / 10}deg) rotateY(${x / 10}deg)`;
    setTimeout(() => {
      card.style.transform = '';
    }, 100);

    setCounter((prev) => prev + 1);

    // Add the pop-up effect
    const newPopUp = { id: Date.now(), text: '+1' };
    setPopUps((prev) => [...prev, newPopUp]);

    // Remove the pop-up after animation ends
    setTimeout(() => {
      setPopUps((prev) => prev.filter((pop) => pop.id !== newPopUp.id));
    }, 1000);
  };

  return (
    <div className='bg-black flex justify-center'>
      <div className='w-full bg-black text-white h-screen font-bold flex flex-col max-w-xl'>
        <div className='px-4 z-10'>
          <div className="flex item-center space-x-2 pt-2">
            <div className='p-1 rounded-lg bg-[#1d2825]'>
              <Hamster size={24} className='text-[#d4d4d4]' />
            </div>
          </div>
          <div>
            <p className='text-sm'>Nernay (CEO)</p>
          </div>
          <div className='flex items-center justify-between space-x-4 mt-1'>
            <div className='flex items-center w-1/3'>
              <div className='w-full'>
                <div className='flex justify-between'>
                  <p className='text-sm'>7 <span className='text-[#95908a]'>/ 10</span></p>
                </div>
                <div className='flex items-center mt-1 border-2 border-[#43433b] rounded-full'>
                  <div className='w-full h-2 bg-[#43433b]/[0.6] rounded-full '>
                    <div className='progress-gradient h-2 rounded-full'>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-col items-center justify-center px-4 mt-4'>
          <div className='w-80 h-80 p-4 rounded-full circle-outer' onClick={handleCardClick}>
            <div className='w-full h-full rounded-full circle-inner'>
              <img src={mainCharacter} className='w-full h-full' />
            </div>
          </div>
          <div className='relative mt-4 flex flex-col items-center'>
            <div className='flex text-white justify-center'>Count {counter}</div>
            {popUps.map((popUp) => (
              <div key={popUp.id} className='text-[#00ff00] text-lg pop-up'>
                {popUp.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
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
