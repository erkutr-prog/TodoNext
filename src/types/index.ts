import { OnDragEndResponder } from "react-beautiful-dnd"

export interface ITodo {
    id: string,
    header: string,
    description: string,
    state: TodoStates | string
}

export type DraggableListProps = {
    items: ITodo[],
    onDragEnd: OnDragEndResponder
}

export type TodoStates = 'new' | 'onprogress' | 'done'

export type StateChangePayload = {
    id: string,
    state: TodoStates | string
}