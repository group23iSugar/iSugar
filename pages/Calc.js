import React, {Component, useEffect, useState} from 'react';
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
  Alert,
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import LinearGradient from 'react-native-linear-gradient';
import {Picker} from '@react-native-picker/picker';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RNSearchablePicker from 'react-native-searchable-picker';
import react from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import SQLite from 'react-native-sqlite-storage';
import timeCompare from './timeCompare';

//=========================Local DB===============================

//=========================Local DB===============================

const Calc = () => {
  const neeDed = () => {
    if(isIsfInterval == 1){
    checkISFIntervals(); //Retrives from DB
    }
  };

  const insuCalc = () => {

    var a;
    var b;
    var c = 0;
    var IOB;
    var adjustment;

    if (
      (insulinReg == 'Pen' || insulinReg == 'pen') &&
      (ReData2.insulinType == 'Aspart' ||
        ReData2.insulinType == 'Lispro' ||
        ReData2.insulinType == 'Glulisine')
    ) {
      console.log('1-  ' + c);
      if (bgLevel > 70) {
        console.log('2-  ' + c);
        if (reason == '5') {
          //5 is the value for correction lable
          console.log('3-  ' + c);
          if (bgLevel > ReData1.startBG) {
            console.log(
              'BG: ' +
                bgLevel +
                ' Start BG: ' +
                ReData1.startBG +
                ' ISF: ' +
                ReData1.ISF,
            );
            console.log('4-  ' + c);
            a = 0;
            b = (bgLevel - ReData1.targetBG) / ReData1.ISF;
            c = a + b;
            console.log('5-  ' + c);

            //prevArr
            console.log('THA LENGTH:    '+ prevArr.length);
            if (prevArr.length == 0){
              	IOB = 0;} else {

                  for (let i = 0; i < prevArr.length; i++){
                    console.log('DoubleCheckaaaaa');
                    console.log('DoubleCheck: '+prevArr[i].time +' '+ prevArr[i].dose);
		               IOB = IOB + IOBSwitch(prevArr[i].time, prevArr[i].dose); 
                   }
                }

            // if (timePrevDose <= 4) {
              console.log('6-  ' + c);
              console.log('7-  ' + IOB);
              c = c - IOB;
            // }
            if (isPreEnabled == true) {
              adjustment = PreExercise();
              c = c - adjustment * c;

              // return (total);
            } else if (isPostEnabled == true) {
              adjustment = PostExercise();
              c = c - adjustment * c;

              // return (total);
            }
          } else {
            alert('No correction required');
          }
        } else {
          if (calcMethod == 'ICR') {
            console.log('is ICR?');
            checkICRIntervals();
            a = CHO / ICR;
            if (bgLevel > ReData1.startBG) {
              b = (bgLevel - ReData1.targetBG) / ReData1.ISF;
            } else {
              b = 0;
            }
            c = a + b;

          if (prevArr.length == 0){
              	IOB = 0;} else {

                  for (let i = 0; i < prevArr.length; i++){
                    console.log('DoubleCheckaaaaa');
                    console.log('DoubleCheck: '+prevArr[i].time +' '+ prevArr[i].dose);
		               IOB = IOB + IOBSwitch(prevArr[i].time, prevArr[i].dose); 
                   }
                }
            c = c - IOB;

            if (isPreEnabled == true) {
              adjustment = PreExercise();
              c = c - adjustment * c;

              // return (total);
            } else if (isPostEnabled == true) {
              if (differ <= 4 && differ >= 0) {
                adjustment = PostExercise();
                c = c - adjustment * c;

                //  return (total);
              }
            }
          } else {
            
            checkSSIntervals();
            console.log('is Sliding?');
            c = SlidingScale; // from database
            console.log('this is c: ' + c + ' And Sliding: ' + SlidingScale);
            console.log(c + '  This is tt');
                if (prevArr.length == 0){
              	IOB = 0;} else {

                  for (let i = 0; i < prevArr.length; i++){
                    console.log('DoubleCheckaaaaa');
                    console.log('DoubleCheck: '+prevArr[i].time +' '+ prevArr[i].dose);
		               IOB = IOB + IOBSwitch(prevArr[i].time, prevArr[i].dose); 
                   }
                }
            console.log('This is c: ' + c);
            c = c - IOB;
            console.log(IOB + '  This is IOB and c after IOB: ' + c);

            if (isPreEnabled == true) {
              adjustment = PreExercise();
              c = c - adjustment * c;

              //  return (total);
            } else if (isPostEnabled == true) {
            if (differ <= 4 && differ >= 0) {
                adjustment = PostExercise();
                c = c - adjustment * c;

                //  return (total);
              }

              //  return (total);
            }
          }
        }
      } else {
        alert('Your blood sugar is low!');
      }
    } else {
      alert(
        'Your Insulin type is not supported in this application. Please contact your Diabetes center for instruction & recommendations for insulin bolus calculation & dose determination',
      );
    }


    if (halfOrFull==1){
	c = Math.round(c);}
else{//half-units
	var r1 = Math.round((c * 10) / 10); // rounds to 1 decimal after point
	var r1_whole = Math.trunc(r1); // the whole part of the number
	var r1_fraction = r1 - r1_whole; // the fraction part of the number
	var roundedFraction = 0;
	if (r1_fraction <= 0.2){
		roundedFraction = 0;}
	else if (r1_fraction <= 0.7 ){
		roundedFraction = 0.5;}
	else{
		roundedFraction = 1.0;}
	c = r1_whole + roundedFraction}

    setTotal(c);
    // navigation.navigate('result',{result: total, calcM: calcMethod, reasonD: reason, bg: bgLevel, cho: CHO})
    console.log(c + ' and:3  ' + total);
  };

  const IOBSwitch = (timePrevDose,PrevDose) => {
    var num = 0;
    console.log('check1');
    if (timePrevDose < 1) {
      num = 1 * PrevDose;
       console.log('check2');
    } else if (timePrevDose >= 1 && timePrevDose < 2) {
      num = 0.75 * PrevDose;
       console.log('check3');
    } else if (timePrevDose >= 2 && timePrevDose < 3) {
      num = 0.5 * PrevDose;
       console.log('check4');
    } else if (timePrevDose >= 3 && timePrevDose <= 4) {
      num = 0.25 * PrevDose;
       console.log('check5');
    }

    console.log('num to IOB');

    return num;
  };

  const PreExercise = () => {
    var adjNum = 1;
    var p = parseInt(preDuration);
    var numi = parseInt(preTypeOfExercise);
    console.log('da p:  ' + p);
    if (numi >= 0 && numi <= 30) {
      if (p < 15) {
        adjNum=0;
      } else if (p >= 15 && p < 30) {
        adjNum = 0.25;
      } else if (p >= 30 && p <= 45) {
        adjNum = 0.5;
      } else if (p > 45) {
        adjNum = 0.75;
      } else if (preDuration == 'unknown') {
        adjNum = 0.25;
      }
    } else if (numi > 30 && numi <= 42) {
      if (p < 15) {
        //nothing
      } else if (p >= 15 && p < 30) {
        //nothing
      } else if (p >= 30 && p <= 45) {
        adjNum = 0.25;
      } else if (p > 45) {
        adjNum = 0.5;
      } else if (preDuration == 'unknown') {
        adjNum = 0.25;
      }
    }
    return adjNum;
  };

  const PostExercise = () => {
    var adjNum = 1;
    var p = parseInt(postDuration);
    var numi = parseInt(postTypeOfExercise);
    if (numi >= 0 && numi <= 30) {
      if (p < 30) {
        adjNum = 0.25;
      } else if (p >= 30 && p <= 45) {
        adjNum = 0.4;
      } else if (p > 45) {
        adjNum = 0.5;
      }
    } else if (numi > 30 && numi <= 42) {
      if (p < 30) {
        adjNum = 0.25;
      } else if (p >= 30 && p <= 45) {
        adjNum = 0.3;
      } else if (p > 45) {
        adjNum = 0.4;
      }
    }
    return adjNum;
  };

  //======================End of insuling Calc methods===================

  //=========================Retrive From DB========================
  // var time='';
  const [ReData1, setReData1] = useState({
    startBG: 0,
    targetBG: 0,
    ISF: 0,
  });

  const [ReData2, setReData2] = useState({
    insulinType: '',
  });
  const [total, setTotal] = useState(0);

  useEffect(() => {
    FirstRetrieve(retrieve, secondretrieve);
    if(insulinReg=='Pen'){
    retrieve3();}
    retrieve4();
  }, []);

  // ====== ISF ========== //
  const [fromTime, setFromTime] = useState([]);
  const [toTime, setToTime] = useState([]);
  const [isf, setISF] = useState([]);
  const [tBG, setTBG] = useState([]);
  const [sBG, setSBG] = useState([]);
  //======== ICR AND SS========= //
  const [ICRarr, setICRarr] = useState([]);
  const [ICR, setICR] = useState(0);
  const [SlidingScaleArr, setSlidingScaleArr] = useState([]);
  const [SlidingScale, setSlidingScale] = useState(0);
  // ======= Patient Profile ===== //
  const [calcMethod, setCalcM] = useState('');
  const [isIsfInterval, setInterval] = useState(-1);
  const [insulinReg, setReg] = useState('');
  const [insulinType, setType] = useState('');
  const [isfP, setISFP] = useState(-1); // p indicates patient ;) these values won't be retreived unless isf interval = 0: All day
  const [tBGP, setTBGP] = useState(-1);
  const [sBGP, setSBGP] = useState(-1);
  //======= Previous Dose==========//
  // const [timePrevDose, setTimePrevDose] = useState(0);
  // const [PrevDose, setPrevDose] = useState(0);
  const [prevArr, setPrevArr] = useState([]);
  //var tempArr = [...ICRarr];
  const [halfOrFull, sethalfOrFull]= useState(1);
  //==================================//
  //--------------Queries-------------------

  const calcA = (call1, call2) => {
    call1();
    call2();
  };
  const FirstRetrieve = (callback, callback2) => {
    var interval = -1;
    console.log('in first');
    try {
      db.transaction(tx => {
        // insulinRegimen, ISFIntervals, insulinCalcMethod Retrive
        tx.executeSql(
          'SELECT UserID, insulinRegimen, ISFIntervals, insulinCalcMethod FROM patientprofile',
          [],
          (tx, results) => {
            var rows = results.rows;
            for (let i = 0; i < rows.length; i++) {
              var UID = rows.item(i).UserID;
              if (UID == uID) {
                console.log('in if (user is found)');
                interval = rows.item(i).ISFIntervals; //boolean 0 or 1
                console.log(interval);
                setInterval(interval);
                var calcM = rows.item(i).insulinCalcMethod; // ICR or SS
                console.log(calcM);
                setCalcM(calcM);
                var insulinR = rows.item(i).insulinRegimen; // pen , pump , etc..
                console.log(insulinR);
                setReg(insulinR);
                //----------------
                //  console.log(interval+' intervals before calling');
                //   console.log(calcM+' method for calc');
                callback(interval);
                callback2(calcM);
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

  const retrieve = interval => {
    //interval is wither the user is using isf intervals or not ( 1 or 0)
    console.log('in second');
    console.log(interval);
    if (interval != -1) {
      if (interval == 1) {
        // specific hours
        try {
          db.transaction(tx => {
            tx.executeSql(
              'SELECT isfID, UserID, fromTime, toTime, ISF, targetBG_correct, startBG_correct FROM isfInterval',
              [],
              (tx, results) => {
                var rows = results.rows;
                for (let i = 0; i < rows.length; i++) {
                  var UID = rows.item(i).UserID;
                  if (UID == uID) {
                    //user id
                    var from = rows.item(i).fromTime;
                    setFromTime(fromTime => [...fromTime, from]);
                    var to = rows.item(i).toTime;
                    setToTime(toTime => [...toTime, to]);
                    var ISF_ = rows.item(i).ISF;
                    setISF(isf => [...isf, ISF_]);
                    var target = rows.item(i).targetBG_correct;
                    setTBG(tBG => [...tBG, target]);
                    var start = rows.item(i).startBG_correct;
                    setSBG(sBG => [...sBG, start]);
                    //  التخزين في ارايز
                  }
                }
              },
            );
          });
        } catch (error) {
          console.log(error);
        }
      } else if (interval == 0) {
        // All day
        try {
          db.transaction(tx => {
            tx.executeSql(
              'SELECT UserID, ISF, targetBG_correct, startBG_correct FROM patientprofile',
              [],
              (tx, results) => {
                var rows = results.rows;
                for (let i = 0; i < rows.length; i++) {
                  var UID = rows.item(i).UserID;
                  if (UID == uID) {
                    //***************************************FIXIXIXIX */
                    var ISF_ = rows.item(i).ISF;
                    setISFP(ISF_);
                    var target = rows.item(i).targetBG_correct;
                    setTBGP(target);
                    var start = rows.item(i).startBG_correct;
                    setSBGP(start);

                    setReData1({
                      startBG: start,
                      targetBG: target,
                      ISF: ISF_,
                    });
                  }
                }
              },
            );
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  //=========================ICR intervals
  const secondretrieve = method => {
    //calcM??
    console.log('inside is: ' + method);
    if (method == 'ICR') {
      var tempArr = [...ICRarr]; // array of obj
      try {
        db.transaction(tx => {
          tx.executeSql(
            'SELECT icrID, fromTime, toTime, ICR FROM icrInterval WHERE UserID=?',
            [uID],
            (tx, results) => {
              var rows = results.rows;
              for (let i = 0; i < rows.length; i++) {
                console.log('hello?1?************8');
                tempArr.push({
                  id: rows.item(i).icrID,
                  from: rows.item(i).fromTime,
                  to: rows.item(i).toTime,
                  icr: rows.item(i).ICR,
                });
              }
              setICRarr([...tempArr]);
              console.log(tempArr + 'This is icr arr');
            },
          );
        });
      } catch (error) {
        console.log(error);
      }
    } else if (method == 'Sliding Scale') {
      console.log('hello Sliding');
      var tempArr = [...SlidingScaleArr];
      try {
        db.transaction(tx => {
          tx.executeSql(
            'SELECT ssID, fromTime, toTime FROM ssInterval WHERE UserID=?',
            [uID],
            (tx, results) => {
              var rows = results.rows;
              for (let i = 0; i < rows.length; i++) {
                tempArr.push({
                  id: rows.item(i).ssID,
                  from: rows.item(i).fromTime,
                  to: rows.item(i).toTime,
                  Rnages: [],
                });
                try {
                  db.transaction(tx => {
                    tx.executeSql(
                      'SELECT bgID, fromBGLevel, toBGLevel, insulinDose FROM bgleveltoinsulin WHERE ssID=?',
                      [tempArr[i].id],
                      (tx, results) => {
                        var rows2 = results.rows;
                        for (let j = 0; j < rows2.length; j++) {
                          tempArr[i].Rnages.push({
                            id: rows2.item(j).bgID,
                            BGFrom: rows2.item(j).fromBGLevel,
                            BGTo: rows2.item(j).toBGLevel,
                            insulin: rows2.item(j).insulinDose,
                          });
                          console.log(tempArr[i].Rnages[j]);
                        }

                        setSlidingScaleArr([...tempArr]);
                      },
                    );
                  });
                } catch (error) {
                  console.log(error);
                }
              }
            },
          );
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  //===================Insulin Type
  const retrieve3 = () => {
    // insulinPen table
    try {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT UserID, insulinType, halfORfull FROM insulinPen',
          [],
          (tx, results) => {
            var rows = results.rows;

            for (let i = 0; i < rows.length; i++) {
              var userid = rows.item(i).UserID;

              if (userid == uID) {
                setReData2({
                  ...ReData2,
                  insulinType: rows.item(i).insulinType,
                });
                sethalfOrFull(rows.item(i).halfORfull);
                console.log(ReData2.insulinType);

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

  //=========================Previous Insulin==========================
  const retrieve4 = () => {
    // insulinPen table
    var currentTime1 = new Date();
    var currentTimeHours = currentTime1.getHours(); //0-23
    var currentTimeDate_day = currentTime1.getDate(); //1-31
    var currentTimeDate_month = currentTime1.getMonth(); //0-11
    var currentTimeDate_year = currentTime1.getFullYear(); //2021
    var IOBTimeRange = 4;
    var previousDay;
    var previousDayMonth;
    var previousDayYear;
    // console.log('F(AG'+currentTime1 +' \n '+currentTimeHours+' \n '+currentTimeDate_day+' \n '+currentTimeDate_month+' \n '+currentTimeDate_year);
    var previousDosesArray = [];
    try {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT insulinDose, Dose_time_hours, Dose_time_minutes FROM takenInsulinDose WHERE Dose_Date_Day=? and Dose_Date_Month=? and Dose_Date_Year=?',
          [currentTimeDate_day, currentTimeDate_month, currentTimeDate_year],
          (tx, results) => {
            var rows = results.rows;
            for (let i = 0; i < rows.length; i++) {
              doseTime_hours = rows.item(i).Dose_time_hours;
              doseTime_minutes = rows.item(i).Dose_time_minutes;
              doseTimeDate = new Date(
                currentTimeDate_year,
                currentTimeDate_month,
                currentTimeDate_day,
                doseTime_hours,
                doseTime_minutes,
              );
              console.log('Test Desu:  ' + doseTimeDate);
              var timeDifference =
                (currentTime1.getTime() - doseTimeDate.getTime()) /
                (1000 * 60 * 60); //in hours
              console.log('Test Desu2:  ' + timeDifference);
              if (timeDifference <= IOBTimeRange) {
                // only add in the array the doses that are within range
                console.log('*' + timeDifference);
                console.log('**' + rows.item(i).insulinDose);

                previousDosesArray.push({
                  time: timeDifference,
                  dose: rows.item(i).insulinDose,
                });

                console.log('Did Ya Work?!?!' + previousDosesArray[i].time);
              }
            }

           
            

            if (currentTimeHours <= IOBTimeRange) {
              // then we must take the previous day into consideration too
              console.log('Gambari gambari');
              if (currentTimeDate_day > 1) {
                // if it is not the first day in the month, then we just subtract 1 from the current day to get the the previous day
                previousDay = currentTimeDate_day - 1;
                previousDayMonth = currentTimeDate_month;
                previousDayYear = currentTimeDate_year;
              } else {
                // if it is the first day in the month, then the previous day is the last day of the previous month
                previousDay = new Date(
                  currentTimeDate_year,
                  currentTimeDate_month,
                  0,
                ).getDate(); // by using 0 as the day it will give us the last day of the previous month
                if (currentTimeDate_month > 0) {
                  // If the month is Feb-Dec, then we just subtract 1 to get the previous month
                  previousDayMonth = currentTimeDate_month - 1;
                  previousDayYear = currentTimeDate_year;
                } else {
                  // If the month is Jan, then the previous month is Dec of the previous year
                  previousDayMonth = 11;
                  previousDayYear = currentTimeDate_year - 1;
                }
              }
            }

            try {
              console.log('Hi try hope u r working :(');
              db.transaction(tx => {
                tx.executeSql(
                  'SELECT insulinDose, Dose_time_hours, Dose_time_minutes FROM takenInsulinDose WHERE Dose_Date_Day=? and Dose_Date_Month=? and Dose_Date_Year=?',
                  [previousDay, previousDayMonth, previousDayYear],
                  (tx, results) => {
                    var rows2 = results.rows;
                    for (let i = 0; i < rows2.length; i++) {
                      doseTime_hours = rows2.item(i).Dose_time_hours;
                      doseTime_minutes = rows2.item(i).Dose_time_minutes;
                      doseTimeDate = new Date(
                        previousDayYear,
                        previousDayMonth,
                        previousDay,
                        doseTime_hours,
                        doseTime_minutes,
                      );
                      timeDifference =((currentTime.getTime() - doseTimeDate.getTime()) /(1000 * 60 * 60)); //in hours
                      if (timeDifference < IOBTimeRange) {
                        // only add in the array the doses that are within range
                        previousDosesArray.push({
                          time: timeDifference,
                          dose: rows2.item(i).insulinDose,
                        });
                      }
                    }
                  },
                );
              });
            } catch (error) {
              console.log(error);
            }
          },
        );
      });
    } catch (error) {
      console.log(error);
    }

    setPrevArr([...previousDosesArray]);
  };


  //DateTime

  //Choose ISF , Start BG , Target Bg based on current time
  const checkISFIntervals = () => {
    console.log('i got called');
    var index = -1;
    for (let i = 0; i < fromTime.length; i++) {
      // icr: icr.length - ss: SlidingScale.length
      if (timeCompare(fromTime[i], toTime[i])) {
        // icr: (icr[i].from,icr[i].to) -  ss: (SlidingScale[i].from, SlidingScale[i].to )
        console.log('index: ' + i);
        index = i;
        console.log('found interval at: ' + index);

        setReData1({
          ...ReData1,
          ISF: isf[index],
          startBG: sBG[index],
          targetBG: tBG[index],
        });
        console.log(
          ReData1.ISF + ReData1.startBG + ReData1.targetBG + 'Did u work?',
        );
        // return index;
      } else {
        console.log('not found interval');
      }
    }
  };

  //Choose ICR based on current time

  const checkICRIntervals = () => {
    var index = -1;
    for (let i = 0; i < ICRarr.length; i++) {
      // icr: icr.length - ss: SlidingScale.length
      console.log('i got called ICR');
      if (timeCompare(ICRarr[i].from, ICRarr[i].to)) {
        // icr: (icr[i].from,icr[i].to) -  ss: (SlidingScale[i].from, SlidingScale[i].to )
        console.log('index: ' + i);
        index = i;
        console.log('found interval at: ' + index);

        setICR(ICRarr[index].icr);

        console.log(ICR + '  Did u work?');
        // return index;
      } else {
        console.log('not found interval');
      }
    }
  };

  //Choose SS based on current time
  const checkSSIntervals = () => {
    var index = -1;
    for (let i = 0; i < SlidingScaleArr.length; i++) {
      // icr: icr.length - ss: SlidingScale.length
      console.log('i got called SS');
      if (timeCompare(SlidingScaleArr[i].from, SlidingScaleArr[i].to)) {
        // icr: (icr[i].from,icr[i].to) -  ss: (SlidingScale[i].from, SlidingScale[i].to )
        for (let j = 0; j < SlidingScaleArr[i].Rnages.length; j++) {
          if (
            SlidingScaleArr[i].Rnages[j].BGFrom <= bgLevel &&
            SlidingScaleArr[i].Rnages[j].BGTo >= bgLevel
          ) {
            setSlidingScale(SlidingScaleArr[i].Rnages[j].insulin);
          }
        }
        console.log('index: ' + i);
        index = i;
        console.log('found interval at: ' + index);
        console.log(SlidingScale);

        // setICR(ICRarr[index].icr);

        // console.log(ICR + '  Did u work?');
        // return index;
      } else {
        console.log('not found interval');
      }
    }
  };

  //=====================================================================
  var nowDate = new Date();
  var nowTime = moment.utc(nowDate).format('h:mm a'); // 11:40 PM

  const [PosTime, setPosTime] = useState(new Date());
  const [showPosTime, setShowPosTime] = useState(false);

  const onChangePosTime = (event, selectedDate) => {
    const currentDate = selectedDate || PosTime;
    setShowPosTime(Platform.OS === 'ios');
    setPosTime(currentDate);
  };

  const showPosTimeMethod = () => {
    setShowPosTime(true);
  };
  var showTime = moment(PosTime).format('h:mm a');

  var differ = nowDate.getHours() - PosTime.getHours();
  var differToString = moment(differ).format('h:mm a');

  //DateTime

  //Pre Switch
  const [isPreEnabled, setIsPreEnabled] = useState(false);
  const togglePreSwitch = () =>
    setIsPreEnabled(previousState => !previousState);
  //Post Switch
  const [isPostEnabled, setIsPostEnabled] = useState(false);
  const togglePostSwitch = () =>
    setIsPostEnabled(previousState => !previousState);
  //=================================================================================

  const [reason, setReason] = useState('0'); //ReasonForInsulin
  const [preDuration, setPreDuration] = useState('14'); //Duration of pre exersize
  const [preTypeOfExercise, setPreTypeOfExercise] = useState('1'); //reason of pre exercize
  const [postDuration, setPostDuration] = useState('14'); //Duration of post exersize
  const [postTypeOfExercise, setPostTypeOfExercise] = useState('1'); //reason of post exercize
  const [bgLevel, setbgLevel] = useState(0);
  const [CHO, setCHO] = useState(0);
  var isValidBG = true;
  var isValidCHO = true;

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
        <Text style={styles.inpTxt}>{total}</Text>

        <View style={styles.vNext}>
          <Text style={styles.inpTxt}>Current BG levet: </Text>
          <TextInput
            keyboardType="decimal-pad"
            placeholder="000.00"
            onChangeText={value => setbgLevel(value)}
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
            onChangeText={value => setCHO(value)}
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
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isPreEnabled ? '#f4f3f4' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={togglePreSwitch}
          value={isPreEnabled}
          disabled={isPostEnabled}
        />

        {isPreEnabled ? (
          <View style={{backgroundColor: '#c3d4e0', marginTop: 20}}>
            <View>
              <Text style={styles.inpTxt}>Type of exercise: </Text>
              <Picker
                selectedValue={preTypeOfExercise}
                onValueChange={value => setPreTypeOfExercise(value)}
                mode="dropdown"
                style={styles.picker}>
                <Picker.Item label="Select" value="0" testID="2"></Picker.Item>
                <Picker.Item label="Running" value="1" testID="0"></Picker.Item>
                <Picker.Item
                  label="Swimming"
                  value="2"
                  testID="0"></Picker.Item>
                <Picker.Item label="Walking" value="3" testID="0"></Picker.Item>
                <Picker.Item
                  label="Spinning"
                  value="4"
                  testID="0"></Picker.Item>
                <Picker.Item
                  label="Mountain Climbing"
                  value="5"
                  testID="0"></Picker.Item>
                <Picker.Item label="Dancing" value="6" testID="0"></Picker.Item>
                <Picker.Item
                  label="Kickboxing"
                  value="7"
                  testID="0"></Picker.Item>
                <Picker.Item
                  label="Cross country skiing"
                  value="8"
                  testID="0"></Picker.Item>
                <Picker.Item
                  label="Jumping jacks"
                  value="9"
                  testID="0"></Picker.Item>
                <Picker.Item label="Rowing" value="10" testID="0"></Picker.Item>
                <Picker.Item
                  label="Martial arts"
                  value="11"
                  testID="0"></Picker.Item>
                <Picker.Item label="Zumba" value="12" testID="0"></Picker.Item>
                <Picker.Item
                  label="Basketball"
                  value="13"
                  testID="0"></Picker.Item>
                <Picker.Item
                  label="Trampoline-ing"
                  value="14"
                  testID="0"></Picker.Item>
                <Picker.Item
                  label="Aerobic strength circuit"
                  value="15"
                  testID="0"></Picker.Item>
                <Picker.Item
                  label="Cycling"
                  value="16"
                  testID="0"></Picker.Item>
                <Picker.Item
                  label="Jogging"
                  value="17"
                  testID="0"></Picker.Item>
                <Picker.Item
                  label="Dancing"
                  value="18"
                  testID="0"></Picker.Item>
                <Picker.Item
                  label="Cardio exercises/ machines"
                  value="19"
                  testID="0"></Picker.Item>
                <Picker.Item
                  label="Aerobic exercise classes"
                  value="20"
                  testID="0"></Picker.Item>
                <Picker.Item
                  label="Skipping/ Jump rope"
                  value="21"
                  testID="0"></Picker.Item>
                <Picker.Item
                  label="Stair mill /Stair stepper"
                  value="22"
                  testID="0"></Picker.Item>
                <Picker.Item
                  label="Stationary bike"
                  value="23"
                  testID="0"></Picker.Item>
                <Picker.Item
                  label="Elliptical"
                  value="24"
                  testID="0"></Picker.Item>
                <Picker.Item
                  label="Skating"
                  value="25"
                  testID="0"></Picker.Item>
                <Picker.Item label="Tennis" value="26" testID="0"></Picker.Item>
                <Picker.Item label="Soccer" value="27" testID="0"></Picker.Item>
                <Picker.Item label="Boxing" value="28" testID="0"></Picker.Item>
                <Picker.Item
                  label="Hula-hooping"
                  value="29"
                  testID="0"></Picker.Item>
                <Picker.Item
                  label="Other aerobic exercise"
                  value="30"
                  testID="0"></Picker.Item>
                <Picker.Item
                  label="HIIT (High Intensity Interval Training)"
                  value="31"
                  testID="1"></Picker.Item>
                <Picker.Item
                  label="Pilates"
                  value="32"
                  testID="1"></Picker.Item>
                <Picker.Item
                  label="Anaerobic Circuit training"
                  value="33"
                  testID="1"></Picker.Item>
                <Picker.Item
                  label="Sprinting"
                  value="34"
                  testID="1"></Picker.Item>
                <Picker.Item
                  label="Resistance exercises"
                  value="35"
                  testID="1"></Picker.Item>
                <Picker.Item
                  label="Bodyweight exercise (e.g. push-ups, pull-ups, squats, lunges)"
                  value="36"
                  testID="1"></Picker.Item>
                <Picker.Item
                  label="Weight lifting"
                  value="37"
                  testID="1"></Picker.Item>
                <Picker.Item label="Yoga" value="38" testID="1"></Picker.Item>
                <Picker.Item
                  label="Cross-fit"
                  value="39"
                  testID="1"></Picker.Item>
                <Picker.Item
                  label="Isometrics"
                  value="40"
                  testID="1"></Picker.Item>
                <Picker.Item
                  label="Gymnastics"
                  value="41"
                  testID="1"></Picker.Item>
                <Picker.Item
                  label="Other anaerobic exercise"
                  value="42"
                  testID="1"></Picker.Item>
              </Picker>

              <Text style={styles.inpTxt}>Duration of exercise: </Text>
              <Picker
                selectedValue={preDuration}
                onValueChange={value => setPreDuration(value)}
                mode="dropdown"
                style={styles.picker}>
                <Picker.Item label="Select" value="0"></Picker.Item>
                <Picker.Item
                  label="Less than 15 minutes"
                  value="14"></Picker.Item>
                <Picker.Item label="15 to 29 minutes" value="16"></Picker.Item>
                <Picker.Item label="30 to 45 minutes" value="31"></Picker.Item>
                <Picker.Item
                  label="More than 45 minutes"
                  value="46"></Picker.Item>
                <Picker.Item label="Unknown" value="Unknown"></Picker.Item>
              </Picker>
            </View>
          </View>
        ) : null}

        <Text style={styles.inpTxt}>
          Did you exercise wihtin the past 6 hours?
        </Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isPostEnabled ? '#f4f3f4' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={togglePostSwitch}
          value={isPostEnabled}
          disabled={isPreEnabled}
        />
        {isPostEnabled ? (
          <View style={{backgroundColor: '#c3d4e0', marginTop: 20}}>
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
              <Picker.Item
                label="Mountain Climbing"
                value="5"
                testID="0"></Picker.Item>
              <Picker.Item label="Dancing" value="6" testID="0"></Picker.Item>
              <Picker.Item
                label="Kickboxing"
                value="7"
                testID="0"></Picker.Item>
              <Picker.Item
                label="Cross country skiing"
                value="8"
                testID="0"></Picker.Item>
              <Picker.Item
                label="Jumping jacks"
                value="9"
                testID="0"></Picker.Item>
              <Picker.Item label="Rowing" value="10" testID="0"></Picker.Item>
              <Picker.Item
                label="Martial arts"
                value="11"
                testID="0"></Picker.Item>
              <Picker.Item label="Zumba" value="12" testID="0"></Picker.Item>
              <Picker.Item
                label="Basketball"
                value="13"
                testID="0"></Picker.Item>
              <Picker.Item
                label="Trampoline-ing"
                value="14"
                testID="0"></Picker.Item>
              <Picker.Item
                label="Aerobic strength circuit"
                value="15"
                testID="0"></Picker.Item>
              <Picker.Item label="Cycling" value="16" testID="0"></Picker.Item>
              <Picker.Item label="Jogging" value="17" testID="0"></Picker.Item>
              <Picker.Item label="Dancing" value="18" testID="0"></Picker.Item>
              <Picker.Item
                label="Cardio exercises/ machines"
                value="19"
                testID="0"></Picker.Item>
              <Picker.Item
                label="Aerobic exercise classes"
                value="20"
                testID="0"></Picker.Item>
              <Picker.Item
                label="Skipping/ Jump rope"
                value="21"
                testID="0"></Picker.Item>
              <Picker.Item
                label="Stair mill /Stair stepper"
                value="22"
                testID="0"></Picker.Item>
              <Picker.Item
                label="Stationary bike"
                value="23"
                testID="0"></Picker.Item>
              <Picker.Item
                label="Elliptical"
                value="24"
                testID="0"></Picker.Item>
              <Picker.Item label="Skating" value="25" testID="0"></Picker.Item>
              <Picker.Item label="Tennis" value="26" testID="0"></Picker.Item>
              <Picker.Item label="Soccer" value="27" testID="0"></Picker.Item>
              <Picker.Item label="Boxing" value="28" testID="0"></Picker.Item>
              <Picker.Item
                label="Hula-hooping"
                value="29"
                testID="0"></Picker.Item>
              <Picker.Item
                label="Other aerobic exercise"
                value="30"
                testID="0"></Picker.Item>
              <Picker.Item
                label="HIIT (High Intensity Interval Training)"
                value="31"
                testID="1"></Picker.Item>
              <Picker.Item label="Pilates" value="32" testID="1"></Picker.Item>
              <Picker.Item
                label="Anaerobic Circuit training"
                value="33"
                testID="1"></Picker.Item>
              <Picker.Item
                label="Sprinting"
                value="34"
                testID="1"></Picker.Item>
              <Picker.Item
                label="Resistance exercises"
                value="35"
                testID="1"></Picker.Item>
              <Picker.Item
                label="Bodyweight exercise (e.g. push-ups, pull-ups, squats, lunges)"
                value="36"
                testID="1"></Picker.Item>
              <Picker.Item
                label="Weight lifting"
                value="37"
                testID="1"></Picker.Item>
              <Picker.Item label="Yoga" value="38" testID="1"></Picker.Item>
              <Picker.Item
                label="Cross-fit"
                value="39"
                testID="1"></Picker.Item>
              <Picker.Item
                label="Isometrics"
                value="40"
                testID="1"></Picker.Item>
              <Picker.Item
                label="Gymnastics"
                value="41"
                testID="1"></Picker.Item>
              <Picker.Item
                label="Other anaerobic exercise"
                value="42"
                testID="1"></Picker.Item>
            </Picker>

            <Text style={styles.inpTxt}>Duration of exercise: </Text>
            <Picker
              selectedValue={postDuration}
              onValueChange={value => setPostDuration(value)}
              mode="dropdown"
              style={styles.picker}>
              <Picker.Item label="Select" value="0"></Picker.Item>
              <Picker.Item
                label="Less than 30 minutes"
                value="14"></Picker.Item>
              <Picker.Item label="30 to 45 minutes" value="31"></Picker.Item>
              <Picker.Item
                label="More than 45 minutes"
                value="46"></Picker.Item>
            </Picker>

            <Text style={styles.inpTxt}>Time of exersice: </Text>
            <View>
              <Button onPress={showPosTimeMethod} title="Set Time" />
            </View>

            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                backgroundColor: 'white',
              }}>
              {showTime}
            </Text>

            {showPosTime && (
              <DateTimePicker
                testID="PosTime"
                value={PosTime}
                mode={'time'}
                onChange={onChangePosTime}
              />
            )}
          </View>
        ) : null}

        <TouchableOpacity
          style={{
            marginTop: 30,
            paddingTop: 15,
            paddingBottom: 30,
            backgroundColor: '#6496d7',
          }}
          onPress={() => calcA(neeDed, insuCalc)}>
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
