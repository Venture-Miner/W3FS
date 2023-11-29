import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import * as tokenJson from '../assets/MyToken.json';

@Injectable()
export class BlockchainService {
  provider: ethers.providers.BaseProvider;

  constructor() {
    this.provider = ethers.getDefaultProvider('sepolia');
  }

  getBalance(address: string) {
    return this.provider.getBalance(address);
  }

  getTokenBalance(address: string, contract: string) {
    const contractInstance = new ethers.Contract(
      contract,
      tokenJson.abi,
      this.provider
    );
    return contractInstance['balanceOf'](address);
  }
}
