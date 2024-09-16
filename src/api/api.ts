import axios from 'axios';
const clientL = axios.create({
  baseURL: 'https://telegrams.su/api/v1',
});
export const $client = clientL;
