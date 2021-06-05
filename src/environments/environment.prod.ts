import { common } from './common';

const production = {
  production: true,
  apiUrl: 'http://api.sintonizateconlavida.com'
};

export const environment = Object.assign(common, production);
