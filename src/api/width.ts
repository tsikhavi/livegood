import { AxiosResponse } from 'axios';

import { $client } from '@/api/api';

import {Width} from "@/models/width";




interface ton_transaction_deposit {
  hash: string;
  amount: number;
  address_from: string;
  address_to: string;
}
export const getWidth = (user_id: number):Promise<AxiosResponse<Width[]>> =>  {
  return $client.get(`/withdrawals/user/${user_id}`).then(res  => res).catch(err => err);
};

export const createWidth = (user_id:number, amount: number, ton_transaction:ton_transaction_deposit) => {
  $client.post('/withdrawals/', {
    user_id: user_id,
    amount: amount,
    ton_transaction: ton_transaction
  });
};

