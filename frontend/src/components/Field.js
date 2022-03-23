import React from 'react';
import '../App.css';
import styled from 'styled-components'

const Button = styled.button`
    position: relative;
    display: flex;
    width: 405px;
    height: 56px;
    background-color: #001A5E;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 14px;
  
    color: #FEFFDC;
    font-family: Denk One;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 50px;
    z-index: 85;
`

export const Field = ({children, className}) =>{
    return(
        <Button className={className}>{children}</Button>
    )
}