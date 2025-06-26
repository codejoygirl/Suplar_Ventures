'use client';

import { create } from 'zustand';

export interface WalletState {
  isConnected: boolean;
  walletType: 'metamask' | 'freighter' | 'albedo' | null;
  address: string | null;
  balance: number | null;
}

interface WalletStore extends WalletState {
  connectWallet: (type: 'metamask' | 'freighter' | 'albedo') => Promise<void>;
  disconnectWallet: () => void;
  updateBalance: (balance: number) => void;
}

export const useWalletStore = create<WalletStore>((set, get) => ({
  isConnected: false,
  walletType: null,
  address: null,
  balance: null,
  
  connectWallet: async (type) => {
    try {
      let address = '';
      
      switch (type) {
        case 'metamask':
          if (typeof window !== 'undefined' && window.ethereum) {
            const accounts = await window.ethereum.request({
              method: 'eth_requestAccounts',
            });
            address = accounts[0];
          } else {
            throw new Error('MetaMask not installed');
          }
          break;
          
        case 'freighter':
          if (typeof window !== 'undefined' && window.freighter) {
            const result = await window.freighter.requestAccess();
            if (result.error) throw new Error(result.error);
            address = await window.freighter.getPublicKey();
          } else {
            throw new Error('Freighter wallet not installed');
          }
          break;
          
        case 'albedo':
          if (typeof window !== 'undefined') {
            // Albedo integration would go here
            // For now, simulate connection
            address = 'ALBEDO_ADDRESS_PLACEHOLDER';
          }
          break;
      }
      
      set({
        isConnected: true,
        walletType: type,
        address,
        balance: 0, // Would fetch actual balance
      });
    } catch (error) {
      console.error('Wallet connection failed:', error);
      throw error;
    }
  },
  
  disconnectWallet: () => {
    set({
      isConnected: false,
      walletType: null,
      address: null,
      balance: null,
    });
  },
  
  updateBalance: (balance) => {
    set({ balance });
  },
}));

// Extend Window interface for wallet types
declare global {
  interface Window {
    ethereum?: any;
    freighter?: any;
  }
}