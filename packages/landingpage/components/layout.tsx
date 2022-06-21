import Head from "next/head";
import {createStyles, makeStyles, Theme, ThemeProvider} from "@material-ui/core/styles";
import theme from "../assets/theme";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import React from "react";
import LoginButton from "./loginButton";
import {useSession} from "next-auth/react";


interface Props {
    children: any
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
            color: '#0f172a',
            fontFamily: "'Kdam Thmor Pro', sans-serif !important"
        },
        appbar: {
            borderBottom: '1px solid #e2e8f0',
            boxShadow: 'none'
        },
        wrapper: {
            paddingTop: 20,
        },
    }),
)

export default function BaseLayout(props: Props) {
    const classes = useStyles()
    const {data: session, status} = useSession()

    return (
            <div className={classes.root}>
                <Head>
                    <title>Home - Cryptowatcher</title>
                    <link rel="preconnect" href="https://fonts.googleapis.com"/>
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=''/>
                    <link href="https://fonts.googleapis.com/css2?family=Kdam+Thmor+Pro&display=swap" rel="stylesheet"/>
                </Head>
                <ThemeProvider theme={theme}>
                    <AppBar position="static" color='primary' className={classes.appbar}>
                        <Toolbar>
                            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                <img src='/logo.svg' width={25} alt=""/>
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                CryptoWatcher
                            </Typography>
                            <div style={{flexGrow: 1}}></div>
                            {status === 'authenticated' ?
                                JSON.stringify(session) :
                                <LoginButton style={{justifySelf: 'flex-end'}}>Login</LoginButton>
                            }
                        </Toolbar>
                    </AppBar>
                    <div className={classes.wrapper}>
                        { props.children }
                    </div>
                </ThemeProvider>
            </div>
    )
}