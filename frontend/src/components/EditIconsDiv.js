import '../App.css';
import del from '../images/cross_delete.png';
import rename from '../images/LG_edit_pen.png';

function EditIconsDiv(props){
    var res;

    const DeleteFolder = async event => {
        
        // Storage to access the locally stored JWT
        var storage = require('../tokenStorage.js');

        // The object to be sent to the api, must contain folderId and jwToken field
        var obj = {folderId:props.folderId, jwToken:storage.retrieveToken()};
        var js = JSON.stringify(obj);

        // Path to send the api call
        var bp = require('./Path.js');

        // grabbing folder name to display in window prompt.
        try {
            
            const folder = await fetch(bp.buildPath('retrieveFolder'), {method:'POST', body:js, headers:{'Content-Type':'application/json'}});
            res = JSON.parse(await folder.text());

            // if cancel button is clicked on deleting a folder, return out of function and dont delete.
            if (!window.confirm('Confirm deletion of ' + '\'' + res.message.folderName + '\'' + ' list.'))
                return;
        } 
        catch(e) {
            console.log(e.toString());
        }

        try
        {
            // Request folders and JWT
            const response = await fetch(bp.buildPath('deleteFolder'), {method:'POST',body:js,headers:{'Content-Type':'application/json'}});

            // Wait for response and parse json
            res = JSON.parse(await response.text());

            // Check the error field. empty error is good
            if( res.error && res.error.length > 0 )
            {
                console.log(res.error);
            }
            else
            {
                // Store the received refreshed JWT
                storage.storeToken( res.jwToken );                
            }
        }
        catch(e)
        {
            console.log(e.toString());
        }
        let opposite = !(props.update)
        props.setUpdate(opposite)
    };

    // console.log(props)

    //return div with cross and pen inside folder button (only if edit_icons==true)
    return (props.edit_icons) ? (
    <div style={{"display":"flex", "justifyContent":"center", "columnGap":"4vh", "marginTop":"1vh", "overflow":"auto", "marginLeft": "0vh"}}>
        <div style={{"height":"40px", "width":"40px", "overflow":"hidden"}}>
            <input type="image" src={del} alt="delete" id="delete" style={{"width":"100%", "height":"100%"}} onClick={() => {
                DeleteFolder()
                }}/>
        </div>  
        <div style={{"display":"30px", "width":"30px", "overflow":"hidden", "objectFit":"contain", "paddingTop":"1px"}}>
            <input type="image" src={rename} alt="rename" id="rename" style={{"width":"90%", "height":"90%"}}
            onClick={() => {
                props.setIsDisabled(false)
                // when the rename button is clicked, stores the id
                props.setThisFolderId(props.folderId)
                }}/>
        </div>  
    </div>
    ) :(props.newListMode) ? (
        // this is the behavior of the edit icons in the case that we are adding a temporary listButton
        <div style={{"display":"flex", "justifyContent":"center", "columnGap":"4vh", "marginTop":"1vh", "overflow":"auto", "marginLeft": "0.5vh"}}>
        <div style={{"height":"40px", "width":"40px", "overflow":"hidden"}}>
            <input type="image" src={del} alt="delete" id="delete" style={{"width":"100%", "height":"100%"}} onClick={()=>{props.setNewListMode(false)}}/>
        </div>  
        <div style={{"display":"30px", "width":"30px", "overflow":"hidden", "objectFit":"contain", "paddingTop":"1px"}}>
            <input type="image" src={rename} alt="rename" id="rename" style={{"width":"90%", "height":"90%"}} onClick={() => {
                // this is for disabling the edit after adding the folder.
                props.setIsDisabled(false)
            }}/>
        </div>  
    </div>
    ): "";

}
export default EditIconsDiv;