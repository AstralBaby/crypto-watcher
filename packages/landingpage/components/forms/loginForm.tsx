import React from "react";
import {Box, Button, Container, TextField, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles( () => ({
    link: {
        color: blue["700"],
        cursor: 'pointer',
        fontWeight: 'bold'
    }
}))

interface Props {
    onGoToRegister: any
}

export default function LoginForm({onGoToRegister}: Props) {
    const classes = useStyles()

    return <>
        <Container>
            <Box mb={1}>
                <TextField fullWidth label='Email'/>
            </Box>
            <Box mb={1}>
                <TextField fullWidth label='Password'/>
            </Box>
            <Box mb={1}>
                <Button fullWidth>
                    Login
                </Button>
            </Box>
            <Box mb={1}>
                <Typography>
                    Don't have account yet? <a onClick={onGoToRegister} className={classes.link}>Create one</a>
                </Typography>
            </Box>
        </Container>
    </>
}