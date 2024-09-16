import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import cn from 'classnames';
import { mockTelegramEnv, parseInitData } from '@telegram-apps/sdk';

import { AssignmentPageBottom } from '@/widgets/AssignmentPageBottom/AssignmentPageBottom';
import { AssignmentPageTop } from '@/widgets/AssignmentPageTop/AssignmentPageTop';

import classes from './AssignmentPage.module.scss';
import ErrorBoundary from './ErrorBoundary'; // Adjust the import path as needed

interface IAssignmentPageProps {
  className?: string;
}

// Simulate Telegram environment for development
const initDataRaw = new URLSearchParams([
  ['user', JSON.stringify({
    id: 99281932,
    first_name: 'Andrew',
    last_name: 'Rogue',
    username: 'rogue',
    language_code: 'en',
    is_premium: true,
    allows_write_to_pm: true,
  })],
  ['hash', '89d6079ad6762351f38c6dbbc41bb53048019256a9443988af7a48bcad16ba31'],
  ['auth_date', '1716922846'],
  ['start_param', 'debug'],
  ['chat_type', 'sender'],
  ['chat_instance', '8428209589180549439'],
]).toString();

if (process.env.NODE_ENV === 'development') {
  mockTelegramEnv({
    themeParams: {
      accentTextColor: '#6ab2f2',
      bgColor: '#17212b',
      buttonColor: '#5288c1',
      buttonTextColor: '#ffffff',
      destructiveTextColor: '#ec3942',
      headerBgColor: '#17212b',
      hintColor: '#708499',
      linkColor: '#6ab3f3',
      secondaryBgColor: '#232e3c',
      sectionBgColor: '#17212b',
      sectionHeaderTextColor: '#6ab3f3',
      subtitleTextColor: '#708499',
      textColor: '#f5f5f5',
    },
    initData: parseInitData(initDataRaw),
    initDataRaw,
    version: '7.2',
    platform: 'tdesktop',
  });
}

const AssignmentPage: React.FC<IAssignmentPageProps> = (props) => {
  const { className = '' } = props;
  const [userId, setUserId] = useState<number | null>(null);
  const tg = window.Telegram?.WebApp;

  useEffect(() => {
    if (tg) {
      try {
        if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
          setUserId(tg.initDataUnsafe.user.id || null);
        } else {
          console.error('Telegram WebApp SDK not initialized correctly');
        }

        if (tg.BackButton) {
          const BackButton = tg.BackButton;

          BackButton.show();
          BackButton.onClick(() => {
            window.location.href = '/';
          });

          return () => {
            BackButton.offClick();
          };
        }
      } catch (error) {
        console.error('Error initializing Telegram WebApp SDK:', error);
      }
    } else {
      console.error('Telegram WebApp SDK not found');
    }
  }, [tg]);

  return (
    <ErrorBoundary>
      <Box className={cn(classes.wrapper, {}, [className])}>
        <AssignmentPageTop user_id={userId ?? 0} />
        <AssignmentPageBottom />
      </Box>
    </ErrorBoundary>
  );
};

export default AssignmentPage;
