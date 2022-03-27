import React, { Component, useState } from 'react';
import { TextInput, Button, View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
export default class Cardscreen extends Component {
  constructor() 
  {
    super()
    this.state = 
    {
       searchCriteria: '\n ',
       newCard: '\n '
    }
  }
  render() {
    return (
      <View style={{ backgroundColor:'#ff0000', flex: 1, alignItems: 'center', justifyContent: 
'center' }}>
        <View style={{alignItems: 'flex-end'}}>
          <View style={{ flexDirection:'row' }}>
            <Text style={{fontSize:20}}>Search Criteria: </Text>
            <TextInput
              style={{height: 30,fontSize:20, backgroundColor:'#ffffff'}}
              placeholder="Search"
              onChangeText={(val) => { this.changeSearchHandler(val) }}
            />        
            <Button
              title="Search"
              onPress={this.handleSearchClick}
            />            
          </View>
        <Text style={{fontSize:20}}>{this.state.searchCriteria} </Text>
        <View style={{ flexDirection:'row' }}>
            <Text style={{fontSize:20}}>Card to Add: </Text>
            <TextInput
              style={{height: 30,fontSize:20, backgroundColor:'#ffffff'}}
              placeholder="Card"
              onChangeText={(val) => { this.changeCardHandler(val) }}
            />
            <Button
              title=" Add "
              onPress={this.handleCardClick}
            />            
        </View>
        <Text style={{fontSize:20}}>{this.state.newCard}  </Text>
        </View>
      </View>
    )
  }
  handleCardClick = async () => 
  {
    var obj = {userId:global.userId,card:global.card};
    var js = JSON.stringify(obj);
    try
    {
      const response = await fetch('https://cop4331-10.herokuapp.com/api/addcard',
        {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
      var res = JSON.parse(await response.text());
      this.setState({newCard: "Your card has been added" });
   }
    catch(e)
    {
      this.setState({newCard: e.message });
    }
