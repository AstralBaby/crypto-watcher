import React, {useState} from "react";
import {Box, Button, TextField, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import { blue } from '@material-ui/core/colors';
import {signIn} from "next-auth/react";
import {Alert} from "@mui/material";
import {useFormik} from "formik";
import * as yup from 'yup'


const useStyles = makeStyles( () => ({
    link: {
        color: blue["700"],
        cursor: 'pointer',
        fontWeight: 'bold'
    }
}))

interface Props {
    registerRedirectHandler: any,
    isSuccess: boolean
}

const loginSchema = yup.object({
    email: yup.string().email("Enter a valid email").required("Email is required"),
    password: yup.string().required("Password is required")
})

export default function LoginForm({registerRedirectHandler, isSuccess}: Props) {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: loginSchema,
        onSubmit: async ({email, password}) => {
            setError('')
            try {
                const res = await signIn('sanity-login', {
                    redirect: false,
                    email,
                    password
                })

                // @ts-ignore
                if (res.status === 401) {
                    setError("Wrong credentials")
                }
            } catch (e) {
                setError(e.message)
            }
        }
    })
    const classes = useStyles()
    const [error, setError] = useState('')

    return <>
        <form onSubmit={formik.handleSubmit}>
            <Box mb={1}>
                { isSuccess &&
                <Alert severity='success' color='success'>
                    Account created successfully
                </Alert>
                }
                { !!error &&
                <Alert severity='warning' color='warning'>
                    { error }
                </Alert>
                }
            </Box>
            <Box mb={1}>
                <TextField error={formik.touched.email && !!formik.errors.email} helperText={formik.touched.email && formik.errors.email}
                           value={formik.values.email} onChange={formik.handleChange} name='email' fullWidth placeholder='Email'/>
            </Box>
            <Box mb={1}>
                <TextField error={formik.touched.password && !!formik.errors.password} helperText={formik.touched.password && formik.errors.password}
                           value={formik.values.password} onChange={formik.handleChange} fullWidth name='password' placeholder='Password' type="password"/>
            </Box>
            <Box mb={1}>
                <Button type="submit" disabled={formik.isSubmitting} fullWidth>
                    Login
                </Button>
            </Box>
            <Box mb={1}>
                <Typography>
                    Don't have account yet? <a onClick={registerRedirectHandler} className={classes.link}>Create one</a>
                </Typography>
            </Box>
        </form>
    </>
}