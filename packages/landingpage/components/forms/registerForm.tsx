import {TextField} from "@material-ui/core";
import React from "react";

export default function RegisterForm() {
    return <>
        <TextField label='Email'/>
        <TextField label='Username'/>
        <TextField label='Password'/>
    </>
}