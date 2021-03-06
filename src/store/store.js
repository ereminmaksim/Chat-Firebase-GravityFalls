import {configureStore} from '@reduxjs/toolkit';
import userReducer from "../features/loginSlice";
import chatReducer from "../features/chatSlice";
import soundReducer from "../features/chatSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        chat: chatReducer,
        sound: soundReducer

    },
});
