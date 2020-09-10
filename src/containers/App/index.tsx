import React, { useState, useCallback, useMemo } from 'react';
import debounce from 'lodash/debounce';
import StockTable from '../../components/StockTable';
import useStockWS from '../../hooks/useStockWS';
import { Stock } from '../../models/stock';
import StockChartContainer from '../StockChartContainer';
import './style.scss';

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
  const [searchText, setSearchText] = useState<string>('');
  const [selectedStock, setSelectedStock] = useState<Stock>();

  // create array from stockData object
  const stocks = useMemo(() => Object.values(stockData), [stockData]);

  // memo filtered stocks from (searchText & all-stocks)
  const filteredStocks = useMemo(() => {
    // if searchText is empty; show all stocks
    if (searchText.length === 0) {
      return stocks;
    }

    // filter stocks from name/code
    return stocks.filter(item => item.name.toLowerCase().includes(searchText)
      || item.code.toLowerCase().includes(searchText));
  }, [stocks, searchText]);

  // create a search handler for search box
  const searchChangeHandler = useCallback(debounce((value: String) => {
    const searchText = value.trim();
    setSearchText(searchText);
  }, 100), []);

  // create a search handler for search box
  const stockSelectHandler = useCallback((stock: Stock) => {
    if (selectedStock && stock.code === selectedStock.code) {
      setSelectedStock(undefined);
    } else {
      setSelectedStock(stock);
    }
  }, [selectedStock]);

  return (
    <div className={`app ${selectedStock ? 'app--has-chart' : ''}`}>
      <div className="app__header page-container">
        <div className="h2">
          Live Stock
        </div>
        <div className="search-box">
          <input
            type="text"
            onChange={(e) => searchChangeHandler(e.target.value)}
            placeholder="Search stocks..."
          />
        </div>
      </div>
      <div className="app__content page-container">
        {filteredStocks.length === 0
          ? <div className="stock-no-result">
            {
              searchText
                ? <>No result found for "{searchText}"</>
                : <>No data available from server</>
            }
          </div>
          :
          <div className="stock-table-container">
            <StockTable
              stocks={filteredStocks}
              selectedStock={selectedStock}
              onStockClick={stockSelectHandler}
            />
          </div>}
      </div>
      {selectedStock && <div className="page-container app-stock-chart">
        <StockChartContainer
          stock={stockData[selectedStock.code]}
          onHide={() => setSelectedStock(undefined)}
        />
      </div>}
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
