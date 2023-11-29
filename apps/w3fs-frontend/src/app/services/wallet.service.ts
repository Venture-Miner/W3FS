import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Subject } from 'rxjs';
import { arbitrum, mainnet, polygon, polygonMumbai } from '@wagmi/core/chains';
import {
  disconnect,
  fetchBalance,
  getAccount,
  getNetwork,
  signMessage,
  watchAccount,
} from '@wagmi/core';
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi';
import { Web3Modal } from '@web3modal/wagmi/dist/types/src/client';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  private accountSource = new Subject<any>();
  public accountChanged$ = this.accountSource.asObservable();
  web3Modal!: Web3Modal;
  account: any;

  constructor() {
    this.initializeWallet();
  }

  initializeWallet() {
    try {
      const chains = [arbitrum, mainnet, polygon, polygonMumbai];
      const projectId = environment.projectId;
      const metadata = {
        name: 'W3FS',
        description: 'Learn to build and connect web3 apps with angular',
        url: 'www.w3fs.dev',
        icons: ['www.w3fs.dev/favicon.ico'],
      };
      const wagmiConfig = defaultWagmiConfig({
        chains,
        projectId,
        metadata,
      });
      this.web3Modal = createWeb3Modal({
        wagmiConfig,
        projectId,
        chains,
        themeMode: 'light',
        themeVariables: {
          '--w3m-accent': '#51B7AF',
        },
      });
      this.initializeAccountWatch();
    } catch (error) {
      console.error('Failed to initialize wallet:', error);
    }
  }

  initializeAccountWatch(): void {
    watchAccount((account) => {
      this.accountSource.next(account);
    });
  }

  async disconnectWallet() {
    try {
      await disconnect();
    } catch (err) {
      console.error('Error disconnecting:', err);
    }
  }

  async getWalletBalance() {
    try {
      const currentAccount = getAccount();
      if (currentAccount.isConnected && currentAccount.address) {
        const balance = await fetchBalance({
          address: currentAccount.address,
        });
        return balance.formatted;
      } else {
        return '0';
      }
    } catch (error) {
      console.error('Error getting wallet balance:', error);
      return '0';
    }
  }

  async signMessage(message: string) {
    try {
      const signatureNumber = await signMessage({ message: message });
      if (signatureNumber) {
        return signatureNumber;
      } else {
        console.error('Error sending message: signature not found');
        return '';
      }
    } catch (error) {
      console.error('Error signing message:', error);
      return '';
    }
  }

  async getWalletNetwork() {
    try {
      const currentAccount = getAccount();
      if (currentAccount.isConnected) {
        const chain = await getNetwork();
        if (chain && chain.chain) {
          return chain.chain.id;
        }
      }
      return -1;
    } catch (error) {
      console.error('Error getting wallet network ID:', error);
      return -1;
    }
  }
}
