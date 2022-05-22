/* eslint-disable prettier/prettier */
//NOOOOOOTTTTT CORRECT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {StyleSheet, View, Text, Dimensions, TouchableOpacity, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RadioForm from 'react-native-simple-radio-button';
import react from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
//import Modal from 'react-native-modal';

var Language  = [
    {label: 'English', value: 'English', valueIndex: 0},
    {label: 'Arabic', value: 'Arabic', valueIndex: 1},
    ];

const twoOptionAlert = () => {
  Alert.alert(
    //Title
    'Language change',
    //body
    'Are you sure you want to change language of app?',
    [
      {
        text: 'OK',
        onPress: () => {
        console.log('OK pressed');
        },
      },
      {
        text: 'Cancel',
        onPress: () => {
        console.log('Cancel pressed');
        },
      },
    ]

  );
};

const LogoutAlert = ({navigation}) => {
  Alert.alert(
    //Title
    'Language change',
    //body
    'Are you sure you want to change language of app?',
    [
      {
        text: 'OK',
        onPress: () => {
        console.log('OK pressed');
        },
      },
      {
        text: 'Cancel',
        onPress: () => {
        console.log('Cancel pressed');
        },
      },
    ]

  );
};


const language = ({navigation}) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
            languageState('English');
              // eslint-disable-next-line react-hooks/exhaustive-deps
              }, []);
          const [data, setData] = react.useState({
            currentLanguage: '',
          });

          const languageState = (value) => {
              setData({
                ...data,
                currentLanguage: value,
              });
            };
  return (
    <View style={styles.container}>
    <View style={{top: 10, flexDirection: 'row', padding: 30}}>
     <TouchableOpacity onPress={()=>navigation.openDrawer()}>
     <Entypo name="menu" color="#212222" size={35} style={{marginLeft: -10, paddingVertical: 5}} />
     </TouchableOpacity>
    </View>

   <View style={{flexDirection: 'row' ,marginLeft:15 }}>
      <Fontisto name="world-o" color="#212222" size={22}/>
       <Text style={styles.title}>Language</Text>
      </View>
    <View style={styles.footer}>
      <View style={styles.radioB}>
         <RadioForm
          radio_props = {Language}
          onPress={ twoOptionAlert }
          buttonSize = {15}
          buttonOuterSize = {25}
          buttonColor= "#717274"
          selectedButtonColor = "#656363"
          labelStyle = {{fontSize: 20, color: '#212222', padding: 10}}
          formHorizontal={false}
         />
        </View>
    </View>
    <View style={{flexDirection: 'row' ,marginLeft:15, paddingTop: 30 }}>
      <MaterialIcons name="account-circle" color="#212222" size={22}/>
       <Text style={styles.title}>Account</Text>
      </View>
    <View style={styles.buttonV}>
          <TouchableOpacity onPress={LogoutAlert}>
            <LinearGradient
              colors={['#fff', '#fff', '#fff']}
              style={styles.buttonR}>
                <SimpleLineIcons name="logout" color="#212222" size={22}/>
              <Text style={styles.titleB}>Logout</Text>

            </LinearGradient>
          </TouchableOpacity>
        </View>
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
    title: {
      color: '#212222',
      fontSize: 18,
      fontWeight: 'bold',
      marginLeft: 10,
      marginBottom: 10,
    },
    logo: {
      width: height_logo,
      height: height_logo,

    },
  footer: {
      flex: 1,
      width: 380,
      height: 50,
      marginBottom: 15,
      marginLeft: 15,
      backgroundColor: '#fff',
      borderRadius: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 10,
  },
  titleB: {
    color: '#212222',
    fontSize: 18,
    marginLeft: 10,
  },
  radioB :{
    marginTop: 45,
    justifyContent: 'space-between',
    padding: 10,
    },
    buttonV: {
      marginTop: 10,
    },
    buttonR: {
      alignItems: 'flex-end',
      marginBottom: 120,
      width: 380,
      height: 50,
      borderRadius: 3,
      flexDirection: 'row',
      marginLeft: 15,
      paddingVertical: 10,
    },
});
  export default language;
