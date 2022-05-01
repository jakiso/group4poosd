import React, { useState, useEffect } from 'react';
import '../App.css';
import { SearchTab } from './SearchTab';

const tabs = ["", "food", "activity", "friends"];

function SelectSearchTab(props){


    // try catch is needed for when page intially loads
    try{
    return (props.selectTab==="food" && props.loggedInState) ? (
        <div style= {{"display":"flex", "gap":"20vh", "justifyContent":"center", "marginLeft":"200px", "marginRight":"200px"}}>
            <SearchTab children="Food" selected={true} customOnClick={()=>{props.setSelectTab("food");}}/>
            <SearchTab children="Activities" selected={false} customOnClick={()=>{props.setSelectTab("activity");}}/>
            <SearchTab children="Friends" selected={false} customOnClick={()=>{props.setSelectTab("friends");}}/>
            {(() => {
              if (document.getElementById("searchBar") != null){
                  return (
                      document.getElementById("searchBar").value=""
                  )
              }           
              return null;
            })()}
        </div>
    ) : (props.selectTab==="activity" && props.loggedInState) ? ( 
        <div style= {{"display":"flex", "gap":"20vh", "justifyContent":"center", "marginLeft":"200px", "marginRight":"200px"}}>
            <SearchTab children="Food"  selected={false}  customOnClick={()=>{props.setSelectTab("food");}}/>
            <SearchTab children="Activities" selected={true} customOnClick={()=>{props.setSelectTab("activity");}}/>
            <SearchTab children="Friends" selected={false} customOnClick={()=>{props.setSelectTab("friends");}}/>
            {(() => {
              if (document.getElementById("searchBar") != null){
                  return (
                      document.getElementById("searchBar").value=""
                  )
              }           
              return null;
            })()}
        </div>
    ): (props.selectTab==="friends" && props.loggedInState) ? (
        <div style= {{"display":"flex", "gap":"20vh", "justifyContent":"center", "marginLeft":"200px", "marginRight":"200px"}}>
            <SearchTab children="Food" selected={false}  customOnClick={()=>{props.setSelectTab("food");}}/>
            <SearchTab children="Activities" selected={false}  customOnClick={()=>{props.setSelectTab("activity");}}/>
            <SearchTab children="Friends" selected={true} customOnClick={()=>{props.setSelectTab("friends");}}/>
            {(() => {
              if (document.getElementById("searchBar") != null){
                  return (
                      document.getElementById("searchBar").value=""
                  )
              }           
              return null;
            })()}
        </div>
    ) : (props.loggedInState) ? (
        <div style= {{"display":"flex", "gap":"20vh", "justifyContent":"center", "marginLeft":"200px", "marginRight":"200px"}}>
        <SearchTab children="Food" selected={false} customOnClick={()=>{props.setSelectTab("food");}}/>
        <SearchTab children="Activities" selected={false} customOnClick={()=>{props.setSelectTab("activity");}}/>
        <SearchTab children="Friends" selected={false} customOnClick={()=>{props.setSelectTab("friends");}}/>
        </div>
    ) : (props.selectTab==="food" && !props.loggedInState) ? (
        <div style= {{"display":"flex", "gap":"20vh", "justifyContent":"center", "marginLeft":"400px", "marginRight":"400px"}}>
            <SearchTab children="Food" selected={true} customOnClick={()=>{props.setSelectTab("food");}}/>
            <SearchTab children="Activities" selected={false} customOnClick={()=>{props.setSelectTab("activity");}}/>
            {(() => {
              if (document.getElementById("searchBar") != null){
                  return (
                      document.getElementById("searchBar").value=""
                  )
              }           
              return null;
            })()}
        </div>
    ) : (props.selectTab==="activity" && !props.loggedInState) ? ( 
        <div style= {{"display":"flex", "gap":"20vh", "justifyContent":"center", "marginLeft":"400px", "marginRight":"400px"}}>
            <SearchTab children="Food"  selected={false}  customOnClick={()=>{props.setSelectTab("food");}}/>
            <SearchTab children="Activities" selected={true} customOnClick={()=>{props.setSelectTab("activity");}}/>
            {(() => {
              if (document.getElementById("searchBar") != null){
                  return (
                      document.getElementById("searchBar").value=""
                  )
              }           
              return null;
            })()}
        </div>
    ) : (!props.loggedInState) ? (
        <div style= {{"display":"flex", "gap":"20vh", "justifyContent":"center", "marginLeft":"400px", "marginRight":"400px"}}>
        <SearchTab children="Food" selected={false} customOnClick={()=>{props.setSelectTab("food");}}/>
        <SearchTab children="Activities" selected={false} customOnClick={()=>{props.setSelectTab("activity");}}/>
        </div>
    ) :("");
    } catch(e){return null;}
}

export default SelectSearchTab;