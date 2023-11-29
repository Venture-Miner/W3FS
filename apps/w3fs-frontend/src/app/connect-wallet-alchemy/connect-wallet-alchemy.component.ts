import { Component, effect } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TokenBalance } from 'alchemy-sdk';
import { AlchemyService } from '../services/alchemy.service';
import { MetamaskService } from '../services/metamask.service';

@Component({
  selector: 'app-connect-wallet-alchemy',
  templateUrl: './connect-wallet-alchemy.component.html',
  styleUrls: ['./connect-wallet-alchemy.component.css'],
})
export class ConnectWalletAlchemyComponent {
  title = 'w3fs-frontend';
  currentChainId = this.metamaskService.currentChainId;
  currentAccount = this.metamaskService.currentAccount;
  balance = this.metamaskService.balance;
  hasMetamask;
  tokenBalances: TokenBalance[] = [];
  message = new FormControl('', Validators.required);
  signatures: string[] = [];

  constructor(
    private metamaskService: MetamaskService,
    private alchemyService: AlchemyService
  ) {
    this.hasMetamask = metamaskService.checkMetamaskAvailability();
    if (this.hasMetamask) {
      metamaskService.retrieveConnection();
    }
    effect(async () => {
      if (this.currentAccount()) {
        this.tokenBalances = await this.alchemyService.getTokenBalances(
          this.currentAccount()
        );
      }
    });
  }

  connectWallet() {
    this.metamaskService.connectWallet();
  }

  signMessage() {
    const message = this.message.value!;
    this.metamaskService.signer?.signMessage(message).then((signature) => {
      this.signatures.push(signature);
    });
  }
}
