import {Box, TextField} from "@material-ui/core";
import React from "react";

export default function LoginForm() {
    return <>
        <form autoComplete='off'>
            <TextField label='Email'/>
            <br/>
            <TextField label='Password'/>
        </form>
    </>
}