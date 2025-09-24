import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Provider } from "react-redux";
import { persistor, store } from './app/store.ts';
import { PersistGate } from 'redux-persist/integration/react';
import InternetConnectionProvider from './provider/InternetConnectionProvider.tsx';


const queryClient = new QueryClient();


createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <InternetConnectionProvider>
        <PersistGate loading={null} persistor={persistor}>
          <ChakraProvider value={defaultSystem}>
            <App />
          </ChakraProvider>
        </PersistGate>
      </InternetConnectionProvider>
    </Provider>
  </QueryClientProvider>
)
