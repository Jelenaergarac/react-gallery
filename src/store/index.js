import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import sagas from './sagas'
import userReducer from './user/userSlice'
import galleryReducer from './gallery/gallerySlice'

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer:{
        auth: userReducer,
        galleries: galleryReducer
    },
     middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck: false}).concat(sagaMiddleware),
});
for(const saga in sagas){
    sagaMiddleware.run(sagas[saga])
}
export default store;