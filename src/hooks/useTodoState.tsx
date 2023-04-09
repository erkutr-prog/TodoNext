import { useEffect, useState, } from "react";
import { useSelector } from "react-redux";
import { RootState } from './../pages/app/store';
import { ITodo, TodoStates } from "@/types";


export function useTodoState(todoType: TodoStates | string, todoId: string) {
    const screenState = useSelector((state: RootState) => state.todos);
    const [itemState, setItemState] = useState<TodoStates | string>()

    useEffect(() => {
        let item: ITodo | undefined;
        switch( todoType ) {
            case 'new':
                item = screenState.newTodos.find((value) => value.id == todoId);
                break;
            case 'onprogress':
                item = screenState.onProgressTodos.find((value) => value.id == todoId);
                break;
            case 'done':
                item = screenState.doneTodos.find((value) => value.id == todoId);
                break;
            default:
                break;
        }
        setItemState(item !== undefined ? item.state : 'new')
    }, [screenState])

    return { itemState }
}