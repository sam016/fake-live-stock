import React from 'react';
import TimeAgo from 'react-timeago'
import { Stock } from '../../models/stock';
import './style.scss';
import RollingText from '../RollingText';

interface StockTableProps {
  stocks: Stock[];
};

interface StockRowProps {
  stock: Stock;
};

const StockRow: React.FunctionComponent<StockRowProps> = ({
  stock,
}) => {
  return <div className="stock-row">
    <div className="stock-row__code">{stock.code}</div>
    <div className="stock-row__name">{stock.name}</div>
    <div className="stock-row__price">
      <span className="dollar"></span>
      <RollingText text={stock.price.toFixed(2)} />
    </div>
    <div className="stock-row__ts" >
      <TimeAgo date={stock.lastTS} minPeriod={5} />
    </div>
  </div>
}

const StockTable: React.FunctionComponent<StockTableProps> = React.memo(({
  stocks,
}) => {
  return <div className="stock-table">
    {stocks.map((stock) =>
      <StockRow
        key={stock.name}
        stock={stock}
      />)}
  </div>;
});

export default StockTable;
