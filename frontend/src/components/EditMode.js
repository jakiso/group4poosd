import React, {useState, useEffect} from 'react';
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

    // tracks if the name change of a folder happens. if so, change it in the database.
    var [newName, setNewname] = useState("")

    // try catch is needed for when page intially loads
    try{
    // when editMode==true return a SaveButton, AddButton and ListButtons (with edit_icons)
    return (props.editMode) ? ( 
        <div>
        {/* if editMode==true, this SaveButton can turn set editMode back to false */}
        <SaveButton button_text="Save" onClick={()=>{
            // here we want to grab all of the folders names inside of the text field.
            // if they are different than what the actual folder is, change it in the database and retrieve folders again(refresh).

            props.setEditMode(false); 
            setNewListMode(false);}
            
            }/>
        <AddButton button_text="Add" onClick={()=>{setNewListMode(true);}}/>

        <ListButton button_text={"_________"} newListMode={newListMode} setNewListMode={setNewListMode} 
            update={props.update} setUpdate={props.setUpdate}/>

        <ListType edit_icons={true} arr_food={props.arr_food} arr_activity={props.arr_activity} 
        folderType={props.folderType} setSaveToListMode={props.setSaveToListMode} update={props.update} 
            setUpdate={props.setUpdate}/>

        </div>
    ) :(     // when editMode is set to false with the SaveButton, only ListButtons (without edit_icons)
        <div> 
        
        <ListType edit_icons={false} arr_food={props.arr_food} arr_activity={props.arr_activity} folderType={props.folderType} setSaveToListMode={props.setSaveToListMode}/>

        </div>
    );
    } catch(e){return null;}
}

export default EditMode;