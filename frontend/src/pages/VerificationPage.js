import React from 'react';
import '../App.css';
import LoginTitle from '../components/LoginTitle';
import VerifyCenterDiv from '../components/VerifyCenterDiv';
import {LongTab} from '../components/LongTab'
import styled from 'styled-components'

const TabTitle = styled(LongTab)`

`

function VerificationPage() {
    return (
        <body className="background">

            <LoginTitle/>

            <TabTitle>Verification</TabTitle>
            
            <VerifyCenterDiv/>

        </body>
    );
}

export default VerificationPage;