import { useState, useEffect } from 'react';
import a from 'socket.io-client';
import { Stock } from '../models/stock';

type IDictStock = { [id: string]: Stock };

function useStockWS(): [IDictStock, string] {
  const [stockData, setStockData] = useState<IDictStock>({});
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    const client = a.connect('http://localhost:4000');

    // when connected with server
    client.on('connect', () => {
      console.log("ws connected");
      setStatus('Connected');
    });

    // when disconnected from server
    client.on('disconnect', () => {
      console.log("ws disconnected");
      setStatus('Disconnected');
    });

    // when socket is trying to reconnect
    client.on('reconnecting', () => {
      console.log("ws reconnecting");
      setStatus('Reconnecting');
    });

    // when data is available
    client.on('data', (data: string) => {
      if (!data || data.length <= 0) {
        return;
      }

      setStockData(oldData => {
        const updatedData = data
          .split('\n')
          .map((item: string) => item.split(' '))
          .reduce((prev: IDictStock, [stockCode, price]: string[]) => {
            if (oldData[stockCode]) {
              prev[stockCode] = {
                ...oldData[stockCode],
                price: +price,
                lastTS: new Date().getTime(),
              };
            } else {
              prev[stockCode] = {
                code: stockCode,
                name: stockCode,
                price: +price,
                lastTS: new Date().getTime(),
                history: [],
              };
            }

            return prev;
          }, {});

        return {
          ...oldData,
          ...updatedData,
        };
      });
    });

    return () => {
      if (client) {
        console.log('Closing connection');
        client.close();
      }
    };
  }, []);

  return [stockData, status];
}

export default useStockWS;
