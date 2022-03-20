import React from 'react';
import '../App.css';
import LoginTitle from '../components/LoginTitle';
import RegisterCenterDiv from '../components/RegisterCenterDiv';
import {LongTab} from '../components/LongTab'
import styled from 'styled-components'

const TabTitle = styled(LongTab)`

`

function RegisterPage() {
    return (
        <body className="background">

            <LoginTitle/>

            <TabTitle>Register</TabTitle>

            <RegisterCenterDiv/>

        </body>
    );
}

export default RegisterPage;