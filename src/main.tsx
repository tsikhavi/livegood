import { useEffect, useState } from 'react';
import { Box, ThemeProvider } from '@mui/material';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import theme from '@/app/themes';
import App from './app/App';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

declare global {
  interface Window {
    Telegram: any;
  }
}

const MainApp = () => {
  const [userLevel, setUserLevel] = useState<number | null>(null); // store user level here

  useEffect(() => {
    const BackButton = window.Telegram.WebApp.BackButton;

    // Fetch user levels from API and set state
    const fetchUserLevel = async () => {
      try {
        const response = await fetch('/api/v1/levels/');
        const levels = await response.json();
        
        // Replace this with the actual logic to get the user's level
        const currentUserId = 1; // Replace with the actual user ID
        const userLevel = levels.find((level: any) => level.id === currentUserId);
        
        setUserLevel(userLevel?.id ?? null);
      } catch (error) {
        console.error('Error fetching user levels:', error);
      }
    };

    fetchUserLevel();

    BackButton.onClick(() => {
      BackButton.hide();
    });

    return () => {
      BackButton.offClick();
    };
  }, []);

  // Replace 5 with the actual required level for clicking
  const isAllowedToClick = userLevel !== null && userLevel >= 5;

  return (
    <ThemeProvider theme={theme}>
      <Box className='wrapper'>
        <TonConnectUIProvider manifestUrl="https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json">
          <App isAllowedToClick={isAllowedToClick} />
        </TonConnectUIProvider>
      </Box>
    </ThemeProvider>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MainApp />
  </StrictMode>,
);
