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
import { ActivityIndicator, Colors } from 'react-native-paper';

var calcMethod = [
  {label: 'I use a ratio (ICR) to calculate my meal insulin'+'\n', value: 'ICR', valueIndex: 0},
  {label: 'I use sliding scale to determine my meal insulin'+'\n', value: 'Sliding Scale', valueIndex: 1},
  ];
  const icrARE = ({ navigation, route }) =>{
   
    useEffect(() => {
      firstretrieve(secondretrieve);
        }, []);
        const [data, setData] = useState({
          caluMethod: '',
        });
      
      const [ICR, setICR]= useState([]);
      const [ICRExtra, setICRExtra]= useState([]);
      const [SlidingScale, setSlidingScale] = useState([]);
      const [SlidingScaleExtra, setSlidingScaleExtra] = useState([]);

const firstretrieve = async (callback)=>{
  
  try {
    console.log('in try');
      db.transaction(  ( tx) => {
        tx.executeSql(
          'SELECT UserID, insulinCalcMethod FROM patientprofile',
          [],
          (tx, results) => {
            var rows = results.rows;
            for (let i = 0; i < rows.length; i++){
              var userID = rows.item(i).UserID;
              if (238 == userID){
                var calcM = rows.item(i).insulinCalcMethod; 
                callback(calcM);
                setData({...data, calcMethod: calcM});
                console.log(calcM);
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
const secondretrieve = (method) =>{
  console.log('inside is: '+method);
  if (method == 'ICR'){
    var tempArr=[...ICR];
    try {
        db.transaction(  ( tx) => {
          tx.executeSql(
            'SELECT icrID, fromTime, toTime, ICR FROM icrInterval WHERE UserID=?',
            [162],
            (tx, results) => {
              var rows = results.rows;
              for (let i = 0; i < rows.length; i++){
                      tempArr.push({
                          id: rows.item(i).icrID,
                          from: new Date(rows.item(i).fromTime),
                          to: new Date(rows.item(i).toTime),
                          icr: rows.item(i).ICR,
                          isChanged: false,
                          isNew: true
                      });
                      ICRExtra.push({
                        id: rows.item(i).icrID,
                          from: new Date(rows.item(i).fromTime),
                          to: new Date(rows.item(i).toTime),
                          icr: rows.item(i).ICR,
                          isChanged: false,
                          isNew: true
                      });
                }
                setICR([...tempArr]);
            }   
  ) 
      
  
  }  ) 
  } catch (error) {
     console.log(error);
  }
  } else if(method=='Sliding Scale') {
    var tempArr=[...SlidingScale];
    try {
        db.transaction(  ( tx) => {
          tx.executeSql(
            'SELECT ssID, fromTime, toTime FROM ssInterval WHERE UserID=?',
            [237],
            (tx, results) => {
              var rows = results.rows;
              for (let i = 0; i < rows.length; i++){
                      tempArr.push({
                          id: rows.item(i).ssID,
                          from: new Date(rows.item(i).fromTime),
                          to: new Date(rows.item(i).toTime),
                          isChanged: false,
                          isNew: false,
                          Rnages: []
                      });
                      SlidingScaleExtra.push({
                        id: rows.item(i).ssID,
                        from: new Date(rows.item(i).fromTime),
                        to: new Date(rows.item(i).toTime),
                        isChanged: false,
                        isNew: false,
                        Rnages: []
                      });

                      try {
                        db.transaction(  ( tx) => {
                          tx.executeSql(
                            'SELECT bgID, fromBGLevel, toBGLevel, insulinDose FROM bgleveltoinsulin WHERE ssID=?',
                            [tempArr[i].id],
                            (tx, results) => {
                              var rows2 = results.rows;
                              for (let j = 0; j < rows2.length; j++){
                                      tempArr[i].Rnages.push({
                                          id: rows2.item(j).bgID,
                                          BGFrom: rows2.item(j).fromBGLevel,
                                          BGTo: rows2.item(j).toBGLevel,
                                          insulin: rows2.item(j).insulinDose,
                                          isChanged: false,
                                          isNew: false,
                                      });
                                      SlidingScaleExtra[i].Rnages.push({
                                          id: rows2.item(j).bgID,
                                          BGFrom: rows2.item(j).fromBGLevel,
                                          BGTo: rows2.item(j).toBGLevel,
                                          insulin: rows2.item(j).insulinDose,
                                          isChanged: false,
                                          isNew: false,
                                      });
                                      console.log( SlidingScaleExtra[i].Rnages[j]);
                                }
                                
                                setSlidingScale([...tempArr]);
                            }   
                  ) 
                      
                  
                  }  ) 
                  } catch (error) {
                     console.log(error);
                  }
                }
                setSlidingScale([...tempArr]);
            }   
  ) 
      
  
  }  ) 
  } catch (error) {
     console.log(error);
  }
  }
}
//====================SS===================
const [outerCount, setOuterCount] = useState(0);
const [innerCount, setInnerCount] = useState(0);
const [innerCount1, setInnerCount1] = useState(0);
  const [showFrom, setShowFrom] = useState(false);
  const [showTo, setShowTo] = useState(false);
  const [flag1, setfalg1] = useState(false);
  const [flag2, setfalg2] = useState(false);
  const [mode, setMode] = useState('date');
  const [selectedID, setID] = useState(-1);
  const [selectedIndex, setIndexA] = useState(-1);
  const [innerIndex, setIndex] = useState(-1);
//================================================
//===================ICR==========================

const [icrCount, setIcrCount] = useState(0);

const addICR = ()=> {
  if (ICR.length >= 6){
    alert('You have reached your maximum ICR intervals');
    return;
  } else{ 
    setIcrCount(icrCount+1);
    var obj = {id: icrCount+1, from: new Date(), to: new Date(), icr: '', isChanged: false, isNew: true};
    ICR.push(obj);
  }

}

 
 const handleOuterAdd = () => {
   if (SlidingScale.length >= 5){
    alert('You have reached your maximum Sliding Scale intervals!');
    return;
   } else {
    setOuterCount(outerCount+1); 
    var obj = {id: icrCount+1, from: new Date(), to: new Date(), isChanged: false, isNew: true, Rnages: []};
    SlidingScale.push(obj);
   }
      
 }

 const handleInnerAdd = (i) => { 
   if (SlidingScale[i].Rnages.length >=6){
    alert('You have reached your maximum Ranges!');
    return;
   } else {
    setInnerCount(innerCount+1);
    var obj = {id: innerCount+1, BGFrom:'', BGTo:'', insulin:'', isChanged: false, isNew: true,};
    SlidingScale[i].Rnages.push(obj);
   }
   
   

      
}
const changeICR = (val, index) =>{
const newArr = [...ICR];
newArr[index].icr = val;
newArr[index].isChanged = true;
setICR([...newArr]);
console.log(ICR[index].icr);
}
  const changeV = (val, id, type, index) => { 
setIndex(index);
  for (let i=0; i<SlidingScale.length; i++ ){
      for (let j=0; j< SlidingScale[i].Rnages.length; j++){
        var tempArr = [...SlidingScale[i].Rnages];
          if (SlidingScale[i].Rnages[j].id==id){
              if (type == 'f'){
                tempArr[j].BGFrom = val;
                tempArr[j].isChanged = true;
                SlidingScale[i].Rnages= [...tempArr]
                  return;
              } else if (type == 't'){
                tempArr[j].BGTo = val;
                tempArr[j].isChanged = true;
                SlidingScale[i].Rnages= [...tempArr]
                  return;
              } else if (type == 'i'){
                tempArr[j].insulin = val;
                tempArr[j].isChanged = true;
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
  const currentDate = selectedDate || SlidingScale[selectedIndex].from;
  const newArr = [...SlidingScale];
  
  if (SlidingScale[selectedIndex].id == selectedID && flag1==true){
        setfalg1(false);
        newArr[selectedIndex].from = currentDate;
        newArr[selectedIndex].isChanged = true;
        setSlidingScale([...newArr]);
        return;
       }
     
  
};
//============from icr==============
const onChangeFromC = (event, selectedDate) => { 
  setShowFrom(Platform.OS === 'ios');
  if (flag1==false){
    return;
   }
  const currentDate = selectedDate || ICR[selectedIndex].from;
  const newArr = [...ICR];
  
  if (ICR[selectedIndex].id == selectedID && flag1==true){
        setfalg1(false);
        newArr[selectedIndex].from = currentDate;
        newArr[selectedIndex].isChanged = true;
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
  const currentDate = selectedDate || SlidingScale[selectedIndex].to;
  const newArr = [...SlidingScale];
   for (let i = 0; i< SlidingScale.length; i++){
       if (SlidingScale[i].id == selectedID){
         setfalg2(false);
         console.log('selecte posT : '+i+' '+selectedIndex);
           console.log('in if To: '+ selectedID);
           newArr[i].to = currentDate;
           newArr[selectedIndex].isChanged = true;
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
const currentDate = selectedDate || ICR[selectedIndex].to;
const newArr = [...ICR];

if (ICR[selectedIndex].id == selectedID && flag2==true){
      setfalg2(false);
      newArr[selectedIndex].to = currentDate;
      newArr[selectedIndex].isChanged = true;
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
const combineF = (id, index) => {
  showTimepickerF();
  setID(id); 
  setIndexA(index); 
}
//=======To=======
const combineT = (id, index) => {
showTimepickerT();
setID(id);
setIndexA(index);
}
const handleICRUpdate =()=>{
  for (let i=0; i<ICR.length; i++){
    if (ICR[i].isChanged == true && ICR[i].isNew == false){
      if (ICR[i].icr > 999 || ICR[i].icr <= 0){
        alert('Please enter a valid ICR value');
        return;
      } else{
        // add + update db :)
        icrOnline(ICR[i].from, ICR[i].to, ICR[i].icr);
        oldIcrOnline(ICRExtra[i].from, ICRExtra[i].to, ICRExtra[i].icr);
        try {
          db.transaction( (tx) => {
              tx.executeSql(
                'UPDATE icrInterval SET fromTime=?, toTime=?, ICR=? WHERE icrID=? ',
                [ICR[i].from, ICR[i].to, ICR[i].icr, ICR[i].id],
                (tx, results) => {
                  console.log('Results', results.rowsAffected);
               if (results.rowsAffected > 0) {
                  alert('Succefully updated');
                    }
                }   
      ) 
          
      
      }  ) 
      } catch (error) {
         console.log(error);
      }
      }
    } else if (ICR[i].isNew == true){
      localICR();
    }
  }
}

const handleSSUpdate =()=>{
  console.log('in ss');
  for (let i=0; i<SlidingScale.length; i++){
    if (SlidingScale[i].isChanged == true && SlidingScale[i].isNew == false) {
      oldSsOnlineDB(SlidingScaleExtra[i].from, SlidingScaleExtra[i].to, SlidingScale[i].from, SlidingScale[i].to);
        console.log('in outer if');
        try {
          db.transaction( (tx) => {
              tx.executeSql(
                'UPDATE ssInterval SET fromTime=?, toTime=? WHERE ssID=? ',
                [SlidingScale[i].from, SlidingScale[i].to, SlidingScale[i].id],
                (tx, results) => {
                  console.log('Results', results.rowsAffected);
               if (results.rowsAffected > 0) {
                  // alert('Succefully updated');
                    }
                }   
      ) 
          
      
      }  ) 
      } catch (error) {
         console.log(error);
      }
    } else if ( SlidingScale[i].isNew == true) {
      localSSDB(getLocalssID);
    }
    for (let j =0; j<SlidingScale[i].Rnages.length; j++){
      if (SlidingScale[i].Rnages[j].isChanged == true && SlidingScale[i].Rnages[j].isNew == false) {
        console.log('in inner if');
        if (SlidingScale[i].Rnages[j].BGFrom>999 || SlidingScale[i].Rnages[j].BGFrom <= 0 || SlidingScale[i].Rnages[j].BGTo>999 || SlidingScale[i].Rnages[j].BGTo <= 0 || SlidingScale[i].Rnages[j].insulin>99 || SlidingScale[i].Rnages[j].insulin <= 0){
          alert('Please enter a valid value!S');
          return;
        } else {
          updateBGTOOnline(SlidingScale[i].from, SlidingScale[i].to, SlidingScaleExtra[i].Rnages[j].BGFrom, SlidingScaleExtra[i].Rnages[j].BGTo, SlidingScaleExtra[i].Rnages[j].insulin);
          afterUpdateBGTOOnline(SlidingScale[i].from, SlidingScale[i].to, SlidingScale[i].Rnages[j].BGFrom, SlidingScale[i].Rnages[j].BGTo, SlidingScale[i].Rnages[j].insulin);
          try {
            db.transaction( (tx) => {
                tx.executeSql(
                  'UPDATE bgleveltoinsulin SET fromBGLevel=?, toBGLevel=?, insulinDose=? WHERE bgID=? ',
                  [SlidingScale[i].Rnages[j].BGFrom, SlidingScale[i].Rnages[j].BGTo, SlidingScale[i].Rnages[j].insulin, SlidingScale[i].Rnages[j].id],
                  (tx, results) => {
                    console.log('Results', results.rowsAffected);
                 if (results.rowsAffected > 0) {
                    // alert('Succefully updated');
                      }
                  }   
        ) 
            
        
        }  ) 
        } catch (error) {
           console.log(error);
        }
        }
        
    }
    }
  }
}
const localSSDB = async (callback) => {
  console.log('in insert SS');
for (let i =0; i< SlidingScale.length; i++){
  if (SlidingScale[i].isNew == true){
    try { 
      console.log('in if 1');
      db.transaction( (tx) => { 
          tx.executeSql(
           'INSERT INTO ssInterval (UserID, fromTime, toTime)' 
           +'VALUES (?,?,?)',
             [238, SlidingScale[i].from, SlidingScale[i].to]
         );
         callback(SlidingScale[i].from, SlidingScale[i].to, i);
     })
     
 
 } catch (error) {
     console.log(error);
 }
  }
    
}
}
const getLocalssID = (from , to, index) => {
console.log('in get');
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
                  if (238 == ID && from.toString() == f.toString() && to.toString() == t.toString()){
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
const ssOnlineDB = (i, j) =>{
var InsertAPIURL = "http://192.168.12.1/isugar/SlideScaleInterval.php";  

var headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

var Data ={
  UserID: onlinUserID,
  fromTime: SlidingScale[i].from,
  toTime: SlidingScale[i].to,
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
const oldSsOnlineDB = (from, to, from2, to2) =>{
  var InsertAPIURL = "http://192.168.12.1/isugar/updateSS.php";  
  
  var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  
  var Data ={
    UserID: onlinUserID,
    fromTime: from,
    toTime: to,
    fromTime2: from2,
    toTime2: to2
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
  const updateBGTOOnline = (from, to, bgf, bgt, ins) =>{
    var InsertAPIURL = "http://192.168.12.1/isugar/updateBGTOInsulin.php";  
    
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    
    var Data ={
      UserID: onlinUserID,
      fromTime: from,
      toTime: to,
      fromBGLevel: bgf,
      toBGLevel: bgt,
      insulinDose: ins
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
    const afterUpdateBGTOOnline = (from, to, bgf, bgt, ins) =>{
      var InsertAPIURL = "http://192.168.12.1/isugar/afterBGUpdate.php";  
      
      var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };
      
      var Data ={
        UserID: onlinUserID,
        fromTime: from,
        toTime: to,
        fromBGLevel: bgf,
        toBGLevel: bgt,
        insulinDose: ins
      };
      
      // FETCH func ------------------------------------
      fetch(InsertAPIURL,{
        method:'POST',
        headers:headers,
        body: JSON.stringify(Data) //convert data to JSON
      })
      .then((response)=>response.json()) //check response type of API (CHECK OUTPUT OF DATA IS IN JSON)
      .then((response)=>{
      alert('after ' + response[0].Message2);
      })
      .catch((error)=>{
        alert("Error Occured" + error);
      })
      }
//=========icr local============
const localICR = () => {
for (let i=0; i<ICR.length; i++){
  if (ICR[i].isNew){
    try {
      db.transaction( (tx) => {
          tx.executeSql(
           'INSERT INTO icrInterval (UserID, fromTime, toTime, ICR)' 
           +'VALUES (?,?,?,?)',
             [uID, ICR[i].from, ICR[i].to, ICR[i].icr ]
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
      UserID: onlinUserID,
      fromTime: ICR[i].from,
      toTime: ICR[i].to,
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
const icrOnline = (from, to, icr) => {
  var InsertAPIURL = "http://192.168.12.1/isugar/ICRInterval.php";
    
  var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  
  var Data ={
    UserID: onlinUserID,
    fromTime: from,
    toTime: to,
    ICR: icr 
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

const oldIcrOnline = (from, to, icr) => {
  var InsertAPIURL = "http://192.168.12.1/isugar/icrUpdate.php";
    
  var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  
  var Data ={
    UserID: onlinUserID,
    fromTime: from,
    toTime: to,
    ICR: icr 
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
      <Text style={{fontSize: 20, fontWeight: 'bold', color: '#05375a', marginBottom: 0}}>Edit Insulin to Carbohydrate Ratio (ICR)</Text>
      <ScrollView>
      {data.caluMethod !='ICR' ? SlidingScale.length > 0? (<View style={{ alignItems: 'center'}}>
     
     
        <FlatList 
          nestedScrollEnabled={true}
          data={SlidingScale}
          keyExtractor={(item, index) => index.toString()}
          // extraData={selectedID}
          renderItem={({ item, index }) => (
            <View>   
            <View style={styles.outerContainer}>
                <Text style={styles.innerTitle}>من</Text>
                <TouchableOpacity onPress={()=> combineF(item.id, index)} 
                onPressOut={()=>setfalg1(true)}
                style={styles.innerCotainer}
                 >
             <Text testID="dateTimePicker"
             style={{fontSize: 17, color: 'grey', alignItems: 'flex-start'}} >
                             {moment(item.from).format('h:mm a')}
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
                        onChangeFrom(e, v);
                      }}
                       
                     />
                   )} 
                   <Text style={styles.innerTitle}>الى</Text>
                   <TouchableOpacity onPress={()=> combineT(item.id, index)} 
                   onPressOut={()=>setfalg2(true)}
                   style={styles.innerCotainer}
                 >
             <Text testID="dateTimePicker" 
             style={{fontSize: 17, color: 'grey'}} >
                             {moment(item.to).format('h:mm a')}
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
                        onChangeTo(e, v);
                      }}
                     />
                   )} 
                <FlatList
                data={SlidingScale[index].Rnages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index}) => (
                    <View style = {styles.innerCotainer}>
                    <Text style={styles.innerTitle}>نطاق سكر الدم</Text>
                    <View style={styles.innerView}>
                    <Text style={styles.innerTitle}>من</Text>
                    <TextInput
                    style={{borderColor: 'grey', borderBottomWidth: 1,paddingBottom: 0, paddingTop:0}}
                     keyboardType="decimal-pad"
                     defaultValue={item.BGFrom+''}
                     onChangeText={(val)=>changeV(val, item.id, 'f', index)}
                    />
                    </View>
                    <View style={styles.innerView}>
                    <Text style={styles.innerTitle}>الى</Text>
                    <TextInput
                    style={{borderColor: 'grey', borderBottomWidth: 1, paddingBottom: 0, paddingTop:0}}
                     keyboardType="decimal-pad"
                     defaultValue={item.BGTo+''}
                     onChangeText={(val)=>changeV(val, item.id, 't', index)}
                    />
                    </View>
                    <View style={styles.innerView}>
                    <Text style={styles.innerTitle}>Insulin</Text>
                    <TextInput
                    style={{borderColor: 'grey', borderBottomWidth: 1, paddingBottom: 0, paddingTop:0}}
                     keyboardType="decimal-pad"
                     defaultValue={item.insulin+''}
                     onChangeText={(val)=>changeV(val, item.id, 'i', index)}
                    />
                    </View>
                    </View>
                )}
                
                />
                <TouchableOpacity onPress={()=>handleInnerAdd(index)}><Text>اضف نطاق اخر</Text></TouchableOpacity>
            </View>
            </View>
          )}
        />
        <TouchableOpacity onPress={()=>handleOuterAdd()}><Text>أضف مدة</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>handleSSUpdate()}><Text>تحديث</Text></TouchableOpacity>
        </View>
       )
        : ICR.length> 0 ? (<View style={{alignItems:'center'}}>
          
        <FlatList
        data={ICR}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.outerContainer}>
             <Text style={styles.innerTitle}>من</Text>
              <TouchableOpacity onPress={()=> combineF(item.id, index)} 
              onPressOut={()=>setfalg1(true)}
              style={styles.innerCotainer}
               >
           <Text testID="dateTimePicker"
           style={{fontSize: 17, color: 'grey', alignItems: 'flex-start'}} >
                           {moment(item.from).format('h:mm a')}
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
                   <Text style={styles.innerTitle}>إلى</Text>
                   <TouchableOpacity onPress={()=> combineT(item.id, index)} 
                   onPressOut={()=>setfalg2(true)}
                   style={styles.innerCotainer}
                 >
             <Text testID="dateTimePicker" 
             style={{fontSize: 17, color: 'grey'}} >
                             {moment(item.to).format('h:mm a')}
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
                    <Text style={styles.innerTitle}>معامل الكربوهيدرات</Text>
                    <TextInput
                    style={{borderColor: 'grey', borderBottomWidth: 1,paddingBottom: 0, paddingTop:0}}
                     keyboardType="decimal-pad"
                     defaultValue={item.icr+''}
                     onChangeText={(val) => changeICR(val, index)}
                    />
                    </View>
                    </View>
          </View>
        )}

        />
        <TouchableOpacity onPress={()=>addICR()}><Text>أضف مدة</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>handleICRUpdate()}><Text>تحديث</Text></TouchableOpacity>
      </View>)
        
        : <ActivityIndicator animating={true} color={Colors.blue100} size={'large'} />  : <ActivityIndicator animating={true} color={Colors.blue100} size={'large'} /> }
      </ScrollView>
        </View>
     </View>
  
         
  
    );
  
  };


const {height} = Dimensions.get("screen");
const height_logo = height * 0.05;

export default icrARE;

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
    flex: 4,
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


