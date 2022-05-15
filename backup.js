import React,{useState} from 'react';

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




const Drawer = createDrawerNavigator();

function Drawernavigator({navigation}) {
  const CustomDrawer=(props)=>{
    return(
      <View style={{flex:1,backgroundColor:'#9575CD',}}>
        <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20,paddingTop:2}}>
          <Text></Text>
          <Logout name="close" size={20}  color="#ffffff" onPress={() =>props.navigation.closeDrawer()}/>

        </View>

      

          <View style={{paddingVertical:1,paddingHorizontal:10, backgroundColor:'#9575CD'}}>

            <Image
            source={require('./assets/ben.jpg')}
            resizeMode='contain'
            
            
            style={{
              height:70,
              borderRadius:40,
              alignSelf:'center'
            }}

            />
            <Text style={{textAlign:'center',fontSize:13,fontWeight:'bold',color:'#111'}}>Roger Mapunga</Text>
            {/* <View style={{padding:0,flexDirection:'row',justifyContent:'space-around'}}>
              <View style={{borderWidth:1,borderColor:'#fff',borderRadius:10}}>
              <Text>Button One</Text>
              </View>

              <View style={{borderWidth:1,borderColor:'#fff',borderRadius:10}}>
              <Text>Button Two</Text>
              </View>


            </View> */}


          </View>
        <DrawerContentScrollView>
          <DrawerItemList {...props}/>
        </DrawerContentScrollView>

        <View style={{padding:12,backgroundColor:'#9C27B0'}}>
          <TouchableOpacity
            onPress={()=>Alert.alert("FeedBack","Not connected yet")}
          style={{
            marginHorizontal:20,
  
            paddingHorizontal:0,
            flexDirection:'row',
            justifyContent:'space-around'
          }}
          >
          <Logout name="logout" size={29}  color="#ffffff" />
          <Text style={{fontSize:23,fontWeight:'bold',color:'#E1E1E1'}}>Log Out</Text>

          </TouchableOpacity>
        
        </View>
  

      </View>
    )
  }
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
            fontSize:17,
            color:'#fff',
            fontWeight:'bold'
          },
        drawerIcon: (({focused}) => <Icon name="home" size={23} color="#fff" />)
     
      }}
       />      

       
      <Drawer.Screen 
      name="Profile" 
      component={ProfileScreen} 
      options={{
        drawerLabel: 'Profile',
        drawerLabelStyle:{
          fontSize:17,
          color:'#fff',
          fontWeight:'bold'

        },
      drawerIcon: (({focused}) => <Icon name="account" size={23} color="#fff" />)
   
    }}
      />
      <Drawer.Screen 
      name="Post"
       component={PostScreen}
       options={{
        drawerLabel: 'Post',
        drawerLabelStyle:{
          fontSize:17,
          color:'#fff',
          fontWeight:'bold'

        },
      drawerIcon: (({focused}) => <Iconpost name="post-add" size={23} color="#fff" />)
   
    }}
        />
       
    </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default Drawernavigator
 