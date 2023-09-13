import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Subject } from 'rxjs';
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/html';
import { arbitrum, mainnet, polygon } from 'viem/dist/types/chains';
import {
  configureChains,
  createConfig,
  disconnect,
  getAccount,
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
      const chains = [arbitrum, mainnet, polygon];
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

  getAccountStatus() {
    return getAccount();
  }
}
