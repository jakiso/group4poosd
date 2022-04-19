import React, {useState} from 'react';
import { Buttonb } from './Button';
import styled from 'styled-components';
import '../App.css';
import ListButton from './ListButton';
import ListType from './ListType';

const SaveButton = styled(Buttonb)`
    width: 100%;
    height: 50px;
    background: #20CEF2;
    margin-top: 20px;
`

const AddButton = styled(Buttonb)`
    width: 100%;
    height: 50px;
    background: limegreen;
    margin-top: 20px;
`

function EditMode(props){
    var [newListMode, setNewListMode] = useState(false);


    // try catch is needed for when page intially loads
    try{
    // when editMode==true return a SaveButton, AddButton and ListButtons (with edit_icons)
    return (props.editMode) ? ( 
        <div>
        {/* if editMode==true, this SaveButton can turn set editMode back to false */}
        <SaveButton button_text="Save" onClick={()=>{props.setEditMode(false); setNewListMode(false);}}/>
        <AddButton button_text="Add" onClick={()=>{setNewListMode(true);}}/>

        <ListButton button_text={"_________"} newListMode={newListMode} setNewListMode={setNewListMode}/>

        <ListType edit_icons={true} arr_food={props.arr_food} arr_activity={props.arr_activity} folderType={props.folderType} setSaveToListMode={props.setSaveToListMode}/>

        </div>
    ) :(     // when editMode is set to false with the SaveButton, only ListButtons (without edit_icons)
        <div> 
        
        <ListType edit_icons={false} arr_food={props.arr_food} arr_activity={props.arr_activity} folderType={props.folderType} setSaveToListMode={props.setSaveToListMode}/>

        </div>
    );
    } catch(e){return null;}
}

export default EditMode;