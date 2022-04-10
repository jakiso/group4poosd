import React, { useState, useEffect } from 'react';
import '../App.css';
import { SearchTab } from './SearchTab';

const tabs = ["", "food", "activities", "friends"];

function SelectSearchTab(props){

    // try catch is needed for when page intially loads
    try{
    return (props.selectTab==="food") ? (
        <div style= {{"display":"flex", "gap":"20vh", "justifyContent":"center", "marginLeft":"50px", "marginRight":"50px"}}>
            <SearchTab children="Food" selected={true} customOnClick={()=>{props.setSelectTab("food");}}/>
            <SearchTab children="Activities" selected={false} customOnClick={()=>{props.setSelectTab("activities");}}/>
            <SearchTab children="Friends" selected={false} customOnClick={()=>{props.setSelectTab("friends");}}/>
        </div>
    ) : (props.selectTab==="activities") ? ( 
        <div style= {{"display":"flex", "gap":"20vh", "justifyContent":"center", "marginLeft":"50px", "marginRight":"50px"}}>
            <SearchTab children="Food"  selected={false}  customOnClick={()=>{props.setSelectTab("food");}}/>
            <SearchTab children="Activities" selected={true} customOnClick={()=>{props.setSelectTab("activities");}}/>
            <SearchTab children="Friends" selected={false} customOnClick={()=>{props.setSelectTab("friends");}}/>
        </div>
    ): (props.selectTab==="friends") ? (
        <div style= {{"display":"flex", "gap":"20vh", "justifyContent":"center", "marginLeft":"50px", "marginRight":"50px"}}>
            <SearchTab children="Food" selected={false}  customOnClick={()=>{props.setSelectTab("food");}}/>
            <SearchTab children="Activities" selected={false}  customOnClick={()=>{props.setSelectTab("activities");}}/>
            <SearchTab children="Friends" selected={true} customOnClick={()=>{props.setSelectTab("friends");}}/>
        </div>
    ) : (
        <div style= {{"display":"flex", "gap":"20vh", "justifyContent":"center", "marginLeft":"50px", "marginRight":"50px"}}>
        <SearchTab children="Food" selected={false} customOnClick={()=>{props.setSelectTab("food");}}/>
        <SearchTab children="Activities" selected={false} customOnClick={()=>{props.setSelectTab("activities");}}/>
        <SearchTab children="Friends" selected={false} customOnClick={()=>{props.setSelectTab("friends");}}/>
        </div>
    );
    } catch(e){return null;}
}

export default SelectSearchTab;