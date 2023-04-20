import { DeleteTodoPayload, ITodo, SetTodoPayload, StateChangePayload } from "@/types"
import { PayloadAction, createSlice, current } from "@reduxjs/toolkit"

export type TodoState = {
    newTodos: ITodo[],
    onProgressTodos: ITodo[],
    doneTodos: ITodo[]
}

const initialState: TodoState = {
    newTodos: [],
    onProgressTodos: [],
    doneTodos: []
}

const todoSlice = createSlice({
    name: 'TodoSlice',
    initialState: initialState,
    reducers: {
        addTodo(state, action: PayloadAction<ITodo>) {
            state.newTodos.push(action.payload);
        },
        changeTodoState(state, action: PayloadAction<StateChangePayload>) {
            var draggedItem: ITodo = {
                'description': '',
                'id': '',
                'docId': '',
                'state': '',
                'header': ''
            }
            const { sourceId, destinationId, destIndex, sourceIndex } = action.payload
            if (sourceId != destinationId) {
                switch(sourceId) {
                    case 'new':
                        draggedItem = current(state.newTodos[sourceIndex])
                        state.newTodos.splice(sourceIndex, 1);
                        break;
                    case 'onprogress':
                        draggedItem = current(state.onProgressTodos[sourceIndex])
                        state.onProgressTodos.splice(sourceIndex, 1);
                        break;
                    case 'done':
                        draggedItem = current(state.doneTodos[sourceIndex])
                        state.doneTodos.splice(sourceIndex, 1);
                        break;
                    default:
                        break;
                }
                const draggedItemClone = {...draggedItem}
                draggedItemClone['state'] = destinationId;
                switch(destinationId) {
                    case 'new':
                        state.newTodos.splice(destIndex, 0, draggedItemClone);
                        break;
                    case 'onprogress':
                        state.onProgressTodos.splice(destIndex, 0, draggedItemClone);
                        break;
                    case 'done':
                        state.doneTodos.splice(destIndex, 0, draggedItemClone);
                        break;
                    default:
                        break;
                }
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