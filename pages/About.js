/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import {StyleSheet, View, Text, Dimensions, TouchableOpacity, Image} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';

const App = ({navigation}) => {
  return (
    <View style={styles.container}>
       <LinearGradient colors={['#E7EFFA', '#E7EFFA','#AABED8']} style={styles.container}>
       <View style={{top: 10, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', padding: 30}}>
        <Image source={require('../images/logo.png')} style={styles.pic} />
        <TouchableOpacity onPress={()=>navigation.openDrawer()}>
         <Entypo name="menu" color="#05375a" size={35} />
         </TouchableOpacity>
      </View>

        <Text style={styles.title}>About iSugar</Text>
        <View style={styles.footer}>
        <Text style={styles.titleB}>
        iSugar application aims to provide daily management for children with
        type 1 diabetes. The application helps in the daily calculations of
        insulin dose
       </Text>
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
  titleB: {
    color: '#05375a',
    fontSize: 25,
    textAlign: 'center',
    paddingTop: 50,
    lineHeight: 40,
    alignItems: 'center',
  },
  pic: {

    width: height_logo,
    height: height_logo,
    marginRight: 10,
},
  title: {
    color: '#05375a',
    fontSize: 27,
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 10,
    textAlign: 'center',
    marginVertical: 5,
  },
      logo: {
        width: height_logo,
        height: height_logo,
      },
      header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
});

export default App;
