import { Box, Container, SxProps, Theme, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { ITodo, TodoStates } from "@/types";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import dynamic from "next/dynamic";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/pages/app/store";
import { changeTodoState } from "@/features/todoSlice";

const todoTypes: TodoStates[] = ["new", "onprogress", "done"];

interface IStyles {
  [key: string]: SxProps<Theme>;
}
const DraggableList = dynamic(() => import("./DraggableList"), { ssr: false });

type Props = {};

function TodoContent({}: Props) {
  const [winReady, setWinReady] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

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
    justifyContent: "space-evenly",
    alignSelf: "center",
    alignItems: "center",
    width: "100vw",
    paddingX: 30,
  }),
  flexPaper: () => ({
    flex: 1,
    margin: 5,
    alignSelf: "center",
    backgroundColor: "#FAF7F0",
  }),
};
