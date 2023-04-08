import Head from 'next/head'
import { Box, SxProps, Theme, Toolbar } from '@mui/material'
import CustomAppBar from '@/components/CustomAppBar'
import { Provider } from 'react-redux'
import TodoContent from '@/components/TodoContent'
import store from './app/store'

const UIOverlay = () => {
  return (
    <Box sx={styles.overlay}>
      <CustomAppBar/>
    </Box>
  )
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main id='layout'>
        <Provider store={store}>
          <UIOverlay/>
          <Toolbar/>
          <TodoContent/>
        </Provider>
      </main>
    </>
  )
}


interface IStyles {
  [key: string]: SxProps<Theme>;
}

const styles: IStyles = {
  overlay: (theme: Theme) => ({
    display: 'flex',
    position: "fixed",
    width: '100%',
  })
}