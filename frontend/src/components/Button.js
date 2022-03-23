import React from 'react';
import '../App.css';
import styled from 'styled-components'

const Button = styled.button`
    width: 163px;
    height: 72px;

    background: #001A5E;
    border-radius: 14px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    color:#FEFFDC;
    font-family: Denk One;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 70px;

    display: flex;
    justify-content: center;
    z-index: 4;
`

export const Buttonb = ({children, className}) =>{
    return(
        <Button className={className}>{children}</Button>
    )
}