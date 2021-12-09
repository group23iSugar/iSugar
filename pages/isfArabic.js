import React, {  useState } from 'react';
import {  StyleSheet, 
  View,
  Image,
  Text,
  TouchableOpacity,
  Platform, 
  TextInput,
  ScrollView,
  Dimensions} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';


  const isfAR = ({ navigation, route }) =>{
   
  //---------------------------------------------------
    const[bgTarget1, setbgTarget1] = useState(0);
    const[bgTarget2, setbgTarget2] = useState(0);
    const[bgTarget3, setbgTarget3] = useState(0);
    const[bgTarget4, setbgTarget4] = useState(0);
    const[bgTarget5, setbgTarget5] = useState(0);
    const[bgTarget6, setbgTarget6] = useState(0);
    const[bgStart1, setbgStart1] = useState(0);
    const[bgStart2, setbgStart2] = useState(0);
    const[bgStart3, setbgStart3] = useState(0);
    const[bgStart4, setbgStart4] = useState(0);
    const[bgStart5, setbgStart5] = useState(0);
    const[bgStart6, setbgStart6] = useState(0);
//------------------------------------------------------
    const [mode, setMode] = useState('date');
//--------------Date----------------------- 
    const [date1From, setDate1From] = useState(new Date());         // time entries x6 for user
    const [show1From, setShow1From] = useState(false);
    const [ISF, setISFM] = useState(0);
//-------------------------------------------
    const [date1TO, setDate1TO] = useState(new Date());
    const [show1TO, setShow1TO] = useState(false);
    const [ISF1, setISF1] = useState(0);
//-------------------------------------------
    const [date2From, setDate2From] = useState(new Date());
    const [show2From, setShow2From] = useState(false);
//-------------------------------------------
    const [date2TO, setDate2TO] = useState(new Date());
    const [show2TO, setShow2TO] = useState(false);
    const [ISF2, setISF2] = useState(0);
//-------------------------------------------
    const [date3From, setDate3From] = useState(new Date());
    const [show3From, setShow3From] = useState(false);

//-------------------------------------------
    const [date3TO, setDate3TO] = useState(new Date());
    const [show3TO, setShow3TO] = useState(false);
    const [ISF3, setISF3] = useState(0);
//-------------------------------------------                   
    const [date4From, setDate4From] = useState(new Date());
    const [show4From, setShow4From] = useState(false);
//-------------------------------------------
    const [date4TO, setDate4TO] = useState(new Date());
    const [show4TO, setShow4TO] = useState(false);
    const [ISF4, setISF4] = useState(0);
//-------------------------------------------
    const [date5From, setDate5From] = useState(new Date());
    const [show5From, setShow5From] = useState(false);
//-------------------------------------------
    const [date5TO, setDate5TO] = useState(new Date());
    const [show5TO, setShow5TO] = useState(false);
    const [ISF5, setISF5] = useState(0);
//-------------------------------------------
    const [date6From, setDate6From] = useState(new Date());
    const [show6From, setShow6From] = useState(false);

//-------------------------------------------
    const [date6TO, setDate6TO] = useState(new Date());
    const [show6TO, setShow6TO] = useState(false);
    const [ISF6, setISF6] = useState(0);
    const [targetBG, setTargetBG] = useState(0);
    const [startBG, setStartBG] = useState(0);
//-------------------------------------------------
    const onChange1From = (event, selectedDate) => { // Time methods for every to/from time
        const currentDate = selectedDate || date1From;
        setShow1From(Platform.OS === 'ios');
        setDate1From(currentDate);
      };
//-------------------------------------------------
      const onChange1To = (event, selectedDate) => {
        const currentDate = selectedDate || date1TO;
        setShow1TO(Platform.OS === 'ios');
        setDate1TO(currentDate);
      };
//-------------------------------------------------
    const onChange2From = (event, selectedDate) => {
        const currentDate = selectedDate || date2From;
        setShow2From(Platform.OS === 'ios');
        setDate2From(currentDate);
      };
    
//-------------------------------------------------
const onChange2To = (event, selectedDate) => {
    const currentDate = selectedDate || date2TO;
    setShow2TO(Platform.OS === 'ios');
    setDate2TO(currentDate);
  };

//-------------------------------------------------
const onChange3From = (event, selectedDate) => {
    const currentDate = selectedDate || date3From;
    setShow3From(Platform.OS === 'ios');
    setDate3From(currentDate);
  };
   
//-------------------------------------------------
const onChange3To = (event, selectedDate) => {
    const currentDate = selectedDate || date3TO;
    setShow3TO(Platform.OS === 'ios');
    setDate3TO(currentDate);
  };

//-------------------------------------------------
const onChange4From = (event, selectedDate) => {
    const currentDate = selectedDate || date4From;
    setShow4From(Platform.OS === 'ios');
    setDate4From(currentDate);
  };

  //-------------------------------------------------
const onChange4To = (event, selectedDate) => {
    const currentDate = selectedDate || date4TO;
    setShow4TO(Platform.OS === 'ios');
    setDate4TO(currentDate);
  };

//-------------------------------------------------
const onChange5From = (event, selectedDate) => {
    const currentDate = selectedDate || date5From;
    setShow5From(Platform.OS === 'ios');
    setDate5From(currentDate);
  };
//-------------------------------------------------
const onChange5To = (event, selectedDate) => {
    const currentDate = selectedDate || date5TO;
    setShow5TO(Platform.OS === 'ios');
    setDate5TO(currentDate);
  };

//-------------------------------------------------
const onChange6From = (event, selectedDate) => {
    const currentDate = selectedDate || date6From;
    setShow6From(Platform.OS === 'ios');
    setDate6From(currentDate);
  };
//-------------------------------------------------
const onChange6To = (event, selectedDate) => {
    const currentDate = selectedDate || date6TO;
    setShow6TO(Platform.OS === 'ios');
    setDate6TO(currentDate);
  };

//-------------------------------------------------
      const showMode1From = (currentMode) => {
        setShow1From(true);
        setMode(currentMode);
      };
//-------------------------------------------------
      const showMode1To = (currentMode) => {
        setShow1TO(true);
        setMode(currentMode);
      };
//-------------------------------------------------
    const showMode2From = (currentMode) => {
        setShow2From(true);
        setMode(currentMode);
      };
//-------------------------------------------------
    const showMode2To = (currentMode) => {
    setShow2TO(true);
    setMode(currentMode);
  };
//-------------------------------------------------
    const showMode3From = (currentMode) => {
    setShow3From(true);
    setMode(currentMode);
  };
//-------------------------------------------------
  const showMode3To = (currentMode) => {
    setShow3TO(true);
    setMode(currentMode);
  };  

  //-------------------------------------------------
  const showMode4From = (currentMode) => {
    setShow4From(true);
    setMode(currentMode);
  };
//-------------------------------------------------
  const showMode4To = (currentMode) => {
    setShow4TO(true);
    setMode(currentMode);
  };
//-------------------------------------------------
  const showMode5From = (currentMode) => {
    setShow5From(true);
    setMode(currentMode);
  };
//-------------------------------------------------
const showMode5To = (currentMode) => {
setShow5TO(true);
setMode(currentMode);
};
//-------------------------------------------------
const showMode6From = (currentMode) => {
setShow6From(true);
setMode(currentMode);
};
//-------------------------------------------------
const showMode6To = (currentMode) => {
setShow6TO(true);
setMode(currentMode);
}; 
//-------------------------------------------------
      const showTimepicker1F = () => {
        showMode1From('time');
      };
//-------------------------------------------------
      const showTimepicker1T = () => {
        showMode1To('time');
      };
//-------------------------------------------------
      const showTimepicker2F = () => {
        showMode2From('time');
      };
//-------------------------------------------------
const showTimepicker2T = () => {
    showMode2To('time');
  };
//-------------------------------------------------
  const showTimepicker3F = () => {
    showMode3From('time');
  };
  //-------------------------------------------------
  const showTimepicker3T = () => {
    showMode3To('time');
  };
//-------------------------------------------------
  const showTimepicker4F = () => {
    showMode4From('time');
  };
//-------------------------------------------------
const showTimepicker4T = () => {
showMode4To('time');
};
//-------------------------------------------------
const showTimepicker5F = () => {
showMode5From('time');
};
  //-------------------------------------------------
  const showTimepicker5T = () => {
    showMode5To('time');
  };
//-------------------------------------------------
  const showTimepicker6F = () => {
    showMode6From('time');
  };
//-------------------------------------------------
const showTimepicker6T = () => {
showMode6To('time');
};
//-----------------ISF-----------------------------  // end of time methods and attributes !
    
  const [isfInterval, setISF] = useState('0');
  const [shouldShow1, setShouldShow1] = useState(false);
  const [shouldShow2, setShouldShow2] = useState(false);
  const [shouldShow3, setShouldShow3] = useState(false);
  const [shouldShow4, setShouldShow4] = useState(false);
  const [shouldShow5, setShouldShow5] = useState(false);

const checkISFInterval = () => {
    if (isfInterval == '0'){
        return false;
    } else {
        return true;
    }
}
const setShouldShowAll = () =>{
  if (shouldShow1 == false){
    setShouldShow1(true);
    return;
  }else if (shouldShow1 == true && shouldShow2 == false){
    setShouldShow2(true);
    return;
  } else if ((shouldShow1 == true  && shouldShow2 == true) && shouldShow3==false  ){
    setShouldShow3(true);
    return;
  } else if ( (shouldShow1  && shouldShow2 && shouldShow3 ) && shouldShow4==false){
    setShouldShow4(true);
    return;
  }else if ((shouldShow1 == true && shouldShow2 == true && shouldShow3 == true && shouldShow4 == true) && shouldShow5==false ){
    setShouldShow5(true);
    return;
  } else{
    alert('لقد وصلت الى حدك الاقصى');
    return;
  } 

  
}
InsulinSF = ISF;
bgTarget = targetBG;
bgStart= startBG;
intervalISF =isfInterval;

var time1F =  moment.utc(date1From).format('HH:mm');
var time1T = moment.utc(date1TO).format('HH:mm');
var time2F = moment.utc(date2From).format('HH:mm');
var time2T = moment.utc(date2TO).format('HH:mm');
var time3F =  moment.utc(date3From).format('HH:mm');
var time3T = moment.utc(date3TO).format('HH:mm');
var time4F = moment.utc(date4From).format('HH:mm');
var time4T = moment.utc(date4TO).format('HH:mm');
var time5F =  moment.utc(date5From).format('HH:mm');
var time5T = moment.utc(date5TO).format('HH:mm');
var time6F = moment.utc(date6From).format('HH:mm');
var time6T = moment.utc(date6TO).format('HH:mm');
const check = () =>{
    if (isfInterval == '0'){
      onlineISFDB();
      onlineTbgDB();
      onlineSbgDB();
      
    }
    if (isfInterval == '1'){
      onlineInterISFDB(date1From, date1TO, ISF1, bgTarget1, bgStart1);
      try {
        db.transaction( (tx) => {
            tx.executeSql(
              'INSERT INTO isfInterval (UserID, fromTime, toTime, ISF, targetBG_correct, startBG_correct) VALUES (?,?,?,?,?,?)',
               [uID, date1From, date1TO, ISF1, bgTarget1, bgStart1 ]
           );
          
          
       })
       
   } catch (error) {
       console.log(error);
   }
   
    } 
     if (isfInterval == '1' && shouldShow1 == true) {
      onlineInterISFDB(date2From, date2TO, ISF2, bgTarget2, bgStart2);
      try {
        db.transaction( (tx) => {
            tx.executeSql(
              'INSERT INTO isfInterval (UserID, fromTime, toTime, ISF, targetBG_correct, startBG_correct) VALUES (?,?,?,?,?,?)',
               [uID, date2From, date2TO, ISF2, bgTarget2, bgStart2]
           );
          
          
       })
       
   } catch (error) {
       console.log(error);
   }
    }
    if (isfInterval == '1' && shouldShow2 == true) {
      onlineInterISFDB(date3From, date3TO, ISF3, bgTarget3, bgStart3);
      try {
        db.transaction( (tx) => {
            tx.executeSql(
              'INSERT INTO isfInterval (UserID, fromTime, toTime, ISF, targetBG_correct, startBG_correct) VALUES (?,?,?,?,?,?)',
               [uID, date3From, date3TO, ISF3, bgTarget3, bgStart3]
           );
          
          
       })
       
   } catch (error) {
       console.log(error);
   }
    }
    if (isfInterval == '1' && shouldShow3 == true) {
      onlineInterISFDB(date4From, date4TO, ISF4, bgTarget4, bgStart4);
      try {
        db.transaction( (tx) => {
            tx.executeSql(
              'INSERT INTO isfInterval (UserID, fromTime, toTime, ISF, targetBG_correct, startBG_correct) VALUES (?,?,?,?,?,?)',
               [uID, date4From, date4TO, ISF4, bgTarget4, bgStart4]
           );
          
          
       })
       
   } catch (error) {
       console.log(error);
   }
    }
    if (isfInterval == '1' && shouldShow4 == true) {
      onlineInterISFDB(date5From, date5TO, ISF5, bgTarget5, bgStart5);
      try {
        db.transaction( (tx) => {
            tx.executeSql(
              'INSERT INTO isfInterval (UserID, fromTime, toTime, ISF, targetBG_correct, startBG_correct) VALUES (?,?,?,?,?,?)',
               [uID, date5From, date5TO, ISF5, bgTarget5, bgStart5]
           );
          
          
       })
       
   } catch (error) {
       console.log(error);
   }
   console.log(date2From +' '+date2TO+' '+ISF5);
    }
    if (isfInterval == '1' && shouldShow5 == true) {
      onlineInterISFDB(date6From, date6TO, ISF6, bgTarget6, bgStart6);
      try {
        db.transaction( (tx) => {
            tx.executeSql(
             'INSERT INTO isfInterval (UserID, fromTime, toTime, ISF, targetBG_correct, startBG_correct) VALUES (?,?,?,?,?,?)',
               [uID, date6From, date6TO, ISF6, bgTarget6, bgStart6]
           );
          
          
       })
       
   } catch (error) {
       console.log(error);
   }
    }
     //-------------------------
      onlineIntervalDB();
      navigation.navigate('icrAR')
    
    

} 
//---------------------
const onlineISFDB = () => {
  if (AccType == 'Patient Account'){
    var InsertAPIURL = "https://isugarserver.com/ISF.php";   //API to  signup

    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    
    var Data ={
      UserID: onlinUserID,
      ISF: ISF
      
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
      targetBG: targetBG
      
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
      startBG: startBG
      
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
const onlineInterISFDB = (fromT, toT, isf, bgT, bgS) => {
  if (AccType == 'Patient Account'){
    var InsertAPIURL = "https://isugarserver.com/ISFInterval.php";   //API to  signup

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
      startBG: bgS
      
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
  if (AccType == 'Patient Account'){
    var InsertAPIURL = "https://isugarserver.com/ISFIntervals.php";   //API to  signup

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
  
}
//---------------------------

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
        {AccType == 'Patient Account' ? <Text style={styles.title}>الخطوة 6 من 7: معامل حساسية الأنسولين {'\n'}</Text>
        : <Text style={styles.title}>الخطوة 5 من 6: معامل حساسية الأنسولين {'\n'}</Text> }
      
         
<ScrollView>

<View style={styles.actionB}>
              <Text style={styles.text_footer}>وقت بداية {'\n'}التصحيح</Text>
              <Picker
              selectedValue={isfInterval}
              onValueChange={(value) => setISF(value)}
              mode="dropdown"
              style={styles.picker}
              >
            <Picker.Item label= 'طوال الوقت ' value='0'></Picker.Item>
            <Picker.Item label= 'ساعات محددة' value='1'></Picker.Item>

        </Picker>
      
</View>
{isfInterval=='0' ? (<View style={styles.actionB}>
 
 <Text style={styles.text_footer}>معامل حساسية  
 الأنسولين{'\n'}(ISF):</Text>
 <TextInput
   style={{color:'black'}}
             keyboardType="decimal-pad"
             placeholder="000"
             onChangeText={(val)=>setISFM(val)}
             style={styles.actionN}></TextInput>
 
 </View>) 
  : null}


{isfInterval == '0' ? (<View style={styles.actionB}>

<Text style={styles.text_footer}>مستوى سكر الدم المرغوب  {'\n'}
  التصحيح إليه</Text>
<TextInput
  style={{color:'black'}}
            keyboardType="decimal-pad"
            placeholder="000"
            onChangeText={(val)=>setTargetBG(val)}
            style={styles.actionN}></TextInput>
            
</View> )
: null}

{isfInterval=='0' ? (<View style={styles.actionB}>
<Text style={styles.text_footer}>مستوى سكر الدم   {'\n'}
لبدء التصحيح</Text>
<TextInput
  style={{color:'black'}}
            keyboardType="decimal-pad"
            placeholder="000"
            onChangeText={(val)=>setStartBG(val)}
            style={styles.actionN}></TextInput>

</View> 
) 
: null}




<View style={styles.action}>

{checkISFInterval() ? (<View style={styles.field} >
             <View style= {styles.actionP}>
             <Text style={styles.text_footer}>من</Text>
                     <TouchableOpacity onPress={showTimepicker1F} 
                 >
             <Text testID="dateTimePicker" style={styles.text_footerD} >
                             {moment(date1From).format('h:mm a')}
                             </Text> 
                 </TouchableOpacity>
                   
                   {show1From && (
                     <DateTimePicker
                       testID="dateTimePicker"
                       value={date1From}
                       mode={mode}
                       is24Hour={false}
                       display="default"
                       onChange={onChange1From}
                     />
                   )} 
                       </View>    
                       <View style= {styles.actionP}>
                           <Text style={styles.text_footer}>الى</Text>
                     <TouchableOpacity onPress={showTimepicker1T} 
                 >
             <Text testID="dateTimePicker" style={styles.text_footerD} >
                             {moment(date1TO).format('h:mm a')}
                             </Text> 
                 </TouchableOpacity>
                   
                   {show1TO && (
                     <DateTimePicker
                       testID="dateTimePicker"
                       value={date1TO}
                       mode={mode}
                       is24Hour={false}
                       display="default"
                       onChange={onChange1To}
                     />
                   )} 
                   </View> 
                   <View style={styles.actionP}>
                   <Text style={styles.text_footer}>ISF:{'\n'}</Text>
                   <TextInput
                     style={{color:'black'}}
                               keyboardType="decimal-pad"
                               placeholder="000"
                               onChangeText={(val)=>setISF1(val)}
                               style={styles.action}></TextInput>
                    </View>
                    <View style={styles.actionP}>
                    <Text style={styles.text_footer}>
مستوى سكر الدم المرغوب   {'\n'}
التصحيح إليه  </Text>
                    <TextInput
                      style={{color:'black'}}
                               keyboardType="decimal-pad"
                               placeholder="000"
                               onChangeText={(val)=>setbgTarget1(val)}
                               style={styles.action}></TextInput>
                    </View>
                    <View style={styles.actionP}>
                    <Text style={styles.text_footer}>مستوى سكر الدم   {'\n'}
                    لبدء التصحيح</Text>
                    <TextInput
                      style={{color:'black'}}
                               keyboardType="decimal-pad"
                               placeholder="000"
                               onChangeText={(val)=>setbgStart1(val)}
                               style={styles.action}></TextInput>
                    </View>      
                   
                 
                 </View>) : null }
</View>

{shouldShow1 ? (<View style={styles.field} >
             <View style= {styles.actionP}>
             <Text style={styles.text_footer}>من</Text>
                     <TouchableOpacity onPress={showTimepicker2F} 
                 >
             <Text testID="dateTimePicker" style={styles.text_footerD} >
                             {moment(date2From).format('h:mm a')}
                             </Text> 
                 </TouchableOpacity>
                   
                   {show2From && (
                     <DateTimePicker
                       testID="dateTimePicker"
                       value={date2From}
                       mode={mode}
                       is24Hour={false}
                       display="default"
                       onChange={onChange2From}
                     />
                   )} 
                       </View>    
                       <View style= {styles.actionP}>
                           <Text style={styles.text_footer}>الى</Text>
                     <TouchableOpacity onPress={showTimepicker2T} 
                 >
             <Text testID="dateTimePicker" style={styles.text_footerD} >
                             {moment(date2TO).format('h:mm a')}
                             </Text> 
                 </TouchableOpacity>
                   
                   {show2TO && (
                     <DateTimePicker
                       testID="dateTimePicker"
                       value={date2TO}
                       mode={mode}
                       is24Hour={false}
                       display="default"
                       onChange={onChange2To}
                     />
                   )} 
                   </View> 
                   <View style={styles.actionP}>
                   <Text style={styles.text_footer}>ISF:</Text>
                   <TextInput
                     style={{color:'black'}}
                               keyboardType="decimal-pad"
                               placeholder="000"
                               onChangeText={(val)=>setISF2(val)}
                               style={styles.action}></TextInput>
                   
                   </View>
                   <View style={styles.actionP}>
                   <Text style={styles.text_footer}>
مستوى سكر الدم المرغوب   {'\n'}
التصحيح إليه  </Text>
                  
                    <TextInput
                      style={{color:'black'}}
                               keyboardType="decimal-pad"
                               placeholder="000"
                               onChangeText={(val)=>setbgTarget2(val)}
                               style={styles.action}></TextInput>
                    </View>
                    <View style={styles.actionP}>
                    <Text style={styles.text_footer}>مستوى سكر الدم   {'\n'}
                    لبدء التصحيح</Text>
                    <TextInput
                      style={{color:'black'}}
                               keyboardType="decimal-pad"
                               placeholder="000"
                               onChangeText={(val)=>setbgStart2(val)}
                               style={styles.action}></TextInput>
                    </View> 
                 
                 </View>) : null }
                 {shouldShow2 ? (<View style={styles.field} >
             <View style= {styles.actionP}>
             <Text style={styles.text_footer}>من</Text>
                     <TouchableOpacity onPress={showTimepicker3F} 
                 >
             <Text testID="dateTimePicker" style={styles.text_footerD} >
                             {moment(date3From).format('h:mm a')}
                             </Text> 
                 </TouchableOpacity>
                   
                   {show3From && (
                     <DateTimePicker
                       testID="dateTimePicker"
                       value={date3From}
                       mode={mode}
                       is24Hour={false}
                       display="default"
                       onChange={onChange3From}
                     />
                   )} 
                       </View>    
                       <View style= {styles.actionP}>
                           <Text style={styles.text_footer}>الى</Text>
                     <TouchableOpacity onPress={showTimepicker3T} 
                 >
             <Text testID="dateTimePicker" style={styles.text_footerD} >
                             {moment(date3TO).format('h:mm a')}
                             </Text> 
                 </TouchableOpacity>
                   
                   {show3TO && (
                     <DateTimePicker
                       testID="dateTimePicker"
                       value={date3TO}
                       mode={mode}
                       is24Hour={false}
                       display="default"
                       onChange={onChange3To}
                     />
                   )} 
                   </View> 
                   <View style={styles.actionP}>
                   <Text style={styles.text_footer}>ISF:</Text>
                   <TextInput
                     style={{color:'black'}}
                               keyboardType="decimal-pad"
                               placeholder="000"
                               onChangeText={(val)=>setISF3(val)}
                               style={styles.action}></TextInput>
                   
                   </View>
                   <View style={styles.actionP}>
                   <Text style={styles.text_footer}>
مستوى سكر الدم المرغوب   {'\n'}
التصحيح إليه  </Text>
                    <TextInput
                      style={{color:'black'}}
                               keyboardType="decimal-pad"
                               placeholder="000"
                               onChangeText={(val)=>setbgTarget3(val)}
                               style={styles.action}></TextInput>
                    </View>
                    <View style={styles.actionP}>
                    <Text style={styles.text_footer}>مستوى سكر الدم   {'\n'}
                    لبدء التصحيح</Text>
                    <TextInput
                      style={{color:'black'}}
                               keyboardType="decimal-pad"
                               placeholder="000"
                               onChangeText={(val)=>setbgStart3(val)}
                               style={styles.action}></TextInput>
                    </View> 
                 
                 </View>) : null }

{shouldShow3 ? (<View style={styles.field} >
             <View style= {styles.actionP}>
             <Text style={styles.text_footer}>من</Text>
                     <TouchableOpacity onPress={showTimepicker4F} 
                 >
             <Text testID="dateTimePicker" style={styles.text_footerD} >
                             {moment(date4From).format('h:mm a')}
                             </Text> 
                 </TouchableOpacity>
                   
                   {show4From && (
                     <DateTimePicker
                       testID="dateTimePicker"
                       value={date4From}
                       mode={mode}
                       is24Hour={false}
                       display="default"
                       onChange={onChange4From}
                     />
                   )} 
                       </View>    
                       <View style= {styles.actionP}>
                           <Text style={styles.text_footer}>الى</Text>
                     <TouchableOpacity onPress={showTimepicker4T} 
                 >
             <Text testID="dateTimePicker" style={styles.text_footerD} >
                             {moment(date4TO).format('h:mm a')}
                             </Text> 
                 </TouchableOpacity>
                   
                   {show4TO && (
                     <DateTimePicker
                       testID="dateTimePicker"
                       value={date4TO}
                       mode={mode}
                       is24Hour={false}
                       display="default"
                       onChange={onChange4To}
                     />
                   )} 
                   </View> 
                   <View style={styles.actionP}>
                   <Text style={styles.text_footer}>ISF:</Text>
                   <TextInput
                     style={{color:'black'}}
                               keyboardType="decimal-pad"
                               placeholder="000"
                               onChangeText={(val)=>setISF4(val)}
                               style={styles.action}></TextInput>
                   
                   </View>
                   <View style={styles.actionP}>
                   <Text style={styles.text_footer}>
مستوى سكر الدم المرغوب   {'\n'}
التصحيح إليه  </Text>
                    <TextInput
                      style={{color:'black'}}
                               keyboardType="decimal-pad"
                               placeholder="000"
                               onChangeText={(val)=>setbgTarget4(val)}
                               style={styles.action}></TextInput>
                    </View>
                    <View style={styles.actionP}>
                    <Text style={styles.text_footer}>مستوى سكر الدم   {'\n'}
                    لبدء التصحيح</Text>
                    <TextInput
                      style={{color:'black'}}
                               keyboardType="decimal-pad"
                               placeholder="000"
                               onChangeText={(val)=>setbgStart4(val)}
                               style={styles.action}></TextInput>
                    </View> 
                 
                 </View>) : null }
                 {shouldShow4?(<View style={styles.field} >
             <View style= {styles.actionP}>
             <Text style={styles.text_footer}>من</Text>
                     <TouchableOpacity onPress={showTimepicker5F} 
                 >
             <Text testID="dateTimePicker" style={styles.text_footerD} >
                             {moment(date5From).format('h:mm a')}
                             </Text> 
                 </TouchableOpacity>
                   
                   {show5From && (
                     <DateTimePicker
                       testID="dateTimePicker"
                       value={date5From}
                       mode={mode}
                       is24Hour={false}
                       display="default"
                       onChange={onChange5From}
                     />
                   )} 
                       </View>    
                       <View style= {styles.actionP}>
                           <Text style={styles.text_footer}>الى</Text>
                     <TouchableOpacity onPress={showTimepicker5T} 
                 >
             <Text testID="dateTimePicker" style={styles.text_footerD} >
                             {moment(date5TO).format('h:mm a')}
                             </Text> 
                 </TouchableOpacity>
                   
                   {show5TO && (
                     <DateTimePicker
                       testID="dateTimePicker"
                       value={date5TO}
                       mode={mode}
                       is24Hour={false}
                       display="default"
                       onChange={onChange5To}
                     />
                   )} 
                   </View> 
                   <View style={styles.actionP}>
                   <Text style={styles.text_footer}>ISF:</Text>
                   <TextInput
                     style={{color:'black'}}
                               keyboardType="decimal-pad"
                               placeholder="000"
                               onChangeText={(val)=>setISF5(val)}
                               style={styles.action}></TextInput>
                   
                   </View>
                   <View style={styles.actionP}>
                   <Text style={styles.text_footer}>
مستوى سكر الدم المرغوب   {'\n'}
التصحيح إليه  </Text>
                    <TextInput
                      style={{color:'black'}}
                               keyboardType="decimal-pad"
                               placeholder="000"
                               onChangeText={(val)=>setbgTarget5(val)}
                               style={styles.action}></TextInput>
                    </View>
                    <View style={styles.actionP}>
                    <Text style={styles.text_footer}>مستوى سكر الدم   {'\n'}
                    لبدء التصحيح</Text>
                    <TextInput
                      style={{color:'black'}}
                               keyboardType="decimal-pad"
                               placeholder="000"
                               onChangeText={(val)=>setbgStart5(val)}
                               style={styles.action}></TextInput>
                    </View> 
                 
                 </View>): null }
                    {shouldShow5 ? (<View style={styles.field} >
             <View style= {styles.actionP}>
             <Text style={styles.text_footer}>من</Text>
                     <TouchableOpacity onPress={showTimepicker6F} 
                 >
             <Text testID="dateTimePicker" style={styles.text_footerD} >
                             {moment(date6From).format('h:mm a')}
                             </Text> 
                 </TouchableOpacity>
                   
                   {show6From && (
                     <DateTimePicker
                       testID="dateTimePicker"
                       value={date6From}
                       mode={mode}
                       is24Hour={false}
                       display="default"
                       onChange={onChange6From}
                     />
                   )} 
                       </View>    
                       <View style= {styles.actionP}>
                           <Text style={styles.text_footer}>الى</Text>
                     <TouchableOpacity onPress={showTimepicker6T} 
                 >
             <Text testID="dateTimePicker" style={styles.text_footerD} >
                             {moment(date6TO).format('h:mm a')}
                             </Text> 
                 </TouchableOpacity>
                   
                   {show6TO && (
                     <DateTimePicker
                       testID="dateTimePicker"
                       value={date6TO}
                       mode={mode}
                       is24Hour={false}
                       display="default"
                       onChange={onChange6To}
                     />
                   )} 
                   </View> 
                   <View style={styles.actionP}>
                   <Text style={styles.text_footer}>ISF:</Text>
                   <TextInput
                     style={{color:'black'}}
                               keyboardType="decimal-pad"
                               placeholder="000"
                               onChangeText={(val)=>setISF6(val)}
                               style={styles.action}></TextInput>
                   
                   </View>
                   <View style={styles.actionP}>
                   <Text style={styles.text_footer}>
مستوى سكر الدم المرغوب   {'\n'}
التصحيح إليه  </Text>
                    <TextInput
                      style={{color:'black'}}
                               keyboardType="decimal-pad"
                               placeholder="000"
                               onChangeText={(val)=>setbgTarget6(val)}
                               style={styles.action}></TextInput>
                    </View>
                    <View style={styles.actionP}>
                    <Text style={styles.text_footer}>مستوى سكر الدم   {'\n'}
                    لبدء التصحيح</Text>
                    <TextInput
                      style={{color:'black'}}
                               keyboardType="decimal-pad"
                               placeholder="000"
                               onChangeText={(val)=>setbgStart6(val)}
                               style={styles.action}></TextInput>
                    </View> 
                 
                 </View>) : null }
                 

<View>
<View style={styles.buttonV}> 
{checkISFInterval() == true? (<TouchableOpacity onPress={()=>setShouldShowAll()}>
                <LinearGradient
                    colors={['#E7EFFA', '#AABED8']} style={styles.buttonRS}
                >
                    <Text style={styles.titleBS}>+ اضف فترة</Text>
                  
                </LinearGradient>
            </TouchableOpacity>
            ) : null }
        </View>
   </View>
   

          <View style={styles.buttonV}>
        <TouchableOpacity onPress={()=>check()}>
                <LinearGradient
                    colors={['#E7EFFA', '#AABED8', '#AABED8']} style={styles.buttonR}
                >
                    <Text style={styles.titleB}>متابعة</Text>
                  
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

export default isfAR;

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
  
},
actionP: {
  width: 300,
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
}
});