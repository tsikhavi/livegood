import { Box, Typography } from '@mui/material';
import cn from 'classnames';
import React, {useEffect, useState} from 'react';

import classes from './AssignmentRefreshTimer.module.scss';

interface IAssignmentRefreshTimerProps {
  className?: string;
}

export const AssignmentRefreshTimer: React.FC<IAssignmentRefreshTimerProps> = (props) => {
  const {
    className = '',
  } = props;
  const getTimeRemaining = () => {
    const endtime = new Date();

    // Добавляем один день
    endtime.setDate(endtime.getDate() + 1);

    // Устанавливаем время на 8 утра
    endtime.setHours(8, 0, 0, 0); // Часы, минуты, секунды, миллисекунды
    const total = Date.parse(''+endtime) - Date.parse(''+new Date());
    const seconds = Math.floor( (total/1000) % 60 );
    const minutes = Math.floor( (total/1000/60) % 60 );
    const hours = Math.floor( (total/(1000*60*60)) % 24 );

    setTimer(`${hours}:${minutes}:${seconds}`);
  };
  useEffect(() => {
    setInterval(getTimeRemaining, 1000);
  }, []);
  const [timer, setTimer] = useState<string>('');
  return (
    <Box className={ cn( classes.wrapper, {}, [ className ] ) }>
      <Typography className={classes.title}>
        Задания обновятся через:
      </Typography>
      <Box className={classes.timerWrapper}>
        <Typography className={classes.timerText}>
          {timer}
        </Typography>
      </Box>
    </Box>
  );
};
