import React from 'react';
import { Chart } from 'react-charts'
import { Stock } from '../../models/stock';

interface StockChartProps {
  stock: Stock
};

const StockChart: React.FunctionComponent<StockChartProps> = ({
  stock
}) => {
  const data = React.useMemo(() => [
    {
      label: stock.name,
      data: stock.history.map(value => ({
        primary: value.ts,
        secondary: value.price,
      })),
    },

  ], [stock]);

  const axes = React.useMemo(() => [
    { primary: true, type: 'time', position: 'bottom' },
    { type: 'linear', position: 'left' }
  ], []);

  return <div className="chart"
    style={{
      width: 'calc(100% - 2rem)',
      height: '16rem',
    }}
  >
    <Chart data={data} axes={axes} />
  </div>
};

export default StockChart;
