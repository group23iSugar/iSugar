import React, {  useState, useEffect } from 'react';
import {  StyleSheet, 
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  Platform, 
  TextInput,
  ScrollView,
  Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import RadioForm, { 
  RadioButton, 
  RadioButtonInput, 
  RadioButtonLabel
} from 'react-native-simple-radio-button';

var calcMethod = [
  {label: 'I use a ratio (ICR) to calculate my meal insulin'+'\n', value: 'ICR', valueIndex: 0},
  {label: 'I use sliding scale to determine my meal insulin'+'\n', value: 'Sliding Scale', valueIndex: 1},
  ];
  const icr = ({ navigation, route }) =>{
   
    useEffect(() => {
      MethodForCalc('ICR');
        }, []);
        const [data, setData] = useState({
          caluMethod: '',
        });
        const MethodForCalc = (value) => {
          setData({
            ...data,
            caluMethod: value,
          });
      };
<<<<<<< HEAD

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
  const handleOuterAdd = () => {
    SlidingScale[outerCount+1].flag = true;
    setOuterCount(outerCount+1); 
       
 }

 const handleInnerAdd = (i) => { 
   if (SlidingScale[i].Rnages.length >= 6){
    alert('You have reached your maximum Ranges!');
    return;
   } else {
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
   
=======

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

>>>>>>> 02d91af4584ffbad2b0fa06dde4607295acc5fa6
      
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
<<<<<<< HEAD
                 tempArr[j].insulin = val;
=======
                tempArr[j].insulin = val;
>>>>>>> 02d91af4584ffbad2b0fa06dde4607295acc5fa6
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
     
  
<<<<<<< HEAD
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
=======
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
>>>>>>> 02d91af4584ffbad2b0fa06dde4607295acc5fa6
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
<<<<<<< HEAD
  insert();
  calcMOnline();
for (let i =0; i< SlidingScale.length; i++){ // i.e. 5
  if (SlidingScale[i].flag){
    ssOnlineDB(i);
=======
for (let i =0; i< SlidingScale.length; i++){ // i.e. 5
  if (SlidingScale[i].flag){
>>>>>>> 02d91af4584ffbad2b0fa06dde4607295acc5fa6
    try { 
      console.log('in if 1');
      db.transaction( (tx) => { 
          tx.executeSql(
           'INSERT INTO ssInterval (UserID, fromTime, toTime)' 
           +'VALUES (?,?,?)',
<<<<<<< HEAD
             [uID, SlidingScale[i].FromTime, SlidingScale[i].toTime]
=======
             [234, SlidingScale[i].FromTime, SlidingScale[i].toTime]
>>>>>>> 02d91af4584ffbad2b0fa06dde4607295acc5fa6
         );
         callback(SlidingScale[i].FromTime, SlidingScale[i].toTime, i);
     })
     
 
 } catch (error) {
     console.log(error);
 }
 
  }
<<<<<<< HEAD
}
}
=======
}
}
>>>>>>> 02d91af4584ffbad2b0fa06dde4607295acc5fa6
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
<<<<<<< HEAD
                  if (uID == ID && from.toString() == f.toString() && to.toString() == t.toString()){
=======
                  if (234 == ID && from.toString() == f.toString() && to.toString() == t.toString()){
>>>>>>> 02d91af4584ffbad2b0fa06dde4607295acc5fa6
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
<<<<<<< HEAD
         bgtoIOnlineDb(i, j);
=======
         ssOnlineDB(i, j);
>>>>>>> 02d91af4584ffbad2b0fa06dde4607295acc5fa6
     })
     console.log(SlidingScale[i].Rnages[j].BGFrom+' / '+SlidingScale[i].Rnages[j].BGTo+' / '+ SlidingScale[i].Rnages[j].insulin);
    } catch (error) {
     console.log(error);
    }
  }
}
}
<<<<<<< HEAD
const bgtoIOnlineDb = (i, j) => {
  if (AccType == 'Patient Account'){
    //insulinCalcMethod
    console.log('inside bg');
    var InsertAPIURL = "https://isugarserver.com/BGTOInsulin.php";  
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
  
    var Data ={
      UserID: onlinUserID,
      fromTime: SlidingScale[i].FromTime.toString(),
      toTime: SlidingScale[i].toTime.toString(),
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
    })
    .catch((error)=>{
      alert("Error Occured" + error);
    })
    }         
}
const calcMOnline = () => {
  if (AccType == 'Patient Account'){
    //
    console.log('inside bg');
    var InsertAPIURL = "https://isugarserver.com/insulinCalcMethod.php";  
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
  
    var Data ={
      UserID: onlinUserID,
      insulinCalc: data.caluMethod
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
const ssOnlineDB = (i) =>{
  if (AccType == 'Patient Account'){
    console.log('inside ss');
    var InsertAPIURL = "https://isugarserver.com/SlideScaleInterval.php";  

    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
  
    var Data ={
      UserID: onlinUserID,
      fromTime: SlidingScale[i].FromTime.toString(),
      toTime: SlidingScale[i].toTime.toString(),
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
//=========icr local============
const localICR = () => {
  insert();
  calcMOnline();
=======
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
>>>>>>> 02d91af4584ffbad2b0fa06dde4607295acc5fa6
for (let i=0; i<ICR.length; i++){
  if (ICR[i].flagC){
    try {
      db.transaction( (tx) => {
          tx.executeSql(
           'INSERT INTO icrInterval (UserID, fromTime, toTime, ICR)' 
           +'VALUES (?,?,?,?)',
<<<<<<< HEAD
             [uID, ICR[i].from, ICR[i].to, ICR[i].icr ]
=======
             [235, ICR[i].from, ICR[i].to, ICR[i].icr ]
>>>>>>> 02d91af4584ffbad2b0fa06dde4607295acc5fa6
         );
     })
     
    } catch (error) {
     console.log(error);
    }
<<<<<<< HEAD
    if (AccType == 'Patient Account'){
      var InsertAPIURL = "https://isugarserver.com/ICRInterval.php";
    
      var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };
      
      var Data ={
        UserID: onlinUserID,
        fromTime: ICR[i].from.toString(),
        toTime:  ICR[i].to.toString(),
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

}

const insert = async () => {
  insulinCalcMethod = data.caluMethod;
  if (AccType=='Patient Account'){
    console.log(uID+' - '+ DOBirth+ ' - '+ weightKG +' - '+latestHB1AC_+' - '+ DOLatestHB1AC+ ' - '+ glucoseMonitor +' - '+glucoseUnit+' - '+ketonesMeasure +' - '+ insulinReg+ ' - '+ InsulinSF +' - '+bgTarget+' - '+ bgStart+ ' - '+ intervalISF +' - '+insulinCalcMethod+' - '+fromBG+ ' - '+ toBG +' - '+heightCM+' - '+ Diabetescenter+ ' - '+ DOD +' - '+centName+' - '+centCity);
    try {
     db.transaction( (tx) => {
         tx.executeSql(
          'INSERT INTO patientprofile (UserID, DOB, weightKG, latest_HP1AC, latest_HP1AC_date, typeOfGlucoseM, glucoseLevel_unit, ketonesMeasure, insulinRegimen, ISF, targetBG_correct, startBG_correct, ISFIntervals, insulinCalcMethod, fromBG, toBG, height, diabetes_center, diagnosis_date, center_name, center_city)' 
          +'VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [uID, DOBirth, weightKG, latestHB1AC_, DOLatestHB1AC, glucoseMonitor, glucoseUnit, ketonesMeasure, insulinReg, InsulinSF, bgTarget, bgStart, intervalISF, insulinCalcMethod, fromBG, toBG, heightCM, Diabetescenter, DOD, centName, centCity ]
        );
    })

} catch (error) {
    console.log(error);
}
} else {
try {
  db.transaction( (tx) => {
      tx.executeSql(
       'INSERT INTO nonPatientprofile (UserID, DOB, weightKG, latest_HP1AC, latest_HP1AC_date, typeOfGlucoseM, glucoseLevel_unit, ketonesMeasure, insulinRegimen, ISF, targetBG_correct, startBG_correct, ISFIntervals, insulinCalcMethod, fromBG, toBG)' 
       +'VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
         [uID, DOBirth, weightKG, latestHB1AC_, DOLatestHB1AC, glucoseMonitor, glucoseUnit, ketonesMeasure, insulinReg, InsulinSF, bgTarget, bgStart, intervalISF, insulinCalcMethod, fromBG, toBG]
     );
 })

} catch (error) {
 console.log(error);
}
}
navigation.navigate('home');
=======
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

>>>>>>> 02d91af4584ffbad2b0fa06dde4607295acc5fa6
}

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
<<<<<<< HEAD
      {AccType == 'Patient Account' ? <Text style={{fontSize: 20, fontWeight: 'bold', color: '#05375a', marginBottom: 0}}>Step 7 of 7: Insulin to Carbohydrate Ratio (ICR)  {'\n'}</Text>
        : <Text style={{fontSize: 20, fontWeight: 'bold', color: '#05375a', marginBottom: 0}}>Step 6 of 6: Insulin to Carbohydrate Ratio (ICR)  {'\n'}</Text>}
        <ScrollView>
=======
      {AccType == 'Patient Account' ? <Text style={styles.title}>Step 7 of 7: Insulin to Carbohydrate Ratio (ICR)  {'\n'}</Text>
        : <Text style={styles.title}>Step 6 of 6: Insulin to Carbohydrate Ratio (ICR)  {'\n'}</Text>}
>>>>>>> 02d91af4584ffbad2b0fa06dde4607295acc5fa6
      <Text style={{fontSize: 20, color: '#05375a',}}>Choose your method for caculating meal insulin:{'\n'}--------------------------------</Text>
<View style={styles.radioB}>
        <RadioForm
        radio_props = {calcMethod}
        initial={0}
        onPress={ (value) => MethodForCalc(value) } 
        buttonSize = {10}
        buttonOuterSize = {14}
        buttonColor= '#AABED8'
        selectedButtonColor = '#8FA5C1'
        labelStyle = {{fontSize: 17, color: '#05375a',}}
        formHorizontal={false}
        

        />
    
        </View>
      {data.caluMethod !='ICR' ? (<View style={{ alignItems: 'center'}}>
<<<<<<< HEAD
        <FlatList 
        nestedScrollEnabled={true}
=======
        <FlatList
>>>>>>> 02d91af4584ffbad2b0fa06dde4607295acc5fa6
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
<<<<<<< HEAD
                             {moment(item.FromTime).format('h:mm a')}
=======
                             {moment.utc(item.FromTime).format('h:mm a')}
>>>>>>> 02d91af4584ffbad2b0fa06dde4607295acc5fa6
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
<<<<<<< HEAD
                             {moment(item.toTime).format('h:mm a')}
=======
                             {moment.utc(item.toTime).format('h:mm a')}
>>>>>>> 02d91af4584ffbad2b0fa06dde4607295acc5fa6
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
<<<<<<< HEAD
                <FlatList 
                nestedScrollEnabled={true}
=======
                <FlatList
>>>>>>> 02d91af4584ffbad2b0fa06dde4607295acc5fa6
                data={SlidingScale[index].Rnages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index}) => (
                    <View style = {styles.innerCotainer}>
                    <Text style={styles.innerTitle}>Blood Glucose Range</Text>
                    <View style={styles.innerView}>
                    <Text style={styles.innerTitle}>From</Text>
                    <TextInput
<<<<<<< HEAD
                    style={{borderColor: 'grey', borderBottomWidth: 1,paddingBottom: 0, paddingTop:0, color: 'grey'}}
=======
                    style={{borderColor: 'grey', borderBottomWidth: 1,paddingBottom: 0, paddingTop:0}}
>>>>>>> 02d91af4584ffbad2b0fa06dde4607295acc5fa6
                     keyboardType="decimal-pad"
                     placeholder="000 mg/dl"
                     onChangeText={(val)=>changeV(val, item.id, 'f', index)}
                    />
                    </View>
                    <View style={styles.innerView}>
                    <Text style={styles.innerTitle}>To</Text>
                    <TextInput
<<<<<<< HEAD
                    style={{borderColor: 'grey', borderBottomWidth: 1, paddingBottom: 0, paddingTop:0, color: 'grey'}}
=======
                    style={{borderColor: 'grey', borderBottomWidth: 1, paddingBottom: 0, paddingTop:0}}
>>>>>>> 02d91af4584ffbad2b0fa06dde4607295acc5fa6
                     keyboardType="decimal-pad"
                     placeholder="000 mg/dl"
                     onChangeText={(val)=>changeV(val, item.id, 't', index)}
                    />
                    </View>
                    <View style={styles.innerView}>
                    <Text style={styles.innerTitle}>Insulin</Text>
                    <TextInput
<<<<<<< HEAD
                    style={{borderColor: 'grey', borderBottomWidth: 1, paddingBottom: 0, paddingTop:0, color: 'grey'}}
=======
                    style={{borderColor: 'grey', borderBottomWidth: 1, paddingBottom: 0, paddingTop:0}}
>>>>>>> 02d91af4584ffbad2b0fa06dde4607295acc5fa6
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
<<<<<<< HEAD
        <View style={styles.buttonV}>
        <TouchableOpacity onPress={()=>localSSDB()}>
                <LinearGradient
                    colors={['#E7EFFA', '#AABED8', '#AABED8']} style={styles.buttonR}
                >
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Done</Text>
                  
                </LinearGradient>
            </TouchableOpacity>
            </View>
=======
        <TouchableOpacity onPress={()=>localSSDB(getLocalssID)}><Text>Done</Text></TouchableOpacity>
>>>>>>> 02d91af4584ffbad2b0fa06dde4607295acc5fa6
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
<<<<<<< HEAD
                           {moment(item.from).format('h:mm a')}
=======
                           {moment.utc(item.from).format('h:mm a')}
>>>>>>> 02d91af4584ffbad2b0fa06dde4607295acc5fa6
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
<<<<<<< HEAD
                             {moment(item.to).format('h:mm a')}
=======
                             {moment.utc(item.to).format('h:mm a')}
>>>>>>> 02d91af4584ffbad2b0fa06dde4607295acc5fa6
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
<<<<<<< HEAD
                    style={{borderColor: 'grey', borderBottomWidth: 1,paddingBottom: 0, paddingTop:0, color: 'grey'}}
=======
                    style={{borderColor: 'grey', borderBottomWidth: 1,paddingBottom: 0, paddingTop:0}}
>>>>>>> 02d91af4584ffbad2b0fa06dde4607295acc5fa6
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
<<<<<<< HEAD
        <View style={styles.buttonV}>
        <TouchableOpacity onPress={()=>localICR()}>
                <LinearGradient
                    colors={['#E7EFFA', '#AABED8', '#AABED8']} style={styles.buttonR}
                >
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Done</Text>
=======
        <TouchableOpacity onPress={()=>localICR()}><Text>Done</Text></TouchableOpacity>
      </View>)  }
       
          <View style={styles.buttonV}>
        <TouchableOpacity onPress={()=>insert()}>
                <LinearGradient
                    colors={['#E7EFFA', '#AABED8', '#AABED8']} style={styles.buttonR}
                >
                    <Text>Done</Text>
>>>>>>> 02d91af4584ffbad2b0fa06dde4607295acc5fa6
                  
                </LinearGradient>
            </TouchableOpacity>
            </View>
<<<<<<< HEAD
      </View>)  }
       
=======

>>>>>>> 02d91af4584ffbad2b0fa06dde4607295acc5fa6
         

            </ScrollView>
        </View>
     </View>
  
         
  
    );
  
  };


const {height} = Dimensions.get("screen");
const height_logo = height * 0.15;

export default icr;

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

text_footer: {
  color: '#05375a',
  fontSize: 17,
},
text_footerD: {
  color: '#05375a',
  fontSize: 18,
  paddingLeft: 15
},
textInput: {
  flex: 1,
  fontSize: 15,
  marginTop: Platform.OS === 'ios' ? 0 : -12,
  paddingLeft: 10,
  color: '#05375a',
},
picker: {
  width: 150,
  height: 30,
  borderWidth: 2,
  borderColor: '#4c4c4c',
    
},
buttonV: {
  marginTop: 60,
  alignItems: 'center',
  
},
action: {
  flex: 1,
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent:'space-evenly',
  flexWrap: 'wrap',
  marginTop: 10,
  marginBottom: 10,
  paddingBottom: 25,
  
},
buttonR: {
  alignItems: 'center',
  width: 200,
  height: 55,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 15,
  flexDirection: 'row',
  
},
buttonRS: {
  alignItems: 'center',
  width: 150,
  height: 55,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 15,
  flexDirection: 'row',
  
},
radioB :{
  marginTop: 45,
  justifyContent: 'space-between'
  },
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
    fontSize: 20, color: '#05375a', fontWeight:'bold'
},
innerTitle: {
    fontSize: 15, color: '#05375a', fontWeight:'bold'
},
innerView: {
    flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, marginTop: 10,
}
});




