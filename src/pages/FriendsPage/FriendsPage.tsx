import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { mockAvatar } from '@/shared/const/mockAvatar';
import { FriendsPageBottom } from '@/widgets/FriendsPageBottom/FriendsPageBottom';
import { FriendsPageTop } from '@/widgets/FriendsPageTop/FriendsPageTop';

import classes from './FriendsPage.module.scss';
import { User } from "@/models/user";
import { AxiosResponse } from "axios";
import { getUser } from "@/api/user";

export interface IFriendsPageProps {
  className?: string;
}

const FriendsPage: React.FC<IFriendsPageProps> = (props) => {
  const { className = '' } = props;
  const { username } = useParams();

  // Initial user state
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

  const tg = window.Telegram?.WebApp;
  const user_id = tg?.initDataUnsafe?.user?.id || 0;

  // Fetch user data
  const getData = async () => {
    try {
      if (user_id) {
        const userData: AxiosResponse<User> = await getUser(user_id);
        setUser(userData.data);
      } else {
        console.error("User ID not available");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (tg && tg.BackButton) {
      const BackButton = tg.BackButton;

      BackButton.show();
      BackButton.onClick(() => {
        window.location.href = '/';
      });

      getData();

      return () => {
        BackButton.offClick();
      };
    }
  }, [tg]);

  return (
    <Box className={cn(classes.wrapper, {}, [className])}>
      <FriendsPageTop
        user_id={user.id}
        amountFriend={String(user.users_invited || '2')}
        balance={user.ton_amount_total - user.ton_amount_blocked}
        coins={user.coin_amount}
        invitedAmount={String(user.users_invited)}
        incomeAmount={String((user.ton_amount_total - user.ton_amount_blocked) / 1e9)}
        username={tg?.initDataUnsafe?.user?.username || '@username'}
        avatar={tg?.initDataUnsafe?.user?.photo || mockAvatar}
      />
      <FriendsPageBottom user_id={user_id} />
    </Box>
  );
};

export default FriendsPage;
