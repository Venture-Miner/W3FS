import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectWalletWagmiComponent } from './connect-wallet-wagmi/connect-wallet-wagmi.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'wagmi',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'wagmi',
        component: ConnectWalletWagmiComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
