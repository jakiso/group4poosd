import React, { useState } from 'react';
import '../App.css';
import { ListsTab } from '../components/ListsTab';
import TopMarginMain from '../components/TopMarginMain';
import { Buttonb } from '../components/Button';
import { CenterDiv } from '../components/CenterDiv';
import styled from 'styled-components'
import { SearchTab } from '../components/SearchTab';
import FoldersUI from '../components/FoldersUI';
import CardsUI from '../components/CardsUI';
import SelectSearchTab from '../components/SelectSearchTab';
import {GreyOutSearchTabs} from '../components/GreyOutSearchTabs';
import { GreyOutCardUI } from '../components/GreyOutCardUI';
import { AddPlacePopUp } from '../components/AddPalcePopUp';

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
    
    const tabs = ["", "food", "activities", "friends"];
    var [selectTab, setSelectTab] = useState(tabs[0]);
    var [addToFolder, setAddToFolder] = useState(false);

    return (
        <div className="background">
            <div style={{"margin":"5%", "marginTop":"0px"}}>
                <TopMarginMain/>
                <div className="wrapper" style={{"display":"grid", "gridTemplateColumns":"1fr 4fr", "columnGap":"1rem", "height":"100vh"}}>
                    <div className="wrapper" style={{"display":"grid", "gridTemplateRows":"1fr 100%"}}>
                        <ListsTab children="Lists"/>
                        <div>
                            <CenterDivList className='main_pane'>
                                <FoldersUI setAddToFolder={setAddToFolder}/>
                            </CenterDivList>
                        </div>
                    </div>
                    <div className="wrapper" style={{"display":"grid", "gridTemplateRows":"1fr 100%"}}>
                        <div style={{"position":"relative", "marginLeft":"auto", "marginRight":"auto"}}>
                            <GreyOutSearchTabs addToFolder={addToFolder}/>  {/* only shows when addToFolder is true */}
                            <SelectSearchTab selectTab={selectTab} setSelectTab={setSelectTab}/>
                        </div>
                        <div>
                        <CenterDivMain className='main_pane'>
                            <CardsUI setAddToFolder={setAddToFolder}/>
                            <GreyOutCardUI addToFolder={addToFolder}> {/* only shows when addToFolder is true */}
                                <AddPlacePopUp setAddToFolder={setAddToFolder}/>
                            </GreyOutCardUI>
                        </CenterDivMain>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default MainPage;