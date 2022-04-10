import React from 'react';
import { GreyOutTab } from './GreyOutTab';
import '../App.css';

export const GreyOutSearchTabs = (props) =>{
    return  (props.saveToListMode) ? (
    <div style={{"display":"flex", "gap":"20vh", "justifyContent":"center", "position":"absolute", "z-index":"500", "left":"0", "right":"0"}}>
    <GreyOutTab/>
    <GreyOutTab/>
    <GreyOutTab/>
    </div>
    ):("");
}