import React from 'react';
import '../App.css';

export const GreyOutCardUI = (props) =>{
    return (props.saveToListMode) ? (
            <div className='main_pane' style={{"height": "125%","width": "100%",
                "marginTop": "0px", "overflow":"auto", "background":"rgba(0, 0, 0, 0.8)", "position":"absolute", "top":"0em"}}>{props.children}</div>
     )
     :(props.editMode) ? (
        <div className='main_pane' style={{"height": "125%","width": "100%",
                "marginTop": "0px", "overflow":"auto", "background":"rgba(0, 0, 0, 0.8)", "position":"absolute", "top":"0em"}}>{props.children}</div>
)
    :("");
}