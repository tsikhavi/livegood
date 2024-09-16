import { Box } from '@mui/material';
import cn from 'classnames';
import React from 'react';

import { AssignmentList } from '@/entities/Assignment';

import classes from './AssignmentPageTop.module.scss';

interface IAssignmentPageTopProps {
  className?: string;
  user_id: number;
}

export const AssignmentPageTop: React.FC<IAssignmentPageTopProps> = (props) => {
  const {
    className = '',
    user_id
  } = props;
  return (
    <Box className={ cn( classes.wrapper, {}, [ className ] ) }>
      <AssignmentList user_id={user_id ?? 0}/>
    </Box>
  );
};
