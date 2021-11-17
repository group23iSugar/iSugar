import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Image,
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Switch,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';


// var radio_props = [
//   {label: 'No', value: 0 },
//   {label: 'Yes', value: 1 }
// ];

const Calc = () => {
  useEffect(() => {
    retrieve();
      }, []);

  const checkCalc = () =>{
    if (isValidCHO == false){
      alert('Please enter a valid Carbohydrare content');
      return;
    }


  }


  //DateTime 
  

// Validate the value of CHO
    const checkCHO = (val) => {
  if (isNaN(val)) {
        setCHO({
      ...CHO,
      isValidCHO: false,
    });

  } else {
       if (val < 1000 && val > 0  ){
   setCHO({
     ...CHO,
     isValidCHO: true,
   });
 }

}
}

//Validate the value of BG
  const checkBG = (val) => {
  if (isNaN(val)) {
        setbgLevel({
      ...bgLevel,
      isValidBG: false,
    });

  } else {
       if (val < 1000 && val > 0  ){
   setbgLevel({
     ...bgLevel,
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
  
  const [bgLevel, setbgLevel] = useState(0);
  const [CHO, setCHO] = useState(0);
  var  isValidBG= true;
  var isValidCHO= true;
//--------------------------------------------
  var time='';
  var insulinType = '';
  var calcMethod = '';
  var startBG = 0;
  var targetBG =0;
  var timePrevDose = -1;
  var doseAmount = -1;
  var ISF = 0;
  var ICR = 0;
//--------------Queries-------------------
// ICR -ISF - PATIENT PROFILE - 
const retrieve = () => {
// patient profile table
  try {
    db.transaction( (tx) => {
        tx.executeSql(
          'SELECT UserID, ISF, targetBG_correct, startBG_correct, insulinCalcMethod, insulinRegimen  FROM patientprofile',
          [],
          (tx, results) => {
            var rows = results.rows;
            for (let i = 0; i < rows.length; i++) {
              calcMethod = rows.item(i).insulinCalcMethod;
              startBG = rows.item(i).startBG_correct;
              targetBG = rows.item(i).targetBG_correct;
              ISF = rows.item(i).ISF;
              var userid = rows.item(i).UserID;
                if (uID == userid){
                 console.log(calcMethod +' - '+startBG+' - '+targetBG+' - '+ISF+' - '+uID);
                  return;
                }
              }
          }   
) 
    

}  ) 
} catch (error) {
   console.log(error);
}
// ISF table
// try {
//   db.transaction( (tx) => {
//       tx.executeSql(
//         'SELECT UserID, ICR, fromTime, toTime FROM icrInterval',
//         [],
//         (tx, results) => {
//           var rows = results.rows;
//           for (let i = 0; i < rows.length; i++) {
//             var userid = rows.item(i).UserID;
//               if (uID == userid){
//                 if (currentTime(rows.item(i).fromTime, rows.item(i).toTime))
//                 console.log('ppppp');
//               }
//             }
//         }   
// ) 
  

// }  ) 
// } catch (error) {
//  console.log(error);
// }
}
const currentTime = (from, to) => {
  var nowDate  = new Date();
  var nowTime = moment.utc(nowDate).format('h:mm a'); // 11:40 PM
  var date_a = moment(from, "h:mm a");
  var date_b = moment(to, "h:mm a");
  if (nowTime >= date_a && nowTime <= date_b){
    console.log('Hi');
      return true;
  }
  else
  return false;
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
          {/* <Image
            source={require('./images/carb.png')}
            style={{height: 30, width: 30}}
          /> */}
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
        disabled={isPostEnabled}
      />
        

        { isPreEnabled ? (
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
        ) : null}
        

        <Text style={styles.inpTxt}>
          Did you exercise wihtin the past 6 hours?
        </Text>
         <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isPostEnabled ? "#f4f3f4" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={togglePostSwitch}
        value={isPostEnabled}
        disabled={isPreEnabled}
        
      />
         { isPostEnabled ? (
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
          
          
        </View>
        ) : null}

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
