import { CredentialAction, RegisterCredentialState } from '@/types'
import { CssVarsProvider, FormControl, Sheet, Typography, FormLabel, Input, Button } from '@mui/joy'
import { Box } from '@mui/material'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import React, { useReducer, useState } from 'react'

type Props = {
    toggleModal: Function
}

const initialRegisterCredentials: RegisterCredentialState = {
    name: '',
    mail: '',
    password: ''
}

function registerReducer(state: RegisterCredentialState, action: CredentialAction) {
    switch (action.type) {
      case 'setRegisterName':
        state.name = action.payload
        return { ...state }
      case 'setRegisterMail':
        state.mail = action.payload
        return { ...state }
      case 'setRegisterPassword':
        state.password = action.payload
        return { ...state }
      default:
        return { ...state }
    }
  }
  

export default function RegisterModal({toggleModal}: Props) {
    const [registerError, setRegisterError] = useState(false);
    const [registerCredentials, dispatch] = useReducer(registerReducer, initialRegisterCredentials);

    const register = async() => {
        const auth = getAuth()
        const response = await createUserWithEmailAndPassword(auth, registerCredentials.mail, registerCredentials.password)
          .then(() => {
            toggleModal(false)
          })
          .catch((error) => {
            setRegisterError(true)
          })
      }    

    return (
        <Box>
          <CssVarsProvider>
            <Sheet
              sx={{
                width: '300px',
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
            >
              <div>
                <Typography level="h4" component={'h1'}>
                  <b>Sign Up</b>
                </Typography>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    name="Name"
                    value={registerCredentials.name}
                    type="text"
                    placeholder="Name"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: 'setRegisterName',
                        payload: e.target.value,
                      })
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Mail Address</FormLabel>
                  <Input
                    name="Mail Address"
                    value={registerCredentials.mail}
                    placeholder="example@domain.com"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: 'setRegisterMail',
                        payload: e.target.value,
                      })
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input
                    name="Password"
                    value={registerCredentials.password}
                    placeholder="Password"
                    type='password'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: 'setRegisterPassword',
                        payload: e.target.value,
                      })
                    }
                  />
                </FormControl>
              </div>
              <Button onClick={() => register()}>Register</Button>
              {
                registerError ?
                <Typography sx={{color: 'red'}} level='body2'>
                  Please check your information.
                </Typography>
                :
                null
              }
            </Sheet>
          </CssVarsProvider>
        </Box>
      )
}