import React from 'react';
import '../App.css';
import PasswordCenterDiv from '../components/PasswordCenterDiv';
import {LongTab} from '../components/LongTab'
import { Title } from '../components/Title';
import styled from 'styled-components'

const TitleHeader = styled(Title)`
    margin-bottom:40px;
`

const TabTitle = styled(LongTab)`
    line-height:40px;
`

function ChangePasswordPage() {
    return (
        <body className="background">

            <TitleHeader className="title"/>

            <TabTitle>Reset Password</TabTitle>
            
            <PasswordCenterDiv/>

        </body>
    );
}

export default ChangePasswordPage;