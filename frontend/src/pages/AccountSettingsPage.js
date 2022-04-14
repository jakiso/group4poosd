import React from 'react';
import '../App.css';
import AccountSettingsCenterDiv from '../components/AccountSettingsCenterDiv';
import {LongTab} from '../components/LongTab'
import styled from 'styled-components'
import { Title } from '../components/Title';

const TitleHeader = styled(Title)`
    margin-bottom:40px;
`

const TabTitle = styled(LongTab)`
    line-height:40px;
`

function AccountSettingsPage() {
    return (
        <body className="background">
            
            <div style={{"display":"grid", "gridTemplateRows": "1fr", "align-content":"center"}}>
            <TitleHeader className="title"/>
            <div class="wrapper" style={{"display":"grid", "gridTemplateRows": "1fr 100%"}}>
            <TabTitle children="Account Settings Page"></TabTitle>
            <AccountSettingsCenterDiv/>
            </div>
            </div>

        </body>
    );
}

export default AccountSettingsPage;
