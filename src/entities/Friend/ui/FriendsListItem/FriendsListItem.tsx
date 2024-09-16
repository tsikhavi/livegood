import { Box, Typography } from '@mui/material';
import cn from 'classnames';
import React from 'react';

import { IFriend } from '@/entities/Friend/types/friend';
import { UserAvatar } from '@/shared/ui/UserAvatar/UserAvatar';

import classes from './FriendsListItem.module.scss';
import {User} from "@/models/user";

interface IFriendsListItemProps {
  friend: User;
  className?: string;
}

export const FriendsListItem: React.FC<IFriendsListItemProps> = (props) => {
  const {
    className = '',
    friend
  } = props;
  return (
    <Box className={ cn( classes.wrapper, {}, [ className ] ) }>
      <Box className={ classes.right }>
        <UserAvatar src={ friend.avatar }/>
        <Box className={ classes.infoWrapper }>
          <Typography className={ classes.username }>
            { friend.username }
          </Typography>
          <Typography className={classes.friendsCountLabel}>
            { friend.users_invited } друга
          </Typography>
        </Box>
      </Box>
      <Typography className={classes.lgCoins}>
        { friend.coin_amount } <span>LG</span>
      </Typography>
    </Box>
  );
};
