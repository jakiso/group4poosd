import '../App.css';
import { Buttonb } from './Button';
import styled from 'styled-components'

const Buttona = styled(Buttonb)`
    margin-top: 0px;
    height: 50px;
    margin-left:auto;
    margin-right:auto;
`

export const AddPlacePopUp = (props) =>{
    return (props.setSaveToListMode && !props.editMode) ? (  
        <div className='main_pane' style={{"height": "30%","width": "30%",
        "marginTop": "0px", "overflow":"auto", "position":"relative", "background":"#20CEF2", "top":"15%", "line-height": "200%"}}>
            <div style={{"display":"grid"}}>
            <br/><br/><br/>
           <p style={{"paddingLeft":"50px", "paddingRight":"50px"}}>SELECT list you wish to add to on the left</p>
           <br/>
           <Buttona button_text="cancel" onClick={()=>{props.setSaveToListMode(false);}}/>
           </div>
        </div>
    ): ("");
}