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
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import LinearGradient from 'react-native-linear-gradient';
import {Picker} from '@react-native-picker/picker';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const how = () => {

  useEffect(() => {
     howCalc();
  }, []);

  // var calcM = route.params.calcM;
  // var reason= route.params.reasonD;

  var calcM = 'ICR';
  var reason= '5';

  const howCalc =()=>{
    if (reason=='5'){ //Correction
      setText('Total dose = (Current BG - Target BG)/ISF \n  ')
      
    } else { //meal
      if (IcalcM == 'ICR'){
        setText('Total dose = CHO/ ICR')

      }else{
        setText('Total dose = Your insulin dose based on the current time (Sliding Scale)')
      }
    }
  }

  var calcMethod ='ICR';
  var reason ='5';
  const[text, setText]=useState('');
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
            marginTop: 10,
            paddingLeft: 15,
            fontWeight: 'bold',
          }}>
          How was your insulin dose calculated:
        </Text>


              
        
          <Text
            style={{
              paddingLeft: 12,
              marginTop: 50,
              textAlign: 'center',
              fontSize: 20,
            }}>
            Based on your inputs we used the following algorithm:
            {'\n \n'+text}
            

          </Text>

        <Text style={{
              paddingLeft: 12,
              paddingRight: 12,

              marginTop: 0,
              textAlign: 'center',
              fontSize: 20,
            }}>****************</Text>

              <Text
            style={{
              paddingLeft: 12,
              paddingRight: 12,

              marginTop: 20,
              textAlign: 'center',
              fontSize: 20,
            }}>
           If you had taken an insulin dose in the past 4 hours 
           we will subtract the IOB from the total dose 
           the IOB value will be obtained as the following: {'\n'} {'\n'} 

           If Time of previous dose was 1 hour or less =>
            IOB = 100% of the previous dose {'\n'}{'\n'} 

            If Time of previous dose was from 1 to 2 hours =>
            IOB = 75% of the previous dose {'\n'}{'\n'} 

             If Time of previous dose was from 2 to 3 hours =>
            IOB = 50% of the previous dose {'\n'}{'\n'} 

             If Time of previous dose was from 3 to 4 hours =>
            IOB = 25% of the previous dose {'\n'}{'\n'}


           


            

          </Text>


          <Text
            style={{
              paddingLeft: 12,
              paddingRight: 12,

              marginTop: 20,
              textAlign: 'center',
              fontSize: 20,
            }}>
           If you have planned exercise we will subtract a precentage of the
           calculated insulin dose as the following: {'\n'} {'\n'} 

           If the duration of the exercise is from 15 to 29 minutes =>
            25% of calculated dose if the exercise is an aerobic {'\n'}{'\n'} 

            If the duration of the exercise is from 30 to 45 minutes =>
            50% of calculated dose if the exercise is an aerobic,
            25% if it is an anaerobic exercise {'\n'}{'\n'} 


            If the duration of the exercise is more than 45 minutes =>
            75% of calculated dose if the exercise is an aerobic,
            50% if it is an anaerobic exercise {'\n'}{'\n'} 


            If the duration of the exercise is Unknown =>
            25% of calculated dose if the exercise is an aerobic,
            25% if it is an anaerobic exercise {'\n'}{'\n'} 


           


            

          </Text>


          <Text
            style={{
              paddingLeft: 12,
              paddingRight: 12,

              marginTop: 20,
              textAlign: 'center',
              fontSize: 20,
            }}>
           If you had previous exercise we will subtract a precentage of the
           calculated insulin dose as the following: {'\n'} {'\n'} 


            If the duration of the exercise is from 30 to 45 minutes =>
            40% of calculated dose if the exercise is an aerobic,
            30% if it is an anaerobic exercise {'\n'}{'\n'} 


            If the duration of the exercise is more than 45 minutes =>
            50% of calculated dose if the exercise is an aerobic,
            40% if it is an anaerobic exercise {'\n'}{'\n'} 



           


            

          </Text>

 
      </ScrollView>
    </LinearGradient>
  );
};

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
    width: 70,
    height: 90,
  },
  inputT: {
    //inputs field
    alignSelf:'center',

    width: 150,
    fontSize: 25,
    shadowColor: '#000',
    height: 70,
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
  },

  vNext: {
    // to make items next to each other
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 80,
    marginLeft:25,

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
});

export default how;
