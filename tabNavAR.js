/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, View} from 'react-native';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
//import logoScreen from './pages/logoScreen';
import home from './pages/HomeAR';
import Calc from './pages/CalcAR';
import carb from './pages/carbArabic';
import edit from './pages/editProfileArabic';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import carbAR from './pages/carbArabic';
import CalcAR from './pages/CalcAR';
import editProfileAR from './pages/editProfileArabic';

const Tab = createBottomTabNavigator();

const tabHomeAR = () => {
  return (
    <Tab.Navigator
    screenOptions={{
      tabBarShowLabel: false,
      showLabel: false,
      tabBarStyle: {
       position: 'absolute',
       bottom: 25,
       left: 20,
       right: 20,
       elevation: 0,
       backgroundColor: '#e9f2fb',
       borderRadius: 15,
       height: 70,
       ...styles.shadow,
     },
    }}
   >
     
     <Tab.Screen name="HomeAR" component={home} options={{
       tabBarIcon: ({focused}) => (
        <View>
          <Ionicons name="home-outline" size={25} style={{
          color: focused ? '#e2e2e3' : '#5d7b95'}}/>
        </View>
       ),
     }}/>
      <Tab.Screen name="carbAR" component={carbAR} options={{
       tabBarIcon: ({focused}) => (
        <View >
          <MaterialIcons name="lunch-dining" size={25} style={{
          color: focused ? '#e2e2e3' : '#5d7b95'}}/>
        </View>
       ),
     }}/>

      <Tab.Screen name="CalcAR" component={CalcAR} options={{
       tabBarIcon: ({focused}) => (
        <View>
          <Entypo name="calculator" size={25} style={{
          color: focused ? '#e2e2e3' : '#5d7b95'}}/>
        </View>
       ),
     }}/>

       <Tab.Screen name="editAR" component={editProfileAR} options={{
       tabBarIcon: ({focused}) => (
        <View>
           <Octicons name="person" size={25} style={{
          color: focused ? '#e2e2e3' : '#5d7b95'}}/>
        </View>
       ),
     }}/>


    </Tab.Navigator>
  );
  };
export {tabHomeAR};

const tabProfileAR = () => {
  return (
    <Tab.Navigator
    screenOptions={{
      tabBarShowLabel: false,
      showLabel: false,
      tabBarStyle: {
       position: 'absolute',
       bottom: 25,
       left: 20,
       right: 20,
       elevation: 0,
       backgroundColor: '#e9f2fb',
       borderRadius: 15,
       height: 70,
       ...styles.shadow,
     },
    }}
   >
     
     <Tab.Screen name="HomeAR" component={home} options={{
       tabBarIcon: ({focused}) => (
        <View>
          <Ionicons name="home-outline" size={25} style={{
          color: focused ? '#e2e2e3' : '#5d7b95'}}/>
        </View>
       ),
     }}/>
     <Tab.Screen name="carbAR" component={carbAR} options={{
       tabBarIcon: ({focused}) => (
        <View >
          <MaterialIcons name="lunch-dining" size={25} style={{
          color: focused ? '#e2e2e3' : '#5d7b95'}}/>
        </View>
       ),
     }}/>

      <Tab.Screen name="CalcAR" component={CalcAR} options={{
       tabBarIcon: ({focused}) => (
        <View>
          <Entypo name="calculator" size={25} style={{
          color: focused ? '#e2e2e3' : '#5d7b95'}}/>
        </View>
       ),
     }}/>

       <Tab.Screen name="editAR" component={editProfileAR} options={{
       tabBarIcon: ({focused}) => (
        <View>
           <Octicons name="person" size={25} style={{
          color: focused ? '#e2e2e3' : '#5d7b95'}}/>
        </View>
       ),
     }}/>

    </Tab.Navigator>
  );
  };
export {tabProfileAR};

const tabCalcAR = () => {
  return (
    <Tab.Navigator
    screenOptions={{
      tabBarShowLabel: false,
      showLabel: false,
      tabBarStyle: {
       position: 'absolute',
       bottom: 25,
       left: 20,
       right: 20,
       elevation: 0,
       backgroundColor: '#e9f2fb',
       borderRadius: 15,
       height: 70,
       ...styles.shadow,
     },
    }}
   > <Tab.Screen name="HomeAR" component={home} options={{
    tabBarIcon: ({focused}) => (
     <View>
       <Ionicons name="home-outline" size={25} style={{
       color: focused ? '#e2e2e3' : '#5d7b95'}}/>
     </View>
    ),
  }}/>
       <Tab.Screen name="carbAR" component={carbAR} options={{
       tabBarIcon: ({focused}) => (
        <View >
          <MaterialIcons name="lunch-dining" size={25} style={{
          color: focused ? '#e2e2e3' : '#5d7b95'}}/>
        </View>
       ),
     }}/>

      <Tab.Screen name="CalcAR" component={CalcAR} options={{
       tabBarIcon: ({focused}) => (
        <View>
          <Entypo name="calculator" size={25} style={{
          color: focused ? '#e2e2e3' : '#5d7b95'}}/>
        </View>
       ),
     }}/>

       <Tab.Screen name="editAR" component={editProfileAR} options={{
       tabBarIcon: ({focused}) => (
        <View>
           <Octicons name="person" size={25} style={{
          color: focused ? '#e2e2e3' : '#5d7b95'}}/>
        </View>
       ),
     }}/>

     
    </Tab.Navigator>
  );
  };
export {tabCalcAR};

const tabCarbsAR = () => {
  return (
    <Tab.Navigator
    screenOptions={{
      tabBarShowLabel: false,
      showLabel: false,
      tabBarStyle: {
       position: 'absolute',
       bottom: 25,
       left: 20,
       right: 20,
       elevation: 0,
       backgroundColor: '#e9f2fb',
       borderRadius: 15,
       height: 70,
       ...styles.shadow,
     },
    }}
   >
        <Tab.Screen name="HomeAR" component={home} options={{
       tabBarIcon: ({focused}) => (
        <View>
          <Ionicons name="home-outline" size={25} style={{
          color: focused ? '#e2e2e3' : '#5d7b95'}}/>
        </View>
       ),
     }}/>

     <Tab.Screen name="carbAR" component={carbAR} options={{
       tabBarIcon: ({focused}) => (
        <View >
          <MaterialIcons name="lunch-dining" size={25} style={{
          color: focused ? '#e2e2e3' : '#5d7b95'}}/>
        </View>
       ),
     }}/>

      <Tab.Screen name="CalcAR" component={CalcAR} options={{
       tabBarIcon: ({focused}) => (
        <View>
          <Entypo name="calculator" size={25} style={{
          color: focused ? '#e2e2e3' : '#5d7b95'}}/>
        </View>
       ),
     }}/>

       <Tab.Screen name="editAR" component={editProfileAR} options={{
       tabBarIcon: ({focused}) => (
        <View>
           <Octicons name="person" size={25} style={{
          color: focused ? '#e2e2e3' : '#5d7b95'}}/>
        </View>
       ),
     }}/>

  
    </Tab.Navigator>
  );
  };
export {tabCarbsAR};

const styles = StyleSheet.create({
  shadow: {
  shadowColor: '#686868',
  shadowOffset: {
    width: 0,
    height: 10,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.5,
  elevation: 5,
 },
});
