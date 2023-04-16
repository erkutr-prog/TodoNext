import { IStyles, ITodo, TodoStates } from '@/types'
import React from 'react'
import {
  Droppable,
  OnDragEndResponder,
} from 'react-beautiful-dnd'
import DraggableListItem from './DraggableListItem'
import { useTodos } from '@/hooks/useTodos'
import { Box, SxProps, Theme, Typography } from '@mui/material'
import Spinner from './Spinner'

export type DraggableListProps = {
  todoType: TodoStates
  onDragEnd: OnDragEndResponder
}

const DraggableList = ({ onDragEnd, todoType }: DraggableListProps) => {
  const { data, loading } = useTodos(todoType)
  return (
    <Box sx={styles.container}>
      <Typography>{todoType}</Typography>
      <Droppable droppableId={todoType}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {loading ? (
              <Spinner
                style={{
                  display: 'grid',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '300px',
                }}
              />
            ) : (
              <>
                {data?.map((item, index) => (
                  <DraggableListItem item={item} index={index} key={item.id} />
                ))}
              </>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Box>
  )
}

const styles: IStyles = {
  container: () => ({
    minHeight: '300px',
    borderRadius: 12,
    margin: 5,
    minWidth: '15vw',
  }),
}

//DraggableList.displayName = 'DraggableList'
export default DraggableList
