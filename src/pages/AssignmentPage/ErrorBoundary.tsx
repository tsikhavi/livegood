import React, { useState } from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  // Error boundary hook to catch errors
  const handleError = (error: Error) => {
    console.error('Caught an error:', error);
    setHasError(true);
  };

  // Try-catch block for error handling
  const ErrorBoundaryComponent: React.FC = () => {
    if (hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return <>{children}</>;
  };

  return <ErrorBoundaryComponent />;
};

export default ErrorBoundary;
