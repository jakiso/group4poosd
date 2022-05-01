import React from 'react';
import { GreyOutTab } from './GreyOutTab';
import '../App.css';

export const GreyOutSearchTabs = (props) =>{
    return  (props.saveToListMode || props.editMode) ? (
    <div style={{"display":"flex", "gap":"20vh", "justifyContent":"center", "position":"absolute", "zIndex":"500",  "margin-left": "200px", "margin-right": "200px"}}>
    <GreyOutTab/>
    <GreyOutTab/>
    <GreyOutTab/>
    </div>
    ):("");
}