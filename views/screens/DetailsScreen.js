import React,{useState} from 'react';
import {
  Text,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ScrollView,
  TouchableHighlight,
  Alert,
  Dimensions,
  Modal,
  Button,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Cross from 'react-native-vector-icons/Entypo';
import COLORS from '../../const/colors';

const DetailsScreen = ({route,navigation}) => {
  const item = route.params;
   const [active , setactive] = useState(false);

  const [orderItems,setOrderItems] = React.useState([])



  const {height,width}= Dimensions.get("window")



  function editOrder(action,id,price){
            let orderList = orderItems.slice()
        let item = orderList.filter(a => a.id == id)


      if (action == "+") {

        if (item.length > 0) {
          let newQty = item[0].qty + 1
          item[0].qty = newQty
          item[0].total = item[0].qty * price
        }else{
          const newItem ={
            id:id,
            qty:1,
            price:price,
            total:price
          }
          orderList.push(newItem)
        }
        setOrderItems(orderList)
      } else {

        if (item.length >0) {
          if (item[0]?.qty > 0) {
            let newQty = item[0].qty -1
            item[0].qty = newQty
            item[0].total = newQty * price
          }
        }
        setOrderItems(orderList)


      }


  
  }



  function getItemCount(){
    let itemCount = orderItems.reduce((a,b) => a+(b.qty || 0), 0)

    return itemCount
  }


  function getTotalPrice(){
    let total =  orderItems.reduce((a,b) => a+(b.total || 0), 0)

    return total.toFixed(2)
  }


function getOderQty(id){
  let orderItem = orderItems.filter(a =>a.id == id)

  if (orderItem.length >0) {
    return orderItem[0].qty
  }
  return 0

}


function renderheader(){
  return(

    <View style={{
      height:height/10,
      width:width,
      backgroundColor:'#CDCDCD',
      flexDirection:'row',
      justifyContent:'space-between',
      paddingHorizontal:25,
      paddingTop:35,

    }}>


            <Cross
              name="squared-cross"
              size={35}
              color={COLORS.dark}
              onPress={navigation.goBack}
            />
            <Icon name="dots-vertical" size={28} color={COLORS.dark} />
        


    </View>
    )
}



  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <StatusBar backgroundColor={COLORS.background} />

      {renderheader()}

      <View style={{height: 400, backgroundColor: "#CDCDCD",width:width}}>
        <ImageBackground
          resizeMode="contain"
          source={item.item.image}
          style={{
            height: 280,
            width:width,
          }}>



          <View 
          style={{
          position:'absolute',
          flexDirection:'row',
          height:50,
          justifyContent:'center',
          alignItems:'center',
          alignSelf:'center',
          bottom:-20,
            }}>

            <TouchableHighlight
                onPress={()=> editOrder("-", item.id,item.item.price)}
              style={{
                width:50,
                backgroundColor:'#E0E0E0',
                alignItems:'center',
                justifyContent:'center',
                borderTopLeftRadius:20,

              }}
              underlayColor=''>
                  <Text style={{fontSize:23,fontWeight:'bold',}}>
                  -
                  </Text>
              
            </TouchableHighlight>

            <View
            style={{
                width:50,
                backgroundColor:'#E0E0E0',
                alignItems:'center',
                justifyContent:'center',

              }}>

                  <Text style={{fontSize:23,fontWeight:'bold',backgroundColor:'#E0E0E0',}}>
                  {getOderQty(item.id)}
                  </Text>
            </View>      

            <TouchableHighlight
                  onPress={()=> editOrder("+", item.id,item.item.price)}
              style={{
                width:50,
                backgroundColor:'#E0E0E0',
                alignItems:'center',
                justifyContent:'center',
                borderTopRightRadius:20,

              }}
              underlayColor=''>
                  <Text style={{fontSize:23,fontWeight:'bold',}}>
                  +
                  </Text>
              
            </TouchableHighlight>




        </View>
       

        </ImageBackground>


        <View style={style.detailsContainer}>
          {/* Pet name and gender icon */}
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{fontSize: 20, color: COLORS.dark, fontWeight: 'bold'}}>
              {item.item.name}
            </Text>
            {/* <Icon name="gender-male" size={25} color={COLORS.grey} /> */}
          </View>

          {/* Render Pet type and age */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
            }}>
            <Text style={{fontSize: 12, color: COLORS.dark}}>{item.item.type}</Text>
            <Text style={{fontSize: 13, color: COLORS.dark}}>{item.item.age}</Text>
          </View>

          {/* Render location and icon */}
          <View style={{marginTop: 5, flexDirection: 'row'}}>
            <Icon name="map-marker" color={COLORS.primary} size={20} />
            <Text style={{fontSize: 14, color: COLORS.grey, marginLeft: 5}}>
              {item.item.region}
            </Text>
          </View>
        </View>
      </View>

      {/* Comment container */}

    <ScrollView
      contentContainerStyle={style.contentContainer}
      style={style.scrollView}>
      
   
      
      <View style={{marginTop: 80, justifyContent: 'space-between', flex: 1,}}>

        <View >
          {/* Render user image , name and date */}
          <View style={{flexDirection: 'row', paddingHorizontal: 20}}>
            <Image
              source={item.item.owner}
              style={{height: 40, width: 40, borderRadius: 20}}
            />
            <View style={{flex: 1, paddingLeft: 10}}>
              <Text
                style={{color: COLORS.dark, fontSize: 12, fontWeight: 'bold'}}>
                {item.item.name}
              </Text>
              <Text
                style={{
                  color: COLORS.grey,
                  fontSize: 11,
                  fontWeight: 'bold',
                  marginTop: 2,
                }}>
                Owner
              </Text>
            </View>
            <Text style={{color: COLORS.grey, fontSize: 12}}>May 25, 2020</Text>
          </View>
          <Text style={style.comment}>
            My job is to transer products from one part to another part within Dodoma region. I don't have the
            opputurnity to take  product outside the country
          
          </Text>
        </View>


            <View style={{
             
              padding:7,
              height:height/13.5,
              justifyContent:'center',
              alignItems:'center'
            }}>

            <Text style={{textAlign:'center',fontSize:18}}>
                You have picked : {getItemCount()} Oders now
            </Text>            

            <Text style={{textAlign:'center',fontWeight:'bold',fontSize:30}}>
                Total Cost : {getTotalPrice()}  Tsh/=



              
            </Text>





            </View>

        {/* Render footer */}
        <View style={style.footer}>

          <TouchableHighlight
            onPress={()=>Alert.alert("Feedback", "Still in progress")}
            style={style.iconCon}
            underlayColor='green'>
                <Icon name="cart-plus" size={45} color={COLORS.white} />

          </TouchableHighlight>





              <Modal
                 animationType="slide"
                 transparent={true}
                 visible={active}
                 onRequestClose={() => {
                 console.warn("closed");
                 }}
                 >
                 <View style={{

                      flex: 0.7,
                      backgroundColor : "tomato",
                      alignItems: 'center',
                      marginTop:60,
                      
                      marginHorizontal:20,
                      borderRadius:25

                 }}>

                    <View style={{
                      height:height/14,
                      width:width/2*1.8,
                      justifyContent:'space-between',
                      flexDirection:'row',
                      paddingHorizontal:18,
                    
                    }}>
                        <Text style={{}}>

                          
                        </Text>

                        <TouchableHighlight
                          onPress={()=>{setactive(!active)}}
                          style={{}}
                          underlayColor=''>

                              <Cross
                                 name="squared-cross"
                                 size={35}
                                 color="#fff"
                                
                               />
                          
                        </TouchableHighlight>




                    </View>

                    <View style={{
                      padding:12,backgroundColor:'#F1F1F1',width:width/2*1.7,borderRadius:20,

                    }}>

                          <Text style={{}}>
                              Select payment methods
                            
                          </Text>


                    </View>






                  <TouchableHighlight
                    onPress={()=> navigation.goBack()}
                    style={{padding:16,bottom:100,position:'absolute',backgroundColor:'blue',width:width/2*1.5,borderRadius:20,}}
                    underlayColor='orange'>
                        <Text style={{color: COLORS.white, fontWeight: 'bold',textAlign:'center'}}>
                          Order
                       </Text>
                    
                  </TouchableHighlight>

                 </View>
                 </Modal>
              

          <TouchableHighlight
            onPress={()=>{setactive(!active)}}
            style={style.btn}
            underlayColor='orange'>
                <Text style={{color: COLORS.white, fontWeight: 'bold',textAlign:'center'}}>
                  PURCHASE
               </Text>
            
          </TouchableHighlight>


     

        </View>


      </View>


       </ScrollView>
      
   
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  detailsContainer: {
    height: 120,
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    flex: 1,
    bottom: -60,
    borderRadius: 18,
    elevation: 10,
    padding: 20,
    justifyContent: 'center',
  },
  comment: {
    marginTop: 10,
    fontSize: 12.5,
    color: COLORS.dark,
    lineHeight: 20,
    marginHorizontal: 20,
  },
  footer: {
    height: 100,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  iconCon: {
    backgroundColor: COLORS.purchase1,
    flex: 1,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  btn: {
    backgroundColor: COLORS.purchase,
    flex: 1,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
  },




});
export default DetailsScreen;
