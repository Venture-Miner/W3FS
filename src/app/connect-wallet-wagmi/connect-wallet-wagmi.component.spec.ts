import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectWalletWagmiComponent } from './connect-wallet-wagmi.component';

describe('ConnectWalletWagmiComponent', () => {
  let component: ConnectWalletWagmiComponent;
  let fixture: ComponentFixture<ConnectWalletWagmiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectWalletWagmiComponent]
    });
    fixture = TestBed.createComponent(ConnectWalletWagmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
