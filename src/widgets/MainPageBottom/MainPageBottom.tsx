import cn from 'classnames';
import React, {useState} from 'react';

import { CoinContent } from '@/widgets/CoinContent/CoinContent';
import { InvitedPartnersContent } from '@/widgets/InvitedPartnersContent/InvitedPartnersContent';

import classes from './MainPageBottom.module.scss';
import {Level} from "@/models/level";

interface IMainPageBottomProps {
  className?: string;
  coins: number,
  amount_coins: number,
  ref_count:number,
  expired:boolean,
  levels: Level[],
  level_id: number
  user_id: number;
}

export const MainPageBottom: React.FC<IMainPageBottomProps> = (props) => {
  const {
    className = '',
    coins,
    amount_coins,
    ref_count,
    expired,
    levels,
    level_id,
    user_id,

  } = props;


  return (
    <div className={ cn(classes.wrapper, {}, [ className ]) }>
      <CoinContent user_id={user_id} coins={coins} amount={amount_coins} maxAmount={levels[level_id]?.max_taps_count || 0} expired={expired}/>

      <InvitedPartnersContent needInvited={levels[level_id]?.needs_invited_users || 10} ref_count={ref_count}/>
    </div>
  );
};
