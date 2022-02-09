import React, {Component, useEffect, useState} from 'react';
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
import RNSearchablePicker from 'react-native-searchable-picker';
import react from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import SQLite from 'react-native-sqlite-storage';
import PushNotification from "react-native-push-notification";

const Hypo = ({navigation}) => {
  const [bgLevel, setBGlevel] = useState(0);
//===============================Online DB===========================
const updateFlag = () => {

      var time = new Date(); 
      var timeString = time.toString();
            console.log('in DB of check flag');
            // eslint-disable-next-line quotes
            var InsertAPIURL = "http://192.168.56.1/isugar/updateEMsgFlag.php";   //API to  signup

            var headers = {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            };
            var Data = {
              UserID: onlinUserID,
              Date_Time: timeString,
              GlucagonFlag: glucaFlag,
              BGlevel: hBGlevel,
              Reason:'',
              Other:'',



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
//===================================================================





   useEffect(() => {
      recheckFounder();
        }, []);

  //====================Find Recheck counter=================
  const recheckFounder = () => {
    var time = new Date(); // Mon Jan 31 2022 23:07:59 GMT+0300 (+03)

    //Find the value of the recheck counter:
    try {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT UserID, DateTime, BGlevel FROM hypoglycemiaRecords',
          [],
          (tx, results) => {
            var rows = results.rows;
            recheckCounter = 0;

            for (let i = 0; i < rows.length; i++) {
              var userid = rows.item(i).UserID;
              var dateTime = rows.item(i).DateTime;
              var BGh = rows.item(i).BGlevel;
              var toObj = new Date(dateTime);
              if (BGh <= 70) {
                if ((time - toObj) / (1000 * 60 * 60) <= 24) {
                  recheckCounter++;
                }
              }

              console.log(
                userid + toObj + 'ONGNGNGNGN  ' + BGh + '  ' + recheckCounter,
              );
            }
          },
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  //=====================Navigation to instruction Function================

  const navInstr = async() => {
    var time = new Date(); // Mon Jan 31 2022 23:07:59 GMT+0300 (+03)
    recheckFounder();

    if (hBGlevel <= 70) {
      var timeString = time.toString();

      //Insert a hypo Record:
      try {
        db.transaction(tx => {
          tx.executeSql(
            'INSERT INTO hypoglycemiaRecords (UserID, DateTime, BGlevel) VALUES (?,?,?)',
            [222, timeString, hBGlevel],
          );
          console.log('inserted!!');
        });
      } catch (error) {
        console.log(error);
      }

      updateFlag();

      //Navigate based on the recheck counter

      if (recheckCounter == 3) {
        glucaFlag = 1;
        navigation.navigate('notConscious');
      } else {
        navigation.navigate('isConPop');
      }} else if (hBGlevel > 70){ //No more Hypo or no Hypo at all

        if (recheckCounter > 0){
          recheckCounter = 0;
          navigation.navigate('reNoHypo');
        } else if (recheckCounter == 0){
          navigation.navigate('normBGfirst');
        }
      }
    //  else {
    //   //BG is greater than 70
    //   if (recheckCounter == 0) {
    //     navigation.navigate('normBGfirst');
    //   } else{
    //     navigation.navigate('reNoHypo');
    //   }
    // }
  };

  //========================================================================

  return (
    <LinearGradient colors={['#AABED8', '#fff']} style={styles.container}>
      <View style={{top: 10, alignItems: 'center'}}>
        <Image source={require('./images/logo.png')} style={styles.pic} />
      </View>
      <ScrollView style={styles.contView}>
        <Text
          style={{
            color: '#000',
            fontSize: 25,
            textAlign: 'left',
            paddingTop: 20,
            paddingLeft: 15,
          }}>
          Hypoglycemia
        </Text>
        <Text style={styles.inpTxt}></Text>

        <Text style={styles.inpTxt}>Enter your current BG levet: </Text>
        <View style={styles.vNext}>
          <TextInput
            keyboardType="decimal-pad"
            placeholder="000.00"
            onChangeText={value => (hBGlevel = value)}
            style={styles.inputT2}
          />
          <Text style={{fontSize: 15, paddingTop: 15}}>mg/dl</Text>
        </View>

        <TouchableOpacity
          style={{
            marginTop: 30,
            paddingTop: 15,
            marginBottom: 15,
            paddingBottom: 30,
            backgroundColor: '#6496d7',
          }}
          onPress={navInstr}>
          <Text style={{fontSize: 18, textAlign: 'center'}}>Go</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const {height} = Dimensions.get('screen');
const height_logo = height * 0.15;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  prefix: {
    backgroundColor: '#9c4',
  },
  text: {
    color: '#000',
    fontSize: 30,
  },
  pic: {
    width: height_logo,
    height: height_logo,
    marginRight: 10,
  },
  inputT2: {
    //inputs field
    alignSelf: 'center',
    alignItems: 'center',
    marginLeft: 110,
    color: '#000',
    width: 110,
    fontSize: 16,
    shadowColor: '#000',
    height: 50,
    textAlign: 'center',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.23,
    shadowRadius: 0.62,

    elevation: 2,
  },

  contView: {
    //Conten's view
    backgroundColor: '#fff',
    height: 550,
    width: 360,
    alignSelf: 'center',
    top: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 7,
  },

  inpTxt: {
    //lables
    paddingLeft: 20,
    paddingTop: 15,
    fontSize: 18,
    color: 'grey',
  },

  vNext: {
    // to make items next to each other
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 30,
  },

  button: {
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 10,
    width: 300,
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingLeft: 30,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.23,
    shadowRadius: 0.9,

    elevation: 3,
  },

  ddown: {
    //drop down list style

    paddingLeft: 0,
    paddingTop: 13,
    shadowColor: '#000',

    height: 40,
    width: 160,

    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.23,
    shadowRadius: 0.62,

    elevation: 2,
    backgroundColor: '#f5f5f5',
  },
  picker: {
    color: 'grey',
  },
});

export default Hypo;
