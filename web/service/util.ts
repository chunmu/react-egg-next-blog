import Cookies from 'js-cookie';
import axios from 'axios';

export function mixCsrfToken(): any {
  axios.defaults.headers = axios.defaults.headers || {}
  axios.defaults.headers['x-csrf-token'] = Cookies.get('csrfToken');
};
