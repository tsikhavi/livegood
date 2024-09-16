import { CloseRounded } from '@mui/icons-material';
import { Box, Button, Drawer, IconButton, Typography } from '@mui/material';
import cn from 'classnames';
import React, {useState} from 'react';

import { IAssignment } from '@/entities/Assignment/types/assignment';
import StarCoinIcon from '@/shared/assets/svg/Assignment/star-coin.svg?react';
import classes from './AssignmentInfoDrawer.module.scss';
import {doneTasks} from "@/api/task";
import {initUtils} from "@telegram-apps/sdk";


interface IAssignmentInfoDrawerProps {
  assignment: IAssignment;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  user_id: number;
  onDone: (task_id: number) => void;
}

export const AssignmentInfoDrawer: React.FC<IAssignmentInfoDrawerProps> = (props) => {
  const telegramUtils = initUtils();
  const {
    className = '',
    isOpen,
    onClose,
    assignment,
    user_id,
    onDone
  } = props;
  const [isSub, setIsSub] = useState<string>(''+window.localStorage.getItem(`sub${assignment.id}`));
  const done = () => {

    doneTasks(user_id,assignment.id);
  };
  return (
    <Drawer anchor='bottom' open={ isOpen } onClose={ onClose } className={ cn( classes.wrapper, {}, [ className ] ) }>
      <IconButton className={ classes.closeIcon } onClick={ onClose }>
        <CloseRounded color='primary'/>
      </IconButton>
      <Box className={ classes.topContent }>
        <Box className={ classes.infoWrapper }>
          <Box className={ classes.titleWrapper }>
            <img className={ classes.img } src={ assignment.image } alt="Изображение задания"/>
            <Typography className={ classes.title }>
              { assignment.desc }
            </Typography>
          </Box>
          <Typography className={ classes.text }>

          </Typography>
        </Box>
        <Button variant='contained' onClick={():void => {
          telegramUtils.openLink(assignment.link);
          window.localStorage.setItem(`sub${assignment.id}`, 'done');
          setIsSub('done');


        }} className={ classes.subscribeButton }>Подписаться</Button>
      </Box>
      <Box className={classes.rewardWrapper}>
        <StarCoinIcon/>
        <Typography className={classes.rewardText}>
          +{ assignment.reward } LG
        </Typography>
      </Box>
      <Button disabled={!isSub} onClick={() => {
        done();
        onDone(assignment.id);
        onClose();
      }}  fullWidth variant='contained' className={classes.checkButton}>Проверить</Button>
    </Drawer>
  );
};
