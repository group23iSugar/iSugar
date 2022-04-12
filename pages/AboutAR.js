/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

const App = ({navigation}) => {
  return (
    <View style={styles.container}>
    <View style={{top: 10, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', padding: 30}}>
         <View style={{alignItems: 'center', marginRight: 130, paddingTop: -10, paddingEnd: -20}}>
         <Text
          style={{
            color: '#05375a',
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'center',
            paddingLeft: 80,
          }}>
  حول تطبيق السَّكر
        </Text>
         </View>
                 <TouchableOpacity onPress={()=>navigation.openDrawer()}>
         <Entypo name="menu" color="#05375a" size={35} />
         </TouchableOpacity>
      </View>

        <View style={styles.footer}>
        <Text style={styles.titleB}>
        تطبيق السَّكر يهدف إلى تقديم المساعدة في الإدارة اليومية لأطفال مرضى السكري من النوع الأول.
        تطبيق السَّكر يساعد في الحسابات اليومية لجرعات الأنسولين
       </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: '#EEF0F2',
  },
  titleB: {
    color: '#05375a',
    fontSize: 25,
    textAlign: 'center',
    paddingTop: 50,
    lineHeight: 40,
    alignItems: 'center',
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
