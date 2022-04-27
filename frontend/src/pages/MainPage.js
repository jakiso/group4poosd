import React, { useState, useEffect } from 'react';
import '../App.css';
import { ListsTab } from '../components/ListsTab';
import TopMarginMain from '../components/TopMarginMain';
import { Buttonb } from '../components/Button';
import { CenterDiv } from '../components/CenterDiv';
import styled from 'styled-components'
import ListsUI from '../components/ListsUI';
import CardsUI from '../components/CardsUI';
import SelectSearchTab from '../components/SelectSearchTab';
import {GreyOutSearchTabs} from '../components/GreyOutSearchTabs';
import { GreyOutCardUI } from '../components/GreyOutCardUI';
import { AddPlacePopUp } from '../components/AddPalcePopUp';
import { LogoutButton } from '../components/Logout';

const Buttona = styled(Buttonb)`
    background: #000000;
`

const CenterDivMain = styled(CenterDiv)`
    height: 80%;
    width: 100%;
    margin-top: 0px;
`

const CenterDivList = styled(CenterDiv)`
    height: 80%;
    width: 100%;
    margin-top: 0px;
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
      });

    return ( loggedInState ) ?( // This is the logged in version of main page
        <div className="background">
            <div style={{"margin":"5%", "marginTop":"0px"}}>
                <TopMarginMain loggedInState={loggedInState}/>
                <div className="wrapper" style={{"display":"grid", "gridTemplateColumns":"1fr 4fr", "columnGap":"1rem", "height":"100vh"}}>
                    <div className="wrapper" style={{"display":"grid", "gridTemplateRows":"1fr 100%"}}>
                        <ListsTab children="Lists"/>
                        <div>
                            <CenterDivList className='main_pane'>
                                <ListsUI setSaveToListMode={setSaveToListMode} selectTab={selectTab} editMode={editMode} setEditMode={setEditMode} />
                            </CenterDivList>
                        </div>
                    </div>
                    <div className="wrapper" style={{"display":"grid", "gridTemplateRows":"1fr 100%"}}>
                        <div style={{"position":"relative", "marginLeft":"auto", "marginRight":"auto"}}>
                            <GreyOutSearchTabs saveToListMode={saveToListMode} editMode={editMode}/>  {/* only shows when saveToListMode is true */}
                            <SelectSearchTab selectTab={selectTab} setSelectTab={setSelectTab} loggedInState={loggedInState}/>
                        </div>
                        <div>
                        <CenterDivMain className='main_pane'>
                            <CardsUI setSaveToListMode={setSaveToListMode} selectTab={selectTab}/>
                            <GreyOutCardUI saveToListMode={saveToListMode} editMode={editMode}> {/* only shows when saveToListMode is true */}
                                <AddPlacePopUp setSaveToListMode={setSaveToListMode} editMode={editMode}/>
                        </GreyOutCardUI>
                        </CenterDivMain>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    ):( // This is the guest version of main page
        <div className="background">
            <div style={{"margin":"5%", "marginTop":"0px"}}>
                <TopMarginMain loggedInState={loggedInState}/>
                <div className="wrapper" style={{"display":"grid", "height":"100vh"}}>

                    <div className="wrapper" style={{"display":"grid", "gridTemplateRows":"1fr 100%"}}>
                        <div style={{"position":"relative", "marginLeft":"auto", "marginRight":"auto"}}>
                            <SelectSearchTab selectTab={selectTab} setSelectTab={setSelectTab} loggedInState={loggedInState}/>
                        </div>
                        <div>
                        <CenterDivMain className='main_pane'>
                            <CardsUI setSaveToListMode={setSaveToListMode} selectTab={selectTab}/>
                        </CenterDivMain>
                        </div>
                    </div>
                </div>
            </div>
        </div>    );
}

export default MainPage;