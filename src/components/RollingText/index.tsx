import React, { useState, useEffect } from 'react';
import './style.scss';

interface RollingTextProps {
  text: string;
  animDuration?: number;
}

const RollingText: React.FunctionComponent<RollingTextProps> = ({
  text,
  animDuration = 100,
}) => {
  const [, setAnimTimeoutId] = useState<NodeJS.Timeout>();
  const [oldText, setOldText] = useState('');
  const [currentText, setCurrentText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setOldText(currentText);
    setCurrentText(text);
    setIsAnimating(true);

    setAnimTimeoutId((timeoutId) => {
      // clear any old timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      return setTimeout(() => {
        setIsAnimating(false);
      }, animDuration);
    });

  }, [animDuration, currentText, text]);

  return <div className={`rolling-text ${isAnimating ? 'rolling-text--anim' : ''}`}>
    {text}
    {/* <div className="rolling-text__old">{oldText}</div>
    <div className="rolling-text__current">{currentText}</div> */}
  </div>
};

export default RollingText;
