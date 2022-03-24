import React from 'react';
import '../App.css';
import { ListsTab } from '../components/ListsTab';
import TopMarginMain from '../components/TopMarginMain';
import { Buttonb } from '../components/Button';
import { CenterDiv } from '../components/CenterDiv';
import styled from 'styled-components'
import { SearchTab } from '../components/SearchTab';
import FoldersUI from '../components/FoldersUI';
import { Title } from '../components/Title';


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
  return (
    <body className="background">
      <div style={{"margin":"5%"}}>
      <TopMarginMain/>
      <div class="wrapper" style={{"display":"grid", "gridTemplateColumns": "1fr 4fr","column-gap": "1rem"
          ,"height":"100vh"}}>
          <div class="wrapper" style={{"display":"grid", "gridTemplateRows": "1fr 100%"}}>
          <ListsTab children="Lists"/>
            <div>
              <CenterDivList className='main_pane'>
              <FoldersUI/>
              </CenterDivList>
            </div>
          </div>
          <div class="wrapper" style={{"display":"grid", "gridTemplateRows": "1fr 100%"}}>
            <div style= {{"display":"flex", "gap": "20vh", "justify-content": "center","margin-left": "50px","margin-right": "50px"}}>
              <SearchTab children="Food"/>
              <SearchTab children="Activities"/>
              <SearchTab children="Friends"/>
            </div>
            <CenterDivMain className='main_pane'/>
          </div>
      </div>
      </div>

    </body>
    
  );
}

export default MainPage;