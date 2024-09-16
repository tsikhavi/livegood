// src/app/App.tsx
import React from 'react';
import { Box } from '@mui/material';
import { AppRouter } from '@/app/providers/Router/AppRouter';

interface AppProps {
  isAllowedToClick: boolean;
}

const App: React.FC<AppProps> = ({ isAllowedToClick }) => {
  return (
    <Box className='page-content'>
      <AppRouter isAllowedToClick={isAllowedToClick} />
    </Box>
  );
};

export default App;
