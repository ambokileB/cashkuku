'use strict';

import React,{useState} from 'react';

import {
	StyleSheet,
	View,
	TextInput,
	Text,
	TouchableHighlight,
  
} from 'react-native';



import { FAB, Portal, Provider } from 'react-native-paper';





const PostScreen = ({navigation}) => {

const ButtonGroup = () => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  return (
    <Provider>
      <Portal>
        <FAB.Group
          open={open}
          icon={open ? 'calendar-today' : 'plus'}
          actions={[
            { icon: 'plus', onPress: () => console.log('Pressed add') },
            {
              icon: 'star',
              label: 'Star',
              onPress: () => console.log('Pressed star'),
            },
            {
              icon: 'email',
              label: 'Email',
              onPress: () => console.log('Pressed email'),
            },
            {
              icon: 'bell',
              label: 'Remind',
              onPress: () => console.log('Pressed notifications'),
              small: false,
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
    </Provider>
  );
};



    return (
      <View style={styles.container}>
      		<View style={{height:150,width:200,backgroundColor:'#e0e0e0'}}>

      		{ButtonGroup()}



      		</View>

      		<TouchableHighlight
      		  onPress={()=>navigation.goBack()}
      		  style={{backgroundColor:'red'}}
      		  underlayColor=''>

      		  <Text>
      		  Go back
      		    
      		  </Text>
      		  
      		</TouchableHighlight>

      </View>
    );
  }


const styles = StyleSheet.create({
	container:{
		flex:1,
		justifyContent:'center',
		alignItems:'center',
		backgroundColor:'#ECECEC'
	}

});

export default PostScreen;