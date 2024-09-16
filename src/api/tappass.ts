import { AxiosResponse } from 'axios';

import { $client } from '@/api/api';
import { Pass } from "@/models/pass";




export const getPass = (user_id:number):Promise<AxiosResponse<Pass>> =>  {
  return $client.get(`/tap_passes/${user_id}`).then(res  => res).catch(err => err);
};


export const buyPass = (user_id:number) => {
  return $client.post(`/tap_passes/buy?uid=${user_id}`).then(res => res).catch(err => err);
};
