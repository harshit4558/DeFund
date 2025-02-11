"use client"

import Campfront from "@/components/campaigns";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import Image from "next/image";

export default function Home() {
  return (
    <ConnectionProvider endpoint="https://api.mainnet-beta.solana.com	">
      <WalletProvider wallets={[]} autoConnect>
        <div>
          <Campfront/>
        </div>
      </WalletProvider>
    </ConnectionProvider>
    
  )
}
