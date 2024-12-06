"use client";

import { store, persistor } from "@/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "sonner";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          storageKey="e-commerce-theme"
        >
          <Toaster />

          {children}
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default Providers;
