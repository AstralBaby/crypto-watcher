import React from 'react'
import { useEffect } from "react";
import {SessionProvider} from "next-auth/react";

export default function MyApp({ Component, pageProps }) {
    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return <SessionProvider session={pageProps.session}>
        <Component {...pageProps}/>
    </SessionProvider>
}