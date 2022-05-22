/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
/* eslint-disable jsx-quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable space-infix-ops */
/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
/* eslint-disable no-trailing-spaces */
import React, {useEffect} from 'react';
import { StyleSheet, 
    View,
    Image, 
    Text,
    TouchableOpacity,
    useState,
    Button,
    Platform, 
    TextInput,
    Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import react from 'react';
import RadioForm, {
  RadioButton, 
  RadioButtonInput, 
  RadioButtonLabel
} from 'react-native-simple-radio-button';
import { ScrollView } from 'react-native-gesture-handler';


var accountType = [
{label: 'Patient Account: Select this account if you are a patient aged 0-18 years with Type 1 Diabetes Mellitus or his/her caregiver.'+'\n'+'\n', value: 'Patient Account', valueIndex: 0},
{label: 'Non-Patient Account: Select this account if you are not a patient and would like to access the application for educational and learning purposes.', value: 'Non-Patient Account', valueIndex: 1},
];

const signUp = ({ navigation, route}) => {
  useEffect(() => {
    AcoountTypeVlaue('Patient Account');
      }, []);
  const id = route.params;
  const [data, setData] = react.useState({
    AccountT: '',
  });

  const AcoountTypeVlaue = (value) => {
      setData({
        ...data,
        AccountT: value,
      });
  };
  AccType=data.AccountT;

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#E7EFFA', '#E7EFFA','#AABED8']} style={styles.container}>
         <View style={styles.header}>
         <Image source={require('../images/logo.png')}
         style={styles.logo}
         resizeMode='stretch'/>
         </View>
      </LinearGradient>
     
      <View style={styles.footer}>
      <ScrollView>
      <Text style={styles.title}>Choose your account type:</Text>
      <View style={styles.radioB}>
        <RadioForm
        radio_props = {accountType}
        onPress={ (value) => AcoountTypeVlaue(value) } 
        buttonSize = {15}
        buttonOuterSize = {25}
        buttonColor= '#AABED8'
        selectedButtonColor = '#8FA5C1'
        labelStyle = {{fontSize: 20, color: '#05375a',}}
        formHorizontal={false}
        

        />
        
    
        </View>
        <View style={styles.buttonV}>
          
        <TouchableOpacity onPress={()=>navigation.navigate('temp', data.AccountT )}>
                <LinearGradient
                    colors={['#E7EFFA', '#AABED8', '#AABED8']} style={styles.buttonR}
                >
                    <Text style={styles.titleB}>Continue</Text>
                  
                </LinearGradient>
            </TouchableOpacity>
            </View>
            </ScrollView>
        </View>
     
     
     </View>

         

    
  );
};




const {height} = Dimensions.get("screen");
const height_logo = height * 0.15;

export default signUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AABED8',
  },
  SignUptext: {
    backgroundColor: '#fff',
    color: '#4c4c4c',
    fontSize: 18,
    
  },
  fPassText: {
    alignItems: 'flex-start',
    marginTop: 5,
    backgroundColor: '#fff',
    color: '#4c4c4c',
    fontSize: 15
    
  },
  
  logo: {
    width: height_logo,
    height: height_logo,

  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
},
footer: {
    flex: 2.5,
    marginTop: 40,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 10,
},
radioB :{
marginTop: 45,
justifyContent: 'space-between'
},
text_footer: {
  color: '#05375a',
  fontSize: 20
},
textInput: {
  flex: 1,
  marginTop: Platform.OS === 'ios' ? 0 : -12,
  paddingLeft: 10,
  color: '#05375a',
},
title: {
    color: '#05375a',
    fontSize: 20,
    fontWeight: 'bold'
},
titleB: {
  color: '#05375a',
  fontSize: 20,
  fontWeight: 'bold',
 
},
buttonV: {
  alignItems: 'center',
  marginTop: 80
},
buttonS: {
  alignItems: 'center',
  marginTop: 40,
},
buttonF: {
  alignItems: 'flex-start',
  marginTop: 10,
},
action: {
  flexDirection: 'row',
  marginTop: 10,
  borderBottomWidth: 1,
  borderBottomColor: '#f2f2f2',
  paddingBottom: 5
},
buttonR: {
  alignItems: 'center',
  width: 200,
  height: 55,
  justifyContent: 'center',
  borderRadius: 15,
  flexDirection: 'row',
  
}
});
