import React from 'react';
import styled from 'styled-components'
import { Buttonc } from './CardButtonEditable';
import cross from '../images/cross_add.png';

const Card = styled.div`
// margin-top: 50px;

filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
font-family: 'Denk One';
font-style: normal;
font-weight: 400;
font-size: 24px;
line-height: 30px;
text-align: center;

color: #FEFFDC;
background: #001A5E;
border-radius: 14px;
align:right;
column-gap: 1rem;

width: 100%;
height: 300px;
`
const CardButton = styled(Buttonc)`
width: 100%-50px;
height: 45px;
padding-top: 1%;
padding-left: 5%;
`

const Description = styled(Buttonc)`
width: 50%;
height: auto-1%;
padding-top: 5%;
padding-left: 5%;
`

export const Cardb = (props) =>{

    return(props.newFriendMode) ? (                                           // margin: top right bottom left
        <Card style={{"display":"flex", "gap": "0vh", "overflow":"hidden"}}>            
            <div style={{"display":"flex", "gap": "2vh", "margin":"2%", "width":"100%"}}>    
                <div style={{"height":"200rem","width":"20%", "overflow":"hidden", "margin":"0% 0% 20% 0%"}}>
                    <img width={"100rem"} height={"auto"} src={props.src} alt="Event"/><br/><br/>
                    <p>Rating {props.Rating}</p><br/>
                </div> 
                <div style={{"display":"grid", "width":"40%", "height":"100%", "overflow":"auto",}}>
                    <CardButton placeholder="Name" button_id="NewFriendName"/>
                    <CardButton placeholder="Address" button_id="NewFriendAddress"/>
                    <CardButton placeholder="Phone Number" button_id="NewFriendPhone"/>
                    <CardButton  placeholder="Email" button_id="NewFriendEmail"/>
                </div> 
                <div style={{"width":"40%", "overflow":"auto", "margin":"auto"}}>
                    <Description placeholder="Description" button_id="NewFriendDescription"/> 
                </div>  
            </div>
        </Card>
    ) : ("");
}