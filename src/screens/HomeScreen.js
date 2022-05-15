import React, { useState } from 'react'
import { 

  Text, 
  StyleSheet,
   View ,
   TouchableOpacity,
   TouchableHighlight,
   Image,
   Dimensions,
   FlatList,
   TextInput,
   StatusBar,
  } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Iconmenu from 'react-native-vector-icons/Ionicons';
import COLORS from '../../const/colors'
import pets from '../../const/pets';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Plus from 'react-native-vector-icons/Octicons';
import{Button
} from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import firebase from '../../util/firebase'



const {height,width} = Dimensions.get('window');


const petCategories = [
  {id:1,name: 'VET', icon: 'cat'},
  {id:2,name: 'EQUIPMENT', icon: 'dog'},
  {id:3,name: 'BUYERS', icon: 'ladybug'},
  {id:4,name: 'TRANSPORTER', icon: 'rabbit'},

];




 const HomeScreen =({navigation})=>{


  const [selectedCategoryIndex, setSeletedCategoryIndex] = React.useState(0);
  const [filteredPets, setFilteredPets] = React.useState([]);
  const [getposts , setGetPosts] = useState({})
  const [isLoded , setIsLoaded] = useState(false)
  const fliterPet = index => {
   
    const currentPets = pets.filter(
      item => item?.pet?.toUpperCase() == petCategories[index].name,
    )[0]?.pets;
    setFilteredPets(currentPets);
  };

  React.useEffect(() => {
    getAllPosts()
    fliterPet(0);
  }, []);

  const getAllPosts=()=>{
    const user = firebase.auth().currentUser
    firebase.firestore()
    .collection('posts')
    .doc(user.uid)
    .collection('userPosts')
    .get()
    .then(querySnapshot =>{
      const posts=[]
      
      querySnapshot.forEach(snapshot =>{
      
          
         posts.push({
           category:snapshot.data().category,
           name:snapshot.data().name,
           price:snapshot.data().price,
           title:snapshot.data().title,
           description:snapshot.data().description,
           image:snapshot.data().image
         })


      })
      setGetPosts({
        getposts:posts
      })
    
  
    })
 }








  function rendercategory(){
    const renderItem=({item,index})=>{
      return(
      <View key={'pet' + index}>

        <TouchableHighlight
        onPress={() => {
          setSeletedCategoryIndex(index);
          fliterPet(index);
        }}
        style={[
          styles.btnCategory,
          {
            backgroundColor:
              selectedCategoryIndex == index
                ? '#9900EF'
                : COLORS.inactive,
          },
        ]}>

         <Text style={styles.categoryBtnName}>{item.name}</Text>

      </TouchableHighlight>
      </View>

      )

     }
    return(
      <FlatList 
      horizontal
      showsHorizontalScrollIndicator={false}
      data={petCategories}
      keyExtractor={item =>`${item.id}`}
      renderItem={renderItem}
      contentContainerStyle={{padding:2,}}

  />
    )
  }


  function renderProducts(){

    const renderItem = ({item}) => {
    return (

    <View style={styles.cardmin}>

      <View style={styles.TopMinContaineer}>
        <Image 
         source={item.owner}
         resizeMode='contain'
         style={{height:50,width:50,borderRadius:25}}

        />
        <Text style={{fontWeight:'bold',fontSize:13,marginTop:4}}>{item.name}</Text>
        <Image 
          source={require('../../assets/dots-vertical-rounded-regular-24.png')}
          resizeMode='contain'
          style={{height:30,width:30}}

        />

      </View>
      <TouchableOpacity style={styles.MiddleMiniContainer}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('DetailsScreen',{item})}
      >
        <Image 
          source={item.image}
          resizeMode='contain'
          style={{height: '100%',width:'100%'}}

        />
      </TouchableOpacity>

      <View style={styles.LastMinContainer}>
        <Text style={{flex:1,color:'#333'}}>{getposts.description}</Text>
      </View>
            


    
 
    </View>

);
}


return(
  <View style={{flex:1,justifyContent:'space-between'}}>


     <FlatList
            showsVerticalScrollIndicator={false}
            
            numColumns={2}
            data={fliterPet}
            keyExtractor={item => `${item.id}`}
            renderItem={renderItem}
           
            contentContainerStyle={{padding:4,justifyContent:'space-between'}}
          />

  </View>



  )
}
  
    return (
      <SafeAreaView style={{flex:1,color:COLORS.white,backgroundColor:'#e0e0e0'}}>
        <StatusBar backgroundColor="#9C27B0" />
        <View style={styles.upperside}>
          <View style={{
            flexDirection:'row',
            justifyContent:'space-between'
          }}>
            <Iconmenu name="ios-menu" size={33}  color="#ffffff" onPress={navigation.toggleDrawer} />
                <Text style={{color:'white', fontWeight: 'bold', fontSize: 25,textAlign:'center',alignItems:'center'}}>
                            KUKU CASH
              </Text>
              <TouchableHighlight
                  
                                
                    underlayColor='green'>
                      <Plus name="plus" size={28}  color="#D1C4E9" onPress={()=>getAllPosts()} />

              </TouchableHighlight>

          </View>
          <View style={{ backgroundColor:'#9C27B0',borderRadius:20,borderWidth:1.9,borderColor:'#CDCDCD',marginBottom:0}}>
          {rendercategory()}

          </View>

        </View>



        <View style={styles.lowerside}>
        <KeyboardAwareScrollView>
              <View style={styles.searchInputContainer}>
                        <Icon name="magnify" size={24} color={COLORS.grey} />
                      
                        <TextInput
                          placeholderTextColor={COLORS.grey}
                          placeholder="Search products"
                          style={{flex:1}}
                        />
                         
                        <Icon name="sort-ascending" size={24} color={COLORS.grey} />
                 </View>
                 </KeyboardAwareScrollView>
                
                 <View style={{flex:25,justifyContent:'space-between'}}>


                        {renderProducts()}


                  </View>
        </View>

      </SafeAreaView>
  
    )
  
}

