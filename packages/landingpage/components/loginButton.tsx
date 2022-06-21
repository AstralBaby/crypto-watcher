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
    const [isAccountCreated, setIsAccountCreated] = React.useState(false)

    function handleClickOpen() {
        setOpen(true)
    }
    function handleClose() {
        setOpen(false)
        setIsLogin(true)
    }
    function goToLogin(isSuccess) {
        setIsLogin(true)
        if (isAccountCreated) setIsAccountCreated(true)
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
            <DialogTitle id="alert-dialog-slide-title" style={{textAlign: "center", fontWeight: "bold"}}>
                { isLogin ? "Log in" : "Register"}
            </DialogTitle>
            <DialogContent>
                    { isLogin ? <LoginForm isSuccess={isAccountCreated} registerRedirectHandler={goToRegister}/> : <RegisterForm loginRedirectHandler={goToLogin}/> }
            </DialogContent>
        </Dialog>}
    </>
}