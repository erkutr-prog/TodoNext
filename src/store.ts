import { combineReducers, configureStore } from "@reduxjs/toolkit";
import todoSlice from "@/features/todoSlice";

const rootReducer = combineReducers({
    todos: todoSlice
})

export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch

const store = configureStore({
    reducer: rootReducer
})

export default store;