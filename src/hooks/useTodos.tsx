import { useEffect, useState, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from './../pages/app/store';
import { ITodo, TodoStates } from "@/types";


export function useTodos(todoState: TodoStates) {
    const screenState = useSelector((state: RootState) => state.todos);

    var items: ITodo[] = [] 
    switch (todoState) {
        case 'new':
            items = screenState.newTodos;
            break;
        case 'onprogress':
            items = screenState.onProgressTodos;
            break;
        case 'done':
            items = screenState.doneTodos;
            break;
        default:
            break;
    }

    return { items }

}