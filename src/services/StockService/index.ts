import socketIO from 'socket.io-client';

export interface StockValue {
  code: string;
  price: number;
}

export interface StockService {
  onLiveData?: (data: StockValue[]) => void;
  onStatusChange?: (status: string) => void;
  begin(): void;
  close(): void;
}

export abstract class BaseStockService implements StockService {
  protected readonly url: string;
  protected client: SocketIOClient.Socket | undefined;

  constructor(url: string) {
    this.url = url;
  }

  private _attachEvents() {
    if (!this.client) {
      return;
    }

    // when connected with server
    this.client.on('connect', () => {
      console.log("ws connected");
      this.onStatusChange && this.onStatusChange('Connected');
    });

    // when disconnected from server
    this.client.on('disconnect', () => {
      console.log("ws disconnected");
      this.onStatusChange && this.onStatusChange('Disconnected');
    });

    // when socket is trying to reconnect
    this.client.on('reconnecting', () => {
      console.log("ws reconnecting");
      this.onStatusChange && this.onStatusChange('Reconnecting');
    });
  }

  begin() {
    this.client = socketIO.connect(this.url);
    this._attachEvents();
  }

  close() {
    if (!this.client) {
      return;
    }

    console.log('Closing connection');
    this.client.close();
  }

  abstract onLiveData?: (data: StockValue[]) => void;
  abstract onStatusChange?: (status: string) => void;
}

export const getStockService = (env: string, url: string) => {
  if (env === 'development') {
    const { default: LocalStockService } = require('./Local');
    return new LocalStockService(url);
  }

  const { default: LiveStockService } = require('./Live');
  return new LiveStockService(url);
}
