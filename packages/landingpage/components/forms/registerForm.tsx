import {Box, Button, TextField, Typography} from "@material-ui/core";
import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {blue} from "@material-ui/core/colors";
import {signUp} from "next-auth-sanity/client";
import {useFormik} from 'formik'
import * as yup from 'yup'
import {Alert} from "@mui/material";

interface Props {
    loginRedirectHandler: any
}

const useStyles = makeStyles( () => ({
    link: {
        color: blue["700"],
        cursor: 'pointer',
        fontWeight: 'bold'
    }
}))


const registerSchema = yup.object({
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    name: yup.string().min(3, "Name should have at least 3 characters").required("Name is required"),
    password: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});



export default function RegisterForm({loginRedirectHandler}: Props) {
    const formik = useFormik({
        initialValues: {
            email: '',
            name: '',
            password: ''
        },
        validationSchema: registerSchema,
        onSubmit: async (values) => {
            setError('')
            try {
                const res = await signUp({
                    email: values.email,
                    name: values.name,
                    password: values.password
                })

                if (res.error) {
                    setError(res.error as string)
                } else {
                    loginRedirectHandler(true)
                }

            }
            catch (e) {
                setError(e.message)
            }
        }
    })
    const classes = useStyles()
    const [error, setError] = useState('')

    return <form onSubmit={formik.handleSubmit}>
            <Box mb={1}>
                { !!error &&
                <Alert severity="warning" color="warning">
                    { error }
                </Alert>
                }
            </Box>
            <Box mb={1}>
                <TextField error={formik.touched.email && !!formik.errors.email} helperText={formik.touched.email && formik.errors.email} value={formik.values.email} onChange={formik.handleChange} name="email" fullWidth placeholder='Email'/>
            </Box>
            <Box mb={1}>
                <TextField error={formik.touched.name && !!formik.errors.name} helperText={formik.touched.name && formik.errors.name} value={formik.values.name} onChange={formik.handleChange} name="name" fullWidth placeholder='Name'/>
            </Box>
            <Box mb={1}>
                <TextField error={formik.touched.password && !!formik.errors.password} helperText={formik.touched.password && formik.errors.password} value={formik.values.password} onChange={formik.handleChange} name="password" fullWidth placeholder='Password'/>
            </Box>
            <Box mb={1}>
                <Button type="submit" disabled={formik.isSubmitting} fullWidth>
                    Create Account
                </Button>
            </Box>
            <Box mb={1}>
                <Typography>
                    Don't have account yet? <a onClick={loginRedirectHandler} className={classes.link}>Create one</a>
                </Typography>
            </Box>
    </form>
}