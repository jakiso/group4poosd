import React from 'react';
import { Buttonc } from './CardButton';
import styled from 'styled-components';
import '../App.css';
import {Carda}  from './Card';
import event_pic from '../images/LG_event.png';
import cross from '../images/cross_add.png';
import { SearchBar } from './SearchBar';

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

function CardsUI()
{
    return(
        // Use:
        // Name="" Address="" PhoneNumber="" MoreInfo="" Description="" Rating=""
        // To define Info per card
        <div style={{"display":"grid", "rowGap": "3rem", "top":"0px", "margin":"5%"}}>
            <SearchBar/>
            <InfoCard Name="McDonalds" Address="3737 Pine Tree Lane" PhoneNumber="231-714-5572" MoreInfo="..." DescriptionText="Fast Convenient" Rating="3.1"/>
            <InfoCard Name="Comfort Food" Address="2055 Stanley Avenue" PhoneNumber="860-928-5548" MoreInfo="..." DescriptionText="Food you'll Love" Rating="4.0"/>
            <InfoCard Name="Coffee Shop" Address="3868 Holt Street" PhoneNumber="561-292-8638" MoreInfo="..." DescriptionText="Keep Calm and have some Coffee" Rating="4.9"/>
        </div>
    )
};

export default CardsUI;