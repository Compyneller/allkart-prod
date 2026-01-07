import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import storeReducer from "./slices/storeSlice";
import sellerSteps from "./slices/sellerStepsSlice";
import dialogReducer from "./slices/dialogSlice";
import productReducer from "./slices/productSlice";
import imageReducer from "./slices/imagesSlice";
import productDetailReducer from "./slices/productDetailSlice";
import variantReducer from "./slices/variantSlice";
import storeCreationReducer from './slices/storeCreationSlice'

const rootReducer = combineReducers({
  store: storeReducer,
  steps: sellerSteps,
  dialog: dialogReducer,
  product: productReducer,
  image: imageReducer,
  productDetail: productDetailReducer,
  variant: variantReducer,
  storeCreation: storeCreationReducer,
});

const persistConfig = {
  key: "root",
  storage, // Use the custom storage
  whitelist: ["store", "product", "image", "productDetail"], // Persist only the auth slice
  blacklist: ["storeCreation"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
