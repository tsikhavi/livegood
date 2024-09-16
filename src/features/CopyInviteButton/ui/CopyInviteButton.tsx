import { Button, Tooltip } from '@mui/material';
import cn from 'classnames';
import React, { useRef, useState } from 'react';

import classes from './CopyInviteButton.module.scss';

interface ICopyInviteButtonProps {
  className?: string;
}

export const CopyInviteButton: React.FC<ICopyInviteButtonProps> = (props) => {
  const { className = '' } = props;

  const [isOpenTooltip, setIsOpenTooltip] = useState<boolean>(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Safeguard to check if Telegram WebApp is available
  const tg = window.Telegram?.WebApp;
  const user_id = tg?.initDataUnsafe?.user?.id || 0;

  const handleClickInviteButton = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    // Ensure user_id is valid
    if (user_id) {
      navigator.clipboard.writeText(`https://t.me/LiveGOOOOOD_bot?start=${user_id}`);
      setIsOpenTooltip(true);

      timeout.current = setTimeout(() => {
        setIsOpenTooltip(false);
      }, 3000);
    } else {
      console.error('User ID is not available.');
      // Optionally, you can show an error message to the user or handle the situation differently
    }
  };

  return (
    <Tooltip
      open={isOpenTooltip}
      arrow
      placement="top"
      title="Реферальная ссылка скопирована!"
      className={cn(classes.wrapper, {}, [className])}
    >
      <Button fullWidth variant="contained" onClick={handleClickInviteButton}>
        Пригласить друга
      </Button>
    </Tooltip>
  );
};
