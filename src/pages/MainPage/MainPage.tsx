import { Box } from '@mui/material';

import { toUserFriendlyAddress, useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { AxiosResponse } from 'axios';
import cn from 'classnames';
import React, { useEffect, useState } from 'react';

import { createDeposit } from '@/api/deposit';
import { getAllLevel } from '@/api/level';
import { buyPass, getPass } from '@/api/tappass';
import { getInvitedUser, getUser } from '@/api/user';
import { Level } from '@/models/level';
import { Pass } from '@/models/pass';
import { User } from '@/models/user';
import BackgroundTonCoins from '@/shared/assets/png/background-ton-coins.png';
import { MainPageBottom } from '@/widgets/MainPageBottom/MainPageBottom';
import { MainPageTop } from '@/widgets/MainPageTop/MainPageTop';

import classes from './MainPage.module.scss';
export interface IMainPageProps {
  className?: string;
}
const user_id:number  = 2;
const MainPage: React.FC<IMainPageProps> = (props) => {
  const [tonConnectUI, setOptions] = useTonConnectUI();
  const [user, setUser] = useState<User>({
    avatar: 'default',
    coin_amount: 0,
    created_at: '0',
    id: 0,
    invited_by_id: 0,
    level_id: 0,
    referred_by_id: 0,
    taps_available: 0,
    taps_updated_at: 0,
    ton_amount_blocked: 0,
    ton_amount_total: 0,
    updated_at: '1',
    lost_profit: 0,
    username: '1',
    users_invited: 0
  });
  const tg = window.Telegram?.WebApp;
  const user_id = tg?.initDataUnsafe?.user?.id || 0;
  const [refCount, setRefCount] = useState<number>(0);
  const [tapPasses, setTapPasses] = useState<Pass>({ activated_at: 0, id: 0, user_id: 0, valid_until: 0 });
  const [isExpired, setIsExpired] = useState<boolean>(true);
  const [levels, setLevels] = useState<Level[]>([]);
  const userFriendlyAddress = useTonAddress();
  const {
    className = '',
  } = props;

  const getData = async () => {
    const userData:AxiosResponse<User> = await getUser(user_id);
    const userInvited:AxiosResponse<User[]> = await getInvitedUser(user_id);
    const tapPass:AxiosResponse<Pass> = await getPass(user_id);
    const allLvls:AxiosResponse<Level[]> = await getAllLevel();


    setLevels(allLvls.data);
    setIsExpired(new Date(tapPasses.valid_until) > new Date());
    if(tapPass.data){
      setTapPasses(tapPass.data);
      setIsExpired(new Date(tapPass.data.valid_until) > new Date());
    }
    console.log(tapPasses, tapPass);

    setUser(userData.data);
    setRefCount(userInvited.data.length);

  };
  useEffect(():void => {
    getData();
  }, []);
  const buyPassHandler = async () => {
    if((user.ton_amount_total - user.ton_amount_blocked)/1e9 > 3){
      await buyPass(user_id);
      getData();
    } else {
      await addDepOnPass();
      await buyPass(user_id);
      getData();
    }
  };

  const addDepOnPass = async () => {
    if(!tonConnectUI.wallet){
      await tonConnectUI.connectWallet().then(res => {}).catch(err => {});
      await tonConnectUI.sendTransaction({
        validUntil: new Date().getTime() + 3600,
        messages: [ { address: 'UQBs1_cdwKC3pgxfdGVacaw_twOkmZHRTWGvggRmlYP3BZFr', amount: ''+3 * (1e9) }]
      }).then(res => {
        createDeposit(user_id, 3*1e9, {
          hash: res.boc,
          amount: 3*1e9,
          address_from: toUserFriendlyAddress(tonConnectUI?.wallet?.account?.address || 'hex') || '',
          address_to: 'UQBs1_cdwKC3pgxfdGVacaw_twOkmZHRTWGvggRmlYP3BZFr'
        });}).catch(err => err);

    } else {
      await tonConnectUI.sendTransaction({
        validUntil:  new Date().getTime() + 3600,
        messages: [ { address: 'UQBs1_cdwKC3pgxfdGVacaw_twOkmZHRTWGvggRmlYP3BZFr', amount: ''+3 * (1e9) }]
      }).then(res => {
        createDeposit(user_id, 3*1e9, {
          hash: res.boc,
          amount: 3*1e9,
          address_from: userFriendlyAddress,
          address_to: 'UQBs1_cdwKC3pgxfdGVacaw_twOkmZHRTWGvggRmlYP3BZFr'
        });
      }).catch(err => {
      });
    }
  };


  return (
    <Box className={ cn(classes.wrapper, {}, [ className ]) }>
      <img className={classes.backgroundTonCoins} src={BackgroundTonCoins} alt="Задний фон с TON коинами"/>
      <MainPageTop
        lost_profit={user.lost_profit}
        buyPassHandler={buyPassHandler}
        expired={!isExpired}
        tappass={tapPasses}
        balance={user.ton_amount_total - user.ton_amount_blocked}
      />
      <MainPageBottom
        user_id={user_id}
        level_id = {user.level_id}
        levels = {levels}
        amount_coins={user.taps_available}
        coins={user.coin_amount}
        ref_count={refCount}
        expired={!isExpired}
      />
    </Box>
  );
};

export default MainPage;
