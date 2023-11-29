import { Controller, Get, Param, Query } from '@nestjs/common';
import { BlockchainService } from './blockchain.service';

@Controller('blockchain')
export class BlockchainController {
  constructor(private readonly blockchainService: BlockchainService) {}

  @Get('balance/:address')
  getBalance(@Param('address') address: string) {
    return this.blockchainService.getBalance(address);
  }

  @Get('token-balance/')
  getTokenBalance(@Query('address') address: string, @Query('contract') contract: string) {
    return this.blockchainService.getTokenBalance(address, contract);
  }
}
