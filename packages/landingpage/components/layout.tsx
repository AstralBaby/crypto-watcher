import Head from "next/head";
import {createStyles, makeStyles, Theme, ThemeProvider} from "@material-ui/core/styles";
import theme from "../assets/theme";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import React, {useState} from "react";
import LoginButton from "./loginButton";
import {signOut, useSession} from "next-auth/react";
import {Button, Chip, Menu, MenuItem} from "@material-ui/core";
import ManagementButton from "./managementButton";

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
            color: '#0f172a',
            paddingRight: 30,
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
const menuStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: 50,
            flex: 1
        }
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
                            {status === 'authenticated' && session.user.isAdmin &&
                                 <ManagementButton/>
                            }
                            <div style={{flexGrow: 1}}></div>
                            {status === 'authenticated' ?
                                <UserMenu user={session.user}></UserMenu> :
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

function UserMenu({user}: any) {
    // for shorthand, open stores the element the menu will attach to
    const [open, setOpen] = useState<null | HTMLElement>(null)
    const classes = menuStyles()

    function handleClose(){
        setOpen(null)
    }

    return <>
        <Chip onClick={(e) => setOpen(e.currentTarget)} variant="outlined" label={user.name} />
        <Menu className={classes.root} anchorEl={open} open={!!open} onClose={handleClose}>
            <MenuItem onClick={() => signOut()}>Logout</MenuItem>
        </Menu>
    </>
}