import React from 'react';
import { Buttonc } from './CardButton';
import styled from 'styled-components';
import '../App.css';
import {Carda}  from './Card';
import { SearchBar } from './SearchBar';
import food_pic from '../images/LG_food.png';
import event_pic from '../images/LG_event.png';
import friend_pic from '../images/LG_friend.png';

const InfoCard = styled(Carda)`
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

function CardsUI(props)
{
    return(props.selectTab==="food")?(
        // Use:
        // Name="" Address="" PhoneNumber="" MoreInfo="" Description="" Rating=""
        // To define Info per card
        <div style={{"display":"grid", "rowGap": "3rem", "top":"0px", "margin":"5%"}}>
            <SearchBar/>
            <InfoCard Name="McDonalds" Address="3737 Pine Tree Lane" PhoneNumber="231-714-5572" MoreInfo="..." DescriptionText="Fast Convenient" Rating="3.1" src={food_pic} setSaveToListMode={props.setSaveToListMode}/>
            <InfoCard Name="Comfort Food" Address="2055 Stanley Avenue" PhoneNumber="860-928-5548" MoreInfo="..." DescriptionText="Food you'll Love" Rating="4.0" src={food_pic} setSaveToListMode={props.setSaveToListMode}/>
            <InfoCard Name="Coffee Shop" Address="3868 Holt Street" PhoneNumber="561-292-8638" MoreInfo="..." DescriptionText="Keep Calm and have some Coffee" Rating="4.9" src={food_pic} setSaveToListMode={props.setSaveToListMode}/>
        </div>
    ): (props.selectTab==="activities")?(
        <div style={{"display":"grid", "rowGap": "3rem", "top":"0px", "margin":"5%"}}>
        <SearchBar/>
        <InfoCard Name="Road Trip" Address="3865 Holt Street" PhoneNumber="305-714-5560" MoreInfo="..." DescriptionText="Sights like you've Never Seen" Rating="3.1" src={event_pic} setSaveToListMode={props.setSaveToListMode}/>
        <InfoCard Name="Kyaking" Address="2229 Southside Lane" PhoneNumber="215-268-9864" MoreInfo="..." DescriptionText="Row your Boat" Rating="4.0" src={event_pic} setSaveToListMode={props.setSaveToListMode}/>
        <InfoCard Name="Concert" Address="2852 Tinker Field" PhoneNumber="479-214-5874" MoreInfo="..." DescriptionText="Dance Dance Dance" Rating="4.9" src={event_pic} setSaveToListMode={props.setSaveToListMode}/>
    </div>
    ):(props.selectTab==="friends")?(
        <div style={{"display":"grid", "rowGap": "3rem", "top":"0px", "margin":"5%"}}>
        <SearchBar/>
        <InfoCard Name="Anna Himenez" Address="3020 Pike Street" PhoneNumber="856-506-3605" MoreInfo="..." DescriptionText="Like 4 Like" Rating="3.1" src={friend_pic} setSaveToListMode={props.setSaveToListMode}/>
        <InfoCard Name="Jeff Downey" Address="1015 Briarwood Drive" PhoneNumber="321-837-7259" MoreInfo="..." DescriptionText="Foodie" Rating="4.0" src={friend_pic} setSaveToListMode={props.setSaveToListMode}/>
        <InfoCard Name="Cory Bartson" Address="888 Rosemont Avenue" PhoneNumber="321-885-2673" MoreInfo="..." DescriptionText="Travel" Rating="4.9" src={friend_pic} setSaveToListMode={props.setSaveToListMode}/>
    </div>
    ):"";
};

export default CardsUI;