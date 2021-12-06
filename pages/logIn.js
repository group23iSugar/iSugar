/* eslint-disable prettier/prettier */
/* eslint-disable eqeqeq */
/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable semi */
/* eslint-disable no-undef */
import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Platform,
  TextInput,
  Dimensions,
  alert,
  Alert,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import react from 'react';
import SQLite from 'react-native-sqlite-storage';



//======Local Database======//
global.db = SQLite.openDatabase(
  {
    name: 'iSugear.db',
    createFromLocation: '~iSugarL.db',
    location: 'Library',
  },
  () => {
    console.log('Yes it is open');
   },
  error => {
    console.log('ERROR: ' + error);
  }
);
//===== GLOBAL Variables =========
global.onlinUserID = '0';//for online db
global.uID = '0';//for local db
global.ssID = [];//for online db
global.sID = [];//for local db 
global.takenID = '0'; //for online db
global.tID = '0';//for local db 
global.fName = '';
global.lName = '';
global.AccType = '';
global.DOBirth = '';
global.weightKG = 0;
global.DOLatestHB1AC = '';
global.latestHB1AC_ = 0;
global.glucoseMonitor = '';
global.glucoseUnit = '';
global.insulinReg = '';
global.ketonesMeasure = '';
global.InsulinSF = 0;
global.intervalISF = '';
global.bgTarget = 0;
global.bgStart = 0;
global.fromBG = 0;
global.toBG = 0;
global.insulinCalcMethod = '';
global.DOD = '';
global.heightCM = 0;
global.centName = '';
global.centCity = '';
global.Diabetescenter = 0;
global.mrn = '';
global.formBGLevel = [];//bglevel
global.toBGLevel = [];//bglevel
global.insulinDose = 0;//in taken insulin 
global.fromTime1 = [];
global.toTime1 = [];
global.ICR1 = [];
global.insulinT = '';
global.iDose = 0;
global.iTime = '';
global.halfOrfull = 0; 
global.fromTimeISF = [];
global.toTimeISF = [];
global.ISF_ = [];
global.targetBGISF = [];
global.startBGISF = [];
global.Exercisetype = '';
global.Duration = 0;
global.ExercisetypePrev = '';
global.DurationPrev = 0;
global.TimeExercisePrev = '';
global.fromTimeSS = [];
global.toTimeSS = [];
global.insulinDoseScale = [];//bglevel
global.BGLevel = 0;
global.reason = '';
global.CHO = 0;
global.insulinDose = 0;
global.doseTime = '';
global.doseDate = '';
global.suggested = '';
global.userInsulin = '';
global.counter = 0;//isf counter
global.countericr = 0;
global.counterss = 0;
global.counterbg = 0;
isAuthen = '';
global.doseHour = 0;
global.doseMin = 0;
global.doseDay = 0;
global.doseMonth = 0;
global.doseYear = 0;

