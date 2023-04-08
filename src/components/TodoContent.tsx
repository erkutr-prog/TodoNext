import { Box, Container, SxProps, Theme, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import { ITodo, TodoStates } from '@/types';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import dynamic from 'next/dynamic';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/pages/app/store';
import { changeTodoState } from '@/features/todoSlice';

const todoTypes: TodoStates[] = [
    'new',
    'onprogress',
    'done'
]

interface IStyles {
    [key: string]: SxProps<Theme>;
}
const DraggableList = dynamic(() => import('./DraggableList'), {ssr: false});

const reorder = ({list, startIndex, endIndex}: {list: ITodo[], startIndex: number, endIndex: number}) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
}

type Props = {}

function TodoContent({}: Props) {
    const [winReady, setWinReady] = useState(false);
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        setWinReady(true)
    }, [])

    const onDragEnd = ({destination, source, draggableId}: DropResult) => {
        if (!destination) return

        if (destination.droppableId == source.droppableId) return
        else {
            dispatch(changeTodoState({id: draggableId, state: destination.droppableId}))
        }

    }

  return (
    <Box sx={styles.container}>
        <DragDropContext onDragEnd={onDragEnd}>
            { winReady ? 
                todoTypes.map((value, index) => (
                    <Paper key={index} sx={styles.flexPaper}>
                        <DraggableList todoType={value} onDragEnd={onDragEnd}/>
                    </Paper>
                ))
                : null
            }
        </DragDropContext>
    </Box>
  )
}

export default TodoContent

const styles: IStyles = {
    container: (theme: Theme) =>({
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignSelf: 'center',
        alignItems: 'center',
        width: '100vw',
        paddingX: 30,
    }),
    flexPaper: () => ({
        flex: 1,
        margin: 5,
        alignSelf: 'center',
        backgroundColor: 'beige'
    })
}