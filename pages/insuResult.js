/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable semi */
/* eslint-disable no-undef */
/* eslint-disable space-infix-ops */
/* eslint-disable no-unused-vars */
/* eslint-disable no-trailing-spaces */
import React, {useState} from 'react';
import {
  StyleSheet,
  Image,
  Button,
  ScrollView,
  StatusBar,
  Text,
  View,
  AppRegistry,
  Navigator,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Switch,
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import LinearGradient from 'react-native-linear-gradient';
import {Picker} from '@react-native-picker/picker';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import moment from 'moment';

const insuResult = ({navigation, route}) => {
  
  

  
  const [dose, setDose]=useState(totalInulin);
  var cDate = new Date();
  

  const insertE = ()=>{

    //======================Save into DB========================

    var currentTime2 = new Date();
    var currentTime2String = currentTime2.toString();//new
    var currentTimeHours1 = currentTime2.getHours(); //0-23
    var currentTimeMin1 = currentTime2.getMinutes(); //0-59
    var currentTimeDate_day1 = currentTime2.getDate(); //1-31
    var currentTimeDate_month1 = currentTime2.getMonth(); //0-11
    var currentTimeDate_year1 = currentTime2.getFullYear(); //2021

      try {
          db.transaction( (tx) => {
              tx.executeSql(
               'INSERT INTO takenInsulinDose (UserID, BG_level, ReasonForInsulin, CHO, insulinDose, Dose_time_hours, Dose_time_minutes, Dose_Date_Day, Dose_Date_Month, Dose_Date_Year, spicial, dateString) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
                 [1, bgLevelDB, reasonDB, choDB, dose, currentTimeHours1, currentTimeMin1, currentTimeDate_day1, currentTimeDate_month1, currentTimeDate_year1, specialLog, currentTime2String]
             );
            
         })

         console.log('INSERTEDDDDD!!!'+currentTime2String+'    '+specialLog);
         
     } catch (error) {
         console.log(error);
     } 

     navigation.navigate('Calc');

  }

  return (
    <View style={styles.container}>
      <View style={{top: 10, alignItems: 'center'}}>
        <Image source={require('../images/logo.png')} style={styles.pic} />
      </View>
      <ScrollView style={styles.contView}>
        <Text
          style={styles.textBody}>
          Your suggested insulin dose:  {totalInulin}
        </Text>


        <View style={styles.innerCotainer2}>

                


        
          <Text
            style={styles.textBody2}>
            Please inter the insulin dose amount that you will take:
            

          </Text>

          <TextInput
            keyboardType="decimal-pad"
            defaultValue={''+totalInulin}

            onChangeText={value => setDose(value)}
            style={styles.inputT}></TextInput>



<View style={styles.buttonV}>
        <TouchableOpacity style={styles.buttonR} onPress={insertE} > 
                    <Text style={{fontSize: 18, textAlign: 'center', color: 'white'}}>Confirm</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonR} onPress={()=>navigation.navigate('Calc')} > 
                    <Text style={{fontSize: 18, textAlign: 'center', color: 'white'}}>Cancel</Text>
            </TouchableOpacity>


            </View>
        
      
        <View style={styles.vNext}>
                  <Image source={require('../images/info.png')} style={{height:45 , width:45}} />
                   <TouchableOpacity
                   onPress={()=>navigation.navigate('howCalc')}
                   >
          <Text style={{fontSize: 18, textAlign: 'center'}}>
            How did we calculate the dose?
          </Text>

        </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({

  pic: {
    width: 70,
    height: 90,
  },


//====================newStyle========================
container: {
    flex: 1,
    backgroundColor: '#EEF0F2',
  },
//   pic: {
//     width: height_logo,
//     height: height_logo,
//     marginRight: 10,
// },

body: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,

},
textBody:{

  margin:25,
    
    fontSize: 30,
    color: '#05375a', 
    textAlign: 'center',
    fontWeight: 'bold',
 }, 
 textBody2:{
   padding: 10,
  fontSize: 20,
  color: '#053720',
  textAlign: 'center',
}, 
 innerCotainer: {
  backgroundColor: 'white', margin: 10, alignItems: 'center',  borderRadius: 15, padding: 5, width: 380,
       flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
              shadowColor: '#000',
              shadowOffset: {
              width: 0,
              height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
},
innerCotainer2: {
  
  textAlign: 'left',
  backgroundColor: 'white',
  borderRadius: 15,
  marginBottom: 50,
  width: 380,
  alignSelf: 'center',
              shadowColor: '#000',
              shadowOffset: {
              width: 0,
              height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
},
vNext: {
  // to make items next to each other
  flexDirection: 'row',
  flexWrap: 'wrap',
  margin: 20,
  marginLeft:25,

},

buttonV: {
  flex: 1,
  flexDirection: 'row',
  marginHorizontal: 50,
  marginTop: 45,
  justifyContent: 'space-between',
  alignItems: 'center',
  
},
inputT: {
  //inputs field
  color: '#000',
  width: 110,
  fontSize: 16,
  shadowColor: '#000',
  height: 50,
  alignSelf: 'center',
  alignItems:'center',
  textAlign: 'center',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.23,
  shadowRadius: 0.62,

  elevation: 2,
},


buttonR: {

  backgroundColor: '#05375a',
  alignItems: 'center',
  alignSelf: 'center',
  width: 100,
  height: 45,
  marginTop:10,
  marginBottom:10,
  justifyContent: 'center',
  borderRadius: 15,
  flexDirection: 'row',
  shadowColor: '#000',
              shadowOffset: {
              width: 0,
              height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
  
  
},


//====================newStyle========================
});


export default insuResult;
