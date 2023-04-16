import {
  Box,
  Button,
  Container,
  Modal,
  SxProps,
  Theme,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'
import { IStyles, ITodo, TodoStates } from '@/types'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import dynamic from 'next/dynamic'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store'
import { changeTodoState } from '@/features/todoSlice'
import { getAuth, signOut } from 'firebase/auth'
import ModalForm from './ModalForm'

const todoTypes: TodoStates[] = ['new', 'onprogress', 'done']

const DraggableList = dynamic(() => import('./DraggableList'), { ssr: false })

type Props = {}

function TodoContent({}: Props) {
  const [winReady, setWinReady] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const [addModalOpen, setAddModalOpen] = useState(false)
  const toggleModal = () => setAddModalOpen(!addModalOpen)

  const signout = async () => {
    const auth = await getAuth()
    await signOut(auth)
  }

  useEffect(() => {
    setWinReady(true)
  }, [])

  const onDragEnd = ({ destination, source, draggableId }: DropResult) => {
    if (!destination) return
    const { index: sourceIndex, droppableId: sourceId } = source

    const { index: destIndex, droppableId: destinationId } = destination

    dispatch(
      changeTodoState({
        sourceId: sourceId,
        sourceIndex: sourceIndex,
        destinationId: destinationId,
        destIndex: destIndex,
      }),
    )
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: 1,
          justifyContent: 'center',
          alignItems: 'flex-end',
          paddingX: 5,
        }}
      >
        <Button onClick={toggleModal} sx={{ alignSelf: 'flex-start', marginLeft: 5, marginTop: 5 }}>
          New Task
        </Button>
        <Modal
          open={addModalOpen}
          onClose={toggleModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{
              position: 'absolute' as 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
          }}>
            <ModalForm callback={toggleModal}/>
          </Box>
        </Modal>
      </Box>
      <Box sx={styles.container}>
        <DragDropContext onDragEnd={onDragEnd}>
          {winReady
            ? todoTypes.map((value, index) => (
                <Paper key={index} sx={styles.flexPaper}>
                  <DraggableList todoType={value} onDragEnd={onDragEnd} />
                </Paper>
              ))
            : null}
        </DragDropContext>
      </Box>
    </>
  )
}

export default TodoContent

const styles: IStyles = {
  container: (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    paddingX: 5,
    width: 1,
  }),
  flexPaper: () => ({
    flex: 1 / 3,
    margin: 5,
    alignSelf: 'center',
    backgroundColor: '#fff',
  }),
}
