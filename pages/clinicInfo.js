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


  const clinicInfo = ({ navigation }) =>{
    
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
  
  
  var dateOfDiagnosis = moment.utc(date).format('DD-MM-YYYY');
  const [center, setCenter] = useState('0');
  
  const [mrn1, setMRN1] = useState('0');
  const [mrn2, setMRN2] = useState('0');
  const [mrn3, setMRN3] = useState('0');
  const [mrn4, setMRN4] = useState('0');
  const [mrn5, setMRN5] = useState('0');
  const [mrn6, setMRN6] = useState('0');
  const [mrn7, setMRN7] = useState('0');
  const [mrn8, setMRN8] = useState('0');
  var mrn= mrn1+mrn2+mrn3+mrn4+mrn5+mrn6+mrn7+mrn8;
  const [other, setOther] = useState({
    centerCity : '',
    centerName : ''
    
  });


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
      centName= other.centerName;
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
    centCity =  other.centerCity;
  } else {
    isValidCity= false;
}
}

const check = () => {
  if (center == '0'){
    alert('Please select a medical center');
    return;
  }
  if (center == '2'){
    if (isValidName == true && isValidCity == true){
      navigation.navigate('personal', {cen: center, ceName: centName, ceCity: centCity, DOD: dateOfDiagnosis}  )
    } else {
      alert('Please fill all the fields');
    }
    return;
  }
  if (center == '1'){
      if (mrn == '00000000'){
        alert('Please fill all the fields');
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
        navigation.navigate('personal', {cen: center, uMRN: mrn, DOD: dateOfDiagnosis}  )
      }
    return;
  }

}
// const [data] = useState({
//   ID: userID,
//   userCenter: center,
//   centName: centerName,
//   centCity: centerCity,
//   userMRN: mrn,
//   DOD: dateOfDiagnosis,
// });

    return (
      <View style={styles.container}>
      <LinearGradient colors={['#E7EFFA', '#E7EFFA','#AABED8']} style={styles.container}>

         <View style={styles.header}>
           <TouchableOpacity onPress={()=>navigation.navigate('accinfo')}>
         <MaterialIcons name="arrow-back" size={25} color="#FF6B6B"  />
         </TouchableOpacity>
         <Image source={require('../images/logo.png')}
         style={styles.logo}
         resizeMode='stretch'/>
         </View>
      </LinearGradient>

      <View style={styles.footer}>
      <Text style={styles.title}>Step 2 of 7: Clinic Information{'\n'}</Text>
      <ScrollView>
          <View style={styles.action}>
              <Text style={styles.text_footer}>Diabetes Center/Clinic</Text>
              <Picker
              selectedValue={center}
              onValueChange={(value) => setCenter(value)}
              mode="dropdown"
              style={styles.picker}
              >
            <Picker.Item label= 'Select a center' value='0'></Picker.Item>
            <Picker.Item label= 'King Saud University Medical City' value='1'></Picker.Item>
            <Picker.Item label= 'Other' value='2'></Picker.Item>

        </Picker>
      
</View>

{center== '2'? 
<View>
<Text style={styles.text_footer}>Center Name</Text>

<View style={styles.actionN}>

    <TextInput 
    style={styles.textInput}
    placeholder ='Name'
    autoCapitalize="none"
    onChangeText={(val) => cNameCheck(val)}
    />
     </View>
    <Text style={styles.text_footer}>Center City</Text>
    <View style={styles.actionN}>
    <TextInput 
    style={styles.textInput}
    placeholder ='City'
    autoCapitalize="none"
    onChangeText={(val) => cCityCheck(val)}
    // onEndEditing={(e)=>validLN(e.nativeEvent.text)}
    />
   </View>
    </View>
:
null
    }
        {center== '1'? 
      
      <View style={styles.actionB}>
      <Text style={styles.text_footer}>Medical file number </Text>
      <View style={styles.actionP}>
      <Picker
      selectedValue={mrn1}
      onValueChange={(value) => setMRN1(value)}
      mode="dropdown"
      style={styles.pickerP}
      itemStyle={{height: 44} }
      >
    <Picker.Item label= '0' value='0'></Picker.Item>
    <Picker.Item label= '1' value='1'></Picker.Item>
    <Picker.Item label= '2' value='2'></Picker.Item>
    <Picker.Item label= '3' value='3'></Picker.Item>
    <Picker.Item label= '4' value='4'></Picker.Item>
    <Picker.Item label= '5' value='5'></Picker.Item>
    <Picker.Item label= '6' value='6'></Picker.Item>
    <Picker.Item label= '7' value='7'></Picker.Item>
    <Picker.Item label= '8' value='8'></Picker.Item>
    <Picker.Item label= '9' value='9'></Picker.Item>

</Picker>
<Picker
      selectedValue={mrn2}
      onValueChange={(value) => setMRN2(value)}
      mode="dropdown"
      style={styles.pickerP}
      >
    <Picker.Item label= '0' value='0'></Picker.Item>
    <Picker.Item label= '1' value='1'></Picker.Item>
    <Picker.Item label= '2' value='2'></Picker.Item>
    <Picker.Item label= '3' value='3'></Picker.Item>
    <Picker.Item label= '4' value='4'></Picker.Item>
    <Picker.Item label= '5' value='5'></Picker.Item>
    <Picker.Item label= '6' value='6'></Picker.Item>
    <Picker.Item label= '7' value='7'></Picker.Item>
    <Picker.Item label= '8' value='8'></Picker.Item>
    <Picker.Item label= '9' value='9'></Picker.Item>

</Picker> 
<Text style={styles.titleB}> - </Text>
<Picker
      selectedValue={mrn3}
      onValueChange={(value) => setMRN3(value)}
      mode="dropdown"
      style={styles.pickerP}
      >
    <Picker.Item label= '0' value='0'></Picker.Item>
    <Picker.Item label= '1' value='1'></Picker.Item>
    <Picker.Item label= '2' value='2'></Picker.Item>
    <Picker.Item label= '3' value='3'></Picker.Item>
    <Picker.Item label= '4' value='4'></Picker.Item>
    <Picker.Item label= '5' value='5'></Picker.Item>
    <Picker.Item label= '6' value='6'></Picker.Item>
    <Picker.Item label= '7' value='7'></Picker.Item>
    <Picker.Item label= '8' value='8'></Picker.Item>
    <Picker.Item label= '9' value='9'></Picker.Item>

</Picker>
<Picker
      selectedValue={mrn4}
      onValueChange={(value) => setMRN4(value)}
      mode="dropdown"
      style={styles.pickerP}
      >
    <Picker.Item label= '0' value='0'></Picker.Item>
    <Picker.Item label= '1' value='1'></Picker.Item>
    <Picker.Item label= '2' value='2'></Picker.Item>
    <Picker.Item label= '3' value='3'></Picker.Item>
    <Picker.Item label= '4' value='4'></Picker.Item>
    <Picker.Item label= '5' value='5'></Picker.Item>
    <Picker.Item label= '6' value='6'></Picker.Item>
    <Picker.Item label= '7' value='7'></Picker.Item>
    <Picker.Item label= '8' value='8'></Picker.Item>
    <Picker.Item label= '9' value='9'></Picker.Item>

</Picker>  
<Text  style={styles.titleB} > - </Text>
<Picker
      selectedValue={mrn5}
      onValueChange={(value) => setMRN5(value)}
      mode="dropdown"
      style={styles.pickerP}
      >
    <Picker.Item label= '0' value='0'></Picker.Item>
    <Picker.Item label= '1' value='1'></Picker.Item>
    <Picker.Item label= '2' value='2'></Picker.Item>
    <Picker.Item label= '3' value='3'></Picker.Item>
    <Picker.Item label= '4' value='4'></Picker.Item>
    <Picker.Item label= '5' value='5'></Picker.Item>
    <Picker.Item label= '6' value='6'></Picker.Item>
    <Picker.Item label= '7' value='7'></Picker.Item>
    <Picker.Item label= '8' value='8'></Picker.Item>
    <Picker.Item label= '9' value='9'></Picker.Item>

</Picker>
<Picker
      selectedValue={mrn6}
      onValueChange={(value) => setMRN6(value)}
      mode="dropdown"
      style={styles.pickerP}
      >
    <Picker.Item label= '0' value='0'></Picker.Item>
    <Picker.Item label= '1' value='1'></Picker.Item>
    <Picker.Item label= '2' value='2'></Picker.Item>
    <Picker.Item label= '3' value='3'></Picker.Item>
    <Picker.Item label= '4' value='4'></Picker.Item>
    <Picker.Item label= '5' value='5'></Picker.Item>
    <Picker.Item label= '6' value='6'></Picker.Item>
    <Picker.Item label= '7' value='7'></Picker.Item>
    <Picker.Item label= '8' value='8'></Picker.Item>
    <Picker.Item label= '9' value='9'></Picker.Item>

</Picker> 
<Text  style={styles.titleB} > - </Text>
<Picker
      selectedValue={mrn7}
      onValueChange={(value) => setMRN7(value)}
      mode="dropdown"
      style={styles.pickerP}
      >
    <Picker.Item label= '0' value='0'></Picker.Item>
    <Picker.Item label= '1' value='1'></Picker.Item>
    <Picker.Item label= '2' value='2'></Picker.Item>
    <Picker.Item label= '3' value='3'></Picker.Item>
    <Picker.Item label= '4' value='4'></Picker.Item>
    <Picker.Item label= '5' value='5'></Picker.Item>
    <Picker.Item label= '6' value='6'></Picker.Item>
    <Picker.Item label= '7' value='7'></Picker.Item>
    <Picker.Item label= '8' value='8'></Picker.Item>
    <Picker.Item label= '9' value='9'></Picker.Item>

</Picker>
<Picker
      selectedValue={mrn8}
      onValueChange={(value) => setMRN8(value)}
      mode="dropdown"
      style={styles.pickerP}
      >
    <Picker.Item label= '0' value='0'></Picker.Item>
    <Picker.Item label= '1' value='1'></Picker.Item>
    <Picker.Item label= '2' value='2'></Picker.Item>
    <Picker.Item label= '3' value='3'></Picker.Item>
    <Picker.Item label= '4' value='4'></Picker.Item>
    <Picker.Item label= '5' value='5'></Picker.Item>
    <Picker.Item label= '6' value='6'></Picker.Item>
    <Picker.Item label= '7' value='7'></Picker.Item>
    <Picker.Item label= '8' value='8'></Picker.Item>
    <Picker.Item label= '9' value='9'></Picker.Item>

</Picker>
</View>
</View>
      : null
      }
      
<View style={styles.action}>
<Text style={styles.text_footer}>Diagnosis Date:</Text>
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
<Text>{center}</Text>

          <View style={styles.buttonV}>
        <TouchableOpacity onPress={()=>check()}>
                <LinearGradient
                    colors={['#E7EFFA', '#AABED8', '#AABED8']} style={styles.buttonR}
                >
                    <Text style={styles.titleB}>Continue</Text>
                  
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

export default clinicInfo;

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


