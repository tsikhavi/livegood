import { Box, Button, Typography } from '@mui/material';
import cn from 'classnames';
import React, { useState } from 'react';

import { WithdrawalFundsDialogForm } from '@/features/WithdrawalFundsDialogForm';

import classes from './ReferralsInfo.module.scss';
import {createWidth} from "@/api/width";
import {toUserFriendlyAddress, useTonAddress, useTonConnectUI} from "@tonconnect/ui-react";

interface IReferralsInfoProps {
  incomeAmount: string;
  invitedAmount: string;
  className?: string;
  user_id: number;
}

export const ReferralsInfo: React.FC<IReferralsInfoProps> = (props) => {
  const {
    className = '',
    invitedAmount,
    incomeAmount,
    user_id
  } = props;
  const [tonConnectUI, setOptions] = useTonConnectUI();
  const userFriendlyAddress = useTonAddress();
  const [ isOpenDialog, setIsOpenDialog ] = useState<boolean>( false );

  const handleCloseDialog = () => {
    setIsOpenDialog( false );
  };

  const handleOpenDialog = () => {
    setIsOpenDialog( true );
  };
  const handleWidth = (amount: number) => {
    if (!tonConnectUI.wallet) {
      tonConnectUI.connectWallet().then(res => {
        createWidth(user_id, amount * 1e9, {
          hash: `${Math.random()}`, // Remove the argument
          amount: amount * 1e9,
          address_from: toUserFriendlyAddress(tonConnectUI?.wallet?.account?.address || 'hex') || '',
          address_to: 'UQBs1_cdwKC3pgxfdGVacaw_twOkmZHRTWGvggRmlYP3BZFr'
        });
        handleCloseDialog();
        alert('success width');
      }).catch(err => {
        handleCloseDialog();
      });
    } else {
      createWidth(user_id, amount * 1e9, {
        hash: `${Math.random()}`, // Remove the argument
        amount: amount * 1e9,
        address_from: toUserFriendlyAddress(tonConnectUI?.wallet?.account?.address || 'hex') || '',
        address_to: 'UQBs1_cdwKC3pgxfdGVacaw_twOkmZHRTWGvggRmlYP3BZFr'
      });
      handleCloseDialog();
      alert('success width');
    }
  };
  



  return (
    <>
      <Box className={ cn( classes.wrapper, {}, [ className ] ) }>
        <Box className={classes.grid}>
          <Box className={classes.content}>
            <Typography className={classes.label}>
              Доход с рефералов
            </Typography>
            <Typography className={classes.value}>
              {incomeAmount} TON
            </Typography>
          </Box>
          <Box className={classes.content}>
            <Typography className={classes.label}>
              Друзей приглашено
            </Typography>
            <Typography className={classes.value}>
              {invitedAmount}
            </Typography>
          </Box>
        </Box>
        <Button variant='contained' onClick={handleOpenDialog}>Вывести</Button>
      </Box>

      <WithdrawalFundsDialogForm balance={+incomeAmount*1e9} handleWidth={handleWidth} isOpen={isOpenDialog} onClose={handleCloseDialog}/>
    </>
  );
};
