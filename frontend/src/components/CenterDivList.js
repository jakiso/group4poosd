import '../App.css';

export const CenterDivList = (props) =>{
    return  <div className='main_pane' style={{"height": "80vh","width": "100%",
        "marginTop": "0px", "overflow":"auto", "position":"relative"}}>{props.children}</div>
}