const logIn = ({navigation}) => {
 // var isAuthenticated = "";
  // eslint-disable-next-line no-unused-vars
  const found = false;
  const [data, setData] = react.useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
  });
  const textInputChange = val => {
    if (val.trim().length != 0) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
    console.log(data.email);
  }
  const handlePasswordChange = val => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
    console.log(data.password);
  }
  
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  }

  const logAlert = () => {
    Alert.alert(
      //Title
      '',
      //body
      'Email or password is incorrect',
      [
        {
          text: 'OK',
          onPress: () => {
          console.log('ok pressed');
          },
        },
      ]
    
    );
    };//end twoOption
    
    const emptyAlert = () => {
      Alert.alert(
        //Title
        '',
        //body
        'please fill all the fields',
        [
          {
            text: 'OK',
            onPress: () => {
            console.log('ok pressed');
            },
          },
        ]
      
      );
      };//end twoOption
      
  const logI = async () => {
   
    if (data.email.length == 0 || data.password.length == 0) {
      emptyAlert();
    } else {
      onlineDB();
   //------------------------------------------------------------------------------------
    }//end else
  }//end method logI

    const insertInLocal = async () => {
    try {
      db.transaction( (tx) => {
          tx.executeSql(
           'INSERT INTO UserAccount (firstName, lastName, email, pass, accountType) VALUES (?,?,?,?,?)',
             [fName, lName, data.email, data.password, AccType]
         );
        //  getData();
     })
 } catch (error) {
     console.log(error);
 }

 try {
  db.transaction( (tx) => {
      tx.executeSql(
        'SELECT UserID, firstName, lastName, email, pass, accountType FROM UserAccount',
        [],
        (tx, results) => {
          var rows = results.rows;
          for (let i = 0; i < rows.length; i++) {
             uID = rows.item(i).UserID;               
              var userEmail = rows.item(i).email;
              if (data.email == userEmail){
               console.log(uID);
                return;
              }//end if
            }//end for 
        }   
) 
}  ) 
} catch (error) {
 console.log(error);
}
    }//end method 

    const insertInLocalPatient = async () => {
   console.log('in local patient');
  try {
    db.transaction( (tx) => {
        tx.executeSql(
         'INSERT INTO patientprofile (UserID, DOB, weightKG, latest_HP1AC, latest_HP1AC_date, typeOfGlucoseM, glucoseLevel_unit, ketonesMeasure, insulinRegimen, ISF, targetBG_correct, startBG_correct, ISFIntervals, insulinCalcMethod, fromBG, toBG, height, diabetes_center, diagnosis_date, center_name, center_city) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
           [uID, DOBirth, weightKG, latestHB1AC_, DOLatestHB1AC, glucoseMonitor, glucoseUnit, ketonesMeasure, insulinReg, InsulinSF, bgTarget, bgStart, intervalISF, insulinCalcMethod, fromBG, toBG, heightCM, Diabetescenter, DOD, centName, centCity ]
       );
         console.log("here inside");
      //  getData();
   })
   console.log("here outside");
} catch (error) {
   console.log(error);
}
console.log('out local patient');
    }//end method patient 


    const insertInLocalMRN = async () => {
    console.log('in local mrn');
    try {
      db.transaction( (tx) => {
          tx.executeSql(
           'INSERT INTO KSUMC (UserID, MRN) VALUES (?,?)',
             [uID, mrn]
         );
           
        //  getData();
     })
     
  } catch (error) {
     console.log(error);
  }
    }//end method mrn 

    const insertInLocalPen = async () => {
      console.log('in local pen');
      try {
        db.transaction( (tx) => {
            tx.executeSql(
             'INSERT INTO insulinPen (UserID, insulinType, halfORfull) VALUES (?,?,?)',
               [uID, insulinT, halfOrfull]
           );
             
          //  getData();
       })
       
    } catch (error) {
       console.log(error);
    }
    }//end method pen 
  
    const insertInLocalOther = async () => {
        console.log('in local other');
      try {
        db.transaction( (tx) => {
            tx.executeSql(
             'INSERT INTO insulinOther (UserID, insulinType, iDose, iTime) VALUES (?,?,?,?)',
               [uID, insulinT, iDose, iTime]
           );
          
          //  getData();
       })
       
      } catch (error) {
       console.log(error);
      }
    }//end method other 

    const insertInLocalISF = async () => {
      console.log('in local isf');
      var length = fromTimeISF.length;
      console.log('length: ', length);
     for (let i = 0; i < length; i++){
      try {
        db.transaction( (tx) => {
          tx.executeSql(
           'INSERT INTO isfInterval (UserID, fromTime, toTime, ISF, targetBG_correct, startBG_correct) VALUES (?,?,?,?,?,?)',
             [uID, fromTimeISF[i], toTimeISF[i], ISF_[i], targetBGISF[i], startBGISF[i]]
         );
        
        //  getData();
     })
      } catch (error) {
       console.log(error);
      }
    }//end for 
    }//end method 

    const insertInLocalICR = async () => {
      console.log('in local icr');
      var length = fromTime1.length;
      console.log('length: ', length);
     for (let i = 0; i < length; i++){
      try {
        db.transaction( (tx) => {
          tx.executeSql(
           'INSERT INTO icrInterval (UserID, fromTime, toTime, ICR) VALUES (?,?,?,?)',
             [uID, fromTime1[i], timeTo1[i], ICR1[i] ]
         );
        
        //  getData();
     })
       
      } catch (error) {
       console.log(error);
      }
    }//end for
    }//end method 

    const insertInLocalSS = async () => {
      console.log('in local sliding');
      var length = fromTimeSS.length;
      console.log('length: ', length);
     for (let i = 0; i < length; i++){
      try {
        db.transaction( (tx) => {
          tx.executeSql(
           'INSERT INTO ssInterval (UserID, fromTime, toTime) VALUES (?,?,?)',
             [uID, fromTimeSS[i], toTimeSS[i]]
         );
        
        //  getData();
     })
       
      } catch (error) {
       console.log(error);
      }
    }//end for 
//To find sliding scale id from local database 
      try {
        db.transaction( (tx) => {
            tx.executeSql(
              'SELECT ssID, UserID, fromTime, toTime FROM ssInterval',
              [],
              (tx, results) => {
                var rows = results.rows;
                for (let i = 0; i < rows.length; i++) {
                   sID = rows.item(i).ssID;               
                    var USERID = rows.item(i).UserID;
                    if (uID == USERID){
                     console.log(sID);
                      return;
                    }//end if
                  }//end for 
              }   
      ) 
      }  ) 
      } catch (error) {
       console.log(error);
      }
    }//end method 

    const insertInLocalBGlevel = async () => {
      console.log('in local bg level to insulin');
      var length = formBGLevel.length;
      console.log('length in bg: ', length);
     for (let i = 0; i < length; i++){
      try {
        db.transaction( (tx) => {
          tx.executeSql(
           'INSERT INTO bgleveltoinsulin (ssID, fromBGLevel, toBGLevel, insulinDose) VALUES (?,?,?,?)',
             [sID, formBGLevel[i], toBGLevel[i], insulinDoseScale[i]]
         );
        
        //  getData();
      })
       
      } catch (error) {
       console.log(error);
      }
    }//end for 
    }//end method 

    const insertInLocalTakenInsulin = async () => {
      console.log('in local  taken insulin');
      try {
        db.transaction( (tx) => {
          tx.executeSql(
           'INSERT INTO takenInsulinDose (UserID, BG_Level, ReasonForInsulin, CHO, insulinDose, Dose_time_hours, Dose_time_minutes, Dose_Date_Month, Dose_Date_Day, Dose_Date_Year) VALUES (?,?,?,?,?,?,?,?,?,?)',
             [uID, BGLevel, reason, CHO, insulinDose, doseHour, doseMin, doseMonth, doseDay, doseYear]
             //, suggestedInsulin, userInsulin
         );
        
        //  getData();
      })
       
      } catch (error) {
       console.log(error);
      }

      //to find taken insulin id from local db 
      try {
        db.transaction( (tx) => {
            tx.executeSql(
              'SELECT takenInsulinID, UserID, BG_Level, ReasonForInsulin, CHO, insulinDose, Dose_time, Dose_date FROM takenInsulinDose',
              [],
              (tx, results) => {
                var rows = results.rows;
                for (let i = 0; i < rows.length; i++) {
                   tID = rows.item(i).takenInsulinID;               
                    var USERID = rows.item(i).UserID;
                    var c = rows.item(i).CHO;
                    if (uID == USERID){
                     console.log(tID);
                     console.log('CHO: ',c);
                      return;
                    }//end if
                  }//end for 
              }   
      ) 
      }  ) 
      } catch (error) {
       console.log(error);
      }
    }//end method 

    const insertInLocalPlanned = async () => {
      console.log('in local planned');
      try {
        db.transaction( (tx) => {
          tx.executeSql(
           'INSERT INTO plannedExercise (takenInsulinID, type, duration) VALUES (?,?,?)',
             [tID, Exercisetype, Duration]
         );
        
        //  getData();
      })
       
      } catch (error) {
       console.log(error);
      }
    }//end method

    const insertInLocalPrev = async () => {
      console.log('in local prev');
      try {
        db.transaction( (tx) => {
          tx.executeSql(
           'INSERT INTO prevoiusExercise (takenInsulinID, type, duration, time) VALUES (?,?,?,?)',
             [tID, ExercisetypePrev, DurationPrev, TimeExercisePrev]
         );
        
        //  getData();
      })
       
      } catch (error) {
       console.log(error);
      }
    }//end method 


    //==========================================================ONLINE DATABASE=====================================================================
  const onlineDB = () => {
    console.log('in database');
    var InsertAPIURL = "http://192.168.56.1/isugar/AuthenticateUserAcc.php";   //API to  signup
  
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    console.log(data.email + '-' + data.password);
    var Data = {
      email: data.email,
      pass: data.password,
    };
    console.log('Hi: ');
  // FETCH func ------------------------------------
  fetch(InsertAPIURL,{
      method:'POST',
      headers:headers,
      body: JSON.stringify(Data) //convert data to JSON
  })
  .then((response)=>response.json()) //check response type of API (CHECK OUTPUT OF DATA IS IN JSON)
  .then((response)=>{

    onlinUserID = response[0].userID;
    isAuthen = response[0].flag;
    console.log(response[0].flag);

if (response[0].flag == "true"){
 // if (onlinUserID != '0'){
    console.log(response[0].userID);
     fName = response[0].firstName;
      console.log(response[0].firstName);
     lName = response[0].lastName;
      console.log(response[0].lastName);
     AccType = response[0].userAccType;
     console.log(response[0].userAccType);
      console.log('inside authenticate: ');
        navigation.navigate('home');    
//} 
console.log(onlinUserID + '-' + fName + '-' + lName + '-' + AccType);
onlineDBProfile();
insertInLocal();
}
else if (response[0].flag == "false"){
  logAlert();
}
 
})
  .catch((error)=>{
      alert("Error Occured" + error);
  })
  console.log('inside onlineDB: ');
  }
