import Button from "@material-ui/core/Button";
import React from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
    TextField, Typography
} from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions";
import LoginForm from "./forms/loginForm";
import RegisterForm from "./forms/registerForm";


export default function LoginButton(props){
    const Transition = React.forwardRef(function Transition(
        props: TransitionProps & { children?: React.ReactElement<any, any> },
        ref: React.Ref<unknown>,
    ) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    const [open, setOpen] = React.useState(false);
    const [isLogin, setIsLogin] = React.useState(true)

    function handleClickOpen() {
        setOpen(true)
    }
    function handleClose() {
        setOpen(false)
    }
    function goToLogin() {
        setIsLogin(true)
    }
    function goToRegister() {
        setIsLogin(false)
    }

    return <>
        <Button onClick={handleClickOpen} {...props}>Login</Button>
        {open &&
        <Dialog
            open={open}
            TransitionComponent={Transition}
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">
                Log in
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    { isLogin ? <LoginForm/> : <RegisterForm/> }
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Typography>
                    {isLogin ?
                        <Typography>Don't have an account yet? <a onClick={goToRegister}>create one</a>!</Typography>
                        :
                        <Typography>Already have an account? <a onClick={goToLogin}>login</a>!</Typography>
                    }
                </Typography>
                <div style={{flexGrow: 1}}></div>
            </DialogActions>
        </Dialog>}
    </>
}