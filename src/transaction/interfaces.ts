export interface Transaction {
  blockNumber: string;
  from: string;
  to: string;
  value: string;
}

export interface Block {
  transactions: Transaction[];
  [index: string]: any;
}
