import { Injectable } from '@nestjs/common';
import { EthersService } from './ethers.service';

@Injectable()
export class TransactionService {
  constructor(private readonly ethersService: EthersService) {}

  public async getMostTransactedAddress(): Promise<string> {
    const balanceList = await this.getBalanceDeltaByBlockCount(100);

    let maxAbsoluteValue = 0;
    let maxTransactedAddress = null;

    for (const [address, value] of balanceList) {
      const absoluteValue = Math.abs(value);
      if (absoluteValue > maxAbsoluteValue) {
        maxAbsoluteValue = absoluteValue;
        maxTransactedAddress = address;
      }
    }

    return maxTransactedAddress;
  }

  private async getBalanceDeltaByBlockCount(
    count: number,
  ): Promise<Map<string, number>> {
    const balanceList: Map<string, number> = new Map();

    const lastBlockNumberHex = await this.ethersService.getLastBlockNumber();
    const lastBlockNumber = parseInt(lastBlockNumberHex, 16);

    for (let i = lastBlockNumber - count; i <= lastBlockNumber; i++) {
      const currentBlockNumberHex = i.toString(16);
      const result = await this.ethersService.getBlock(currentBlockNumberHex);
      const transactions = this.ethersService.getBlockTransactions(result);

      transactions.forEach((transaction) => {
        const { to, from, value } = transaction;

        const currentFromBalance = balanceList.get(from) || 0;
        const currentToBalance = balanceList.get(from) || 0;

        balanceList.set(from, currentFromBalance - parseInt(value));
        balanceList.set(to, currentToBalance + parseInt(value));
      });
    }

    return balanceList;
  }
}
