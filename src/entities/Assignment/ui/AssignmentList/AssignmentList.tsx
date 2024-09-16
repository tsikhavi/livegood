import { Box } from '@mui/material';
import { AxiosResponse } from 'axios';
import cn from 'classnames';
import React, { useEffect, useState } from 'react';

import { getDoneTask, getTasks } from '@/api/task';
import { AssignmentListItem } from '@/entities/Assignment/ui/AssignmentListItem/AssignmentListItem';
import { Task } from '@/models/task';

import classes from './AssignmentList.module.scss';
import {TaskDone} from "@/models/doneTask";

interface IAssignmentListProps {
  className?: string;
  user_id:number;
}

export const AssignmentList: React.FC<IAssignmentListProps> = (props) => {
  const {
    className = '',
    user_id
  } = props;

  const getAllTask = async () => {
    const allTask:AxiosResponse<Task[]> = await getTasks();
    setTasks(allTask.data);
  };

  const getDoneTasks = async () => {
    const doneTasks:AxiosResponse<TaskDone[]> = await getDoneTask(user_id);
    const ids:number[] = [];
    doneTasks.data.map(task => {
      ids.push(task.task_id);
    });
    setDoneIds(ids);
  };
  const [tasks, setTasks] = useState<Task[]>([]);
  const [doneIds, setDoneIds] = useState<number[]>([]);
  useEffect(() => {
    getDoneTasks();
    getAllTask();
  }, []);
  const handleDoneTask = (task_id:number):void => {
    return setDoneIds([...doneIds,task_id]);
  };
  return (
    <>
      <Box className={ cn(classes.wrapper, {}, [ className ]) }>
        {tasks?.map(task =>
          doneIds?.indexOf(task.id) > -1 ? (
            <AssignmentListItem user_id={user_id} handleDoneTask={handleDoneTask} done={true} key={`assignment-list-item-${task.id}`} assignment={task}/>
          )
            : (
              <AssignmentListItem user_id={user_id} handleDoneTask={handleDoneTask} done={false} key={`assignment-list-item-${task.id}`} assignment={task}/>
            ))}
      </Box>
    </>
  );
};
