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
// import checkFirstAR from './checkFirstAR';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import hypoAR from './hypoAR';
import exerciseAR from './exerciseAR';
import FastingAR from './fastingAR';
import pumpFailureAR from './pumpFailureAR';
import travelAR from './travelAR';
import logbookAR from './logbook';
import EducationalAR from './EducationalAR';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const RightDrawer = createDrawerNavigator();

const AuthStackAR = () => {

    return (
        <RightDrawer.Navigator
        id ="RightDrawer"
        drawerContent={props => <CustomDrawerAR {...props}/>} screenOptions={{headerShown: false,
        drawerActiveBackgroundColor: '#AABED8',
        drawerActiveTintColor:'#fff',
        drawerInactiveTintColor: '#05375a',
         drawerLabelStyle: {marginLeft: -25, fontFamily: 'Roboto-Medium', fontSize: 15}}}>
            <RightDrawer.Screen name="الصفحة الرئيسية" component={tabHomeAR}options={{
           drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={color}/>
           ),
         }}/>
         <RightDrawer.Screen name="الاختبارات السنوية" component={annualTestAR}options={{
           drawerIcon: ({color}) => (
            <MaterialIcons name="list-alt" size={22} color={color}/>
           ),
         }}/>

        <RightDrawer.Screen name="انخفاض سكر الدم" component={hypoAR} options={{
           drawerIcon: ({color}) => (
            <AntDesign name="infocirlceo" size={22} color={color}/>
           ),
         }}/>

         <RightDrawer.Screen name="التمارين" component={exerciseAR}options={{
           drawerIcon: ({color}) => (
            <MaterialCommunityIcons name="weight-lifter" size={22} color={color}/>
           ),
         }}/>
           <RightDrawer.Screen name="يوم المرض" component={sickDayAR} options={{
           drawerIcon: ({color}) => (
            <MaterialIcons name="sick" size={22} color={color}/>
           ),
         }}/>
           <RightDrawer.Screen name="الصيام" component={FastingAR}options={{
           drawerIcon: ({color}) => (
            <FontAwesome5 name="moon" size={22} color={color}/>
           ),
         }}/>
         <RightDrawer.Screen name="السفر" component={travelAR}options={{
           drawerIcon: ({color}) => (
            <FontAwesome name="plane" size={22} color={color}/>
           ),
         }}/>

         <RightDrawer.Screen name="فشل المضخة" component={pumpFailureAR}options={{
           drawerIcon: ({color}) => (
            <MaterialIcons name="not-interested" size={22} color={color}/>
           ),
         }}/>
         <RightDrawer.Screen name="دفتر" component={logbookAR}options={{
         drawerIcon: ({color}) => (
          <MaterialCommunityIcons name="book-account" size={22} color={color}/>
         ),
       }}/>

           <RightDrawer.Screen name="مواد تثقيفية" component={EducationalAR}options={{
           drawerIcon: ({color}) => (
            <FontAwesome5 name="book-medical" size={22} color={color}/>
           ),
         }}/>
         <RightDrawer.Screen name="حول التطبيق" component={About} options={{
           drawerIcon: ({color}) => (
            <AntDesign name="infocirlceo" size={22} color={color}/>
           ),
         }}/>
         <RightDrawer.Screen name="الإعدادات" component={settingsAR} options={{
           drawerIcon: ({color}) => (
            <Feather name="settings" size={22} color={color}/>
           ),
         }}/>

        </RightDrawer.Navigator>
        // <RightDrawer.Navigator
        // useLegacyImplementation
        // id="RightDrawer"
        // drawerContent={(props) => <CustomDrawerAR {...props} />}
        // screenOptions={{
        //   drawerPosition: 'right',
        //   headerShown: true,
        // }}>
        // <RightDrawer.Screen name="الصفحة الرئيسية" component={tabHomeAR} options={{
        //    drawerIcon: ({color}) => (
        //     <Ionicons name="home-outline" size={22} color={color}/>
        //    ),
        //    }}/>

        // {/* <RightDrawer.Screen name="الإعدادات" component={settingsAR} options={{
        //    drawerIcon: ({color}) => (
        //     <Feather name="settings" size={22} color={color}/>
        //    ),
        //    }}/> */}
        //          </RightDrawer.Navigator>

    );
};

export default AuthStackAR;
