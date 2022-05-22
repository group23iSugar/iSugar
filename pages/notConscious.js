/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
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
import react from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import SQLite from 'react-native-sqlite-storage';
import PushNotification from 'react-native-push-notification';

const notConscious = ({navigation}) => {
  //==================================================================

  // const [weight, setWeight] = useState(0);
  // const [age, setAge] = useState(0);
  const [glucagon, setGlucagon] = useState(0);
  const [CHO, setCHO] = useState(0);
  const [isOnemg, setisOnemg] = useState(false);
  //if age >= 4 -> Show intranasal glucagon

  useEffect(() => {
    glucaNum();
    CHONum();
  }, []);

  //=====================Glucagon Function================

  const glucaNum = () => {
    if (age >= 4) {
      ageFour = true;
    }
    if (age < 6) {
      if (weight < 20) {
        setGlucagon(0.5);
        setisOnemg(true);
      } else {
        setGlucagon(1);
      }
    } else {
      // if age 6 or above
      setGlucagon(1);
    }
  };

  //======================================================
  //=====================CHO Function================

  const CHONum = () => {
    if (age < 5) {
      setCHO(5);
    } else if (age < 10) {
      setCHO(10);
    } else {
      setCHO(15);
    }
  };

  //======================================================

  return (
    <LinearGradient colors={['#f5f5f5', '#f5f5f5']} style={styles.container}>
      <View style={{top: 10, alignItems: 'center'}}>
        <Image source={require('../images/logo.png')} style={styles.pic} />
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

        <Text style={styles.inpTxt}>
          Give {glucagon} mg of Glucagon intramuscular {'\n'} AND Call the
          ambulance 997 {'\n'}
          -For INTRAMUSCULAR Glucagon (dose given in the muscle) follow the
          following steps:{'\n'}
          -Remove the safety cap from the powder{'\n'}
          -containing bottle{'\n'}
          -Attach the needle on to the pre-filled syringe{'\n'}
          -Push the syringe inside the bottle then press the plunger to push all
          the liquid from syringe into the bottle.{'\n'}
          -Remove the syringe & shake the bottle well until all powder has
          dissolved{'\n'}
          -Re-insert the syringe & withdraw ALL {glucagon} ml of solution {'\n'}
          - Give the injection in the muscle (outer side of the thigh or outer
          side of the arm) {'\n'}
        </Text>

        {isOnemg ? (
          <Text
            style={{
              paddingLeft: 20,
              fontSize: 18,
              color: 'grey',
            }}>
            - Keep remaining solution in the fridge for 24h then discard {'\n'}
          </Text>
        ) : null}

        {ageFour ? (
          <Text
            style={{
              paddingLeft: 20,
              fontSize: 18,
              color: 'grey',
            }}>
            Give 3mg Glucagon intranasal AND Call the ambulance (997 in Saudi
            Arabia) {'\n'}- For INTRANASAL Glucagon (dose given in the nose):
            {'\n'}
            This comes ready to use (no mixing required) just remove the wrap,
            insert the tip of the device inside the child nostril & then press
            the plunger to give all the dose.{'\n'}
          </Text>
        ) : null}

        <TouchableOpacity
          style={{
            marginTop: 30,
            paddingTop: 15,
            marginBottom: 15,
            paddingBottom: 30,
            backgroundColor: '#6496d7',
          }}
          onPress={()=>navigation.navigate('hypo')}
        >
          <Text style={{fontSize: 18, textAlign: 'center'}}>Ok</Text>
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

export default notConscious;
