import React from 'react';
import '../App.css';
import EmailSendingDiv from '../components/EmailSendingDiv';
import {LongTab} from '../components/LongTab'
import { Title } from '../components/Title';
import styled from 'styled-components'

const TitleHeader = styled(Title)`
    margin-bottom:40px;
`

const TabTitle = styled(LongTab)`
    line-height:40px;
`

function PasswordResetPage() {
    return (
        <body className="background">

            <TitleHeader className="title"/>

            <TabTitle>Account Recovery</TabTitle>
            
            <EmailSendingDiv/>

        </body>
    );
}

export default PasswordResetPage;