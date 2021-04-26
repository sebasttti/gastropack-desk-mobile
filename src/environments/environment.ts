import { common } from './common';

const local = {
  production: false,
  //apiUrl: 'http://localhost/gastropack/api'
  apiUrl: 'https://stagegastropack.hmsistemas.net'
};

export const environment = Object.assign(common, local);
