import cn from 'classnames';
import React, {useEffect, useState} from 'react';

import BackgroundTonCoins from '@/shared/assets/png/background-ton-coins.png';
import { TransactionsPageBottom } from '@/widgets/TransactionsPageBottom/TransactionsPageBottom';
import { TransactionsPageTop } from '@/widgets/TransactionsPageTop/TransactionsPageTop';

import classes from './TransactionsPage.module.scss';
import {Width} from "@/models/width";
import {getDeposits} from "@/api/deposit";
import {getWidth} from "@/api/width";

interface ITransactionsPageProps {
  className?: string;
}

const TransactionsPage: React.FC<ITransactionsPageProps> = (props) => {
  const { className = '' } = props;
  const [trx, setTrx] = useState<Width[]>([]);
  const tg = window.Telegram?.WebApp;
  const user_id = tg?.initDataUnsafe?.user?.id || 0;
  useEffect(() => {

    if (tg && tg.BackButton) {
      const BackButton = tg.BackButton;

      BackButton.show();

      BackButton.onClick(() => {
        window.location.href = '/';
      });
      getTrx();
      return () => {
        BackButton.offClick();
      };
    }
  }, []);
  const getTrx = async () => {
    const deps = await getDeposits(user_id);
    const trxs: Width[] = [];
    deps.data.map(dep => {
      trxs.push({ ...dep, status: 'deposit' });
    });
    const width = await getWidth(user_id);
    width.data.map(wid => {
      trxs.push({ ...wid, status: 'width' });
    });
    trxs.sort((a, b) => {
      const aDate = a?.ton_transaction?.created_at ?? 0;
      const bDate = b?.ton_transaction?.created_at ?? 0;
      return aDate < bDate ? 1 : -1;
    });
    setTrx(trxs);
  };
  
  return (
    <div className={cn(classes.wrapper, {}, [className])}>
      <img className={classes.backgroundTonCoins} src={BackgroundTonCoins} alt="Задний фон с TON коинами" />
      <TransactionsPageTop getTrx={getTrx} user_id={user_id} />
      <TransactionsPageBottom trx={trx} />
    </div>
  );
};

export default TransactionsPage;
