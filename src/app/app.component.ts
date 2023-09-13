import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { WalletService } from './services/wallet.service';
import { getAccount } from '@wagmi/core';

type HexString = `0x${string}` | undefined;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  accountSubscription: Subscription = new Subscription();
  walletAddress: HexString;

  constructor(private walletService: WalletService) {}

  ngOnInit() {
    const currentAccount = getAccount();
    if (currentAccount && currentAccount.isConnected)
      this.walletAddress = currentAccount.address;
    this.accountSubscription = this.walletService.accountChanged$.subscribe(
      (account) => {
        if (account.isConnected) {
          this.walletAddress = account.address;
        }
      }
    );
  }

  connectWallet() {
    this.walletService.web3Modal.openModal();
  }

  ngOnDestroy() {
    this.accountSubscription.unsubscribe();
  }
  //TODO: Check the information that will be needed in the new version before deleting the comments

  // title = 'w3fs-frontend';
  // currentChainId = this.metamaskService.currentChainId;
  // currentAccount = this.metamaskService.currentAccount;
  // balance = this.metamaskService.balance;
  // hasMetamask;
  // tokenBalances: TokenBalance[] = [];
  // message = new FormControl('', Validators.required);
  // signatures: string[] = [];

  // constructor(
  //   private metamaskService: MetamaskService,
  //   private alchemyService: AlchemyService
  // ) {
  //   this.hasMetamask = metamaskService.checkMetamaskAvailability();
  //   if (this.hasMetamask) {
  //     metamaskService.retrieveConnection();
  //   }
  //   effect(async () => {
  //     if (this.currentAccount()) {
  //       this.tokenBalances = await this.alchemyService.getTokenBalances(
  //         this.currentAccount()
  //       );
  //     }
  //   });
  // }

  // connectWallet() {
  //   this.metamaskService.connectWallet();
  // }

  // signMessage() {
  //   const message = this.message.value!;
  //   this.metamaskService.signer?.signMessage(message).then((signature) => {
  //     this.signatures.push(signature);
  //   });
  // }
}
