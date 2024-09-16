import { Box, Button, Typography } from '@mui/material';
import cn from 'classnames';
import React, { useState } from 'react';

import { ActivateDialogForm } from '@/features/ActivateDialogForm';

import classes from './TicketValidityPeriod.module.scss';
import {Pass} from "@/models/pass";

interface ITicketValidityPeriodProps {
  expired: boolean
  className?: string;
  tappass: Pass;
  lost_profit: number;
  buyPassHandler: () => void;
}

export const TicketValidityPeriod: React.FC<ITicketValidityPeriodProps> = (props) => {
  const {
    className = '',
    expired,
    tappass,
    lost_profit,
    buyPassHandler
  } = props;

  const [ isOpenActivateDialog, setIsOpenActivateDialog ] = useState( false );

  const handleCloseActivateDialog = () => {
    setIsOpenActivateDialog(false);
  };

  const handleOpenActivateDialog = () => {
    setIsOpenActivateDialog(true);
  };

  return (
    <>
      <Box className={cn(classes.wrapper, {
        [`${classes.expired}`]: expired
      }, [className])}>
        <Box className={classes.leftContent}>
          <Typography className={classes.label}>
            {expired && 'Срок действия'}
            {!expired && 'Действует ещё'}
          </Typography>
          <Typography className={classes.amount}>
            {expired && 'Закончился'}
            {!expired && Math.round((new Date(tappass.valid_until).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}
          </Typography>
        </Box>

        <span style={{display: expired ? 'block' : 'none'}} className={classes.divider}/>
        <Box className={classes.rightContent} style={{display: expired ? 'block' : 'none'}}>
          { `упущенная прибыль: ${lost_profit} TON` }
        </Box>
        <span style={{display: expired ? 'block' : 'none'}} className={classes.divider}/>

        <Box className={classes.rightContent}>
          <Button disabled={!expired} className={classes.button} variant='text' onClick={handleOpenActivateDialog}>
            {expired && 'Активация'}
            {!expired && 'Продлить'}
          </Button>
        </Box>
      </Box>

      <ActivateDialogForm buyPassHandler={buyPassHandler} isOpen={isOpenActivateDialog}
                          onClose={handleCloseActivateDialog}/>
    </>
  );
};
