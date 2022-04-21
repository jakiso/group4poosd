import React from 'react';
import styled from 'styled-components'
import searchGlass from '../images/LG_search.png'
import location from '../images/LG_location.png'
import filter from '../images/LG_filter.png'


const Input = styled.input`
width: 100%;
height: 53px;

filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
font-family: 'Denk One';
font-style: normal;
font-weight: 400;
font-size: 30px;
line-height: 30px;
text-align: left;

color: #FEFFDC;
background: #001A5E;
border-radius: 14px;
align:right;
columnGap: 1rem;
`

const Bar = styled.div`
width: 100%;
height: 57px;

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


export const SearchBar = ({className, button_id, button_text, setSearch, search}) =>{
    const getInputValue = (event)=>{
        // show the user input value to console
        setSearch(document.getElementById("searchBar").value);
        console.log(document.getElementById("searchBar").value);
    };

    return(
        <Bar style={{"display":"grid", "gridTemplateColumns":"18fr 1fr 1fr 1fr", "columnGap":"1rem"}}>

        <Input id="searchBar" placeholder=" Search" style={{"zIndex":"0"}}/>

        <div style={{"height":"39px", "width":"42px",  "margin":"auto", "paddingLeft":"20px"}}>
            <img src={searchGlass} alt="search" style={{"width":"100%", "height":"100%"}} onClick={getInputValue}></img>
        </div>  
        <div style={{"height":"40px", "width":"25px", "margin":"auto"}}>
            <img src={location} alt="location" style={{"width":"100%", "height":"100%"}}></img>
        </div>  
        <div style={{"height":"35px", "width":"35px",  "margin":"auto", "paddingRight":"20px"}}>
            <img src={filter} alt="search" style={{"width":"100%", "height":"100%"}}></img>
        </div>  
        </Bar>
    )
}