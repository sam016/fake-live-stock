
export interface Config {
  env: 'development' | 'test' | 'production';
  wsURL: string;
};

const config: Config = {
  env: process.env.NODE_ENV,
  wsURL: process.env.REACT_APP_WS_URL || '',
};

export default config;
