import { ITodo, TodoStates } from '@/types';
import React from 'react'
import {
    DragDropContext,
    Droppable,
    OnDragEndResponder
  } from 'react-beautiful-dnd';
import DraggableListItem from './DraggableListItem';
import { useTodos } from '@/hooks/useTodos';
import { Box, SxProps, Theme, Typography } from '@mui/material';

interface IStyles {
    [key: string]: SxProps<Theme>;
}

export type DraggableListProps = {
    todoType: TodoStates,
    onDragEnd: OnDragEndResponder
}

const DraggableList = (({onDragEnd, todoType}: DraggableListProps) => {
    const { items } = useTodos(todoType)
    return (
        <Box sx={styles.container}>
            <Typography
            >{todoType}</Typography>
                <Droppable droppableId={todoType}>
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            {items.map((item, index) => (
                              <DraggableListItem item={item} index={index} key={item.id} />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
        </Box>
    )
})

const styles: IStyles = {
    container: () => ({
        minHeight: '300px',
        borderRadius: 12,
        margin: 5
    })
}

//DraggableList.displayName = 'DraggableList'
export default DraggableList