import { Box, keyframes } from '@mui/material'
import React from 'react'

type Props = {
    style: object
}

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export default function Spinner({style}: Props) {
  return (
    <Box
      sx={style}
    >
      <Box
        sx={{
          animation: `${spin} 1s infinite ease`,
          width: '50px',
          height: '50px',
          border: '10px solid #f3f3f3',
          borderTop: '10px solid #383636',
          borderRadius: '50%',
        }}
      ></Box>
    </Box>
  )
}
