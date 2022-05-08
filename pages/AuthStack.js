/* eslint-disable prettier/prettier */

import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
//import logoScreen from './pages/logoScreen';
import {tabHome} from '../tabNav';
import About from './About';
import setting from './settings';
import settingsAR from './settingsAR';
import CustomDrawer from './CustomDrawer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Foundation from 'react-native-vector-icons/Foundation';
import AnnualTest from './annualTest';
import checkFirst from './checkFirst';
import hypo from './hypo';
import sickDay from './sickDay';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import fasting from './fasting';
import pumpFailure from './pumpFailure';
const Drawer = createDrawerNavigator();

const AuthStack = () => {

    return (
        <Drawer.Navigator drawerContent={props => <CustomDrawer {...props}/>} screenOptions={{headerShown: false,
        drawerActiveBackgroundColor: '#AABED8',
        drawerActiveTintColor:'#fff',
        drawerInactiveTintColor: '#05375a',
         drawerLabelStyle: {marginLeft: -25, fontFamily: 'Roboto-Medium', fontSize: 15}}}>
            <Drawer.Screen name="home" component={tabHome}options={{
           drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={color}/>
           ),
         }}/>
         <Drawer.Screen name=" Annual Test" component={AnnualTest}options={{
           drawerIcon: ({color}) => (
            <Foundation name="clipboard-notes" size={22} color={color}/>
           ),
         }}/>
         <Drawer.Screen name="Exercise" component={checkFirst}options={{
           drawerIcon: ({color}) => (
            <MaterialCommunityIcons name="weight-lifter" size={22} color={color}/>
           ),
         }}/>
           <Drawer.Screen name="Hypoglycemia" component={hypo} options={{
           drawerIcon: ({color}) => (
            <AntDesign name="infocirlceo" size={22} color={color}/>
           ),
         }}/>
           <Drawer.Screen name="Sick Day" component={sickDay} options={{
           drawerIcon: ({color}) => (
            <MaterialIcons name="sick" size={22} color={color}/>
           ),
         }}/>
         <Drawer.Screen name="Fasting" component={fasting}options={{
           drawerIcon: ({color}) => (
            <MaterialCommunityIcons name="food-off" size={22} color={color}/>
           ),
         }}/>
         <Drawer.Screen name="Pump Failure" component={pumpFailure}options={{
           drawerIcon: ({color}) => (
            <MaterialIcons name="not-interested" size={22} color={color}/>
           ),
         }}/>
         <Drawer.Screen name="About iSugar" component={About} options={{
           drawerIcon: ({color}) => (
            <AntDesign name="infocirlceo" size={22} color={color}/>
           ),
         }}/>
         <Drawer.Screen name="Settings" component={setting} options={{
           drawerIcon: ({color}) => (
            <Feather name="settings" size={22} color={color}/>
           ),
         }}/>
         <Drawer.Screen name="s" component={settingsAR} options={{
         }}/>
        </Drawer.Navigator>
    );
};

export default AuthStack;
