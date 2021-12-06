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
import ketonesEdit from './pages/ketonesEdit';
import insulinEdit from './pages/insulinEdit';
import isfEdit from './pages/isfEdit';
import icrEdit from './pages/icrEdit';
import carb from './pages/carb';
import insuResult from './pages/insuResult';
import signUpAR from './pages/signUpArabic';
import AccInfoAR from './pages/AccInfoArabic';
import AccInfoAREdit from './pages/AccInfoEdit';
import carbAR from './pages/carbArabic';
import clinicEditAR from './pages/clinicEditArabic';
import ketonesAR from './pages/ketonesArabic';
import clinicInfoAR from './pages/clinicInfoArabic';
import disclaimerAR from './pages/disclaimerArabic';
import editProfileAR from './pages/editProfileArabic';
import icrAR from './pages/icrArabic';
import icrEditAR from './pages/icrEditArabic';
import insulinAR from './pages/insulinArabic';
import insulinARe from './pages/insulinEdit';
import isfARA from './pages/isfArabic';
import ketonesEditAR from './pages/ketonesEditArabic';
import logoAR from './pages/logoScreenArabic';
import passEditAR from './pages/passEditArabic';
import personalEditAR from './pages/personalEditArabic';
import warmar from './pages/warninAr';
import AuthStack from './pages/AuthStack';
import logInAR from './pages/logInAR';
import personalInfoArabic from './pages/personalInfoArabic;
import CalcAR from './pages/CalcAR;
import isfArabic from './pages/isfArabic';
import HomeAR from './pages/HomeAR';





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
        <Stack.Screen name="home" component={AuthStack} />
        <Stack.Screen name="sliding" component={sliding} />
        <Stack.Screen name="pass" component={passEdit}  />
        <Stack.Screen name="insulinEdit" component={insulinEdit}  />
        <Stack.Screen name="carb" component={carb}  />
        <Stack.Screen name="calc" component={Calc} />
        <Stack.Screen name="result" component={insuResult} />
        <Stack.Screen name="edit" component={editProfile}  />

        <Stack.Screen name="icrEdit" component={icrEdit}  />
        <Stack.Screen name="isfEdit" component={isfEdit}  />
                
        <Stack.Screen name="ketonesEdit" component={ketonesEdit}  />
        <Stack.Screen name="personalEdit" component={personalEdit}  />   
        <Stack.Screen name="clinicEdit" component={clinicEdit}  />
        <Stack.Screen name="AccEdit" component={AccInfoEdit}  />   
        <Stack.Screen name="signupAR" component={signUpAR}  />   
        <Stack.Screen name="accAR" component={AccInfoAR}  />   
        <Stack.Screen name="accEAR" component={AccInfoAREdit}  /> 
        <Stack.Screen name="carbAR" component={carbAR}  /> 
        <Stack.Screen name="ketoAR" component={ketonesAR}  /> 
        <Stack.Screen name="clinicEAR" component={clinicEditAR}  /> 
        <Stack.Screen name="clinicInfoAR" component={clinicInfoAR}  /> 
        <Stack.Screen name="discAR" component={disclaimerAR}  /> 
        <Stack.Screen name="icrAR" component={icrAR}  /> 
        <Stack.Screen name="icrERA" component={icrEditAR}  /> 
        <Stack.Screen name="isfARA" component={isfARA}  /> 
        <Stack.Screen name="insARE" component={insulinARe}  /> 
        <Stack.Screen name="insAR" component={insulinAR}  /> 
        <Stack.Screen name="editProAR" component={editProfileAR}  /> 
        <Stack.Screen name="ketonesEAR" component={ketonesEditAR}  /> 
        <Stack.Screen name="logoAR" component={logoAR}  /> 
        <Stack.Screen name="passEAR" component={passEditAR}  />  
        <Stack.Screen name="personalEAR" component={personalEditAR}  /> 
        <Stack.Screen name="warningAR" component={warmar}  /> 
        <Stack.Screen name="logInAR" component={logInAR}  />
        <Stack.Screen name="personalInfoArabic" component={personalInfoArabic}  />
        <Stack.Screen name="CalcAR" component={CalcAR}  />
        <Stack.Screen name="isfArabic" component={isfArabic}  />
        <Stack.Screen name="HomeAR" component={HomeAR}  />


      </Stack.Navigator>
    </NavigationContainer>
  );//fffSS
  };
export default mainStack;
