import { Box, Button } from '@mui/material';
import cn from 'classnames';
import React, {useEffect, useState} from 'react';

import CoinBigIcon from '@/shared/assets/svg/coin-big.svg?react';
import { CoinClickDeactivate } from '@/widgets/CoinClickDeactivate/CoinClickDeactivate';
import { CoinsAmount } from '@/widgets/CoinsAmount/CoinsAmount';
import { TapsAmount } from '@/widgets/TapsAmount/TapsAmount';

import classes from './CoinContent.module.scss';
import {tapCoin} from "@/api/tap";

interface ICoinContentProps {
  expired?: boolean;
  className?: string;
  coins: number;
  amount: number;
  maxAmount: number;
  user_id: number;
}

export const CoinContent: React.FC<ICoinContentProps> = (props) => {
  const {
    className = '',
    expired ,
    coins,
    amount,
    maxAmount,
    user_id
  } = props;
  const [tapAmount, setTapAmount] = useState<number>(0);
  const [coinsBalance, setCoinsBalance] = useState<number>(0);

  const tap = ():void => {
    if(amount-tapAmount > 1){
      tapCoin(user_id);
      setCoinsBalance(coinsBalance+1);
    };
    console.log(tapAmount);
    setTapAmount(tapAmount+1);
  };

  return (
    <Box className={ cn(classes.wrapper, {}, [ className ]) }>
      <Box className={classes.top}>
        <CoinsAmount amount={coins+coinsBalance}/>
        <TapsAmount amount={''+(amount-tapAmount)} maxAmount={''+maxAmount}/>
      </Box>
      <Box className={classes.bottom} id='coin-click-wrapper'>
        {expired && <CoinClickDeactivate/>}
        <Button onClick={tap} className={cn(classes.coinButton, {
          [`${classes.disabledButton}`]: expired
        })}>
          <CoinBigIcon/>
        </Button>
      </Box>
    </Box>
  );
};
