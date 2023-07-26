import { Controller, Get } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transactions')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}


  @Get('most-transacted-address')
  public async getMostTransactedAddress(): Promise<string> {
    return this.transactionService.getMostTransactedAddress();
  }
}
