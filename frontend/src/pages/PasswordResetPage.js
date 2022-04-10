import React from 'react';
import '../App.css';
import PasswordCenterDiv from '../components/PasswordCenterDiv';
import {LongTab} from '../components/LongTab'
import { Title } from '../components/Title';

function PasswordResetPage() {
    return (
        <body className="background">

            <Title className="title"/>

            <LongTab>Reset</LongTab>
            
            <PasswordCenterDiv/>

        </body>
    );
}

export default PasswordResetPage;