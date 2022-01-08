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
import AnnualTest from './annualTest';



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
         <Drawer.Screen name="Annual Test" component={AnnualTest}options={{
           drawerIcon: ({color}) => (
            <MaterialIcons name="list-alt" size={22} color={color}/>
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