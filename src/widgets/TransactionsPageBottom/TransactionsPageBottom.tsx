import { Box, Typography } from '@mui/material';
import cn from 'classnames';
import React from 'react';

import { TransactionsList } from '@/entities/Transaction';

import classes from './TransactionsPageBottom.module.scss';
import {Width} from "@/models/width";

interface ITransactionsPageBottomProps {
  className?: string;
  trx: Width[];
}

export const TransactionsPageBottom: React.FC<ITransactionsPageBottomProps> = (props) => {
  const {
    className = '',
    trx
  } = props;
  return (
    <Box className={ cn(classes.wrapper, {}, [ className ]) }>
      <Typography className={classes.title}>
        Транзакции
      </Typography>

      <TransactionsList trx={trx}/>
    </Box>
  );
};
