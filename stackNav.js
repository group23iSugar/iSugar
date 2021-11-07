import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import logoScreen from './pages/logoScreen';
import logIn from './pages/logIn';
import signUp from './pages/signUp';
import disclaimer from './pages/disclaimer';
import AccInfo from './pages/AccInfo';
import clinicInfo from './pages/clinicInfo';
import warning from './pages/warning';
import SQLite from 'react-native-sqlite-storage';
import calc from './pages/Calc';
import personalInfo from './pages/personalInfo';
import ketones from './pages/ketones';
import insulin from './pages/insulin';
import isf from './pages/isf';
import icr from './pages/icr';
import sliding from './pages/sliding';
import home from './pages/Home';
import edit from './pages/editProfile';

global.db = SQLite.openDatabase(
  {
    name: 'iSugar.db',
    creatFromLocation: '~iSugarL.db',
    location: 'Library'
  },
  () => {
    console.log('success');
   },
  error => {
    console.log("ERROR: " + error);
  }
);

global.uID='';
global. AccType = '';
global.centName = '';
global.centCity = '';

const Stack = createNativeStackNavigator();
const mainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
  screenOptions={{
    headerShown: false
  }}
>
      
        <Stack.Screen name="logo" component={logoScreen}  />
        <Stack.Screen name="login" component={logIn} />
        <Stack.Screen name="signup" component={signUp} />
        <Stack.Screen name="temp" component={disclaimer} />
        <Stack.Screen name="accinfo" component={AccInfo} />
        <Stack.Screen name="clinic" component={clinicInfo} />
        <Stack.Screen name="warning" component={warning} />
        <Stack.Screen name="calc" component={calc} />
        <Stack.Screen name="personal" component={personalInfo} />
        <Stack.Screen name="ketones" component={ketones} />
        <Stack.Screen name="insulin" component={insulin} />
        <Stack.Screen name="isf" component={isf} />
        <Stack.Screen name="icr" component={icr} />
        <Stack.Screen name="sliding" component={sliding} />
        <Stack.Screen name="home" component={home} />
        <Stack.Screen name="edit" component={edit} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
  };
export default mainStack;