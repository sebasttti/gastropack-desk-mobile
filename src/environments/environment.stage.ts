import {common} from './common';

const stage = {
  production: false,
  apiUrl: 'http://stagegastropack.hmsistemas.net'
}

export const environment = Object.assign(common,stage);

