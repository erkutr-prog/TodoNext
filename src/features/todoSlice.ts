import { DeleteTodoPayload, ITodo, SetTodoPayload, StateChangePayload } from "@/types"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export type TodoState = {
    newTodos: ITodo[],
    onProgressTodos: ITodo[],
    doneTodos: ITodo[]
}

const initialState: TodoState = {
    newTodos: [
        {
            id: '0',
            header: 'Todo 1',
            description: 'Some things 1',
            state: 'new'
        },
    ],
    onProgressTodos: [
        {
            id: '1',
            header: 'Todo 2',
            description: 'Some things 2',
            state: 'onprogress'
        },
    ],
    doneTodos: [
        {
            id: '2',
            header: 'Todo 3',
            description: 'Some things 3',
            state: 'done'
        },
        {
            id: '3',
            header: 'Todo 4',
            description: 'Some things 4',
            state: 'done'
        },
    ]
}

const todoSlice = createSlice({
    name: 'TodoSlice',
    initialState: initialState,
    reducers: {
        addTodo(state, action: PayloadAction<ITodo>) {
            state.newTodos.push(action.payload);
        },
        changeTodoState(state, action: PayloadAction<StateChangePayload>) {
            var draggedItem: ITodo[] = [];
            switch (action.payload.sourceId) {
                case 'new':
                    draggedItem = state.newTodos.splice(action.payload.sourceIndex, 1)
                    break;
                case 'onprogress':
                    draggedItem = state.onProgressTodos.splice(action.payload.sourceIndex, 1)
                    break;
                case 'done':
                    draggedItem = state.doneTodos.splice(action.payload.sourceIndex, 1)
                    break;
                default:
                    break;
            }
            draggedItem[0].state = action.payload.destinationId;
            switch (action.payload.destinationId) {
                case 'new':
                    state.newTodos.splice(action.payload.destIndex, 0, draggedItem[0]);
                    break;
                case 'onprogress':
                    state.onProgressTodos.splice(action.payload.destIndex, 0, draggedItem[0])
                    break;
                case 'done':
                    state.doneTodos.splice(action.payload.destIndex, 0, draggedItem[0])
                    break;
                default:
                    break;
            }
        },
        setTodos(state, action: PayloadAction<SetTodoPayload>) {
            switch(action.payload.state) {
                case 'new':
                    state.newTodos = action.payload.todo
                    break
                case 'onprogress':
                    state.onProgressTodos = action.payload.todo;
                    break
                case 'done':
                    state.doneTodos = action.payload.todo;
                    break
                default:
                    break
            }
        }
    }, 
    extraReducers: {}
})

export const {
    addTodo,
    changeTodoState,
    setTodos
} = todoSlice.actions

export default todoSlice.reducer