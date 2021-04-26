import { common } from './common';

const production = {
  production: true,
  apiUrl: 'https://api.gastropack.zukytech.net'
};

export const environment = Object.assign(common, production);
