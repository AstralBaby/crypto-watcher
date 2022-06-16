import Layout from '../../components/layout'
import React from "react";
import {Container, Grid, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
        height: 'calc(100vh - 110px)',
    },
    loginCard: {
    }
}))


export default function LoginScreen () {
    const classes = useStyles()
    return <>
        <Layout>
                <Grid container className={classes.root}>
                    <Grid className={classes.loginCard} lg={6} sm={12}>
                        <Container>
                            <TextField label='Email'></TextField>
                            <TextField label='Password'></TextField>
                        </Container>
                    </Grid>
                    <Grid lg={6} sm={12}>
                        right
                    </Grid>
                </Grid>
        </Layout>
    </>
}