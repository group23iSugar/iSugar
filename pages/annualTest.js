/* eslint-disable prettier/prettier */
/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/rules-of-hooks */

import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TextInput,
  Platform,
  TouchableOpacity,
  alert,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Entypo from 'react-native-vector-icons/Entypo';
import {ActivityIndicator, Colors} from 'react-native-paper';

let onlinUserID = 15;
var AccType = 'Patient Account';

const annual = ({navigation}) => {
  global.hasRecord = false;
  useEffect(() => {
    first();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
//const
  const [ThroidDate, setThroidDate] = useState(new Date());
  const [AdrenalDate, setAdrenalDate] = useState(new Date());
  const [CeliacDate, setCeliacDate] = useState(new Date());
  const [RenalDate, setRenalDate] = useState(new Date());
  const [LipidsDate, setLipidsDate] = useState(new Date());
  const [BPDate, setBPDate] = useState(new Date());
  const [EyesDate, setEyesDate] = useState(new Date());
  const [LastFluVaccineDate, setLastFluVaccineDate] = useState(new Date());
  const [LastDentalVisitDate, setLastDentalVisitDate] = useState(new Date());
//mode
  const [mode, setMode] = useState('date');
//show
  const [showThroid, setShowThroid] = useState(false);
  const [showAdrenal, setShowAdrenal] = useState(false);
  const [showCeliac, setShowCeliac] = useState(false);
  const [showRenal, setShowRenal] = useState(false);
  const [showLipids, setShowLipids] = useState(false);
  const [showBP, setShowBP] = useState(false);
  const [showEye, setShowEyes] = useState(false);
  const [showlFV, setShowLFV] = useState(false);
  const [showLDV, setShowLDV] = useState(false);
//onChange
  const onChange = (event, selectedDate) => {
    const currentDateOfThroid = selectedDate || ThroidDate;
    setShowThroid(Platform.OS === 'ios');
    setThroidDate(currentDateOfThroid);
  };
  const onChange2 = (event, selectedDate) => {
    const adrenal_date = selectedDate || AdrenalDate;
    setShowAdrenal(Platform.OS === 'ios');
    setAdrenalDate(adrenal_date);
  };
  const onChange3 = (event, selectedDate) => {
    const celiac_date = selectedDate || CeliacDate;
    setShowCeliac(Platform.OS === 'ios');
    setCeliacDate(celiac_date);
  };
  const onChange4 = (event, selectedDate) => {
    const Renal_Date = selectedDate || RenalDate;
    setShowRenal(Platform.OS === 'ios');
    setRenalDate(Renal_Date);
  };
  const onChange5 = (event, selectedDate) => {
    const Lipids_Date = selectedDate || LipidsDate;
    setShowLipids(Platform.OS === 'ios');
    setLipidsDate(Lipids_Date);
  };
  const onChange6 = (event, selectedDate) => {
    const BP_Date = selectedDate || BPDate;
    setShowBP(Platform.OS === 'ios');
    setBPDate(BP_Date);
  };
  const onChange7 = (event, selectedDate) => {
    const Eyes_Date = selectedDate || EyesDate;
    setShowEyes(Platform.OS === 'ios');
    setEyesDate(Eyes_Date);
  };
  const onChange8 = (event, selectedDate) => {
    const LastFluVaccine_Date = selectedDate || LastFluVaccineDate;
    setShowLFV(Platform.OS === 'ios');
    setLastFluVaccineDate(LastFluVaccine_Date);
  };
  const onChange9 = (event, selectedDate) => {
    const LastDentalVisit_Date = selectedDate || LastDentalVisitDate;
    setShowLDV(Platform.OS === 'ios');
    setLastDentalVisitDate(LastDentalVisit_Date);
  };
//showMode
  const showThroidMode = (currentMode) => {
    setShowThroid(true);
    setMode(currentMode);
  };
  const showAdrenalMode = (currentMode) => {
    setShowAdrenal(true);
    setMode(currentMode);
  };

  const showCeliacMode = (currentMode) => {
    setShowCeliac(true);
    setMode(currentMode);
  };

  const showRenalMode = (currentMode) => {
    setShowRenal(true);
    setMode(currentMode);
  };
  const showLipidsMode = (currentMode) => {
    setShowLipids(true);
    setMode(currentMode);
  };

  const showBPMode = (currentMode) => {
    setShowBP(true);
    setMode(currentMode);
  };
  const showEyeMode = (currentMode) => {
    setShowEyes(true);
    setMode(currentMode);
  };
  const showlFVMode = (currentMode) => {
    setShowLFV(true);
    setMode(currentMode);
  };
  const showLDVMode = (currentMode) => {
    setShowLDV(true);
    setMode(currentMode);
  };

//Picker
  const showDatePicker = () => {
    showThroidMode('Year');
  };
  const showDatePicker2 = () => {
    showAdrenalMode('Year');
  };
  const showDatePicker3 = () => {
    showCeliacMode('Year');
  };
  const showDatePicker4 = () => {
    showRenalMode('Year');
  };
  const showDatePicker5 = () => {
    showLipidsMode('Year');
  };
  const showDatePicker6 = () => {
    showBPMode('Year');
  };
  const showDatePicker7 = () => {
    showEyeMode('Year');
  };
  const showDatePicker8 = () => {
    showlFVMode('Year');
  };
  const showDatePicker9 = () => {
    showLDVMode('Year');
  };
//-------------------Constant to store it in DB----------------------
const [anti_TPO, setAnti_TPO] = useState('0');
const [TSH, setTSH] = useState('0');
const [FT4, setFT4] = useState('0');
const [cortisol, setCortisol] = useState('0');
const [NA, setNA] = useState('0');
const [K, setK] = useState('0');
const [IgA, setIgA] = useState('0');
const [tTG_IgA, set_tTG_IgA] = useState('0');
const [tTG_IgG, set_tTG_IgG] = useState('0');
const [DeamidatedGliadinIgA, setDeamidatedGliadinIgA] = useState('0');
const [DeamidatedGliadinIgG, setDeamidatedGliadinIgG] = useState('0');
const [ACR, setACR] = useState('0');
const [TG, setTG] = useState('0');
const [LDL, setLDL] = useState('0');
const [HDL, setHDL] = useState('0');
const [Cholesterol, setCholesterol] = useState('0');
const [BPreading, setBPreading] = useState('0');
const [Finding, setFinding] = useState('0');
//------------------------------------------------------------------------------

const first = () => {
  console.log('in DB1');
  // eslint-disable-next-line quotes
  var InsertAPIURL = "http://192.168.56.1/isugar/AnnualTestCheck.php";   //API to  signup

  var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };
  var Data = {
    UserID: onlinUserID,
  };

// FETCH func ------------------------------------
fetch(InsertAPIURL,{
    method:'POST',
    headers:headers,
    body: JSON.stringify(Data),//convert data to JSON
})
.then((response)=>response.json()) //check response type of API (CHECK OUTPUT OF DATA IS IN JSON)
.then((response)=>{
  onlinUserID = response[0].userID;
  global.hasRecord = response[0].flag;
  console.log('has a record ? ' + global.hasRecord);
if (response[0].flag == 'true'){
  setThroidDate(response[0].thyroid);
  setAnti_TPO(response[0].antiTPO);
  setTSH(response[0].tsh);
  setFT4(response[0].ft4);
  setAdrenalDate(response[0].adrenal);
  setCortisol(response[0].cortisol);
  setNA(response[0].na);
  setK(response[0].k);
  setCeliacDate(response[0].celiac);
  setIgA(response[0].IgA);
  set_tTG_IgA(response[0].tTG_IgA);
  set_tTG_IgG(response[0].tTG_IgG);
  setDeamidatedGliadinIgA(response[0].DeamidatedGliadinIgA);
  setDeamidatedGliadinIgG(response[0].DeamidatedGliadinIgG);
  setRenalDate(response[0].Renal);
  setACR(response[0].ACR);
  setLipidsDate(response[0].lipids);
  setTG(response[0].TG);
  setLDL(response[0].LDL);
  setHDL(response[0].HDL);
  setCholesterol(response[0].cholesterol);
  setBPDate(response[0].BloodPressureDate);
  setBPreading(response[0].BP_Reading);
  setEyesDate(response[0].eyes);
  setFinding(response[0].finding);
  setLastFluVaccineDate(response[0].LastFluVaccine);
  setLastDentalVisitDate(response[0].LastDentalVisit);
      console.log(onlinUserID + '-' + ThroidDate + '-' + anti_TPO + '-' + TSH + '-' + FT4 + '-' + AdrenalDate + '-' + cortisol );
}
console.log('inside onlineDB: ');
})
.catch((error)=>{
    alert('Error Occured' + error);
// eslint-disable-next-line semi
})
};
//-----------------------------
const onlineDB = () => {
  console.log('in DB1');
  // eslint-disable-next-line quotes
  var InsertAPIURL = "http://192.168.56.1/isugar/AnnualTest.php";   //API to  signup

  var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };
  var Data = {
    UserID: onlinUserID,
    Thyroid_date: ThroidDate,
    Anti_TPO: anti_TPO,
    TSH: TSH,
    FT4: FT4,
    cortisol: cortisol,
    Adrenal_date: AdrenalDate,
    NA: NA,
    K: K,
    Celiac_date: CeliacDate,
    IgA: IgA,
    tTG_IgA: tTG_IgA,
    tTG_IgG: tTG_IgG,
    Deamidated_Gliadin_IgA: DeamidatedGliadinIgA,
    Deamidated_Gliadin_IgG: DeamidatedGliadinIgG,
    Renal_date: RenalDate,
    ACR: ACR,
    Lipids_date: LipidsDate,
    TG: TG,
    LDL: LDL,
    HDL: HDL,
    Cholesterol: Cholesterol,
    Blood_Pressure_date: BPDate,
    BP_reading: BPreading,
    Eyes_date: EyesDate,
    Finding: Finding,
    LastFluVaccine: LastFluVaccineDate,
    LastDentalVisit: LastDentalVisitDate,
  };

// FETCH func ------------------------------------
fetch(InsertAPIURL,{
    method:'POST',
    headers:headers,
    body: JSON.stringify(Data),//convert data to JSON
})
.then((response)=>response.json()) //check response type of API (CHECK OUTPUT OF DATA IS IN JSON)
.then((response)=>{
 //alert(response[0].Message);
    // If data is in JSON => Display alert msg
})
.catch((error)=>{
    alert('Error Occured' + error);
// eslint-disable-next-line semi
})
};

const saveAlert = () => {
  Alert.alert(
    //Title
    '',
    //body
    'Are you sure you want to save all the information?',
    [
      {
        text: 'Yes',
        onPress: () => {
        console.log('Yes pressed');
        StoreInOnline();
        },
      },
      {
        text: 'No',
        onPress: () => {
        console.log('No pressed');
        },
      },
    ]

  );
  };//end saveAlert

const StoreInOnline = () => {
  if (AccType == 'Patient Account'){
    onlineDB();
  } else {
    Alert.alert('only accounts of type (patient account) can store their annual test information');
  }
  };

  return (
    <View style={styles.container}>
     <View style={{top: 10, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', padding: 30}}>
        <TouchableOpacity onPress={()=>navigation.openDrawer()}>
         <Entypo name="menu" color="#05375a" size={35} />
         </TouchableOpacity>
         <View style={{alignItems: 'center', marginRight: 130, paddingTop: -10, paddingEnd: 15}}>
         <Text
          style={{
            color: '#05375a',
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'center',
            paddingLeft: 30,
          }}>
          Annual Screeing Test
        </Text>
         </View>
      </View>
        <View style={styles.footer}>
          <View>
          <ScrollView>
            {global.hasRecord == true || global.hasRecord == false ? (<View>
              <View style={styles.action}>
              <View><Text style={styles.internalText}>Throid Date: </Text></View>
              <View style={styles.dateB}>
                <TouchableOpacity onPress={showDatePicker} style={styles.dateB}>
                  <MaterialIcons name="date-range" size={30} color="#e9ebee" />
                  <Text testID="dateOfThroidText" style={styles.text_footerD}>
                  {moment.utc(ThroidDate).format('DD/MM/YYYY')}
                  </Text>
                </TouchableOpacity>
              </View>
              {showThroid && (
                <DateTimePicker
                  testID="showDatePicker"
                  value={ThroidDate}
                  mode={mode}
                  display="default"
                  onChange={onChange}
                />
              )}
            </View>
            <View style={styles.vNext}>
              <Text style={styles.inpTxt}>Anti TPO</Text>
              <TextInput
                keyboardType="decimal-pad"
                defaultValue={anti_TPO + ''}
                onChangeText={(val)=>setAnti_TPO(val)}
                style={styles.inputT} />
              <Text style={{fontSize: 15, paddingTop: 15}}>IU/ml </Text>
            </View>
            <View style={styles.vNext}>
              <Text style={styles.inpTxt}>TSH</Text>
              <TextInput
                keyboardType="decimal-pad"
                defaultValue={TSH + ''}
                onChangeText={(val)=>setTSH(val)}
                style={styles.inputT} />
              <Text style={{fontSize: 15, paddingTop: 15}}> mIU/L</Text>
            </View>
            <View style={styles.vNext}>
              <Text style={styles.inpTxt}>FT4</Text>
              <TextInput
                keyboardType="decimal-pad"
                defaultValue={FT4 + ''}
                onChangeText={(val)=>setFT4(val)}
                style={styles.inputT} />
              <Text style={{fontSize: 15, paddingTop: 15}}> pmol/L </Text>
            </View>
            <View style={styles.action}>
              <View><Text style={styles.internalText}>Adrenal Date: </Text></View>
              <View style={styles.dateB}>
                <TouchableOpacity onPress={showDatePicker2} style={styles.dateB}>
                  <MaterialIcons name="date-range" size={30} color="#e9ebee" />
                  <Text testID="dateOfAdrenalText" style={styles.text_footerD}>
                  {moment.utc(AdrenalDate).format('DD/MM/YYYY')}
                  </Text>
                </TouchableOpacity>
              </View>
              {showAdrenal && (
                <DateTimePicker
                  testID="showDatePicker"
                  value={AdrenalDate}
                  mode={mode}
                  display="default"
                  onChange={onChange2}
                />
              )}
            </View>
            <View style={styles.vNext}>
              <Text style={styles.inpTxt}>Morning cortisol</Text>
              <TextInput
                keyboardType="decimal-pad"
                defaultValue={cortisol + ''}
                onChangeText={(val)=>setCortisol(val)}
                style={styles.inputT} />
              <Text style={{fontSize: 15, paddingTop: 15}}>nmol/L </Text>
            </View>
            <View style={styles.vNext}>
              <Text style={styles.inpTxt}>NA</Text>
              <TextInput
                keyboardType="decimal-pad"
                defaultValue={NA + ''}
                onChangeText={(val)=>setNA(val)}
                style={styles.inputT} />
              <Text style={{fontSize: 15, paddingTop: 15}}> mmol/L</Text>
            </View>
            <View style={styles.vNext}>
              <Text style={styles.inpTxt}>K</Text>
              <TextInput
                keyboardType="decimal-pad"
                defaultValue={K + ''}
                onChangeText={(val)=>setK(val)}
                style={styles.inputT} />
              <Text style={{fontSize: 15, paddingTop: 15}}> mmol/L </Text>
            </View>
            <View style={styles.action}>
              <View><Text style={styles.internalText}>Celiac Date: </Text></View>
              <View style={styles.dateB}>
                <TouchableOpacity onPress={showDatePicker3} style={styles.dateB}>
                  <MaterialIcons name="date-range" size={30} color="#e9ebee" />
                  <Text testID="dateOfCeliacText" style={styles.text_footerD}>
                    {moment.utc(CeliacDate).format('DD/MM/YYYY')}
                  </Text>
                </TouchableOpacity>
              </View>
              {showCeliac && (
                <DateTimePicker
                  testID="showDatePicker"
                  value={CeliacDate}
                  mode={mode}
                  display="default"
                  onChange={onChange3}
                />
              )}
            </View>
            <View style={styles.vNext}>
              <Text style={styles.inpTxt}>IgA</Text>
              <TextInput
                keyboardType="decimal-pad"
                defaultValue={IgA + ''}
                onChangeText={(val)=>setIgA(val)}
                style={styles.inputT} />
              <Text style={{fontSize: 15, paddingTop: 15}}> gm/L </Text>
            </View>
            <View style={styles.vNext}>
              <Text style={styles.inpTxt}>tTG IgA</Text>
              <TextInput
                keyboardType="decimal-pad"
                defaultValue={tTG_IgA + ''}
                onChangeText={(val)=>set_tTG_IgA(val)}
                style={styles.inputT} />
              <Text style={{fontSize: 15, paddingTop: 15}}> U/mL</Text>
            </View>
            <View style={styles.vNext}>
              <Text style={styles.inpTxt}>tTG IgG</Text>
              <TextInput
                keyboardType="decimal-pad"
                defaultValue={tTG_IgG + ''}
                onChangeText={(val)=>set_tTG_IgG(val)}
                style={styles.inputT} />
              <Text style={{fontSize: 15, paddingTop: 15}}> U/mL</Text>
            </View>
            <View style={styles.vNext}>
              <Text style={styles.inpTxt}>Deamidated gliadin IgA</Text>
              <TextInput
                keyboardType="decimal-pad"
                defaultValue={DeamidatedGliadinIgA + ''}
                onChangeText={(val)=>setDeamidatedGliadinIgA(val)}
                style={styles.inputT} />
              <Text style={{fontSize: 15, paddingTop: 15}}> U/mL </Text>
            </View>
            <View style={styles.vNext}>
              <Text style={styles.inpTxt}>Deamidated gliadin IgG</Text>
              <TextInput
                keyboardType="decimal-pad"
                defaultValue={DeamidatedGliadinIgG + ''}
                onChangeText={(val)=>setDeamidatedGliadinIgG(val)}
                style={styles.inputT} />
              <Text style={{fontSize: 15, paddingTop: 15}}> U/mL </Text>
            </View>
            <View style={styles.action}>
              <View><Text style={styles.internalText}>Renal Date: </Text></View>
              <View style={styles.dateB}>
                <TouchableOpacity onPress={showDatePicker4} style={styles.dateB}>
                  <MaterialIcons name="date-range" size={30} color="#e9ebee" />
                  <Text testID="dateOfRenalText" style={styles.text_footerD}>
                    {moment.utc(RenalDate).format('DD/MM/YYYY')}
                  </Text>
                </TouchableOpacity>
              </View>
              {showRenal && (
                <DateTimePicker
                  testID="showDatePicker"
                  value={RenalDate}
                  mode={mode}
                  display="default"
                  onChange={onChange4}
                />
              )}
            </View>
            <View style={styles.vNext}>
              <Text style={styles.inpTxt}>ACR</Text>
              <TextInput
                keyboardType="decimal-pad"
                defaultValue={ACR + ''}
                onChangeText={(val)=>setACR(val)}
                style={styles.inputT} />
              <Text style={{fontSize: 15, paddingTop: 15}}>mg/g </Text>
            </View>
            <View style={styles.action}>
              <View><Text style={styles.internalText}>Lipids Date: </Text></View>
              <View style={styles.dateB}>
                <TouchableOpacity onPress={showDatePicker5} style={styles.dateB}>
                  <MaterialIcons name="date-range" size={30} color="#e9ebee" />
                  <Text testID="dateOfLipidsText" style={styles.text_footerD}>
                    {moment.utc(LipidsDate).format('DD/MM/YYYY')}
                  </Text>
                </TouchableOpacity>
              </View>
              {showLipids && (
                <DateTimePicker
                  testID="showDatePicker"
                  value={LipidsDate}
                  mode={mode}
                  display="default"
                  onChange={onChange5}
                />
              )}
            </View>
            <View style={styles.vNext}>
              <Text style={styles.inpTxt}>TG</Text>
              <TextInput
                keyboardType="decimal-pad"
                defaultValue={TG + ''}
                onChangeText={(val)=>setTG(val)}
                style={styles.inputT} />
              <Text style={{fontSize: 15, paddingTop: 15}}> mmol/L </Text>
            </View>
            <View style={styles.vNext}>
              <Text style={styles.inpTxt}>LDL</Text>
              <TextInput
                keyboardType="decimal-pad"
                defaultValue={LDL + ''}
                onChangeText={(val)=>setLDL(val)}
                style={styles.inputT} />
              <Text style={{fontSize: 15, paddingTop: 15}}> mmol/L </Text>
            </View>
            <View style={styles.vNext}>
              <Text style={styles.inpTxt}>HDL</Text>
              <TextInput
                keyboardType="decimal-pad"
                defaultValue={HDL + ''}
                onChangeText={(val)=>setHDL(val)}
                style={styles.inputT} />
              <Text style={{fontSize: 15, paddingTop: 15}}> mmol/L </Text>
            </View>
            <View style={styles.vNext}>
              <Text style={styles.inpTxt}>Cholesterol</Text>
              <TextInput
                keyboardType="decimal-pad"
                defaultValue={Cholesterol + ''}
                onChangeText={(val)=>setCholesterol(val)}
                style={styles.inputT} />
              <Text style={{fontSize: 15, paddingTop: 15}}> mmol/L </Text>
            </View>
            <View style={styles.action}>
              <View><Text style={styles.internalText}>Blood Pressure Date: </Text></View>
              <View style={styles.dateB}>
                <TouchableOpacity onPress={showDatePicker6} style={styles.dateB}>
                  <MaterialIcons name="date-range" size={30} color="#e9ebee" />
                  <Text testID="dateOfBPText" style={styles.text_footerD}>
                    {moment.utc(BPDate).format('DD/MM/YYYY')}
                  </Text>
                </TouchableOpacity>
              </View>
              {showBP && (
                <DateTimePicker
                  testID="showDatePicker"
                  value={BPDate}
                  mode={mode}
                  display="default"
                  onChange={onChange6}
                />
              )}
            </View>
            <View style={styles.vNext}>
              <Text style={styles.inpTxt}>BP reading</Text>
              <TextInput
                keyboardType="decimal-pad"
                defaultValue={BPreading + ''}
                onChangeText={(val)=>setBPreading(val)}
                style={styles.inputT} />
              <Text style={{fontSize: 15, paddingTop: 15}}> mmHg </Text>
            </View>
            <View style={styles.action}>
              <View><Text style={styles.internalText}>Eyes Date: </Text></View>
              <View style={styles.dateB}>
                <TouchableOpacity onPress={showDatePicker7} style={styles.dateB}>
                  <MaterialIcons name="date-range" size={30} color="#e9ebee" />
                  <Text testID="dateOfEyesText" style={styles.text_footerD}>
                    {moment.utc(EyesDate).format('DD/MM/YYYY')}
                  </Text>
                </TouchableOpacity>
              </View>
              {showEye && (
                <DateTimePicker
                  testID="showDatePicker"
                  value={EyesDate}
                  mode={mode}
                  display="default"
                  onChange={onChange7}
                />
              )}
            </View>
            <View style={styles.action}>
              <Text style={styles.inpTxt}>Findings</Text>
              <Picker
               selectedValue= {Finding}
               defaultValue={Finding + ''}
               onValueChange={(value) => setFinding(value)}
               mode= "dropdown"
               style= {styles.picker}
               >
                  <Picker.Item label= "Evidence of retinopathy" value="0" />
                  <Picker.Item label= "No evidence of retinopathy" value="1" />
              </Picker>
            </View>
            <View style={styles.action}>
              <View><Text style={styles.internalText}>Last Flu Vaccine Date: </Text></View>
              <View style={styles.dateB}>
                <TouchableOpacity onPress={showDatePicker8} style={styles.dateB}>
                  <MaterialIcons name="date-range" size={30} color="#e9ebee" />
                  <Text testID="dateOfLFVText" style={styles.text_footerD}>
                    {moment.utc(LastFluVaccineDate).format('DD/MM/YYYY')}
                  </Text>
                </TouchableOpacity>
              </View>
              {showlFV && (
                <DateTimePicker
                  testID="showDatePicker"
                  value={LastFluVaccineDate}
                  mode={mode}
                  display="default"
                  onChange={onChange8}
                />
              )}
            </View>
            <View style={styles.action}>
              <View><Text style={styles.internalText}>Last Dental Visit Date: </Text></View>
              <View style={styles.dateB}>
                <TouchableOpacity onPress={showDatePicker9} style={styles.dateB}>
                  <MaterialIcons name="date-range" size={30} color="#e9ebee" />
                  <Text testID="dateOfLDVText" style={styles.text_footerD}>
                    {moment.utc(LastDentalVisitDate).format('DD/MM/YYYY')}
                  </Text>
                </TouchableOpacity>
              </View>
              {showLDV && (
                <DateTimePicker
                  testID="showDatePicker"
                  value={LastDentalVisitDate}
                  mode={mode}
                  display="default"
                  onChange={onChange9}
                />
              )}
            </View>
            <View style={styles.buttonV}>
          <TouchableOpacity onPress={saveAlert}>
            <LinearGradient
              colors={['#f5f5f5', '#e9ebee', '#e9ebee']}
              style={styles.buttonR}>
              <Text style={styles.titleB}>
                Save
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          </View>
            </View>) :  <ActivityIndicator animating={true} color={Colors.blue100} size={'large'} />  }
            </ScrollView>
          </View>
        </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF0F2',
  },
  text: {
    fontSize: 15,
    fontWeight: '200',
    color: '#05375a',
  },
  internalText: {
    color: '#05375a',
    fontSize: 16,
    textAlign: 'left',
    paddingTop: 20,
    paddingLeft: 10,
    fontWeight: '600',
  },
  text_footer: {
    color: '#415979',
    fontSize: 17,
  },
  picker: {
    width: 250,
    height: 30,
    borderWidth: 2,
    borderColor: '#4c4c4c',
  },
  Annual: {
    color: '#05375a',
        fontSize: 20,
        textAlign: 'left',
        fontWeight: 'bold',
        paddingBottom: 15,
        marginLeft: 18,
  },
  vNext: {
    // to make items next to each other
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 25,
  },
  inpTxt: {
    //lables
    color: '#05375a',
    paddingLeft: 20,
    paddingTop: 15,
    fontSize: 16,
  },
  inputT: {
    //inputs field
    width: 100,
    fontSize: 16,
    shadowColor: '#656363',
    height: 50,
    textAlign: 'center',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.23,
    shadowRadius: 0.62,

    elevation: 2,
  },
  dateB: {
    flexDirection: 'row',
    width: 160,
    height: 30,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#CACDD1',
    marginTop: 15,
  },
  action: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 10,
    paddingBottom: 25,
  },
  text_footerD: {
    color: '#656363',
    fontSize: 18,
    paddingLeft: 15,
  },
  header:{
    width:'100%',
    height:60,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:20,
  },
  footer: {
    flex: 1,
    width: 380,
    height: 30,
    marginBottom: 15,
    marginLeft: 15,
    backgroundColor: '#fff',
    borderRadius: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 10,
},
buttonV: {
  alignItems: 'center',
  marginTop: 40,
  paddingBottom: 15,
},
buttonR: {
  alignItems: 'center',
  width: 150,
  height: 40,
  justifyContent: 'center',
  borderRadius: 10,
},
titleB: {
  color: '#05375a',
  fontSize: 20,
  fontWeight: 'bold',
},
});
export default annual;
