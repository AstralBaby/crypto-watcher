import React from "react";
import {Box, Button, Container, TextField, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import { blue } from '@material-ui/core/colors';
import {signIn} from "next-auth/react";
import {Alert} from "@mui/material";

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

function handleLogin() {
    signIn('sanity-login',{
        redirect: false,
        email: 'catalinafernandez0226@gmail.com',
        password: 'test1234568877'
    }).then(res => console.log(res))
}

export default function LoginForm({registerRedirectHandler, isSuccess}: Props) {
    const classes = useStyles()

    return <>
        <Container>
            <Box mb={1}>
                { isSuccess &&
                <Alert severity='success' color='success'>
                    Account created successfully
                </Alert>
                }
            </Box>
            <Box mb={1}>
                <TextField fullWidth label='Email'/>
            </Box>
            <Box mb={1}>
                <TextField fullWidth label='Password'/>
            </Box>
            <Box mb={1}>
                <Button fullWidth onClick={handleLogin}>
                    Login
                </Button>
            </Box>
            <Box mb={1}>
                <Typography>
                    Don't have account yet? <a onClick={registerRedirectHandler} className={classes.link}>Create one</a>
                </Typography>
            </Box>
        </Container>
    </>
}