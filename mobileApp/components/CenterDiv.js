import '../App.css';

export const CenterDiv = (props) =>{
    return  <div className='main_pane' style={{"height": "80%","width": "100%",
        "margin-top": "0px", "overflow":"auto"}}>{props.children}</div>
}