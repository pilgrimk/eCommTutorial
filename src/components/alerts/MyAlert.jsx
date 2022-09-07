import React from 'react'
import { Alert, Stack } from '@mui/material'


const MyAlert = ({ severity, message, handleClearAlert }) => {
    return (
        <Stack sx={{ width: '100%', mt: '80px' }} >
            <Alert
                onClose={() => handleClearAlert()}
                severity={severity}>
                {message}
            </Alert>
        </Stack>
    )
}

export default MyAlert