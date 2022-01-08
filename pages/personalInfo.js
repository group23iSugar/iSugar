import React, { useCallback, useState, useEffect } from 'react';
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
import react from 'react';


  const personalInfo = ({ navigation, route }) =>{
    

    useEffect(() => {
        search();
          }, []);
console.log(uID);
    const search = async () => {

      try {
       db.transaction( (tx) => {
           tx.executeSql(
             'SELECT UserID, firstName, lastName, email, pass, accountType FROM UserAccount',
             [],
             (tx, results) => {
                var rows = results.rows;                              
                for (let i = 0; i < rows.length; i++) {
                   var userID = rows.item(i).UserID;               
                    accountT = rows.item(i).accountType;
                    if (uID == userID){
                      console.log(accountT);
                      return;
                    }
                  }
                 }
                 ) }    
   ) 
       
 
 }  catch (error) {
      console.log(error);
  }
          
   }
 
  

  console.log(AccType);
  console.log(uID);

    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [dateOfHB1AC, setDateOfHB1AC] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false); //DOB
    const [show2, setShow2] = useState(false); // Date of latest HB1AC
    const [data, setData] = useState({
      weight: 0,
      height: 0,
      latestHB1AC: 0,
      isValidWeight: true,
      isValidHeight: true,
      isValidHB1AC: true,
    });

    var isValidAge = true;
    var DOB = moment.utc(dateOfBirth).format('YYYY-MM-DD');
    var dateOfLatestHB1AC = moment.utc(dateOfHB1AC).format('YYYY-MM-DD');

    const changeWeight = (val) => {
        if (val <= 999 && val > 0){
       setData({
         ...data,
         weight: val,
         isValidWeight: true
       })   
       } else {
          setData({
            ...data,
            isValidWeight: false
          })
        }
    }
    const changeHeight = (val) => {
        if (val <= 999 && val > 0){
          setData({
            ...data,
            height: val,
            isValidHeight: true
          })
        } else {
          setData({
            ...data,
            isValidHeight: false
          })
        }
    }
    const changeHB1AC = (val) => {
        if (val <= 99 && val > 0){
          setData({
            ...data,
            latestHB1AC: val,
            isValidHB1AC: true
          })
       
        } else {
          setData({
            ...data,
            isValidHB1AC: false
          })
        }
    }





    const onChange = (event, selectedDate) => { // DOB 
        const currentDateOfBirth = selectedDate || dateOfBirth;
        setShow(Platform.OS === 'ios');
        setDateOfBirth(currentDateOfBirth);
      };
      const onChange2 = (event, selectedDate) => { // Date of latest HB1AC 
        const currentDateOfHB1AC = selectedDate || dateOfHB1AC;
        setShow2(Platform.OS === 'ios');
        setDateOfHB1AC(currentDateOfHB1AC);
      };
    
    
      const showMode = (currentMode) => { // DOB
        setShow(true);
        setMode(currentMode);
      };
      const showMode2 = (currentMode) => { // Date of latest HB1AC 
        setShow2(true);
        setMode(currentMode);
      };
    
    
      const showDatepicker = () => { // DOB
        showMode('Year');
      };
      const showDatepicker2 = () => { // Date of latest HB1AC 
        showMode2('Year');
      };

      const  getAge = (dateString)=>{ // calculate age based on DOB
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        {
            if (age<= -1){
                isValidAge=false;
            } else{
                isValidAge=true;
            }
        }
        return age;
    }
    const  getBMI = ( )=>{ // calculate BMI 
      var w = data.weight;
      var h = data.height;
      var BMI = 0;
      if (data.weight > 0 && data.height > 0){
        BMI=((w) / ((h * h) / 10000)).toFixed(2);
   
       return BMI;}
  
      return 'Waiting ...';
  }

  DOLatestHB1AC = dateOfLatestHB1AC;
  DOBirth = DOB;
  weightKG = data.weight;
  latestHB1AC_ = data.latestHB1AC;
  heightCM = data.height;


    const checkPatientAccount = () => { // validating patient entries
        if (data.isValidWeight==true && data.isValidHeight == true && data.isValidHB1AC == true && isValidAge){
          onlineDBDOB(); 
          onlineDBWeight();
          onlineDBHeight();
          onlineDBHB1AC();
          onlineDBHB1ACDate();
          navigation.navigate('ketones')
       
          } else {
            if (isValidAge == false) {
                alert('Please enter a valid Date of Birth');
            } else {
                alert('Please fill all the fields correctly');
            }
        }
    }
    const checkNonPatientAccount = () => { // validating non patient entries
        if (data.isValidWeight==true && data.isValidHB1AC == true && isValidAge){
            navigation.navigate('ketones')
        } else {
            if (isValidAge == false) {
                alert('Please enter a valid Date of Birth');
            } else {
                alert('Please fill all the fields correctly');
            }
        }
    }
     
