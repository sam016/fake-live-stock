import React from 'react';
import moment from 'moment';
import { Line, ChartData } from 'react-chartjs-2';
import chartjs from 'chart.js';
import { StockChartProps } from './props';

const StockChart: React.FunctionComponent<StockChartProps> = ({
  stock
}) => {
  // get first stock update TS
  const ts0 = React.useMemo(() => stock.history[0].ts, [stock]);

  // get moment object from first stock update
  const momentTS0 = React.useMemo(() => moment(ts0), [ts0]);

  // get the diff in minutes b/w first stock update and last stock update
  const diffMinutes = React.useMemo(() => moment(stock.lastTS).diff(momentTS0, 'minute'), [momentTS0, stock.lastTS]);

  // get the next nearest max bound data as number
  const nextNearestMin = React.useMemo(() => {
    if (diffMinutes < 15) {
      return diffMinutes + 1.5;
    }

    if (diffMinutes < 30) {
      return Math.floor(diffMinutes / 5) * 5 + 6;
    }

    return (Math.floor(diffMinutes / 60) + 1) * 60;
  }, [diffMinutes]);

  // get the max bound data in graph as moment
  const maxBound = React.useMemo(() => {
    return momentTS0.add(nextNearestMin, 'minute');
  }, [momentTS0, nextNearestMin]);

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
    <Line data={data} options={chartOptions} />
  </div>
};

export default StockChart;
