import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EthersService } from './ethers.service';
import { Analytics } from './analytics.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    private readonly ethersService: EthersService,
    @InjectRepository(Analytics)
    private analyticsRepository: Repository<Analytics>,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  public async collectAnalytics() {
    try {
      const blockNumber = await this.getNextBlockNumber();

      const block = await this.ethersService.getBlock(blockNumber);

      const transactions = this.ethersService.getBlockTransactions(block);
      await this.analyticsRepository.insert(transactions);
    } catch (error) {
      console.log(error);
    }
  }

  private async getNextBlockNumber(
    initialBlockNumber = 17583000,
  ): Promise<string> {
    let nextBlockNumber = initialBlockNumber;

    const lastTransaction = await this.analyticsRepository
      .createQueryBuilder('analytics')
      .orderBy('analytics.id', 'DESC')
      .getOne();

    if (lastTransaction) {
      nextBlockNumber = parseInt(lastTransaction.blockNumber, 16) + 1;
    }

    return nextBlockNumber.toString(16);
  }
}
