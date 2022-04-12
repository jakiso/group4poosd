import React from 'react';
import '../App.css';
import VerifyCenterDiv from '../components/VerifyCenterDiv';
import {LongTab} from '../components/LongTab';
import { Title } from '../components/Title';

function VerificationPage() {
    return (
        <body className="background">

            <Title className="title"/>

            <LongTab>Verification</LongTab>
            
            <VerifyCenterDiv/>

        </body>
    );
}

export default VerificationPage;