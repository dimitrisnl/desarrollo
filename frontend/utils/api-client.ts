import axios from 'axios';

import {sleep} from '@/f/utils/sleep';
import {originUrl} from '@/f/utils/url';

export const client = axios.create({
  baseURL: `${originUrl}/api`,
});

client.interceptors.response.use(async (response) => {
  // add artificial delay for dev env
  if (process.env.NODE_ENV === 'development') {
    await sleep();
  }
  return response.data;
});
