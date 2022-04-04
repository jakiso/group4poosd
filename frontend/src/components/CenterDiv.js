import '../App.css';

export const CenterDiv = (props) =>{
    return  <div className='main_pane' style={{"height": "80%","width": "100%",
        "marginTop": "0px", "overflow":"auto", "position":"relative"}}>{props.children}</div>
}