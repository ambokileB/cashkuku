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
 
} from 'react-native';
import { 
  TextInput,Button
 } from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Cross from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../const/colors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const DetailsScreen =({route,navigation})=> {
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
      
      backgroundColor:'#CDCDCD',
      flexDirection:'row',
      justifyContent:'space-between',
      paddingHorizontal:25,
     

    }}>


            <Cross
              name="arrow-expand-left"
              size={35}
              color={COLORS.dark}
              onPress={navigation.goBack}
            />
            <Icon name="dots-vertical" size={28} color={COLORS.dark} />
        


    </View>
    )
}



  
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white,}}>
        
        <StatusBar backgroundColor="#9C27B0" />
        {renderheader()}
    <ScrollView 
      showsVerticalScrollIndicator={false}
    style={{flex:1}}>
          <View style={{flex:4,width:width}}>
      
      <ImageBackground
        resizeMode="contain"
        source={item.item.image}
        style={{
        height:height/2,
        margin:0
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
    
    
    
    
    <View style={styles.detailsContainer}>
      {/* Pet name and gender icon */}
      <View style={{ justifyContent: 'space-between'}}>
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
      <View style={{marginTop: 0, flexDirection: 'row'}}>
        <Icon name="map-marker" color={COLORS.primary} size={20} />
        <Text style={{fontSize: 14, color: COLORS.grey, marginLeft: 5}}>
          {item.item.region}
        </Text>
      </View>
    </View>
        {/* Comment container */}
    
    
    
      <View style={{marginTop:70, justifyContent: 'space-between', flex: 1}}>
    
            {/* Render user image , name and date */}
        <View style={{flexDirection: 'row', paddingHorizontal: 20}}>
            <Image
                source={item.item.owner}
                  style={{height: 40, width: 40, borderRadius: 20}}
            />
    
            <View style={{flex: 1, paddingLeft: 10}}>
              <Text
                        style={{
                        color: COLORS.dark,
                         fontSize: 12, 
                         fontWeight: 'bold'
                         }}>
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
          <Text style={styles.comment}>
            My job is to transer products from one part to another part within Dodoma region. I don't have the
            opputurnity to take  product outside the country
      
          </Text>
       
    
    
        <View style={{
         
          padding:7,
          height:height/13.5,
          justifyContent:'center',
          alignItems:'center'
        }}>
    
        <Text style={{textAlign:'center',fontSize:14}}>
            You have picked : {getItemCount()} Oders now
        </Text>            
    
        <Text style={{textAlign:'center',fontWeight:'500',color:'grey',fontSize:16}}>
            Total Cost : {getTotalPrice()}  Tsh/=
    
    
    
          
        </Text>
    
    
    
    
    
        </View>
    
    {/* Render footer */}
    <View style={styles.footer}>
    
      <TouchableHighlight
        onPress={()=>Alert.alert("Feedback", "Still in progress")}
        style={styles.iconCon}
        underlayColor='#AEA1FF'>
            <Icon name="cart-plus" size={26} color={COLORS.white} />
    
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
    
                  flex: 2,
                  backgroundColor : "#9900EF",
                  alignItems: 'center',
                  marginTop:20,
                  
                  marginHorizontal:10,
                  borderRadius:25
    
             }}>
    
                <View style={{
                  padding:2,
                  right:-90,
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
                             name="close"
                             size={26}
                             color="#fff"
                            
                           />
                      
                    </TouchableHighlight>
    
    
    
    
                </View>
                    
                <View style={{
                  padding:12,width:width/2*1.7,borderRadius:20,
    
                }}>
                  <Text style={{fontSize:17,color:'#fff'}}>Total Amount: <Text style={{fontWeight:'500',fontSize:16,color:COLORS.white}}>{getTotalPrice()} Tsh</Text></Text>
                </View>
                
    
                <View style={{
                  padding:5,backgroundColor:'#F1F1F1',width:width/2*1.7,borderRadius:20,
    
                }}>
                 
    
                      <Text style={{}}>
                          Select payment methods
                        
                      </Text>
    
    
                </View>

                {/* payment card */}
                <KeyboardAwareScrollView>

                <View style={{
                  padding:12,
                  borderWidth:3,
                  borderColor:'#E1E1E1',
                  width:width/2*1.7,
                  borderRadius:20,
                  marginTop:12,
                  
                }}>
                  <View style={{padding:10,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <Text style={{color:'#fff',fontSize:16,fontWeight:'500'}}>Amount </Text>
                    <View style={{
                      padding:5,
                      backgroundColor:'#F1F1F1',
                      width:width/2,
                      borderRadius:5,

                    }}>
                       <TextInput placeholder="write amount" keyboardType='phone-pad' style={styles.textInput} />


                    </View>




                  </View>
                  <View style={{padding:10,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <Text style={{color:'#fff',fontSize:21,fontWeight:'bold'}}>Account </Text>
                    <View style={{
                      padding:5,
                      backgroundColor:'#F1F1F1',
                      width:width/2,
                      borderRadius:5,

                    }}KeyboardAwareScrollView>
                      <TextInput placeholder="account number" keyboardType='phone-pad' style={styles.textInput} />
                     

                    </View>




                  </View>


                  <View style={{padding:10,flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:30}}>

                    <View style={{flexDirection:'row'}}>
                        <Text style={{color:'#fff',fontSize:17,fontWeight:'500'}}> CVV : </Text>
                        <View style={{
                          padding:0,
                          backgroundColor:'#F1F1F1',
                          width:width/7,
                          borderRadius:5,

                        }}>
                          <TextInput placeholder="cvv" keyboardType='phone-pad' style={styles.textInput} />

                        </View>
                    </View>

                    <View style={{flexDirection:'row'}}>
                    <Text style={{color:'#fff',fontSize:16,fontWeight:'500'}}>Exp :</Text>
                    <View style={{
                      padding:5,
                      backgroundColor:'#F1F1F1',
                      width:width/7,
                      borderRadius:5,

                    }}>
                      <TextInput placeholder="exp" keyboardType='phone-pad' style={styles.textInput} />

                    </View>
                  </View>







                  </View>
                </View>


                <View style={{
                  padding:2,
                  backgroundColor:'#F1F1F1',
                  width:width/2*1.7,
                  borderRadius:20,
                  marginTop:10,
                  justifyContent:'space-between',
                  alignItems:'center',
                  flexDirection:'row'


    
                }}>


                
    
               <Text style={{fontSize:16,fontWeight:'400'}}>
                          Mobile Money
                        
                      </Text>
                <View style={{
                  padding:2,
                  width:width/2,
                  borderRadius:10,
                  marginTop:5,
                  justifyContent: 'center',
    
                }}>

              <TextInput
               placeholder="phone number"
               keyboardType='phone-pad'
                style={styles.textInput} 
                />
    
    
                </View>
    
    
                </View>


                </KeyboardAwareScrollView>

              
    
    
    
    
    
    
              <TouchableHighlight
                onPress={()=> navigation.navigate('Home')}
                style={{padding:1,bottom:10,position:'absolute',backgroundColor:'#F78DA7',width:width/2*1.5,borderRadius:20,}}
                underlayColor='#FF9800'>
                    <Text style={{color: COLORS.white, fontWeight: '500',textAlign:'center',fontSize:18}}>
                      Order
                   </Text>
                
              </TouchableHighlight>
    
             </View>
             
          
             </Modal>
          
    
      <TouchableHighlight
        onPress={()=>{setactive(!active)}}
        style={styles.btn}
        underlayColor='#AEA1FF'>
            <Text style={{color: COLORS.white, fontWeight: '500',textAlign:'center'}}>
              PURCHASE
           </Text>
        
      </TouchableHighlight>
    
    
    
    
    </View>
    
    
    </View>
   
    
    
    </View>

    </ScrollView>

    
    
    
      </SafeAreaView>
    )
  
}

const styles = StyleSheet.create({

    detailsContainer: {
     
      backgroundColor: COLORS.white,
      marginHorizontal: 20,
      flex: 1,
      bottom: -20,
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
      backgroundColor: "#9900EF",
      flex: 1,
      height: 40,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 15,
    },
    btn: {
      backgroundColor: '#9900EF',
      flex: 1,
      height: 40,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    header: {
      flexDirection: 'row',
      padding: 0,
      justifyContent: 'space-between',
    },
    textInput:{ 
      
    height:23,
    borderColor: '#000',
    borderBottomWidth: 0,
   
    marginBottom: 0,
    paddingHorizontal:10,
    borderRadius:7,
  },
  
})

export default  DetailsScreen