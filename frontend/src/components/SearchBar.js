import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import searchGlass from '../images/LG_search.png'
import location from '../images/LG_location.png'
import filter from '../images/LG_filter.png'
import plus from '../images/cross_add.png'


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


function DropdownItem(props){ 

    function SetCheckMap(event){

        // document.getElementById(props.id).checked = !this.checked;

        let updatedList = props.checkMap;
        var objIndex = updatedList.findIndex((obj=> obj.keyword === props.id));

        updatedList[objIndex].checked = !updatedList[objIndex].checked;


        props.setChecked([...updatedList]); // this spread operator make react notice that the original array has been modified
        // this way the drop-down component will instantly rerender upon any change in check boxes
    }

    return(
    <div class='menu-item'>
        {/* {/* <span class='icon-button'>{props.leftIcon}</span> */}
        <input type="checkbox" checked={props.checked} id={props.id} onClick={SetCheckMap}/>
        {/* <input type="checkbox" checked={props.checked} id={props.id}/> */}
        {props.children}
        {/* <span class='icon-button'>{props.rightIcon}</span> */}
    </div>
        );
}

function DropdownFood(props){

    return(
        <div class='dropdown'>
            {props.checkedFood.map(({keyword, checked}) => (
              <DropdownItem id={keyword} checked={checked} setChecked={props.setCheckedFood} checkMap={props.checkedFood}>&nbsp;{keyword.replaceAll('_', ' ')}</DropdownItem>
            ))}
        </div>
    );
}

function DropdownActivity(props){

    return(
        <div class='dropdown'>
            {props.checkedActivity.map(({keyword, checked}) => (
              <DropdownItem id={keyword} checked={checked} setChecked={props.setCheckedActivity} checkMap={props.checkedActivity}>&nbsp;{keyword.replaceAll('_', ' ')}</DropdownItem>
            ))}
        </div>
    );
}



