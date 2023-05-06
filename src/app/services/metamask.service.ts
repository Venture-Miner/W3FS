import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MetamaskService {
  currentChainId$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  currentAccount$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  balance$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  checkMetamaskAvailability() {
    try {
      return !!window.ethereum;
    } catch (err) {
      return false;
    }
  }

  connectWallet() {
    window.ethereum
      .request({
        method: 'eth_requestAccounts',
      })
      .then(() => {
        this.handleAccountsChanged();
        this.handleChainChanged();
        this.getBalance();
      });
  }

  async retrieveConnection() {
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    if (accounts.length) {
      this.handleAccountsChanged();
      this.handleChainChanged();
      this.getBalance();
    }
  }

  handleChainChanged(): void {
    this.currentChainId$.next(window.ethereum.chainId);
    window.ethereum.on('chainChanged', () => {
      window.location.reload();
    });
  }

  handleAccountsChanged() {
    this.currentAccount$.next(window.ethereum.selectedAddress);
    window.ethereum.on('accountsChanged', () => {
      window.location.reload();
    });
  }

  async getBalance() {
    const balance = await new ethers.providers.Web3Provider(
      window.ethereum
    ).getBalance(this.currentAccount$.value);
    this.balance$.next(ethers.utils.formatEther(balance));
  }

  getProvider() {
    return new ethers.providers.Web3Provider(window.ethereum);
  }
}
