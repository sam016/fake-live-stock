import React, { useMemo } from 'react';
import './style.scss';

interface StockPriceProps {
  value: number;
  prefix?: string;
}

const StockPrice: React.FunctionComponent<StockPriceProps> = ({
  value,
  prefix = '',
}) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initialValue = useMemo(() => value, []);

  const color = useMemo(() => {
    if (!initialValue || initialValue === value) {
      return 'black';
    }

    return (value > initialValue ? 'green' : 'red');
  }, [initialValue, value]);

  const delta = useMemo(() => value - initialValue, [initialValue, value]);

  return <div className={`stock-price stock-price--${color}`}>
    <div className="stock-price__current">
      <span className="stock-price__prefix">{prefix}</span>
      {value.toFixed(2)}
    </div>
    <div className="stock-price__arrow"></div>
    <div className="stock-price__delta">
      <span className="stock-price__prefix">{prefix}</span>
      {delta.toFixed(2)}
    </div>
  </div>
};

export default StockPrice;
