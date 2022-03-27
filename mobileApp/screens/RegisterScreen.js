import React from 'react';
import { TextInput, Button, View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
export default class Cardscreen extends Component {
  constructor() 
  {
    super()
    this.state = 
    {
       firstName: ' ',
       lastName: ' ',
       username: ' ',
       email: ' ',
       password: ' ',
       confirmPassword: ' '
    }
  }
  render() {
    return (
      <View style={{ backgroundColor:'#ff0000', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{alignItems: 'flex-end'}}>
          <View style={{ flexDirection:'row' }}>
            <Text style={{fontSize:20}}>firstName </Text>
            <TextInput
              style={{height: 30,fontSize:20, backgroundColor:'#ffffff'}}
              placeholder="First Name"
              onChangeText={(val) => { this.firstName(val) }}
            />        
            <Button
              title="Search"
              onPress={this.handleSearchClick}
            />            
          </View>
        <Text style={{fontSize:20}}>{this.state.searchCriteria} </Text>
        <View style={{ flexDirection:'row' }}>
            <Text style={{fontSize:20}}>lastName: </Text>
            <TextInput
              style={{height: 30,fontSize:20, backgroundColor:'#ffffff'}}
              placeholder="Last Name"
              onChangeText={(val) => { this.lastName(val) }}
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

  doRegister = async () =>
  {
    var obj = {firstName:firstName.value, lastName:lastName.value, username:username.value, 
                 email:email.value, password:password.value, confirmPassword:confirmPassword.value}
    
    const [message, setMessage] = useState('');
    for (const [key, value] of Object.entries(obj))
    {
        obj[key] = value.trim();

        if (obj[key] == "")
        {
            
        }
    }
    
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
  }  
  handleSearchClick = async () => 
  {
    var obj = {userId:global.userId,search:global.search};
    var js = JSON.stringify(obj);
    try
    {
      const response = await fetch('https://cop4331-10.herokuapp.com/api/searchcards',
        {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
      var res = JSON.parse(await response.text());
      var _results = res.results;
      var resultText = '';
      for( var i=0; i<_results.length; i++ )
      {
          resultText += _results[i];
          if( i < _results.length - 1 )
          {
              resultText += '\n';
          }
      }
      resultText += '\n';
      this.setState({searchCriteria: resultText });
    }
    catch(e)
    {
      this.setState({searchCriteria: e.message });
    }
   }  
  changeSearchHandler = async (val) =>
  {
    global.search = val;
  }  
  changeCardHandler = async (val) =>
  {
    global.card = val;
  }  
}