// onlinDB function for weight
const onlineDBWeight = () => {
  console.log('in weight');
  var InsertAPIURL1 = "https://isugarserver.com/weigthKG.php";   //API to  signup

  var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  var Data ={
    UserID: onlinUserID,
    weight_KG: weightKG
  };

// FETCH func ------------------------------------
fetch(InsertAPIURL1,{
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

const onlineDBHeight = () => {
  var InsertAPIURL2 = "https://isugarserver.com/height.php";   //API to  signup

  var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  var Data ={
    UserID: onlinUserID,
    heightM: heightCM
  };

// FETCH func ------------------------------------
fetch(InsertAPIURL2,{
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

const onlineDBDOB = () => {
  var InsertAPIURL = "https://isugarserver.com/DOB.php";   //API to  signup

  var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  var Data ={
    UserID: onlinUserID,
    DOP: DOB,
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

const onlineDBHB1AC = () => {
  var InsertAPIURL = "https://isugarserver.com/latest_HBA1C.php";   //API to  signup

  var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  var Data ={
    UserID: onlinUserID,
    latest_HP1AC: latestHB1AC_
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

const onlineDBHB1ACDate = () => {
  var InsertAPIURL = "https://isugarserver.com/latest_HBA1C_Date.php";   //API to  signup

  var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  var Data ={
    UserID: onlinUserID,
    latest_HP1AC_date: dateOfLatestHB1AC
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
      <Text style={styles.title}>Step 3 of 7: Personal Information{'\n'}</Text>
        
<ScrollView>
<View style={styles.action}>
<Text style={styles.text_footer}>Date of Birth:</Text>
<View style={styles.dateB}>
        <TouchableOpacity onPress={showDatepicker} style={styles.dateB} >
        <MaterialIcons name="date-range" size={30} color="#8CA1BB"  />
        <Text testID="dateOfBirthText" style={styles.text_footerD} >
                {moment.utc(dateOfBirth).format('DD/MM/YYYY')}
                </Text> 
                
                
              
       

        </TouchableOpacity>
        
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dateOfBirth}
          mode={mode}
          display="default"
          onChange={onChange}
        />
      )}
</View>
<View style={styles.action}>
<Text style={styles.text_footer}>Age:</Text>
<View style={styles.field}>
<Text style={styles.text_footer}>{getAge(dateOfBirth)} years old</Text>
</View>
</View>

<View style={styles.actionB}>
<Text style={styles.text_footer}>Weight:</Text>
<TextInput 
            keyboardType="decimal-pad"
            placeholder="000.00 Kg"
            onChangeText = {(val)=> changeWeight(val)}
            style={styles.actionN}></TextInput>

</View> 

{ AccType == 'Patient Account' ? 
(<View style={styles.actionB}>

<Text style={styles.text_footer}>Heigt:</Text>
<TextInput 
            keyboardType="decimal-pad"
            placeholder="000.00 cm"
            onChangeText = {(val)=> changeHeight(val)}
            style={styles.actionN}></TextInput>
            
</View>) : null }
{ AccType == 'Patient Account'? 
(<View style={styles.action}>
  <Text style={styles.text_footer}>BMI:</Text>
  <View style={styles.field}>
  <Text style={styles.text_footer}>{getBMI()}</Text>
  </View>
  </View>) : null }

<View style={styles.actionB}>
<Text style={styles.text_footer}>Latest HB1AC:</Text>
<TextInput 
            keyboardType="decimal-pad"
            placeholder="00.00 %"
            onChangeText = {(val)=> changeHB1AC(val)}
            style={styles.actionN}></TextInput>

</View>

<Text style={styles.text_footer}>Date of Latest HB1AC:</Text>
<View style={styles.dateB}>
        <TouchableOpacity onPress={showDatepicker2} style={styles.dateB} >
        <MaterialIcons name="date-range" size={30} color="#8CA1BB"  />
        <Text testID="dateOfHB1ACText" style={styles.text_footerD} >
                {moment.utc(dateOfHB1AC).format('DD/MM/YYYY')}
                </Text> 
                
                
              
       

        </TouchableOpacity>
        
      </View>
      {show2 && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dateOfHB1AC}
          mode={mode}
          display="default"
          onChange={onChange2}
        />
      )}


         {AccType == 'Patient Account' ? (<View style={styles.buttonV}>
        <TouchableOpacity onPress={()=>checkPatientAccount()}>
                <LinearGradient
                    colors={['#E7EFFA', '#AABED8', '#AABED8']} style={styles.buttonR}
                >
                    <Text style={styles.titleB}>Continue</Text>
                  
                </LinearGradient>
            </TouchableOpacity>
            </View>) : (<View style={styles.buttonV}>
        <TouchableOpacity onPress={()=>checkNonPatientAccount()}>
                <LinearGradient
                    colors={['#E7EFFA', '#AABED8', '#AABED8']} style={styles.buttonR}
                >
                    <Text style={styles.titleB}>Continue</Text>
                  
                </LinearGradient>
            </TouchableOpacity>
            </View>) } 
            </ScrollView>
         
        </View>
     </View>
  
         
  
    );
  
  };


const {height} = Dimensions.get("screen");
const height_logo = height * 0.15;

export default personalInfo;

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
field: {
    width: 200,
    height: 40,
    backgroundColor: '#FCFDFE',
    alignItems: 'flex-start',
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#CCCCC0',
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
//   alignItems: 'center',
  flexWrap: 'wrap',
  marginTop: 10,
  paddingBottom: 25,
  
},
actionN: {
width: 100,
  borderRightWidth: 1,
  borderBottomWidth: 1,
  borderColor: '#CACDD1',
  color:'#000'
},
actionP: {
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
textD:{
justifyContent: 'space-between',
marginTop: 25
}
});


