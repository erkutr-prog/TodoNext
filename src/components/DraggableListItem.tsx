import { ITodo } from '@/types'
import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import InboxIcon from '@mui/icons-material/Inbox'

type Props = {
    item: ITodo,
    index: number
}

export default function DraggableListItem({item, index}: Props) {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
        {(provided, snapshot) => (
            <ListItem
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
            >
                <ListItemAvatar>
                    <Avatar>
                        <InboxIcon/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.header} secondary={item.description}/>
            </ListItem>
        )}
    </Draggable>
  )
}