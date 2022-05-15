import React, {Component, useState,setState ,useEffect} from 'react'
import { 
  Text,
   StyleSheet,
    View ,
    Platform,
    TouchableWithoutFeedback,
    TouchableHighlight,
    Keyboard,
    KeyboardAvoidingView,
 
    ScrollView,
    TouchableOpacity,
    Dimensions,
    SafeAreaView,
    StatusBar,
    Alert,
    Image,
    Modal
  } from 'react-native'
  import { 
 TextInput,Button
} from 'react-native-paper';
  import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import firebase from '../../util/firebase'

import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import Cross from 'react-native-vector-icons/MaterialCommunityIcons';


import Iconmenu from 'react-native-vector-icons/Ionicons';


const {height,width} = Dimensions.get('screen')


export default function PostScreen ({navigation}) {

const [category ,setCategory] =useState('')
const [name ,setName] =useState('')
const [title ,setTitle] =useState('')
const [price ,setprice] =useState('')
const [description ,setDescription] =useState('')
const [hasCameraPermission, setHasCameraPermission] = useState(null);
const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
const [camera, setCamera] = useState(null);
const [image, setImage] = useState(null);
const [type, setType] = useState(Camera.Constants.Type.back);

const [active , setactive] = useState(false);

 

  

useEffect(() => {
  (async () => {
    const cameraStatus = await Camera.requestCameraPermissionsAsync();
    setHasCameraPermission(cameraStatus.status === 'granted');

    const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync()
    setHasGalleryPermission(galleryStatus.status === 'granted');
  })();
}, []);

const takePicture = async()=>{
  if (camera) {
    const data = await camera.takePictureAsync(null)
    
    setImage(data.uri)
    
  }

}

const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [6, 8],
    quality: 1,
  });

  console.log(result);

  if (!result.cancelled) {
    setImage(result.uri);
  }
};

if (hasCameraPermission === null || hasGalleryPermission === null) {
  return <View />;
}
if (hasCameraPermission === false || hasGalleryPermission === false) {
  return <Text>No access to camera</Text>;
}



