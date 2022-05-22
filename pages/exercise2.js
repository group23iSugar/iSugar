/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */


import React, {useState, useEffect} from 'react';
import react from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TextInput,
  Platform,
  TouchableOpacity,
  Image,
  Dimensions,
  alert,
  Alert,
} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import {handleScheduleNotification} from './notification.android';
import PushNotification from 'react-native-push-notification';


const exercise = ({ navigation }) => {
  var options  = [
    {label: 'If user had hypoglycemia for two consecutive days', value: 'option1', valueIndex: 0},
    {label: 'User had BG less than 50mg/dl in the past 48 hours', value: 'option2', valueIndex: 1},
    {label: 'Glucagon message appeared for the user in hypoglycemia section', value: 'option3', valueIndex: 2},
    {label: 'User selected evidence of retinopathy in the profile page', value: 'option4', valueIndex: 3},
    ];

    useEffect(() => {
      optionState('');
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);
    const [data, setData] = react.useState({
      currentOption: '',
    });
    const optionState = (value) => {
        setData({
          ...data,
          currentOption: value,
        });
      };



    const chosenOption = () => {
      // eslint-disable-next-line eqeqeq
      if (data.currentOption == ''){
        Alert.alert(
          //Title
          '',
          //body
          'It will repeat the exercise instructions every 2 weeks',
          [
            {
              text: 'OK',
              onPress: () => {
              console.log('OK pressed');
              handleScheduleNotification('iSugar','Time to recheck your blood glucose level.');
              },
            },
          ]
        );
      } else {
        Alert.alert('It will repeat the exercise instructions daily');
       navigation.navigate('exercise3');

      }
    };//if the user choose one of the cases

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#E7EFFA', '#E7EFFA','#AABED8']} style={styles.container}>
            <View style={{top: 10, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', padding: 30}}>
            <Image source={require('../images/logo.png')} style={styles.pic} />
            <TouchableOpacity onPress={()=>navigation.openDrawer()}>
             <Entypo name="menu" color="#05375a" size={35} />
             </TouchableOpacity>
          </View>
          <View style={styles.footer}>
           <View>
             <View style={styles.action}>
              <View><Text style={styles.internalText}>If you have one of the following the previous message will repeat daily: </Text></View>
              <View style={styles.action}>

      <View style={styles.radioB}>
         <RadioForm
          radio_props = {options}
          onPress={(value) => setData(value)}
          buttonSize = {15}
          buttonOuterSize = {25}
          buttonColor= "#AABED8"
          selectedButtonColor = "#8FA5C1"
          labelStyle = {{fontSize: 16, color: '#05375a', padding: 5}}
          formHorizontal={false}
         />
        </View>
    </View>
             </View>
             <View style={styles.buttonV}>
          <TouchableOpacity onPress={chosenOption}>
            <LinearGradient
              colors={['#f5f5f5', '#e9ebee', '#e9ebee']}
              style={styles.buttonR}>
              <Text style={styles.titleB}>
                Ok
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          </View>
           </View>
          </View>
          </LinearGradient>
          </View>
    );
};


const {height} = Dimensions.get('screen');
const height_logo = height * 0.15;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    },
    pic: {

      width: height_logo,
      height: height_logo,
      marginRight: 10,
  },
  footer: {
    flex: 1,
    width: 380,
    height: 30,
    marginBottom: 15,
    marginLeft: 15,
    backgroundColor: '#fff',
    borderRadius: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 10,
},
action: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 10,
    paddingBottom: 25,
  },
  internalText: {
    color: '#05375a',
    fontSize: 20,
    textAlign: 'left',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    fontWeight: '600',
    lineHeight: 30,
  },
  points: {
    color: '#05375a',
    fontSize: 16,
    textAlign: 'left',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    fontWeight: '500',
    lineHeight: 30,
  },
buttonV: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  buttonR: {
    alignItems: 'center',
    width: 150,
    height: 40,
    justifyContent: 'center',
    borderRadius: 10,
  },
  titleB: {
    color: '#05375a',
    fontSize: 20,
    fontWeight: 'bold',
  },
   radioB :{
    marginTop: 25,
    justifyContent: 'space-between',
    padding: 10,
    paddingTop:5,
    marginBottom: 10,
    },
});
export default exercise;
