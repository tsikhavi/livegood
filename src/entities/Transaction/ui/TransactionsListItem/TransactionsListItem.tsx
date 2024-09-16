import { Box, Typography } from '@mui/material';
import cn from 'classnames';
import React from 'react';

import { ITransaction } from '@/entities/Transaction/types/transaction';
import ReplenishmentIcon from '@/shared/assets/svg/replenishment.svg?react';
import WithdrawalIcon from '@/shared/assets/svg/withdrawal.svg?react';

import classes from './TransactionsListItem.module.scss';
import {Width} from "@/models/width";

interface ITransactionsListItemProps {
  transaction: Width;
  className?: string;
}

export const TransactionsListItem: React.FC<ITransactionsListItemProps> = (props) => {
  const {
    className = '',
    transaction
  } = props;
  return (
    <Box className={ cn( classes.wrapper, {}, [ className ] ) }>
      <Box className={ classes.right }>
        { transaction.status === 'deposit' && <ReplenishmentIcon/> }
        { transaction.status === 'width' && <WithdrawalIcon/> }

        <Typography className={ classes.title }>
          { transaction.status === 'deposit' && 'Пополнение' }
          { transaction.status === 'width' && 'Вывод' }
        </Typography>
      </Box>
      <Typography className={ classes.amount }>
        { transaction.amount /1000000000} TON
      </Typography>
    </Box>
  );
};
