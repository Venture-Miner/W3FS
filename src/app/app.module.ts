import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnectWalletWagmiComponent } from './connect-wallet-wagmi/connect-wallet-wagmi.component';
import { ConnectWalletAlchemyComponent } from './connect-wallet-alchemy/connect-wallet-alchemy.component';

@NgModule({
  declarations: [AppComponent, ConnectWalletWagmiComponent, ConnectWalletAlchemyComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
