import React, { useState, useEffect } from 'react';
import '../App.css';
import { ListsTab } from '../components/ListsTab';
import TopMarginMain from '../components/TopMarginMain';
import { Buttonb } from '../components/Button';
import { CenterDivMain } from '../components/CenterDivMain';
import { CenterDivList } from '../components/CenterDivList';
import styled from 'styled-components'
import ListsUI from '../components/ListsUI';
import CardsUI from '../components/CardsUI';
import SelectSearchTab from '../components/SelectSearchTab';
import {GreyOutSearchTabs} from '../components/GreyOutSearchTabs';
import { GreyOutCardUI } from '../components/GreyOutCardUI';
import { AddPlacePopUp } from '../components/AddPalcePopUp';
import { LogoutButton } from '../components/Logout';

// For context
import { ListProvider } from '../components/ListContext';

const Buttona = styled(Buttonb)`
    background: #000000;
`

function MainPage() {
    
    const tabs = ["", "food", "activity", "friends"];
    var [selectTab, setSelectTab] = useState(tabs[0]);
    var [saveToListMode, setSaveToListMode] = useState(false);
    // useState for setting the editMode
    var [editMode, setEditMode] = useState(false);
    var [loggedInState, setLoggedInState] = useState(false);

    function checkLoggedIn(){
        if(localStorage.getItem('user_data') !== null){
            setLoggedInState(true);
        } else {
            setLoggedInState(false);
        };
      }
      
      useEffect(() => {
        checkLoggedIn();
      },[]);    

    return ( loggedInState ) ?( // This is the logged in version of main page
        <body className="background">
            <div className="wrapper" style={{"display":"grid", "gridTemplateRows":"1fr 100%", "justifyContent":"center", "width":"150rem", "height":"auto", "marginLeft":"auto", "marginRight":"auto"}}>
            <TopMarginMain loggedInState={loggedInState}/>
                <ListProvider>
                {/* <div className="wrapper" style={{"display":"grid", "gridTemplateColumns":"1fr 4fr 100%", "columnGap":"1rem", "height":"100vh"}}> */}
                <div className="wrapper" style={{"display":"flex", "columnGap":"1rem"}}>
                    <div className="wrapper" style={{"display":"grid", "gridTemplateRows":"1fr 100%"}}>
                        <ListsTab children="Lists"/>
                        <div>
                            <CenterDivList className='main_pane'>
                                <ListsUI setSaveToListMode={setSaveToListMode} saveToListMode={saveToListMode} selectTab={selectTab} editMode={editMode} setEditMode={setEditMode} />
                            </CenterDivList>
                        </div>
                    </div>
                    <div className="wrapper" style={{"display":"grid", "gridTemplateRows":"1fr 100%"}}>
                        <div style={{"position":"relative", "marginLeft":"auto", "marginRight":"auto"}}>
                            <GreyOutSearchTabs saveToListMode={saveToListMode} editMode={editMode}/>  {/* only shows when saveToListMode is true */}
                            <SelectSearchTab selectTab={selectTab} setSelectTab={setSelectTab} loggedInState={loggedInState}/>
                        </div>
                        <div className="wrapper" style={{"display":"grid", "gridTemplateRows":"1fr 100%", "zIndex":"0", "position":"sticky"}}>
                            <CenterDivMain className='main_pane'>
                                <CardsUI setSaveToListMode={setSaveToListMode} selectTab={selectTab}/>
                            </CenterDivMain>
                            <GreyOutCardUI saveToListMode={saveToListMode} editMode={editMode}> {/* only shows when saveToListMode is true */}
                                    <AddPlacePopUp setSaveToListMode={setSaveToListMode} editMode={editMode}/>
                            </GreyOutCardUI>
                        </div>
                    </div>
                </div>
                </ListProvider>
            </div>
        </body>

    ):( // This is the guest version of main page
        <div className="background">
            <div className="wrapper" style={{"display":"grid", "gridTemplateRows":"1fr 100%", "justifyContent":"center", "width":"150rem", "height":"auto", "marginLeft":"auto", "marginRight":"auto"}}>
                <TopMarginMain loggedInState={loggedInState}/>
                <div className="wrapper" style={{"display":"grid", "height":"100vh"}}>

                    <div className="wrapper" style={{"display":"grid", "gridTemplateRows":"1fr 100%"}}>
                        <div style={{"position":"relative", "marginLeft":"auto", "marginRight":"auto"}}>
                            <SelectSearchTab selectTab={selectTab} setSelectTab={setSelectTab} loggedInState={loggedInState}/>
                        </div>
                        <div>
<<<<<<< HEAD
                        {/* Using CenterDivList here for the Size measurements are not the same when logged in */}
=======
>>>>>>> 3ba5f5b2 (Guest Page Centering center div)
                        <CenterDivList className='main_pane' height={"100%"} width={"100%"}>
                            <CardsUI setSaveToListMode={setSaveToListMode} selectTab={selectTab}/>
                        </CenterDivList>
                        </div>
                    </div>
                </div>
            </div>
        </div>    
        // <body className="background">
        //     {console.log("Logged IN??? "+ loggedInState)}
        //     <div className="wrapper" style={{"display":"grid", "gridTemplateRows":"1fr 100%", "justifyContent":"center", "width":"150rem", "height":"auto", "marginLeft":"auto", "marginRight":"auto"}}>
        //     <TopMarginMain loggedInState={loggedInState}/>
        //         <ListProvider>
        //         {/* <div className="wrapper" style={{"display":"grid", "gridTemplateColumns":"1fr 4fr 100%", "columnGap":"1rem", "height":"100vh"}}> */}
        //         <div className="wrapper" style={{"display":"flex", "columnGap":"1rem"}}>
        //             <div className="wrapper" style={{"display":"grid", "gridTemplateRows":"1fr 100%"}}>
        //                 <ListsTab children="Lists"/>
        //                 <div>
        //                     <CenterDivList className='main_pane'>
        //                         <ListsUI setSaveToListMode={setSaveToListMode} saveToListMode={saveToListMode} selectTab={selectTab} editMode={editMode} setEditMode={setEditMode} />
        //                     </CenterDivList>
        //                 </div>
        //             </div>
        //             <div className="wrapper" style={{"display":"grid", "gridTemplateRows":"1fr 100%"}}>
        //                 <div style={{"position":"relative", "marginLeft":"auto", "marginRight":"auto"}}>
        //                     <GreyOutSearchTabs saveToListMode={saveToListMode} editMode={editMode}/>  {/* only shows when saveToListMode is true */}
        //                     <SelectSearchTab selectTab={selectTab} setSelectTab={setSelectTab} loggedInState={loggedInState}/>
        //                 </div>
        //                 <div className="wrapper" style={{"display":"grid", "gridTemplateRows":"1fr 100%", "zIndex":"0", "position":"sticky"}}>
        //                     <CenterDivMain className='main_pane'>
        //                         <CardsUI setSaveToListMode={setSaveToListMode} selectTab={selectTab}/>
        //                     </CenterDivMain>
        //                     <GreyOutCardUI saveToListMode={saveToListMode} editMode={editMode}> {/* only shows when saveToListMode is true */}
        //                             <AddPlacePopUp setSaveToListMode={setSaveToListMode} editMode={editMode}/>
        //                     </GreyOutCardUI>
        //                 </div>
        //             </div>
        //         </div>
        //         </ListProvider>
        //     </div>
        // </body>
        );
}

export default MainPage;