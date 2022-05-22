/* eslint-disable prettier/prettier */
/* eslint-disable eslint-comments/no-unused-disable */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable react/self-closing-comp */
/* eslint-disable space-infix-ops */
/* eslint-disable no-alert */
/* eslint-disable jsx-quotes */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
/* eslint-disable no-dupe-keys */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
/* eslint-disable no-trailing-spaces */
import React, {useEffect, useState} from 'react';
import { StyleSheet, 
    View,
    Image, 
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity, 
    Dimensions } from 'react-native'; 
    import LinearGradient from 'react-native-linear-gradient';
    
import {Picker} from '@react-native-picker/picker';
import { FlatList } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ActivityIndicator, Colors } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

  const isf = ({ navigation, route }) =>{
   
     //=======ISF Vars======//
     const [isfInterval, setISF] = useState('0');
     const [ISF, setISFM] = useState(0);
     const [targetBG, setTargetBG] = useState(0);
     const [startBG, setStartBG] = useState(0);
     const [ISFList, setISFList]= useState([{id: 0, from: new Date().setHours(6), to: new Date().setHours(12), isf: -1, start: -1, target: -1, flagF: true},
      {id: 0, from: new Date().setHours(12), to: new Date().setHours(17), isf: -1, start: -1, target: -1, flagF: true}, 
      {id: 0, from: new Date().setHours(17), to: new Date().setHours(23), isf: -1, start: -1, target: -1, flagF: true}]);
     const [isfCount, setISFCount] = useState(0);
     //======================//
     const [showTo, setShowTo] = useState(false);
    const [mode, setMode] = useState('date');
    const [showFrom, setShowFrom] = useState(false);
    const [selectedID, setID] = useState(-1);
    const [flag1, setfalg1] = useState(false);
    const [flag2, setfalg2] = useState(false);
 
//---------------------------------
const addISF = ()=> {
  setISFCount(isfCount+1);
  var obj = {id: isfCount+1, from: new Date(), to: new Date(), isf: -1, start: -1, target: -1, flagF: false};
  ISFList.push(obj);
  ISFList[isfCount+1].flagF = true;
  }
  const changeISF = (val, index) =>{
    const newArr = [...ISFList];
    newArr[index].isf = val;
    setISFList([...newArr]);
    console.log(ISFList[index].isf+ ' ISF');
    }

  const changeStart = (val, index) =>{
      const newArr = [...ISFList];
      newArr[index].start = val;
      setISFList([...newArr]);
      console.log(ISFList[index].start+ ' START');
      }
  const changeTarget = (val, index) =>{
        const newArr = [...ISFList];
        newArr[index].target = val;
        setISFList([...newArr]);
        console.log(ISFList[index].target+ ' TARGET');
        }

        const onChangeFromF = (event, selectedDate) => { 
          setShowFrom(Platform.OS === 'ios');
          if (flag1==false){
            return;
           }
          const currentDate = selectedDate || ISFList[isfCount].from;
          const newArr = [...ISFList];
          
          if (ISFList[isfCount].id == selectedID && flag1==true){
                setfalg1(false);
                newArr[isfCount].from = currentDate;
                setISFList([...newArr]);
                return;
               }
             
          
        };

        const onChangeToF = (event, selectedDate) => { 
          setShowTo(Platform.OS === 'ios');
          if (flag2==false){
            return;
           }
          const currentDate = selectedDate || ISFList[isfCount].to;
          const newArr = [...ISFList];
          
          if (ISFList[isfCount].id == selectedID && flag2==true){
                setfalg2(false);
                newArr[isfCount].to = currentDate;
                setISFList([...newArr]);
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

//--------------------------- DB
const localISFInterval = () => {
  console.log('123')
  if (isfInterval =='1'){
    for (let i=0; i<ISFList.length; i++){
      if (ISFList[i].flagF){
        try {
          db.transaction( (tx) => {
              tx.executeSql(
               'INSERT INTO isfInterval (UserID, fromTime, toTime, ISF, targetBG_correct, startBG_correct)' 
               +'VALUES (?,?,?,?,?,?)',
                 [1, ISFList[i].from, ISFList[i].to, ISFList[i].isf, ISFList[i].target, ISFList[i].start ]
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
            fromTime: ISFList[i].from.toString(),
            toTime: ISFList[i].to.toString(),
            ISF: ISFList[i].isf,
            targetBG: ISFList[i].target,
            startBG: ISFList[i].start,
            
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
           // alert('Error Occured' + error);
        })
        }
      }
        
      
    }
    
  } else if (isfInterval =='0') {
    InsulinSF = ISF;
    bgTarget = targetBG;
    bgStart= startBG;
    intervalISF =isfInterval;
    //===== onlineDB
    onlineISFDB();
    onlineTbgDB();
    onlineSbgDB();

  }
  navigation.navigate('icrAR');
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
     // alert('Error Occured' + error);
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
     // alert('Error Occured' + error);
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
     // alert('Error Occured' + error);
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
        {AccType == 'Patient Account' ? <Text style={styles.title}>خطوة 6 من 7: معامل حساسية الإنسولين {'\n'}</Text>
        : <Text style={styles.title}>Step 5 of 6: Insulin Sensitivity Factor {'\n'}</Text> }
      
         
<ScrollView>
<View style={styles.innerCotainerISF}>
        <Text style = {styles.textBody}>معامل حساسية الإنسولين (ISF):</Text>
        <Text style={styles.textHeader}>وقت التصحيح:</Text>
        <Picker
              itemStyle={{color: '#000'}}
              selectedValue={isfInterval}
              onValueChange={(value) => setISF(value)}
              mode="dropdown"
              style={styles.picker}
              >
            <Picker.Item label= 'All day' value='0'></Picker.Item>
            <Picker.Item label= 'Specific hours' value='1'></Picker.Item>

        </Picker>
        {isfInterval=='0' ? (<View>
          <View style = {{flexDirection: 'row'}}>
          <Text style={styles.textHeader}>معامل حساسية الإنسولين:</Text>
          <TextInput
             keyboardType="decimal-pad"
             placeholder="000"
             onChangeText={(val)=>setISFM(val)}
             style={styles.textInput}></TextInput>
          </View>
          <View style = {{flexDirection: 'row'}}>
          <Text style={styles.textHeader}>الهدف: </Text>
          <TextInput
            keyboardType="decimal-pad"
            placeholder="000"
            onChangeText={(val)=>setTargetBG(val)}
            style={styles.textInput}></TextInput>
          </View>
          <View >
          <Text style={styles.textHeader}>التصحيح  إذا كان سكر الدم أكبر من::{'\n'} </Text>
          <TextInput
            keyboardType="decimal-pad"
            placeholder="000"
            onChangeText={(val)=>setStartBG(val)}
            style={styles.textInput}></TextInput>
          </View> 
        </View>):
         (<View>
        <View style={{alignItems:'center'}}>
        <FlatList
        data={ISFList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View>
             <Text style={styles.innerTitle}>من</Text>
              <TouchableOpacity onPress={()=> combineF(item.id)} 
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
                      onChangeFromF(e, v);
                    }}
                     
                   />
                 )}
                   <Text style={styles.innerTitle}>إلى</Text>
                   <TouchableOpacity onPress={()=> combineT(item.id)} 
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
                        onChangeToF(e, v);
                      }}
                     />
                   )} 
                    <View style={styles.innerCotainer}>
                    <View style={styles.innerView}>
                    <Text style={styles.innerTitle}>معامل حساسيةالانسولين: </Text>
                    <TextInput
                    style={{borderColor: 'grey', borderBottomWidth: 1,paddingBottom: 0, paddingTop:0, color: 'grey'}}
                     keyboardType="decimal-pad"
                     placeholder="000"
                     onChangeText={(val) => changeISF(val, index)}
                    />
                    </View>
                    <View style={styles.innerView}>
                    <Text style={styles.innerTitle}>الهدف: </Text>
                    <TextInput
                    style={{borderColor: 'grey', borderBottomWidth: 1,paddingBottom: 0, paddingTop:0, color: 'grey'}}
                     keyboardType="decimal-pad"
                     placeholder="000"
                     onChangeText={(val) => changeTarget(val, index)}
                    />
                    </View>
                    <View style={styles.innerView}>
                    <Text style={styles.innerTitle}>البداية: </Text>
                    <TextInput
                    style={{borderColor: 'grey', borderBottomWidth: 1,paddingBottom: 0, paddingTop:0, color: 'grey'}}
                     keyboardType="decimal-pad"
                     placeholder="000"
                     onChangeText={(val) => changeStart(val, index)}
                    />
                    </View>
                    </View>
                    <Text style={{textAlign: 'center'}}>----------------------------------------</Text>
          </View>
        )}

        />
        <TouchableOpacity onPress={()=>addISF()}><Text style={styles.textHeader}>اضافة فترة</Text></TouchableOpacity>
       
      </View>
        </View>)}
        </View>
        <View style={styles.buttonV}>
        <TouchableOpacity onPress={()=>localISFInterval()}>
                <LinearGradient
                    colors={['#E7EFFA', '#AABED8', '#AABED8']} style={styles.buttonR}
                >
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>الإنتهاء</Text>
                  
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

