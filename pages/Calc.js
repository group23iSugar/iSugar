import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Image,
  Button,
  ScrollView,
  StatusBar,
  Text,
  View,
  AppRegistry,
  Navigator,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Switch,
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import LinearGradient from 'react-native-linear-gradient';
import {Picker} from '@react-native-picker/picker';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RNSearchablePicker from 'react-native-searchable-picker';
import react from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";

// var radio_props = [
//   {label: 'No', value: 0 },
//   {label: 'Yes', value: 1 }
// ];
//From DB:>
// insulin type 
// calcMethod 
// bgStart
// time of previous dose 
// ISF - ICR - target bg
// amount of prev dose

// const calc = () => {
//  useEffect(() => {
//   register();
//     }, []);

  
//   const register = async () => {

//   var type = '';
//   var unit = '';

//      try {
//        db.transaction( (tx) => {
//            tx.executeSql(
//             'INSERT INTO UserAccount (firstName, lastName, email, pass, accountType) VALUES (?,?,?,?,?)',
//               ['Mohammed', 'Alawwad', 'Mohammed@gmail.com','12341234', 'Patient Account']
//           );
         
//          //  getData();
//       })
      
//   } catch (error) {
//       console.log(error);
//   }
//   try {
//     db.transaction( (tx) => {
//       console.log('hey');
//         tx.executeSql(
//          'INSERT INTO patientprofile (DOB, weightKG, latest_HP1AC, latest_HP1AC_date, typeOfGlucoseM, glucoseLevel_unit, ketonesMeasure, insulinRegimen, ISF, targetBG_correct, startBG_correct, ISFIntervals, insulinCalcMethod, fromBG, toBG, height, diabetes_center, diagnosis_date, center_name, center_city)' 
//          +'VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
//            ['12-10-2010', '45.5', '50.5','7-8-2021', 'Fingerstick blood glucose', 'mg/dl', 'Pen', 35, , 65, 60, 0, 'ICR', 80, 85, '160.5', 'KSUMC', '12-12-2015', ]
//        );
       
    
     
      
      
//    })
   
// } catch (error) {
//    console.log(error);
// }
// try {
//   db.transaction((tx) => {
//       tx.executeSql(
//           "SELECT UserID, DOB, weightKG, latest_HP1AC, latest_HP1AC_date, typeOfGlucoseM, glucoseLevel_unit, ketonesMeasure, insulinRegimen, ISF, targetBG_correct, startBG_correct, ISFIntervals, insulinCalcMethod, fromBG, toBG, height, diabetes_center, diagnosis_date FROM patientprofile",
//           [],
//           (tx, results) => {
//             var rows = results.rows;
//             for (let i = 0; i < rows.length; i++) {
//               unit = rows.item(i).glucoseLevel_unit;
//                 console.log(unit);
//               }
//           }
//       )
//   })
// } catch (error) {
//   console.log(error);
// }
//   }



//   var a= 0;
//   var b= 0;
//   var total = 0;
//   var IOB= 0;
//   var adjustment = 1;
//   var reason;
//   const [data, setData] = react.useState({
//      bgLevel: '',
//      reasonForInsulin: '',
//      CHO: '',
//      isValidBG: true,
//      isValidCHO: true,
//      PlannedExercise: false,
//      PreviousExercise: false,
//      typeOfExercise: '',
//      duration: '',
//      time: '',
// });

// const insuCalc = () => {
//     if (type == 'Aspart' || type == 'Lispro' || type == 'Glulisine'){
//       if (bgLevel > 70){
//         if (reasonForInsulin == 'Correction'){
//           if (bgLevel > startBG){
//             a = 0;
//             b = (bgLevel - targetBG)/ISF;
//             total = a+b;
//             if (timePrevDose <= 4){
//               IOB = IOBSwitch();
//               total = total - IOB;
//             }
//             if (PlannedExercise == true){
//               adjustment = PreExercise();
//               return total = total - ( adjustment * total );
//             } else if (PreviousExercise == true){
//                 adjustment= PostExercise();
//                 return total = total - ( adjustment * total );
//             }
//           } else {
//             alert('No correction required');
//           }
//         } else {
//           if(calcMethod == 'ICR'){
//             a = CHO/ICR;
//             if (bgLevel > startBG){
//               b = (bgLevel- targetBG)/ISf;
              