//-------------------------for patient profile info ------------------------
const onlineDBProfile = () => {
  console.log('in database2');
  var InsertAPIURL = "http://192.168.56.1/isugar/AuthenticatePatientProfile.php";   //API to  signup

  var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  
  var Data = {
    email: data.email,
    pass: data.password,
    UserID: onlinUserID,
  };

// FETCH func ------------------------------------
fetch(InsertAPIURL,{
    method:'POST',
    headers:headers,
    body: JSON.stringify(Data) //convert data to JSON
})
.then((response)=>response.json()) //check response type of API (CHECK OUTPUT OF DATA IS IN JSON)
.then((response)=>{

  if (onlinUserID != '0'){
//onlinUserID = response[0].userID;
 DOBirth = response[0].dob;
   console.log(response[0].dob);
 weightKG = response[0].weight_KG;
   console.log(response[0].weight_KG);
 latestHB1AC_ = response[0].latest_HP1AC;
   console.log(response[0].latest_HP1AC);
 DOLatestHB1AC = response[0].latest_HP1AC_date;
   console.log(response[0].latest_HP1AC_date);
 glucoseMonitor = response[0].typeOfGlucoseM;
   console.log(response[0].typeOfGlucoseM);
 glucoseUnit = response[0].glucoseLevel_unit;
   console.log(response[0].glucoseLevel_unit);
 ketonesMeasure = response[0].ketonesMeasure;
   console.log(response[0].ketonesMeasure);
 insulinReg = response[0].insulinRegimen;
   console.log(response[0].insulinRegimen);
 InsulinSF = response[0].ISF;
   console.log(response[0].ISF);
 intervalISF = response[0].ISFInter;
   console.log(response[0].ISFInter);
 bgTarget = response[0].targetBG;
   console.log(response[0].targetBG);
 bgStart = response[0].startBG;
   console.log(response[0].startBG);
 insulinCalcMethod = response[0].insulinCalc;
   console.log(response[0].insulinCalc);
 fromBG = response[0].fromBG;
   console.log(response[0].fromBG);
 toBG = response[0].toBG;
   console.log(response[0].toBG);
 heightCM = response[0].heightM;
   console.log(response[0].heightM);
 DOD = response[0].diagnosisD;
   console.log(response[0].diagnosisD);
 mrn = response[0].MRN;
   console.log(response[0].MRN);
 centName = response[0].nameC;
   console.log(response[0].nameC);
 centCity = response[0].city;
   console.log(response[0].city);
 Diabetescenter = response[0].diabetes_center;
   console.log(response[0].diabetes_center);
 console.log('inside authenticate of patient user: ');
} 
console.log('Patient profile');
insertInLocalPatient();
insertInLocalMRN();

if (insulinReg == 'Pen'){
  onlineDBPen();
}
else {
  onlineDBOther();
}

if (intervalISF == 1){
  onlineDBISF();
}

if (insulinCalcMethod == 'ICR'){
  onlineDBICRinter();
} else if (insulinCalcMethod == 'Sliding Scale'){
  onlineDBSSInterval();
}

onlineDBTakenInsulin();

})
.catch((error)=>{
    alert("Error Occured" + error);
})
console.log('inside onlineDB pateint profile: ');
}

