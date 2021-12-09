<<<<<<< HEAD
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import {ImageBackground, View, Text} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const CustomDrawer = props => {
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#e9ebee'}}>
          <ImageBackground source= {require('../images/lightGray.jpg')} style={{padding: 20}}>
            <View style={{flexDirection: 'row', alignContent: 'center'}}>
            <MaterialCommunityIcons name="balloon" color="#fff" size={22}/>
             <Text style={{color: '#fff', fontSize: 18, fontFamily: 'Roboto-Medium', fontWeight: 'bold'}}>مرحبًا بك </Text>
            </View>
          </ImageBackground>
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 20}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;
=======
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import {ImageBackground, View, Text} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const CustomDrawer = props => {
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#e9ebee'}}>
          <ImageBackground source= {require('../images/lightGray.jpg')} style={{padding: 20}}>
            <View style={{flexDirection: 'row', alignContent: 'center'}}>
            <MaterialCommunityIcons name="balloon" color="#fff" size={22}/>
             <Text style={{color: '#fff', fontSize: 18, fontFamily: 'Roboto-Medium', fontWeight: 'bold'}}>مرحبًا بك </Text>
            </View>
          </ImageBackground>
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 20}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;
>>>>>>> 02d91af4584ffbad2b0fa06dde4607295acc5fa6
