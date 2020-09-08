import React, { useCallback } from 'react';
import TimeAgo from 'react-timeago'
import { Stock } from '../../models/stock';
import ColorText from '../ColorText';
import './style.scss';

interface StockRowProps {
  stock: Stock;
  isSelected: boolean;
  onClick: (e: React.MouseEvent, stock: Stock) => void;
  onKeyPress: (e: React.KeyboardEvent, stock: Stock) => void;
};

const StockRow: React.FunctionComponent<StockRowProps> = ({
  stock,
  onClick,
  onKeyPress,
}) => {
  return <div className="stock-row"
    tabIndex={0}
    onClick={(e,) => onClick(e, stock)}
    onKeyPress={(e) => onKeyPress(e, stock)}
  >
    <div className="stock-row__code">{stock.code}</div>
    <div className="stock-row__name">{stock.name}</div>
    <div className="stock-row__price">
      <ColorText prefix="$" value={stock.price} />
    </div>
    <div className="stock-row__ts" >
      <TimeAgo date={stock.lastTS} minPeriod={5} />
    </div>
  </div>
}

interface StockTableProps {
  stocks: Stock[];
  selectedStock?: Stock,
  onStockClick: (stock: Stock) => void;
};

const StockTable: React.FunctionComponent<StockTableProps> = React.memo(({
  stocks,
  selectedStock,
  onStockClick,
}) => {
  const clickHandler = useCallback((e: React.MouseEvent, stock: Stock) => {
    onStockClick(stock);
  }, [onStockClick]);

  const keyPressHandler = useCallback((e: React.KeyboardEvent, stock: Stock) => {
    if (e.keyCode === 13) {
      onStockClick(stock);
    }
  }, [onStockClick]);

  return <div className="stock-table">
    {stocks.map((stock) =>
      <StockRow
        key={stock.name}
        stock={stock}
        isSelected={(selectedStock && stock.code === selectedStock.code) || false}
        onClick={clickHandler}
        onKeyPress={keyPressHandler}
      />)}
  </div>;
});

export default StockTable;
