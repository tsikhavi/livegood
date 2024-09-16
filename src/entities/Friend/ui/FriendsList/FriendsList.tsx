import { Box } from '@mui/material';
import cn from 'classnames';
import React, { useEffect, useRef, useState } from 'react';


import { FriendsListItem } from '@/entities/Friend/ui/FriendsListItem/FriendsListItem';

import classes from './FriendsList.module.scss';
import {getInvitedUser} from "@/api/user";
import {AxiosResponse} from "axios";
import {User} from "@/models/user";

interface IFriendsListProps {
  className?: string;
  user_id: number;
}

export const FriendsList: React.FC<IFriendsListProps> = (props) => {
  const {
    className = '',
    user_id
  } = props;
  const [ scrollEnd, setScrollEnd ] = useState<boolean>( false );
  const ref = useRef<HTMLDivElement>();
  const [users, setUsers] = useState<User[]>([]);
  const checkScroll = () => {
    if (ref.current) {
      const currentScroll = ref.current?.scrollTop + ref.current?.clientHeight + 60;

      if (currentScroll >= ref.current.scrollHeight) {
        setScrollEnd( true );

        return;
      }

      setScrollEnd( false );
    }
  };
  const getReferrals = async () => {
    const refs:AxiosResponse<User[]> = await getInvitedUser(user_id)
    setUsers(refs.data);
  };
  useEffect( () => {
    ref.current?.addEventListener( 'scroll', checkScroll );
    getReferrals()
    return () => {
      ref.current?.removeEventListener( 'scroll', checkScroll );
    };
  }, [] );

  return (
    <Box className={ cn( classes.wrapper, {
      [`${ classes.scrollEnd }`]: scrollEnd,
    }, [ className ] ) }>
      <Box ref={ ref } className={ classes.listWrapper }>
        { users.map( friend => (
          <FriendsListItem key={ `friend-list-item-${ friend.username }` } friend={ friend }/>
        ) ) }
      </Box>
    </Box>
  );
};
