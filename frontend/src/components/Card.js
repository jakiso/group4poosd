import React from 'react';
import styled from 'styled-components'
import { Buttonc } from './CardButton';
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
height: 400px;
`
const ListButton = styled(Buttonc)`
width: 100%;
height: 50px;
`
const Description = styled(Buttonc)`
width: 100%;
height: 100%;
`

export const Carda = (props) =>{
    return(
        <Card style={{"display":"flex", "gap": "0vh", "overflow":"auto"}}>            
        <div style={{"display":"flex", "gap": "2vh", "margin":"2%", "width":"100%"}}>    
        <div style={{ "height":"100%","width":"20%", "overflow":"auto"}}>
            <img width={"70%"} height={"auto"} src={props.src} alt="Event"/><br/><br/>
            <p>Rating {props.Rating}</p><br/>
            <img width={"15%"} height={"auto"} src={cross} alt="Event" onClick={()=>{props.setSaveToListMode(true);}}/>
        </div> 
        <div style={{"display":"grid", "width":"40%", "height":"100%", "overflow":"auto",}}>
            <ListButton button_text={props.Name}/>
            <ListButton button_text={props.Adress}/>
            <ListButton button_text={props.PhoneNumber}/>
            <ListButton button_text={props.MoreInfo}/> 
        </div> 
        <div style={{"width":"40%", "overflow":"auto"}}>
            <Description button_text={props.DescriptionText}/>
        </div>  
        </div></Card>
    )
}