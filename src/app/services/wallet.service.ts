import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Subject } from 'rxjs';
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/html';
import { arbitrum, mainnet, polygon, polygonMumbai } from '@wagmi/core/chains';
import {
  configureChains,
  createConfig,
  disconnect,
  fetchBalance,
  fetchToken,
  getAccount,
  getNetwork,
  signMessage,
  watchAccount,
} from '@wagmi/core';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  private accountSource = new Subject<any>();
  public accountChanged$ = this.accountSource.asObservable();
  ethereumClient!: EthereumClient;
  web3Modal!: Web3Modal;
  account: any;

  constructor() {
    this.initializeWallet();
  }

  initializeWallet() {
    try {
      const chains = [arbitrum, mainnet, polygon, polygonMumbai];
      const projectId = environment.projectId;
      const { publicClient } = configureChains(chains, [
        w3mProvider({ projectId }),
      ]);
      const wagmiConfig = createConfig({
        autoConnect: true,
        connectors: w3mConnectors({ projectId, chains }),
        publicClient,
      });
      this.ethereumClient = new EthereumClient(wagmiConfig, chains);
      this.web3Modal = this.configureWeb3Modal(projectId);
      this.initializeAccountWatch();
    } catch (error) {
      console.error('Failed to initialize wallet:', error);
    }
  }

  configureWeb3Modal(projectId: string): Web3Modal {
    return new Web3Modal(
      {
        projectId,
        themeMode: 'light',
        themeVariables: {
          '--w3m-background-color': '#DCF1EF',
          '--w3m-accent-color': '#51B7AF',
          '--w3m-logo-image-url': './assets/venture-miner-logo.png',
        },
      },
      this.ethereumClient
    );
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
          address: `0x${currentAccount.address.slice(2)}`,
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

  async getFetchToken() {
    try {
      const currentAccount = getAccount();
      if (currentAccount.isConnected && currentAccount.address) {
        const tokens = await fetchToken({
          address: `0x${currentAccount.address.slice(2)}`,
          formatUnits: 'gwei',
        });
        const tokenArray = Array.isArray(tokens) ? tokens : [tokens];

        return tokenArray.map((token) => ({
          contractAddress: token.contractAddress,
          balance: token.balance,
        }));
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error getting wallet tokens:', error);
      return [];
    }
  }
}
