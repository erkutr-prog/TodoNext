import { ITodo, TodoStates } from "@/types";
import { Avatar, Box, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import AssignmentIcon from "@mui/icons-material/Assignment";
import NotStartedIcon from '@mui/icons-material/NotStarted';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import InboxIcon from '@mui/icons-material/Inbox'
import { colors } from "@/assets/colors";
import { useTodoState } from "@/hooks/useTodoState";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/pages/app/store";


type Props = {
  item: ITodo;
  index: number;
};

export default function DraggableListItem({ item, index }: Props) {
  const {itemState} = useTodoState(item.state, item.id);

  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
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
            </ListItem>
        </Box>
      )}
    </Draggable>
  );
}
