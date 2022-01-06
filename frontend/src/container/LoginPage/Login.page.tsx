import React from 'react';
import useLog from '../../hooks/useLog';

const LoginPage = () => {
  useLog('LOGIN', 'Initialization', 'debug');

  return (
    <div>
      <h1>Its Login Screen</h1>
    </div>
  );
};

export default LoginPage;
