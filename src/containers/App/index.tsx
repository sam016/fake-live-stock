import React from 'react';
import StockTable from '../../components/StockTable';
import './index.scss';

const App = () => {
  return (
    <div className="app">
      <div className="app__header page-container">
        <div className="h2">
          Live Stock
        </div>
      </div>
      <div className="app__content page-container">
        <StockTable
          stocks={[]}
        />
      </div>
      <div className="app__footer page-container">
        <div className="builder">
          Built by sam016
        </div>
      </div>
    </div>
  );
}

export default App;
