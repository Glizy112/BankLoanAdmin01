import { Fragment, useEffect, useState } from 'react';
import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createEmotionCache } from '../utils/create-emotion-cache';
import { registerChartJs } from '../utils/register-chart-js';
import { theme } from '../theme';
import { useRouter } from 'next/router';
import Login from './login';

registerChartJs();

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {

  const router = useRouter();

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  const [auth, setAuth] = useState(false)

  useEffect(() => {
    checkIfAuth();
  },[])

  const checkIfAuth = async() => {
    const auth = await localStorage.getItem('auth');
    if(auth)
      setAuth(true);
    else
    router
    .push('/')
    .catch(console.error);
  }

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>
          Vast Credit Services
        </title>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {
            auth ? getLayout(<Component {...pageProps} />) : <Login />
          }
        </ThemeProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
};

export default App;