// This ternary picks which Search bar will be loaded depending on the tab that is selected
function SearchBar (props) {

    const [open, setOpen] = useState(false);
    const [checkedFood, setCheckedFood] = useState([{keyword: "restaurant", checked: false},
                                                    {keyword: "bar", checked: false},
                                                    {keyword: "meal_delivery", checked: false},
                                                    {keyword: "health", checked: false},
                                                    {keyword: "cafe", checked: false},
                                                    {keyword: "bakery", checked: false}]);

    const [checkedActivity, setCheckedActivity] = useState([{keyword: "park", checked: false},
                                                            {keyword: "museum", checked: false},
                                                            {keyword: "bar", checked: false},
                                                            {keyword: "art", checked: false},
                                                            {keyword: "movie", checked: false},
                                                            {keyword: "neighborhood", checked: false},
                                                            {keyword: "food", checked: false}]);                                                       

    const getInputValueFood = (event)=>{
        // show the user input value to console
        props.setSearchFood(document.getElementById("searchBarFood").value);
        GetKeywordsFood();
    };

    const getInputValueActivity = (event)=>{
        // show the user input value to console
        props.setSearchActivity(document.getElementById("searchBarActivity").value);
        GetKeywordsActivity();
    };

    const getInputValueFriend = (event)=>{
        // show the user input value to console
        props.setSearchFriend(document.getElementById("searchBarFriend").value);
    };

    const GetKeywordsFood = (event)=>{
        let keywordsFood = new Array();

        // if(checkedFood!=null){
            checkedFood.map(({keyword, checked}) => {
                if(checked){
                keywordsFood.push(keyword.replaceAll('_', ' '));}
            })
        // }

        props.setKeywordsFood(keywordsFood);

        useEffect(() => {
            props.setKeywordsFood(keywordsFood);
        },[keywordsFood]);
    };

    const GetKeywordsActivity= (event)=>{
        let keywordsActivity = new Array();

        // if(checkedActivity!=null){
            checkedActivity.map(({keyword, checked}) => {
                if(checked){
                keywordsActivity.push(keyword.replaceAll('_', ' '));}
            })
        // }
        

        useEffect(() => {
            props.setKeywordsActivity(keywordsActivity);
        },[keywordsActivity]);
    };

    return(props.selectTab==="food")?(
        <Bar style={{"display":"grid", "gridTemplateColumns":"18fr 1fr 1fr 1fr", "columnGap":"1rem", "zIndex":"5", "position":"relative"}}>

        <Input id="searchBarFood" placeholder="Enter location you wish to search by" style={{"zIndex":"0"}}/>

        <div class="search_bar_button" style={{"display":"flex", "justifyContent":"center"}}>
            <img src={searchGlass} alt="search" style={{"margin":"auto", "height":"39px", "width":"42px"}} onClick={getInputValueFood}></img>
        </div>  
        <div class="search_bar_button" style={{ "display":"flex", "justifyContent":"center"}}>
            <img src={location} alt="location" style={{"margin":"auto","height":"40px", "width":"25px"}}></img>
        </div>  
        <div class="search_bar_button" style={{"display":"flex", "justifyContent":"center"}}>
            <img src={filter} alt="search" style={{"margin":"auto", "height":"35px", "width":"35px"}}  onClick={()=>setOpen(!open)}></img>
            {/* this conitional toggles dropdown menu */}
            {open && <DropdownFood checkedFood={checkedFood} setCheckedFood={setCheckedFood}></DropdownFood>}
        </div>  
        </Bar>
    ):(props.selectTab==="activity")?(
        <Bar style={{"display":"grid", "gridTemplateColumns":"18fr 1fr 1fr 1fr", "columnGap":"1rem", "zIndex":"5", "position":"relative"}}>

        <Input id="searchBarActivity" placeholder="Enter location you wish to search by" style={{"zIndex":"0"}}/>

        <div class="search_bar_button" style={{"display":"flex", "justifyContent":"center"}}>
            <img src={searchGlass} alt="search" style={{"margin":"auto", "height":"39px", "width":"42px"}} onClick={getInputValueActivity}></img>
        </div>  
        <div class="search_bar_button" style={{ "display":"flex", "justifyContent":"center"}}>
            <img src={location} alt="location" style={{"margin":"auto","height":"40px", "width":"25px"}}></img>
        </div>  
        <div class="search_bar_button" style={{"display":"flex", "justifyContent":"center"}}>
            <img src={filter} alt="search" style={{"margin":"auto", "height":"35px", "width":"35px"}}  onClick={()=>setOpen(!open)}></img>
            {/* this conitional toggles dropdown menu */}
            {open && <DropdownActivity checkedActivity={checkedActivity} setCheckedActivity={setCheckedActivity}></DropdownActivity>}
        </div>  
        </Bar>
    ):(props.selectTab==="friends")?(
        <Bar style={{"display":"grid", "gridTemplateColumns":"18fr 1fr 1fr 1fr", "columnGap":"1rem", "zIndex":"5", "position":"relative"}}>

        <Input id="searchBarFriend" placeholder="Enter your friend's name" style={{"zIndex":"0"}}/>

        <div class="search_bar_button" style={{"display":"flex", "justifyContent":"center"}}>
            <img src={searchGlass} alt="search" style={{"margin":"auto", "height":"39px", "width":"42px"}} onClick={getInputValueFriend}></img>
        </div>  
        <div class="search_bar_button" style={{ "display":"flex", "justifyContent":"center"}}>
            <img src={location} alt="location" style={{"margin":"auto","height":"40px", "width":"25px"}}></img>
        </div>  
        <div class="search_bar_button" style={{"display":"flex", "justifyContent":"center"}}>
            {/* // TODO: OnClick filter button save keywordArray (into useState from CardUI?) */}
            <img src={plus} alt="search" style={{"margin":"auto", "height":"35px", "width":"35px"}}  onClick={()=>setOpen(!open)}></img>
        </div>  
        </Bar>
    ):("");
}

export default SearchBar;