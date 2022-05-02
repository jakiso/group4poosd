import React from 'react';
import plus from '../images/cross_add.png'
import save from '../images/LG_save_icon4.png'
import cross from '../images/LG_cross_white.png'
import { useState } from 'react';

var res_friends;
var message="";

// Save the place to be put in a folder
async function SaveFriend() {

    // e.preventDefault();

    // Used to set the mode to save a place.
    // props.setSaveToListMode(true);

    console.log("Saving Friend");


    // Store the place info locally
    var friendToSave = { 
                        friendName: document.getElementById('NewFriendName').value, 
                        friendAddress: document.getElementById('NewFriendAddress').value, 
                        friendPhone: document.getElementById('NewFriendPhone').value, 
                        friendEmail: document.getElementById('NewFriendEmail').value,
                        friendDescription: document.getElementById('NewFriendDescription').value
                    };

    localStorage.setItem('friend_data', JSON.stringify(friendToSave));
    console.log(friendToSave);

    // Path to send the api call
    var bp = require('./Path.js');
    var body;

    // Storage to access the locally stored JWT
    var storage = require('../tokenStorage.js');
    // The user data is stored as text and needs to be turned into an object
    var data = JSON.parse(localStorage.user_data);

    
    // Later this should grab values from the filter radius button, address from location button, etc.
    // keyword: search will return the same places each time regardless of the keyword since address is UCF.
    var newFriend = {userId:data.id, 
        name: document.getElementById('NewFriendName').value, 
        phone: document.getElementById('NewFriendPhone').value, 
        address: document.getElementById('NewFriendAddress').value, 
        jwToken: storage.retrieveToken(), 
        email: document.getElementById('NewFriendEmail').value, 
        notes: document.getElementById('NewFriendDescription').value};
    body = JSON.stringify(newFriend);

    // body = "{"+"\"userId\""+":"+"\""+searchActivity+"\""+","+"\"name\""+":"+"\""+latitude+"\","+"\"phone\""+":"+"\""+longitude+"\","+"\"address\""+":"+"10000"+","
    // +"\"email\""+":"+"\"\","+"\"notes\""+":"+"\"\","+"\"jwToken\""+":"+ "\""+keywordsActivity+"\"}";
    // const {userId, name, phone, address, email, notes, jwToken} = req.body;
    try
    {
        if(!(newFriend.userId=="" && newFriend.name=="" &&  newFriend.phone=="" &&  newFriend.address=="" &&
            newFriend.jwToken=="" && newFriend.email=="" && newFriend.notes=="")){
            const response_friends = await fetch(bp.buildPath('addFriend'), {method:'POST',body:body,headers:{'Content-Type':'application/json'}});

            // Wait for response and parse json
            res_friends = JSON.parse(await response_friends.text());

            // Check the error field. empty error is good
            if( res_friends.error && res_friends.error.length > 0 )
            {
                message = "API Error:" + res_friends.error;
            }
            else
            {
                message = "New Friend was successffully added";
            }
        } else {
            message = "Some field is empty for your new Friend";
        }
    }
    catch(e)
    {
        console.log(e.toString());
    }
    console.log(message);
}

export const Buttonc = (props) =>{
    return(!props.newFriendMode)?(
        <div class="search_bar_button" style={{"display":"flex", "justifyContent":"center", "marginRight":"20px", "width":"80px", "height":"auto"}}>
            <img src={plus} alt="search" style={{"margin":"auto", "height":"35px", "width":"35px", "cursor":"pointer"}}  onClick={()=>{props.setNewFriendMode(!props.newFriendMode)}}></img>
        </div>  
    ):(
        <div style={{"display":"flex", "justifyContent":"center", "columnGap":"10px","text-align": "center", "marginRight":"20px"}}>
        <div class="search_bar_button" style={{"display":"flex", "justifyContent":"center", "width":"80px", "height":"auto"}}>
            <img src={save} alt="search" style={{"margin":"auto", "height":"35px", "width":"35px", "cursor":"pointer"}} onClick={()=>{ SaveFriend();props.setNewFriendMode(!props.newFriendMode);}}></img> {/* (e) => SaveFriend(e) */}
        </div>  
        <div class="search_bar_button" style={{"display":"flex", "justifyContent":"center", "width":"80px", "height":"auto"}}>
            <img src={cross} alt="search" style={{"margin":"auto", "height":"50px", "width":"50px", "cursor":"pointer"}} onClick={()=>{props.setNewFriendMode(!props.newFriendMode)}}></img> {/* (e) => SaveFriend(e) */}
        </div>  
        </div>
    );
}