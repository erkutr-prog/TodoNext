import React from 'react'
import {
  AppBar,
  IconButton,
  Toolbar,
  SxProps,
  Theme,
  Box,
  Button,
  Menu,
  MenuItem,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import LogoutIcon from '@mui/icons-material/Logout';
import { getAuth, signOut } from 'firebase/auth'

interface IStyles {
  [key: string]: SxProps<Theme>
}

const pages = [{ text: 'Home', href: '/home' }]

type Props = {}

function CustomAppBar({}: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClose = () => {
    setAnchorEl(null)
  }

  const logout = async() => {
    const auth = getAuth()
    await signOut(auth)
  }

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  return (
    <AppBar position="fixed">
      <Toolbar sx={styles.toolbar} variant="regular">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon sx={{ color: 'blue', fontSize: 35 }} />
        </IconButton>
        <div style={{ marginLeft: 'auto' }}>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="profile"
            aria-controls="menu-appbar"
            onClick={handleMenu}
            aria-haspopup="true"
          >
            <AccountBoxIcon sx={{ color: 'blue', fontSize: 35 }} />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={logout}>
              <LogoutIcon/>
              Logout
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default CustomAppBar

const styles: IStyles = {
  toolbar: () => ({
    backgroundColor: 'beige',
    height: 70,
    width: 1,
  }),
}
