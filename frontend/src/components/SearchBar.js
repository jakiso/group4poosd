import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import searchGlass from '../images/LG_search.png'
import location from '../images/LG_location.png'
import filter from '../images/LG_filter.png'
import plus from '../images/cross_add.png'
import save from '../images/LG_save_icon4.png'
import { Buttonc } from './BarButtonFriends'; 
import axios from 'axios';

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
padding-left: 5%;
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

const geolocation_API = `https://api.openweathermap.org/data/2.5/weather?`;
const geolocation_API_key = `67a1733798613cf5dec01437cfd3faca`;

// This ternary picks which Search bar will be loaded depending on the tab that is selected
function SearchBar (props) {

    const [responseData, setResponseData] = useState("");


    
    function setCityNameFood(){
        // uses weather API to get geographic coordinates and city name
        navigator.geolocation.getCurrentPosition((position)=>{
            console.log(position.coords);
            props.setLatitude(position.coords.latitude);
            props.setLongitude(position.coords.longitude);
        })

        let formattedEndpoint = `${geolocation_API}lat=${props.latitude}&lon=${props.longitude}&exclude=hourly,daily&appid=${geolocation_API_key}`;

        console.log(formattedEndpoint);

        axios.get(formattedEndpoint)
        .then((response) => {
            console.log(response.data);
            setResponseData(response.data.name);
        }).catch((e) => {console.log(e)})

        document.getElementById("searchBarFood").value=responseData;
    }

    function setCityNameActivity(){
        // uses weather API to get geographic coordinates and city name
        navigator.geolocation.getCurrentPosition((position)=>{
            console.log(position.coords);
            props.setLatitude(position.coords.latitude);
            props.setLongitude(position.coords.longitude);
        })

        let formattedEndpoint = `${geolocation_API}lat=${props.latitude}&lon=${props.longitude}&exclude=hourly,daily&appid=${geolocation_API_key}`;

        console.log(formattedEndpoint);

        axios.get(formattedEndpoint)
        .then((response) => {
            console.log(response.data);
            setResponseData(response.data.name);
            document.getElementById("searchBarActivity").value=responseData;
        }).catch((e) => {console.log(e)})
    }

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
    };

    const GetKeywordsActivity= (event)=>{
        let keywordsActivity = new Array();

        // if(checkedActivity!=null){
            checkedActivity.map(({keyword, checked}) => {
                if(checked){
                keywordsActivity.push(keyword.replaceAll('_', ' '));}
            })
        // }
        props.setKeywordsActivity(keywordsActivity);
    };

    return(props.selectTab==="food")?(
        <Bar style={{"display":"flex", "columnGap":"10px", "zIndex":"5", "position":"relative", "marginRight":"20px"}}>

        <Input id="searchBarFood" placeholder="Enter location you wish to search by" style={{"zIndex":"0"}} onClick={()=>{
            if(document.getElementById("listUI")){
                var children = document.getElementById("listUI").children;
                for (var i = 0; i < children.length; i++) {
                children[i].style.backgroundColor="#001A5E";
                }
            }
            props.setPlaceListFood("");
        }}/>


        <div class="search_bar_button" style={{"display":"flex", "justifyContent":"center", "width":"100px", "height":"auto"}}>
            <img src={searchGlass} alt="search" style={{"margin":"auto", "height":"39px", "width":"42px", "cursor":"pointer"}} onClick={getInputValueFood}></img>
        </div>  
        <div class="search_bar_button" style={{ "display":"flex", "justifyContent":"center", "width":"100px", "height":"auto"}}>
            <img src={location} alt="location" style={{"margin":"auto","height":"40px", "width":"30px", "cursor":"pointer"}}  onClick={setCityNameFood}></img>
        </div>  
        <div class="search_bar_button" style={{"display":"flex", "justifyContent":"center", "width":"100px", "height":"auto", "marginRight":"20px"}}>
            <img src={filter} alt="search" style={{"margin":"auto", "height":"35px", "width":"35px", "cursor":"pointer"}}  onClick={()=>setOpen(!open)}></img>

            {/* this conitional toggles dropdown menu */}
            {open && <DropdownFood checkedFood={checkedFood} setCheckedFood={setCheckedFood}></DropdownFood>}
        </div>  
        </Bar>
    ):(props.selectTab==="activity")?(
        <Bar style={{"display":"flex", "columnGap":"10px", "zIndex":"5", "position":"relative"}}>

        <Input id="searchBarActivity" placeholder="Enter location you wish to search by" style={{"zIndex":"0"}} onClick={()=>{
            if(document.getElementById("listUI")){
                var children = document.getElementById("listUI").children;
                for (var i = 0; i < children.length; i++) {
                children[i].style.backgroundColor="#001A5E";
                }   
            }
            props.setPlaceListActivity("");
        }}/>

        <div class="search_bar_button" style={{"display":"flex", "justifyContent":"center", "width":"100px", "height":"auto"}}>
            <img src={searchGlass} alt="search" style={{"margin":"auto", "height":"39px", "width":"42px", "cursor":"pointer"}} onClick={getInputValueActivity}></img>
        </div>  
        <div class="search_bar_button" style={{ "display":"flex", "justifyContent":"center", "width":"100px", "height":"auto"}}>
            <img src={location} alt="location" style={{"margin":"auto","height":"40px", "width":"30px", "cursor":"pointer"}}  onClick={setCityNameActivity}></img>
        </div>  
        <div class="search_bar_button" style={{"display":"flex", "justifyContent":"center", "width":"100px", "height":"auto", "marginRight":"20px"}}>
            <img src={filter} alt="search" style={{"margin":"auto", "height":"35px", "width":"35px", "cursor":"pointer"}}  onClick={()=>setOpen(!open)}></img>
            {/* this conitional toggles dropdown menu */}
            {open && <DropdownActivity checkedActivity={checkedActivity} setCheckedActivity={setCheckedActivity}></DropdownActivity>}
        </div>  
        </Bar>
    ):(props.selectTab==="friends")?(
        <Bar style={{"display":"flex", "columnGap":"10px", "zIndex":"5", "position":"relative"}}>

        <Input id="searchBarFriend" placeholder="Enter your friend's name" style={{"zIndex":"0"}}/>

        <div class="search_bar_button" style={{"display":"flex", "justifyContent":"center", "width":"100px", "height":"auto"}}>
            <img src={searchGlass} alt="search" style={{"margin":"auto", "height":"39px", "width":"42px", "cursor":"pointer"}} onClick={getInputValueFriend}></img>
        </div>  
        <Buttonc newFriendMode={props.newFriendMode} setNewFriendMode={props.setNewFriendMode}/>
        </Bar>
    ):("");
}

export default SearchBar;