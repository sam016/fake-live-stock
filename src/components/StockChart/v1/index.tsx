import React from 'react';
import { Chart } from 'react-charts';
import { StockChartProps } from '../props';

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
    { type: 'time', position: 'bottom', primary: true, },
    { type: 'linear', position: 'left' },
  ], []);

  return <div className="chart chart-v1"
    style={{
      width: 'calc(100% - 2rem)',
      height: '16rem',
    }}
  >
    <Chart data={data} axes={axes} />
  </div>
};

export default StockChart;
