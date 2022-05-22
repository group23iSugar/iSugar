/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-quotes */
/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
import React from 'react';
import { StyleSheet, 
    View,
    Image, 
    Text,
    TouchableOpacity,
    useState,
    Button,
    Platform,
    ScrollView,
    Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import react from 'react';


  const disclaimer = ({ navigation}) =>{
    const AccountT = '';
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
      <Text style={styles.title}>Disclaimer:</Text>
      <View style={styles.textD}>
      <Text style={styles.text_footer}>- This application is developed and owned by King Saud University (KSU) and King Saud University Medical City (KSUMC) in Riyadh, Kingdom of Saudi Arabia.{'\n'}</Text>
      <Text style={styles.text_footer}>-	This application is designed to help in your daily diabetes management and provide you with recommendations based on the latest clinical pediatric Diabetes Mellitus practice guidelines.{'\n'}</Text>
      <Text style={styles.text_footer}>-	This application is not intended to replace the need to follow your doctor management plan.{'\n'}</Text>
      <Text style={styles.text_footer}>-	It is the responsibility of the user to update his/her profile frequently and with each doctor visit to have the best benefit of the application.{'\n'}</Text>
      <Text style={styles.text_footer}>-	This application is intended to be used by pediatric type 1 diabetic patients (age less than 18 years) or their caregivers.{'\n'}</Text>
      <Text style={styles.text_footer}>-	The information entered in this application will be saved and used according to KSU/KSUMC regulations that include research purposes</Text>
      </View>
      
     
        <View style={styles.buttonV}>
        <TouchableOpacity onPress={()=>navigation.navigate('accinfo', AccountT)}>
                <LinearGradient
                    colors={['#E7EFFA', '#AABED8', '#AABED8']} style={styles.buttonR}
                >
                    <Text style={styles.titleB}>Agree</Text>
                  
                </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('warning')}>
                <LinearGradient
                    colors={['#E7EFFA', '#AABED8', '#AABED8']} style={styles.buttonR}
                >
                    <Text style={styles.titleB}>Disagree</Text>
                  
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

export default disclaimer;

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
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 10,
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
    fontSize: 25,
    fontWeight: 'bold'
},

titleB: {
  color: '#05375a',
  fontSize: 20,
  fontWeight: 'bold',
 
},
buttonV: {
  flex: 1,
  flexDirection: 'row',
  marginHorizontal: 50,
  marginTop: 45,
  justifyContent: 'space-between',
  alignItems: 'center',
  
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
  width: 100,
  height: 40,
  justifyContent: 'center',
  borderRadius: 15,
  flexDirection: 'row',
  
},
textD:{
justifyContent: 'space-between',
marginTop: 25
}
});
