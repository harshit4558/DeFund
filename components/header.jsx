"use client"
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import { WalletConnectButton, WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import '@solana/wallet-adapter-react-ui/styles.css';


const Header = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { isSignedIn } = useAuth();

    const handleFundraise = () => {
        if (isSignedIn) {
            router.push('/create-campaign');
        } else {
            // This will trigger the sign-in modal and redirect to create-campaign after sign-in
            router.push('/sign-in?redirect_url=/create-campaign');
        }
    };

    return (
        <header className="flex items-center justify-between border-b border-black p-4">
            {/* Left section */}
            <div className="flex space-x-6">
                <h1 
                    className="hover:text-gray-600 cursor-pointer"
                    onClick={handleFundraise}
                >
                    Fundraise
                </h1>
                <h1 
                    className="hover:text-gray-600 cursor-pointer"
                    onClick={() => router.push('/campaigns')}
                >
                    Donate
                </h1>
            </div>

            {/* Center section */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
                <h1 
                    className="font-bold text-3xl cursor-pointer"
                    onClick={() => router.push('/')}
                >
                    DeFund
                </h1>
            </div>

            {/* Right section */}
            <div className='flex  space-x-3'>
                <div>
                    <WalletModalProvider>
                        <WalletConnectButton/>
                    </WalletModalProvider>
                </div>
               <div>
               <SignedOut>
                    <SignInButton mode="modal">
                        <Button>
                            Login
                        </Button>
                    </SignInButton>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
               </div>
            </div>
        </header>
    );
}

export default Header;