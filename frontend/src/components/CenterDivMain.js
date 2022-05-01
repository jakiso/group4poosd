import '../App.css';

export const CenterDivMain = (props) =>{
    return  <div className='main_pane' style={{"height": "80vh","width": "100%",
        "marginTop": "0px", "overflow":"auto", "position":"absolute"}}>{props.children}</div>
}