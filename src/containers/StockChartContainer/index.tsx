import React from 'react';
import { Stock } from '../../models/stock';
import StockChart from '../../components/StockChart';
import './style.scss';

interface StockChartContainerProps {
  stock: Stock;
  onHide: () => void;
}

const StockChartContainer: React.FunctionComponent<StockChartContainerProps> = ({
  stock,
  onHide,
}) => {

  return <div className="stock-chart-container">
    <div className="container__header">
      <span className="stock-name">{stock.name}</span>
      <button className="btn-hide" onClick={onHide}>Hide</button>
    </div>
    <div className="container__content">
      <StockChart stock={stock} />
    </div>
  </div>;
};

export default StockChartContainer;
