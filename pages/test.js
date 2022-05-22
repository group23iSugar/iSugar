/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable yoda */
/* eslint-disable no-self-compare */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
/* eslint-disable no-shadow */
/* eslint-disable quotes */
/* eslint-disable semi-spacing */
/* eslint-disable keyword-spacing */
/* eslint-disable no-trailing-spaces */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable semi */
/* eslint-disable space-infix-ops */
/* eslint-disable react-hooks/rules-of-hooks */

import React, {useState, useEffect, useMemo } from 'react';
import {StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Platform,
  alert,
} from 'react-native';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
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

const test = ()=>{

//====================SS===================
  const [outerCount, setOuterCount] = useState(0);
  const [innerCount, setInnerCount] = useState(0);
  const [innerCount1, setInnerCount1] = useState(0);
    const [SlidingScale, setSlidingScale] = useState([{ id: 0, FromTime: new Date(), toTime: new Date(), flag: true, Rnages: [{id: 0, BGFrom:-1, BGTo:-1, insulin:-1, flagI: true}],
    }, { id: 1, FromTime: new Date(), toTime: new Date(), flag: false, Rnages: [{id: 6, BGFrom:-1, BGTo:-1, insulin:-1, flagI: true}],
    }, { id: 2, FromTime: new Date(), toTime: new Date(), flag: false, Rnages: [{id: 12, BGFrom:-1, BGTo:-1, insulin:-1, flagI: true}],
    }, { id: 3, FromTime: new Date(), toTime: new Date(), flag: false, Rnages: [{id: 18, BGFrom:-1, BGTo:-1, insulin:-1, flagI: true}],
    }, { id: 4, FromTime: new Date(), toTime: new Date(), flag: false, Rnages: [{id: 24, BGFrom:-1, BGTo:-1, insulin:-1, flagI: true}],
    }]); // this is how it should be initialized in order to display it in flat list
    const [showFrom, setShowFrom] = useState(false);
    const [showTo, setShowTo] = useState(false);
    const [flag1, setfalg1] = useState(false);
    const [flag2, setfalg2] = useState(false);
    const [mode, setMode] = useState('date');
    const [selectedID, setID] = useState(-1);
    const [innerIndex, setIndex] = useState(-1);
//================================================
//===================ICR==========================
const [ICR, setICR]= useState([{id: 0, from: new Date(), to: new Date(), icr: -1, flagC: true}]);
const [icrCount, setIcrCount] = useState(0);

const addICR = ()=> {
  setIcrCount(icrCount+1);
  var obj = {id: icrCount+1, from: new Date(), to: new Date(), icr: -1, flagC: false};
  ICR.push(obj);
  ICR[icrCount+1].flagC = true;
}

   const validation = () => {
      // i think i should use onTextEdit or sum 
   }
   const handleOuterAdd = () => {
        SlidingScale[outerCount+1].flag = true;
        setOuterCount(outerCount+1);      
   }

   const handleInnerAdd = (i) => { 
      console.log('Hello i am inner index: '+innerIndex);
      setInnerCount(innerCount+1);
      var obj = {id: innerCount+1, BGFrom:-1, BGTo:-1, insulin:-1, flagI: false};
      SlidingScale[i].Rnages.push(obj);
     if (innerCount1 < 5){
      setInnerCount1(innerCount1+1);
      SlidingScale[i].Rnages[innerIndex+1].flagI=true;
     }else if (innerCount1 >= 5){
      setInnerCount1(0);
      SlidingScale[i].Rnages[0].flagI=true;
     }

        
}
const changeICR = (val, index) =>{
  const newArr = [...ICR];
  newArr[index].icr = val;
  setICR([...newArr]);
  console.log(ICR[index].icr);
}
    const changeV = (val, id, type, index) => { 
  setIndex(index);
    for (let i=0; i<SlidingScale.length; i++ ){
        for (let j=0; j< SlidingScale[i].Rnages.length; j++){
          var tempArr = [...SlidingScale[i].Rnages];
            if (SlidingScale[i].Rnages[j].id==id){
                console.log('in if pos: '+j);
                console.log('in if id: '+id); 
                if (type == 'f'){
                  tempArr[j].BGFrom = val;
                  SlidingScale[i].Rnages= [...tempArr]
                    return;
                } else if (type == 't'){
                  tempArr[j].BGTo = val;
                  SlidingScale[i].Rnages= [...tempArr]
                    return;
                } else if (type == 'i'){
                  tempArr[j].insulin = val;
                  SlidingScale[i].Rnages= [...tempArr]
                    return;
                }  
            }
        }
    }
}
  //=======From time==========  
   const onChangeFrom = (event, selectedDate) => { 
    setShowFrom(Platform.OS === 'ios');
    if (flag1==false){
      return;
     }
    const currentDate = selectedDate || SlidingScale[outerCount].FromTime;
    const newArr = [...SlidingScale];
    
    if (SlidingScale[outerCount].id == selectedID && flag1==true){
          setfalg1(false);
          newArr[outerCount].FromTime = currentDate;
          setSlidingScale([...newArr]);setfalg1(false);
          return;
         }
       
    
  };
  //============from icr==============
  const onChangeFromC = (event, selectedDate) => { 
    setShowFrom(Platform.OS === 'ios');
    if (flag1==false){
      return;
     }
    const currentDate = selectedDate || ICR[icrCount].from;
    const newArr = [...ICR];
    
    if (ICR[icrCount].id == selectedID && flag1==true){
          setfalg1(false);
          newArr[icrCount].from = currentDate;
          setICR([...newArr]);
          return;
         }
       
    
  };
  //=======To time==========
  const onChangeTo = (event, selectedDate) => { 
    setShowTo(Platform.OS === 'ios');
    if (flag2==false){
      return;
     }
    const currentDate = selectedDate || SlidingScale[outerCount].toTime;
    const newArr = [...SlidingScale];
     for (let i = 0; i< SlidingScale.length; i++){
         if (SlidingScale[i].id == selectedID){
           setfalg2(false);
           console.log('selecte posT : '+i);
             console.log('in if To: '+ selectedID);
             newArr[i].toTime = currentDate;
             setSlidingScale([...newArr]);
             return;
         }
     }
  };
//==========icr to============
const onChangeToC = (event, selectedDate) => { 
  setShowTo(Platform.OS === 'ios');
  if (flag2==false){
    return;
   }
  const currentDate = selectedDate || ICR[icrCount].to;
  const newArr = [...ICR];
  
  if (ICR[icrCount].id == selectedID && flag2==true){
        setfalg2(false);
        newArr[icrCount].to = currentDate;
        setICR([...newArr]);
        return;
       }
     
  
};
//=====From========
  const showModeFrom = (currentMode) => {
    setShowFrom(true);
    setMode(currentMode);
  };
//==========To=======
const showModeTo = (currentMode) => {
  setShowTo(true);
  setMode(currentMode);
};
//======From=======
  const showTimepickerF = () => {
    showModeFrom('time');
  };
//======To========
const showTimepickerT = () => {
  showModeTo('time');
};
//=======From=======
  const combineF = (id) => {
    showTimepickerF();
    setID(id);  
  }
//=======To=======
const combineT = (id) => {
  showTimepickerT();
  setID(id);
}
const localSSDB = async (callback) => {
  for (let i =0; i< SlidingScale.length; i++){ // i.e. 5
    if (SlidingScale[i].flag){
      try { 
        console.log('in if 1');
        db.transaction( (tx) => { 
            tx.executeSql(
             'INSERT INTO ssInterval (UserID, fromTime, toTime)' 
             +'VALUES (?,?,?)',
               [234, SlidingScale[i].FromTime, SlidingScale[i].toTime]
           );
           callback(SlidingScale[i].FromTime, SlidingScale[i].toTime, i);
       })
       
   
   } catch (error) {
       console.log(error);
   }
   
    }
  }
}
const getLocalssID = (from , to, index) => {
  var ssID = 0
  try {
    db.transaction((tx) => {
        tx.executeSql(
            "SELECT ssID, UserID, fromTime, toTime FROM ssInterval",
            [],
            (tx, results) => {
                var rows = results.rows;
                for (let i = 0; i < rows.length; i++) {
                    ssID = rows.item(i).ssID;
                    var ID = rows.item(i).UserID;
                    var f = rows.item(i).fromTime;
                    var t = rows.item(i).toTime;
                    if (234 == ID && from.toString() == f.toString() && to.toString() == t.toString()){
                      console.log('Horaaaayy '+ssID);
                      BGToLocal(ssID, index); 
                      return ssID;
                    }      
                  }
                }
            
        )
        
    })
  } catch (error) {
    console.log(error);
  }
}

const BGToLocal = async  (ssID, i) => {
  console.log(ssID + ' {'+i+'} ');
  for (let j=0; j<SlidingScale[i].Rnages.length; j++){
    if (SlidingScale[i].Rnages[j].flagI){
      try {
        db.transaction( (tx) => {
            tx.executeSql(
             'INSERT INTO bgleveltoinsulin (ssID, fromBGLevel, toBGLevel, insulinDose)' 
             +'VALUES (?,?,?,?)',
               [ssID, SlidingScale[i].Rnages[j].BGFrom, SlidingScale[i].Rnages[j].BGTo, SlidingScale[i].Rnages[j].insulin]
           );
           ssOnlineDB(i, j);
       })
       console.log(SlidingScale[i].Rnages[j].BGFrom+' / '+SlidingScale[i].Rnages[j].BGTo+' / '+ SlidingScale[i].Rnages[j].insulin);
      } catch (error) {
       console.log(error);
      }
    }
  }
}
const ssOnlineDB = (i, j) =>{
  var InsertAPIURL = "http://192.168.12.1/isugar/SlideScaleInterval.php";  

  var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  
  var Data ={
    UserID: 116,
    fromTime: SlidingScale[i].FromTime,
    toTime: SlidingScale[i].toTime,
    fromBGLevel: SlidingScale[i].Rnages[j].BGFrom,
    toBGLevel: SlidingScale[i].Rnages[j].BGTo,
    insulinDose: SlidingScale[i].Rnages[j].insulin
  };

// FETCH func ------------------------------------
fetch(InsertAPIURL,{
    method:'POST',
    headers:headers,
    body: JSON.stringify(Data) //convert data to JSON
})
.then((response)=>response.json()) //check response type of API (CHECK OUTPUT OF DATA IS IN JSON)
.then((response)=>{
  alert('ss ' + response[0].Message2);
})
.catch((error)=>{
    alert("Error Occured" + error);
})
}
//=========icr local============
const localICR = () => {
  for (let i=0; i<ICR.length; i++){
    if (ICR[i].flagC){
      try {
        db.transaction( (tx) => {
            tx.executeSql(
             'INSERT INTO icrInterval (UserID, fromTime, toTime, ICR)' 
             +'VALUES (?,?,?,?)',
               [235, ICR[i].from, ICR[i].to, ICR[i].icr ]
           );
       })
       
      } catch (error) {
       console.log(error);
      }
      var InsertAPIURL = "http://192.168.12.1/isugar/ICRInterval.php";
      
      var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };
      
      var Data ={
        UserID: 116,
        fromTime: ICR[i].from,
        toTime:  ICR[i].to,
        ICR: ICR[i].icr
        
      };
    
    // FETCH func ------------------------------------
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
    
  }
 
}
    return (

      <View style={{ flex: 1, marginTop: 20, alignItems: 'center', marginBottom: 20 }}>
        {1==1 ? (<View style={{ alignItems: 'center'}}>
        <FlatList
          style={{ flex: 1 }}
          data={SlidingScale.slice(0, outerCount+1)}
          keyExtractor={item => item.id}
          // extraData={selectedID}
          renderItem={({ item, index }) => (
            <View style={styles.outerContainer}>
                <Text style={styles.innerTitle}>From</Text>
                <TouchableOpacity onPress={()=> combineF(item.id)} 
                onPressOut={()=>setfalg1(true)}
                style={styles.innerCotainer}
                 >
             <Text testID="dateTimePicker"
             style={{fontSize: 17, color: 'grey', alignItems: 'flex-start'}} >
                             {moment.utc(item.FromTime).format('h:mm a')}
                             </Text> 
          
                 </TouchableOpacity>
                   
                   {showFrom && (
                     <DateTimePicker
                       testID="dateTimePicker"
                       value={item.FromTime}
                       mode={mode}
                       is24Hour={false}
                       display="default"
                       onChange={(e, v) => {
                        setShowFrom(Platform.OS === "ios");
                        onChangeFrom(e, v);
                      }}
                       
                     />
                   )} 
                   <Text style={styles.innerTitle}>To</Text>
                   <TouchableOpacity onPress={()=> combineT(item.id)} 
                   onPressOut={()=>setfalg2(true)}
                   style={styles.innerCotainer}
                 >
             <Text testID="dateTimePicker" 
             style={{fontSize: 17, color: 'grey'}} >
                             {moment.utc(item.toTime).format('h:mm a')}
                             </Text> 
                 </TouchableOpacity>
                   
                   {showTo && (
                     <DateTimePicker
                       testID="dateTimePicker"
                       value={item.toTime}
                       mode={mode}
                       is24Hour={false}
                       display="default"
                       onChange={(e, v) => {
                        setShowTo(Platform.OS === "ios");
                        onChangeTo(e, v);
                      }}
                     />
                   )} 
                <FlatList
                data={SlidingScale[index].Rnages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index}) => (
                    <View style = {styles.innerCotainer}>
                    <Text style={styles.innerTitle}>Blood Glucose Range</Text>
                    <View style={styles.innerView}>
                    <Text style={styles.innerTitle}>From</Text>
                    <TextInput
                    style={{borderColor: 'grey', borderBottomWidth: 1,paddingBottom: 0, paddingTop:0}}
                     keyboardType="decimal-pad"
                     placeholder="000 mg/dl"
                     onChangeText={(val)=>changeV(val, item.id, 'f', index)}
                    />
                    </View>
                    <View style={styles.innerView}>
                    <Text style={styles.innerTitle}>To</Text>
                    <TextInput
                    style={{borderColor: 'grey', borderBottomWidth: 1, paddingBottom: 0, paddingTop:0}}
                     keyboardType="decimal-pad"
                     placeholder="000 mg/dl"
                     onChangeText={(val)=>changeV(val, item.id, 't', index)}
                    />
                    </View>
                    <View style={styles.innerView}>
                    <Text style={styles.innerTitle}>Insulin</Text>
                    <TextInput
                    style={{borderColor: 'grey', borderBottomWidth: 1, paddingBottom: 0, paddingTop:0}}
                     keyboardType="decimal-pad"
                     placeholder="00"
                     onChangeText={(val)=>changeV(val, item.id, 'i', index)}
                    />
                    </View>
                    </View>
                )}
                
                />
                <TouchableOpacity onPress={()=>handleInnerAdd(index)}><Text>Add Range</Text></TouchableOpacity>
            </View>
           
          )}
        />
        <TouchableOpacity onPress={()=>handleOuterAdd()}><Text>Add Interval</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>localSSDB(getLocalssID)}><Text>Done</Text></TouchableOpacity>
        </View>)
        :  (<View style={{alignItems:'center'}}>
        <FlatList
        data={ICR}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.outerContainer}>
             <Text style={styles.innerTitle}>From</Text>
              <TouchableOpacity onPress={()=> combineF(item.id)} 
              onPressOut={()=>setfalg1(true)}
              style={styles.innerCotainer}
               >
           <Text testID="dateTimePicker"
           style={{fontSize: 17, color: 'grey', alignItems: 'flex-start'}} >
                           {moment.utc(item.from).format('h:mm a')}
                           </Text> 
        
               </TouchableOpacity>
                 
                 {showFrom && (
                   <DateTimePicker
                     testID="dateTimePicker"
                     value={item.from}
                     mode={mode}
                     is24Hour={false}
                     display="default"
                     onChange={(e, v) => {
                      setShowFrom(Platform.OS === "ios");
                      onChangeFromC(e, v);
                    }}
                     
                   />
                 )}
                   <Text style={styles.innerTitle}>To</Text>
                   <TouchableOpacity onPress={()=> combineT(item.id)} 
                   onPressOut={()=>setfalg2(true)}
                   style={styles.innerCotainer}
                 >
             <Text testID="dateTimePicker" 
             style={{fontSize: 17, color: 'grey'}} >
                             {moment.utc(item.to).format('h:mm a')}
                             </Text> 
                 </TouchableOpacity>
                   
                   {showTo && (
                     <DateTimePicker
                       testID="dateTimePicker"
                       value={item.to}
                       mode={mode}
                       is24Hour={false}
                       display="default"
                       onChange={(e, v) => {
                        setShowTo(Platform.OS === "ios");
                        onChangeToC(e, v);
                      }}
                     />
                   )} 
                    <View style={styles.innerCotainer}>
                    <View style={styles.innerView}>
                    <Text style={styles.innerTitle}>ICR: </Text>
                    <TextInput
                    style={{borderColor: 'grey', borderBottomWidth: 1,paddingBottom: 0, paddingTop:0}}
                     keyboardType="decimal-pad"
                     placeholder="000"
                     onChangeText={(val) => changeICR(val, index)}
                    />
                    </View>
                    </View>
          </View>
        )}

        />
        <TouchableOpacity onPress={()=>addICR()}><Text>Add Interval</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>localICR()}><Text>Done</Text></TouchableOpacity>
      </View>)  }
        
      </View>
    );

}
export default test; 
const styles = StyleSheet.create({
    outerContainer: {
        backgroundColor: 'lightgrey', 
            margin: 10, 
            alignItems: 'center', 
            width: 300, 
            borderRadius: 15,
            shadowColor: "#000",
            shadowOffset: {
            width: 0,
            height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            paddingBottom: 10,
            paddingTop: 10
    },
    innerCotainer: {
        backgroundColor: 'white', margin: 10, alignItems: 'center',  borderRadius: 15, padding: 10,
                    shadowColor: "#000",
                    shadowOffset: {
                    width: 0,
                    height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    width: 200
    },
    outerTitle: {
        fontSize: 20, color: 'darkblue', fontWeight:'bold'
    },
    innerTitle: {
        fontSize: 15, color: 'darkblue', fontWeight:'bold'
    },
    innerView: {
        flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, marginTop: 10,
    }
});