export default isf;

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
  color: 'grey'
    
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
  color: 'grey'
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
body: {
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 50,
  marginBottom: 20,

},
outer: {
  width: 275,
  height: 110,
  marginTop: 15,
  marginBottom: 20,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 15,
  flexDirection: 'row',
  shadowColor: "#000",
  shadowOffset: {
width: 0,
height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
},
textHeader:{
 fontSize: 18,
 paddingBottom: 15,
 paddingTop: 15,
 color: '#05375a', 
 textAlign: 'left',
 paddingLeft: 10,
 paddingRight: 10
},
textAlert:{
fontSize: 17,
color: 'red', 
fontWeight: 'bold',
textAlign: 'center',
paddingLeft: 10,
paddingRight: 10
},
textBody:{
  fontSize: 20,
  marginBottom: 15,
  paddingBottom: 15,
  color: '#05375a', 
  textAlign: 'left',
  fontWeight: 'bold',
}, 
textInput: {
width: 50,
height: 45,
marginLeft: 5,
marginRight: 5,
borderRightWidth: 1,
borderBottomWidth: 1,
borderColor: '#CACDD1',
color: '#000'
},
textInputISF: {
width: 60,
height: 45,
marginLeft: 35,
marginRight: 5,
borderRightWidth: 1,
borderBottomWidth: 1,
borderColor: '#CACDD1',
color: '#000'
},
innerCotainer: {
backgroundColor: 'white', margin: 10, alignItems: 'center',  borderRadius: 15, padding: 10, width: 310,
            shadowColor: "#000",
            shadowOffset: {
            width: 0,
            height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
},
innerCotainerISF: {
backgroundColor: 'white', margin: 10,  borderRadius: 15, padding: 10, width: 360,
            shadowColor: "#000",
            shadowOffset: {
            width: 0,
            height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
},
innerCotainer2: {
backgroundColor: 'white', margin: 10, alignItems: 'center',  borderRadius: 15, padding: 10, width: 360,
flexDirection: 'row',
            shadowColor: "#000",
            shadowOffset: {
            width: 0,
            height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
},
buttonV: {
marginTop: 60,
alignItems: 'center',

},
innerView: {
  flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, marginTop: 10,
}, 
container: {
flex: 1,
backgroundColor: '#EEF0F2',
},
header: {
justifyContent: 'center',
alignItems: 'center'
},
body: {
justifyContent: 'center',
alignItems: 'center',
marginTop: 50,
marginBottom: 20,

},
inner: {
width: 250,
height: 110,
justifyContent: 'center',
alignItems: 'center',
flexDirection: 'row',
backgroundColor: 'white'

},
textBody:{
fontSize: 17,
color: '#05375a', 
textAlign: 'center',
fontWeight: 'bold',
marginTop: 5,
paddingTop: 15
},
ddown: {
//drop down list style


marginTop: 20,
shadowColor: '#000',
alignSelf: 'center',
width: 300,


alignItems: 'center',
shadowOffset: {
  width: 0,
  height: 1,
},
shadowOpacity: 0.33,
shadowRadius: 0.62,

elevation: 7,
backgroundColor: '#f5f5f5',
},
ddown2: {
//drop down list style


marginTop: 20,
marginLeft: 10,
shadowColor: '#000',

width: 100,
fontSize: 5,

shadowOffset: {
  width: 0,
  height: 1,
},
shadowOpacity: 0.33,
shadowRadius: 0.62,

elevation: 7,
backgroundColor: '#f5f5f5',
},
ddown3: {
//drop down list style


marginTop: 20,
marginLeft: 10,
shadowColor: '#000',

width: 130,
fontSize: 5,

shadowOffset: {
  width: 0,
  height: 1,
},
shadowOpacity: 0.33,
shadowRadius: 0.62,

elevation: 7,
backgroundColor: '#f5f5f5',
},
inpTxt: {
//lables
paddingLeft: 20,
paddingTop: 15,
fontSize: 18,
},
picker: {
color: 'grey',
width: 300
}

});
