import React from 'react';
import '../App.css';

export const GreyOutCardUI = (props) =>{
    return (props.saveToListMode) ? (
            <div className='main_pane_grey' style={{"background":"rgba(0, 0, 0, 0.8)"}}>{props.children}</div>
     )
     :(props.editMode) ? (
        <div className='main_pane_grey' style={{"background":"rgba(0, 0, 0, 0.8)"}}>{props.children}</div>
)
    :("");
}