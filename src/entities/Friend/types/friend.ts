export interface IFriendNode extends IFriend{
  left: IFriendNode | null;
  right: IFriendNode | null;
}

export interface IFriend {
  id: number;
  avatar: string;
  username: string;
  friendsCount: number;
  lgCoinsAmount: number;
}
