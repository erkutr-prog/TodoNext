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
  onDragEnd: OnDragEndResponder,
  refresh: Boolean
}

const ListHeaders = {
  'new': 'New Tasks',
  'onprogress': 'On Progress',
  'done': 'Done Tasks'
}

const DraggableList = ({ onDragEnd, todoType, refresh }: DraggableListProps) => {
  const { data, loading } = useTodos(todoType, refresh)
  return (
    <Box sx={styles.container}>
      <Typography fontSize={20} fontWeight={'bold'}>{ListHeaders[`${todoType}`]}</Typography>
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
                  <DraggableListItem item={item} index={index} key={item.docId} />
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
