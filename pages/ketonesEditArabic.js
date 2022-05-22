/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable jsx-quotes */
/* eslint-disable quotes */
/* eslint-disable yoda */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable space-infix-ops */
/* eslint-disable no-shadow */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
/* eslint-disable no-trailing-spaces */
import React, { useEffect, useState } from 'react';
import {  StyleSheet, 
  View,
  Image,
  Text,
  TouchableOpacity,
  Platform, 
  TextInput,
  ScrollView,
  alert,
  Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Picker} from '@react-native-picker/picker';
import SQLite from 'react-native-sqlite-storage';

global.db = SQLite.openDatabase(
    {
      name: 'iSugar.db',
      location: 'Library'
    },
    () => {
      console.log('Success')
     },
    error => {
      console.log('ERROR: ' + error);
    }
  );
  
  try {
    db.transaction( (tx) => {
        tx.executeSql(
         'CREATE TABLE IF NOT EXISTS UserAccount (UserID INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT NOT NULL, lastName	TEXT NOT NULL, email	TEXT NOT NULL, pass	TEXT NOT NULL, accountType	TEXT NOT NULL)',
        []
       );
       //=====//
       try {
        db.transaction( (tx) => {
            tx.executeSql(
             'CREATE TABLE IF NOT EXISTS KSUMC (UserID INTEGER NOT NULL UNIQUE, MRN TEXT NOT NULL, FOREIGN KEY("UserID") REFERENCES "UserAccount"("UserID"))',
            []
           );
       })
      } catch (error) {
       console.log(error);
      }
      //=====//
      try {
        db.transaction( (tx) => {
            tx.executeSql(
             'CREATE TABLE IF NOT EXISTS patientprofile (UserID INTEGER NOT NULL UNIQUE, DOB TEXT NOT NULL, weightKG REAL NOT NULL, latest_HP1AC REAL NOT NULL, latest_HP1AC_date TEXT NOT NULL, typeOfGlucoseM TEXT NOT NULL, glucoseLevel_unit TEXT NOT NULL, ketonesMeasure TEXT NOT NULL, insulinRegimen TEXT NOT NULL, ISF INTEGER, targetBG_correct INTEGER, startBG_correct INTEGER, ISFIntervals INTEGER NOT NULL, insulinCalcMethod TEXT NOT NULL, fromBG INTEGER NOT NULL, toBG INTEGER NOT NULL, height REAL NOT NULL, diabetes_center TEXT NOT NULL, diagnosis_date TEXT NOT NULL, center_name TEXT, center_city TEXT, FOREIGN KEY("UserID") REFERENCES "UserAccount"("UserID"))',
            []
           );
       })
      } catch (error) {
       console.log(error);
      }
      //========//
      try {
        db.transaction( (tx) => {
            tx.executeSql(
             'CREATE TABLE IF NOT EXISTS nonPatientprofile (UserID INTEGER NOT NULL UNIQUE, DOB TEXT NOT NULL, weightKG REAL NOT NULL, latest_HP1AC REAL NOT NULL, latest_HP1AC_date TEXT NOT NULL, typeOfGlucoseM TEXT NOT NULL, glucoseLevel_unit TEXT NOT NULL, ketonesMeasure TEXT NOT NULL, insulinRegimen TEXT NOT NULL, ISF INTEGER, targetBG_correct INTEGER, startBG_correct INTEGER, ISFIntervals INTEGER NOT NULL, insulinCalcMethod TEXT NOT NULL, fromBG INTEGER NOT NULL, toBG INTEGER NOT NULL, FOREIGN KEY("UserID") REFERENCES "UserAccount"("UserID"))',
            []
           );
       })
      } catch (error) {
       console.log(error);
      }
      //====//
      try {
        db.transaction( (tx) => {
            tx.executeSql(
             'CREATE TABLE IF NOT EXISTS icrInterval (icrID INTEGER PRIMARY KEY AUTOINCREMENT, UserID INTEGER NOT NULL, fromTime TEXT NOT NULL, toTime TEXT NOT NULL, ICR INTEGER NOT NULL, FOREIGN KEY("UserID") REFERENCES "UserAccount"("UserID"))',
            []
           );
       })
      } catch (error) {
       console.log(error);
      }
      //====//
      try {
        db.transaction( (tx) => {
            tx.executeSql(
             'CREATE TABLE IF NOT EXISTS isfInterval (isfID INTEGER PRIMARY KEY AUTOINCREMENT, UserID INTEGER NOT NULL, fromTime TEXT NOT NULL, toTime TEXT NOT NULL, ISF INTEGER NOT NULL, targetBG_correct INTEGER NOT NULL, startBG_correct INTEGER NOT NULL, FOREIGN KEY("UserID") REFERENCES "UserAccount"("UserID"))',
            []
           );
       })
      } catch (error) {
       console.log(error);
      }
      //======/
      try {
        db.transaction( (tx) => {
            tx.executeSql(
             'CREATE TABLE IF NOT EXISTS insulinPen (insulinID INTEGER PRIMARY KEY AUTOINCREMENT, UserID INTEGER NOT NULL, insulinType TEXT NOT NULL, halfORfull INTEGER NOT NULL, FOREIGN KEY("UserID") REFERENCES "UserAccount"("UserID"))',
            []
           );
       })
      } catch (error) {
       console.log(error);
      }
      //====/
      try {
        db.transaction( (tx) => {
            tx.executeSql(
             'CREATE TABLE IF NOT EXISTS insulinOther (insulinID INTEGER PRIMARY KEY AUTOINCREMENT, UserID INTEGER NOT NULL, insulinType TEXT NOT NULL, iDose REAL NOT NULL, iTime TEXT NOT NULL, FOREIGN KEY("UserID") REFERENCES "UserAccount"("UserID"))',
            []
           );
       })
      } catch (error) {
       console.log(error);
      }
      //=====//
      try {
        db.transaction( (tx) => {
            tx.executeSql(
             'CREATE TABLE IF NOT EXISTS ssInterval (ssID INTEGER PRIMARY KEY AUTOINCREMENT, UserID INTEGER NOT NULL, fromTime TEXT NOT NULL, toTime TEXT NOT NULL, FOREIGN KEY("UserID") REFERENCES "UserAccount"("UserID"))',
            []
           );
       })
      } catch (error) {
       console.log(error);
      }
      //======//
      try {
        db.transaction( (tx) => {
            tx.executeSql(
             'CREATE TABLE IF NOT EXISTS bgleveltoinsulin (bgID INTEGER PRIMARY KEY AUTOINCREMENT, ssID INTEGER NOT NULL, fromTime TEXT NOT NULL, toTime TEXT NOT NULL, FOREIGN KEY("ssID") REFERENCES "ssInterval"("ssID"))',
            []
           );
       })
      } catch (error) {
       console.log(error);
      }
      //======//
      try {
        db.transaction( (tx) => {
            tx.executeSql(
             'CREATE TABLE IF NOT EXISTS takenInsulinDose (takenInsulinID INTEGER PRIMARY KEY AUTOINCREMENT, UserID INTEGER NOT NULL, BG_level REAL NOT NULL, ReasonForInsulin TEXT NOT NULL, CHO REAL NOT NULL, insulinDose INTEGER NOT NULL, Dose_time_hours INTEGER NOT NULL, Dose_time_minutes	INTEGER NOT NULL, Dose_Date_Month INTEGER NOT NULL, Dose_Date_Day INTEGER NOT NULL, Dose_Date_Year INTEGER NOT NULL, FOREIGN KEY("UserID") REFERENCES "UserAccount"("UserID"))',
            []
           );
       })
      } catch (error) {
       console.log(error);
      }
      //====/
       //======//
       try {
        db.transaction( (tx) => {
            tx.executeSql(
             'CREATE TABLE IF NOT EXISTS plannedExercise (takenInsulinID INTEGER NOT NULL, type TEXT NOT NULL, duration	INTEGER NOT NULL,  FOREIGN KEY("takenInsulinID") REFERENCES "takenInsulinDose"("takenInsulinID"))',
            []
           );
       })
      } catch (error) {
       console.log(error);
      }
       //======//
       try {
        db.transaction( (tx) => {
            tx.executeSql(
             'CREATE TABLE IF NOT EXISTS prevoiusExercise (takenInsulinID INTEGER NOT NULL, type TEXT NOT NULL, duration	INTEGER NOT NULL, Time	TEXT NOT NULL,  FOREIGN KEY("takenInsulinID") REFERENCES "takenInsulinDose"("takenInsulinID"))',
            []
           );
       })
      } catch (error) {
       console.log(error);
      }
       //======//
       try {
        db.transaction( (tx) => {
            tx.executeSql(
             'CREATE TABLE IF NOT EXISTS CHO (foodID INTEGER PRIMARY KEY AUTOINCREMENT, foodEnglishName TEXT NOT NULL UNIQUE, foodArabicName	TEXT NOT NULL, unit	TEXT NOT NULL, unitArabic	TEXT NOT NULL, gramsOfCHO REAL NOT NULL )',
            []
           );
           //------------child
           try {
            db.transaction( (tx) => {
                tx.executeSql(
                 'INSERT INTO CHO (foodEnglishName, foodArabicName, unit, unitArabic, gramsOfCHO) VALUES (?,?,?,?,?),(?,?,?,?,?),(?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?),(?,?,?,?,?),(?,?,?,?,?),(?,?,?,?,?), (?,?,?,?,?),(?,?,?,?,?), (?,?,?,?,?),  (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?) ',
                ['Cantaloupe', 'شمام',	'cup', 'كوب' , '15', 'Pineapple', 'أناناس', 'cup', 'كوب', '20', 'Raspberry', 'توت العليق الأحمر', 'cup', 'كوب', '7.5', 'Blackberry', 'توت العليق الأسود', 'cup', 'كوب', '7', 'Blueberry','التوت الأزرق','cup','كوب','15', 'Strawberry', 'فراولة', 'cup', 'كوب', '12', 'Watermelon ', 'جح' ,'cup' ,'كوب' ,'12', 'Dried fruits','فواكه مجففة','cup','كوب','60', 'Canned fruits', 'فواكه معلبة', 'cup', 'كوب', '30', 'Popcorn', 'فشار', 'cup', 'كوب', '15', 'Indomie','اندومي','cup','كوب','30', 'Corn flakes','كورن فليكس','cup','كوب','30', 'Full fat milk','حليب كامل الدسم','cup','كوب','15', 'Low fat milk', 'حليب قليل الدسم', 'cup', 'كوب', '15', 'Chocolate milk', 'حليب بالشوكولاتة', 'cup', 'كوب', '30', 'Full fat laban', 'لبن كامل الدسم', 'cup', 'كوب', '15', 'skim fat laban','لبن منزوع الدسم','cup','كوب','15', 'Low fat laban', 'لبن قليل الدسم', 'cup', 'كوب', '15', 'Full fat yogurt', 'زبادي كامل الدسم' ,'cup', 'كوب', '15', 'Skim fat yogurt', 'زبادي منزوع الدسم', 'cup', 'كوب', '15', 'Low fat yogurt', 'زبادي قليل الدسم', 'cup', 'كوب', '15', 'Flavoured yogurt','زبادي بالنكهات','cup','كوب','22.5', 'Skim milk','حليب منزوع الدسم','cup','كوب','15', 'Vermicelli', 'شعيرية', 'cup', 'كوب', '60', 'Stewed vegetables', 'مرق خضار', 'cup', 'كوب', '15', 'Oats soup', 'شوربة الشوفان', 'cup', 'كوب', '15', 'Lentils soup', 'شوربة عدس', 'cup', 'كوب', '20']
               );
           })
          } catch (error) {
           console.log(error);
          }
  
       })
      } catch (error) {
       console.log(error);
      }
   })
   
  } catch (error) {
   console.log(error);
  }
  
  
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


  const ketonesEditAR = ({ navigation, route }) =>{
    useEffect(() => {
        getLocalInfo();
        }, []);

    const [dbData, setDbData] = useState({
        glucoseMType:'',
        gUnit: '',
        kMeasure: '',
        fBG: 0,
        tBG: 0
    });
    const getLocalInfo = ()=>{
        try {
            console.log('in try');
            db.transaction( (tx) => {
                tx.executeSql(
                  'SELECT UserID, typeOfGlucoseM, glucoseLevel_unit, ketonesMeasure, fromBG, toBG FROM patientprofile',
                  [],
                  (tx, results) => {
                    var rows = results.rows;
                    for (let i = 0; i < rows.length; i++) {          
                        var userID = rows.item(i).UserID;
                        if (1 == userID){
                            setDbData({
                                ...dbData,
                                glucoseMType: rows.item(i).typeOfGlucoseM,
                                gUnit: rows.item(i).glucoseLevel_unit,
                                kMeasure: rows.item(i).ketonesMeasure,
                                fBG: rows.item(i).fromBG,
                                tBG: rows.item(i).toBG
                            });
                          return;
                        }
                      }
                  }   
        ) 
            
        
        }  ) 
        } catch (error) {
           console.log(error);
        }
      
    }
   
  const [monitor, setMonitor] = useState('0');
  const [levelUnit, setlevelUnit] = useState('0');
  const [ketones, setketones] = useState('0');
  const [BGFrom, setFROM] = useState(0);
  const [BGTO, setTO] = useState(0);

 


const check = () => {
  if (monitor != '0'){
    updateGMonitorLocal();
    if (AccType == 'Patient Account'){
      onlineMonitorDB();
    }
    
  }
  if (levelUnit != '0'){
    if (AccType == 'Patient Account'){
      onlineUnitDB();
    }
    
    updateGUnitLocal();
    
  }
  if (ketones != '0'){
    if (AccType == 'Patient Account'){
      onlineKetonesM();
    }
    updateKetonesLocal();
    
    
  } 
  if (BGFrom != 0 ){
     updateFromBGLocal();
    }
    if (BGTO != 0 ){
        updateToBGLocal();
       }
       if (AccType == 'Patient Account'){
        if (BGFrom != 0 && BGTO != 0 ){
          onlineTargetBGDB1();
        } else if (BGFrom != 0 && BGTO == 0 ){
          onlineTargetBGDB2();
        } else if (BGFrom == 0 && BGTO != 0 ){
          onlineTargetBGDB3();
        }
       }
  
       alert('تم التحديث');
       navigation.navigate('editProAR');
}
const validateBGTo = (val) => {
    if (val > 999 && val <= 0){
      alert('فضلا ادخل قيمة صحيحة');
      return;
    } else {
      setTO({
        ...BGTO,
        BGTO: val
      })

    }
}
const validateBGFrom = (val) => {
  if (val > 999 && val <= 0){// needs checking in case of the other level unit?
    alert('فضلا ادخل قيمة صحيحة');  
    return;
  } else {
    setFROM({
      ...BGFrom,
      BGFrom: val
    })

  }
}

glucoseMonitor = monitor;
fromBG = BGFrom.BGFrom;
toBG = BGTO.BGTO;
glucoseUnit = levelUnit;
ketonesMeasure = ketones;
//--------------------------------------
     const updateGMonitorLocal = () => {
      if (AccType == 'Patient Account'){
        try {
          console.log('in monitor');
          db.transaction( (tx) => {
              tx.executeSql(
                'UPDATE patientprofile SET typeOfGlucoseM=? WHERE UserID=? ',
                [monitor, 1],
                (tx, results) => {
                  console.log('Results', results.rowsAffected);
               if (results.rowsAffected > 0) {
               console.log('monitor updated seuccefully');
                    }
                }   
        ) 
          
        
        }  ) 
        } catch (error) {
         console.log(error);
        }
      } else {
        try {
          console.log('in monitor');
          db.transaction( (tx) => {
              tx.executeSql(
                'UPDATE nonPatientprofile SET typeOfGlucoseM=? WHERE UserID=? ',
                [monitor, 1],
                (tx, results) => {
                  console.log('Results', results.rowsAffected);
               if (results.rowsAffected > 0) {
               console.log('monitor updated seuccefully');
                    }
                }   
        ) 
          
        
        }  ) 
        } catch (error) {
         console.log(error);
        }
      }
      
        }
        const updateGUnitLocal = () => {
          if (AccType == 'Patient Account'){
            try {
              console.log('in unit');
              db.transaction( (tx) => {
                  tx.executeSql(
                    'UPDATE patientprofile SET glucoseLevel_unit=? WHERE UserID=? ',
                    [levelUnit, 1],
                    (tx, results) => {
                      console.log('Results', results.rowsAffected);
                   if (results.rowsAffected > 0) {
                   console.log('unit updated seuccefully');
                        }
                    }   
            ) 
              
            
            }  ) 
            } catch (error) {
             console.log(error);
            }
          } else {
            try {
              console.log('in unit');
              db.transaction( (tx) => {
                  tx.executeSql(
                    'UPDATE nonPatientprofile SET glucoseLevel_unit=? WHERE UserID=? ',
                    [levelUnit, 1],
                    (tx, results) => {
                      console.log('Results', results.rowsAffected);
                   if (results.rowsAffected > 0) {
                   console.log('unit updated seuccefully');
                        }
                    }   
            ) 
              
            
            }  ) 
            } catch (error) {
             console.log(error);
            }
          }
            
            }
            const updateKetonesLocal = () => {
              if (AccType == 'Patient Account'){
                try {
                  console.log('in ketones');
                  db.transaction( (tx) => {
                      tx.executeSql(
                        'UPDATE patientprofile SET ketonesMeasure=? WHERE UserID=? ',
                        [ketones, 1],
                        (tx, results) => {
                          console.log('Results', results.rowsAffected);
                       if (results.rowsAffected > 0) {
                       console.log('unit updated seuccefully');
                            }
                        }   
                ) 
                  
                
                }  ) 
                } catch (error) {
                 console.log(error);
                }
              } else {
                try {
                  console.log('in ketones');
                  db.transaction( (tx) => {
                      tx.executeSql(
                        'UPDATE nonPatientprofile SET ketonesMeasure=? WHERE UserID=? ',
                        [ketones, 1],
                        (tx, results) => {
                          console.log('Results', results.rowsAffected);
                       if (results.rowsAffected > 0) {
                       console.log('unit updated seuccefully');
                            }
                        }   
                ) 
                  
                
                }  ) 
                } catch (error) {
                 console.log(error);
                }
              }
                
                }
                const updateFromBGLocal = () => {
                  if (AccType == 'Patient Account'){
                    try {
                      console.log('in from');
                      db.transaction( (tx) => {
                          tx.executeSql(
                            'UPDATE patientprofile SET fromBG=? WHERE UserID=? ',
                            [BGFrom.BGFrom, 1],
                            (tx, results) => {
                              console.log('Results', results.rowsAffected);
                           if (results.rowsAffected > 0) {
                           console.log('from updated seuccefully');
                                }
                            }   
                    ) 
                      
                    
                    }  ) 
                    } catch (error) {
                     console.log(error);
                    }
                  } else {
                    try {
                      console.log('in from');
                      db.transaction( (tx) => {
                          tx.executeSql(
                            'UPDATE nonPatientprofile SET fromBG=? WHERE UserID=? ',
                            [BGFrom.BGFrom, 1],
                            (tx, results) => {
                              console.log('Results', results.rowsAffected);
                           if (results.rowsAffected > 0) {
                           console.log('from updated seuccefully');
                                }
                            }   
                    ) 
                      
                    
                    }  ) 
                    } catch (error) {
                     console.log(error);
                    }
                  }
                   
                    }
                    const updateToBGLocal = () => {
                      if (AccType == 'Patient Account'){
                        try {
                          console.log('in to');
                          db.transaction( (tx) => {
                              tx.executeSql(
                                'UPDATE patientprofile SET toBG=? WHERE UserID=? ',
                                [BGTO.BGTO, 1],
                                (tx, results) => {
                                  console.log('Results', results.rowsAffected);
                               if (results.rowsAffected > 0) {
                               console.log('to updated seuccefully');
                                    }
                                }   
                        ) 
                          
                        
                        }  ) 
                        } catch (error) {
                         console.log(error);
                        }
                      } else {
                        try {
                          console.log('in to');
                          db.transaction( (tx) => {
                              tx.executeSql(
                                'UPDATE nonPatientprofile SET toBG=? WHERE UserID=? ',
                                [BGTO.BGTO, 1],
                                (tx, results) => {
                                  console.log('Results', results.rowsAffected);
                               if (results.rowsAffected > 0) {
                               console.log('to updated seuccefully');
                                    }
                                }   
                        ) 
                          
                        
                        }  ) 
                        } catch (error) {
                         console.log(error);
                        }
                      }
                        
                        }

                        const onlineKetonesM = () => {
                          var InsertAPIURL = "https://isugarserver.com/ketonesMeasurement.php";   //API to  signup
                        
                          var headers = {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                          };
                          
                          var Data ={
                            UserID: onlinUserID,
                            ketonesMeasure: ketones
                          };
                        
                        // FETCH func 
                        fetch(InsertAPIURL,{
                            method:'POST',
                            headers:headers,
                            body: JSON.stringify(Data) //convert data to JSON
                        })
                        .then((response)=>response.json()) //check response type of API (CHECK OUTPUT OF DATA IS IN JSON)
                        .then((response)=>{
                        })
                        .catch((error)=>{
                            alert("Error Occured" + error);
                        })
                        }
                        //-------------------------------
                        const onlineUnitDB = () => {
                          var InsertAPIURL = "https://isugarserver.com/GlucoseLevelUnit.php";   //API to  signup
                        
                          var headers = {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                          };
                          
                          var Data ={
                            UserID: onlinUserID,
                            glucoseLevel_unit: levelUnit
                          };
                        
                        // FETCH func 
                        fetch(InsertAPIURL,{
                            method:'POST',
                            headers:headers,
                            body: JSON.stringify(Data) //convert data to JSON
                        })
                        .then((response)=>response.json()) //check response type of API (CHECK OUTPUT OF DATA IS IN JSON)
                        .then((response)=>{
                        })
                        .catch((error)=>{
                            alert("Error Occured" + error);
                        })
                        }
                        //-------------------------------
                        const onlineTargetBGDB1 = () => {
                          var InsertAPIURL = "https://isugarserver.com/TargetBGPerDay%20.php";   //API to  signup
                        
                          var headers = {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                          };
                          
                          var Data ={
                            UserID: onlinUserID,
                            fromBG: BGFrom.BGFrom,
                            toBG: BGTO.BGTO
                          };
                        
                        // FETCH func 
                        fetch(InsertAPIURL,{
                            method:'POST',
                            headers:headers,
                            body: JSON.stringify(Data) //convert data to JSON
                        })
                        .then((response)=>response.json()) //check response type of API (CHECK OUTPUT OF DATA IS IN JSON)
                        .then((response)=>{
                        })
                        .catch((error)=>{
                            alert("Error Occured" + error);
                        })
                        }
                        //-------------------------------
                        const onlineTargetBGDB2 = () => {
                          var InsertAPIURL = "https://isugarserver.com/TargetBGPerDay%20.php";   //API to  signup
                        
                          var headers = {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                          };
                          
                          var Data ={
                            UserID: onlinUserID,
                            fromBG: BGFrom.BGFrom,
                            toBG: dbData.tBG
                          };
                        
                        // FETCH func 
                        fetch(InsertAPIURL,{
                            method:'POST',
                            headers:headers,
                            body: JSON.stringify(Data) //convert data to JSON
                        })
                        .then((response)=>response.json()) //check response type of API (CHECK OUTPUT OF DATA IS IN JSON)
                        .then((response)=>{
                        })
                        .catch((error)=>{
                            alert("Error Occured" + error);
                        })
                        }
                        //-------------------------------
                        const onlineTargetBGDB3 = () => {
                          var InsertAPIURL = "https://isugarserver.com/TargetBGPerDay%20.php";   //API to  signup
                        
                          var headers = {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                          };
                          
                          var Data ={
                            UserID: onlinUserID,
                            fromBG: dbData.fBG,
                            toBG: BGTO.BGTO
                          };
                        
                        // FETCH func 
                        fetch(InsertAPIURL,{
                            method:'POST',
                            headers:headers,
                            body: JSON.stringify(Data) //convert data to JSON
                        })
                        .then((response)=>response.json()) //check response type of API (CHECK OUTPUT OF DATA IS IN JSON)
                        .then((response)=>{
                        })
                        .catch((error)=>{
                            alert("Error Occured" + error);
                        })
                        }
                        //-------------------------------
                        const onlineMonitorDB = () => {
                          var InsertAPIURL = "https://isugarserver.com/typeOfGlucoseMonitoring.php";   //API to  signup
                        
                          var headers = {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                          };
                          
                          var Data ={
                            UserID: onlinUserID,
                            typeOfGlucoseM: monitor
                          };
                        
                        // FETCH func 
                        fetch(InsertAPIURL,{
                            method:'POST',
                            headers:headers,
                            body: JSON.stringify(Data) //convert data to JSON
                        })
                        .then((response)=>response.json()) //check response type of API (CHECK OUTPUT OF DATA IS IN JSON)
                        .then((response)=>{
                        })
                        .catch((error)=>{
                            alert("Error Occured" + error);
                        })
                        }
//-------------------------------
    return (
      <View style={styles.container}>
      <LinearGradient colors={['#E7EFFA', '#E7EFFA','#AABED8']} style={styles.container}>

         <View style={styles.header}>
         <Image source={require('../images/logo.png')}
         style={styles.logo}
         resizeMode='stretch'/>
         </View>
      </LinearGradient>

      <View style={styles.footer}>
         <Text style={styles.title}>تعديل معلومات سكر الدم والكيتون{'\n'}</Text> 
      <ScrollView>
          {dbData.glucoseMType == 'Fingerstick blood glucose' ? (<View style={styles.action}>
              <Text style={styles.text_footer}> كيفية قياس مستوى السكر بالدم </Text>
              <Picker
              itemStyle={{color: '#000'}}
              selectedValue={monitor}
              onValueChange={(value) => setMonitor(value)}
              mode="dropdown"
              style={styles.picker}
              >
                  
            <Picker.Item label= 'وخز الأصبع لكل قياس ' value='Fingerstick blood glucose'></Picker.Item>
            <Picker.Item label= '(CGM) المراقبة المستمرة ' value='CGM'></Picker.Item>
            <Picker.Item label= ' (isCGM) المراقبة المستمرة بمستشعر الفلاش' value='isCGM'></Picker.Item>

        </Picker>
      
</View>) 
          : null }
           {dbData.glucoseMType == 'CGM' ? (<View style={styles.action}>
            <Text style={styles.text_footer}> كيفية قياس مستوى السكر بالدم </Text>
              <Picker
              itemStyle={{color: '#000'}}
              selectedValue={monitor}
              onValueChange={(value) => setMonitor(value)}
              mode="dropdown"
              style={styles.picker}
              >
            
            <Picker.Item label= '(CGM) المراقبة المستمرة ' value='CGM'></Picker.Item>
            <Picker.Item label= 'وخز الأصبع لكل قياس ' value='Fingerstick blood glucose'></Picker.Item>
            <Picker.Item label= ' (isCGM) المراقبة المستمرة بمستشعر الفلاش' value='isCGM'></Picker.Item>

        </Picker>
      
</View>) 
          : null }
          {dbData.glucoseMType == 'isCGM' ? (<View style={styles.action}>
            <Text style={styles.text_footer}> كيفية قياس مستوى السكر بالدم </Text>
              <Picker
              itemStyle={{color: '#000'}}
              selectedValue={monitor}
              onValueChange={(value) => setMonitor(value)}
              mode="dropdown"
              style={styles.picker}
              >
            
            <Picker.Item label= ' (isCGM) المراقبة المستمرة بمستشعر الفلاش' value='isCGM'></Picker.Item>
            <Picker.Item label= 'وخز الأصبع لكل قياس ' value='Fingerstick blood glucose'></Picker.Item>
            <Picker.Item label= '(CGM) المراقبة المستمرة ' value='CGM'></Picker.Item>

        </Picker>
      
</View>) 
          : null }
                    {dbData.gUnit == 'mg/dl' ? (<View style={styles.action}>
              <Text style={styles.text_footer}>وحدة قياس مستوى السكر</Text>
              <Picker
              itemStyle={{color: '#000'}}
              selectedValue={levelUnit}
              onValueChange={(value) => setlevelUnit(value)}
              mode="dropdown"
              style={styles.picker}
              >
                  
            <Picker.Item label= 'ميليجرام/ديسيلتر ' value='mg/dl'></Picker.Item>
            <Picker.Item label= 'ميليمول/لتر ' value='mmol/L'></Picker.Item>

        </Picker>
      
</View>) 
          : null }
{dbData.gUnit == 'mmol/L' ? (<View style={styles.action}>
             <Text style={styles.text_footer}>وحدة قياس مستوى السكر</Text>
              <Picker
              itemStyle={{color: '#000'}}
              selectedValue={levelUnit}
              onValueChange={(value) => setlevelUnit(value)}
              mode="dropdown"
              style={styles.picker}
              >
           <Picker.Item label= 'ميليمول/لتر ' value='mmol/L'></Picker.Item>
           <Picker.Item label= 'ميليجرام/ديسيلتر ' value='mg/dl'></Picker.Item>
            

        </Picker>
      
</View>) 
          : null }
{dbData.kMeasure == 'Blood' ? (<View style={styles.action}>
              <Text style={styles.text_footer}> مصدر قياس مستوى الكيتون </Text>
              <Picker
              itemStyle={{color: '#000'}}
              selectedValue={ketones}
              onValueChange={(value) => setketones(value)}
              mode="dropdown"
              style={styles.picker}
              >
                  
            <Picker.Item label= 'الدم ' value='Blood'></Picker.Item>
            <Picker.Item label= 'البول' value='Urine'></Picker.Item>

        </Picker>
      
</View>) 
: null }
{dbData.kMeasure == 'Urine' ? (<View style={styles.action}>
    <Text style={styles.text_footer}> مصدر قياس مستوى الكيتون </Text>
              <Picker
              itemStyle={{color: '#000'}}
              selectedValue={ketones}
              onValueChange={(value) => setketones(value)}
              mode="dropdown"
              style={styles.picker}
              >
           <Picker.Item label= 'البول' value='Urine'></Picker.Item>  
           <Picker.Item label= 'الدم ' value='Blood'></Picker.Item>
            

        </Picker>
      
</View>) 
: null }

<View style={styles.action}>
              <Text style={styles.text_footer}>مستوى سكر الدم المرغوب به خلال اليوم{'\n'}</Text>
             
              <View style={styles.field} >
              <View style={styles.actionB}>
              <Text style={styles.text_footer}>إلى</Text>
              {(levelUnit=='mg/dl' || levelUnit=='0') && dbData.gUnit=='mg/dl'? 
            <TextInput
            keyboardType="decimal-pad"
            defaultValue={dbData.tBG+''}
            onChangeText = {(val)=>validateBGTo(val)}
            style={styles.actionN}></TextInput> : 
            <TextInput
            keyboardType="decimal-pad"
            defaultValue={(dbData.tBG/18).toFixed(2)+''}
            onChangeText = {(val)=>validateBGTo(val)}
            placeholder="00 mmol/L"
            style={styles.actionN}></TextInput>
            }

</View>
<View style={styles.actionB}>
              <Text style={styles.text_footer}>من</Text>
              {(levelUnit=='mg/dl' || levelUnit=='0') && dbData.gUnit=='mg/dl' ? 
            <TextInput
            keyboardType="decimal-pad"
            defaultValue={dbData.fBG+''}
            onChangeText = {(val)=>validateBGFrom(val)}
            style={styles.actionN}></TextInput> : 
            <TextInput
            keyboardType="decimal-pad"
            onChangeText = {(val)=>validateBGFrom(val)}
            defaultValue={(dbData.fBG/18).toFixed(2)+''}
            placeholder="00 mmol/L" 
            style={styles.actionN}></TextInput>
            
            }

</View>
              </View>
     
      
</View>

          <View style={styles.buttonV}>
        <TouchableOpacity onPress={()=>check()}>
                <LinearGradient
                    colors={['#E7EFFA', '#AABED8', '#AABED8']} style={styles.buttonR}
                >
                    <Text style={styles.titleB}>تحديث</Text>
                  
                </LinearGradient>
            </TouchableOpacity>
            </View>
            </ScrollView>
         
        </View>
     </View>
  
         
  
    );
  
  };


