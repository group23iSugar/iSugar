import React, { useEffect, useState } from 'react';
import {  StyleSheet, 
  View,
  Image,
  SafeAreaView, 
  Text,
  TouchableOpacity,
  Button,
  Platform, 
  TextInput,
  ScrollView,
  Dimensions} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';


  const clinicInfoAR = ({ navigation }) =>{
    useEffect(() => {
        getLocalInfo();
        getLocalInfo2();
        }, []);
        const [dbData, setDbData] = useState({
            diagnosisdate:'',
            diabetescenter: '',
            centername: '',
            centercity: ''
        });
        const [dbData2, setDbData2] = useState({
          uMRN: '',
          idk: ''
      });
        const getLocalInfo = ()=>{
          try {
              console.log('in try');
              db.transaction( (tx) => {
                  tx.executeSql(
                    'SELECT UserID, diagnosis_date, diabetes_center, center_name, center_city FROM patientprofile',
                    [],
                    (tx, results) => {
                      var rows = results.rows;
                      for (let i = 0; i < rows.length; i++) {           
                          var userID = rows.item(i).UserID;
                          if (uID == userID){
                              setDbData({
                                  ...dbData,
                                  diagnosisdate: rows.item(i).diagnosis_date,
                                  diabetescenter: rows.item(i).diabetes_center,
                                  centername: rows.item(i).center_name,
                                  centercity: rows.item(i).center_city,
                              });
                              console.log( dbData.diagnosisdate +'-'+dbData.diabetescenter);
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
      ;
    const getLocalInfo2 = () => {
      console.log('in ksumc');

        try {
          console.log('in ksumc2');
          db.transaction( (tx) => {
              tx.executeSql(
                'SELECT UserID, MRN FROM KSUMC',
                [],
                (tx, results) => {
                  var rows = results.rows;
                  for (let i = 0; i < rows.length; i++) {           
                      var userID = rows.item(i).UserID;
                      if (uID == userID){
                          setDbData2({
                              ...dbData2,
                              uMRN: rows.item(i).MRN
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
     
    var d = moment(dbData.diagnosisdate).format('YYYY-MM-DD'); // 2021-11-21
    
    const [date, setDate] = useState(new Date());
    var dateO = new Date(d);
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
   
    //===================================//
    const  flagFun = (dateString)=>{ 
      var today = new Date();
      var current = new Date(dateString);
      var sameYear = today.getFullYear() - current.getFullYear();
      var sameMonth = today.getMonth() - current.getMonth();
      var dameDay = today.getDay() - current.getDay();
      if (sameYear == 0 && sameMonth == 0 && dameDay == 0) {
          return true;
      } else {
        return false;
      }
      
  }
        
  
  var dateOfDiagnosis = moment.utc(date).format('YYYY-MM-DD');
  const [center, setCenter] = useState('0');
const [mrn, setMRN] = useState('00000000');
  const [other, setOther] = useState({
    centerCity : '',
    centerName : ''
    
  });

 
 
DOD = dateOfDiagnosis;
Diabetescenter = center;

  var isValidName= true;
  var isValidCity = true;

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('Year');
  };
   
  const cNameCheck = (val) => {
    if (val.trim().length > 2 ){
      setOther({
        ...other,
        centerName: val,
        isValidName: true
      })
      
    } else {
      isValidName= false;
  }
}

const cCityCheck = (val) => {
  if (val.trim().length > 2){
    setOther({
      ...other,
      centerCity: val,
      isValidCity: true
    })
   
  } else {
    isValidCity= false;
}
}


centCity =  other.centerCity;
centName= other.centerName;
const check = () => {
  if (center=='0' && dbData.diabetescenter == '1'){
    setCenter('1');
  }else if (center=='0' && dbData.diabetescenter == '2'){
    setCenter('2');
  }
  if (center == '2' && dbData.diabetescenter == '2'){ // if user only updated the name/city 
    if (isValidName == true && isValidCity == true){
      if (other.centerName != dbData.centername){
        onlineDBOther();
        updateCenterNameLocal();
      }
      if (other.centerCity != dbData.centercity){
        updateCenterCityLocal();
        onlineDBOther();
      }

    }
  }
  if (center == '2' && dbData.diabetescenter != '2' ){ // if the user choose KSUMC in register and changed to other
    deleteMRNLocal();
    deleteOnlineDB();
    if (isValidName == true && isValidCity == true){
      onlineDBOther();
      updateCenterNameLocal();
      updateCenterCityLocal();
      updateCenterLocal();
    }
  }
  if (center == '1' && dbData.diabetescenter != '1'){ // if the user choose other in register and changed to KSUMC
      if (mrn == '00000000'){
        alert('من فضلك قم بإدخال كل المخلات');
      } else {
        onlineDBKSUMC();
        deleteNameCityLocal();
        deleteOTHEROnlineDB();
        updateCenterLocal();
        try {
          db.transaction( (tx) => {
              tx.executeSql(
               'INSERT INTO KSUMC (UserID, MRN) VALUES (?,?)',
                 [uID, mrn]
             );
            
             
         })
         
     } catch (error) {
         console.log(error);
     }
    
      }
    return;
  } else if (center == '1' && dbData.diabetescenter == '1'){
    if (mrn!=dbData2.uMRN){
      updateMRNLocal();
      onlineDBKSUMC();
    }

  }
  if (flagFun(date) == false){
    updateDODLocal();
    onlineDBDOD();
  }
  alert('تم التحديث');
  navigation.navigate('editProAR');
}
const updateMRNLocal = () => {
  try {
    console.log('in try2');
    db.transaction( (tx) => {
        tx.executeSql(
          'UPDATE KSUMC SET MRN=? WHERE UserID=? ',
          [mrn, uID],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
         if (results.rowsAffected > 0) {
         console.log('record updated seuccefully');
         console.log(center);
              }
          }    
) 
    

}  ) 
} catch (error) {
   console.log(error);
}
}
const updateCenterNameLocal = () => {
  try {
    console.log('in try3');
    db.transaction( (tx) => {
        tx.executeSql(
          'UPDATE patientprofile SET center_name=? WHERE UserID=? ',
          [other.centerName, uID],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
         if (results.rowsAffected > 0) {
         console.log('record updated seuccefully');
         console.log(other.centerName);
              }
          }   
) 
    

}  ) 
} catch (error) {
   console.log(error);
}
}

const updateCenterCityLocal = () => {
  try {
    console.log('in try3');
    db.transaction( (tx) => {
        tx.executeSql(
          'UPDATE patientprofile SET center_city=? WHERE UserID=? ',
          [other.centerCity, uID],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
         if (results.rowsAffected > 0) {
         console.log('record updated seuccefully');
         console.log(other.centerCity);
              }
          }   
) 

}  ) 
} catch (error) {
   console.log(error);
}
}

const updateCenterLocal = () => {
  try {
    console.log('in try3');
    db.transaction( (tx) => {
        tx.executeSql(
          'UPDATE patientprofile SET diabetes_center=? WHERE UserID=? ',
          [center, uID],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
         if (results.rowsAffected > 0) {
         console.log('record updated seuccefully');
         console.log(center);
              }
          }   
) 
    

}  ) 
} catch (error) {
   console.log(error);
}
}

const deleteMRNLocal = () => {
  try {
    console.log('in try2');
    db.transaction( (tx) => {
        tx.executeSql(
          'DELETE FROM KSUMC WHERE UserID=? ',
          [uID],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
         if (results.rowsAffected > 0) {
         console.log('record updated seuccefully');
         console.log(center);
              }
          }   
) 
    

}  ) 
} catch (error) {
   console.log(error);
}
}
const deleteNameCityLocal = () => {
  try {
    console.log('in try2');
    db.transaction( (tx) => {
        tx.executeSql(
          'UPDATE patientprofile SET center_city=? WHERE UserID=? ',
          ['', uID],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
         if (results.rowsAffected > 0) {
         console.log('record updated seuccefully');
         console.log(center);
              }
          }   
) 
    

}  ) 
} catch (error) {
   console.log(error);
}
try {
  console.log('in try2');
  db.transaction( (tx) => {
      tx.executeSql(
        'UPDATE patientprofile SET center_name=? WHERE UserID=? ',
        ['', uID],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
       if (results.rowsAffected > 0) {
       console.log('record updated seuccefully');
       console.log(center);
            }
        }   
) 
  

}  ) 
} catch (error) {
 console.log(error);
}
}
const updateDODLocal = () => {
  try {
    console.log('in dod');
    db.transaction( (tx) => {
        tx.executeSql(
          'UPDATE patientprofile SET diagnosis_date=? WHERE UserID=? ',
          [dateOfDiagnosis, uID],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
         if (results.rowsAffected > 0) {
         console.log('dod updated seuccefully');
              }
          }   
) 
    

}  ) 
} catch (error) {
   console.log(error);
}
}
const deleteOnlineDB = () =>{
  var InsertAPIURL = "https://isugarserver.com/updateClinic.php";  
  
  var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  
  var Data ={
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
  })
  .catch((error)=>{
    alert("Error Occured" + error);
  })
  }
  const deleteOTHEROnlineDB = () =>{
    var InsertAPIURL = "https://isugarserver.com/deleteOther.php";  
    
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    
    var Data ={
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
    })
    .catch((error)=>{
      alert("Error Occured" + error);
    })
    }
  const onlineDBOther = () => {
    console.log('other');
    var InsertAPIURL3 = "https://isugarserver.com/CenterInformation.php";   //API to  signup

    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
     var Data ={
      UserID: onlinUserID,
      nameC: other.centerName,
      city: other.centerCity
    };
  
  // FETCH func ------------------------------------
  fetch(InsertAPIURL3,{
        method:'POST',
      headers:headers,
      body: JSON.stringify(Data) //convert data to JSON
  })
  .then((response)=>response.json()) //check response type of API (CHECK OUTPUT OF DATA IS IN JSON)
  .then((response)=>{      // If data is in JSON => Display alert msg
  })
  .catch((error)=>{
      alert("Error Occured" + error);
  })
  }
  const onlineDBKSUMC = () => {

    var InsertAPIURL2 = "https://isugarserver.com/KSUMC.php";   //API to  signup

    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
     var Data ={
      UserID: onlinUserID,
      MRN: mrn
    };
  
  // FETCH func ------------------------------------
  fetch(InsertAPIURL2,{
        method:'POST',
      headers:headers,
      body: JSON.stringify(Data) //convert data to JSON
  })
  .then((response)=>response.json()) //check response type of API (CHECK OUTPUT OF DATA IS IN JSON)
  .then((response)=>{      // If data is in JSON => Display alert msg
  })
  .catch((error)=>{
      alert("Error Occured" + error);
  })
 
  }
  const onlineDBDOD = () => {
    var InsertAPIURL = "https://isugarserver.com/diagnosis_date.php";   
 
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    var Data ={
     UserID: onlinUserID,
     diagnosisD: dateOfDiagnosis 
    }; 
 
 
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
      <Text style={styles.title}>تعديل معلومات العيادة{'\n'}</Text>
      <ScrollView>
        
        {dbData.diabetescenter=='1' ? ( <View style={styles.action}>
          
              <Text style={styles.text_footer}>مركز/عيادة السكري </Text>
              <Picker
              
              selectedValue={center}
              onLayout = {() => setCenter('1')}
              onValueChange={(value) => setCenter(value)}
              mode="dropdown"
              style={styles.picker}
              >
              
            <Picker.Item label= 'المدينة الطبية بجامعة الملك سعود' value='1'></Picker.Item>
            <Picker.Item label= 'آخرى' value='2'></Picker.Item>

        </Picker>
      
</View>) : 
( <View style={styles.action}>
  <Text style={styles.text_footer}>مركز/عيادة السكري </Text>
  <Picker
  
  selectedValue={center}
  onValueChange={(value) => setCenter(value)}
  mode="dropdown"
  style={styles.picker}
  >
  

  <Picker.Item label= 'آخرى' value='2'></Picker.Item>
  <Picker.Item label= 'المدينة الطبية بجامعة الملك سعود' value='1'></Picker.Item>
</Picker>

</View>)}
         

{(dbData.diabetescenter=='2' || (center== '2') ) && center != '1'? 
<View>
<Text style={styles.text_footer}>اسم عيادة السكري</Text>

<View style={styles.actionN}>

    <TextInput 
    style={styles.textInput}
    defaultValue={dbData.centername}
    autoCapitalize="none"
    onChangeText={(val) => cNameCheck(val)}
    />
     </View>
    <Text style={styles.text_footer}>مدينة عيادة السكري</Text>
    <View style={styles.actionN}>
    <TextInput 
    style={styles.textInput}
    defaultValue={dbData.centercity}
    autoCapitalize="none"
    onChangeText={(val) => cCityCheck(val)}
    />
   </View>
    </View>
:
null
    }
  { (dbData.diabetescenter=='1' || (center== '1')) && center != '2'? <View>
<Text style={styles.text_footer}>رقم الملف الطبي </Text>

<View style={styles.actionN}>

    <TextInput 
    style={styles.textInput}
    keyboardType="decimal-pad"
    defaultValue={dbData2.uMRN}
    autoCapitalize="none"
    onChangeText={(val) => setMRN(val)}
    />
     </View>
     </View> : null }

      
<View style={styles.action}>
<Text style={styles.text_footer}>تاريخ التشخيص</Text>
<View style={styles.dateB}>
        <TouchableOpacity onPress={showDatepicker} style={styles.dateB} >
        <MaterialIcons name="date-range" size={30} color="#8CA1BB"  />
        <Text testID="dateText" style={styles.text_footerD} >
          {flagFun(date) ? moment.utc(dateO).format('YYYY-MM-DD') : 
           moment.utc(date).format('YYYY-MM-DD')}
                
                </Text>
                
                
              
       

        </TouchableOpacity>
        
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          display="default"
          onChange={onChange}
        />
      )}
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

export default clinicInfoAR;

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
   flexDirection: 'row',
    width: 200,
    height: 40,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#CACDD1',
    marginTop: 15,

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
  flex: 0,
  flexDirection: 'row',
  alignItems: 'center',
  flexWrap: 'wrap',
  marginTop: 10,
  paddingBottom: 25,
  
},
actionN: {
  flexDirection: 'row',
  marginTop: 10,
  marginBottom: 15,
  borderRightWidth: 1,
  borderBottomWidth: 1,
  borderColor: '#CACDD1',
  paddingBottom: 5,
  
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
  flex: 0,
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
  marginTop: 10,
  paddingBottom: 15,

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
textD:{
justifyContent: 'space-between',
marginTop: 25
}
});


