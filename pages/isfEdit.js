
import React, { useEffect, useState } from 'react';
import {  StyleSheet, 
  View,
  Image,
  Text,
  TouchableOpacity,
  Platform, 
  TextInput,
  ScrollView,
  FlatList,
  Alert,
  Dimensions} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { ActivityIndicator, Colors } from 'react-native-paper';


  const isfEdit = ({ navigation, route }) =>{
    useEffect(() => {
        getLocalInfo(retrieve);
        }, [])

    const [allDay, setAllDay] = useState({isf: '', start: '', target: ''});
    const [hours, setHours]= useState([]);
      const[extrHours, setExtra] = useState([]);
    const [interval, setInterval] = useState('');
    var count = 0;
    const [mainFlag, setMF] = useState(false);
    const  [isfP, setISFP]= useState(-1); // p indicates patient ;) these values won't be retreived unless isf interval = 0: All day
    const  [tBGP, setTBGP]= useState(-1);
    const  [sBGP, setSBGP]= useState(-1);

    const getLocalInfo = (callback)=>{
      var intervals = -1;
      if (AccType == 'Patient Account'){
        try {
          console.log('in try1');
          db.transaction( (tx) => {
              tx.executeSql(
                'SELECT UserID, ISFIntervals FROM patientprofile',
                [],
                (tx, results) => {
                  var rows = results.rows;
                  for (let i = 0; i < rows.length; i++) {           
                      var userID = rows.item(i).UserID;
                      if (uID == userID){
                        intervals = rows.item(i).ISFIntervals;
                        callback(intervals); 
                        console.log(intervals);
                        setInterval(intervals);
                        return;
                      }
                    }
                }   
      ) 
               
      
      }  ) 
      } catch (error) {
         console.log(error);
      }

      } else {
        try {
          console.log('in try1');
          db.transaction( (tx) => {
              tx.executeSql(
                'SELECT UserID, ISFIntervals FROM nonPatientprofile',
                [],
                (tx, results) => {
                  var rows = results.rows;
                  for (let i = 0; i < rows.length; i++) {           
                      var userID = rows.item(i).UserID;
                      if (uID == userID){
                        intervals = rows.item(i).ISFIntervals;
                        callback(intervals); 
                        console.log(intervals);
                        setInterval(intervals);
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
       
      }

      const retrieve =  (interval) => {
        console.log('in second');
        console.log(interval);
        if (interval != -1){
          if (interval == 1){ // specific hours
            var tempArr = [...hours];
            try {
              db.transaction( (tx) => {
                  tx.executeSql(
                      'SELECT isfID, UserID, fromTime, toTime, ISF, targetBG_correct, startBG_correct FROM isfInterval',
                    [],
                    (tx, results) => {
                      var rows = results.rows;
                      for (let i = 0; i < rows.length; i++){
                          var UID = rows.item(i).UserID;
                          if (UID == '237'){
                           tempArr.push({
                             id: rows.item(i).isfID,
                             from: new Date(rows.item(i).fromTime),
                             to: new Date(rows.item(i).toTime),
                             isf: rows.item(i).ISF,
                             tBG: rows.item(i).targetBG_correct,
                             sBG: rows.item(i).startBG_correct,
                             isChanged: false,
                             isNew: false,
                           });
                           extrHours.push({
                            id: rows.item(i).isfID,
                            from: new Date(rows.item(i).fromTime),
                            to: new Date(rows.item(i).toTime),
                            isf: rows.item(i).ISF,
                            tBG: rows.item(i).targetBG_correct,
                            sBG: rows.item(i).startBG_correct,
                            isChanged: false,
                            isNew: false,
                           });
                           
                           
                      }
                      setHours([...tempArr]);  
                      console.log(tempArr);
                      
                     
                    }
                   
                    
                    },
                  );
                });
              } catch (error) {
                console.log(error);
              }
          } else if (interval == 0) { // All day
            if (AccType == 'Patient Account'){
              try {
                db.transaction( (tx) => {
                    tx.executeSql(
                        'SELECT UserID, ISF, targetBG_correct, startBG_correct FROM patientprofile',
                      [],
                      (tx, results) => {
                        var rows = results.rows;
                        for (let i = 0; i < rows.length; i++){
                            var UID = rows.item(i).UserID;
                            if (UID == '238'){
                              var ISF_ = rows.item(i).ISF;
                              setISFP(ISF_);
                              var target = rows.item(i).targetBG_correct;
                              setTBGP(target);
                              var start = rows.item(i).startBG_correct;
                              setSBGP(start);
                        }
                        
                      }
                      },
                    );
                  });
                } catch (error) {
                  console.log(error);
                }
            } else {
              try {
                db.transaction( (tx) => {
                    tx.executeSql(
                        'SELECT UserID, ISF, targetBG_correct, startBG_correct FROM nonPatientprofile',
                      [],
                      (tx, results) => {
                        var rows = results.rows;
                        for (let i = 0; i < rows.length; i++){
                            var UID = rows.item(i).UserID;
                            if (UID == uID){
                              var ISF_ = rows.item(i).ISF;
                              setISFP(ISF_);
                              var target = rows.item(i).targetBG_correct;
                              setTBGP(target);
                              var start = rows.item(i).startBG_correct;
                              setSBGP(start);
                        }
                        
                      }
                      },
                    );
                  });
                } catch (error) {
                  console.log(error);
                }
            }
          
              
          }
        }
      }
        
    //=========================================//

    const [flag1, setfalg1] = useState(false);
    const [flag2, setfalg2] = useState(false);
   const [selectedID, setID] = useState(-1);
    const [selectedIndex, setIndexA] = useState(-1);
    const [isfCount, setISFCount] = useState(0);
  //---------------------------------------------------
    const [mode, setMode] = useState('date');
//--------------Date----------------------- 
    const [dateFrom, setDateFrom] = useState(new Date());         // time entries x6 for user
    const [showFrom, setShowFrom] = useState(false);
    const [ISF, setISFM] = useState(0);
//-------------------------------------------
    const [showTo, setShowTo] = useState(false);
    const [ISF1, setISF1] = useState(0);
//-------------------------------------------
    
    const [ISF2, setISF2] = useState(0);
//-------------------------------------------
    
    const [ISF3, setISF3] = useState(0);
//-------------------------------------------                   
    
    const [ISF4, setISF4] = useState(0);
//-------------------------------------------

    const [ISF5, setISF5] = useState(0);
//-------------------------------------------
    
    const [ISF6, setISF6] = useState(0);
    const [targetBG, setTargetBG] = useState(0);
    const [startBG, setStartBG] = useState(0);
//-------------------------------------------------
    const onChangeFrom = (event, selectedDate) => { // Time methods for every to/from time
      setShowFrom(Platform.OS === 'ios');
      if (flag1==false){
        return;
       }
      const currentDate = selectedDate || hours[selectedIndex].from;
      const newArr = [...hours];
      
      if (hours[selectedIndex].id == selectedID && flag1==true){
            setfalg1(false);
            newArr[selectedIndex].from = currentDate;
            newArr[selectedIndex].isChanged = true;
            setHours([...newArr]);
            return;
           }
      };
//-------------------------------------------------
      const onChangeTo = (event, selectedDate) => {
        setShowTo(Platform.OS === 'ios');
        if (flag2==false){
          return;
         }
        const currentDate = selectedDate || hours[selectedIndex].to;
        const newArr = [...hours];
        
        if (hours[selectedIndex].id == selectedID && flag2==true){
              setfalg2(false);
              newArr[selectedIndex].to = currentDate;
              newArr[selectedIndex].isChanged = true;
              setHours([...newArr]);
              return;
             }
      };

      const addISF = ()=> {
        if (hours.length >= 6){
          alert('You have reached your maximum ISF intervals');
          return;
        } else{ 
          setISFCount(isfCount+1);
          var obj = {id: isfCount+1, from: new Date(), to: new Date(), isf: '', tBG:'', sBG:'', isChanged: false, isNew: true};
          hours.push(obj);
        }
      
      }
//----------------------------------
      const showModeFrom = (currentMode) => {
        setShowFrom(true);
        setMode(currentMode);
      };
//-------------------------------------------------
      const showModeTo = (currentMode) => {
        setShowTo(true);
        setMode(currentMode);
      };
//-------------------------------------------------
   
//-------------------------------------------------
      const showTimepickerF = () => {
        showModeFrom('time');
      };
//-------------------------------------------------
      const showTimepickerT = () => {
        showModeTo('time');
      };

//-----------------ISF-----------------------------  // end of time methods and attributes !
  const [isfInterval, setISF] = useState('-1');


const showOnLoad2 = ()=>{

    if (interval == '0'){
        setISF('0');
    } else if (interval == '1'){
        setISF('1');
    } 
  
    
  }
  



const handleAllDayUpdate = ()=> {
  if (isfP>999 || isfP<=0  || sBGP>999 || sBGP <= 0 || tBGP >999 || tBGP <=0){
    alert('Please enter a valid number');
    return;
  } else {
    if (AccType == 'Patient Account'){
      try {
        // call db onlines
        console.log('in isf');
        onlineISFDB();
        onlineSbgDB();
        onlineTbgDB();
        
        db.transaction( (tx) => {
            tx.executeSql(
              'UPDATE patientprofile SET ISF=?, targetBG_correct=?, startBG_correct=? WHERE UserID=? ',
              [isfP, tBGP, sBGP, 238],
              (tx, results) => {
                console.log('Results', results.rowsAffected);
             if (results.rowsAffected > 0) {
             console.log('isf Updated Succefully');
                  }
              }   
    ) 
        
    
    }  ) 
    } catch (error) {
       console.log(error);
    }
  
    } else {
      try {
        db.transaction( (tx) => {
          tx.executeSql(
            'UPDATE nonPatientprofile SET ISF=?, targetBG_correct=?, startBG_correct=? WHERE UserID=? ',
            [isfP, tBGP, sBGP, uID],
            (tx, results) => {
              console.log('Results', results.rowsAffected);
           if (results.rowsAffected > 0) {
           console.log('isf Updated Succefully');
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

const handleISFUpdate =()=>{
  for (let i=0; i<hours.length; i++){
    
    if (hours[i].isChanged == true && hours[i].isNew == false){
      console.log(hours[i].isChanged+' hohoho')
      if (hours[i].isf > 999 || hours[i].isf  <= 0 || hours[i].tBG > 999 || hours[i].tBG  <= 0 || hours[i].sBG > 999 || hours[i].sBG  <= 0){
        alert('Please enter a valid number');
        return;
      } else{
        try {
          // online db
          oldOnlineInterISFDB(extrHours[i].from, extrHours[i].to, extrHours[i].isf, extrHours[i].tBG, extrHours[i].sBG, hours[i].from, hours[i].to, hours[i].isf, hours[i].tBG, hours[i].sBG);

          db.transaction( (tx) => {
              tx.executeSql(
                'UPDATE isfInterval SET fromTime=?, toTime=?, ISF=?, targetBG_correct=?, startBG_correct=? WHERE isfID=? ',
                [hours[i].from, hours[i].to, hours[i].isf,hours[i].tBG, hours[i].sBG, hours[i].id],
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
    } else if (hours[i].isNew == true){
      localISF();
    }
  }
  alert('Updated!');
  navigation.navigate('edit');
}
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
const changeV = (val, id, type, i) => { 

          var tempArr = [...hours];
                if (type == 'isf'){
                    tempArr[i].isf = val;
                    tempArr[i].isChanged = true;
                    setHours([...tempArr]);
                      return;
                 
                } else if (type == 'bgt'){
                    tempArr[i].tBG = val;
                    tempArr[i].isChanged = true;
                    setHours([...tempArr]);
                      return;
                  
                } else if (type == 'bgs'){
                 
                    tempArr[i].sBG = val;
                    console.log(tempArr[i].sBG+' sbg')
                    tempArr[i].isChanged = true;
                    setHours([...tempArr]);
                      return;
                  
                }  
                
  }
  const localISF = () => {
    console.log('in insert');
    for (let i=0; i<hours.length; i++){
      if (hours[i].isNew){
        console.log('I WAAAS HEEEREE');
        console.log(hours[i].isf+' / '+hours[i].tBG+' / '+hours[i].sBG);
        if (hours[i].isf > 999 || hours[i].isf  <= 0 || hours[i].tBG > 999 || hours[i].tBG  <= 0 || hours[i].sBG > 999 || hours[i].sBG  <= 0){
          alert('Please enter a valid number');
          return;
        } else{
        try {
          db.transaction( (tx) => {
              tx.executeSql(
               'INSERT INTO isfInterval (UserID, fromTime, toTime, ISF, targetBG_correct, startBG_correct)' 
               +'VALUES (?,?,?,?,?,?)',
                 [237, hours[i].from, hours[i].to, hours[i].isf, hours[i].tBG, hours[i].sBG ]
             );
         })
         
        } catch (error) {
         console.log(error);
        }
        if (AccType == 'Patient Account'){
          var InsertAPIURL = "https://isugarserver.com/ISFInterval.php";
        
          var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          };
          
          var Data ={
            UserID: onlinUserID,
            fromTime: hours[i].from.toString(),
            toTime: hours[i].to.toString(),
            ISF: hours[i].isf,
            targetBG: hours[i].tBG,
            startBG: hours[i].sBG,
            
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
    
    }
    const onlineISFDB = () => {
      if (AccType == 'Patient Account'){
        var InsertAPIURL = "https://isugarserver.com/ISF.php";   //API to  signup
    
        var headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        };
        
        var Data ={
          UserID: onlinUserID,
          ISF: isfP
          
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
    //---------------------------
    const onlineTbgDB = () => {
      if (AccType == 'Patient Account'){
        var InsertAPIURL = "https://isugarserver.com/targetBG_correct.php";   //API to  signup
    
        var headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        };
        
        var Data ={
          UserID: onlinUserID,
          targetBG: tBGP
          
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
    //---------------------------
    const onlineSbgDB = () => {
      if (AccType == 'Patient Account'){
        var InsertAPIURL = "https://isugarserver.com/startBG_correct.php";   //API to  signup
    
        var headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        };
        
        var Data ={
          UserID: onlinUserID,
          startBG: sBGP
          
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
    //---------------------------
    const oldOnlineInterISFDB = (fromT, toT, isf, bgT, bgS, fromT1, toT1, isf1, bgT1, bgS1) => {
      if (AccType == 'Patient Account'){
        var InsertAPIURL = "https://isugarserver.com/updateIntervalsISF.php";   //API to  signup
    
        var headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        };
        
        var Data ={
          UserID: onlinUserID,
          fromTime: fromT,
          toTime: toT,
          ISF: isf,
          targetBG: bgT,
          startBG: bgS,
          fromTime1: fromT1,
          toTime1: toT1,
          ISF1: isf1,
          targetBG1: bgT1,
          startBG1: bgS1
          
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
    //---------------------------
    const onlineIntervalDB = () => {
      var InsertAPIURL = "https://isugarserver.com/ISFIntervals.php"; 
    
      var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };
      
      var Data ={
        UserID: onlinUserID,
        ISFInter: isfInterval
        
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
    //---------------------------
    

    const changeA = (val, type) =>{
      console.log(type);
      if (type=='isf'){
        setISFP(val);
        return;
      }
      else if (type=='sBG'){
        setSBGP(val);
        return;
      }
      else if (type =='tbg'){
        setTBGP(val);
        console.log(tBGP);
        return;
      }
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
       <Text style={styles.title}>Insulin Sensitivity Factor {'\n'}</Text>
       {isfInterval =='-1'?  showOnLoad2() : null}
      
         
<ScrollView>

<View style={styles.actionB}>
              <Text style={styles.text_footer}>Time to start{'\n'}correction</Text>
             <Text style={styles.text_footer}>{isfInterval=='0'? 'All Day' : 'Specific Hours'}</Text>
      
</View>
{isfInterval=='0' ? (<View style={styles.actionB}>
 
 <Text style={styles.text_footer}>Insulin Sensitivity 
 Factor{'\n'}(ISF):</Text>
 <TextInput
             keyboardType="decimal-pad"
             defaultValue={isfP+''}
             onChangeText={(val)=>changeA(val, 'isf')}
             style={styles.actionN}></TextInput>
 
 </View>) 
  : null}


{isfInterval == '0' ? (<View style={styles.actionB}>

<Text style={styles.text_footer}>Target glucose level{'\n'}
for correction:</Text>
<TextInput
            keyboardType="decimal-pad"
            defaultValue={tBGP+''}
            onChangeText={(val)=>changeA(val, 'tbg')}
            style={styles.actionN}></TextInput>
            
</View> )
: null}

{isfInterval=='0' ? (<View style={styles.actionB}>
<Text style={styles.text_footer}>Glucose level to{'\n'}
start correction:</Text>
<TextInput
            keyboardType="decimal-pad"
            defaultValue={sBGP+''}
            onChangeText={(val)=>changeA(val, 'sBG')}
            style={styles.actionN}></TextInput>

</View> 

) 
: null}
  {isfInterval=='1' ? hours.length > 0 ? ( (<View style={{alignItems:'center'}}>
          
          <FlatList
          data={hours}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.outerContainer}>
               <Text style={styles.innerTitle}>From</Text>
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
                     <Text style={styles.innerTitle}>To</Text>
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
                      <View style={styles.innerCotainer}>
                      <View style={styles.innerView}>
                      <Text style={styles.innerTitle}>ISF: {index} </Text>
                      <TextInput
                      style={{borderColor: 'grey', borderBottomWidth: 1,paddingBottom: 0, paddingTop:0, color:'#000'}}
                       keyboardType="decimal-pad"
                       defaultValue={item.isf+''}
                       onChangeText={(val) => changeV(val, item.id, 'isf', index)}
                      />
                      </View>
                      <View style={styles.innerView}>
                      <Text style={styles.innerTitle}>Target: </Text>
                      <TextInput
                      style={{borderColor: 'grey', borderBottomWidth: 1,paddingBottom: 0, paddingTop:0, color:'#000'}}
                       keyboardType="decimal-pad"
                       defaultValue={item.tBG+''}
                       onChangeText={(val) => changeV(val, item.id, 'bgt', index)}
                      />
                      </View>
                      <View style={styles.innerView}>
                      <Text style={styles.innerTitle}>Start: </Text>
                      <TextInput
                      style={{borderColor: 'grey', borderBottomWidth: 1,paddingBottom: 0, paddingTop:0, color:'#000'}}
                       keyboardType="decimal-pad"
                       defaultValue={item.sBG+''}
                       onChangeText={(val) => changeV(val, item.id, 'bgs', index)}
                      />
                      </View>
                      </View>
            </View>
          )}
  
          />
          <TouchableOpacity 
          onPress={()=>addISF()}><Text style={{fontSize: 15, color: '#05375a', textDecorationLine: 'underline' }} >Add Interval</Text></TouchableOpacity>
            <View style={styles.buttonV}>
        <TouchableOpacity onPress={()=>handleISFUpdate()}>
                <LinearGradient
                    colors={['#E7EFFA', '#AABED8', '#AABED8']} style={styles.buttonR}
                >
                    <Text style={styles.titleB}>Update</Text>
                  
                </LinearGradient>
            </TouchableOpacity>
            </View>
        </View> )) 
  : <ActivityIndicator animating={true} color={Colors.blue100} size={'large'} /> : null
  }
{isfInterval == '0'? (<View style={styles.buttonV}>
        <TouchableOpacity onPress={()=>handleAllDayUpdate()}>
                <LinearGradient
                    colors={['#E7EFFA', '#AABED8', '#AABED8']} style={styles.buttonR}
                >
                    <Text style={styles.titleB}>Update</Text>
                  
                </LinearGradient>
            </TouchableOpacity>
            </View>): null}

                 

<View>
<View style={styles.buttonV}> 

        </View>
   </View>       
            </ScrollView>
         
        </View>
     </View>
  
         
  
    );
  
  };


const {height} = Dimensions.get("screen");
const height_logo = height * 0.15;

export default isfEdit;

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
fieldMain: {
  marginTop: 15,
  marginBottom: 15,
},
field: {
    width: 350,
    justifyContent:'space-evenly',
    paddingLeft: 15,
    marginBottom: 35,
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
  fontSize: 15,
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
titleBS: {
  color: '#05375a',
  fontSize: 20,
  textAlign: 'center',
},
picker: {
  width: 150,
  height: 30,
  borderWidth: 2,
  borderColor: '#4c4c4c',
    
},
pickerP: {
  width: 90,
  height: 30,
    
},
titleB: {
  color: '#05375a',
  fontSize: 20,
  fontWeight: 'bold',
 
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
  flex: 1,
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent:'space-between',
  flexWrap: 'wrap',
  marginTop: 10,
  marginBottom: 10,
  paddingBottom: 25,
  
},
actionN: {
    width: 180,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#CACDD1',
    color: '#000'
  
},
actionP: {
  width: 350,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  marginTop: 10,
  paddingBottom: 15,
  backgroundColor: '#fff',
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
textD:{
justifyContent: 'space-between',
marginTop: 25
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
})