const {height} = Dimensions.get("screen");
const height_logo = height * 0.15;

export default ketonesEditAR;

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
    fontSize: 15
    
  },
  
  logo: {
    width: height_logo,
    height: height_logo+40,

  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
},
footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 10,
},
footerT: {
  backgroundColor: '#fff',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 10,
},
field: {
    width: 350,
    height: 150,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#ECECEC',
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#CCCCC0',
},
text_footer: {
  color: '#05375a',
  fontSize: 17,
},
text_footerD: {
  color: '#05375a',
  fontSize: 18,
  paddingLeft: 15
},
dateB:{
    width: 200,
    height: 40,
    backgroundColor: '#fff',
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#CACDD1',

},
textInput: {
  flex: 1,
  marginTop: Platform.OS === 'ios' ? 0 : -12,
  paddingLeft: 10,
  color: '#05375a',
},
title: {
    color: '#05375a',
    fontSize: 20,
    fontWeight: 'bold'
},
titleB: {
  color: '#05375a',
  fontSize: 30,
  fontWeight: 'bold',
  backgroundColor: '#E7EFFA'
},
picker: {
  width: 150,
  height: 30,
  borderWidth: 2,
  borderColor: '#4c4c4c',
  color: 'grey'
    
},
pickerP: {
  width: 90,
  height: 30,
    
},
buttonV: {
  marginTop: 60,
  alignItems: 'center',
  
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
  alignItems: 'center',
  flexWrap: 'wrap',
  marginTop: 10,
  paddingBottom: 25,
  
},
actionN: {
    width: 100,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#CACDD1',
  color: '#000'
},
actionP: {
  flex: 0,
  flexDirection: 'row',
  alignItems: 'center',
  flexWrap: 'wrap',
  marginTop: 10,
  paddingBottom: 15,
  backgroundColor: '#F5F7FF',
},
actionB: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 15,

},
buttonR: {
  alignItems: 'center',
  width: 200,
  height: 55,
  justifyContent: 'center',
  borderRadius: 15,
  flexDirection: 'row',
  
},
textD:{
justifyContent: 'space-between',
marginTop: 25
}
});