//             } else {
//               b = 0;
//             }
//             total = a + b; 
//             IOB = IOBSwitch();
//             total = total - IOB;
//             if (PlannedExercise == true){
//               adjustment = PreExercise();
//               return total = total - ( adjustment * total );
//             } else if (PreviousExercise == true){
//                 adjustment= PostExercise();
//                 return total = total - ( adjustment * total );
//             }
//           } else {
//             total = slidingScale; // from database
//             IOB = IOBSwitch();
//             total = total - IOB;
//             if (PlannedExercise == true){
//               adjustment = PreExercise();
//               return total = total - ( adjustment * total );
//             } else if (PreviousExercise == true){
//                 adjustment= PostExercise();
//                 return total = total - ( adjustment * total );
//             }
//           }
         
//         }
//       } else {
//         alert('Your blood sugar is low!');
//       }
//     }else {
//       alert('Insulin is not supported in this application. Please contact your Diabetes center for instruction & recommendations for insulin bolus calculation & dose determination');
//     }
// }

// const IOBSwitch = () => {
//   var num=0;
//   switch(timePrevDose) {
//     case timePrevDose < 1:
//       num = 1 * PrevDose 
//       break;
//     case timePrevDose >= 1 && timePrevDose < 2:
//       num = 0.75 * PrevDose
//       break;
//     case timePrevDose >= 2 && timePrevDose < 3:
//       num = 0.50 * PrevDose
//       break;
//     case timePrevDose >= 3 && timePrevDose <= 4:
//       num = 0.25 * PrevDose
//       break; }
//       return num;
// }

// const PreExercise = () => {
//   var adjNum = 1;
//    if (typeOfExercise == '0'){
//      switch(duration) {
//         case duration < 15:
//          break;
//         case duration >= 15 && duration < 30:
//           adjNum = 0.25
//           break;
//         case duration >=30 && duration <= 45:
//           adjNum = 0.50
//           break;
//         case duration > 45: 
//           adjNum = 0.75
//           break;
//         case duration = 'unknown':
//           adjNum = 0.25
//           break;
//      }
//    } else if (typeOfExercise == '1'){
//      switch(duration) {
//       case duration < 15:
//        break;
//       case duration >= 15 && duration < 30:
//         break;
//       case duration >=30 && duration <= 45:
//         adjNum = 0.25
//         break;
//       case duration > 45: 
//         adjNum = 0.50
//         break;
//       case duration = 'unknown':
//         adjNum = 0.25
//         break;
//    }  
//    }
//    return adjNum;
// }


// const PostExercise = () => {
//   var adjNum = 1;
//    if (typeOfExercise == '0'){
//      switch(duration) {
//         case duration < 30:
//           adjNum = 0.25
//           break;
//         case duration >=30 && duration <= 45:
//           adjNum = 0.40
//           break;
//         case duration > 45: 
//           adjNum = 0.50
//           break;
        
//      }
//    } else if (typeOfExercise == '1'){
//      switch(duration) {
//       case duration < 30:
//         adjNum = 0.25
//         break;
//       case duration >=30 && duration <= 45:
//         adjNum = 0.30
//         break;
//       case duration > 45: 
//         adjNum = 0.40
//         break;
//      }
//    return adjNum;
// }
// }

// const timeCheck = () => {
//   var currentDate = new Date();

// }

const Calc = () => {


  const checkCalc = () =>{
    if (isValidCHO == false){
      alert('Please enter a valid Carbohydrare content');
      return;
    }


  }


  //DateTime 
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
  };
  //DateTime


