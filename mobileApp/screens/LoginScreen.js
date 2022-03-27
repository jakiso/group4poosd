
import React, { Component, useState } from 'react';
import { Button, View, Text, TextInput } from 'react-native';
//import { buildPath } from '../components/Path';

global.localName = '';
global.password = '';
global.userId = -1;
global.firstName = '';
global.lastName = '';
global.search = '';
global.card = '';
export default class Homescreen extends Component {
  constructor() 
  {
    super()
    this.state = 
    {
       message: ' '
    }
  }
  render(){
    return(
      <View style={{ backgroundColor:'#0000ff', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{alignItems: 'flex-end'}}>
      
      <View style={{ flexDirection:'row' }}>
        <Text style={{fontSize:20}}>Login Screen: </Text>
        <TextInput
          style={{height: 30,fontSize:20, backgroundColor:'#ffffff'}}
          placeholder="Login Name"
          onChangeText={(val) => { this.changeLoginNameHandler(val) }}
        />        
      </View>
      <Text style={{fontSize:20}}> </Text>
      <View style={{ flexDirection:'row' }}>
        <Text style={{fontSize:20}}>Password: </Text>
        <TextInput
          style={{height: 30,fontSize:20, backgroundColor:'#ffffff'}}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(val) => { this.changePasswordHandler(val) }}
        />
      </View>
      <Text style={{fontSize:20}}>{this.state.message} </Text>
      </View>
      <Button
        title="Do Login"
        onPress={this.handleLogin}
      />

    </View>
    );
  }
  
  handleLogin = async () =>
  {
    try
    {
      var obj = {login:global.loginName,password:global.password};
      var js = JSON.stringify(obj);
      //var bp = require('../components/Path.js');
      //const response = await fetch(bp.buildPath('login'),{method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
      const response = await fetch('https://cop4331-10.herokuapp.com/api/login',{method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
      //const response = await fetch('https://letsdothings.herokuapp.com/api/login',{method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
      var res = JSON.parse(await response.text());
      if( res.id <= 0 )
      {
        this.setState({message: "User/Password combination incorrect" });
      }
      else
      {
        global.firstName = res.firstName;
        global.lastName = res.lastName;
        global.userId = res.id;
        this.props.navigation.navigate('Card');
      }
    }
    catch(e)
    {
      this.setState({message: e.message });
    }
  }
  goToRegisterPage = async () =>
  {
    try
    {
      this.props.navigation.navigate('Register');
    }
    catch(e)
    {
      this.setState({message: e.message });
    }
  }  
  changeLoginNameHandler = async (val) =>
  {
    global.loginName = val;
  }  
  changePasswordHandler = async (val) =>
  {
    global.password = val;
  }  
  
}
