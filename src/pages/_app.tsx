import type { AppProps } from "next/app";
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from "@tanstack/react-query";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { getDirection } from "@utils/getDirection";
import { persistor, store } from "@store/index";
import { Provider } from "react-redux";
import { appWithTranslation } from "next-i18next";
import ManagedModal from "@features/modal/Managemodal";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PersistGate } from "redux-persist/integration/react";

import { DefaultSeo } from "@features/seo/default-seo";

// Global css imported file
import "@styles/globals.css";
import "@styles/scrollbar.css";
import "@styles/swiper-carousel.css";

import RCDrawer from "@libs/Drawer";
import { SessionProvider } from "next-auth/react";
import FilterDrawer from "@libs/FilterDrawer";
import CartTopBar from "@features/cart/CartTopbar";
import OrderDrawer from "@libs/OrderDrawer";

interface Props {
  children: React.ReactNode;
}

const Noop: React.FC<Props> = ({ children }) => <>{children}</>;

export const queryClient = new QueryClient();

const LSAPP = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const dir = getDirection(router.locale);

  useEffect(() => {
    document.documentElement.dir = dir;
  }, [dir]);

  const Layout = (Component as any).Layout || Noop;

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <SessionProvider session={pageProps.session}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Layout pageProps={pageProps}>
                <DefaultSeo />
                <Component {...pageProps} />
              </Layout>
              <CartTopBar />
              <RCDrawer direction={dir} />
              <FilterDrawer direction={dir} />
              <OrderDrawer direction={dir} />
              <ManagedModal />
            </PersistGate>
          </Provider>
        </SessionProvider>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default appWithTranslation(LSAPP);