const styles = StyleSheet.create({
  upperside:{
    flex:1/4,
    paddingBottom:0,
    paddingHorizontal:20,
    backgroundColor:"#9575CD",
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20,
    shadowColor: '#CDCDCD',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    elevation: 10,
    justifyContent:"space-evenly"
  
    
  },
  lowerside:{
    flex:1,
    backgroundColor:COLORS.light,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: 14,
    paddingHorizontal: 10,
    paddingVertical: 3,
    zIndex: 2,
    

  },
  Header:{
    flex:0.6,
    // backgroundColor:'orange',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'flex-end'
 


  },
  btnCategory:{
    width:90,
    height:25,
    
    marginVertical:3,
    borderRadius:20,
    alignSelf:'center'
  },
  categoryBtnName: {
    color: COLORS.white,
    fontSize: 10,
    marginVertical: 5,
    fontWeight:'200',
    textAlign:'center',
    justifyContent:'center',
    alignItems:'center',
    
  },
  searchInputContainer: {
    flex:0.4,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardContainer: {
    // flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal:12,
    backgroundColor:'orange',
    height:300,
    width:130,
    alignSelf:'center',
   borderRadius:15
  },
  cardDetailsContainer: {
    height: 120,
    backgroundColor: COLORS.white,
    flex: 1,
    // borderTopRightRadius: 10,
    // borderBottomRightRadius: 10,
    padding: 20,
    justifyContent: 'center',
  },
  cardDetailsTopContainer: {
 
    backgroundColor: COLORS.white,
 
    flexDirection:'row',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    padding: 20,
    justifyContent: 'space-between',
  },
  cardImageContainer: {
    height: 150,
    width: 140,
    backgroundColor: COLORS.background,
    borderRadius: 20,
  },



  cardmin:{
    marginTop: '4%',
    height:height/4*2,
    backgroundColor:'#d1d1d1',
    width: width/3.1*1.4,
    marginHorizontal:4,
    borderRadius:20,
    shadowColor:'#000',
    borderBottomColor:'#333',
    shadowOffset: {
      width: 0,
       height: 4,
        },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
     elevation: 5,
  },
  TopMinContaineer:{
    flex:0.7,
    backgroundColor:'#fff',
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:2,
    paddingVertical:10,
    borderTopRightRadius:15,
    borderTopLeftRadius:15,

  },
  MiddleMiniContainer:{
    flex:3,
    backgroundColor:'#CDCDCD'

  },
  LastMinContainer:{
    flex:1,
    backgroundColor:'#ffffff',
    borderBottomRightRadius:15,
    borderBottomLeftRadius:15,
    padding:1

  },


})

export default HomeScreen