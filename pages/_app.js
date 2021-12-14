import { DAppProvider } from "@usedapp/core";
import {Main} from "next/document";

import { MainLayout } from '../layout/';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <DAppProvider config={{}}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </DAppProvider>
  );
};

export default MyApp;
