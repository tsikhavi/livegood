import { AxiosResponse } from 'axios';

import { $client } from '@/api/api';
import { Level } from "@/models/level";




export const getAllLevel = ():Promise<AxiosResponse<Level[]>> =>  {
  return $client.get('/levels/').then(res  => res).catch(err => err);
};


