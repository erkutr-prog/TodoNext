import { ITodo, StateChangePayload } from "@/types"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"


export type TodoState = {
    todos: ITodo[]
}

const initialState: TodoState = {
    todos: [
        {
            id: '0',
            header: 'Todo 1',
            description: 'Some things 1',
            state: 'new'
        },
        {
            id: '1',
            header: 'Todo 2',
            description: 'Some things 1',
            state: 'onprogress'
        },
        {
            id: '2',
            header: 'Todo 3',
            description: 'Some things 1',
            state: 'done'
        },
        {
            id: '3',
            header: 'Todo 4',
            description: 'Some things 1',
            state: 'done'
        },
    ]
}

const todoSlice = createSlice({
    name: 'TodoSlice',
    initialState: initialState,
    reducers: {
        addTodo(state, action: PayloadAction<ITodo>) {
            state.todos.push(action.payload);
        },
        deleteTodo(state, action: PayloadAction<ITodo>) {
            state.todos.forEach((value, index) => {
                if (value.id == action.payload.id) delete state.todos[index]
            })
        },
        changeTodoState(state, action: PayloadAction<StateChangePayload>) {
            state.todos.forEach((value, index) => {
                if (value.id == action.payload.id) {
                    state.todos[index].state = action.payload.state
                }
            })
        }
    }, 
    extraReducers: {}
})

export const {
    addTodo,
    deleteTodo,
    changeTodoState
} = todoSlice.actions

export default todoSlice.reducer