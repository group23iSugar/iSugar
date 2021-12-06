/* eslint-disable prettier/prettier */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import About from './AboutAR';
import setting from './settingsAR';
import CustomDrawerAR from './CustomDrawerAR';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AnnualTest from './annualTestAR';
import { tabHomeAR } from '../tabNavAR';


const Drawer = createDrawerNavigator();

const AuthStack = () => {

    return (
      <NavigationContainer>
        <Drawer.Navigator drawerContent={props => <CustomDrawerAR {...props}/>} screenOptions={{headerShown: false,
        drawerActiveBackgroundColor: '#AABED8',
        drawerActiveTintColor:'#fff',
        drawerInactiveTintColor: '#05375a',
         drawerLabelStyle: {marginLeft: -25, fontFamily: 'Roboto-Medium', fontSize: 15}}}>
            <Drawer.Screen name="الصفحة الرئيسية" component={tabHomeAR}options={{
           drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={color}/>
           ),
         }}/>
         <Drawer.Screen name="الفحوصات السنوية" component={AnnualTest}options={{
           drawerIcon: ({color}) => (
            <MaterialIcons name="list-alt" size={22} color={color}/>
           ),
         }}/>
         <Drawer.Screen name="حول التطبيق" component={About} options={{
           drawerIcon: ({color}) => (
            <AntDesign name="infocirlceo" size={22} color={color}/>
           ),
         }}/>
         <Drawer.Screen name="الإعدادات" component={setting} options={{
           drawerIcon: ({color}) => (
            <Feather name="settings" size={22} color={color}/>
           ),
         }}/>
        </Drawer.Navigator>
        </NavigationContainer>
    );
};

export default AuthStack;