// Validate the value of CHO
    const checkCHO = (val) => {
  if (isNaN(val)) {
        setData({
      ...data,
      isValidCHO: false,
    });

  } else {
       if (val < 1000 && val > 0  ){
   setData({
     ...data,
     bgLevel: val,
     isValidCHO: true,
   });
 }

}
}

//Validate the value of BG
  const checkBG = (val) => {
  if (isNaN(val)) {
        setData({
      ...data,
      isValidBG: false,
    });

  } else {
       if (val < 1000 && val > 0  ){
   setData({
     ...data,
     CHO: val,
     isValidBG: true,
   });
 }

}
}

  //Pre Switch
  const [isPreEnabled, setIsPreEnabled] = useState(false);
  const togglePreSwitch = () => setIsPreEnabled(previousState => !previousState);
  //Post Switch
  const [isPostEnabled, setIsPostEnabled] = useState(false);
  const togglePostSwitch = () => setIsPostEnabled(previousState => !previousState);
  
  const [reason, setReason] = useState('0'); //ReasonForInsulin
  const [preDuration, setPreDuration] = useState('0'); //Duration of pre exersize
  const [preTypeOfExercise, setPreTypeOfExercise] = useState('0');//reason of pre exercize
  const [postDuration, setPostDuration] = useState('0'); //Duration of post exersize
  const [postTypeOfExercise, setPostTypeOfExercise] = useState('0');//reason of post exercize
  
  var  isValidBG= true;
  var isValidCHO= true;
  var bgLevel= '';
  var CHO='';
  var time='';

  return (
    <LinearGradient colors={['#AABED8', '#fff']} style={styles.container}>
      <View style={{top: 10, alignItems: 'center'}}>
        <Image source={require('./images/logo.png')} style={styles.pic} />
      </View>
      <ScrollView style={styles.contView}>
        <Text
          style={{
            color: '#000',
            fontSize: 25,
            textAlign: 'left',
            paddingTop: 20,
            paddingLeft: 15,
          }}>
          Insulin Bolus Calculator
        </Text>

        <View style={styles.vNext}>
          <Text style={styles.inpTxt}>Current BG levet: </Text>
          <TextInput
            keyboardType="decimal-pad"
            placeholder="000.00"
            onChangeText={(val) => checkBG(val)}
            style={styles.inputT}
            />
          <Text style={{fontSize: 15, paddingTop: 15}}>mg/dl</Text>
        </View>

        <Text style={styles.inpTxt}>Reason for insulin: </Text>

        <Picker
          selectedValue={reason}
          onValueChange={value => setReason(value)}
          mode="dropdown"
          style={styles.picker}>
          <Picker.Item label="Pre-Breakfast" value="0" testID="0"></Picker.Item>
          <Picker.Item label="Pre-Lunch" value="1" testID="0"></Picker.Item>
          <Picker.Item label="Pre-Dinner" value="2" testID="0"></Picker.Item>
          <Picker.Item
            label="Pre-Daytime snack"
            value="3"
            testID="0"></Picker.Item>
          <Picker.Item
            label="Pre-Bedtime snack"
            value="4"
            testID="0"></Picker.Item>
          <Picker.Item
            label="No meal only for correction"
            value="5"
            testID="1"></Picker.Item>
        </Picker>

        <View style={styles.vNext}>
          <Text style={styles.inpTxt}>Meal carbohydrate content: </Text>
          <TextInput
            keyboardType="decimal-pad"
            placeholder="000.00 g"
            onChangeText={(val) => checkCHO(val)}
            style={styles.inputT}></TextInput>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={{fontSize: 18, textAlign: 'center'}}>
            Calculate carbohydrate in a meal
          </Text>
          <Image
            source={require('./images/carb.png')}
            style={{height: 30, width: 30}}
          />
        </TouchableOpacity>

        
          <Text style={styles.inpTxt}>
            Do you have planned exercise wihtin the upcoming 3 hours?{' '}
          </Text>
          <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isPreEnabled ? "#f4f3f4" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={togglePreSwitch}
        value={isPreEnabled}
      />
        


        <View style={{backgroundColor:'#c3d4e0', marginTop: 20}}>
        <View>
          <Text style={styles.inpTxt}>Type of exercise: </Text>
      <Picker
            selectedValue={preTypeOfExercise}
            onValueChange={value => setPreTypeOfExercise(value)}
            mode="dropdown"
            style={styles.picker}>
            <Picker.Item label="Select" value="0" testID="2"></Picker.Item>
            <Picker.Item label="Running" value="1" testID="0"></Picker.Item>
            <Picker.Item label="Swimming" value="2" testID="0"></Picker.Item>
            <Picker.Item label="Walking" value="3" testID="0"></Picker.Item>
            <Picker.Item label="Spinning" value="4" testID="0"></Picker.Item>
            <Picker.Item label="Mountain Climbing" value="5" testID="0"></Picker.Item>
            <Picker.Item label="Dancing" value="6" testID="0"></Picker.Item>
            <Picker.Item label="Kickboxing" value="7" testID="0"></Picker.Item>
            <Picker.Item label="Cross country skiing" value="8" testID="0"></Picker.Item>
            <Picker.Item label="Jumping jacks" value="9" testID="0"></Picker.Item>
            <Picker.Item label="Rowing" value="10" testID="0"></Picker.Item>
            <Picker.Item label="Martial arts" value="11" testID="0"></Picker.Item>
            <Picker.Item label="Zumba" value="12" testID="0"></Picker.Item>
            <Picker.Item label="Basketball" value="13" testID="0"></Picker.Item>
            <Picker.Item label="Trampoline-ing" value="14" testID="0"></Picker.Item>
            <Picker.Item
              label="Aerobic strength circuit"
              value="15" testID="0"></Picker.Item>
            <Picker.Item label="Cycling" value="16" testID="0"></Picker.Item>
            <Picker.Item label="Jogging" value="17" testID="0"></Picker.Item>
            <Picker.Item label="Dancing" value="18" testID="0"></Picker.Item>
            <Picker.Item
              label="Cardio exercises/ machines"
              value="19" testID="0"></Picker.Item>
            <Picker.Item
              label="Aerobic exercise classes"
              value="20" testID="0"></Picker.Item>
            <Picker.Item label="Skipping/ Jump rope" value="21" testID="0"></Picker.Item>
            <Picker.Item
              label="Stair mill /Stair stepper"
              value="22" testID="0"></Picker.Item>
            <Picker.Item label="Stationary bike" value="23" testID="0"></Picker.Item>
            <Picker.Item label="Elliptical" value="24" testID="0"></Picker.Item>
            <Picker.Item label="Skating" value="25" testID="0"></Picker.Item>
            <Picker.Item label="Tennis" value="26" testID="0"></Picker.Item>
            <Picker.Item label="Soccer" value="27" testID="0"></Picker.Item>
            <Picker.Item label="Boxing" value="28" testID="0"></Picker.Item>
            <Picker.Item label="Hula-hooping" value="29" testID="0"></Picker.Item>
            <Picker.Item
              label="Other aerobic exercise"
              value="30" testID="0"></Picker.Item>
            <Picker.Item
              label="HIIT (High Intensity Interval Training)"
              value="31" testID="1"></Picker.Item>
            <Picker.Item label="Pilates" value="32" testID="1"></Picker.Item>
            <Picker.Item
              label="Anaerobic Circuit training"
              value="33" testID="1"></Picker.Item>
            <Picker.Item label="Sprinting" value="34" testID="1"></Picker.Item>
            <Picker.Item label="Resistance exercises" value="35" testID="1"></Picker.Item>
            <Picker.Item
              label="Bodyweight exercise (e.g. push-ups, pull-ups, squats, lunges)"
              value="36" testID="1"></Picker.Item>
            <Picker.Item label="Weight lifting" value="37" testID="1"></Picker.Item>
            <Picker.Item label="Yoga" value="38" testID="1"></Picker.Item>
            <Picker.Item label="Cross-fit" value="39" testID="1"></Picker.Item>
            <Picker.Item label="Isometrics" value="40" testID="1"></Picker.Item>
            <Picker.Item label="Gymnastics" value="41" testID="1"></Picker.Item>
            <Picker.Item
              label="Other anaerobic exercise"
              value="42" testID="1"></Picker.Item>
          </Picker>

          <Text style={styles.inpTxt}>Duration of exercise: </Text>
          <Picker
            selectedValue={preDuration}
            onValueChange={value => setPreDuration(value)}
            mode="dropdown"
            style={styles.picker}>
            <Picker.Item label="Select" value="0"></Picker.Item>
            <Picker.Item label="Less than 15 minutes" value="14"></Picker.Item>
            <Picker.Item label="15 to 29 minutes" value="16"></Picker.Item>
            <Picker.Item label="30 to 45 minutes" value="31"></Picker.Item>
            <Picker.Item label="More than 45 minutes" value="46"></Picker.Item>
            <Picker.Item label="Unknown" value="Unknown"></Picker.Item>
          </Picker>
        </View>
        </View>
        

        <Text style={styles.inpTxt}>
          Did you exercise wihtin the past 6 hours?
        </Text>
         <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isPostEnabled ? "#f4f3f4" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={togglePostSwitch}
        value={isPostEnabled}
      />

        <View style={{backgroundColor:'#c3d4e0', marginTop: 20}}>
          <Text style={styles.inpTxt}>Type of exercise: </Text>
          <Picker
            selectedValue={postTypeOfExercise}
            onValueChange={value => setPostTypeOfExercise(value)}
            mode="dropdown"
            style={styles.picker}>
            <Picker.Item label="Select" value="0" testID="2"></Picker.Item>
            <Picker.Item label="Running" value="1" testID="0"></Picker.Item>
            <Picker.Item label="Swimming" value="2" testID="0"></Picker.Item>
            <Picker.Item label="Walking" value="3" testID="0"></Picker.Item>
            <Picker.Item label="Spinning" value="4" testID="0"></Picker.Item>
            <Picker.Item label="Mountain Climbing" value="5" testID="0"></Picker.Item>
            <Picker.Item label="Dancing" value="6" testID="0"></Picker.Item>
            <Picker.Item label="Kickboxing" value="7" testID="0"></Picker.Item>
            <Picker.Item label="Cross country skiing" value="8" testID="0"></Picker.Item>
            <Picker.Item label="Jumping jacks" value="9" testID="0"></Picker.Item>
            <Picker.Item label="Rowing" value="10" testID="0"></Picker.Item>
            <Picker.Item label="Martial arts" value="11" testID="0"></Picker.Item>
            <Picker.Item label="Zumba" value="12" testID="0"></Picker.Item>
            <Picker.Item label="Basketball" value="13" testID="0"></Picker.Item>
            <Picker.Item label="Trampoline-ing" value="14" testID="0"></Picker.Item>
            <Picker.Item
              label="Aerobic strength circuit"
              value="15" testID="0"></Picker.Item>
            <Picker.Item label="Cycling" value="16" testID="0"></Picker.Item>
            <Picker.Item label="Jogging" value="17" testID="0"></Picker.Item>
            <Picker.Item label="Dancing" value="18" testID="0"></Picker.Item>
            <Picker.Item
              label="Cardio exercises/ machines"
              value="19" testID="0"></Picker.Item>
            <Picker.Item
              label="Aerobic exercise classes"
              value="20" testID="0"></Picker.Item>
            <Picker.Item label="Skipping/ Jump rope" value="21" testID="0"></Picker.Item>
            <Picker.Item
              label="Stair mill /Stair stepper"
              value="22" testID="0"></Picker.Item>
            <Picker.Item label="Stationary bike" value="23" testID="0"></Picker.Item>
            <Picker.Item label="Elliptical" value="24" testID="0"></Picker.Item>
            <Picker.Item label="Skating" value="25" testID="0"></Picker.Item>
            <Picker.Item label="Tennis" value="26" testID="0"></Picker.Item>
            <Picker.Item label="Soccer" value="27" testID="0"></Picker.Item>
            <Picker.Item label="Boxing" value="28" testID="0"></Picker.Item>
            <Picker.Item label="Hula-hooping" value="29" testID="0"></Picker.Item>
            <Picker.Item
              label="Other aerobic exercise"
              value="30" testID="0"></Picker.Item>
            <Picker.Item
              label="HIIT (High Intensity Interval Training)"
              value="31" testID="1"></Picker.Item>
            <Picker.Item label="Pilates" value="32" testID="1"></Picker.Item>
            <Picker.Item
              label="Anaerobic Circuit training"
              value="33" testID="1"></Picker.Item>
            <Picker.Item label="Sprinting" value="34" testID="1"></Picker.Item>
            <Picker.Item label="Resistance exercises" value="35" testID="1"></Picker.Item>
            <Picker.Item
              label="Bodyweight exercise (e.g. push-ups, pull-ups, squats, lunges)"
              value="36" testID="1"></Picker.Item>
            <Picker.Item label="Weight lifting" value="37" testID="1"></Picker.Item>
            <Picker.Item label="Yoga" value="38" testID="1"></Picker.Item>
            <Picker.Item label="Cross-fit" value="39" testID="1"></Picker.Item>
            <Picker.Item label="Isometrics" value="40" testID="1"></Picker.Item>
            <Picker.Item label="Gymnastics" value="41" testID="1"></Picker.Item>
            <Picker.Item
              label="Other anaerobic exercise"
              value="42" testID="1"></Picker.Item>
          </Picker>

          <Text style={styles.inpTxt}>Duration of exercise: </Text>
          <Picker
            selectedValue={postDuration}
            onValueChange={value => setPostDuration(value)}
            mode="dropdown"
            style={styles.picker}>
             <Picker.Item label="Select" value="0"></Picker.Item>
            <Picker.Item label="Less than 30 minutes" value="14"></Picker.Item>
            <Picker.Item label="30 to 45 minutes" value="31"></Picker.Item>
            <Picker.Item label="More than 45 minutes" value="46"></Picker.Item>
          </Picker>

            <Text style={styles.inpTxt}>Time of exersice: </Text>
            <Button title="Set Time" onPress={showDatePicker}/>
            <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
          
        </View>

        <TouchableOpacity
          style={{
            marginTop: 30,
            paddingTop: 15,
            paddingBottom: 30,
            backgroundColor: '#6496d7',
          }}
          /*onPress={checkCalc()*/
        >
          <Text style={{fontSize: 18, textAlign: 'center'}}>Calculate</Text>
        </TouchableOpacity>

        <Text></Text>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  prefix: {
    backgroundColor: '#9c4',
  },
  text: {
    color: '#000',
    fontSize: 30,
  },
  pic: {
    width: 70,
    height: 90,
  },
  inputT: {
    //inputs field

    width: 110,
    fontSize: 16,
    shadowColor: '#000',
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

  contView: {
    //Conten's view
    backgroundColor: '#fff',
    height: 550,
    width: 360,
    alignSelf: 'center',
    top: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 7,
  },

  inpTxt: {
    //lables
    paddingLeft: 20,
    paddingTop: 15,
    fontSize: 18,
  },

  vNext: {
    // to make items next to each other
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 30,
  },

  button: {
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 10,
    width: 300,
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingLeft: 30,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.23,
    shadowRadius: 0.9,

    elevation: 3,
  },

  ddown: {
    //drop down list style

    paddingLeft: 0,
    paddingTop: 13,
    shadowColor: '#000',

    height: 40,
    width: 160,

    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.23,
    shadowRadius: 0.62,

    elevation: 2,
    backgroundColor: '#f5f5f5',
  },
});

export default Calc;
