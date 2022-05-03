import React, {useState, useEffect} from 'react';
import { Buttonc } from './CardButton';
import styled from 'styled-components';
import '../App.css';
import { Carda }  from './Card';
import { Cardb } from './NewFriendCard';
import SearchBar from './SearchBar';
import food_pic from '../images/LG_food.png';
import event_pic from '../images/LG_event.png';
import friend_pic from '../images/LG_friend.png';
import globe from '../images/LG_globe.png';

import { useUpdateList } from './ListContext';
import { useList } from "./ListContext";
import { Cardc } from './CardFriend';

const InfoCard = styled(Carda)`

`

const FriendCard = styled(Cardc)`

`

const ListButton = styled(Buttonc)`
width: 100%;
height: 50px;
`
const Description = styled(Buttonc)`
width: 100%;
height: 100%;
`

var res_food, res_activity, res_friends;

function CardsUI(props)
{
    // Path to send the api call
    var bp = require('./Path.js');

    // Use state for a message if needed
    const [message, setMessage] = useState('');

    // useState for setting the list of folders after its been loaded
    var [placeListFood, setPlaceListFood] = useState([]);
    var [placeListActivity, setPlaceListActivity] = useState([]);
    var [friendList, setFriendList] = useState([]);

    var [searchFood, setSearchFood] = useState("");
    var [searchActivity, setSearchActivity] = useState("");
    var [searchFriend, setSearchFriend] = useState("");

    // for update Friends on delete.
    var [update, setUpdate] = useState(false);

    var [keywordsFood, setKeywordsFood] = useState([]);
    var [keywordsActivity, setKeywordsActivity] = useState([]);

    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [city, setCity] = useState("");

    const [newFriendMode, setNewFriendMode] = useState(false);

    var body;

    // for initial picture grab from google.
    function pictureGrab(photos, tab) {

        try {
            let data = {}
            let url = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=80&photoreference="
            let photoRef = photos[0].photo_reference
            let imageUrl = url + photoRef + '&key=' + 'AIzaSyCrrdE-dys1s1dgqJYWvCuLfbQEHN3sYag';

            return imageUrl;

        } catch(e)
        {
            console.log(e)
            if (tab === 'food')
                return food_pic;
            else if (tab === 'activity')
                return event_pic;
            else
                return friend_pic;
        }
    }

    // for retrieving picture from a place after we save it.
    function savedPicture(placeImg, tab){
        console.log(placeImg)
        if (placeImg === '')
        {
            if (tab === 'food')
                return food_pic;
            else if (tab === 'activity')
                return event_pic;
            else
                return friend_pic;
        }
        else{
            return placeImg;
        }
    }

    // API call function
    const RetrievePlaces = async () => {
        
        // Later this should grab values from the filter radius button, address from location button, etc.
        // keyword: search will return the same places each time regardless of the keyword since address is UCF.
        var searchObj = {address:"UCF", latitude:"", longitude:"", radius: 10000, jwToken: "", pageToken:"", keyword:""};
        searchObj = JSON.stringify(searchObj);

        // Storage to access the locally stored JWT
        var storage = require('../tokenStorage.js');

        if(props.selectTab==="food") {

            body = "{"+"\"address\""+":"+"\""+searchFood+"\""+","+"\"latitude\""+":"+"\""+latitude+"\","+"\"longitude\""+":"+"\""+longitude+"\","+"\"radius\""+":"+"10000"+","
            +"\"jwToken\""+":"+"\"\","+"\"pageToken\""+":"+"\"\","+"\"keyword\""+":"+ "\""+keywordsFood+"\"}";

            const response_food = await fetch(bp.buildPath('nearbyFoodSearch'), {method:'POST',body:body,headers:{'Content-Type':'application/json'}});
            
            // Wait for response and parse json
            res_food = JSON.parse(await response_food.text());
            console.log(res_food)
            // Check the error field. empty error is good
            if( res_food.error && res_food.error.length > 0 )
            {
                setMessage( "API Error:" + res_food.error);
            }
            else
            {
                // uses the useState to change the value of storedFolders
                setPlaceListFood(res_food.results.slice(0, Object.keys(res_food.results).length).map(({ name, vicinity, rating, types, formatted_phone_number, website, photos}, index) => (
                            <InfoCard key={index} Name={name} Address={vicinity} PhoneNumber={formatted_phone_number} placeWebsite={website} DescriptionText={types.toString().replaceAll("_"," ").replaceAll(",",", ").replaceAll(", point of interest","").replaceAll(", establishment","")} Rating={rating} 
                                src={pictureGrab(photos, props.selectTab)} setSaveToListMode={props.setSaveToListMode}/>
                        ))
                );

                console.log(await placeListFood);
                // updateList(placeListFood);
                List = placeListFood;
                console.log(List);


            }

            setLatitude("");
            setLongitude("");

        }
        else if (props.selectTab==="activity") {

            body = "{"+"\"address\""+":"+"\""+searchActivity+"\""+","+"\"latitude\""+":"+"\""+latitude+"\","+"\"longitude\""+":"+"\""+longitude+"\","+"\"radius\""+":"+"10000"+","
            +"\"jwToken\""+":"+"\"\","+"\"pageToken\""+":"+"\"\","+"\"keyword\""+":"+ "\""+keywordsActivity+"\"}";

            const response_activity = await fetch(bp.buildPath('nearbyActivitySearch'), {method:'POST',body:body,headers:{'Content-Type':'application/json'}});

            // Wait for response and parse json
            res_activity = JSON.parse(await response_activity.text());

            // Check the error field. empty error is good
            if( res_activity.error && res_activity.error.length > 0 )
            {
                setMessage( "API Error:" + res_activity.error);
            }
            else
            {
                // uses the useState to change the value of storedFolders
                setPlaceListActivity(res_activity.results.slice(0, Object.keys(res_activity.results).length).map(({ name, vicinity, rating, types, formatted_phone_number, website, photos}, index) => (
                            <InfoCard key={index} Name={name} Address={vicinity} PhoneNumber={formatted_phone_number} placeWebsite={website} DescriptionText={types.toString().replaceAll("_"," ").replaceAll(",",", ").replaceAll(", point of interest","").replaceAll(", establishment","")} Rating={rating} 
                                src={pictureGrab(photos, props.selectTab)} setSaveToListMode={props.setSaveToListMode}/>
                            ))
                );

                updateList(placeListActivity);
                console.log(List);


            }

            setLatitude("");
            setLongitude("");

        } 
        else if (props.selectTab==="friends") {

            if(searchFriend==""){
                // The user data is stored as text and needs to be turned into an object
                var data = JSON.parse(localStorage.user_data);


                body = "{"+"\"userId\""+":"+data.id+","+"\"jwToken\""+":"+ "\""+storage.retrieveToken()+"\"}";


                const response_friends = await fetch(bp.buildPath('retrieveFriends'), {method:'POST',body:body,headers:{'Content-Type':'application/json'}});

                // Wait for response and parse json
                res_friends = JSON.parse(await response_friends.text());

                // Check the error field. empty error is good
                if( res_friends.error && res_friends.error.length > 0 )
                {
                    setMessage( "API Error:" + res_friends.error);
                }
                else
                {

                    // uses the useState to change the value of storedFolders
                    setFriendList(res_friends.friends.slice(0, Object.keys(res_friends.friends).length).map(({ name, address, email, phone, notes, friendId }) => (
                                <FriendCard key={friendId} Name={name} Address={address} PhoneNumber={phone} MoreInfo={email} DescriptionText={notes} friendId={friendId} Rating="5.0" src={friend_pic} setUpdate={setUpdate} setSaveToListMode={props.setSaveToListMode}/>
                                ))
                    );
                }
            } else {
                // The user data is stored as text and needs to be turned into an object
                var data = JSON.parse(localStorage.user_data);


                body = "{"+"\"userId\""+":"+data.id+","+"\"search\""+":"+ "\""+searchFriend+"\""+","+"\"jwToken\""+":"+ "\""+storage.retrieveToken()+"\"}";


                const response_friends = await fetch(bp.buildPath('searchFriends'), {method:'POST',body:body,headers:{'Content-Type':'application/json'}});

                // Wait for response and parse json
                res_friends = JSON.parse(await response_friends.text());

                // Check the error field. empty error is good
                if( res_friends.error && res_friends.error.length > 0 )
                {
                    setMessage( "API Error:" + res_friends.error);
                }
                else
                {

                    // uses the useState to change the value of storedFolders
                    setFriendList(res_friends.message.slice(0, Object.keys(res_friends.message).length).map(({ name, address, email, phone, notes, friendId }) => (
                                <FriendCard key={friendId} Name={name} Address={address} PhoneNumber={phone} MoreInfo={email} DescriptionText={notes} friendId={friendId} Rating="5.0" src={friend_pic} setUpdate={setUpdate} setSaveToListMode={props.setSaveToListMode}/>
                                ))
                    );
                }

            }

        } 
        else {
            
        }
    }

    useEffect(() => {
        RetrievePlaces();
    }, [searchFood, searchActivity, searchFriend, keywordsFood, keywordsActivity, props.selectTab, newFriendMode, update]);

    let List = useList();
    const updateList = useUpdateList();

    useEffect(() => {
        console.log("The list has changed");

        console.log(props.selectTab);
        console.log(List);

        if (props.selectTab === "food" && List !== undefined && List.length !== 0)
        {
            setPlaceListFood(List.map(({folderId, placeName, placeAddress, placeRating, placeDescription, index, placePhone, placeWebsite, placeImg }) => (
                <InfoCard key={index} buttonId={folderId} Name={placeName} Address={placeAddress} PhoneNumber={placePhone} placeWebsite={placeWebsite} 
                    DescriptionText={placeDescription} Rating={placeRating} src={savedPicture(placeImg, props.selectTab)} setSaveToListMode={props.setSaveToListMode}
                    />
                ))
            );
        }

        if (props.selectTab === "activity" && List !== undefined && List.length !== 0)
        {
            setPlaceListActivity(List.map(({folderId, placeName, placeAddress, placeRating, placeDescription, index, placePhone, placeWebsite, placeImg }) => (
                <InfoCard key={index} buttonId={folderId} Name={placeName} Address={placeAddress} PhoneNumber={placePhone} placeWebsite={placeWebsite} 
                    DescriptionText={placeDescription} Rating={placeRating} src={savedPicture(placeImg, props.selectTab)} setSaveToListMode={props.setSaveToListMode}
                    />
                ))
            );
        }
        console.log("end");

    }, [List]);

    return(props.selectTab==="food")?(
        // Use:
        // Name="" Address="" PhoneNumber="" MoreInfo="" Description="" Rating=""
        // To define Info per card
        <div style={{"display":"grid", "rowGap": "3rem", "top":"0px", "margin":"5%", "marginTop":"0%","position":"relative","zIndex":"0"}}>
        <SearchBar setSearchFood={setSearchFood} setKeywordsFood={setKeywordsFood} selectTab={props.selectTab} setLatitude={setLatitude} 
        setLongitude={setLongitude} latitude={latitude} longitude={longitude} setCity={setCity} city={city}  setPlaceListFood={setPlaceListFood}/>
        {placeListFood}
        </div>
    ): (props.selectTab==="activity")?(
        <div style={{"display":"grid", "rowGap": "3rem", "top":"0px", "margin":"5%", "marginTop":"0%","position":"relative","zIndex":"0"}}>
        <SearchBar setSearchActivity={setSearchActivity}  setKeywordsActivity={setKeywordsActivity} selectTab={props.selectTab} setLatitude={setLatitude} 
        setLongitude={setLongitude} latitude={latitude} longitude={longitude} setCity={setCity} city={city}  setPlaceListActivity={setPlaceListActivity}/>
        {placeListActivity}
    </div>
    ):(props.selectTab==="friends")?(
        <div style={{"display":"grid", "rowGap": "3rem", "top":"0px", "margin":"5%", "marginTop":"0%","position":"relative","zIndex":"0"}}>
        <SearchBar setSearchFriend={setSearchFriend} selectTab={props.selectTab}  newFriendMode={newFriendMode} setNewFriendMode={setNewFriendMode}/>

        {/* add new friend */}
        <Cardb className="tempFriend" src={friend_pic} setSaveToListMode={props.setSaveToListMode} newFriendMode={newFriendMode} setNewFriendMode={setNewFriendMode}/>
        {friendList}
    </div>
    ): (
        <div style={{"height":"auto","width":"100%"}}>
            <div style={{"height":"auto","width":"100rem", "display":"flex", "margin":"5% auto"}}>
                
                <div style={{"width":"100%"}}>
                    <br/>
                    <p className="welcome">
                        Want to do something<br/>
                        but don't know what?<br/>
                        Let's find that thing!<br/><br/>
                        choose a tab to start
                    </p>  
                    <br/><br/><br/><br/>
                </div>

                <div style={{"height":"100%","width":"100%", "overflow":"auto"}}>
                    <img width={"600rem"} height={"auto"} src={globe} alt="Event"/><br/><br/>
                </div>

            </div>
        </div>    
    );
};

export default CardsUI;