//------------------------for insulin type PEN -----------------------------
const onlineDBPen = () => {
  console.log('in database4');
  var InsertAPIURL = "http://192.168.56.1/isugar/AuthenticateInsulinPen.php";   //API to  signup

  var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  
  var Data = {
    UserID: onlinUserID,
    email: data.email,
    pass: data.password,
  };

// FETCH func ------------------------------------
fetch(InsertAPIURL,{
    method:'POST',
    headers:headers,
    body: JSON.stringify(Data) //convert data to JSON
})
.then((response)=>response.json()) //check response type of API (CHECK OUTPUT OF DATA IS IN JSON)
.then((response)=>{

if (onlinUserID != '0'){
//onlinUserID = response[0].userID;
insulinT = response[0].insulinType;
console.log(response[0].insulinType);
halfOrfull = response[0].halfOrFull;
console.log(response[0].halfOrFull);
}
insertInLocalPen();
})
.catch((error)=>{
    alert("Error Occured" + error);
})
}//end method

//-------------------------- insulin Other ----------------------------------
const onlineDBOther = () => {
  console.log('in database5');
  var InsertAPIURL = "http://192.168.56.1/isugar/AuthenticateInsulinOther.php";   //API to  signup

  var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  
  var Data = {
    UserID: onlinUserID,
    email: data.email,
    pass: data.password,
  };

// FETCH func ------------------------------------
fetch(InsertAPIURL,{
    method:'POST',
    headers:headers,
    body: JSON.stringify(Data) //convert data to JSON
})
.then((response)=>response.json()) //check response type of API (CHECK OUTPUT OF DATA IS IN JSON)
.then((response)=>{

if (onlinUserID != '0'){
//onlinUserID = response[0].userID;
insulinT = response[0].insulinType;
console.log(response[0].insulinType);
iDose = response[0].iDose;
console.log(response[0].iDose);
iTime = response[0].iTime;
console.log(response[0].iTime);
}
insertInLocalOther();
})
.catch((error)=>{
    alert("Error Occured" + error);
})
}//end emthod 

