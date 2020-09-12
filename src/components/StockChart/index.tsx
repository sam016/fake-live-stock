import React from 'react';
import moment from 'moment';
import { Line, ChartData } from 'react-chartjs-2';
import chartjs from 'chart.js';
import { StockChartProps } from './props';

const INTERVALS = [
  [1, 2],
  [5, 10],
  [10, 10],
  [15, 15],
  [30, 30],
  [45, 45],
];

const StockChart: React.FunctionComponent<StockChartProps> = ({
  stock
}) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const momentTS0 = React.useMemo(() => moment(stock.history[0].ts), [stock]);
  const diffMinutes = React.useMemo(() => moment(stock.lastTS).diff(momentTS0, 'minute'), [momentTS0, stock.lastTS]);
  const maxBound = React.useMemo(() => {
    if (diffMinutes < 10) {
      return momentTS0.add(diffMinutes + 1.5, 'minute');
    }

    if (diffMinutes < 30) {
      const nearestMin = Math.floor(diffMinutes / 5) * 5 + 5;
      return momentTS0.add(nearestMin, 'minute');
    }

    const interval = INTERVALS.find(interval => (diffMinutes < interval[0]));

    if (interval) {
      return momentTS0.add(interval[1], 'minute');
    }

    return momentTS0.add(Math.floor(diffMinutes / 60) + 1, 'hour');
  }, [momentTS0, diffMinutes]);

  const data = React.useMemo<ChartData<chartjs.ChartData>>(() => ({
    datasets: [{
      label: stock.name,
      data: stock.history.map((value, ind) => ({
        t: value.ts,
        y: value.price,
      })),
      pointRadius: 0,
    }],
  }), [stock]);

  const chartOptions = React.useMemo<chartjs.ChartOptions>(() => ({
    scales: {
      xAxes: [{
        type: 'time',
        ticks: {
          min: stock.history[0].ts,
          max: maxBound,
        },
        time: {
          unit: 'minute',
          displayFormats: {
            quarter: 'hh:mm'
          }
        }
      }]
    }
  }), [stock, maxBound]);

  // const rootFontSize = parseInt(window.getComputedStyle(document.body).getPropertyValue('font-size'), 10);

  return <div className="chart"
    style={{
      width: 'calc(100% - 2rem)',
      height: '36rem',
    }}
  >
    <Line data={data} options={chartOptions}/>
  </div>
};

export default StockChart;
