import React, {useState, useEffect} from 'react';
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
  Alert,
  Dimensions,
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import LinearGradient from 'react-native-linear-gradient';
import {Picker} from '@react-native-picker/picker';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PieChart} from 'react-native-chart-kit';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
//import { ActivityIndicator, Colors } from 'react-native-paper';
//import dashDB from './dashDB';

const appoinments = ({navigation}) => {
//===============================Online DB===========================
const updateFlag = () => {

  var appointmentToString = appointmentTime.toString();
        console.log('in DB of check flag');
        // eslint-disable-next-line quotes
        var InsertAPIURL = "http://192.168.56.1/isugar/updateEMsgFlag.php";   //API to  signup

        var headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        };
        var Data = {
          UserID: onlinUserID,
          DateTime: appointmentToString,
        };

      // FETCH func ------------------------------------
      fetch(InsertAPIURL,{
          method:'POST',
          headers:headers,
          body: JSON.stringify(Data),//convert data to JSON
      })
      .then((response)=>response.json()) //check response type of API (CHECK OUTPUT OF DATA IS IN JSON)
      .then((response)=>{
      })
      .catch((error)=>{
          alert('Error Occured' + error);
      })
      }
//=========================END OF  Online DB==========================================
//=========================
  var nowDate = new Date();
  var nowDateString = moment.utc(nowDate).format('yyyy/MM/DD'); // 

  const [appointmentTime, setAppointmentTime] = useState(new Date()); //Store it in database as toString
  const [showAppointmentTime, setShowAppointmentTime] = useState(false);

  const onChangeAppointmentTime = (event, selectedDate) => {
    const currentDate = selectedDate || AppointmentTime;
    setShowAppointmentTime(Platform.OS === 'ios');
    setAppointmentTime(currentDate);
  };

  const showAppointmentTimeMethod = () => {
    setShowAppointmentTime(true);
  };
  var showTime = moment(appointmentTime).format('yyyy/MM/DD');
//=========================
 const insertAppoint = () =>{

   var appointmentToString = appointmentTime.toString();
   var cDate = new Date();
   if ((appointmentTime-cDate)/(1000 * 60 * 60 *24) > 0){
   try {
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO appointments (UserID, appointmentDate) VALUES (?,?)',
          [222, appointmentToString],
        );
        console.log('inserted!!' + appointmentToString);
      });
    } catch (error) {
      console.log(error);
    }

    

    //==Notification==
    const handleNotification = ()=>{
      PushNotification.localNotificationSchedule({
        channelId: 'test',
        title: 'Do not forget your appointment this week!',
        message: 'Do not forget your appointment this week!',
        date: appointmentTime-(60*60*24*7*1000),
        allowWhileIdle: true,


      });
    }
    //================
    navigation.navigate('Home');
  } else {alert('Invalid date! \nPlease try again')}
 }
 
 
  return (
    

     <View style={styles.container}>{/** */}

      <View style={{top: 10, alignItems: 'center'}}>
        <Image source={require('./images/logo.png')} style={styles.pic} />
      </View>

      <ScrollView style={styles.contView}>
        <Text
          style={{
            color: '#000',
            fontSize: 25,
            textAlign: 'center',
            paddingTop: 20,
            paddingLeft: 15,
            fontWeight: 'bold',
          }}>
          New Appointment
        </Text>

         <View style={styles.innerCotainer}>

        <Text style={styles.textBody}>Enter the upcoming appointment date:{'\n\n'}</Text>

        <View>

                  <TouchableOpacity
                  style={{
            marginLeft: 80,
            width: 200,
            alignSelf: 'center',
            alignItems: 'center',
             borderRadius: 15,
            backgroundColor: '#05375a',
          }}
           onPress={showAppointmentTimeMethod}>
                    
          
              
              <Text style={styles.textBody2}>Set Date</Text>
            
          </TouchableOpacity>


            </View>

            <Text
              style={styles.textBody}>
              The selected date for your upcoming appointment is:  {showTime}
            </Text>

            {showAppointmentTime && (
              <DateTimePicker
                testID="appointmentTime"
                value={appointmentTime}
                mode={'date'}
                onChange={onChangeAppointmentTime}
              />
            )}

        </View> 

        


        
          <TouchableOpacity onPress={insertAppoint}>
            <LinearGradient
              colors={['#E7EFFA', '#AABED8', '#AABED8']}
              style={styles.buttonR}>
              <Text style={styles.titleB}>Add</Text>
            </LinearGradient>
          </TouchableOpacity>
        
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
textBody2:{
   fontSize: 25,
   color: 'white', 
},
textBody:{
    paddingTop:10,
    fontSize: 20,
    color: '#05375a', 
    textAlign: 'center',
    fontWeight: 'bold',
 }, 
 innerCotainer: {
  backgroundColor: 'white', margin: 10, alignItems: 'center',  borderRadius: 15, padding: 5, width: 380,
       flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
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
  alignSelf: 'center',
  fontSize: 35,
  width: 50,
  height: 35,
  justifyContent: 'center',
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

  ddown: {
  //drop down list style


  shadowColor: '#000',
  alignSelf: 'center',
  width: 140,


  alignItems: 'center',
  

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
},
//====================newStyle========================
});

export default appoinments;
