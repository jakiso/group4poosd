import React from 'react';
import '../App.css';
import styled from 'styled-components'

const Text = styled.text`
    color:#001A5E;
    font-family: Denk One;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;

    text-decoration: underline;

    display: flex;
    justify-content: center;
    z-index: 4;
`

export const LinkP = ({children, className}) =>{
    return(
        <Text className={className}>{children}</Text>
    )
}