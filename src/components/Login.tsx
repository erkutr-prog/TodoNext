import React, { useReducer, useState } from 'react'
import { CssVarsProvider } from '@mui/joy/styles'
import {
  Sheet,
  Typography,
  Input,
  FormControl,
  FormLabel,
  Button,
} from '@mui/joy'
import { CredentialAction, IStyles, LoginCredentialState } from '@/types'
import { Box, Modal } from '@mui/material'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import Spinner from './Spinner'
import Link from '@mui/material/Link'
import RegisterModal from './RegisterModal'

type Props = {
  loginCb: Function
}

const initialCredentials: LoginCredentialState = {
  mail: '',
  password: '',
}

function loginReducer(state: LoginCredentialState, action: CredentialAction) {
  switch (action.type) {
    case 'setMail':
      state.mail = action.payload
      return { ...state }
    case 'setPassword':
      state.password = action.payload
      return { ...state }
    default:
      return { ...state }
  }
}

export default function Login({ loginCb }: Props) {
  const [spinnerVisible, setSpinnerVisible] = useState(false)
  const [error, setError] = useState(false)
  const [registerModal, setRegisterModal] = useState(false)
  const [credentials, dispatch] = useReducer(loginReducer, initialCredentials)

  const login = async () => {
    setSpinnerVisible(true)
    const auth = getAuth()
    await signInWithEmailAndPassword(
      auth,
      credentials.mail,
      credentials.password,
    )
      .then((user) => {
        loginCb()
      })
      .catch((error) => {
        setError(true)
      })
      .finally(() => {
        setSpinnerVisible(false)
      })
  }

  return (
    <Box sx={styles.container}>
      <Modal
        open={registerModal}
        onClose={() => setRegisterModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <RegisterModal toggleModal={setRegisterModal}/>
        </Box>
      </Modal>
      <CssVarsProvider>
        <Sheet
          sx={{
            width: 300,
            mx: 'auto', // margin left & right
            my: 4, // margin top & bottom
            py: 3, // padding top & bottom
            px: 2, // padding left & right
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            borderRadius: 'sm',
            boxShadow: 'md',
            alignSelf: 'center',
          }}
          variant="outlined"
        >
          <div>
            <Typography level="h4" component={'h1'}>
              <b>Welcome</b>
            </Typography>
            <Typography level="body2">Sign In</Typography>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                name="E-mail"
                value={credentials.mail}
                type="email"
                placeholder="example@domain.com"
                autoComplete="email"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: 'setMail',
                    payload: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                name="Password"
                value={credentials.password}
                type="password"
                placeholder="Password"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: 'setPassword',
                    payload: e.target.value,
                  })
                }
              />
            </FormControl>
          </div>
          {spinnerVisible ? (
            <Spinner
              style={{
                display: 'grid',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100px',
              }}
            />
          ) : (
            <Button onClick={login}>Log in</Button>
          )}
          <Typography level="body2">
            Don't have an account?{' '}
            <Link
              component={'button'}
              variant="body2"
              onClick={() => setRegisterModal(true)}
            >
              Register
            </Link>
          </Typography>
          {error ? (
            <Typography level="body2" sx={{ color: 'red' }}>
              Wrong email or password.
            </Typography>
          ) : null}
        </Sheet>
      </CssVarsProvider>
    </Box>
  )
}

const styles: IStyles = {
  container: () => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundImage:
      'linear-gradient( 58.2deg,  rgba(40,91,212,0.73) -3%, rgba(171,53,163,0.45) 49.3%, rgba(255,204,112,0.37) 97.7% )',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundSize: 'cover',
  }),
}
