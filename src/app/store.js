import {configureStore} from '@reduxjs/toolkit'
import todoReducer from '../features/todo/todoSlice'
import { saveToLocalStorage } from '../features/todo/todoSlice';
export const store = configureStore({
    reducer:todoReducer
})
store.subscribe(() => {
    const state = store.getState();
    saveToLocalStorage(state.todos); // Pass only the todos array to saveToLocalStorage
});