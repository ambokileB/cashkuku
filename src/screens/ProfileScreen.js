import React, { Component } from 'react'
import { 
  Text,
   StyleSheet,
    View ,
    Platform,
    TouchableWithoutFeedback,
    Button,
    Keyboard,
    KeyboardAvoidingView,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Image
  } from 'react-native'

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { Logout } from 'react-native-vector-icons/SimpleLineIcons';


const ProfileScreen =({navigation})=> {

  

  
  
    return (
      <View style={styles.container}>
        <View style={styles.header}>

        <Image
          source={require('../../assets/ben.jpg')}
            resizeMode='contain'


        style={{
         height:90,
          width:90,
          borderRadius:40,
          alignSelf:'center'
          }}

        />
          <View style={{flexDirection:'row', justifyContent:'space-between'}}> 
         
            <Text style={{fontSize:15,fontWeight:'300',color:'#fff',}}>Username</Text>
            <Text style={{fontSize:15,fontWeight:'300',color:'#fff',}}>User Email</Text>
            <Text style={{fontSize:15,fontWeight:'300',color:'#fff',}}>userCategory</Text>
       
          </View>
          <View style={{borderBottomWidth:1,borderBottomColor:'#fff'}}/>
          </View>

          <View style={styles.body}>

          </View>
          <View styles={styles.footer}>

          </View>
        
      </View>
    )
  
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
     
     
        backgroundColor:'#9900EF'
    },
    header:{
      flex:1/3,
      backgroundColor:'transparent',
      justifyContent:'space-between',
      paddingHorizontal:12,
      paddingVertical:12

    },
    body:{
      flex:1,
      backgroundColor:'transparent'

    }
  
})

export default  ProfileScreen