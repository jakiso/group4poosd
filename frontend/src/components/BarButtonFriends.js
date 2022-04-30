import React from 'react';
import plus from '../images/cross_add.png'
import save from '../images/LG_save_icon4.png'
import cross from '../images/LG_cross_white.png'

// Save the place to be put in a folder
const SaveFriend = async (e) => {

    e.preventDefault();

    // Used to set the mode to save a place.
    props.setSaveToListMode(true);

    console.log("Saving Friend");


    // Store the place info locally
    var friendToSave = { 
                        friendName: props.Name, 
                        friendAddress: props.Address, 
                        friendPhone: props.PhoneNumber, 
                        friendRating: props.Rating
                    };
    localStorage.setItem('friend_data', JSON.stringify(friendToSave));

    console.log(friendToSave);
}

export const Buttonc = (props) =>{
    return(!props.newFriendMode)?(
        <div class="search_bar_button" style={{"display":"flex", "justifyContent":"center", "marginRight":"20px", "width":"80px", "height":"auto"}}>
            <img src={plus} alt="search" style={{"margin":"auto", "height":"35px", "width":"35px"}}  onClick={()=>{props.setNewFriendMode(!props.newFriendMode)}}></img>
        </div>  
    ):(
        <div style={{"display":"flex", "justifyContent":"center", "columnGap":"10px","text-align": "center", "marginRight":"20px"}}>
        <div class="search_bar_button" style={{"display":"flex", "justifyContent":"center", "width":"80px", "height":"auto"}}>
            <img src={save} alt="search" style={{"margin":"auto", "height":"35px", "width":"35px"}} onClick={()=>{props.setNewFriendMode(!props.newFriendMode)}}></img> {/* (e) => SaveFriend(e) */}
        </div>  
        <div class="search_bar_button" style={{"display":"flex", "justifyContent":"center", "width":"80px", "height":"auto"}}>
            <img src={cross} alt="search" style={{"margin":"auto", "height":"50px", "width":"50px"}} onClick={()=>{props.setNewFriendMode(!props.newFriendMode)}}></img> {/* (e) => SaveFriend(e) */}
        </div>  
        </div>
    );
}