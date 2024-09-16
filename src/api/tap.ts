import { $client } from '@/api/api';





export const tapCoin = (user_id:number) =>  {
  $client.post('/tap_sessions/', {
    user_id: user_id,
    taps_count: 1,
    coin_amount: 1
  }).then(res  => res).catch(err => err);
};


