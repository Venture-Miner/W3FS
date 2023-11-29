import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectWalletAlchemyComponent } from './connect-wallet-alchemy.component';

describe('ConnectWalletAlchemyComponent', () => {
  let component: ConnectWalletAlchemyComponent;
  let fixture: ComponentFixture<ConnectWalletAlchemyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectWalletAlchemyComponent],
    });
    fixture = TestBed.createComponent(ConnectWalletAlchemyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
