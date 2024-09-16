import { Box, IconButton, Typography } from '@mui/material';
import cn from 'classnames';
import React, { useState } from 'react';

import { IAssignment } from '@/entities/Assignment/types/assignment';
import { AssignmentInfoDrawer } from '@/entities/Assignment/ui/AssignmentInfoDrawer/AssignmentInfoDrawer';
import ArrowRight from '@/shared/assets/svg/arrow-right-orange.svg?react';
import DoneIcon from '@/shared/assets/svg/Assignment/checkbox.svg?react';

import classes from './AssignmentListItem.module.scss';


interface IAssignmentListItemProps {
  assignment: IAssignment;
  className?: string;
  user_id: number;
  handleDoneTask: (task_id: number) => void ;

  done: boolean
}

export const AssignmentListItem: React.FC<IAssignmentListItemProps> = (props) => {
  const {
    className = '',
    assignment,
    user_id,
    handleDoneTask
  } = props;

  const [ isOpenDrawer, setIsOpenDrawer ] = useState<boolean>( false );

  const handleOpenDrawer = () => {
    setIsOpenDrawer( true );
  };


  const handleCloseDrawer = () => {
    setIsOpenDrawer( false );
  };

  return (
    <>
      <Box
        className={ cn( classes.wrapper, {
          [`${classes.disable}`]: props.done
        }, [ className ] ) }
        onClick={handleOpenDrawer}
      >
        <Box className={ classes.right }>
          <img src={'/'+assignment.image } alt="Изображение задачи"/>
          <Box className={ classes.infoWrapper }>
            <Typography className={ cn( classes.title, {
              [`${classes.disable}`]: props.done
            }, [] ) }>
              { assignment.desc }
            </Typography>
            <Typography className={ cn( classes.amount, {
              [`${classes.disable}`]: props.done
            }, [] ) }>
              { assignment.reward } LG
            </Typography>
          </Box>
        </Box>
        { !props.done && (
          <IconButton>
            <ArrowRight/>
          </IconButton>
        ) }
        { props.done && (
          <DoneIcon/>
        ) }
      </Box>
      <AssignmentInfoDrawer onDone={handleDoneTask} user_id={user_id} assignment={assignment} isOpen={isOpenDrawer} onClose={handleCloseDrawer}/>
    </>
  );
};
