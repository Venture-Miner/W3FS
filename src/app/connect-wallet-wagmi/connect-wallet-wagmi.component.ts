import { Component } from '@angular/core';
import { getAccount } from '@wagmi/core';
import { Subscription } from 'rxjs';
import { WalletService } from '../services/wallet.service';

type HexString = `0x${string}` | undefined;

@Component({
  selector: 'app-connect-wallet-wagmi',
  templateUrl: './connect-wallet-wagmi.component.html',
  styleUrls: ['./connect-wallet-wagmi.component.css'],
})
export class ConnectWalletWagmiComponent {
  accountSubscription: Subscription = new Subscription();
  walletAddress: HexString;
  walletBalance: string = '0';
  walletTokens: string = '0';
  step = 1;
  message: string;
  signatures: string[] = [];
  walletNetwork: number = -1;

  constructor(private walletService: WalletService) {
    this.message = '';
  }

  ngOnInit() {
    const currentAccount = getAccount();
    if (currentAccount && currentAccount.isConnected) {
      this.step = 2;
      this.walletAddress = currentAccount.address;
    } else {
      this.step = 1;
    }
    this.accountSubscription = this.walletService.accountChanged$.subscribe({
      next: async (account) => {
        if (account.isConnected) {
          if (account.isConnected) {
            this.step = 2;
            this.walletAddress = account.address;
            this.walletBalance = await this.walletService.getWalletBalance();
            this.walletNetwork = await this.walletService.getWalletNetwork();
          } else {
            this.step = 1;
          }
        }
      },
      error: (err) => {
        console.error('Error obtaining wallet connection status: ', err);
      },
    });
  }

  connectWallet() {
    this.walletService.web3Modal.openModal();
  }

  ngOnDestroy() {
    this.accountSubscription.unsubscribe();
  }

  signMessageForm() {
    this.walletService.signMessage(this.message).then((signature) => {
      this.signatures.push(signature);
    });
  }
}
