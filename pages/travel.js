import React, {useEffect, useState} from 'react';
import { StyleSheet, 
    View,
    Image, 
    Text,
    ScrollView,
    TouchableOpacity, 
    Dimensions } from 'react-native'; 
    import LinearGradient from 'react-native-linear-gradient';
    
import {Picker} from '@react-native-picker/picker';
import { FlatList } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ActivityIndicator, Colors } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';




const travel = ({ navigation }) => {

    

    const checkInsulinType = () => {
        // checking whether user insulin is supported or not
        // if not then return false otherwise true
        var insulinType
    }
    const AdjustInsulin = () => {
        var timeDiff = 5; //call for getTimeDifference()
        if (t){

        }
    }
 
  return (

    <View style={styles.container}>
     <View style={{top: 10, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', padding: 30}}>
       
        <TouchableOpacity onPress={()=>navigation.openDrawer()}>
         <Entypo name="menu" color="#05375a" size={35} />
         </TouchableOpacity>
      </View>

        
        
         <ScrollView>
         <Text
          style={{
            color: '#05375a',
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'left',
            paddingTop: 20,
            paddingLeft: 15,
          }}>
          Travel
        </Text>
          
        </ScrollView>
    </View>      

    
  );
};


const {height} = Dimensions.get("screen");
const height_logo = height * 0.15;

export default travel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF0F2',
  },
  pic: {
    width: height_logo,
    height: height_logo,
    marginRight: 10,
},
  header: {
    justifyContent: 'center',
    alignItems: 'center'
},
body: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,

},
outer: {
    width: 275,
    height: 110,
    marginTop: 15,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    flexDirection: 'row',
    shadowColor: "#000",
    shadowOffset: {
	width: 0,
	height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inner: {
    width: 250,
    height: 110,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white'
    
  },
textHeader:{
   fontSize: 15,
   color: '#05375a', 
},
textBody:{
    fontSize: 20,
    color: '#05375a', 
    textAlign: 'center',
    fontWeight: 'bold',
 }, 
 innerCotainer: {
  backgroundColor: 'white', margin: 10, alignItems: 'center',  borderRadius: 15, padding: 10, width: 330,
              shadowColor: "#000",
              shadowOffset: {
              width: 0,
              height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
},
innerCotainer2: {
  backgroundColor: 'white', margin: 10, alignItems: 'center',  borderRadius: 15, padding: 10, width: 200,
              shadowColor: "#000",
              shadowOffset: {
              width: 0,
              height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
},
buttonV: {
  marginTop: 60,
  alignItems: 'center',
  
},
buttonR: {
  alignItems: 'center',
  width: 150,
  height: 55,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 15,
  flexDirection: 'row',
  
},
innerView: {
    flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, marginTop: 10,
}, 
container: {
  flex: 1,
  backgroundColor: '#EEF0F2',
},
header: {
  justifyContent: 'center',
  alignItems: 'center'
},
body: {
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 50,
  marginBottom: 20,

},
outer: {
  width: 275,
  height: 110,
  marginTop: 15,
  marginBottom: 20,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 15,
  flexDirection: 'row',
  shadowColor: "#000",
  shadowOffset: {
width: 0,
height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
},
inner: {
  width: 250,
  height: 110,
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  backgroundColor: 'white'
  
},
textHeader:{
 fontSize: 15,
 color: '#05375a', 
},
textBody:{
  fontSize: 20,
  color: '#05375a', 
  textAlign: 'center',
  fontWeight: 'bold',
},
  ddown: {
  //drop down list style


  marginTop: 20,
  shadowColor: '#000',
  alignSelf: 'center',
  width: 300,


  alignItems: 'center',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.33,
  shadowRadius: 0.62,

  elevation: 7,
  backgroundColor: '#f5f5f5',
},
ddown2: {
  //drop down list style


  marginTop: 20,
  marginLeft: 10,
  shadowColor: '#000',

  width: 100,
  fontSize: 5,

  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.33,
  shadowRadius: 0.62,

  elevation: 7,
  backgroundColor: '#f5f5f5',
},
  ddown3: {
  //drop down list style


  marginTop: 20,
  marginLeft: 10,
  shadowColor: '#000',

  width: 130,
  fontSize: 5,

  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.33,
  shadowRadius: 0.62,

  elevation: 7,
  backgroundColor: '#f5f5f5',
},
inpTxt: {
  //lables
  paddingLeft: 20,
  paddingTop: 15,
  fontSize: 18,
},
picker: {
  color: 'grey'
}

});

{/* */}