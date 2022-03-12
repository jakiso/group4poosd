import React from 'react';
import '../App.css';
import LoginTitle from '../components/LoginTitle';
import LoginCenterDiv from '../components/LoginCenterDiv';
import {LongTab} from '../components/LongTab'
import styled from 'styled-components'

const TabTitle = styled(LongTab)`
    
`

function LoginPage() {
  return (
    <body className="background">

      <LoginTitle/>

      <TabTitle>Login</TabTitle>

      <LoginCenterDiv/>

    </body>
    
  );
}

export default LoginPage;