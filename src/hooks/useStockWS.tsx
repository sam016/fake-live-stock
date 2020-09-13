import { useState, useEffect } from 'react';
import moment from 'moment';
import { StockService, getStockService } from '../services/StockService';
import { Stock } from '../models/stock';
import config from '../config';

type IDictStock = { [id: string]: Stock };

function useStockWS(): [IDictStock, string] {
  const [stockData, setStockData] = useState<IDictStock>({});
  const [status, setStatus] = useState<string>('Idle');

  useEffect(() => {
    const stockService: StockService = getStockService(config.env, config.wsURL);

    stockService.onStatusChange = ((status: string) => {
      setStatus(status);
    });

    stockService.onLiveData = ((liveData) => {
      if (liveData.length === 0) {
        return;
      }

      setStockData(oldData => {
        const updatedData = liveData
          .reduce((prev: IDictStock, { code, price }) => {
            const ts = new Date().getTime();
            const data = {
              price,
              ts,
            };

            if (oldData[code]) {
              prev[code] = {
                ...oldData[code],
                lastTS: ts,
                price: data.price,
                history: [
                  ...oldData[code].history,
                  data,
                ],
              };
            } else {
              prev[code] = {
                code: code,
                name: code,
                history: [data],
                firstTS: moment(ts),
                lastTS: ts,
                price: data.price,
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

    stockService.begin();

    return () => {
      stockService.close();
    };
  }, []);

  return [stockData, status];
}

export default useStockWS;
