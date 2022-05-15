import React,{useState,Component} from 'react';

import { 
  StyleSheet,
   Text, 
   View ,
   Image,
   TouchableOpacity,
   Alert
  } from 'react-native'
import { 
  createDrawerNavigator ,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer'
import Logout from 'react-native-vector-icons/SimpleLineIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Iconpost from 'react-native-vector-icons/MaterialIcons';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from './src/screens/ProfileScreen'
import PostScreen from './src/screens/PostScreen'

import StackNavigator from './src/navigation/StackNavigator';
import SignUpScreen from './src/screens/SignUpScreen';
import SignInScreen from './src/screens/SignInScreen';




const Drawer = createDrawerNavigator();

export default class Drawernavigator extends Component {
  render(){ 
  return (
    
    <NavigationContainer>
    <Drawer.Navigator initialRouteName='Home'
    screenOptions={{
      headerShown:false,
      drawerInactiveBackgroundColor:'#AEA1FF',
      drawerActiveBackgroundColor:'#9900EF',
    
      
    }}
    drawerContent={(props)=><CustomDrawer {...props}/>}
    
    >
      <Drawer.Screen
       name="HomeStack" 
       component={StackNavigator} 
       options={{
          drawerLabel: 'Home',
          drawerLabelStyle:{
            fontSize:15,
            color:'#fff',
            fontWeight:'400'
          },
        drawerIcon: (({focused}) => <Icon name="home" size={20} color="#fff" />)
     
      }}
       />      

       
      <Drawer.Screen 
      name="Profile" 
      component={ProfileScreen} 
      options={{
        drawerLabel: 'Profile',
        drawerLabelStyle:{
          fontSize:15,
          color:'#fff',
          fontWeight:'400'

        },
      drawerIcon: (({focused}) => <Icon name="account" size={20} color="#fff" />)
   
    }}
      />
      <Drawer.Screen 
      name="Post"
       component={PostScreen}
       options={{
        drawerLabel: 'Post',
        drawerLabelStyle:{
          fontSize:15,
          color:'#fff',
          fontWeight:'400'

        },
      drawerIcon: (({focused}) => <Iconpost name="post-add" size={20} color="#fff" />)
   
    }}
        />
       
    </Drawer.Navigator>
    </NavigationContainer>
  );
}

}


 

const CustomDrawer=(props)=>{
  return(
    <View style={{flex:1,backgroundColor:'#9575CD',}}>
      <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:5,paddingTop:2,alignItems:'center'}}>
      <View style={{paddingVertical:1,paddingHorizontal:5, backgroundColor:'#9575CD'}}>

        <Image
          source={require('./assets/ben.jpg')}
            resizeMode='contain'


        style={{
         height:70,
          width:70,
          borderRadius:40,
          alignSelf:'center'
          }}

        />
            <Text style={{textAlign:'center',fontSize:13,fontWeight:'bold',color:'#fff'}}>Roger Mapunga</Text>

              </View>
        <Logout name="close" size={20}  color="#ffffff" onPress={() =>props.navigation.closeDrawer()}/>

      </View>

    




      <DrawerContentScrollView>
        <DrawerItemList {...props}/>
      </DrawerContentScrollView>

      <View style={{padding:6,backgroundColor:'#9C27B0'}}>
        <TouchableOpacity
          onPress={()=>Alert.alert("FeedBack","Not connected yet")}
        style={{
          marginHorizontal:12,

          paddingHorizontal:0,
          flexDirection:'row',
          justifyContent:'space-between'
        }}
        >
        <Logout name="logout" size={18}  color="#ffffff" />
        <Text style={{fontSize:18,fontWeight:'400',color:'#E1E1E1'}}>Log Out</Text>

        </TouchableOpacity>
      
      </View>


    </View>
  )
}