//--------------------------ISF INTERVAL--------------------------------------
const onlineDBISF = () => {
  console.log('in database6');
  var InsertAPIURL = "http://192.168.56.1/isugar/AuthenticateISFInterval2.php";   //API to  signup

  var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  
  var Data = {
    UserID: onlinUserID,
    email: data.email,
    pass: data.password,
  };

// FETCH func ------------------------------------
fetch(InsertAPIURL,{
    method:'POST',
    headers:headers,
    body: JSON.stringify(Data) //convert data to JSON
})
.then((response)=>response.json()) //check response type of API (CHECK OUTPUT OF DATA IS IN JSON)
.then((response)=>{

if (onlinUserID != '0'){
  counter = response[1];
  console.log('counter', counter);
//onlinUserID = response[0].userID;
for (let i = 0; i < counter; i++ ){
  fromTimeISF.push([response[0][i].fromTime]);
  //console.log(fromTimeISF);
 toTimeISF.push([response[0][i].toTime]);
  //console.log(toTimeISF);
 ISF_.push([response[0][i].ISF]);
  //console.log(ISF_);
 targetBGISF.push([response[0][i].targetBG]);
  //console.log(targetBGISF);
 startBGISF.push([response[0][i].startBG]);
  //console.log(startBGISF);
}
} 
console.log(fromTimeISF);
console.log(toTimeISF);
console.log(ISF_);
console.log(targetBGISF);
console.log(startBGISF);
insertInLocalISF();
})
.catch((error)=>{
    alert("Error Occured" + error);
})
}//end method 

