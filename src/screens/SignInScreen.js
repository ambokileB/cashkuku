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


export default class SignInScreen extends Component{



  state = {
    email:'',
    password:'',
    isLoggedIn:false
  
 
  }

  componentDidMount(){
    const user = firebase.auth().currentUser

    // if (user !=null) {
    //   this.props.navigation.replace("Home")
      
    // }

    firebase.auth().onAuthStateChanged(result =>{
      if (result) {
        this.props.navigation.replace("Home") 
        
      }

    })
    
  }

 


  
  render(){ 
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#9C27B0" />
        <Header/>
        <View style={{
            backgroundColor:'transparent',
            flex:1/3,
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
              right={<TextInput.Icon name="eye"  color="#9900EF"/>}
              style={{borderBottomLeftRadius:20,
                borderBottomRightRadius:20,
                borderTopLeftRadius:20,
                borderTopRightRadius:20,
                marginTop:12,
                height:45
              }}              
            />


      
</KeyboardAwareScrollView>

          </View>
          <View style={{
    backgroundColor:'transparent',
    flex:1/3
    }}>
          <Button
            mode='contained'
            style={styles.button}
            onPress={()=>{
              if (this.state.email !="" && this.state.password !="") {
                firebase.auth().signInWithEmailAndPassword(
                  this.state.email,
                  this.state.password
                ).then((result)=>{
                  console.log(result)
                  this.props.navigation.replace("Home")

                }).catch((error)=>{
                  alert(error)
                })
                
              }else{
                alert("incorrect email or password")

              }
            }}
          >Log In</Button>
              <View style={{
              flexDirection:'row',
              marginHorizontal:20

            }}>
              <Text style={{color:'#fff',}}>  Already you have Account ? </Text>
              <TouchableOpacity 
                onPress={()=>this.props.navigation.navigate('SignUp')}

              style={{
              
              }}
              >
              <Text style={{color:'tomato'}}>SignUp NOw</Text>
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
    flex:1/3,
   
  }}>
    <Text style={{
      textAlign:'center',
      fontSize:23,
      fontWeight:'bold',
      color:'#fff'
      }}>
        Log in
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

