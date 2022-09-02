import React from 'react'
import { TextField, Grid } from '@mui/material'
import { useFormContext, Controller } from 'react-hook-form'

const FormInput = ({ name, label, required }) => {
    const { control } = useFormContext();

    return (
        <Grid item xs={12} sm={6}>
            <Controller
                control={control}
                name={name}
                defaultValue=""
                render = {({ field: { onChange, value } })=> (
                    <TextField
                        fullWidth
                        label={label}
                        value={value}
                        required={required}
                        onChange={onChange}
                    />
                )}
            />
        </Grid>
    );
}

export default FormInput