//-------------------------ICR INTERVAL---------------------------------------
const onlineDBICRinter = () => {
  console.log('in database icr 7');
  var InsertAPIURL = "http://192.168.56.1/isugar/AuthenticateICRInterval2.php";   //API to  signup

  var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  
  var Data = {
    UserID: onlinUserID,
    email: data.email,
    pass: data.password,
  };

// FETCH func ------------------------------------
fetch(InsertAPIURL,{
    method:'POST',
    headers:headers,
    body: JSON.stringify(Data) //convert data to JSON
})
.then((response)=>response.json()) //check response type of API (CHECK OUTPUT OF DATA IS IN JSON)
.then((response)=>{

if (onlinUserID != '0'){
  countericr = response[1];
  console.log('counter', countericr);
//onlinUserID = response[0].userID;
for (let i = 0; i < countericr; i++){
  fromTime1.push([response[0][i].fromTime]);
  toTime1.push([response[0][i].toTime]);
  ICR1.push([response[0][i].ICR]);
}
} 
 console.log(fromTime1);
 console.log(toTime1);
 console.log(ICR1);
insertInLocalICR();
})
.catch((error)=>{
    alert("Error Occured" + error);
})
}

//---------------------sliding scale interval --------------------------------
const onlineDBSSInterval = () => {
  console.log('in database sliding scale');
  var InsertAPIURL = "http://192.168.56.1/isugar/AuthenticateSlidingScaleInterval2.php";   //API to  signup

  var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  
  var Data = {
    UserID: onlinUserID,
    email: data.email,
    pass: data.password,
  };

// FETCH func ------------------------------------
fetch(InsertAPIURL,{
    method:'POST',
    headers:headers,
    body: JSON.stringify(Data) //convert data to JSON
})
.then((response)=>response.json()) //check response type of API (CHECK OUTPUT OF DATA IS IN JSON)
.then((response)=>{
 
  //ssID = response[0].ssID; 
  
if (onlinUserID != '0'){
  counterss = response[0];
  console.log('counter', counterss);
  //ssID.push([response[2].sID]);
 // console.log('ssID: ',response[0].ssID);
 //ssID.push([response[2]);
  for (let i = 0; i < counterss; i++){
   // ssID.push([response[2][i].sID);
   // ssID.push([response[1][i]]);
    fromTimeSS.push([response[2][i].fromTime]);
    toTimeSS.push([response[2][i].toTime]);
  }
//onlinUserID = response[0].userID;

}
//console.log('ssID; ',ssID);
console.log(fromTimeSS);
console.log(toTimeSS);
insertInLocalSS();
onlineDB_BGLevel();

})
.catch((error)=>{
    alert("Error Occured" + error);
})
}//end method 

