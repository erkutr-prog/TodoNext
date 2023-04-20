import { addTodo } from '@/features/todoSlice'
import { AddTodoAction, ITodo } from '@/types'
import { addTodoServer } from '@/utils/Storage'
import { CssVarsProvider, FormControl, Sheet, Typography, FormLabel, Input, Button } from '@mui/joy'
import { Box } from '@mui/material'
import { getAuth } from 'firebase/auth'
import React, { useEffect, useReducer, useState } from 'react'

type Props = {
    callback: Function
}

const initialTodoState: ITodo = {
    docId: '',
    id: '',
    header: '',
    description: '',
    state: 'new'
}

function todoReducer(state: ITodo, action: AddTodoAction) {
    switch(action.type) {
        case 'setHeader':
            state.header = action.payload
            return {...state}
        case 'setDescription':
            state.description = action.payload
            return  {...state}
        case 'setId':
            state.id = action.payload
            return {...state}
        default:
            return {...state}
    }
}

export default function ModalForm({callback}: Props) {
    const [state, dispatch] = useReducer(todoReducer, initialTodoState);

    useEffect(() => {
        setTodoId()
    }, [])

    const setTodoId = () => {
        const user = getAuth().currentUser
        if (user?.uid === undefined) {
            console.log("Error with firebase")
            return
        }
        dispatch({type: 'setId', payload: user?.uid})
    }

    const addNewTodo = async() => {
        setTodoId()
        const serverResponse = await addTodoServer(state);
        addTodo(state)
        callback(serverResponse)
    }
  return (
    <Box>
        <CssVarsProvider>
        <Sheet 
            sx={{
                width: '300px',
                mx: "auto", // margin left & right
                my: 4, // margin top & bottom
                py: 3, // padding top & bottom
                px: 2, // padding left & right
                display: "flex",
                flexDirection: "column",
                gap: 2,
                borderRadius: "sm",
                boxShadow: "md",
                alignSelf: "center",
            }}
        >
          <div>
            <Typography level="h4" component={"h1"}>
              <b>New Task</b>
            </Typography>
            <FormControl>
              <FormLabel>Header</FormLabel>
              <Input
                name="Header"
                value={state.header}
                type="text"
                placeholder="Header of Task"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: "setHeader",
                    payload: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                sx={{
                    alignItems: 'flex-start',
                    minHeight: '100px',
                    minInlineSize: '100px',
                    textAlign: 'match-parent'
                }}
                
                name="Password"
                fullWidth={true}
                value={state.description}
                placeholder="Detailed Information about task."
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: "setDescription",
                    payload: e.target.value,
                  })
                }
              />
            </FormControl>
          </div>
          <Button onClick={addNewTodo}>
            Add
          </Button>
        </Sheet>
        </CssVarsProvider>
    </Box>
  )
}