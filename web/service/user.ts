import axios from 'axios';
import { User } from '../page/admin/user';
import { mixCsrfToken } from './util';

export function addUser(data: User): Promise<User> {
  mixCsrfToken();
  return axios.post('/user/add', data);
}
