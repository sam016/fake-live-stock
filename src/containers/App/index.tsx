import React from 'react';
import StockTable from '../../components/StockTable';
import './style.scss';
import useStockWS from '../../hooks/useStockWS';

/* const STOCKS = [
  { code: 'st', name: 'strategic', price: 42.22, lastTS: 0, history: [] },
  { code: 'Ke', name: 'Keyboard', price: 92.42, lastTS: 0, history: [] },
  { code: 'ci', name: 'circuit', price: 53.30, lastTS: 0, history: [] },
  { code: 'Na', name: 'National', price: 43.33, lastTS: 0, history: [] },
  { code: 'Re', name: 'Reduced', price: 74.60, lastTS: 0, history: [] },
  { code: 'co', name: 'collaboration', price: 72.76, lastTS: 0, history: [] },
  { code: 'We', name: 'Wells', price: 95.55, lastTS: 0, history: [] },
  { code: 'Ye', name: 'Yen', price: 96.56, lastTS: 0, history: [] },
  { code: 'un', name: 'unleash', price: 29.57, lastTS: 0, history: [] },
  { code: 'Ch', name: 'Chicken', price: 21.62, lastTS: 0, history: [] },
  { code: 'Ou', name: 'Outdoors', price: 43.06, lastTS: 0, history: [] },
  { code: 'Sq', name: 'Squares', price: 87.50, lastTS: 0, history: [] },
  { code: 'in', name: 'infrastructures', price: 10.29, lastTS: 0, history: [] },
  { code: 'So', name: 'Soft', price: 45.17, lastTS: 0, history: [] },
  { code: 'SM', name: 'SMS', price: 73.38, lastTS: 0, history: [] },
  { code: 'fo', name: 'forecast', price: 80.03, lastTS: 0, history: [] },
  { code: 'te', name: 'teal', price: 36.40, lastTS: 0, history: [] },
  { code: 'De', name: 'Delaware', price: 50.72, lastTS: 0, history: [] },
]; */

const App = () => {
  const [stockData, status] = useStockWS();

  return (
    <div className="app">
      <div className="app__header page-container">
        <div className="h2">
          Live Stock
        </div>
      </div>
      <div className="app__content page-container">
        <StockTable
          stocksOb={stockData}
        />
      </div>
      <div className="app__footer page-container">
        <div className="builder">
          Built by sam016
        </div>
        <div className={`connection-status ${status}`}>{status}</div>
      </div>
    </div>
  );
}

export default App;
