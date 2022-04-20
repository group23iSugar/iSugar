/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable semi */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */


import React, {useState, useEffect} from 'react';
import react from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TextInput,
  Platform,
  TouchableOpacity,
  Image,
  Dimensions,
  alert,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import {Picker} from '@react-native-picker/picker';
import moment from 'moment';
import PushNotification from 'react-native-push-notification';
import SQLite from 'react-native-sqlite-storage';


global.db = SQLite.openDatabase(
  {
    name: 'iSugear.db',
    location: 'Library',
  },
  () => {
    console.log('Success');
  },
  error => {
    console.log('ERROR: ' + error);
  },
);


const exercise3 = ({navigation}) => {

  var onlinUserID = 15;
  var uID = 15;

  const [TypeOfExercise, setTypeOfExercise] = useState('0'); //reason of post exercize
  const [currentBG, setCurrentBG] = useState('0');//for current BG level
  const [instruction, setInstruction] = useState('');//to set an appropriate instructions for current BG and exercise type
  const [instruction2, setInstruction2] = useState('');//to set an appropriate instructions for current BG and exercise type
  const [ketones, setKetones] = useState('');//for ketones if your BG level is > 250
  const [blood, setBlood] = useState('-1');//for ketones type if your BG level is > 250
  const [urine, setUrine] = useState('-1');//for ketones type if your BG level is > 250

  var takenInsulin = 0;
  var currentTaken = -1;
  var isPlanned = -1;
  var weight = 0;
  var curDate = moment().format('YYYY-MM-DD');
  var curTime = moment().format('HH:mm:ss');
  var gram1 = 0;
  var gram2 = 0;
  var correction = '';
  var sum = '';
  var level = '';

  const [ReData1, setReData1] = useState({
    interval: 0,
    startBG: 0,
    targetBG: 0,
    ISF: 0,
  });

  const [ReData2, setReData2] = useState({
    insulinType: '',
    insulinReg: '',
  });

  const [ReData3, setReData3] = useState({
    dose: '',
    hours: '',
  });

  var curHour = new Date().getHours();//current
  var IOB = 0;
  var IOBTimeRange = 4;

  useEffect(() => {
    FirstRetrieve();
    insulinB();
    calculateIOB();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

  const checkExercise = () => {
    checkIsPlanned();

//    Calc.checkISFIntervals();
if (TypeOfExercise == '0'){
  Alert.alert('من فضل قم باختيار نوع التمارين');

} else if (TypeOfExercise == 'الجري' || TypeOfExercise == 'السباحة' || TypeOfExercise == 'المشي' || TypeOfExercise == 'ركوب الدراجة الثابتة (الدوران السريع)' || TypeOfExercise == 'تسلق الجبال' || TypeOfExercise == 'الكيك بوكسينغ' || TypeOfExercise == 'التزلج على الثلج' || TypeOfExercise == 'تمارين القفز' || TypeOfExercise == 'الفنون القتالية' || TypeOfExercise == 'كرة السلة'
|| TypeOfExercise == 'القفز على النطيطة' || TypeOfExercise == 'تمارين التقوية الهوائية المتتابعة' || TypeOfExercise == 'ركوب الدراجة' || TypeOfExercise == 'الهرولة' || TypeOfExercise == 'تمارين الكارديو/ أجهزة تمارين الكارديو' || TypeOfExercise == 'دروس التمارين الهوائية – تمارين الأيروبك' || TypeOfExercise == 'القفز بحبل القفز' || TypeOfExercise == 'صعود الدرج (جهاز الدرج)' || TypeOfExercise == 'ركوب الدراجة الثابتة' || TypeOfExercise == 'جهاز الاليبتكال'
|| TypeOfExercise == 'بليومتريك' || TypeOfExercise == 'التزلج' || TypeOfExercise == 'كرة المضرب' || TypeOfExercise == 'كرة القدم' || TypeOfExercise == 'الملاكمة' || TypeOfExercise == 'اللعب بحلقة الهولا هوب' || TypeOfExercise == 'رياضة/تمارين هوائية أخرى' || TypeOfExercise == 'الرقص' || TypeOfExercise == 'التجديف' || TypeOfExercise == 'رقص الزومبا' ){

  if (currentBG < 70){
  console.log('less than 70');
  setInstruction('لا تقم بعمل التمارين، عالج نقص سكر الدم (انخفاض مستوى الجلوكوز في الدم) ');

} else if (currentBG >= 70 && currentBG < 90){
  console.log('between 70 and  90');
if (takenInsulin > 0 && currentTaken == 1 && isPlanned == 1){
  gram1 = 15;
  console.log(gram1 + '-' + gram2);
  sum = gram1 + '-' + gram2;
  console.log(sum);
  setInstruction('خذ ' + gram1 + ' جرام من الكربوهيدرات الآن و قم بإعادة فحص مستوى الجلوكوز في الدم بعد 15 دقيقة، ولا تقم بعمل التمارين في حال كان مستوى الجلوكوز في الدم أقل من 90 مج/دل؛ وذلك لخطورة حدوث نفص سكر الدم');
  handleScheduleNotification('السُّكر','حان الوقت لإعادة فحص مستوى الجلوكوز في الدم', 15);
} else {
  if (weight > 0 && weight < 60){
    gram1 = weight * 1;
    gram2 = weight * 1.5;
    console.log(gram1 + '-' + gram2);
    sum = gram1 + '-' + gram2;
    console.log(sum);
    setInstruction('خذ ' + gram1 + ' جرام من الكربوهيدرات الآن و قم بإعادة فحص مستوى الجلوكوز في الدم بعد 15 دقيقة، ولا تقم بعمل التمارين في حال كان مستوى الجلوكوز في الدم أقل من 90 مج/دل؛ وذلك لخطورة حدوث نفص سكر الدم');
  handleScheduleNotification('السُّكر','حان الوقت لإعادة فحص مستوى الجلوكوز في الدم', 15);
  }
  else if (weight >= 60){
    gram1 = 60;
    gram2 = 90;
    console.log(gram1 + '-' + gram2);
    sum = gram1 + '-' + gram2;
    console.log(sum);
    setInstruction('خذ ' + gram1 + ' جرام من الكربوهيدرات الآن و قم بإعادة فحص مستوى الجلوكوز في الدم بعد 15 دقيقة، ولا تقم بعمل التمارين في حال كان مستوى الجلوكوز في الدم أقل من 90 مج/دل؛ وذلك لخطورة حدوث نفص سكر الدم');
    handleScheduleNotification('السُّكر','حان الوقت لإعادة فحص مستوى الجلوكوز في الدم', 15);
  }
}


} else if (currentBG >= 90 && currentBG < 126){
  console.log('between 90 and 126');
  if (takenInsulin > 0 && currentTaken == 1 && isPlanned == 1){
    gram1 = 15;
    console.log(gram1 + '-' + gram2);
    sum = gram1 + '-' + gram2;
    console.log(sum);
    setInstruction('خذ ' + gram1 + ' جرام من الكربوهيدرات الآن و قم بإعادة فحص مستوى الجلوكوز في الدم بعد 30 دقيقة، ولا تقم بعمل التمارين في حال كان مستوى الجلوكوز في الدم أقل من 90 مج/دل؛ وذلك لخطورة حدوث نفص سكر الدم');
    handleScheduleNotification('السُّكر','حان الوقت لإعادة فحص مستوى الجلوكوز في الدم', 30);
  } else {
    if (weight > 0 && weight < 60){
      gram1 = weight * 1;
      gram2 = weight * 1.5;
      console.log(gram1 + '-' + gram2);
      sum = gram1 + '-' + gram2;
      console.log(sum);
      setInstruction('خذ ' + gram1 + ' جرام من الكربوهيدرات الآن و قم بإعادة فحص مستوى الجلوكوز في الدم بعد 30 دقيقة، ولا تقم بعمل التمارين في حال كان مستوى الجلوكوز في الدم أقل من 90 مج/دل؛ وذلك لخطورة حدوث نفص سكر الدم');
    handleScheduleNotification('السُّكر','حان الوقت لإعادة فحص مستوى الجلوكوز في الدم', 30);
    }
    else if (weight >= 60){
      gram1 = 60;
      gram2 = 90;
      console.log(gram1 + '-' + gram2);
      sum = gram1 + '-' + gram2;
      console.log(sum);
      setInstruction('خذ ' + gram1 + ' جرام من الكربوهيدرات الآن و قم بإعادة فحص مستوى الجلوكوز في الدم بعد 30 دقيقة، ولا تقم بعمل التمارين في حال كان مستوى الجلوكوز في الدم أقل من 90 مج/دل؛ وذلك لخطورة حدوث نفص سكر الدم');
      handleScheduleNotification('السُّكر','حان الوقت لإعادة فحص مستوى الجلوكوز في الدم', 30);
    }
  }
}  else if (currentBG >= 126 && currentBG < 250){
  console.log('between 126 and 250');
  setInstruction('بإمكانك البدأ في القيام بعمل التمارين و قم بإعادة حساب  مستوى الجلوكوز في الدم كل 30 دقيقة خلال فترة قيامك بالتمارين أو عاجلا إذا كان لديك أعراض انخفاض أو ارتفاع مستوى الجلوكوز في الدم )');
  handleScheduleNotification('السُّكر','حان الوقت لإعادة فحص مستوى الجلوكوز في الدم', 30);
} else if (currentBG >= 250) {
  console.log('greater than 250');
  if ( blood > 0.6 || urine == 'Small' || urine == 'Moderate' || urine == 'Large'){
    console.log('option 1');
    setInstruction2('لا تقم بعمل التمارين و تناول المزيد من الأنسولين من أجل حالة الكيتونات');
          } else if (blood < 0.6 || urine == 'Negative' || urine == 'Trace'){
      console.log('option 2');
      if (ReData2.insulinReg == 'Pen' && (ReData2.insulinType == 'Aspart' ||
      ReData2.insulinType == 'Lispro' ||
      ReData2.insulinType == 'Glulisine')) {
        if (currentBG > ReData1.startBG){
        console.log('insulin B = ' + ((currentBG - ReData1.targetBG) / ReData1.ISF));
      }}
      var diff = curHour - ReData3.hours;
      if (diff <= IOBTimeRange) {
        var num = 0;
        console.log('check1');
        if (diff < 1) {
          num = 1 * ReData3.dose;
           console.log('check2');
        } else if (diff >= 1 && diff < 2) {
          num = 0.75 * ReData3.dose;
           console.log('check3');
        } else if (diff >= 2 && diff < 3) {
          num = 0.5 * ReData3.dose;
           console.log('check4');
        } else if (diff >= 3 && diff <= 4) {
          num = 0.25 * ReData3.dose;
           console.log('check5');
      }
      correction = ((currentBG - ReData1.targetBG) / ReData1.ISF) - num;
    }
      setInstruction2('خذ ' + correction + ' وحدة من ' +  ReData2.insulinType  + ' الأنسولين و لا تقم بالتمارين الآن، بإمكانك القيام بالتمارين بعد 3-4 ساعات بمجرد أن يصبح مستوى الجلوكوز في الدم صحيح');
   }
}//end all cureent BG cases
}//end aerobic

else {
  if (currentBG < 70){
    console.log('less than 70');
    setInstruction('لا تقم بعمل التمارين، عالج نقص سكر الدم (انخفاض مستوى الجلوكوز في الدم) ');

  } else if (currentBG >= 70 && currentBG < 90){
    console.log('between 70 and  90');
    if (takenInsulin > 0 && currentTaken == 1 && isPlanned == 1){
      gram1 = 15;
      console.log(gram1 + '-' + gram2);
      sum = gram1 + '-' + gram2;
      console.log(sum);
      setInstruction('خذ ' + gram1 + ' جرام من الكربوهيدرات الآن و قم بإعادة فحص مستوى الجلوكوز في الدم بعد 15 دقيقة، ولا تقم بعمل التمارين في حال كان مستوى الجلوكوز في الدم أقل من 90 مج/دل؛ وذلك لخطورة حدوث نفص سكر الدم');
  handleScheduleNotification('السُّكر','حان الوقت لإعادة فحص مستوى الجلوكوز في الدم', 15);
    } else {
      if (weight > 0 && weight < 60){
        gram1 = weight * 1;
        gram2 = weight * 1.5;
        console.log(gram1 + '-' + gram2);
        sum = gram1 + '-' + gram2;
        console.log(sum);
        setInstruction('خذ ' + gram1 + ' جرام من الكربوهيدرات الآن و قم بإعادة فحص مستوى الجلوكوز في الدم بعد 15 دقيقة، ولا تقم بعمل التمارين في حال كان مستوى الجلوكوز في الدم أقل من 90 مج/دل؛ وذلك لخطورة حدوث نفص سكر الدم');
        handleScheduleNotification('السُّكر','حان الوقت لإعادة فحص مستوى الجلوكوز في الدم', 15);
      }
      else if (weight >= 60){
        gram1 = 60;
      gram2 = 90;
      console.log(gram1 + '-' + gram2);
      sum = gram1 + '-' + gram2;
      console.log(sum);
      setInstruction('خذ ' + gram1 + ' جرام من الكربوهيدرات الآن و قم بإعادة فحص مستوى الجلوكوز في الدم بعد 15 دقيقة، ولا تقم بعمل التمارين في حال كان مستوى الجلوكوز في الدم أقل من 90 مج/دل؛ وذلك لخطورة حدوث نفص سكر الدم');
  handleScheduleNotification('السُّكر','حان الوقت لإعادة فحص مستوى الجلوكوز في الدم', 15);
    }
    }
  } else if (currentBG >= 90 && currentBG < 250){
    console.log('between 90 and 250');
    setInstruction('خذ ' + gram1 + ' جرام من الكربوهيدرات الآن و قم بإعادة فحص مستوى الجلوكوز في الدم بعد 30 دقيقة، ولا تقم بعمل التمارين في حال كان مستوى الجلوكوز في الدم أقل من 90 مج/دل؛ وذلك لخطورة حدوث نفص سكر الدم');
  handleScheduleNotification('السُّكر','حان الوقت لإعادة فحص مستوى الجلوكوز في الدم', 30);
  } else if (currentBG >= 250) {
    console.log('greater than 250');
    if ( blood > 0.6 || urine == 'Small' || urine == 'Moderate' || urine == 'Large'){
      console.log('option 1');
      setInstruction2('لا تقم بعمل التمارين و تناول المزيد من الأنسولين من أجل حالة الكيتونات');
            } else if (blood < 0.6 || urine == 'Negative' || urine == 'Trace'){
              console.log('option 2');
              if (ReData2.insulinReg == 'Pen' && (ReData2.insulinType == 'Aspart' ||
              ReData2.insulinType == 'Lispro' ||
              ReData2.insulinType == 'Glulisine')) {
                if (currentBG > ReData1.startBG){
                console.log('insulin B = ' + ((currentBG - ReData1.targetBG) / ReData1.ISF));
              }}
              var diff = curHour - ReData3.hours;
              if (diff <= IOBTimeRange) {
                var num = 0;
                console.log('check1');
                if (diff < 1) {
                  num = 1 * ReData3.dose;
                   console.log('check2');
                } else if (diff >= 1 && diff < 2) {
                  num = 0.75 * ReData3.dose;
                   console.log('check3');
                } else if (diff >= 2 && diff < 3) {
                  num = 0.5 * ReData3.dose;
                   console.log('check4');
                } else if (diff >= 3 && diff <= 4) {
                  num = 0.25 * ReData3.dose;
                   console.log('check5');
              }
              correction = ((currentBG - ReData1.targetBG) / ReData1.ISF) - num;
            }
            setInstruction2('خذ ' + correction + ' وحدة من ' +  ReData2.insulinType  + ' الأنسولين و لا تقم بالتمارين الآن، بإمكانك القيام بالتمارين بعد 3-4 ساعات بمجرد أن يصبح مستوى الجلوكوز في الدم صحيح');
          }
  }//end all cureent BG cases
}//end Anaerobic
if (blood != '-1'){
level = blood;
console.log('level:' + level);
}
else if (urine != '-1'){
  level = urine;
  console.log('level:' + level);
  }
  saveInstruction();
  saveBGLevel();
  insert();
  };

//==============for notification=============================
const handleScheduleNotification = (title, message, time) => {
  PushNotification.localNotificationSchedule({
      channelId: 'channel-id',
      title: title,
      message: message,
      date: new Date(Date.now() + (time * 60 * 1000)),
      allowWhileIdle: true,
  });
  };

  const FirstRetrieve = () => {
    var interval = -1;
    console.log('in first');
    try {
      db.transaction(tx => {
        // insulinRegimen, ISFIntervals, insulinCalcMethod Retrive
        tx.executeSql(
          'SELECT UserID, insulinRegimen, ISFIntervals FROM patientprofile',
          [],
          // eslint-disable-next-line no-shadow
          (tx, results) => {
            var rows = results.rows;
            console.log('YES');
            for (let i = 0; i < rows.length; i++) {
              var UID = rows.item(i).UserID;
              if (UID == 3) {
                console.log('in if (user is found)');
                interval = rows.item(i).ISFIntervals; //boolean 0 or 1
                console.log('interval is: ' + interval);
                setInterval(interval);
                var insulinR = rows.item(i).insulinRegimen; // pen , pump , etc..
                console.log(insulinR);
                setReg(insulinR);
                //----------------
                //  console.log(interval+' intervals before calling');
                //   console.log(calcM+' method for calc');
                // callback(interval);
                // callback2(calcM);
                return;
              }
            }
          },
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

//-----------------------------DATABASE----------------------------------------------------
const checkIsPlanned = () => {
  console.log('in DB of taken insulin and planned exercise');
  // eslint-disable-next-line quotes
  var InsertAPIURL = "http://192.168.56.1/iSugar/checkPlannedExercise.php";   //API to  signup

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
     console.log(response[0].flag);

 if (response[0].flag == 'true'){
  // if (onlinUserID != '0'){
      console.log(response[0].userID);
     takenInsulin = response[0].takenInslin;
      console.log(response[0].takenInslin);
     currentTaken = response[0].currentTaken;
       console.log(response[0].currentTaken);
     isPlanned = response[0].currentPlanned;
       console.log(response[0].currentPlanned);
        console.log('inside recheck: ');
 //}
 console.log(onlinUserID + '-' + takenInsulin + '-' + currentTaken + '-' + isPlanned);
 checkWeight();
 }
 console.log('inside onlineDB: ');
})
.catch((error)=>{
    alert('Error Occured' + error);
})

}

const checkWeight = () => {
  console.log('in DB of weight');
  // eslint-disable-next-line quotes
  var InsertAPIURL = "http://192.168.56.1/iSugar/checkWeight.php";   //API to  signup

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
     console.log(response[0].flag);

 if (response[0].flag == 'true'){
  // if (onlinUserID != '0'){
      console.log(response[0].userID);
      weight = response[0].weight_KG;
      console.log(response[0].weight_KG);
        console.log('inside recheck2: ');
 //}
 console.log(onlinUserID + '-' + weight);
 }
 console.log('inside onlineDB2: ');
})
.catch((error)=>{
    alert('Error Occured' + error);
})

}

const saveInstruction = () => {
  console.log('in DB of Saving information');
  // eslint-disable-next-line quotes
  var InsertAPIURL = "http://192.168.56.1/iSugar/ExerciseRecord.php";   //API to  signup

  var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };
  var Data = {
    UserID: onlinUserID,
    recordDate: curDate,
    recordTime:curTime,
    exerciseType: TypeOfExercise,
    suggestedCorrectionDose: correction,
    ketonesSource: ketones,
    ketonesLevel: level,
    suggestCarbs: sum,
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
     console.log(response[0].flag);
})
.catch((error)=>{
    alert('Error Occured' + error);
})
}

const saveBGLevel = () => {
  console.log('in DB of Saving information');
  // eslint-disable-next-line quotes
  var InsertAPIURL = "http://192.168.56.1/iSugar/BGLevel.php";   //API to  signup

  var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };
  var Data = {
    UserID: onlinUserID,
    BGLevel: currentBG,
    BGLevelDate: curDate,
    BGLevelTime:curTime,
  };

// FETCH func ------------------------------------
fetch(InsertAPIURL,{
    method:'POST',
    headers:headers,
    body: JSON.stringify(Data),//convert data to JSON
})
.then((response)=>response.json()) //check response type of API (CHECK OUTPUT OF DATA IS IN JSON)
.then((response)=>{
})
.catch((error)=>{
    alert('Error Occured' + error);
})
}

const insulinB = () => {
  console.log('in DB to find insulin B');
  // eslint-disable-next-line quotes
  var InsertAPIURL = "http://192.168.56.1/iSugar/checkInsuB.php";   //API to  signup

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
     console.log(response[0].flag);
     console.log(response[0].flag2);

 if (response[0].flag == 'true' && response[0].flag2 == 'true'){
   ReData2.insulinReg = response[0].insulinReg;
   console.log('Regimen: ' + response[0].insulinReg);
   ReData2.insulinType = response[0].insulinType;
   console.log('Type: ' + response[0].insulinType);
   ReData1.interval = response[0].isfInterval;
   console.log('ISF interval: ' + response[0].isfInterval);
      ReData1.ISF = response[0].isf;
      console.log('ISF: ' + response[0].isf);
      ReData1.startBG = response[0].startBG;
      console.log('startBG: ' + response[0].startBG);
      ReData1.targetBG = response[0].targetBG;
      console.log('targetBG: ' + response[0].targetBG);

        console.log('inside recheck: ');
 }
 console.log('inside onlineDB: ');
})
.catch((error)=>{
    alert('Error Occured' + error);
})

}

