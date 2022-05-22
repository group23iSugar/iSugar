/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
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

const howCalc = ({navigation}) => {




  return (
    <View style={styles.container}>
      <View style={{top: 10, alignItems: 'center'}}>
        <Image source={require('../images/logo.png')} style={styles.pic} />
      </View>
      <ScrollView style={styles.contView}>


      <Text
          style={styles.textBody}>
          How was the insulin dose calculated?
        </Text>



        <View style={styles.innerCotainer2}>





          <Text
            style={styles.textBody2}>
            {howText}


          </Text>

          <TouchableOpacity style={styles.buttonR} onPress={()=>navigation.navigate('insuResult')} >
                    <Text style={{fontSize: 18, textAlign: 'center', color: 'white'}}>OK</Text>
            </TouchableOpacity>

      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    buttonR: {

        backgroundColor: '#05375a',
        alignItems: 'center',
        alignSelf: 'center',
        width: 380,
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


 textBody2:{
   padding: 10,
  fontSize: 20,
  color: '#053720',
  textAlign: 'center',
},
textBody:{

    margin:25,

      fontSize: 30,
      color: '#05375a',
      textAlign: 'center',
      fontWeight: 'bold',
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


//====================newStyle========================
});


export default howCalc;
