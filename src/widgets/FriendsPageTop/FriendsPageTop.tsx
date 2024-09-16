import cn from 'classnames';
import React from 'react';

import { UserInfo } from '@/entities/User';
import { ReferralsInfo } from '@/widgets/ReferralsInfo/ReferralsInfo';

import classes from './FriendsPageTop.module.scss';

interface IFriendsPageTopProps {
  avatar: string;
  username: string;
  amountFriend: string;
  incomeAmount: string;
  invitedAmount: string;
  className?: string;
  coins: number;
  balance: number;
  user_id: number;
}

export const FriendsPageTop: React.FC<IFriendsPageTopProps> = (props) => {
  const {
    className = '',
    avatar,
    amountFriend,
    username,
    incomeAmount,
    invitedAmount,
    balance,
    coins,
    user_id
  } = props;
  return (
    <div className={ cn( classes.wrapper, {}, [ className ] ) }>
      <UserInfo balance={balance} coins={coins} amountFriend={ amountFriend } username={ username } avatar={ avatar }/>
      <ReferralsInfo user_id={user_id} incomeAmount={ incomeAmount } invitedAmount={ invitedAmount }/>
    </div>
  );
};
