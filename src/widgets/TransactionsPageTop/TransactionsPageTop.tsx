import { Box, Button } from '@mui/material';
import { toUserFriendlyAddress, useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { AxiosResponse } from 'axios';
import cn from 'classnames';
import React, { useEffect, useState } from 'react';

import { createDeposit } from '@/api/deposit';
import { getUser } from '@/api/user';
import { createWidth } from '@/api/width';
import { Balance } from '@/entities/Balance/ui/Balance';
import { ReplenishmentDialogForm } from '@/features/ReplenishmentDialogForm';
import { WithdrawalFundsDialogForm } from '@/features/WithdrawalFundsDialogForm';
import { User } from '@/models/user';

import classes from './TransactionsPageTop.module.scss';

interface ITransactionsPageTopProps {
  className?: string;
  user_id: number;
  getTrx: () => void;
}

export const TransactionsPageTop: React.FC<ITransactionsPageTopProps> = (props) => {
  const { className = '', user_id, getTrx } = props;

  const [isOpenReplenishmentDialog, setIsOpenReplenishmentDialog] = useState<boolean>(false);
  const [isOpenWithdrawalDialog, setIsOpenWithdrawalDialog] = useState<boolean>(false);
  const [tonConnectUI, setUI] = useTonConnectUI();
  const userFriendlyAddress = useTonAddress();
  const [user, setUser] = useState<User>({
    avatar: 'default',
    coin_amount: 0,
    created_at: '0',
    id: 0,
    invited_by_id: 0,
    level_id: 0,
    referred_by_id: 0,
    taps_available: 0,
    taps_updated_at: 0,
    ton_amount_blocked: 0,
    ton_amount_total: 0,
    updated_at: '1',
    username: '1',
    users_invited: 0,
    lost_profit: 0
  });

  const getData = async () => {
    try {
      const userData: AxiosResponse<User> = await getUser(user_id);
      setUser(userData.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    getData();
  }, [user_id]);

  const handleDeposit = (amount: number) => {
    const sendDeposit = async () => {
      try {
        if (!tonConnectUI.wallet) {
          await tonConnectUI.connectWallet();
        }

        const res = await tonConnectUI.sendTransaction({
          validUntil: new Date().getTime() + 3600,
          messages: [{ address: 'UQBs1_cdwKC3pgxfdGVacaw_twOkmZHRTWGvggRmlYP3BZFr', amount: `${amount * 1e9}` }]
        });

        await createDeposit(user_id, amount * 1e9, {
          hash: res.boc,
          amount: amount * 1e9,
          address_from: toUserFriendlyAddress(tonConnectUI?.wallet?.account?.address || 'hex') || '',
          address_to: 'UQBs1_cdwKC3pgxfdGVacaw_twOkmZHRTWGvggRmlYP3BZFr'
        });

        alert('Success deposit');
        handleCloseReplenishmentDialog();
        getTrx();
      } catch (error) {
        console.error('Error during deposit:', error);
        handleCloseReplenishmentDialog();
      }
    };

    sendDeposit();
  };

  const handleWidth = (amount: number) => {
    const sendWidth = async () => {
      try {
        if (!tonConnectUI.wallet) {
          await tonConnectUI.connectWallet();
        }

        await createWidth(user_id, amount * 1e9, {
          hash: `${Math.round(10)}`,
          amount: amount * 1e9,
          address_from: toUserFriendlyAddress(tonConnectUI?.wallet?.account?.address || 'hex') || '',
          address_to: 'UQBs1_cdwKC3pgxfdGVacaw_twOkmZHRTWGvggRmlYP3BZFr'
        });

        alert('Success width');
        handleCloseWithdrawalDialog();
        getTrx();
        getData();
      } catch (error) {
        console.error('Error during width:', error);
        handleCloseWithdrawalDialog();
      }
    };

    sendWidth();
  };

  const handleOpenReplenishmentDialog = () => setIsOpenReplenishmentDialog(true);
  const handleCloseReplenishmentDialog = () => setIsOpenReplenishmentDialog(false);
  const handleOpenWithdrawalDialog = () => setIsOpenWithdrawalDialog(true);
  const handleCloseWithdrawalDialog = () => setIsOpenWithdrawalDialog(false);

  return (
    <>
      <Box className={cn(classes.wrapper, {}, [className])}>
        <Balance balance={user.ton_amount_total - user.ton_amount_blocked} />

        <Box className={classes.actions}>
          <Button fullWidth variant="contained" onClick={handleOpenReplenishmentDialog}>Пополнить</Button>
          <Button fullWidth variant="outlined" onClick={handleOpenWithdrawalDialog}>Вывести</Button>
        </Box>
      </Box>

      <ReplenishmentDialogForm
        handleDeposit={handleDeposit}
        isOpen={isOpenReplenishmentDialog}
        onClose={handleCloseReplenishmentDialog}
      />

      <WithdrawalFundsDialogForm
        balance={user.ton_amount_total - user.ton_amount_blocked}
        handleWidth={handleWidth}
        isOpen={isOpenWithdrawalDialog}
        onClose={handleCloseWithdrawalDialog}
      />
    </>
  );
};
