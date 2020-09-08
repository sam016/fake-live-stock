
export interface Stock {
  code: string;
  name: string;
  price: number;
  lastTS: number;
  history: Array<StockPriceTS>;
}

export interface StockPriceTS {
  price: number;
  ts: number;
}
