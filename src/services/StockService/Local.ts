import { BaseStockService, StockValue } from ".";

export default class LocalStockService extends BaseStockService {
  onLiveData?: (data: StockValue[]) => void;
  onStatusChange?: (status: string) => void;

  begin() {
    super.begin();

    if (this.client) {
      this.client.on('message', this._onDataReceived.bind(this));
    }
  }

  private _onDataReceived(data: string) {
    if (!data || data.length <= 0) {
      return;
    }

    const stocks = data
      .split('\n')
      .map((item: string) => item.split(' '))
      .map(([code, price]) => ({ code, price: +price }));

    this.onLiveData && this.onLiveData(stocks);
  }
};
