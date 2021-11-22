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
import personalInfo from './pages/personalInfo';
import ketones from './pages/ketones';
import insulin from './pages/insulin';
import isf from './pages/isf';
import icr from './pages/icr';
import home from './pages/Home';
import Calc from './pages/Calc';
import sliding from './pages/sliding';
import editProfile from './pages/editProfile';
import passEdit from './pages/passEdit';
import AccInfoEdit from './pages/AccInfoEdit';
import clinicEdit from './pages/clinicEdit';
import personalEdit from './pages/personalEdit';

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
global.onlinUserID = 0;
global.AccType = '';
global.centName = '';
global.centCity = '';
global.Diabetescenter= '';
global.DOD = '';
global.weightKG = 0;
global.heightCM = 0;
global.DOBirth= '';
global.DOLatestHB1AC = '';
global.latestHB1AC_ = 0; 
global.glucoseUnit = '';
global.insulinReg = '';
global.ketonesMeasure = '';
global.bgTarget = 0;
global.bgStart = 0;
global.fromBG = 0;
global.toBG= 0;
global.InsulinSF = 0;
global.intervalISF = '';
global.insulinCalcMethod = '';
global.glucoseMonitor = '';

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
        <Stack.Screen name="personal" component={personalInfo} />
        <Stack.Screen name="ketones" component={ketones} />
        <Stack.Screen name="insulin" component={insulin} />
        <Stack.Screen name="isf" component={isf} />
        <Stack.Screen name="icr" component={icr} />
        <Stack.Screen name="home" component={home} />
        <Stack.Screen name="calc" component={Calc} />
        <Stack.Screen name="sliding" component={sliding} />
        <Stack.Screen name="edit" component={editProfile}  />
        <Stack.Screen name="pass" component={passEdit}  />
        <Stack.Screen name="AccEdit" component={AccInfoEdit}  />
        <Stack.Screen name="clinicEdit" component={clinicEdit}  />
        <Stack.Screen name="personalEdit" component={personalEdit}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
  };
export default mainStack;