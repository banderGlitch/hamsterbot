import React from 'react';
import './App.css';
import '@rainbow-me/rainbowkit/styles.css';
import { WagmiProvider } from 'wagmi';
import MainApp from './mainApp';
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


  const queryClient = new QueryClient();



  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <MainApp/>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default App;
