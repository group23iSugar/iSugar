/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
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
  FlatList,
  Dimensions,
  Linking,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Educational = ({navigation}) => {
  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <View style={{top: 10, alignItems: 'center'}}>
        <Image source={require('../images/logo.png')} style={styles.pic} />
      </View>
      <ScrollView>
        <Text
          style={{
            color: '#000',
            fontSize: 25,
            textAlign: 'center',
            paddingTop: 20,
            paddingLeft: 15,
            fontWeight: 'bold',
          }}>
          Educational Meterials
        </Text>

        <View style={styles.innerCotainer2}>
          <Text style={styles.textBody}>
            {' '}
            {'\n'}
            {'\n'}You can find all the educational materials in the following
            website
            <TouchableOpacity
              onPress={() =>
                Linking.openURL('https://isugarserver.com/educationmaterial/')
              }>
              <Text style={styles.textBody2}>
                isugarserver.com/educationmaterial
              </Text>
            </TouchableOpacity>
            {'\n'}
            {'\n'}However below you can find direct links to some of the
            important materials:{'\n'}
          </Text>

          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                'https://isugarserver.com/educationmaterial/?page_id=30',
              )
            }>
            <Text style={styles.textBody2}>
              How to use the iSugar application
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                'https://isugarserver.com/educationmaterial/?page_id=42',
              )
            }>
            <Text style={styles.textBody2}>
              How to check your blood glucose level
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                'https://isugarserver.com/educationmaterial/?page_id=43',
              )
            }>
            <Text style={styles.textBody2}>How to take the insulin dose</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                'https://isugarserver.com/educationmaterial/?page_id=44',
              )
            }>
            <Text style={styles.textBody2}>Carbohydrate counting</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                'https://isugarserver.com/educationmaterial/?page_id=45',
              )
            }>
            <Text style={styles.textBody2}>Glucagon</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                'https://isugarserver.com/educationmaterial/?page_id=46',
              )
            }>
            <Text style={styles.textBody2}>
              Hypoglycemia management (low blood glucose level)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                'https://isugarserver.com/educationmaterial/?page_id=47',
              )
            }>
            <Text style={styles.textBody2}>
              Hyperglycemia management (high blood glucose level)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                'https://isugarserver.com/educationmaterial/?page_id=48',
              )
            }>
            <Text style={styles.textBody2}>
              Diabetes and sick day management
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                'https://isugarserver.com/educationmaterial/?page_id=49',
              )
            }>
            <Text style={styles.textBody2}>
              Correct method for continuous glucose monitoring (CGM) sensor
              application
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                'https://isugarserver.com/educationmaterial/?page_id=50',
              )
            }>
            <Text style={styles.textBody2}>
              Correct method for i-Port application
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  textBody: {
    fontSize: 20,
    color: '#05375a',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textBody2: {
    marginTop: 5,
    padding: 10,

    fontSize: 15,
    backgroundColor: '#506c80',
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    borderRadius: 10,
  },
  innerCotainer: {
    backgroundColor: 'white',
    margin: 10,
    //alignItems: 'center',
    borderRadius: 15,
    padding: 5,
    width: 380,
    flexDirection: 'row',
    flexWrap: 'wrap',
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
  innerCotainer2: {
    backgroundColor: 'white',
    //  alignItems: 'center',
    borderRadius: 15,
    paddingBottom: 45,
    marginBottom: 100,
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
  buttonV: {
    backgroundColor: '#05375a',
    alignItems: 'center',
    width: 50,
    height: 35,
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
  buttonR: {
    backgroundColor: '#05375a',
    alignItems: 'center',
    width: 150,
    height: 35,
    marginTop: 20,
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
  ddown: {
    //drop down list style

    shadowColor: '#000',
    alignSelf: 'center',
    width: 140,

    alignItems: 'center',
  },
  ddown2: {
    //drop down list style

    marginTop: 20,
    marginLeft: 10,
    shadowColor: '#000',

    width: 100,
    fontSize: 5,

    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.33,
    shadowRadius: 0.62,

    elevation: 7,
    backgroundColor: '#f5f5f5',
  },
  ddown3: {
    //drop down list style

    marginTop: 20,
    marginLeft: 10,
    shadowColor: '#000',

    width: 130,
    fontSize: 5,

    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.33,
    shadowRadius: 0.62,

    elevation: 7,
    backgroundColor: '#f5f5f5',
  },
  picker: {
    color: 'grey',
  },
  msg: {
    //lables
    paddingLeft: 20,
    paddingTop: 15,
    fontSize: 18,
    color: 'red',
  },
  //====================newStyle========================
});

export default Educational;
