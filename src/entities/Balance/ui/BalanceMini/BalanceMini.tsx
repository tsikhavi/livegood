import { Box, Typography } from '@mui/material';
import cn from 'classnames';
import React from 'react';

import classes from './BalanceMini.module.scss';

interface IBalanceMiniProps {
  className?: string;
  coins: number;
  balance: number;
}

export const BalanceMini: React.FC<IBalanceMiniProps> = (props) => {
  const {
    className = '',
    coins,
    balance
  } = props;
  return (
    <Box className={ cn( classes.wrapper, {}, [ className ] ) }>
      <Typography className={ classes.tonAmount }>
        {balance / 1e9} TON
      </Typography>
      <Typography className={ classes.lgAmount }>
        {coins} LG
      </Typography>
    </Box>
  );
};