//--------------------------bg level-------------------------------------------
const onlineDB_BGLevel = () => {
  console.log('in database bg level to insulin....');
  var InsertAPIURL = "http://192.168.56.1/isugar/AuthenticateBGLevelInsulin2.php";   //API to  signup

  var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  
  var Data = {
    UserID: onlinUserID,
    email: data.email,
    pass: data.password,
    //ssID: ssID,
  };

// FETCH func ------------------------------------
fetch(InsertAPIURL,{
    method:'POST',
    headers:headers,
    body: JSON.stringify(Data) //convert data to JSON
})
.then((response)=>response.json()) //check response type of API (CHECK OUTPUT OF DATA IS IN JSON)
.then((response)=>{

  console.log('inside bglevel before if');
if (onlinUserID != '0'){
 // console.log('inside bglevel before for');
  counterbg = response[1];
  console.log('counter BG level: ', counterbg);
//onlinUserID = response[0].userID;
//sID = response[0].ssID;
// console.log(response[0].ssID);
//counterbg = response[1];
//
//counterbg = response[1];
//console.log('counter', counterbg);
//console.log(response[0].ssID);
for (let j = 0; j < counterbg; j++){
  sID.push([response[2][j].fromBGLevel]);
 formBGLevel.push([response[2][j].fromBGLevel]);
 toBGLevel.push([response[2][j].toBGLevel]);
 insulinDoseScale.push([response[2][j].insulinDose]);
//}
//for (let i = 0; i < 2; i++){
 // formBGLevel.push([response[i].fromBGLevel]);
 // toBGLevel.push([response[i].toBGLevel]);
 // insulinDoseScale.push([response[i].insulinDose]);
//}
}//end for
} 
console.log(sID);
console.log(formBGLevel);
console.log(toBGLevel);
console.log(insulinDoseScale);
insertInLocalBGlevel();
})
.catch((error)=>{
    alert("Error Occured" + error);
})
}//end method 

//--------------------- Taken Insulin -----------------------------------------
const onlineDBTakenInsulin = () => {
  console.log('in database taken insulin ');
  var InsertAPIURL = "http://192.168.56.1/isugar/AuthenticateTakenInsulin.php";   //API to  signup

  var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  
  var Data = {
    UserID: onlinUserID,
    email: data.email,
    pass: data.password,
  };

// FETCH func ------------------------------------
fetch(InsertAPIURL,{
    method:'POST',
    headers:headers,
    body: JSON.stringify(Data) //convert data to JSON
})
.then((response)=>response.json()) //check response type of API (CHECK OUTPUT OF DATA IS IN JSON)
.then((response)=>{

  takenID = response[0].takenInslin; 
if (takenID != '0'){
//onlinUserID = response[0].userID;
console.log(response[0].takenInslin);
BGLevel = response[0].BGLevel;
console.log(response[0].BGLevel);
reason = response[0].reasonForInsulin;
console.log(response[0].reasonForInsulin);
CHO = response[0].CHO;
console.log(response[0].CHO);
insulinDose = response[0].insulinDose;
console.log(response[0].insulinDose);
doseHour = response[0].Dose_time_hours;
console.log(response[0].Dose_time_hours);
doseMin = response[0].Dose_time_minutes;
console.log(response[0].Dose_time_minutes);
doseDay = response[0].Dose_Date_Day;
console.log(response[0].Dose_Date_Day);
doseMonth = response[0].Dose_Date_Month;
console.log(response[0].Dose_Date_Month);
doseYear = response[0].Dose_Date_Year;
console.log(response[0].Dose_Date_Year);
suggested = response[0].suggestedAccepted;
console.log(response[0].suggestedAccepted);
userInsulin = response[0].userInsulinDose;
console.log(response[0].userInsulinDose);

}
insertInLocalTakenInsulin(); //local 

  onlineDBPlannedEx();
  onlineDBPreEx();

})
.catch((error)=>{
    alert("Error Occured" + error);
})
}//end method 

//------------------------------planned exercise-------------------------------
const onlineDBPlannedEx = () => {
  console.log('in database planned exercise');
  var InsertAPIURL = "http://192.168.56.1/isugar/AuthenticatePlannedEx.php";   //API to  signup

  var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  
  var Data = {
    UserID: onlinUserID,
    email: data.email,
    pass: data.password,
    takenInslin: takenID,
  };

// FETCH func ------------------------------------
fetch(InsertAPIURL,{
    method:'POST',
    headers:headers,
    body: JSON.stringify(Data) //convert data to JSON
})
.then((response)=>response.json()) //check response type of API (CHECK OUTPUT OF DATA IS IN JSON)
.then((response)=>{

if (takenID != '0'){
//onlinUserID = response[0].takenInslin;
//console.log(response[0].takenInslin);
Exercisetype = response[0].typeEx;
console.log(response[0].typeEx);
Duration = response[0].duration;
console.log(response[0].duration);

} 
insertInLocalPlanned();
})
.catch((error)=>{
    alert("Error Occured" + error);
})
}//end method 

