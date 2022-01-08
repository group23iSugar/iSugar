import React, {useState, useEffect } from 'react';
import {  StyleSheet, 
  View,
  Image,
  Text,
  TouchableOpacity,
  Platform, 
  TextInput,
  FlatList,
  Alert,
  ScrollView,
  Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { ActivityIndicator, Colors } from 'react-native-paper';


  const insulinEditAR = ({ navigation, route }) =>{
    useEffect(() => {
        getLocalInfo();
        getOtherInfo();
        getPenInfo();
        }, []);

    const [insulinREGIMEN, setREGIMEN] = useState('');
    const [pen, setPen]= useState([]);
    const [other, setOther] = useState([]);
    const [otherExtra, setOtherExtra] = useState([]);
    const [penExtra, setpenExtra] = useState([]);
    
    
    const getLocalInfo = ()=>{
      if (AccType == 'Pateint Account'){
        try {
          console.log('in try');
          db.transaction( (tx) => {
              tx.executeSql(
                'SELECT UserID, insulinRegimen FROM patientprofile',
                [],
                (tx, results) => {
                  var rows = results.rows;
                  for (let i = 0; i < rows.length; i++) {           
                      var userID = rows.item(i).UserID;
                      if (uID == userID){
                       setREGIMEN(rows.item(i).insulinRegimen);
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
          console.log('in try');
          db.transaction( (tx) => {
              tx.executeSql(
                'SELECT UserID, insulinRegimen FROM nonPatientprofile',
                [],
                (tx, results) => {
                  var rows = results.rows;
                  for (let i = 0; i < rows.length; i++) {           
                      var userID = rows.item(i).UserID;
                      if (uID == userID){
                       setREGIMEN(rows.item(i).insulinRegimen);
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
        
        //==========================================================//
   
      
      
      
    }
    //=========================================//

    const getOtherInfo = ()=>{
      var tempArr = [...other];
        try {
            console.log('in other');
            db.transaction( (tx) => {
                tx.executeSql(
                  'SELECT insulinID, UserID, insulinType, iDose, iTime FROM insulinOther',
                   [],
                  (tx, results) => {
                    var rows = results.rows;
                    for (let i = 0; i < rows.length; i++) {           
                        var userID = rows.item(i).UserID;
                        if (uID == userID){ 
                         tempArr.push({
                           id: rows.item(i).insulinID,
                           type: rows.item(i).insulinType,
                           dose: rows.item(i).iDose,
                           time: new Date(rows.item(i).iTime),
                           isChanged: false,
                           isNew:false
                         });
                         otherExtra.push({
                          id: rows.item(i).insulinID,
                          type: rows.item(i).insulinType,
                          dose: rows.item(i).iDose,
                          time: new Date(rows.item(i).iTime),
                          isChanged: false,
                          isNew:false
                         })
                         }
                      }
                      setOther([...tempArr]);
                  }   
        ) 
            
        
        }  ) 
        } catch (error) {
           console.log(error);
        }
      
    }

    const getPenInfo = () => {
      var tempArr = [...pen];
      try {
        console.log('in pen');
        db.transaction( (tx) => {
            tx.executeSql(
              'SELECT insulinID, UserID, insulinType, halfORfull FROM insulinPen',
              [],
              (tx, results) => {
                var rows = results.rows;
                for (let i = 0; i < rows.length; i++) {           
                    var userID = rows.item(i).UserID;
                    if (uID == userID){
                      tempArr.push({
                        id: rows.item(i).insulinID,
                        type: rows.item(i).insulinType,
                        halfFull: rows.item(i).halfORfull,
                        isChanged: false,
                        isNew: false
                      });
                      penExtra.push({
                        id: rows.item(i).insulinID,
                        type: rows.item(i).insulinType,
                        halfFull: rows.item(i).halfORfull,
                        isChanged: false,
                        isNew: false
                      });
                      
                    }
                  }
                  setPen([...tempArr]);
              }   
    ) 
        
    
    }  ) 
    } catch (error) {
       console.log(error);
    }
    }
    //=========================================//

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  //--------------Date-----------------------
  
  const [flag1, setfalg1] = useState(false);
  const [flag2, setfalg2] = useState(false);
  const [selectedID, setID] = useState(-1);
  const [selectedIndex, setIndexA] = useState(-1);
  
  const onChangeFrom = (event, selectedDate) => { 
    setShow(Platform.OS === 'ios');
    if (flag1==false){
      return;
     }
     console.log(selectedIndex);
    const currentDate = selectedDate || other[selectedIndex].time;
    const newArr = [...other];
    
    if (other[selectedIndex].id == selectedID && flag1==true){
      console.log('I AM HERE');
          setfalg1(false);
          newArr[selectedIndex].time = currentDate;
          newArr[selectedIndex].isChanged = true;
          setOther([...newArr]);
          return;
         }
       
    
  };
  const changeDose= (val, index) =>{
    const newArr = [...other];
    newArr[index].dose = val;
    newArr[index].isChanged = true;
    setOther([...newArr]);
    console.log(other[index].dose);
    }
  const changeFullHalf = (val, index) => {
    const newArr = [...pen];
    newArr[index].halfFull = val;
    newArr[index].isChanged = true;
    setPen([...newArr]);
    console.log(pen[index].halfFull);
  }
  const showModeFrom = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const showTimepickerF = () => {
    showModeFrom('time');
  };
  const combineF = (id, index) => {
    showTimepickerF();
    setID(id); 
    setIndexA(index);
     
  }
//--------------------------
const handleUpdateNormal = () => { // user only changed the values without regimen
  if (other.length > 0){
    for (let i=0; i<other.length; i++){
      if (other[i].isChanged == true && other[i].isNew == false){
        updateOtherLocal(i);
        onlineOtherDB(other[i].type, other[i].dose, other[i].time);
        oldOnlineOtherDB(otherExtra[i].type, otherExtra[i].dose, otherExtra[i].time);
      }
    }
  } 
  if (pen.length > 0){
    for (let i=0; i<pen.length; i++){
      if (pen[i].isChanged == true && pen[i].isNew == false){
        console.log('pen: '+pen[i].type+' / '+pen[i].halfFull);
        console.log('Extra: '+penExtra[i].type+' / '+penExtra[i].halfFull);
        updatePenLocal(i);
        onlinePenDB(pen[i].type, pen[i].halfFull);
        oldOnlinePenDB(penExtra[i].type, penExtra[i].halfFull);
      }
    } 
  }
  alert('تم التحديث');
  navigation.navigate('editProAR');
}
 const updateInsulinR = (val)=> {
   setREGIMEN(val);
   if (AccType == 'Patient Account'){
    try {
      console.log('in regimen');
      db.transaction( (tx) => {
          tx.executeSql(
            'UPDATE patientprofile SET insulinRegimen=? WHERE UserID=? ',
            [val, uID],
            (tx, results) => {
              console.log('Results', results.rowsAffected);
           if (results.rowsAffected > 0) {
           console.log('regimen Updated Succefully');
                }
            }   
  ) 
      
  
  }  ) 
  } catch (error) {
     console.log(error);
  }
   } else {
    try {
      console.log('in regimen');
      db.transaction( (tx) => {
          tx.executeSql(
            'UPDATE nonPatientprofile SET insulinRegimen=? WHERE UserID=? ',
            [val, uID],
            (tx, results) => {
              console.log('Results', results.rowsAffected);
           if (results.rowsAffected > 0) {
           console.log('regimen Updated Succefully');
                }
            }   
  ) 
      
  
  }  ) 
  } catch (error) {
     console.log(error);
  }
   }
  
 }
 const updatePenLocal = (i)=> {
  try {
    console.log('in pen2');
    db.transaction( (tx) => {
        tx.executeSql(
          'UPDATE insulinPen SET halfORfull=? WHERE insulinID=? ',
          [pen[i].halfFull, pen[i].id],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
         if (results.rowsAffected > 0) {
         console.log('pen Updated Succefully');
              }
          }   
) 
    

}  ) 
} catch (error) {
   console.log(error);
}
 }
 const onlineOtherDB = (type, dose, time) => {
  if (AccType == 'Patient Account'){
    var InsertAPIURL = "https://isugarserver.com/insulin_Other.php";   

    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    
    var Data ={
      UserID: onlinUserID,
      insulinType: type,
      iDose: dose,
      iTime: time,
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
const oldOnlineOtherDB = (type, dose, time) => {
  if (AccType == 'Patient Account'){
    var InsertAPIURL = "https://isugarserver.com/updateInsulinOther.php";   //API to  signup

    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    
    var Data ={
      UserID: onlinUserID,
      insulinType: type,
      iDose: dose,
      iTime: time
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
 const deletePenLocal = ()=> {
  try {
    console.log('in pen');
    db.transaction( (tx) => {
        tx.executeSql(
          'DELETE FROM insulinPen WHERE UserID=? ',
          [uID],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
         if (results.rowsAffected > 0) {
         console.log('pen Updated Succefully');
              }
          }   
) 
    var temp = [];
    setPen([...temp]);

}  ) 
} catch (error) {
   console.log(error);
}
 }


 const insertPenLocal = (type, pen) => {
   console.log('in inseer');
  try {
    db.transaction( (tx) => {
        tx.executeSql(
         'INSERT INTO insulinPen (UserID, insulinType, halfORfull) VALUES (?,?,?)',
           [uID, type, pen]
       );
      
      
   })
   
} catch (error) {
   console.log(error);
}
 }
 const insertOtherLocal = (type, dose, time) => {
  console.log('in inserrt');
 try {
   db.transaction( (tx) => {
       tx.executeSql(
        'INSERT INTO insulinOther (UserID, insulinType, iDose, iTime) VALUES (?,?,?,?)',
          [uID, type, dose, time]
      );
     
     
  })
  
} catch (error) {
  console.log(error);
}
}

const updateOtherLocal = (i)=> {
    try {
      console.log('in type');
      db.transaction( (tx) => {
          tx.executeSql(
            'UPDATE insulinOther SET insulinType=?, iDose=?, iTime=?WHERE insulinID=? ',
            [other[i].type, other[i].dose, other[i].time, other[i].id ],
            (tx, results) => {
              console.log('Results', results.rowsAffected);
           if (results.rowsAffected > 0) {
              console.log('other Updated Succefully');
                }
            }   
  ) 
      
  
  }  ) 
  } catch (error) {
     console.log(error);
  }
 }
 const deleteOtherLocal = (id)=> {
  try {
    console.log('in other');
    db.transaction( (tx) => {
        tx.executeSql(
          'DELETE FROM insulinOther WHERE insulinID=? ',
          [id],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
         if (results.rowsAffected > 0) {
         console.log('other deleted Succefully');
              }
          }   
) 
    

}  ) 
} catch (error) {
   console.log(error);
}
 }
 const showConfirmDialog = (val) => {
  return Alert.alert(
    "هل انت متأكد؟",
    "هل انت متأكد من هذا التغيير؟ ستمحى بعض بياناتك",
    [
      // The "Yes" button
      {
        text: "نعم",
        onPress: () => {
          if (insulinREGIMEN=='Pen'){
            updateInsulinR(val); // 
            onlineInsulinRegDB();
            deletePenLocal();
            deleteOnlinePenDB;
          }
          updateInsulinR(val); // 
          onlineInsulinRegDB();
        },
      },
      // The "No" button
      // Does nothing but dismiss the dialog when tapped
      {
        text: "لا",
      },
    ]
  );
};
const onlineInsulinRegDB = () => {
  if (AccType == 'Patient Account'){
    var InsertAPIURL = "https://isugarserver.com/insulin_Regimen.php";   //API to  signup

    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    
    var Data ={
      UserID: onlinUserID,
      insulinRegimen: insulinREGIMEN
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
const onlinePenDB = (type, halfull) => {
  if (AccType == 'Patient Account'){
    var InsertAPIURL = "https://isugarserver.com/insulin_Pen.php";   //API to  signup

    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    
    var Data ={
      UserID: onlinUserID,
      insulinType: type,
      halfOrFull: halfull
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
const oldOnlinePenDB = (type, halfull) => {
  if (AccType == 'Patient Account'){
    var InsertAPIURL = "https://isugarserver.com/insulinPenUpdate.php";   //API to  signup

    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    
    var Data ={
      UserID: onlinUserID,
      insulinType: type,
      halfOrFull: halfull
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
      <Text style={styles.title}>تعديل معلومات الانسولين</Text> 
      <ScrollView>
      <View style={styles.action}>
              <Text style={styles.text_footer}>كيفية أخذ الأنسولين </Text>
              <Picker
              selectedValue={insulinREGIMEN+''}
              onValueChange={(val) => showConfirmDialog(val)}
              mode="dropdown"
              style={styles.picker}
              >
            <Picker.Item label= 'اختر' value='0'></Picker.Item>
            <Picker.Item label= 'مضخة أنسولين' value='Pump'></Picker.Item>
            <Picker.Item label= 'قلم الانسولين' value='Pen'></Picker.Item>
            <Picker.Item label= 'زجاجة الأنسولين/ والإبر' value='Vials/Syringe'></Picker.Item>

        </Picker>
      
</View>
      {pen.length > 0 || other.length > 0 ? null : (<ActivityIndicator animating={true} color={Colors.blue100} size={'large'} />)}
     <View style={{ alignItems: 'center'}}>
        <FlatList 
        nestedScrollEnabled={true}
          data={pen}
          keyExtractor={(item, index) => index.toString()}
          // extraData={selectedID}
          renderItem={({ item, index }) => (
            <View style={styles.outerContainer}>
                <Text style={styles.innerTitle}>نوع الأنسولين</Text>
                <View style={styles.innerCotainer}>
             <Text 
             style={{fontSize: 17, color: 'grey', alignItems: 'flex-start'}} >
                             {item.type}
                             </Text> 
          
                             </View>
                  <Text style={styles.innerTitle}>قلم الأنسولين يعطي</Text>
                <View style={styles.innerCotainer}>
              <Picker
              selectedValue={item.halfFull+''}
              onValueChange={(val) => changeFullHalf(val, index)}
              mode="dropdown"
              style={styles.picker}
              >
            <Picker.Item label= 'نصف وحدة' value='0'></Picker.Item>
            <Picker.Item label= 'وحدة كاملة' value='1'></Picker.Item>
           

        </Picker>
          
                             </View>   
                 </View>
           
          )}
        />
        </View>
       <View style={{alignItems:'center'}}>
        <FlatList
        data={other}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.outerContainer}>
             <Text style={styles.innerTitle}>نوع الأنسولين </Text>
                <View style={styles.innerCotainer}>
             <Text 
             style={{fontSize: 17, color: 'grey', alignItems: 'flex-start'}} >
                             {item.type}
                             </Text> 
          
                             </View>
                             <View style={styles.innerCotainer}>
                    <View style={styles.innerView}>
                    <Text style={styles.innerTitle}>جرعة الأنسولين</Text>
                    <TextInput
                    style={{borderColor: 'grey', borderBottomWidth: 1,paddingBottom: 0, paddingTop:0}}
                     keyboardType="decimal-pad"
                     defaultValue={item.dose+''}
                     onChangeText={(val) => changeDose(val, index)}
                    />
                    </View>
                    </View>
             <Text style={styles.innerTitle}>الوقت</Text>
              <TouchableOpacity onPress={()=> combineF(item.id, index)} 
              onPressOut={()=>setfalg1(true)}
              style={styles.innerCotainer}
               >
           <Text testID="dateTimePicker"
           style={{fontSize: 17, color: 'grey', alignItems: 'flex-start'}} >
                           {moment(item.time).format('h:mm a')}
                           </Text> 
        
               </TouchableOpacity>
                 
                 {show && (
                   <DateTimePicker
                     testID="dateTimePicker"
                     value={item.time}
                     mode={mode}
                     is24Hour={false}
                     display="default"
                     onChange={(e, v) => {
                      setShow(Platform.OS === "ios");
                      onChangeFrom(e, v);
                    }}
                     
                   />
                 )}
                   
                  
          </View>
        )}

        />
      </View>
   

          <View style={styles.buttonV}>
        <TouchableOpacity onPress={()=>handleUpdateNormal()}>
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

export default insulinEditAR;

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
    height: height_logo+20,

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
    height: 200,
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
  color: 'grey'
    
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
});


