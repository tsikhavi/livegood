import { AxiosResponse } from 'axios';

import { $client } from '@/api/api';
import { User } from '@/models/user';



export const getUser = (user_id:number):Promise<AxiosResponse<User>> =>  {
  return $client.get(`/users/${user_id}`).then(res  => res).catch(err => err);
};

export const getInvitedUser = (user_id: number):Promise<AxiosResponse<User[]>> => {
  return $client.get(`/users/${user_id}/invited_users`).then(res => res).catch(err => err);
};

export const getReferralsUser = (user_id: number):Promise<AxiosResponse<User[]>> => {
  return $client.get(`/users/${user_id}/referrals`).then(res => res).catch(err => err);
};

