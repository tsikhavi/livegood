import { Box, Button } from '@mui/material';
import cn from 'classnames';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Balance } from '@/entities/Balance/ui/Balance';
import { TicketValidityPeriod } from '@/features/TicketValidityPeriod';
import BookmarkIcon from '@/shared/assets/svg/bookmark.svg?react';

import classes from './MainPageTop.module.scss';
import {Pass} from "@/models/pass";

interface IMainPageTopProps {
  className?: string;
  balance: number,
  expired: boolean,
  tappass: Pass,
  lost_profit: number,
  buyPassHandler: () => void;
}

export const MainPageTop: React.FC<IMainPageTopProps> = (props) => {
  const {
    className = '',
    balance,
    tappass,
    expired,
    buyPassHandler,
    lost_profit

  } = props;

  const navigate = useNavigate();

  const onClickDaily = () => {
    navigate( '/assignment' );
  };

  return (
    <Box className={ cn(classes.wrapper, {}, [ className ]) }>
      <Box className={classes.top}>
        <Balance balance={balance}/>

        <Button className={classes.dailyButton} onClick={onClickDaily}>
          <BookmarkIcon/>
          Ежедневки
        </Button>
      </Box>

      <TicketValidityPeriod lost_profit={lost_profit} tappass={tappass} buyPassHandler={buyPassHandler} expired={expired}/>
    </Box>
  );
};
