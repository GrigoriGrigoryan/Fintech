import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { AnalyticsService } from './analytics.service';
import { Analytics } from './analytics.entity';
import { TransactionController } from './transaction.controller';
import { EthersService } from './ethers.service';
import { TransactionService } from './transaction.service';

@Module({
  imports: [TypeOrmModule.forFeature([Analytics]), HttpModule],
  providers: [AnalyticsService, EthersService, TransactionService],
  exports: [AnalyticsService],
  controllers: [TransactionController],
})
export class TransactionModule {}
