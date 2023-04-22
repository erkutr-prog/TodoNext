import { SxProps, Theme } from "@mui/material"
import { OnDragEndResponder } from "react-beautiful-dnd"

export interface ITodo {
    id: string,
    docId: string,
    header: string,
    description: string,
    state: TodoStates | string
}

export type DraggableListProps = {
    items: ITodo[],
    onDragEnd: OnDragEndResponder
}

export type TodoStates = 'new' | 'onprogress' | 'done'

export type SetTodoPayload = {
    state: TodoStates,
    todo: ITodo[]
}

export type StateChangePayload = {
    sourceId: TodoStates | string,
    sourceIndex: number,
    destinationId: TodoStates | string,
    destIndex: number,
}

export type DeleteTodoPayload = {
    index: number,
    todoType: TodoStates | string,
    docId: string
}

export interface CredentialAction {
    type: 'setMail' | 'setPassword',
    payload: string
}

export interface CredentialState {
    mail: string,
    password: string
}

export interface IStyles {
    [key: string]: SxProps<Theme>;
}

export interface AddTodoAction {
    type: 'setHeader' | 'setDescription' | 'setId',
    payload: string
}

export type TodoFieldNames  = 'docId' | 'id' | 'description' | 'header' | 'state'