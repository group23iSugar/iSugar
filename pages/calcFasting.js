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
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import timeCompare from './timeCompare';

global.totalInulinF = 0;
global.howTextF = '-';//const [howText, setHowText] = useState('-'); //How was the insulin calculated
global.bgLevelDBF=0;
global.reasonDBF='';
global.choDBF='';
//==========================

  // ====== ISF intervals ========== //
  global.ISFfromTimesF = []; //const [fromTime, setFromTime] = useState([]);
  global.ISFtoTimesF = []; //const [toTime, setToTime] = useState([]);
  global.ISFsF = [];//const [isf, setISF] = useState([]);
  global.ISFsTragetBGF = [];//const [tBG, setTBG] = useState([]);
  global.ISFsStartBGF = [];// const [sBG, setSBG] = useState([]);
  //======== ICR AND SS========= //
  global.ICRarrF = [];//const [ICRarr, setICRarr] = useState([]);
  global.ICRF=0;//const [ICR, setICR] = useState(0);
  global.SlidingScaleArrF = [];//const [SlidingScaleArr, setSlidingScaleArr] = useState([]);
  global.SlidingScaleF=0;//const [SlidingScale, setSlidingScale] = useState(0);

  

  // ======= Patient Profile ===== //
  global.calcMethodF = '';//const [calcMethod, setCalcM] = useState('');
  global.isIsfIntervalF = -1;//const [isIsfInterval, setInterval] = useState(-1);
  global.insulinRegF = '';//const [insulinReg, setReg] = useState('');
  global.insulinTypeF = '';//const [insulinType, setType] = useState('');
  global.halfOrFullF = -1;//const [halfOrFull, sethalfOrFull]= useState(-1);
  global.isfPF = -1;//const [isfP, setISFP] = useState(-1);
  global.tBGPF = -1;//const [tBGP, setTBGP] = useState(-1);
  global.sBGPF = -1;//const [sBGP, setSBGP] = useState(-1);
  // p indicates patient ;) these values won't be retreived unless isf interval = 0: All day
 
  //======= Previous Dose==========//
  global.prevArrF =[];

