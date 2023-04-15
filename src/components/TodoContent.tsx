import { Box, Container, SxProps, Theme, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { IStyles, ITodo, TodoStates } from "@/types";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import dynamic from "next/dynamic";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { changeTodoState } from "@/features/todoSlice";
import { getAuth, signOut } from "firebase/auth";

const todoTypes: TodoStates[] = ["new", "onprogress", "done"];

const DraggableList = dynamic(() => import("./DraggableList"), { ssr: false });

type Props = {};

function TodoContent({}: Props) {
  const [winReady, setWinReady] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const signout = async() => {
    const auth = await getAuth()
    await signOut(auth)
  }

  useEffect(() => {
    setWinReady(true);
  }, []);

  const onDragEnd = ({ destination, source, draggableId }: DropResult) => {
    if (!destination) return;
    const { index: sourceIndex, droppableId: sourceId } = source;

    const { index: destIndex, droppableId: destinationId } = destination;

    dispatch(
      changeTodoState({
        sourceId: sourceId,
        sourceIndex: sourceIndex,
        destinationId: destinationId,
        destIndex: destIndex,
      })
    );
  };

  return (
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
  );
}

export default TodoContent;

const styles: IStyles = {
  container: (theme: Theme) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: 'center',
    alignSelf: "center",
    alignItems: "center",
    padding: 5,
    width: 1
  }),
  flexPaper: () => ({
    flex: 1 / 3,
    margin: 5,
    alignSelf: "center",
    backgroundColor: "#fff",
  }),
};
