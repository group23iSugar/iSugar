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

const reNoHypoAR = ({navigation}) => {
  const [hypoReason, setHypoReason] = useState('0');
  const [hypoReasonText, setHypoReasonText]=useState('null :1');
  const [isMealTime, setIsMealTime] = useState('0');

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
              Reason: hypoReason,
              Other: hypoReasonText,



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

  const navigateHypo = () =>{
    //--------
    var time = new Date();
    var timeString = time.toString();
          try {
        db.transaction(tx => {
          tx.executeSql(
            'INSERT INTO hypoglycemiaRecords (UserID, DateTime, BGlevel, Reason, Other) VALUES (?,?,?,?,?)',
            [uID, timeString, hBGlevel, hypoReason, hypoReasonText],
          );
          console.log('inserted!!');
        });
      } catch (error) {
        console.log(error);
      }
    //--------
    //---Print---
          try {
        db.transaction(tx => {
          tx.executeSql(
            'SELECT UserID, DateTime, BGlevel, Reason FROM hypoglycemiaRecords',
            [],
            (tx, results) => {
              var rows = results.rows;

              for (let i = 0; i < rows.length; i++) {
                var userid = rows.item(i).UserID;
                var dateTime = rows.item(i).DateTime;
                var BGh = rows.item(i).BGlevel;
                var toObj = new Date(dateTime);
                var r = rows.item(i).Reason;


                console.log(
                  userid + toObj + 'hehehehhehe  ' + BGh + '  ' + recheckCounter+ '  '+r
                );
              }
            },
          );
        });
      } catch (error) {
        console.log(error);
      }
    //---Print---

    if (isMealTime == '0'){
      
      navigation.navigate('notMealTimeAR');
    } else if (isMealTime == '1'){
      navigation.navigate('CalcAR');
    }
  }
  //==================================================================
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

        </Text>
        <Text style={styles.inpTxt}></Text>

        <Text style={styles.inpTxt}>السبب المحتمل لانخفاض مستوى سكر الدم:</Text>
        <Picker
          itemStyle={{color: 'black'}}
          selectedValue={hypoReason}
          onValueChange={value => setHypoReason(value)}
          mode="dropdown"
          style={styles.picker}>
          <Picker.Item
            label="خطأ في حساب قيمة محتوى الكربوهيدرات"
            value="Inaccurate carbohydrate counting"></Picker.Item>
          <Picker.Item
            label="تناولت أقل من المخطط له عند احتساب جرعة الأنسولين"
            value="Eating less food than planed when calculating the insulin dose"></Picker.Item>
          <Picker.Item
            label="أخذت جرعة أنسولين أكثر من الجرعة المقترحة بالتطبيق"
            value="Taking insulin more than recommended by the application"></Picker.Item>
          <Picker.Item label="بعد الرياضة" value="After exercise"></Picker.Item>
          <Picker.Item label="جرعة جديدة من الأنسولين الطويل المفعول" value="New basal insulin dose"></Picker.Item>
          <Picker.Item label="اخرى" value="5"></Picker.Item>
        </Picker>

        {hypoReason == '5' ? (
          <View>
            <Text style={styles.inpTxt}>سبب آخر:</Text>
            <View style={styles.actionN}>
              <TextInput
                style={styles.textInput}
                placeholder="السبب"
                onChangeText={val => setHypoReasonText(val)}
              />
            </View>
          </View>
        ) : null}

        <Text style={styles.inpTxt}> {'\n \n '}هل ستتناول الطعام الآن؟</Text>

                <Picker
          itemStyle={{color: 'black'}}
          selectedValue={isMealTime}
          onValueChange={value => setIsMealTime(value)}
          mode="dropdown"
          style={styles.picker}>

          <Picker.Item label="لا" value="0"></Picker.Item>
          <Picker.Item label="نعم" value="1"></Picker.Item>
        </Picker>

        <TouchableOpacity
          style={{
            marginTop: 30,
            paddingTop: 15,
            marginBottom: 15,
            paddingBottom: 30,
            backgroundColor: '#6496d7',
          }}
          onPress={navigateHypo}
          >
          <Text style={{fontSize: 18, textAlign: 'center'}}>حسناً</Text>
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
  textInput: {
  flex: 1,
  marginTop: Platform.OS === 'ios' ? 0 : -12,
  paddingLeft: 10,
  color: '#05375a',
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
    paddingRight: 20,
    paddingTop: 15,
    fontSize: 18,
    color: 'black',
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
  actionN: {
  flexDirection: 'row',
  marginTop: 10,
  marginBottom: 15,
  borderRightWidth: 1,
  borderBottomWidth: 1,
  borderColor: '#CACDD1',
  paddingBottom: 5,
  
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

export default reNoHypoAR;