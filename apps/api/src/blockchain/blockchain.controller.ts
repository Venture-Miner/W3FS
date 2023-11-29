import { Controller, Get, Param } from '@nestjs/common';
import { BlockchainService } from './blockchain.service';

@Controller('blockchain')
export class BlockchainController {
  constructor(private readonly blockchainService: BlockchainService) {}

  @Get('balance/:address')
  getBalance(@Param('address') address: string) {
    return this.blockchainService.getBalance(address);
  }
}
