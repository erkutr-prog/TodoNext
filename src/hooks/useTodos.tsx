import { useEffect, useState, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from './../pages/app/store';
import { ITodo, TodoStates } from "@/types";


export function useTodos(todoState: TodoStates) {
    const screenState = useSelector((state: RootState) => state.todos);
    const [items, setItems] = useState<ITodo[]>([])

    useEffect(() => {
        let todoList: ITodo[] = []
        screenState.todos.filter((value, index) => {
            if (value.state == todoState) {
                todoList.push(value)
            }
        })
        setItems(todoList)
    }, [todoState, screenState.todos])

    return { items }

}