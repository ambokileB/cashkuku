import React, {Component, useState,setState } from 'react'
import { 
  Text,
   StyleSheet,
    View ,
    Platform,
    TouchableWithoutFeedback,

    Keyboard,
    KeyboardAvoidingView,
 
    ScrollView,
    TouchableOpacity,
    Dimensions,
    SafeAreaView,
    StatusBar,
    Alert
  } from 'react-native'
  import { 
 TextInput,Button
} from 'react-native-paper';
  import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

  import DropDownPicker from 'react-native-dropdown-picker';


import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import firebase from '../../util/firebase'

import Dropdownicon from 'react-native-vector-icons/AntDesign';
import ModalDropdown from 'react-native-modal-dropdown';

const {height,width} = Dimensions.get('screen')
export default class SignUpScreen extends Component{



  state = {
    email:'',
    password:'',
    comfirmPassword:'',
 
  }

 


  
  render(){ 
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#9C27B0" />
        <Header/>
        <View style={{
            backgroundColor:'transparent',
            flex:1/1.7,
            paddingHorizontal:12,
           
            paddingVertical:0
        }}>
          <KeyboardAwareScrollView>

            <TextInput
              mode='flat'
              label=' Email address'
              keyboardType='email-address'
              value={this.state.email}
              onChangeText={(text) => this.setState({email:text})}
              left={<TextInput.Icon name="email" color="#9900EF" />}
              style={{borderBottomLeftRadius:20,
                borderBottomRightRadius:20,
                borderTopLeftRadius:20,
                borderTopRightRadius:20,
                marginTop:12,
                height:45
              }}
            />
              <TextInput
              mode='flat'
              label=' password'
              
              value={this.state.password}
              onChangeText={(text) => this.setState({password:text})}
              secureTextEntry={true}
              left={<TextInput.Icon name="lock"  color="#9900EF"/>}
              style={{borderBottomLeftRadius:20,
                borderBottomRightRadius:20,
                borderTopLeftRadius:20,
                borderTopRightRadius:20,
                marginTop:12,
                height:45
              }}              
            />
              <TextInput
              mode='flat'
              label=' Comfirm Password'
              value={this.state.comfirmPassword}
              onChangeText={(text) => this.setState({comfirmPassword:text})}
              left={<TextInput.Icon name="lock" color="#9900EF" />}
              right={<TextInput.Icon name="eye" color="#9900EF" />}
              secureTextEntry={true}
              style={{borderBottomLeftRadius:20,
                borderBottomRightRadius:20,
                borderTopLeftRadius:20,
                borderTopRightRadius:20,
                marginTop:12,
                height:45
              }}
            />


            <ModalDropdown options={['Poutly Farmer', 'Buyer','Transporter', 'Other']}  
            style={{
                width:width/2,
                height:35,
                backgroundColor:'#E0E0E0',
                justifyContent:'center',
                alignItems:'center',
                borderRadius:20,
                alignSelf:'center',
                marginTop:12,
                fontSize:20,
            }}>
              <Text style={{color:'#9900EF'}}>Please Select Options </Text>
            <Dropdownicon name="caretdown" color="#9900EF" size={17} style={{alignSelf:'center'}}/>


            </ModalDropdown>
            

      




      
</KeyboardAwareScrollView>

          </View>
          <View style={{
    backgroundColor:'transparent',
    flex:1/4
    }}>
          <Button
            mode='contained'
            style={styles.button}
            onPress={()=>{
              if (this.state.email != "" && this.state.password != "" && this.state.comfirmPassword !="" && this.state.password == this.state.comfirmPassword) {
                firebase.auth().createUserWithEmailAndPassword(
                  this.state.email,
                  this.state.password
                ).then((result)=>{
                  console.log(result)
                  this.props.navigation.goback()
                  
                }).catch((error)=>{
                 alert(error)
                })
              }else{
                alert("invalid email or password mismatch")
              }
            }}

          >Create Account</Button>
              <View style={{
              flexDirection:'row',
              marginHorizontal:20

            }}>
              <Text style={{color:'#fff',}}>  Already you have Account ? </Text>
              <TouchableOpacity 
                onPress={()=>this.props.navigation.navigate('SignIn')}

              style={{
              
              }}
              >
              <Text style={{color:'tomato'}}>SignIn NOw</Text>
            </TouchableOpacity>

            </View>

  </View>

        
      </SafeAreaView>
    )
  
}
}


const Header =()=>(
  <View style={{
    backgroundColor:'transparent',
    flex:1/5,
   
  }}>
    <Text style={{
      textAlign:'center',
      fontSize:23,
      fontWeight:'bold',
      color:'#fff'
      }}>
        Create Account
        </Text>
    <View style={{
      borderBottomColor:'#fff',
      borderBottomWidth:2,
      marginHorizontal:5,
    }}/>

  </View>
)



const styles = StyleSheet.create({
    container:{
        flex:1,
     
        backgroundColor:'#9900EF'
    },
    button:{
      marginHorizontal:20,
      marginVertical:12,
      borderRadius:20,

    },
    input:{
      
    }
  
})

