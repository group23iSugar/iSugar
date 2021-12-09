<<<<<<< HEAD
import React, { useCallback, useState } from 'react';
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


  const clinicInfoARE = ({ navigation }) =>{
    
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
  
  
  var dateOfDiagnosis = moment.utc(date).format('YYYY-MM-DD');
  const [center, setCenter] = useState('0');
  
  const [mrn, setMRN] = useState('0');
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
  if (center == '0'){
    alert('من فضلك قم باختيار مركز صحي');
    return;
  }
  if (center == '2'){
    if (isValidName == true && isValidCity == true){
      onlineDBOther();
      onlineDB();
    } else {
      alert('من فضلك قم بتعبئة كل المدخلات');
    }
    return;
  }
  if (center == '1'){
      if (mrn == '0'){
        alert('من فضلك قم بتعبئة كل المدخلات');
      } else {
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
        
          onlineDBKSUMC();
          onlineDB();
      
        
      }
    return;
  }
  
}

 
const onlineDB = () => {
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
 .then((response)=>{       // If data is in JSON => Display alert msg
   navigation.navigate('personalAR');
 })
 .catch((error)=>{
     alert("Error Occured" + error);
 })
 }

 //OnlineDB if user choose KSUMC 
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

//OnlineDB if user choose Other 
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
  .then((response)=>{       // If data is in JSON => Display alert msg
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
      <Text style={styles.title}>الخطوة 2 من 7: معلومات العيادة {'\n'}</Text>
      <ScrollView>
          <View style={styles.action}>
          <Text style={styles.text_footer}>مركز/عيادة السكري </Text>
              <Picker
              selectedValue={center}
              onValueChange={(value) => setCenter(value)}
              mode="dropdown"
              style={styles.picker}
              >
            <Picker.Item label= 'اختر عيادة' value='0' color='black'></Picker.Item>
            <Picker.Item label= 'المدينة الطبية بجامعة الملك سعود' value='1' color='black'></Picker.Item>
            <Picker.Item label= 'آخرى' value='2' color='black'></Picker.Item>

        </Picker>
      
</View>

{center== '2'? 
<View>
<Text style={styles.text_footer}>اسم عيادة السكري</Text>

<View style={styles.actionN}>

    <TextInput 
    style={styles.textInput}
    placeholder ='الاسم'
    autoCapitalize="none"
    onChangeText={(val) => cNameCheck(val)}
    />
     </View>
     <Text style={styles.text_footer}>مدينة عيادة السكري</Text>
    <View style={styles.actionN}>
    <TextInput 
    style={styles.textInput}
    placeholder ='المدينة'
    autoCapitalize="none"
    onChangeText={(val) => cCityCheck(val)}
    />
   </View>
    </View>
:
null
    }
        {center== '1'? 
      
      <View style={styles.actionB}>
      <Text style={styles.text_footer}>رقم الملف الطبي </Text>
      <View style={styles.actionP}>
      <TextInput 
    style={styles.textInput}
    keyboardType="decimal-pad"
    autoCapitalize="none"
    onChangeText={(val) => setMRN(val)}
    />
</View>
</View>
      : null
      }
      
<View style={styles.action}>
<Text style={styles.text_footer}>تاريخ التشخيص</Text>
<View style={styles.dateB}>
        <TouchableOpacity onPress={showDatepicker} style={styles.dateB} >
        <MaterialIcons name="date-range" size={30} color="#8CA1BB"  />
        <Text testID="dateText" style={styles.text_footerD} >
                {moment.utc(date).format('DD/MM/YYYY')}
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
<Text>{onlinUserID}</Text>

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

export default clinicInfoARE;

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


=======
import React, { useCallback, useState } from 'react';
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


  const clinicInfoARE = ({ navigation }) =>{
    
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
  
  
  var dateOfDiagnosis = moment.utc(date).format('YYYY-MM-DD');
  const [center, setCenter] = useState('0');
  
  const [mrn, setMRN] = useState('0');
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
  if (center == '0'){
    alert('من فضلك قم باختيار مركز صحي');
    return;
  }
  if (center == '2'){
    if (isValidName == true && isValidCity == true){
      onlineDBOther();
      onlineDB();
    } else {
      alert('من فضلك قم بتعبئة كل المدخلات');
    }
    return;
  }
  if (center == '1'){
      if (mrn == '0'){
        alert('من فضلك قم بتعبئة كل المدخلات');
      } else {
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
        
          onlineDBKSUMC();
          onlineDB();
      
        
      }
    return;
  }
  
}

 
const onlineDB = () => {
   var InsertAPIURL = "http://192.168.12.1/isugar/diagnosis_date.php";   

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
 .then((response)=>{       // If data is in JSON => Display alert msg
   navigation.navigate('personalInfoArabic');
 })
 .catch((error)=>{
     alert("Error Occured" + error);
 })
 }

 //OnlineDB if user choose KSUMC 
const onlineDBKSUMC = () => {

    var InsertAPIURL2 = "http://192.168.12.1/isugar/KSUMC.php";   //API to  signup

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

//OnlineDB if user choose Other 
const onlineDBOther = () => {
    console.log('other');
    var InsertAPIURL3 = "http://192.168.12.1/isugar/CenterInformation.php";   //API to  signup

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
  .then((response)=>{       // If data is in JSON => Display alert msg
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
      <Text style={styles.title}>الخطوة 2 من 7: معلومات العيادة {'\n'}</Text>
      <ScrollView>
          <View style={styles.action}>
          <Text style={styles.text_footer}>مركز/عيادة السكري </Text>
              <Picker
              selectedValue={center}
              onValueChange={(value) => setCenter(value)}
              mode="dropdown"
              style={styles.picker}
              >
            <Picker.Item label= 'اختر عيادة' value='0'></Picker.Item>
            <Picker.Item label= 'المدينة الطبية بجامعة الملك سعود' value='1'></Picker.Item>
            <Picker.Item label= 'آخرى' value='2'></Picker.Item>

        </Picker>
      
</View>

{center== '2'? 
<View>
<Text style={styles.text_footer}>اسم عيادة السكري</Text>

<View style={styles.actionN}>

    <TextInput 
    style={styles.textInput}
    placeholder ='الاسم'
    autoCapitalize="none"
    onChangeText={(val) => cNameCheck(val)}
    />
     </View>
     <Text style={styles.text_footer}>مدينة عيادة السكري</Text>
    <View style={styles.actionN}>
    <TextInput 
    style={styles.textInput}
    placeholder ='المدينة'
    autoCapitalize="none"
    onChangeText={(val) => cCityCheck(val)}
    />
   </View>
    </View>
:
null
    }
        {center== '1'? 
      
      <View style={styles.actionB}>
      <Text style={styles.text_footer}>رقم الملف الطبي </Text>
      <View style={styles.actionP}>
      <TextInput 
    style={styles.textInput}
    keyboardType="decimal-pad"
    autoCapitalize="none"
    onChangeText={(val) => setMRN(val)}
    />
</View>
</View>
      : null
      }
      
<View style={styles.action}>
<Text style={styles.text_footer}>تاريخ التشخيص</Text>
<View style={styles.dateB}>
        <TouchableOpacity onPress={showDatepicker} style={styles.dateB} >
        <MaterialIcons name="date-range" size={30} color="#8CA1BB"  />
        <Text testID="dateText" style={styles.text_footerD} >
                {moment.utc(date).format('DD/MM/YYYY')}
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
<Text>{onlinUserID}</Text>

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

export default clinicInfoARE;

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


>>>>>>> 02d91af4584ffbad2b0fa06dde4607295acc5fa6
