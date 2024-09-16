import cn from 'classnames';
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

import { FriendsMatrixList } from '@/entities/Friend/ui/FriendsMatrixList/FriendsMatrixList';

import classes from './FriendsMatrix.module.scss';
import {getReferralsUser} from "@/api/user";
import {AxiosResponse} from "axios";
import {User} from "@/models/user";
import {IFriend, IFriendNode} from "@/entities/Friend/types/friend";
import {Width} from "@/models/width";

interface IFriendsMatrixProps {
  className?: string;
  user_id: number;
}

export const FriendsMatrix: React.FC<IFriendsMatrixProps> = (props) => {
  const {
    className = '',
    user_id
  } = props;

  const { username } = useParams();
  const [refs, setRefs] = useState<IFriendNode[]>([]);
  const getRefs = async (user_id:number) => {
    const userMatrix:AxiosResponse<User[]> = await getReferralsUser(user_id);
    const matrixR:IFriendNode[] = [];
    if(userMatrix.data.length > 0){
      matrixR.push(await getMatrix(userMatrix.data[0], 1) as IFriendNode);
    }
    if(userMatrix.data.length > 1){
      matrixR.push(await getMatrix(userMatrix.data[1], 1) as IFriendNode);
    }
    setRefs(matrixR);
    console.log(matrixR);
  };
  const getMatrix = async (user:User,step:number):Promise<IFriendNode> => {
    if(step < 3) {
      const userMatrixL: AxiosResponse<User[]> = await getReferralsUser(user.id);
      return {
        id: user.id,
        username: user.username,
        avatar: user.avatar,
        left: userMatrixL.data.length > 0 ? await getMatrix(userMatrixL.data[0], step + 1) : {},
        right: userMatrixL.data.length > 1 ? await getMatrix(userMatrixL.data[0], step + 1) : {}
      } as IFriendNode;


    }
    return {} as IFriendNode;
  };
  useEffect(() => {
    getRefs(user_id);
  }, []);
  return (
    <div className={ cn( classes.wrapper, {}, [ className ] ) }>
      { refs.map( (friend) => (
        <FriendsMatrixList getRefs={getRefs} key={ `friend-matrix-${ friend?.id }` } friend={ friend }/>
      ) ) }
    </div>
  );
};
