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
    sourceId: TodoStates | string,
    sourceIndex: number,
    destinationId: TodoStates | string,
    destIndex: number,
}

export type DeleteTodoPayload = {
    index: number,
    todoType: TodoStates | string
}