import React, { CSSProperties, useMemo } from 'react';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import TimeAgo from 'react-timeago'
import { Stock } from '../../models/stock';
import './style.scss';
import RollingText from '../RollingText';

interface StockTableProps {
  stocks?: Stock[];
  stocksOb: { [id: string]: Stock };
};

interface StockRowProps {
  stock: Stock;
  style: CSSProperties,
};

const StockRow: React.FunctionComponent<StockRowProps> = ({
  stock,
  style,
}) => {
  return <div className="stock-row" style={style}>
    <span className="stock-row__code">{stock.code}</span>
    <span className="stock-row__name">{stock.name}</span>
    <span className="stock-row__price">
      {/* <RollingText text={stock.price.toFixed(2)} /> */}
      <span className="dollar"></span>
      {stock.price.toFixed(2)}
    </span>
    <span className="stock-row__ts" >
      <TimeAgo date={stock.lastTS} minPeriod={5} />
    </span>
  </div>
}

const StockTable: React.FunctionComponent<StockTableProps> = React.memo(({
  stocksOb,
}) => {
  const countStocks = useMemo(() => Object.keys(stocksOb).length, [stocksOb]);
  const stocks = useMemo(() => Object.values(stocksOb), [stocksOb]);

  return <div className="stock-table">
    <AutoSizer>
      {({ width, height }) => {

        // get the root font size; and row height would be twice of that
        const fontSize = parseInt(window.getComputedStyle(document.body).getPropertyValue('font-size'), 10);

        return <List
          height={height}
          width={width}
          itemCount={countStocks}
          itemSize={fontSize * 2}
        >
          {({ index, style }) =>
            <StockRow
              key={stocks[index].name}
              stock={stocks[index]}
              style={style}
            />}
        </List>
      }}
    </AutoSizer>
  </div>;
});

export default StockTable;
