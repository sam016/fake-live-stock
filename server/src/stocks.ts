import sampleSize from 'lodash/sampleSize';
import random from 'lodash/random';
import STOCK_DATA from './data';


// stores the last generated data for stock
const memData: { [id: string]: number } = {};

export const getRandomData = (count = 10) => {
  // get 10 sample items stock
  const items = sampleSize(STOCK_DATA, count);

  // randomize price in them
  const result = items.map(item => {
    const stockCode: string = item[0];
    let price = memData[stockCode] || random(9, 999, true);

    price += random(-5, 5, true);

    // if price is going lower, increase by 10
    if (price < 0) {
      price += random(10, true);
    }

    memData[stockCode] = price;

    return {
      stockCode,
      price,
      ts: new Date().getTime(),
    };
  });

  return result;
}
