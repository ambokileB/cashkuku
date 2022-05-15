        
import 
React,{useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StyleSheet,
  Button,Alert,
  TouchableHighlight,
} from 'react-native';



import COLORS from '../../const/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Iconarrow from 'react-native-vector-icons/AntDesign';

import Iconmenu from 'react-native-vector-icons/Ionicons';
import pets from '../../const/pets';

const {height,width} = Dimensions.get('window');



const petCategories = [
  {name: 'MEDICINE', icon: 'cat'},
  {name: 'EQUIPMENT', icon: 'dog'},
  {name: 'BUYERS', icon: 'ladybug'},
  {name: 'TRANSPORTER', icon: 'rabbit'},

];




const HomeScreen = ({navigation}) => {
  const [selectedCategoryIndex, setSeletedCategoryIndex] = React.useState(0);
  const [filteredPets, setFilteredPets] = React.useState([]);

  const fliterPet = index => {
    const currentPets = pets.filter(
      item => item?.pet?.toUpperCase() == petCategories[index].name,
    )[0]?.pets;
    setFilteredPets(currentPets);
  };

  React.useEffect(() => {
    fliterPet(0);
  }, []);






  function rendercategory(){
     const renderItem=({item,index})=>{
      return(
      <View key={'pet' + index} style={{}}>

        <TouchableOpacity
        onPress={() => {
          setSeletedCategoryIndex(index);
          fliterPet(index);
        }}
        style={[
          style.btnCategory,
          {
            backgroundColor:
              selectedCategoryIndex == index
                ? COLORS.purchase
                : COLORS.inactive,
          },
        ]}>

         <Text style={style.categoryBtnName}>{item.name}</Text>

      </TouchableOpacity>
      </View>

      )

     }
    return(
    <FlatList 
        horizontal
        showsHorizontalScrollIndicator={false}
        data={petCategories}
        keyExtractor={item =>`${item.index}`}
        renderItem={renderItem}
        contentContainerStyle={{padding:5,}}

    />

    )
  }





  function renderProducts(){

      const renderItem = ({item}) => {
      return (
  
      <View style={style.cardmin}>

        <View style={style.TopMinContaineer}>
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
        <TouchableOpacity style={style.MiddleMiniContainer}
              activeOpacity={0.8}
               onPress={() => navigation.navigate('DetailsScreen',{item})}
        >
          <Image 
            source={item.image}
            resizeMode='contain'
            style={{height: '100%',width:'100%'}}

          />
        </TouchableOpacity>

        <View style={style.LastMinContainer}>
          <Text style={{flex:1,color:'#333'}}> Drugs may not be used in organic poultry production.</Text>
        </View>
              


      
   
      </View>
 
  );
};

    return(
    <View style={{flex:1,justifyContent:'space-between'}}>


       <FlatList
           
              numColumns={2}
              data={filteredPets}
              keyExtractor={item => `${item.id}`}
              renderItem={renderItem}
             
              contentContainerStyle={{padding:4,justifyContent:'space-between'}}
            />

    </View>



    )
  }

  return (
    <SafeAreaView style={{flex: 1, color: COLORS.white}}>
            <View style={style.upperside}>
                      <View style={style.Header}>
                          <Iconmenu name="ios-menu" size={40}  color="#ffffff" onPress={navigation.toggleDrawer} />
                          <Text style={{color:'white', fontWeight: 'bold', fontSize: 25,textAlign:'center',alignItems:'center'}}>
                            KUKU CASH
                          </Text>
                           
                              <View
                               style={{
                                  height: 40,
                                   width: 45, 
                                   borderRadius: 20,
                                    borderWidth:3,
                                   borderColor:'#fff',
                                   backgroundColor:'transparent',
                                  justifyContent:'center',
                                   alignItems:'center'
                                   }}
                                >
                                <TouchableHighlight
                                  onPress={()=>navigation.navigate('Post')}
                                
                                  underlayColor=''>


                                <Image 
                                   source={require('../../assets/plus.png')}
                                   resizeMode="cover" 
                                    style={{
                                    height: 40,
                                    width: 45,
                                    borderRadius:20
                                    }}
                                 />                                  
                                </TouchableHighlight>
    

    
                              </View>
                      </View> 


                    <View style={{backgroundColor:'tomato',borderRadius:20,borderWidth:3,borderColor:'#CDCDCD',marginTop:25}}>
                        {rendercategory()}
                    </View>
            </View>




            <View style={style.lowerside}>
                  <View style={style.searchInputContainer}>
                        <Icon name="magnify" size={24} color={COLORS.grey} />
                        <TextInput
                          placeholderTextColor={COLORS.grey}
                          placeholder="Search products"
                          style={{flex: 1}}
                        />TextInput
                        <Icon name="sort-ascending" size={24} color={COLORS.grey} />
                 </View>


                     <View style={{flex:4,justifyContent:'space-between'}}>


                        {renderProducts()}


                     </View>
            </View>
            
      
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  upperside:{
    flex:0.7,
    paddingVertical:12,
    paddingHorizontal:20,
    backgroundColor:"#03A9F4",
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20,
    elevation:5,
    borderBottomWidth:10,
    borderBottomColor:'#0099cc',
  },
  lowerside:{
    flex:4.5,
    backgroundColor:COLORS.light,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: 14,
    paddingHorizontal: 10,
    paddingVertical: 30,
    zIndex: 2,
    

  },





Header:{
        flex:0.5,
        // backgroundColor:'orange',
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:15,
    
    
      },
   
btnCategory:{
  width:100,
  height:25,
  backgroundColor:'#3d3d5c',
  margin:4,
  borderRadius:20,
  alignSelf:'center'
},


  searchInputContainer: {
    flex:0.2,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
 
  categoryBtnName: {
    color: COLORS.white,
    fontSize: 10,
    marginTop: 5,
    fontWeight: 'bold',
    textAlign:'center',
    justifyContent:'center',
    alignItems:'center'
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

});
export default HomeScreen;