const Calc = ({navigation, route}) => {

    useEffect(() => {
     FirstRetrieve(retrieve,secondretrieve);
     retrieve3();
     retrieve4();
     

   }, []);


   //================================insulin calc methods==================
    const insuCalc = () => {
      bgLevelDBF=bgLevel;
      reasonDBF=reason;
      choDBF=CHO;

    if(isIsfIntervalF == 1){
     checkISFIntervals(); //Retrives from DB
    }

    for(let x =0; x<prevArrF.length; x++){
      console.log('=================================');
      console.log(prevArrF[x].time);
      console.log(prevArrF[x].dose);
      console.log('=================================');
    }

    console.log(prevArrF);
    var a;
    var b;
    var c = 0;
    var IOB = 0;
    var adjustment;
    var txt1 = '';

    if (
      (insulinRegF == 'Pen' || insulinRegF == 'pen') &&
      (insulinTypeF == 'Aspart' ||
        insulinTypeF == 'Lispro' ||
        insulinTypeF == 'Glulisine')
    ) {
      if (bgLevel > 70) {
        if (reason == '5') {
          if (bgLevel > sBGPF) {
            a = 0;
            b = (bgLevel - tBGPF) / isfPF;
            c = a + b;
           // console.log('5-  ' + c);
                txt1 = txt1 + 'since the reason is correction Then: \n * Total = (current BG - Target BG)/ISF \n'+ c +'='+a+'+'+b+'\n';

            //prevArr
            console.log('THA LENGTH:    '+ prevArrF.length);
            if (prevArrF.length == 0){
              	IOB = 0;} else {
                   txt1 = txt1 + '\nsince you took insulin dose in the previous 4 hours Then: \n* Total = Total - IOB \n';

                  for (let i = 0; i < prevArrF.length; i++){
                    console.log('DoubleCheckaaaaa');
                    console.log('DoubleCheck: '+prevArrF[i].time +' '+ prevArrF[i].dose);
                    // var w = parseInt(prevArr[i].dose);
		               IOB = IOB + IOBSwitch(prevArrF[i].time, prevArrF[i].dose); 
                   }
                   txt1=txt1+'Total '+'='+c+'-'+IOB+'\n';
                }

            // if (timePrevDose <= 4) {
              console.log('6-  ' + c);
              console.log('7-  ' + IOB);
              c = c - IOB;
		  
             
            // }
            if (isPreEnabled == true) {
              adjustment = PreExercise();
              c = c - adjustment * c;

              txt1 = txt1 + '\nsince you have prepared to an exercise Then: \n* Total = Total - (exercise adjustment * Total)\n';
		     txt1=txt1+'Total '+'='+c+'-'+adjustment+'*'+c+'\n';

              // return (total);
            } else if (isPostEnabled == true) {
              adjustment = PostExercise();
              c = c - adjustment * c;
              txt1 = txt1 + '\nsince you have previously exercised Then: \n* Total = Total - (exercise adjustment * Total)\n';
		     txt1=txt1+'Total '+'='+c+'-'+adjustment+'*'+c+'\n';

              // return (total);
            }
          } else {
            alert('No correction required');
            return;s
          }
        } else {
          if (calcMethodF == 'ICR') {
            console.log('is ICR?');
            checkICRIntervals();
            txt1 = txt1 + '\nsince you are using ICR and the reason for the dose is a meal Then: \n* Insulin A = CHO / ICR \n';
            a = CHO / ICRF;
		   txt1=txt1+' Total '+'='+CHO+'/'+ICRF+'\n';
            if (bgLevel > sBGPF) {
              b = (bgLevel - tBGPF) / isfPF;
               txt1 = txt1 + '\nsince the current BG is greater than the start BG Then: \n* Total = Total + ((current BG - Target BG) / ISF) \n';
		    txt1=txt1+'Total '+'='+c+'+(('+bgLevel+'-'+tBGPF+')/'+isfPF+'\n';
            } else {
              b = 0;
            }
            c = a + b;

          if (prevArrF.length == 0){
              	IOB = 0;} else {
                   txt1 = txt1 + '\nsince you took insulin dose in the previous 4 hours Then: \n* Total = Total - IOB\n';

                  for (let i = 0; i < prevArrF.length; i++){
                    console.log('DoubleCheckaaaaa');
                    console.log('DoubleCheck: '+prevArrF[i].time +' '+ prevArrF[i].dose);
		               IOB = IOB + IOBSwitch(prevArrF[i].time, prevArrF[i].dose); 
                   }
			 txt1=txt1+'Total '+'='+c+'-'+IOB+'\n';
                }
            c = c - IOB;
		
            

            if (isPreEnabled == true) {
              adjustment = PreExercise();
              c = c - adjustment * c;

              txt1 = txt1 + '\nsince you have prepared to an exercise Then: \n* Total = Total - (exercise adjustment * Total)\n';
		     txt1=txt1+'Total '+'='+c+'-'+adjustment+'*'+c+'\n';

              // return (total);
            } else if (isPostEnabled == true) {
              if (differ <= 4 && differ >= 0) {
                adjustment = PostExercise();
                c = c - adjustment * c;

                txt1 = txt1 + '\nsince you have previously exercised Then: \n* Total = Total - (exercise adjustment * Total)\n';
		       txt1=txt1+'Total '+'='+c+'-'+adjustment+'*'+c+'\n';

                //  return (total);
              }
            }
          } else {
            
         checkSSIntervals();
            console.log('is Sliding?');
            c = SlidingScaleF; // from database
            txt1 = txt1 + '\nsince you are using sliding scale Then: \n* Total = SlidingScale based on the current time\n';
		  txt1= txt1+'Total ='+c+'\n';
            console.log('this is c: ' + c + ' And Sliding: ' + SlidingScaleF);
            console.log(c + '  This is tt');
                if (prevArrF.length == 0){
              	IOB = 0;} else {
                  txt1 = txt1 + '\nsince you took insulin dose in the previous 4 hours Then: \n* Total = Total - IOB\n';

                  for (let i = 0; i < prevArrF.length; i++){
                    console.log('DoubleCheckaaaaa');
                    console.log('DoubleCheck: '+prevArrF[i].time +' '+ prevArrF[i].dose);
		               IOB = IOB + IOBSwitch(prevArrF[i].time, prevArrF[i].dose); 
                   }
			 txt1=txt1+'Total '+'='+c+'-'+IOB+'\n';
                }
            console.log('This is c: ' + c);
            c = c - IOB;
		  
             
            console.log(IOB + '  This is IOB and c after IOB: ' + c);

            if (isPreEnabled == true) {
              adjustment = PreExercise();
              c = c - adjustment * c;

               txt1 = txt1 + '\nsince you have prepared to an exercise Then: \n* Total = Total - (exercise adjustment * Total)\n';
		    txt1=txt1+'Total '+'='+c+'-'+adjustment+'*'+c+'\n';

              //  return (total);
            } else if (isPostEnabled == true) {
            if (differ <= 4 && differ >= 0) {
                adjustment = PostExercise();
                c = c - adjustment * c;

                 txt1 = txt1 + '\nsince you have previously exercised Then: \n* Total = Total - (exercise adjustment * Total)\n';
		    txt1=txt1+'Total '+'='+c+'-'+adjustment+'*'+c+'\n';

                //  return (total);
              }

              //  return (total);
            }
          }
        }
      } else {
       navigation.navigate('hypo');
      }
    } else {
      alert(
        'Your Insulin type is not supported in this application. Please contact your Diabetes center for instruction & recommendations for insulin bolus calculation & dose determination',
      );
      return;
    }


    if (halfOrFullF==1){
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


    totalInulinF=c;
    if(c<0){
      c=0;
    }
    txt1=txt1+'= '+c;
    howTextF=txt1;
    
    console.log(c + ' and:3  ' + totalInulinF);



    navigation.navigate('insuResult');
    // navigation.navigate('result',{result: total, calcM: calcMethodF, reasonD: reason, bg: bgLevel, cho: CHO})
    };

  const IOBSwitch = (timePrevDose, PrevDose) => {
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

    //======================Retrive Funvtions===================
      const FirstRetrieve = (callback1 , callback2) => {
    var interval = -1;
    console.log('in first');
    try {
      db.transaction(tx => {
        // insulinRegimen, ISFIntervals, insulincalcMethodF Retrive
        tx.executeSql(
          'SELECT UserID, insulinRegimen, ISFIntervals, insulinCalcMethod FROM patientprofileFasting',
          [],
          (tx, results) => {
            var rows = results.rows;
            for (let i = 0; i < rows.length; i++) {
              var UID = rows.item(i).UserID;
              if (UID == uID) {
                console.log('in if (user is found)');
                interval = rows.item(i).ISFIntervals; //boolean 0 or 1
                console.log(interval);
                isIsfIntervalF = interval;
                var calcM = rows.item(i).insulinCalcMethod; // ICR or SS
                calcMethodF = calcM;

                var insulinR = rows.item(i).insulinRegimen; // pen , pump , etc..
                console.log(insulinR);
                insulinRegF = insulinR;

                callback1(interval);
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

  //========================================================
  const retrieve = (isIsfInterval) => {
      var ISFfromTimesTemp=[];
      var ISFtoTimesTemp=[];
      var ISFsTemp=[];
      var ISFsTragetBGTemp=[];
      var ISFsStartBGTemp=[];
      


    //interval is wither the user is using isf intervals or not ( 1 or 0)
    console.log('in second');
    console.log(isIsfInterval);
    if (isIsfInterval != -1) {
      if (isIsfInterval == 1) {
        // specific hours
        try {
          db.transaction(tx => {
            tx.executeSql(
              'SELECT isfID, UserID, fromTime, toTime, ISF, targetBG_correct, startBG_correct FROM isfIntervalFasting',
              [],
              (tx, results) => {
                var rows = results.rows;
                for (let i = 0; i < rows.length; i++) {
                  var UID = rows.item(i).UserID;
                  if (UID == uID) {
                    //user id
                    var from = rows.item(i).fromTime;
                    ISFfromTimesTemp.push(from);
    
                    var to = rows.item(i).toTime;
                    ISFtoTimesTemp.push(to);

                    var ISF_ = rows.item(i).ISF;
                    ISFsTemp.push(ISF_);

                    var target = rows.item(i).targetBG_correct;
                    ISFsTragetBGTemp.push(target);

                    var start = rows.item(i).startBG_correct;
                    ISFsStartBGTemp.push(start);
                    //  التخزين في ارايز
                  }
                }//for End
                ISFfromTimesF=ISFfromtimesTemp;
                ISFtoTimesF=ISFtoTimesTemp;
                ISFsF=ISFsTemp;
                ISFsTragetBGF=ISFsTragetBGTemp;
                ISFsStartBGF=ISFsStartBGTemp;
              },
            );
          });
        } catch (error) {
          console.log(error);
        }
      } else if (isIsfInterval == 0) {
        // All day
        try {
          db.transaction(tx => {
            tx.executeSql(
              'SELECT UserID, ISF, targetBG_correct, startBG_correct FROM patientprofileFasting',
              [],
              (tx, results) => {
                var rows = results.rows;
                for (let i = 0; i < rows.length; i++) {
                  var UID = rows.item(i).UserID;
                  if (UID == uID) {
                    var ISF_ = rows.item(i).ISF;
                    isfPF=ISF_;

                    var target = rows.item(i).targetBG_correct;
                    tBGPF=target;

                    var start = rows.item(i).startBG_correct;
                    sBGPF=start;
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
  const secondretrieve = (calcMethod) => {
    //calcM??
    console.log('inside is: ' + calcMethod);
    if (calcMethod == 'ICR') {
      var tempArr = []; // array of obj
      try {
        db.transaction(tx => {
          tx.executeSql(
            'SELECT icrID, fromTime, toTime, ICR FROM icrIntervalFasting WHERE UserID=?',
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
              ICRarrF=tempArr;
              console.log(ICRarrF[0].from + 'This is icr arr');
            },
          );
        });
      } catch (error) {
        console.log(error);
      }
    } else if (calcMethod == 'Sliding Scale') {
      console.log('hello Sliding');
      var tempArr = [];
      try {
        db.transaction(tx => {
          tx.executeSql(
            'SELECT ssID, fromTime, toTime FROM ssIntervalFasting WHERE UserID=?',
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
                      'SELECT bgID, fromBGLevel, toBGLevel, insulinDose FROM bgleveltoinsulinFasting WHERE ssID=?',
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
                        //SlidingScaleArr=tempArr;
                      },
                    );
                  });
                } catch (error) {
                  console.log(error);
                }
              }
              SlidingScaleArrF=tempArr;
            },
          );
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  //===========================================================
    //===================Insulin Type
  const retrieve3 = () => {
    // insulinPen table
    try {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT UserID, insulinType, halfORfull FROM insulinPenFasting',
          [],
          (tx, results) => {
            var rows = results.rows;

            for (let i = 0; i < rows.length; i++) {
              var userid = rows.item(i).UserID;
              console.log('Type:  '+rows.item(i).insulinType+' halfOrFullF :  '+rows.item(i).halfORfull);
              if (userid == uID) {
                insulinTypeF=rows.item(i).insulinType;
                halfOrFullF=rows.item(i).halfORfull;
               
                console.log('Type:  '+insulinTypeF+' halfOrFullF :  '+halfOrFullF);

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
          'SELECT insulinDose, Dose_time_hours, Dose_time_minutes FROM takenInsulinDoseFasting WHERE Dose_Date_Day=? and Dose_Date_Month=? and Dose_Date_Year=?',
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
            
            prevArrF=previousDosesArray;

           
            

            if (currentTimeHours <= IOBTimeRange) {
              // then we must take the previous day into consideration too
             
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
                  'SELECT insulinDose, Dose_time_hours, Dose_time_minutes FROM takenInsulinDoseFasting WHERE Dose_Date_Day=? and Dose_Date_Month=? and Dose_Date_Year=?',
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
                    prevArrF=previousDosesArray;
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

    
  };
    //==========================================================








//Choose ISF , Start BG , Target Bg based on current time
  const checkISFIntervals = () => {
    console.log('i got called');
    var index = -1;
    for (let i = 0; i < ISFfromTimesF.length; i++) {
      // icr: icr.length - ss: SlidingScale.length
      if (timeCompare(ISFfromTimesF[i], ISFtoTimesF[i])) {
        // icr: (icr[i].from,icr[i].to) -  ss: (SlidingScale[i].from, SlidingScale[i].to )
        console.log('index: ' + i);
        index = i;
        console.log('found interval at: ' + index);

        isfPF=ISFsF[index];
        tBGPF=ISFsTragetBGF[index];
        sBGPF=ISFsStartBGF[index];

        // return index;
      } else {
        console.log('not found interval');
      }
    }
  };

  //Choose ICR based on current time

  const checkICRIntervals = () => {
    var index = -1;
    for (let i = 0; i < ICRarrF.length; i++) {
      // icr: icr.length - ss: SlidingScale.length
      console.log('i got called ICR');
      if (timeCompare(ICRarrF[i].from, ICRarrF[i].to)) {
        // icr: (icr[i].from,icr[i].to) -  ss: (SlidingScale[i].from, SlidingScale[i].to )
        console.log('index: ' + i);
        index = i;
        console.log('found interval at: ' + index);

        ICRF=ICRarrF[index].icr;

        console.log(ICRF + '  Did u work?');
        // return index;
      } else {
        console.log('not found interval');
      }
    }
  };

  //Choose SS based on current time
  const checkSSIntervals = () => {
    var index = -1;
    for (let i = 0; i < SlidingScaleArrF.length; i++) {
      // icr: icr.length - ss: SlidingScale.length
      console.log('i got called SS');
      if (timeCompare(SlidingScaleArrF[i].from, SlidingScaleArrF[i].to)) {
        // icr: (icr[i].from,icr[i].to) -  ss: (SlidingScale[i].from, SlidingScale[i].to )
        for (let j = 0; j < SlidingScaleArrF[i].Rnages.length; j++) {
          if (
            SlidingScaleArrF[i].Rnages[j].BGFrom <= bgLevel &&
            SlidingScaleArrF[i].Rnages[j].BGTo >= bgLevel
          ) {
            SlidingScaleF=SlidingScaleArrF[i].Rnages[j].insulin;
          }
        }
        console.log('index: ' + i);
        index = i;
        console.log('found interval at: ' + index);
        console.log(SlidingScaleF);

        // setICR(ICRarrF[index].icr);

        // console.log(ICR + '  Did u work?');
        // return index;
      } else {
        console.log('not found interval');
      }
    }
  };








    //====================================================
      //=========================Retrive From DB========================
  

  
  

    //====================================================
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
    //====================================================

    return (
    //ret(),
    <View style={styles.container}>
      <View style={{top: 10, alignItems: 'center'}}>
        <Image source={require('../images/logo.png')} style={styles.pic} />
      </View>
      <ScrollView>
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

        <View style={styles.innerCotainer}>
          <Text style={styles.textBody}>Current BG levet: </Text>
          <TextInput
            keyboardType="decimal-pad"
            placeholder="000.00"
            onChangeText={value => setbgLevel(value)}
            style={styles.inputT}
          />
          <Text style={{fontSize: 15, paddingTop: 15}}>mg/dl</Text>
        </View>

        <View style={styles.innerCotainer2}>

        <Text style={styles.textBody}>Reason for insulin: </Text>
        {calcMethodF == 'ICR' ? (<View>
          <Picker
          selectedValue={reason}
          onValueChange={value => setReason(value)}
          mode="dropdown"
          style={styles.picker}>
          <Picker.Item label="Breakfast (Fatour)" value="0" testID="0"></Picker.Item>
          <Picker.Item label="After Taraweeh Prayer meal" value="1" testID="0"></Picker.Item>
          <Picker.Item label="Suhur" value="2" testID="0"></Picker.Item>
          <Picker.Item
            label="Snack"
            value="3"
            testID="0"></Picker.Item>
          <Picker.Item
            label="No meal only for correction"
            value="5"
            testID="1"></Picker.Item>
        </Picker>
        </View>) : (<View>
          <Picker
          selectedValue={reason}
          onValueChange={value => setReason(value)}
          mode="dropdown"
          style={styles.picker}>
          <Picker.Item label="Breakfast (Fatour)" value="0" testID="0"></Picker.Item>
          <Picker.Item label="After Taraweeh Prayer meal (Main meal)" value="1" testID="0"></Picker.Item>
          <Picker.Item label="After Taraweeh Prayer meal (small meal)" value="1" testID="0"></Picker.Item>
          <Picker.Item label="Suhur" value="2" testID="0"></Picker.Item>
          <Picker.Item
            label="Snack"
            value="3"
            testID="0"></Picker.Item>
          <Picker.Item
            label="No meal only for correction"
            value="5"
            testID="1"></Picker.Item>
        </Picker> 
        </View>)}
        
        </View>
        { (reason == '5' || calcMethodF == 'Sliding Scale') ? null : (
        <View style={styles.innerCotainer}>
          <Text style={styles.textBody}>Meal carbohydrate content: </Text>
          <TextInput
            keyboardType="decimal-pad"
            placeholder="000.00 g"
            onChangeText={value => setCHO(value)}
            style={styles.inputT}></TextInput>
        

        <TouchableOpacity onPress={()=>navigation.navigate('carb')} style={styles.buttonR}>
          <Text style={{fontSize: 18, textAlign: 'center', color: 'white',}}>
            Carbohydrate Calculator
          </Text>
          {/* <Image
            source={require('./images/carb.png')}
            style={{height: 30, width: 30}}
          /> */}
        </TouchableOpacity>
        </View>
        )}

        <View style={styles.innerCotainer3}>
      

        <Text style={styles.textBody}>
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
              <Text style={styles.textBody}>Type of exercise: </Text>
              <Picker
                selectedValue={preTypeOfExercise}
                onValueChange={value => setPreTypeOfExercise(value)}
                mode="dropdown"
                style={styles.picker}>
                
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

              <Text style={styles.textBody}>Duration of exercise: </Text>
              <Picker
                selectedValue={preDuration}
                onValueChange={value => setPreDuration(value)}
                mode="dropdown"
                style={styles.picker}>
               
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

        </View>
        <View style={styles.innerCotainer3}>

        <Text style={styles.textBody}>
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
            <Text style={styles.textBody}>Type of exercise: </Text>
            <Picker
              selectedValue={postTypeOfExercise}
              onValueChange={value => setPostTypeOfExercise(value)}
              mode="dropdown"
              style={styles.picker}>
              
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

            <Text style={styles.textBody}>Duration of exercise: </Text>
            <Picker
              selectedValue={postDuration}
              onValueChange={value => setPostDuration(value)}
              mode="dropdown"
              style={styles.picker}>
             
              <Picker.Item
                label="Less than 30 minutes"
                value="14"></Picker.Item>
              <Picker.Item label="30 to 45 minutes" value="31"></Picker.Item>
              <Picker.Item
                label="More than 45 minutes"
                value="46"></Picker.Item>
            </Picker>

            <Text style={styles.textBody}>Time of exersice: </Text>
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

        </View>

        <TouchableOpacity
          style={styles.buttonV}
          onPress={insuCalc}
          >
          <Text style={{fontSize: 18, textAlign: 'center', color: 'white',}}>Calculate</Text>
        </TouchableOpacity>

        <Text></Text>
      </ScrollView>
    </View>
  );

    };

const {height} = Dimensions.get("screen");
const height_logo = height * 0.15;


const styles = StyleSheet.create({

  pic: {
    width: 70,
    height: 90,
  },


//====================newStyle========================
container: {
    flex: 1,
    backgroundColor: '#EEF0F2',
  },
//   pic: {
//     width: height_logo,
//     height: height_logo,
//     marginRight: 10,
// },
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
textBody:{
    
    fontSize: 20,
    color: '#05375a', 
    textAlign: 'center',
    fontWeight: 'bold',
 }, 
 textBody2:{
   marginTop:5,
   padding: 10,
    
  fontSize: 15,
  backgroundColor: '#506c80', 
  color: 'white',
  textAlign: 'center',
  fontWeight: 'bold',
  borderRadius: 10,
}, 
 innerCotainer: {
  backgroundColor: 'white', margin: 10, alignItems: 'center',  borderRadius: 15, padding: 5, width: 380,
       flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
    marginBottom: 5,
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
  
  textAlign: 'left',
  backgroundColor: 'white',
  borderRadius: 15,
  paddingBottom: 15,
  width: 380,
  alignSelf: 'center',
              shadowColor: "#000",
              shadowOffset: {
              width: 0,
              height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
},
innerCotainer3: {
  
  textAlign: 'left',
  backgroundColor: 'white',
  borderRadius: 15,
  paddingBottom: 15,
  marginBottom: 10,
  marginTop: 15,
  width: 380,
  alignSelf: 'center',
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
  backgroundColor: '#05375a',
  alignItems: 'center',
  width: 350,
  height: 45,
  justifyContent: 'center',
  borderRadius: 15,
  flexDirection: 'row',
  alignSelf: 'center',
  shadowColor: "#000",
              shadowOffset: {
              width: 0,
              height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
  
  
  
},
inputT: {
  //inputs field
  color: '#000',
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


buttonR: {

  backgroundColor: '#05375a',
  alignItems: 'center',
  alignSelf: 'center',
  width: 380,
  height: 45,
  marginTop:10,
  marginBottom:10,
  justifyContent: 'center',
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
  ddown: {
  //drop down list style


  shadowColor: '#000',
  alignSelf: 'center',
  width: 140,


  alignItems: 'center',
  

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
picker: {
  color: '#032136',
},
 msg: {
    //lables
    paddingLeft: 20,
    paddingTop: 15,
    fontSize: 18,
    color: 'red',
  },
//====================newStyle========================
});


export default Calc;
