import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ConfigProvider } from 'antd';

import { Config } from '@styles/theme.ts';

import '@styles/index.css';

import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId =
  '23189663829-jbftuq5rc78ct17qkjd48f97lcmd28h0.apps.googleusercontent.com';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider theme={Config.ThemeColorsV2}>
      <GoogleOAuthProvider clientId={clientId}>
        <App />
      </GoogleOAuthProvider>
    </ConfigProvider>
  </React.StrictMode>,
);
