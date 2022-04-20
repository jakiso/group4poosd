import React from 'react';
import '../App.css';
import EmailSendingDiv from '../components/EmailSendingDiv';
import {LongTab} from '../components/LongTab'
import { Title } from '../components/Title';

function PasswordResetPage() {
    return (
        <body className="background">

            <Title className="title"/>

            <LongTab>Reset</LongTab>
            
            <EmailSendingDiv/>

        </body>
    );
}

export default PasswordResetPage;