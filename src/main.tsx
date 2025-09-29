import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider as ChakraProvider } from "./components/ui/provider"
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Provider } from "react-redux";
import { persistor, store } from './app/store.ts';
import { PersistGate } from 'redux-persist/integration/react';
import InternetConnectionProvider from './provider/InternetConnectionProvider.tsx';
import { ThemeProvider } from 'next-themes';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <InternetConnectionProvider>
        <PersistGate loading={null} persistor={persistor}>
          <ChakraProvider>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem storageKey="ui-theme">
              <App />
            </ThemeProvider>
          </ChakraProvider>
        </PersistGate>
      </InternetConnectionProvider>
    </Provider>
  </QueryClientProvider>
)
