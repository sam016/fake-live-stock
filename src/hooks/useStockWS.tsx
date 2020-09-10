import { useState, useEffect } from 'react';
import socketIO from 'socket.io-client';
import { Stock } from '../models/stock';

type IDictStock = { [id: string]: Stock };

function useStockWS(): [IDictStock, string] {
  const [stockData, setStockData] = useState<IDictStock>({});
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    const client = socketIO.connect('http://localhost:4000');

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
            const ts = new Date().getTime();
            const data = {
              price: +price,
              lastTS: ts,
            };

            if (oldData[stockCode]) {
              prev[stockCode] = {
                ...oldData[stockCode],
                ...data,
              };
              prev[stockCode].history.push({ ...data, ts });
            } else {
              prev[stockCode] = {
                code: stockCode,
                name: stockCode,
                history: [],
                ...data,
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
