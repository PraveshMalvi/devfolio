import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './features/todoSlice';
import userReducer from './features/userSlice';
import counterReducer from './features/counterSlice';

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    user: userReducer,
    counter: counterReducer,
  },
});