const calculateIOB = () => {
  console.log('in DB to find IOB');
  // eslint-disable-next-line quotes
  var InsertAPIURL = "http://192.168.56.1/iSugar/checkIOB.php";   //API to  signup

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
     console.log(response[0].flag);

 if (response[0].flag == 'true'){
   ReData3.hours = response[0].hours;
   console.log('Hours: ' + response[0].hours);
   ReData3.dose = response[0].dose;
   console.log('dose: ' + response[0].dose);
        console.log('inside IOB: ');
 }
 console.log('inside onlineDB: ');
})
.catch((error)=>{
    alert('Error Occured' + error);
})

}
//---insert users-----========================= Withtin-APP DATABASE ***********************

const insert = async () => {

 //------------ BG LEVEL -------------------

    console.log(uID + ' - ' + currentBG + ' - ' + curDate + ' - ' + curTime);
    try {
     db.transaction( (tx) => {
         tx.executeSql(
          'INSERT INTO BGLevel (UserID, BGLevel, bglevelDate, bglevelTime) VALUES (?,?,?,?)',
            [uID, currentBG, curDate, curTime]
        );
    })

} catch (error) {
    console.log(error);
}

//----------------EXERCISE RECORD------------------
  console.log(uID + ' - ' + curDate + ' - ' + curTime + ' - ' + TypeOfExercise + ' - ' + correction + ' - ' + level + ' - ' + ketones + ' - ' + sum);
    try {
     db.transaction( (tx) => {
         tx.executeSql(
          'INSERT INTO exerciseRecords (UserID, recordDate, recordTime, exerciseType, suggestedCorrectionDose, ketonesLevel, ketonesSource, suggestCarbs) VALUES (?,?,?,?,?,?,?,?)',
            [uID, curDate, curTime, TypeOfExercise, correction, level, ketones, sum]
        );
    })

} catch (error) {
    console.log(error);
}

if (currentBG >= 70 && currentBG < 250){
  console.log(uID + ' - ' + curDate + ' - ' + curTime);
  try {
   db.transaction( (tx) => {
       tx.executeSql(
        'INSERT INTO exRecheckNotification (UserID, recheckDate, recheckTime) VALUES (?,?,?)',
          [uID, curDate, curTime]
      );
  })

} catch (error) {
  console.log(error);
}
}
}
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
            paddingLeft: 15,
          }}>
       التمارين
        </Text>
         </View>
      </View>
          <View style={styles.footer}>
           <View>
           <ScrollView>
             <View style={{marginTop: 25, flexDirection: 'row'}}>
            <Text style={styles.inpTxt}>نوع التمارين: </Text>
            <Picker
            itemStyle={{color: 'black'}}
              selectedValue={TypeOfExercise}
              onValueChange={(value, index) => setTypeOfExercise(value, index)}
              mode="dropdown"
              style={styles.picker}>

              <Picker.Item label="الجري" value="1" testID="0" />
                <Picker.Item
                  label="السباحة"
                  value="2"
                  testID="0" />
                <Picker.Item label="المشي" value="3" testID="0" />
                <Picker.Item
                  label="ركوب الدراجة الثابتة (الدوران السريع)"
                  value="4"
                  testID="0" />
                <Picker.Item
                  label="تسلق الجبال"
                  value="5"
                  testID="0" />
                <Picker.Item label="الرقص" value="6" testID="0" />
                <Picker.Item
                  label="الكيك بوكسينغ
                  Kickboxing"
                  value="7"
                  testID="0" />
                <Picker.Item
                  label="التزلج على الثلج"
                  value="8"
                  testID="0" />
                <Picker.Item
                  label="تمارين القفز
                  Jumping jacks"
                  value="9"
                  testID="0" />
                <Picker.Item label="التجديف" value="10" testID="0" />
                <Picker.Item
                  label="الفنون القتالية"
                  value="11"
                  testID="0" />
                <Picker.Item label="رقص الزومبا" value="12" testID="0" />
                <Picker.Item
                  label="كرة السلة"
                  value="13"
                  testID="0" />
                <Picker.Item
                  label="القفز على النطيطة"
                  value="14"
                  testID="0" />
                <Picker.Item
                  label="تمارين التقوية الهوائية المتتابعة"
                  value="15"
                  testID="0" />
                <Picker.Item
                  label="ركوب الدراجة"
                  value="16"
                  testID="0" />
                <Picker.Item
                  label="الهرولة"
                  value="17"
                  testID="0" />
                <Picker.Item
                  label="تمارين الكارديو/ أجهزة تمارين الكارديو"
                  value="19"
                  testID="0" />
                <Picker.Item
                  label="دروس التمارين الهوائية – تمارين الأيروبك"
                  value="20"
                  testID="0" />
                <Picker.Item
                  label="القفز بحبل القفز
                  Jump rope
                  "
                  value="21"
                  testID="0" />
                <Picker.Item
                  label="صعود الدرج (جهاز الدرج)"
                  value="22"
                  testID="0" />
                <Picker.Item
                  label="ركوب الدراجة الثابتة"
                  value="23"
                  testID="0" />
                <Picker.Item
                  label="جهاز الاليبتكال"
                  value="24"
                  testID="0" />
                <Picker.Item
                  label="التزلج"
                  value="25"
                  testID="0" />
                <Picker.Item label="كرة المضرب" value="26" testID="0" />
                <Picker.Item label="كرة القدم" value="27" testID="0" />
                <Picker.Item label="الملاكمة" value="28" testID="0" />
                <Picker.Item
                  label="اللعب بحلقة الهولا هوب"
                  value="29"
                  testID="0" />
                <Picker.Item
                  label="رياضة/تمارين هوائية أخرى"
                  value="30"
                  testID="0" />
                <Picker.Item
                  label="HIIT (تمارين القوة العالية المتقطعة)"
                  value="31"
                  testID="1" />
                <Picker.Item
                  label="Pilates البيلاتس "
                  value="32"
                  testID="1" />
                <Picker.Item
                  label="تمارين التقوية اللاهوائية المتتابعة"
                  value="33"
                  testID="1" />
                <Picker.Item
                  label="Sprinting الجري المتسارع"
                  value="34"
                  testID="1" />
                <Picker.Item
                  label="تمارين المقاومة"
                  value="35"
                  testID="1" />
                <Picker.Item
                  label="التمارين المعتمدة على وزن الجسم (مثل تمارين الضغط، الرفع، القرفصاء)"
                  value="36"
                  testID="1" />
                <Picker.Item
                  label="رفع الأثقال"
                  value="37"
                  testID="1" />
                <Picker.Item label="اليوجا " value="38" testID="1" />
                <Picker.Item
                  label="تمارين الكروس فيت"
                  value="39"
                  testID="1" />
                <Picker.Item
                  label="Isometrics تمارين الأيزوميتركس"
                  value="40"
                  testID="1" />
                <Picker.Item
                  label="الجمباز"
                  value="41"
                  testID="1" />
                <Picker.Item
                  label="رياضة/تمارين هوائية اخرى"
                  value="42"
                  testID="1" />
            </Picker>
            </View>

            <View style={styles.vNext}>
              <Text style={styles.inpTxt}>مستوى جلوكوز افي الدم الحالي</Text>
              <TextInput
                keyboardType="decimal-pad"
                placeholder="000.0"
                onChangeText={(val)=>setCurrentBG(val)}
                style={styles.inputT} />
              <Text style={{fontSize: 13, paddingTop: 20}}> mg/dl </Text>
            </View>

            { currentBG > 0 && currentBG < 250 && TypeOfExercise != '0' && instruction != '' ?
  <Text style={styles.textHeader} >{instruction}</Text>
  : null
}
            { currentBG < 70 && TypeOfExercise != '0' && instruction != '' ?
              <View>
              <TouchableOpacity onPress={()=> navigation.navigate('hypo')}>
               <Text style={{fontSize: 15, color: 'grey',  paddingLeft: 20, backgroundColor: '#c3d4e0', paddingBottom: 10}}>الذهاب إلى صفحة الهيبوقلوسيميا</Text>
              </TouchableOpacity>
             </View>
             : null
            }

            {currentBG >= 250 && TypeOfExercise != '0' ?
<View>
<Text style={styles.textHeader} >لا تقم بعمل التمارين الآن</Text>
<Text style={styles.textHeader} >الرجاء التحقق من الكيتونات ، وإدخال نتيجتك هنا للمزيد</Text>
<View style={{marginTop: 25, flexDirection: 'row'}}>
<Text style={styles.inpTxt}>مصدر قراءة الكيتونات</Text>
<Picker
            itemStyle={{color: 'black'}}
              selectedValue={ketones}
              onValueChange={value => setKetones(value)}
              mode="dropdown"
              style={styles.picker}>
              <Picker.Item label="Select" value=""/>
              <Picker.Item label="blood" value="blood"/>
              <Picker.Item label="urine" value="urine"/>
              </Picker>
</View>
    </View>
:
null
    }
        {ketones == 'blood' && currentBG >= 250 ?
<View>
<View style={styles.vNext}>
<TextInput
  keyboardType="decimal-pad"
  placeholder="0.0"
  onChangeText={(val)=>setBlood(val)}
  style={styles.inputT} />
<Text style={{fontSize: 13, paddingTop: 20}}> mmol/L </Text>
</View>
              </View>
      : null
      }

