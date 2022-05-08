/* eslint-disable prettier/prettier */

import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import About from './AboutAR';
import settingsAR from './settingsAR';
import CustomDrawerAR from './CustomDrawerAR';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { tabHomeAR } from '../tabNavAR';
import annualTestAR from './annualTestAR';
import sickDayAR from './sickDayAR';
import checkFirstAR from './checkFirstAR';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import hypoAR from './hypoAR';


const Drawer = createDrawerNavigator();

const AuthStackAR = () => {

    return (
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
         <Drawer.Screen name="الاختبارات السنوية" component={annualTestAR}options={{
           drawerIcon: ({color}) => (
            <MaterialIcons name="list-alt" size={22} color={color}/>
           ),
         }}/>

        <Drawer.Screen name="انخفاض سكر الدم" component={hypoAR} options={{
           drawerIcon: ({color}) => (
            <AntDesign name="infocirlceo" size={22} color={color}/>
           ),
         }}/>

         <Drawer.Screen name="التمارين" component={checkFirstAR}options={{
           drawerIcon: ({color}) => (
            <MaterialCommunityIcons name="weight-lifter" size={22} color={color}/>
           ),
         }}/>
           <Drawer.Screen name="يوم المرض" component={sickDayAR} options={{
           drawerIcon: ({color}) => (
            <MaterialIcons name="sick" size={22} color={color}/>
           ),
         }}/>
         <Drawer.Screen name="حول التطبيق" component={About} options={{
           drawerIcon: ({color}) => (
            <AntDesign name="infocirlceo" size={22} color={color}/>
           ),
         }}/>
         <Drawer.Screen name="الإعدادات" component={settingsAR} options={{
           drawerIcon: ({color}) => (
            <Feather name="settings" size={22} color={color}/>
           ),
         }}/>

        </Drawer.Navigator>

    );
};

export default AuthStackAR;
