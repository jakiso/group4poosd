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

        try
        {
            // Request folders and JWT
            const response = await fetch(bp.buildPath('deleteFolder'), {method:'POST',body:js,headers:{'Content-Type':'application/json'}});

            // Wait for response and parse json
            res = JSON.parse(await response.text());

            // Check the error field. empty error is good
            if( res.error && res.error.length > 0 )
            {
                //setMessage( "API Error:" + res.error );
                console.log('Line 37 FolderEditMode');
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
    };

    // for now just a console popup.
    const openInputField = async event => {

        // Storage to access the locally stored JWT
        var storage = require('../tokenStorage.js');

        // The object to be sent to the api, must contain userId and jwToken field
        var obj = {folderId:props.folderId, jwToken:storage.retrieveToken()};
        var js = JSON.stringify(obj);

        // Path to send the api call
        var bp = require('./Path.js');

        try
        {
            // Request singular folder for name display in prompt.
            const response = await fetch(bp.buildPath('retrieveFolder'), {method:'POST',body:js,headers:{'Content-Type':'application/json'}});

            // Wait for response and parse json
            res = JSON.parse(await response.text());

            // Check the error field. empty error is good
            if( res.error && res.error.length > 0 )
            {
                //setMessage( "API Error:" + res.error );
                console.log('Line 37 FolderEditMode');
                console.log(res.error);
                return;
            }
            else
            {
                // Store the received refreshed JWT
                storage.storeToken( res.jwToken );

                // popup prompt for changing the name of the folder. for aesthetic should prob be changed later.
                let newFolderName = window.prompt("New Folder Name:", res.message.folderName);

                // do nothing if cancelled, field blank or null
                if (newFolderName == null || newFolderName == ""){return;}

                // since longer text destroys the UI, preventing longer names from being input for now.
                if(newFolderName.length > 8)
                {
                    window.alert("Choose a name less than 9 characters!");
                    return;
                }
                changeFolderName(newFolderName);
            }
        }
        catch(e)
        {
            console.log(e.toString());
        }


        
    };

    // new folder name passed as argument, changes the folder in the database to the new folder name.
    const changeFolderName = async function(newFolderName) 
    {
        // Storage to access the locally stored JWT
        var storage = require('../tokenStorage.js');

        // The object to be sent to the api, must contain folderId and jwToken field
        var obj = {folderId:props.folderId, newFolderName:newFolderName, jwToken:storage.retrieveToken()};
        var js = JSON.stringify(obj);

        // Path to send the api call
        var bp = require('./Path.js');

        try
        {
            // attempt to change folder name.
            const response = await fetch(bp.buildPath('changeFolderName'), {method:'POST',body:js,headers:{'Content-Type':'application/json'}});

            // Wait for response and parse json
            res = JSON.parse(await response.text());

            // Check the error field. empty error is good
            if( res.error && res.error.length > 0 )
            {
                //setMessage( "API Error:" + res.error );
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
    }

    //return div with cross and pen inside folder button (only if edit_icons==true)
    return (props.edit_icons) ? (
    <div style={{"display":"flex", "justifyContent":"center", "columnGap":"4vh", "marginTop":"1vh", "overflow":"auto"}}>
        <div style={{"height":"40px", "width":"40px", "overflow":"hidden"}}>
            <input type="image" src={del} alt="delete" id="delete" style={{"width":"100%", "height":"100%"}} onClick={DeleteFolder}/>
        </div>  
        <div style={{"display":"30px", "width":"30px", "overflow":"hidden", "objectFit":"contain", "paddingTop":"1px"}}>
            <input type="image" src={rename} alt="rename" id="rename" style={{"width":"90%", "height":"90%"}} onClick={openInputField}/>
        </div>  
    </div>
    ) :(props.newListMode) ? (
        // this is the behavior of the edit icons in the case that we are adding a temporary listButton
        <div style={{"display":"flex", "justifyContent":"center", "columnGap":"4vh", "marginTop":"1vh", "overflow":"auto"}}>
        <div style={{"height":"40px", "width":"40px", "overflow":"hidden"}}>
            <input type="image" src={del} alt="delete" id="delete" style={{"width":"100%", "height":"100%"}} onClick={()=>{props.setNewListMode(false)}}/>
        </div>  
        <div style={{"display":"30px", "width":"30px", "overflow":"hidden", "objectFit":"contain", "paddingTop":"1px"}}>
            <input type="image" src={rename} alt="rename" id="rename" style={{"width":"90%", "height":"90%"}}/>
        </div>  
    </div>
    ): "";

}
export default EditIconsDiv;