{ketones == 'urine' && currentBG >= 250 ?
<View style={styles.vNext}>
<Picker
            itemStyle={{color: 'black'}}
              selectedValue={urine}
              onValueChange={value => setUrine(value)}
              mode="dropdown"
              style={styles.picker}>
              <Picker.Item label="Select" value="-1"/>
              <Picker.Item label="Negative" value="Negative"/>
              <Picker.Item label="Trace" value="Trace"/>
              <Picker.Item label="Small" value="Small"/>
              <Picker.Item label="Moderate" value="Moderate"/>
              <Picker.Item label="Large" value="Large"/>
              </Picker>
              </View>
      : null
      }

{ currentBG >= 250 && TypeOfExercise != '0' && instruction2 != '' && ketones != '' ?
  <Text style={styles.textHeader} >{instruction2}</Text>
  : null
}
             <View style={styles.buttonV}>
          <TouchableOpacity onPress={checkExercise}>
            <LinearGradient
              colors={['#f5f5f5', '#e9ebee', '#e9ebee']}
              style={styles.buttonR}>
              <Text style={styles.titleB}>
                عرض التعليمات
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          </View>
          </ScrollView>
           </View>
          </View>
          </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
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
action: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 10,
    paddingBottom: 25,
  },
  internalText: {
    color: '#05375a',
    fontSize: 20,
    textAlign: 'left',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    fontWeight: '600',
    lineHeight: 30,
  },
  points: {
    color: '#05375a',
    fontSize: 16,
    textAlign: 'left',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    fontWeight: '500',
    lineHeight: 30,
  },
buttonV: {
    alignItems: 'center',
    paddingBottom: 35,
    paddingTop: 30,
  },
  buttonR: {
    alignItems: 'center',
    width: 150,
    height: 30,
    justifyContent: 'center',
    borderRadius: 10,
  },
  titleB: {
    color: '#05375a',
    fontSize: 15,
    fontWeight: 'bold',
  },
   radioB :{
    marginTop: 25,
    justifyContent: 'space-between',
    padding: 10,
    paddingTop:5,
    marginBottom: 10,
    },
 picker: {
    width: 230,
    height: 30,
    borderWidth: 2,
    borderColor: '#4c4c4c',
  },
  inpTxt: {
    //lables
    paddingLeft: 20,
    paddingTop: 15,
    fontSize: 17,
    color: '#05375a',
  },
  vNext: {
    // to make items next to each other
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 25,
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
  textHeader:{
    paddingTop: 25,
    fontSize: 16,
    color: '#05375a',
    paddingLeft: 20,
    paddingRight: 20,
    lineHeight: 25,
    backgroundColor: '#c3d4e0',
    paddingBottom: 10,
 },
});
export default exercise3;