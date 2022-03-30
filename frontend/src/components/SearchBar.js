import React from 'react';
import styled from 'styled-components'
import search from '../images/LG_search.png'
import location from '../images/LG_location.png'
import filter from '../images/LG_filter.png'


const Input = styled.input`
width: 100%;
height: 82px;

filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
font-family: 'Denk One';
font-style: normal;
font-weight: 400;
font-size: 40px;
line-height: 30px;
text-align: left;

color: #FEFFDC;
background: #001A5E;
border-radius: 14px;
align:right;
column-gap: 1rem;
`

const Bar = styled.div`
width: 100%;
height: 90px;

filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
font-family: 'Denk One';
font-style: normal;
font-weight: 400;
font-size: 40px;
line-height: 30px;
text-align: left;

color: #FEFFDC;
background: #001A5E;
border-radius: 14px;
align:right;
column-gap: 1rem;
`

export const SearchBar = ({className, button_id, button_text}) =>{
    return(
        <Bar style={{"display":"grid", "gridTemplateColumns":"18fr 1fr 1fr 1fr", "column-gap":"1rem"}}>
        <Input id="searchBar" placeholder="    Search" style={{"z-index":"0"}}/>

        <div style={{"height":"60px", "width":"60px",  "margin":"auto", "padding-left":"20px"}}>
            <img src={search} alt="search" style={{"width":"100%", "height":"100%"}}></img>
        </div>  
        <div style={{"height":"60px", "width":"42.5px", "margin":"auto"}}>
            <img src={location} alt="location" style={{"width":"100%", "height":"100%"}}></img>
        </div>  
        <div style={{"height":"60px", "width":"60px",  "margin":"auto", "padding-right":"20px"}}>
            <img src={filter} alt="search" style={{"width":"100%", "height":"100%"}}></img>
        </div>  
         </Bar>
    )
}