import { AxiosResponse } from 'axios';

import { $client } from '@/api/api';

import {Deposit} from "@/models/deposit";




interface ton_transaction_deposit {
  hash: string;
  amount: number;
  address_from: string;
  address_to: string;
}
export const getDeposits = (user_id: number):Promise<AxiosResponse<Deposit[]>> =>  {
  return $client.get(`/deposits/user/${user_id}`).then(res  => res).catch(err => err);
};

export const createDeposit = (user_id:number, amount: number, ton_transaction:ton_transaction_deposit) => {
  $client.post('/deposits/', {
    user_id: user_id,
    amount: amount,
    ton_transaction: ton_transaction
  });
};

