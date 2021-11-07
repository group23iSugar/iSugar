import React, {useEffect} from 'react';
import {
  TextInput,
  useState,
  StyleSheet,
  Image,
  Button,
  ScrollView,
  StatusBar,
  Text,
  View,
  AppRegistry,
  Navigator,
  TouchableOpacity,
  ActivityIndicator,
  Switch,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Picker} from '@react-native-picker/picker';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import react from 'react';

// insulin type 
// calcMethod 
// bgStart
// time of previous dose 
// ISF - ICR - target bg
// amount of prev dose

const calc = () => {
 useEffect(() => {
  register();
    }, []);

  
  const register = async () => {

  var type = '';
  var unit = '';

     try {
       db.transaction( (tx) => {
           tx.executeSql(
            'INSERT INTO UserAccount (firstName, lastName, email, pass, accountType) VALUES (?,?,?,?,?)',
              ['Mohammed', 'Alawwad', 'Mohammed@gmail.com','12341234', 'Patient Account']
          );
         
         //  getData();
      })
      
  } catch (error) {
      console.log(error);
  }
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
try {
  db.transaction((tx) => {
      tx.executeSql(
          "SELECT UserID, DOB, weightKG, latest_HP1AC, latest_HP1AC_date, typeOfGlucoseM, glucoseLevel_unit, ketonesMeasure, insulinRegimen, ISF, targetBG_correct, startBG_correct, ISFIntervals, insulinCalcMethod, fromBG, toBG, height, diabetes_center, diagnosis_date FROM patientprofile",
          [],
          (tx, results) => {
            var rows = results.rows;
            for (let i = 0; i < rows.length; i++) {
              unit = rows.item(i).glucoseLevel_unit;
                console.log(unit);
              }
          }
      )
  })
} catch (error) {
  console.log(error);
}
  }



  var a= 0;
  var b= 0;
  var total = 0;
  var IOB= 0;
  var adjustment = 1;
  var reason;
  const [data, setData] = react.useState({
     bgLevel: '',
     reasonForInsulin: '',
     CHO: '',
     isValidBG: true,
     isValidCHO: true,
     PlannedExercise: false,
     PreviousExercise: false,
     typeOfExercise: '',
     duration: '',
     time: '',
});

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

const BGChange = (val) => {
  if (isNaN(value)) {
  if (val < 1000 && val > 0  ){
  setData({
    ...data,
    bgLevel: val,
    isValidBG: true,
  });
}
  } else {
    setData({
      ...data,
      isValidBG: false,
    });
}
}
const CHOChange = (val) => {
  if (isNaN(value)) {
  if (val < 1000 && val > 0  ){
  setData({
    ...data,
    CHO: val,
    isValidCHO: true,
  });
}
  } else {
    setData({
      ...data,
      isValidCHO: false,
    });
}
}

  return (
    <LinearGradient colors={['#AABED8', '#fff']} style={styles.container}>
      <View style={{top: 10, alignItems: 'center'}}>
        <Image source={require('../images/logo.png')} style={styles.pic} />
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
            style={styles.inputT}></TextInput>
          <Text style={{fontSize: 15, paddingTop: 15}}>mg/dl</Text>
        </View>

        <View style={styles.vNext}>
          <Text style={styles.inpTxt}>Reason for insulin: </Text>
          
        </View>

        <View style={styles.vNext}>
          <Text style={styles.inpTxt}>Meal carbohydate content: </Text>
          <TextInput
            keyboardType="number-pad"
            placeholder="0000 g"
            style={styles.inputT}></TextInput>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={{fontSize: 18, textAlign: 'center'}}>
            Calculate carbohydrate in a meal
          </Text>
          <Image
            source={require('../images/carb.png')}
            style={{height: 30, width: 30}}
          />
        </TouchableOpacity>

        <View style={styles.vNext}>
          <Text style={styles.inpTxt}>
            Do you have planned exercise wihtin the upcoming 3 hours?{' '}
          </Text>
        </View>

        <View>
          <View style={styles.vNext}>
            <Text style={styles.inpTxt}>Type of exercise: </Text>
            <Picker
              selectedValue={data.reasonForInsulin}
              // onValueChange={(value) => setCenter(value)}
              mode="dropdown"
              style={styles.picker}
              >
            <Picker.Item label= 'Running' value='0' valueIndex='0'></Picker.Item>
            <Picker.Item label= 'Swimming' value='0' valueIndex='1'></Picker.Item>
            <Picker.Item label= 'Walking' value='0' valueIndex='2'></Picker.Item>
            <Picker.Item label= 'Spinning' value='0' valueIndex='3'></Picker.Item>
            <Picker.Item label= 'Mountain Climbing' value='0' valueIndex='4'></Picker.Item>
            <Picker.Item label= 'Dancing' value='0' valueIndex='5'></Picker.Item>
            <Picker.Item label= 'Kickboxing' value='0' valueIndex='6'></Picker.Item>
            <Picker.Item label= 'Cross country skiing' value='0' valueIndex='7'></Picker.Item>
            <Picker.Item label= 'Jumping jacks' value='0' valueIndex='8'></Picker.Item>
            <Picker.Item label= 'Rowing' value='0' valueIndex='9'></Picker.Item>
            <Picker.Item label= 'Martial arts' value='0' valueIndex='10'></Picker.Item>
            <Picker.Item label= 'Zumba' value='0' valueIndex='11'></Picker.Item>
            <Picker.Item label= 'Basketball' value='0' valueIndex='12'></Picker.Item>
            <Picker.Item label= 'Trampoline-ing' value='0' valueIndex='13'></Picker.Item>
            <Picker.Item label= 'Aerobic strength circuit' value='0'  valueIndex='14'></Picker.Item>
            <Picker.Item label= 'Cycling' value='0'  valueIndex='15'></Picker.Item>
            <Picker.Item label= 'Jogging' value='0'  valueIndex='16'></Picker.Item>
            <Picker.Item label= 'Dancing' value='0' valueIndex='17'></Picker.Item>
            <Picker.Item label= 'Cardio exercises/ machines' value='0' valueIndex='18'></Picker.Item>
            <Picker.Item label= 'Aerobic exercise classes' value='0' valueIndex='19'></Picker.Item>
            <Picker.Item label= 'Skipping/ Jump rope' value='0' valueIndex='20'></Picker.Item>
            <Picker.Item label= 'Stair mill /Stair stepper' value='0' valueIndex='21'></Picker.Item>
            <Picker.Item label= 'Stationary bike' value='0' valueIndex='22'></Picker.Item>
            <Picker.Item label= 'Elliptical' value='0' valueIndex='23'></Picker.Item>
            <Picker.Item label= 'Skating' value='0' valueIndex='24'></Picker.Item>
            <Picker.Item label= 'Tennis' value='0' valueIndex='25'></Picker.Item>
            <Picker.Item label= 'Soccer' value='0'  valueIndex='26'></Picker.Item>
            <Picker.Item label= 'Boxing' value='0'  valueIndex='27'></Picker.Item>
            <Picker.Item label= 'Hula-hooping' value='0'  valueIndex='28'></Picker.Item>
            <Picker.Item label= 'Other aerobic exercise' value='0'  valueIndex='29'></Picker.Item>


        </Picker>
            {/* <ModalDropdown
              style={styles.ddown}
              options={[
                'Running',
                'Swimming',
                'Walking',
                'Spinning',
                'Mountain Climbing',
                'Dancing',
                'Kickboxing',
                'Cross country skiing',
                'Jumping jacks',
                'Rowing',
                'Martial arts',
                'Zumba',
                'Basketball',
                'Trampoline-ing',
                'Aerobic strength circuit',
                'Cycling',
                'Jogging',
                'Cardio exercises/ machines',
                'Aerobic exercise classes',
                'Skipping/ Jump rope',
                'Stair mill /Stair stepper',
                'Stationary bike',
                'Elliptical',
                'Plyometrics',
                'Skating',
                'Tennis',
                'Soccer',
                'Boxing',
                'Hula-hooping',
                'Other aerobic exercise',
                'HIIT (High Intensity Interval Training)',
                'Pilates',
                'Anaerobic Circuit training',
                'Sprinting',
                'Resistance exercises',
                'Bodyweight exercise (e.g. push-ups, pull-ups, squats, lunges)',
                'Weight lifting',
                'Yoga',
                'Cross-fit',
                'Isometrics',
                'Gymnastics',
                'Other anaerobic exercise',
              ]}
              defaultValue="----------------"
            /> */}
          </View>

          <View style={styles.vNext}>
            <Text style={styles.inpTxt}>Duration of exercise: </Text>
            {/* <ModalDropdown
              style={styles.ddown}
              options={[
                'Less than 15 minutes',
                '15 to 29 minutes',
                '30 to 45 minutes',
                'More than 45 minutes',
                'Unknown',
              ]}
              defaultValue="Unknown"
            /> */}
          </View>
        </View>

        <View style={styles.vNext}>
          <Text style={styles.inpTxt}>
            Did you exercise wihtin the past 6 hours?
          </Text>
        </View>

        <View style={{paddingBottom:30}}>
          <View style={styles.vNext}>
            <Text style={styles.inpTxt}>Type of exercise: </Text>
            {/* <ModalDropdown
              style={styles.ddown}
              options={[
                'Running',
                'Swimming',
                'Walking',
                'Spinning',
                'Mountain Climbing',
                'Dancing',
                'Kickboxing',
                'Cross country skiing',
                'Jumping jacks',
                'Rowing',
                'Martial arts',
                'Zumba',
                'Basketball',
                'Trampoline-ing',
                'Aerobic strength circuit',
                'Cycling',
                'Jogging',
                'Cardio exercises/ machines',
                'Aerobic exercise classes',
                'Skipping/ Jump rope',
                'Stair mill /Stair stepper',
                'Stationary bike',
                'Elliptical',
                'Plyometrics',
                'Skating',
                'Tennis',
                'Soccer',
                'Boxing',
                'Hula-hooping',
                'Other aerobic exercise',
                'HIIT (High Intensity Interval Training)',
                'Pilates',
                'Anaerobic Circuit training',
                'Sprinting',
                'Resistance exercises',
                'Bodyweight exercise (e.g. push-ups, pull-ups, squats, lunges)',
                'Weight lifting',
                'Yoga',
                'Cross-fit',
                'Isometrics',
                'Gymnastics',
                'Other anaerobic exercise',

              ]}
              defaultValue="----------------"
            /> */}
          </View>

          <View style={styles.vNext}>
            <Text style={styles.inpTxt}>Duration of exercise: </Text>
            {/* <ModalDropdown
              style={styles.ddown}
              options={[
                'Less than 30 minutes',
                '30 to 45 minutes',
                'More than 45 minutes',
              ]}
              defaultValue="Unknown"
            /> */}
          </View>

          <View style={styles.vNext}>
          <Text style={styles.inpTxt}>Time of exersice: </Text>
          </View>
        </View>

  
        <TouchableOpacity style={{paddingTop:30, paddingBottom: 30, backgroundColor: '#6496d7'}}>
          <Text style={{fontSize: 18, textAlign: 'center'}}>
            Calculate
          </Text>

        </TouchableOpacity>

              <Text>
             
              
               
                
        </Text>



      </ScrollView>
    </LinearGradient>
  );
}

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
  picker: {
    width: 150,
    borderBottomWidth: 1,
    borderBottomColor: '#4c4c4c',
    
  },
});

export default calc;
