import React, { useReducer } from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import { Sheet, Typography, Input, FormControl, FormLabel, Button } from "@mui/joy";
import { CredentialAction, CredentialState, IStyles } from "@/types";
import { Box } from "@mui/material";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

type Props = {
  loginCb: Function
};

const initialCredentials: CredentialState = {
  mail: "",
  password: "",
};

function loginReducer(state: CredentialState, action: CredentialAction) {
  switch (action.type) {
    case "setMail":
      state.mail = action.payload;
      return { ...state };
    case "setPassword":
      state.password = action.payload;
      return { ...state };
    default:
      return { ...state };
  }
}

export default function Login({loginCb}: Props) {
  const [credentials, dispatch] = useReducer(loginReducer, initialCredentials);

  const login = async() => {
    const auth = getAuth()
    await signInWithEmailAndPassword(auth, credentials.mail, credentials.password)
        .then((user) => {
          loginCb()
        })
        .catch((error) => {

        })    
  }

  return (
    <Box
      sx={styles.container}
    >
      <CssVarsProvider>
        <Sheet
          sx={{
            width: 300,
            mx: "auto", // margin left & right
            my: 4, // margin top & bottom
            py: 3, // padding top & bottom
            px: 2, // padding left & right
            display: "flex",
            flexDirection: "column",
            gap: 2,
            borderRadius: "sm",
            boxShadow: "md",
            alignSelf: "center",
          }}
          variant="outlined"
        >
          <div>
            <Typography level="h4" component={"h1"}>
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
                    type: "setMail",
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
                    type: "setPassword",
                    payload: e.target.value,
                  })
                }
              />
            </FormControl>
          </div>
          <Button onClick={login}>
            Log in
          </Button>
        </Sheet>
      </CssVarsProvider>
    </Box>
  );
}

const styles: IStyles = {
  container: () => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundImage:
      "linear-gradient( 58.2deg,  rgba(40,91,212,0.73) -3%, rgba(171,53,163,0.45) 49.3%, rgba(255,204,112,0.37) 97.7% )",
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundSize: "cover",
  })
}