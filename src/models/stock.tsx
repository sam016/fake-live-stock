
export interface Stock {
  name: string;
  history: Array<StockPriceTS>;
}

export interface StockPriceTS {
  price: number;
  ts: number;
}
