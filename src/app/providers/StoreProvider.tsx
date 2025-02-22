import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import blogApi from "@shared/lib/api";

const store = configureStore({
  reducer: {
    // Reducers
    [blogApi.reducerPath]: blogApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(blogApi.middleware),
});

interface StoreProviderProps {
  children: React.ReactNode;
}

const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
