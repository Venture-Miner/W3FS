import { Injectable } from '@nestjs/common';
import { Alchemy, Network } from 'alchemy-sdk';
import { formatUnits } from 'viem';

@Injectable()
export class BlockchainService {
  alchemy: Alchemy;

  constructor() {
    this.alchemy = new Alchemy({
      apiKey: 'YOUR_ALCHEMY_API_KEY',
      network: Network.ARB_GOERLI,
    });
  }

  async getBalance(address: string) {
    const balance = await this.alchemy.core.getBalance(address);
    return formatUnits(balance.toBigInt(), 18);
  }
}
