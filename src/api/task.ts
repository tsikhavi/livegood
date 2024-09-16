import { AxiosResponse } from 'axios';

import { $client } from '@/api/api';
import { Task } from "@/models/task";
import {TaskDone} from "@/models/doneTask";




export const getTasks = ():Promise<AxiosResponse<Task[]>> =>  {
  return $client.get('/tasks/').then(res  => res).catch(err => err);
};

export const getDoneTask = (user_id:number):Promise<AxiosResponse<TaskDone[]>> =>  {
  return $client.get(`/tasks/completed-tasks/${user_id}`).then(res  => res).catch(err => err);
};
export const doneTasks = (user_id:number, task_id: number) => {
  $client.post(`/tasks/${task_id}/complete?user_id=${user_id}`);
};

