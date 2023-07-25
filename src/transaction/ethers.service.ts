import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Block, Transaction } from './interfaces';

@Injectable()
export class EthersService {
  constructor(private readonly httpService: HttpService) {}

  public async getBlock(blockNumber: string): Promise<Block | null> {
    const result = await this.httpService
      .get(
        `https://api.etherscan.io/api?module=proxy&action=eth_getBlockByNumber&tag=${blockNumber}&boolean=true&apikey=JMW8BNH5IGXX1JQ1R2C2CPEJXHFQ1PQ5HM`,
      )
      .toPromise();

    return result.data.result || null;
  }

  public async getLastBlockNumber(): Promise<string> {
    const result = await this.httpService
      .get('https://api.etherscan.io/api?module=proxy&action=eth_blockNumber')
      .toPromise();

    return result.data.result;
  }

  public getBlockTransactions(block: Block): Transaction[] {
    if (!block || !block.transactions) {
      return [];
    }

    return block.transactions.map((transaction) => {
      const { from, to, value, blockNumber } = transaction;

      return {
        from,
        to,
        value,
        blockNumber,
      };
    });
  }
}
