import Layout from '../../components/layout'
import Button from '@material-ui/core/Button';
import React from "react";

export default function LoginScreen () {
    return <>
        <Layout>
            <div>
                <Button variant="contained" disabled>
                    Disabled
                </Button>
            </div>
        </Layout>
    </>
}