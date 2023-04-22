import { ITodo } from "@/types";
import { Avatar, Box, Button, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import AssignmentIcon from "@mui/icons-material/Assignment";
import NotStartedIcon from '@mui/icons-material/NotStarted';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import DeleteIcon from '@mui/icons-material/Delete';
import { colors } from "@/assets/colors";
import { useTodoState } from "@/hooks/useTodoState";
import { deleteTodo } from "@/features/todoSlice";
import { useDispatch } from 'react-redux';
import { AppDispatch } from "@/store";

type Props = {
  item: ITodo;
  index: number;
  deleteCb: Function
};

export default function DraggableListItem({ item, index, deleteCb }: Props) {
  const dispatch = useDispatch<AppDispatch>()
  const {itemState} = useTodoState(item.state, item.id);

  const deleteItem = () => {
    deleteCb(index, item.state, item.docId);
  }


  return (
    <Draggable key={item.docId} draggableId={item.docId} index={index}>
      {(provided, snapshot) => (
        <Box sx={{ backgroundColor: colors[itemState !== undefined ? itemState : 'new'], borderRadius: 4, borderWidth: 0.3, borderColor: '#000'}}>
            <ListItem
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              sx={{marginBottom: '15px'}}
            >
              <ListItemAvatar>
                <Avatar>
                  <AssignmentIcon sx={{ display: itemState == 'new' ? 'flex' : 'none'}} />
                  <NotStartedIcon sx={{ display: itemState == 'onprogress' ? 'flex': 'none'}}/>
                  <BeenhereIcon sx={{ display: itemState == 'done' ? 'flex' : 'none' }}/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                sx={{ width: 200, textOverflow: "ellipsis" ,wordWrap: 'break-word'}}
                primary={item.header}
                secondary={item.description}
              />
              <Button onClick={() => deleteItem()}>
                <DeleteIcon sx={{ display: 'flex', color: 'red'}}/>
              </Button>
            </ListItem>
        </Box>
      )}
    </Draggable>
  );
}
