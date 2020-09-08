import React, { useState, useEffect } from 'react';
import './style.scss';
import usePrevious from '../../hooks/usePrevious';

interface ColorTextProps {
  value: number;
  prefix?: string;
}

const ColorText: React.FunctionComponent<ColorTextProps> = ({
  value,
  prefix = '',
}) => {
  const oldValue = usePrevious(value);

  return <div className={`color-text color-text--${(!oldValue || oldValue <= value) ? 'green' : 'red'}`}>
    {prefix} {value.toFixed(2)}
  </div>
};

export default ColorText;
