import React from "react";
import {AppBar, IconButton, Toolbar,  SxProps, Theme, Box, Button } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Link from "next/link";

interface IStyles {
  [key: string]: SxProps<Theme>;
}

const pages = [
  {text: 'Home', href: '/home'}
]

type Props = {};

function CustomAppBar({}: Props) {
  return (
    <AppBar position='fixed'>
      <Toolbar sx={styles.toolbar} variant='regular'>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon sx={{ color: "blue", fontSize: 35 }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default CustomAppBar

const styles: IStyles = {
  toolbar: () => ({
    backgroundColor: 'beige',
    height: 70
  })
}