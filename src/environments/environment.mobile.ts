import {common} from './common';

common.mobile = true;

const mobile = {
  production: false,
  apiUrl: 'http://stagegastropack.hmsistemas.net'
}

export const environment = Object.assign(common,mobile);