const uploadImage = async() =>{
  
if(category !="" && name !="" && price !="" && title !="" && description !="" && image !=""){
  const childPath = `posts/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;

  const response = await fetch(image);
  const blob = await response.blob();

  const task = firebase
  .storage()
  .ref()
  .child(childPath)
  .put(blob)

  const taskProgress = snapshot =>{
      console.log(`transferred: ${snapshot.bytesTransferrred}`)
  }
  const taskCompleted = () =>{
      task.snapshot.ref.getDownloadURL().then((snapshot) =>{
        firebase.firestore()
        .collection('posts')
        .doc(firebase.auth().currentUser.uid)
        .collection("userPosts")
        .add({
          category:category,
              name:name,
              price:price,
              title:title,
              description:description,
              image:image,
              creation:firebase.firestore.FieldValue.serverTimestamp()
      
        }).then((function (){
            navigation.navigate('Home')
        }))
         
      })
  }

  const taskError = snapshot =>{
      console.log(snapshot)
  }
  task.on("state_changed",taskProgress,taskError,taskCompleted)

}else{
  Alert.alert("make sure to fill all input field")
}

}








    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" backgroundColor="#9900EF" />
        <Header/>
        <View style={{
            backgroundColor:'transparent',
            flex:1,
            paddingHorizontal:12,
           
            paddingVertical:0,
            marginTop:5,
        }}>

<KeyboardAwareScrollView>
        
         <View style={{
            padding:2,
            marginHorizontal:12,
            borderRadius:23,
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center'

          }}>
            <Text style={{textAlign:'center',fontWeight:'bold',color:'#fff',fontSize:12}}>Prodct Category: </Text>
            <TextInput 
            placeholder="product category"   
            style={styles.textInput}
            onChangeText={(category) => setCategory(category)}
             />
          </View>
        <View style={{
            padding:2,
            marginHorizontal:12,
            borderRadius:23,
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center'

          }}>
            <Text style={{textAlign:'center',fontWeight:'bold',color:'#fff',fontSize:12}}>Prodct Name: </Text>
            <TextInput 
            placeholder="write product Name"
             style={styles.textInput} 
             
             onChangeText={(name) => setName(name)}
             />
          </View>

          <View style={{
            padding:2,
            marginHorizontal:12,
            borderRadius:23,
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center'

          }}>
            <Text style={{textAlign:'center',fontWeight:'bold',color:'#fff',fontSize:12}}>Prodct Price: </Text>
            <TextInput 
            placeholder="write product Price" 
            style={styles.textInput} 
            
            keyboardType='phone-pad'
            onChangeText={(price) => setprice(price)}
            />
          </View>
          <View style={{

            padding:2,
            marginHorizontal:12,
          
            borderRadius:23,
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center'

          }}>
            <Text style={{textAlign:'center',fontWeight:'bold',color:'#fff',fontSize:12}}>Prodct Title :</Text>
            <TextInput 
            placeholder="write product Caption" 
            style={styles.textInput}
        
            onChangeText={(title) => setTitle(title)}
             />
          </View>

        <View style={{
 
           
            padding:1,
            marginHorizontal:12,

            borderRadius:23,

          }}>
            <TextInput
              multiline
              numberOfLines={1}
             placeholder="write product Descriptions" 
             style={{ backgroundColor:'#CDCDCD',borderRadius:20,paddingHorizontal:20}} 
            
             onChangeText={(description) => setDescription(description)}
             />
          </View>




          <Modal
             animationType="slide"
             transparent={true}
             visible={active}
             onRequestClose={() => {
             console.warn("closed");
             }}
             >
               
             <View style={{
    
                  flex: 2,
                  backgroundColor : "#9900EF",
                  alignItems: 'center',
                  marginTop:20,
                  
                  marginHorizontal:10,
                  borderRadius:25
    
             }}>


                <TouchableOpacity
                      onPress={()=>{setactive(!active)}}
                      style={{ justifyContent:'space-around',flexDirection:'row',alignItems:'center'}}
                      >
    
                          <Cross
                             name="close"
                             size={33}
                             color="#fff"
                            
                           />
                            <Text style={{fontWeight:'400',color:'#fff'}}>Close  Camera Modal</Text>
                      
                  </TouchableOpacity>

                  <View style={{borderBottomWidth:2,borderBottomColor:'#fff'}}/>


                  <View style={styles.cameraContainer}>
                  <Camera 
                  ref= {ref =>setCamera(ref)}
                  style={styles.fixedRatio} 
                   type={type}
                  ratio={'1:1'}
                  />
                  </View>
                  <Button
                  mode='contained'
                 style={styles.button}
                  onPress={() => {
                       setType(
                    type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                   : Camera.Constants.Type.back
                   );
                    }}>
                   <Text> Flip Image</Text>
                </Button>


                <Button
                  mode='contained'
                  onPress={()=>takePicture()}
                  >
                  <Text>Take picture</Text>
                  </Button>

                  {image && <Image source={{uri:image}} style={{flex:1.3,borderRadius:16}}/>}







                  
             </View>
             </Modal>


          <View style={{
 
           
            padding:1,
            marginHorizontal:12,

            borderRadius:23,
            flexDirection:'row',
            justifyContent:'space-between',
            paddingHorizontal:12,
            alignItems:'center',
            marginTop:7

            }}>

            <View style={{padding:7,borderRadius:30,justifyContent:'space-between'}}>
            <Iconmenu name="camera" size={28}  color="#CDCDCD" onPress={()=>{setactive(!active)}}  style={{}}/>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Iconmenu name="image" size={28}  color="#CDCDCD" onPress={()=>pickImage()} />
              </View>
              <View style={{height:170,width:190}}>
              {image && <Image source={{uri:image}} style={{flex:1.3,borderRadius:16}}/>}
              </View>


            </View>

          

          </KeyboardAwareScrollView>





 

          </View>
          <View style={{
            backgroundColor:'transparent',
            flex:1/5,
            justifyContent:'flex-end',

          }}>
                <Button
                mode='contained'
              onPress={()=>uploadImage()}
           style={{
            
            
            padding:1,
            marginHorizontal:12,
            borderRadius:23,
            bottom:17

          }}>
             <Text style={{fontSize:15,fontWeight:'bold',color:'#fff'}}>Add Post</Text>

           
          </Button>
  </View>
        
      </SafeAreaView>
    )
  
}



const Header =({props})=>(
  <View style={{
    backgroundColor:'transparent',
    flex:1/11,
    justifyContent:'flex-end'
   
  }}>
    <View style={{justifyContent:'space-around',flexDirection:'row'}}>
     <Iconmenu name="ios-menu" size={28}  color="#ffffff" onPress={()=>{}} style={{}}/>
    <Text style={{
      textAlign:'center',
      fontSize:23,
      fontWeight:'bold',
      color:'#fff'
      }}>
        Create New Post
        </Text>
        <Text></Text>
        </View>
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
    textInput:{ 
      flex:1,
    height:30,
    borderColor: '#000',
    borderBottomWidth: 2,
   
    marginBottom: 5,
    paddingHorizontal:10,
    borderRadius:7,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  cameraContainer:{
    flex:1,
    flexDirection:'row'
  },
  fixedRatio:{
    flex:1,
    aspectRatio:1
  }
  
})