//---------------------prevoius exerices----------------------------------------
const onlineDBPreEx = () => {
  console.log('in database prevoius ');
  var InsertAPIURL = "http://192.168.56.1/isugar/AuthenticatePreviousEx.php";   //API to  signup

  var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  
  var Data = {
    UserID: onlinUserID,
    email: data.email,
    pass: data.password,
    takenInslin: takenID,
  };

// FETCH func ------------------------------------
fetch(InsertAPIURL,{
    method:'POST',
    headers:headers,
    body: JSON.stringify(Data) //convert data to JSON
})
.then((response)=>response.json()) //check response type of API (CHECK OUTPUT OF DATA IS IN JSON)
.then((response)=>{
 
if (takenID != '0'){
//onlinUserID = response[0].userID;
ExercisetypePrev = response[0].typeEx;
console.log(response[0].typeEx);
DurationPrev = response[0].duration;
console.log(response[0].duration);
TimeExercisePrev = response[0].timeEX;
console.log(response[0].timeEX);

} 
insertInLocalPrev();
})
.catch((error)=>{
    alert("Error Occured" + error);
})
}

//======================================================END ONLINE DATABASE========================================================
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#E7EFFA', '#E7EFFA', '#AABED8']}
        style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('../images/logo.png')}
            style={styles.logo}
            resizeMode="stretch"
          />
        </View>
      </LinearGradient>
      <View style={styles.footer}>
        <Text style={styles.text_footer}>Email</Text>
        <View style={styles.action}>
          <MaterialIcons name="alternate-email" color="#8CA1BB" size={20} />

          <TextInput
            style={styles.textInput}
            placeholder="example@gmail.com"
            autoCapitalize="none"
            onChangeText={val => textInputChange(val)}
          />
          {data.check_textInputChange ? (
            <Feather name="check-circle" color="green" size={20} />
          ) : null}
        </View>

        <Text
          style={[
            styles.text_footer,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              marginTop: 35
            }
          ]}>
          Password
        </Text>
        <View style={styles.action}>
          <FontAwesome name="lock" color="#8CA1BB" size={20} />
          <TextInput
            style={styles.textInput}
            placeholder="***********"
            autoCapitalize="none"
            secureTextEntry={data.secureTextEntry ? true : false}
            onChangeText={val => handlePasswordChange(val)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
          <Text>{data.email}</Text>
          <Text>{data.password}</Text>
        </View>

        <View style={styles.buttonV}>
          <TouchableOpacity onPress={() => logI()}>
            <LinearGradient
              colors={['#E7EFFA', '#AABED8', '#AABED8']}
              style={styles.buttonR}>
              <Text style={styles.titleB}>Log in</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonS}>
          <TouchableOpacity onPress={() => navigation.navigate('signup')}>
            <Text style={styles.SignUptext}>
              Don't have an account? Sign up!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const {height} = Dimensions.get('screen');
const height_logo = height * 0.15;

export default logIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AABED8',
  },
  SignUptext: {
    backgroundColor: '#fff',
    color: '#4c4c4c',
    fontSize: 18,
  },
  fPassText: {
    alignItems: 'flex-start',
    marginTop: 5,
    backgroundColor: '#fff',
    color: '#4c4c4c',
    fontSize: 15,
  },

  logo: {
    width: height_logo,
    height: height_logo ,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 2.5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 10,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 20,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  title: {
    color: '#05375a',
    fontSize: 25,
    fontWeight: 'bold',
  },
  titleB: {
    color: '#05375a',
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonV: {
    alignItems: 'center',
    marginTop: 80,
  },
  buttonS: {
    alignItems: 'center',
    marginTop: 40,
  },
  buttonF: {
  alignItems: 'flex-start',
    marginTop: 10,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  buttonR: {
    alignItems: 'center',
    width: 200,
    height: 55,
    justifyContent: 'center',
    borderRadius: 15,
    flexDirection: 'row',
  }
});

