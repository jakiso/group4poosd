import React from 'react';
import '../App.css';
import VerifyCenterDiv from '../components/VerifyCenterDiv';
import {LongTab} from '../components/LongTab'
import styled from 'styled-components'
import { Title } from '../components/Title';

const TitleHeader = styled(Title)`
    margin-bottom:40px;
`

const TabTitle = styled(LongTab)`
    line-height:40px;
`

function VerificationPage() {
    return (
        <body className="background">

            <TitleHeader className="title"/>

            <TabTitle>Verification</TabTitle>
            
            <VerifyCenterDiv/>

        </body>
    );
}

export default VerificationPage;