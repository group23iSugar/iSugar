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

const CalcAR = ({navigation, route}) => {

    useEffect(() => {
     FirstRetrieve(retrieve,secondretrieve);
     retrieve3();
     retrieve4();
     

   }, []);


   //================================insulin calc methods==================
    const insuCalc = () => {
      bgLevelDB=bgLevel;
      reasonDB=reason;
      choDB=CHO;

    if(isIsfInterval == 1){
     checkISFIntervals(); //Retrives from DB
    }

    for(let x =0; x<prevArr.length; x++){
      console.log('=================================');
      console.log(prevArr[x].time);
      console.log(prevArr[x].dose);
      console.log('=================================');
    }

    console.log(prevArr);
    var a;
    var b;
    var c = 0;
    var IOB = 0;
    var adjustment;
    var txt1 = '';

    if (
      (insulinReg == 'Pen' || insulinReg == 'pen') &&
      (insulinType == 'Aspart' ||
        insulinType == 'Lispro' ||
        insulinType == 'Glulisine')
    ) {
      if (bgLevel > 70) {
        if (reason == '5') {
          if (bgLevel > sBGP) {
            a = 0;
            b = (bgLevel - tBGP) / isfP;
            c = a + b;
           // console.log('5-  ' + c);
                txt1 = txt1 + ':لأن السبب هو التصحيح \n * Total = (current BG - Target BG)/ISF \n'+ c +'='+a+'+'+b+'\n';

            //prevArr
            console.log('THA LENGTH:    '+ prevArr.length);
            if (prevArr.length == 0){
              	IOB = 0;} else {
                   txt1 = txt1 + '\n:لأنك اخذت جرعة انسولين خلال الاربع ساعات الماضية  \n* Total = Total - IOB \n';

                  for (let i = 0; i < prevArr.length; i++){
                    console.log('DoubleCheckaaaaa');
                    console.log('DoubleCheck: '+prevArr[i].time +' '+ prevArr[i].dose);
                    // var w = parseInt(prevArr[i].dose);
		               IOB = IOB + IOBSwitch(prevArr[i].time, prevArr[i].dose); 
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

              txt1 = txt1 + '\n:لأنك تخطط لممارسة الرياضة خلال الثلاث ساعات القادمة \n* Total = Total - (exercise adjustment * Total)\n';
		     txt1=txt1+'Total '+'='+c+'-'+adjustment+'*'+c+'\n';

              // return (total);
            } else if (isPostEnabled == true) {
              adjustment = PostExercise();
              c = c - adjustment * c;
              txt1 = txt1 + '\n:لأنك تمرنت في الست ساعات الماضية \n* Total = Total - (exercise adjustment * Total)\n';
		     txt1=txt1+'Total '+'='+c+'-'+adjustment+'*'+c+'\n';

              // return (total);
            }
          } else {
            alert('لا حاجة إلى التصحيح');
            return;
          }
        } else {
          if (calcMethod == 'ICR') {
            console.log('is ICR?');
            checkICRIntervals();
            txt1 = txt1 + '\n:لأن سبب اخذ جرعة الانسولين هو وجبة \n* Insulin A = CHO / ICR \n';
            a = CHO / ICR;
		   txt1=txt1+' Total '+'='+CHO+'/'+ICR+'\n';
            if (bgLevel > sBGP) {
              b = (bgLevel - tBGP) / isfP;
               txt1 = txt1 + '\n:لأن مستوى سكر الدم الحالي يحتاج الى تصحيح \n* Total = Total + ((current BG - Target BG) / ISF) \n';
		    txt1=txt1+'Total '+'='+c+'+(('+bgLevel+'-'+tBGP+')/'+isfP+'\n';
            } else {
              b = 0;
            }
            c = a + b;

          if (prevArr.length == 0){
              	IOB = 0;} else {
                   txt1 = txt1 + '\n:لأنك اخذت جرعة انسولين خلال الاربع ساعات الماضية \n* Total = Total - IOB\n';

                  for (let i = 0; i < prevArr.length; i++){
                    console.log('DoubleCheckaaaaa');
                    console.log('DoubleCheck: '+prevArr[i].time +' '+ prevArr[i].dose);
		               IOB = IOB + IOBSwitch(prevArr[i].time, prevArr[i].dose); 
                   }
			 txt1=txt1+'Total '+'='+c+'-'+IOB+'\n';
                }
            c = c - IOB;
		
            

            if (isPreEnabled == true) {
              adjustment = PreExercise();
              c = c - adjustment * c;

              txt1 = txt1 + '\n:لأنك تخطط لممارسة الرياضة خلال الثلاث ساعات القادمة\n* Total = Total - (exercise adjustment * Total)\n';
		     txt1=txt1+'Total '+'='+c+'-'+adjustment+'*'+c+'\n';

            } else if (isPostEnabled == true) {
              if (differ <= 4 && differ >= 0) {
                adjustment = PostExercise();
                c = c - adjustment * c;

                txt1 = txt1 + '\n:لأنك تمرنت في الست ساعات الماضية \n* Total = Total - (exercise adjustment * Total)\n';
		       txt1=txt1+'Total '+'='+c+'-'+adjustment+'*'+c+'\n';

               
              }
            }
          } else {
            
         checkSSIntervals();
            console.log('is Sliding?');
            c = SlidingScale; // from database
            txt1 = txt1 + '\n:لأنك تستخدم  جدول بجرعات أنسولين ثابتة حسب مستوى سكر الدم \n* Total = جرعة الأنولين للوجبة حسب الوقت الحالي\n';
		  txt1= txt1+'Total ='+c+'\n';
            console.log('this is c: ' + c + ' And Sliding: ' + SlidingScale);
            console.log(c + '  This is tt');
                if (prevArr.length == 0){
              	IOB = 0;} else {
                  txt1 = txt1 + '\n:لأنك اخذت جرعة انسولين خلال الاربع ساعات الماضية \n* Total = Total - IOB\n';

                  for (let i = 0; i < prevArr.length; i++){
                    console.log('DoubleCheckaaaaa');
                    console.log('DoubleCheck: '+prevArr[i].time +' '+ prevArr[i].dose);
		               IOB = IOB + IOBSwitch(prevArr[i].time, prevArr[i].dose); 
                   }
			 txt1=txt1+'Total '+'='+c+'-'+IOB+'\n';
                }
            console.log('This is c: ' + c);
            c = c - IOB;
		  
             
            console.log(IOB + '  This is IOB and c after IOB: ' + c);

            if (isPreEnabled == true) {
              adjustment = PreExercise();
              c = c - adjustment * c;

               txt1 = txt1 + '\n:لأنك تخطط لممارسة الرياضة خلال الثلاث ساعات القادمة \n* Total = Total - (exercise adjustment * Total)\n';
		    txt1=txt1+'Total '+'='+c+'-'+adjustment+'*'+c+'\n';

              
            } else if (isPostEnabled == true) {
            if (differ <= 4 && differ >= 0) {
                adjustment = PostExercise();
                c = c - adjustment * c;

                 txt1 = txt1 + '\n:لأنك تمرنت في الست ساعات الماضية \n* Total = Total - (exercise adjustment * Total)\n';
		    txt1=txt1+'Total '+'='+c+'-'+adjustment+'*'+c+'\n';

                
              }

             
            }
          }
        }
      } else {
       navigation.navigate('hypoAR');
      }
    } else {
      alert(
        'للأسف حساب جرعة الأنسولين التي تستخدمها غير مدعومة خلال التطبيق. الرجاء التواصل مع طبيبك لمعرفة كيفية حساب جرعة الأنسولين',
      );
      return;
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


    totalInulin=c;
    if(c<0){
      c=0;
    }
    txt1=txt1+'= '+c;
    howText=txt1;
    
    console.log(c + ' and:3  ' + totalInulin);



    navigation.navigate('insuResultAR');
    // navigation.navigate('result',{result: total, calcM: calcMethod, reasonD: reason, bg: bgLevel, cho: CHO})
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
        // insulinRegimen, ISFIntervals, insulinCalcMethod Retrive
        tx.executeSql(
          'SELECT UserID, insulinRegimen, ISFIntervals, insulinCalcMethod FROM patientprofile',
          [],
          (tx, results) => {
            var rows = results.rows;
            for (let i = 0; i < rows.length; i++) {
              var UID = rows.item(i).UserID;
              if (UID == 222) {
                console.log('in if (user is found)');
                interval = rows.item(i).ISFIntervals; //boolean 0 or 1
                console.log(interval);
                isIsfInterval = interval;
                var calcM = rows.item(i).insulinCalcMethod; // ICR or SS
                calcMethod = calcM;

                var insulinR = rows.item(i).insulinRegimen; // pen , pump , etc..
                console.log(insulinR);
                insulinReg = insulinR;

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
      var ISFfromtimesTemp=[];
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
              'SELECT isfID, UserID, fromTime, toTime, ISF, targetBG_correct, startBG_correct FROM isfInterval',
              [],
              (tx, results) => {
                var rows = results.rows;
                for (let i = 0; i < rows.length; i++) {
                  var UID = rows.item(i).UserID;
                  if (UID == 222) {
                    //user id
                    var from = rows.item(i).fromTime;
                    ISFfromtimesTemp.push(from);
    
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
                ISFfromTimes=ISFfromtimesTemp;
                ISFtoTimes=ISFtoTimesTemp;
                ISFs=ISFsTemp;
                ISFsTragetBG=ISFsTragetBGTemp;
                ISFsStartBG=ISFsStartBGTemp;
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
              'SELECT UserID, ISF, targetBG_correct, startBG_correct FROM patientprofile',
              [],
              (tx, results) => {
                var rows = results.rows;
                for (let i = 0; i < rows.length; i++) {
                  var UID = rows.item(i).UserID;
                  if (UID == 222) {
                    var ISF_ = rows.item(i).ISF;
                    isfP=ISF_;

                    var target = rows.item(i).targetBG_correct;
                    tBGP=target;

                    var start = rows.item(i).startBG_correct;
                    sBGP=start;
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
            'SELECT icrID, fromTime, toTime, ICR FROM icrInterval WHERE UserID=?',
            [222],
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
              ICRarr=tempArr;
              console.log(ICRarr[0].from + 'This is icr arr');
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
            'SELECT ssID, fromTime, toTime FROM ssInterval WHERE UserID=?',
            [222],
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
                        //SlidingScaleArr=tempArr;
                      },
                    );
                  });
                } catch (error) {
                  console.log(error);
                }
              }
              SlidingScaleArr=tempArr;
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
          'SELECT UserID, insulinType, halfORfull FROM insulinPen',
          [],
          (tx, results) => {
            var rows = results.rows;

            for (let i = 0; i < rows.length; i++) {
              var userid = rows.item(i).UserID;

              if (userid == 222) {
                insulinType=rows.item(i).insulinType;
                halfOrFull=rows.item(i).halfORfull;
               
                console.log('Type:  '+insulinType+' HalfOrFull :  '+halfOrFull);

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
            
            prevArr=previousDosesArray;

           
            

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
                    prevArr=previousDosesArray;
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
    for (let i = 0; i < ISFfromTimes.length; i++) {
      // icr: icr.length - ss: SlidingScale.length
      if (timeCompare(ISFfromTimes[i], ISFtoTimes[i])) {
        // icr: (icr[i].from,icr[i].to) -  ss: (SlidingScale[i].from, SlidingScale[i].to )
        console.log('index: ' + i);
        index = i;
        console.log('found interval at: ' + index);

        isfP=ISFs[index];
        tBGP=ISFsTragetBG[index];
        sBGP=ISFsStartBG[index];

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

        ICR=ICRarr[index].icr;

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
            SlidingScale=SlidingScaleArr[i].Rnages[j].insulin;
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
        <Image source={require('./images/logo.png')} style={styles.pic} />
      </View>
      <ScrollView>
        <Text
          style={{
            color: '#000',
            fontSize: 25,
            textAlign: 'right',
            paddingTop: 20,
            paddingRight: 15,
          }}>
          حاسبة الإنسولين
        </Text>

        <View style={styles.innerCotainer}>
        <Text style={{fontSize: 15, paddingTop: 15}}>ميليجرام/{'\n'}ديسيلتر </Text>
        
          <TextInput
            keyboardType="decimal-pad"
            placeholder="000.00"
            onChangeText={value => setbgLevel(value)}
            style={styles.inputT}
          />
          
          <Text style={styles.textBody}>مستوى سكر الدم الحالي:</Text>
        </View>

        <View style={styles.innerCotainer2}>

        <Text style={styles.textBody}>سبب أخذ جرعة الانسولين:</Text>

        <Picker
          selectedValue={reason}
          onValueChange={value => setReason(value)}
          mode="dropdown"
          style={styles.picker}>
          <Picker.Item label="قبل الفطور" value="0" testID="0"></Picker.Item>
          <Picker.Item label="قبل الغداء" value="1" testID="0"></Picker.Item>
          <Picker.Item label="قبل العشاء" value="2" testID="0"></Picker.Item>
          <Picker.Item
            label="قبل الوجبة الخفيفة النهارية"
            value="3"
            testID="0"></Picker.Item>
          <Picker.Item
            label="قبل الوجبة الخفيفة الليلية"
            value="4"
            testID="0"></Picker.Item>
          <Picker.Item
            label="للتصحيح فقط (لا توجد وجبة)"
            value="5"
            testID="1"></Picker.Item>
        </Picker>
        </View>
        { (reason == '5' || calcMethod == 'Sliding Scale')  ? null :  (
        <View style={styles.innerCotainer}>
          
          <TextInput
            keyboardType="decimal-pad"
            placeholder="000.00 جرام"
            onChangeText={value => setCHO(value)}
            style={styles.inputT}></TextInput>
            <Text style={styles.textBody}>محتوى الوجبة من الكربوهايدرات:</Text>
        

        <TouchableOpacity onPress={()=>navigation.navigate('carbAR')} style={styles.buttonR}>
          <Text style={{fontSize: 18, textAlign: 'center', color: 'white',}}>
            حاسبة الكاربوهايدرات
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
        هل ستقوم بممارسة الرياضة خلال ٣ ساعات القادمة؟{' '}
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
              <Text style={styles.textBody}>نوع الرياضة:</Text>
              <Picker
                selectedValue={preTypeOfExercise}
                onValueChange={value => setPreTypeOfExercise(value)}
                mode="dropdown"
                style={styles.picker}>
                
                <Picker.Item label="الجري" value="1" testID="0"></Picker.Item>
                <Picker.Item
                  label="السباحة"
                  value="2"
                  testID="0"></Picker.Item>
                <Picker.Item label="المشي" value="3" testID="0"></Picker.Item>
                <Picker.Item
                  label="ركوب الدراجة الثابتة (الدوران السريع)"
                  value="4"
                  testID="0"></Picker.Item>
                <Picker.Item
                  label="تسلق الجبال"
                  value="5"
                  testID="0"></Picker.Item>
                <Picker.Item label="الرقص" value="6" testID="0"></Picker.Item>
                <Picker.Item
                  label="الكيك بوكسينغ
                  Kickboxing"
                  value="7"
                  testID="0"></Picker.Item>
                <Picker.Item
                  label="التزلج على الثلج"
                  value="8"
                  testID="0"></Picker.Item>
                <Picker.Item
                  label="تمارين القفز
                  Jumping jacks"
                  value="9"
                  testID="0"></Picker.Item>
                <Picker.Item label="التجديف" value="10" testID="0"></Picker.Item>
                <Picker.Item
                  label="الفنون القتالية"
                  value="11"
                  testID="0"></Picker.Item>
                <Picker.Item label="رقص الزومبا" value="12" testID="0"></Picker.Item>
                <Picker.Item
                  label="كرة السلة"
                  value="13"
                  testID="0"></Picker.Item>
                <Picker.Item
                  label="القفز على النطيطة"
                  value="14"
                  testID="0"></Picker.Item>
                <Picker.Item
                  label="تمارين التقوية الهوائية المتتابعة"
                  value="15"
                  testID="0"></Picker.Item>
                <Picker.Item
                  label="ركوب الدراجة"
                  value="16"
                  testID="0"></Picker.Item>
                <Picker.Item
                  label="الهرولة"
                  value="17"
                  testID="0"></Picker.Item>
                <Picker.Item
                  label="تمارين الكارديو/ أجهزة تمارين الكارديو"
                  value="19"
                  testID="0"></Picker.Item>
                <Picker.Item
                  label="دروس التمارين الهوائية – تمارين الأيروبك"
                  value="20"
                  testID="0"></Picker.Item>
                <Picker.Item
                  label="القفز بحبل القفز 
                  Jump rope
                  "
                  value="21"
                  testID="0"></Picker.Item>
                <Picker.Item
                  label="صعود الدرج (جهاز الدرج)"
                  value="22"
                  testID="0"></Picker.Item>
                <Picker.Item
                  label="ركوب الدراجة الثابتة"
                  value="23"
                  testID="0"></Picker.Item>
                <Picker.Item
                  label="جهاز الاليبتكال"
                  value="24"
                  testID="0"></Picker.Item>
                <Picker.Item
                  label="التزلج"
                  value="25"
                  testID="0"></Picker.Item>
                <Picker.Item label="كرة المضرب" value="26" testID="0"></Picker.Item>
                <Picker.Item label="كرة القدم" value="27" testID="0"></Picker.Item>
                <Picker.Item label="الملاكمة" value="28" testID="0"></Picker.Item>
                <Picker.Item
                  label="اللعب بحلقة الهولا هوب"
                  value="29"
                  testID="0"></Picker.Item>
                <Picker.Item
                  label="رياضة/تمارين هوائية أخرى"
                  value="30"
                  testID="0"></Picker.Item>
                <Picker.Item
                  label="HIIT (تمارين القوة العالية المتقطعة)"
                  value="31"
                  testID="1"></Picker.Item>
                <Picker.Item
                  label="Pilates البيلاتس "
                  value="32"
                  testID="1"></Picker.Item>
                <Picker.Item
                  label="تمارين التقوية اللاهوائية المتتابعة"
                  value="33"
                  testID="1"></Picker.Item>
                <Picker.Item
                  label="Sprinting الجري المتسارع"
                  value="34"
                  testID="1"></Picker.Item>
                <Picker.Item
                  label="تمارين المقاومة"
                  value="35"
                  testID="1"></Picker.Item>
                <Picker.Item
                  label="التمارين المعتمدة على وزن الجسم (مثل تمارين الضغط، الرفع، القرفصاء)"
                  value="36"
                  testID="1"></Picker.Item>
                <Picker.Item
                  label="رفع الأثقال"
                  value="37"
                  testID="1"></Picker.Item>
                <Picker.Item label="اليوجا " value="38" testID="1"></Picker.Item>
                <Picker.Item
                  label="تمارين الكروس فيت"
                  value="39"
                  testID="1"></Picker.Item>
                <Picker.Item
                  label="Isometrics تمارين الأيزوميتركس"
                  value="40"
                  testID="1"></Picker.Item>
                <Picker.Item
                  label="الجمباز"
                  value="41"
                  testID="1"></Picker.Item>
                <Picker.Item
                  label="رياضة/تمارين هوائية اخرى"
                  value="42"
                  testID="1"></Picker.Item>
              </Picker>

              <Text style={styles.textBody}>مدّة الرياضة:</Text>
              <Picker
                selectedValue={preDuration}
                onValueChange={value => setPreDuration(value)}
                mode="dropdown"
                style={styles.picker}>
                
                <Picker.Item
                  label="أقل من 15 دقيقة"
                  value="14"></Picker.Item>
                <Picker.Item label="من 15 الى 29 دقيقة" value="16"></Picker.Item>
                <Picker.Item label="من 30 الى 45 دقيقة" value="31"></Picker.Item>
                <Picker.Item
                  label="اكثر من 45 دقيقة"
                  value="46"></Picker.Item>
                <Picker.Item label="غير محدد" value="Unknown"></Picker.Item>
              </Picker>
            </View>
          </View>
        ) : null}

        </View>
        <View style={styles.innerCotainer3}>

        <Text style={styles.textBody}>
        هل مارست الرياضة خلال ٦ ساعات الماضية؟
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
            <Text style={styles.textBody}>نوع الرياضة:</Text>
            <Picker
              selectedValue={postTypeOfExercise}
              onValueChange={value => setPostTypeOfExercise(value)}
              mode="dropdown"
              style={styles.picker}>
              
              <Picker.Item label="الجري" value="1" testID="0"></Picker.Item>
                <Picker.Item
                  label="السباحة"
                  value="2"
                  testID="0"></Picker.Item>
                <Picker.Item label="المشي" value="3" testID="0"></Picker.Item>
                <Picker.Item
                  label="ركوب الدراجة الثابتة (الدوران السريع)"
                  value="4"
                  testID="0"></Picker.Item>
                <Picker.Item
                  label="تسلق الجبال"
                  value="5"
                  testID="0"></Picker.Item>
                <Picker.Item label="الرقص" value="6" testID="0"></Picker.Item>
                <Picker.Item
                  label="الكيك بوكسينغ
                  Kickboxing"
                  value="7"
                  testID="0"></Picker.Item>
                <Picker.Item
                  label="التزلج على الثلج"
                  value="8"
                  testID="0"></Picker.Item>
                <Picker.Item
                  label="تمارين القفز
                  Jumping jacks"
                  value="9"
                  testID="0"></Picker.Item>
                <Picker.Item label="التجديف" value="10" testID="0"></Picker.Item>
                <Picker.Item
                  label="الفنون القتالية"
                  value="11"
                  testID="0"></Picker.Item>
                <Picker.Item label="رقص الزومبا" value="12" testID="0"></Picker.Item>
                <Picker.Item
                  label="كرة السلة"
                  value="13"
                  testID="0"></Picker.Item>
                <Picker.Item
                  label="القفز على النطيطة"
                  value="14"
                  testID="0"></Picker.Item>
                <Picker.Item
                  label="تمارين التقوية الهوائية المتتابعة"
                  value="15"
                  testID="0"></Picker.Item>
                <Picker.Item
                  label="ركوب الدراجة"
                  value="16"
                  testID="0"></Picker.Item>
                <Picker.Item
                  label="الهرولة"
                  value="17"
                  testID="0"></Picker.Item>
                <Picker.Item
                  label="تمارين الكارديو/ أجهزة تمارين الكارديو"
                  value="19"
                  testID="0"></Picker.Item>
                <Picker.Item
                  label="دروس التمارين الهوائية – تمارين الأيروبك"
                  value="20"
                  testID="0"></Picker.Item>
                <Picker.Item
                  label="القفز بحبل القفز 
                  Jump rope
                  "
                  value="21"
                  testID="0"></Picker.Item>
                <Picker.Item
                  label="صعود الدرج (جهاز الدرج)"
                  value="22"
                  testID="0"></Picker.Item>
                <Picker.Item
                  label="ركوب الدراجة الثابتة"
                  value="23"
                  testID="0"></Picker.Item>
                <Picker.Item
                  label="جهاز الاليبتكال"
                  value="24"
                  testID="0"></Picker.Item>
                <Picker.Item
                  label="التزلج"
                  value="25"
                  testID="0"></Picker.Item>
                <Picker.Item label="كرة المضرب" value="26" testID="0"></Picker.Item>
                <Picker.Item label="كرة القدم" value="27" testID="0"></Picker.Item>
                <Picker.Item label="الملاكمة" value="28" testID="0"></Picker.Item>
                <Picker.Item
                  label="اللعب بحلقة الهولا هوب"
                  value="29"
                  testID="0"></Picker.Item>
                <Picker.Item
                  label="رياضة/تمارين هوائية أخرى"
                  value="30"
                  testID="0"></Picker.Item>
                <Picker.Item
                  label="HIIT (تمارين القوة العالية المتقطعة)"
                  value="31"
                  testID="1"></Picker.Item>
                <Picker.Item
                  label="Pilates البيلاتس "
                  value="32"
                  testID="1"></Picker.Item>
                <Picker.Item
                  label="تمارين التقوية اللاهوائية المتتابعة"
                  value="33"
                  testID="1"></Picker.Item>
                <Picker.Item
                  label="Sprinting الجري المتسارع"
                  value="34"
                  testID="1"></Picker.Item>
                <Picker.Item
                  label="تمارين المقاومة"
                  value="35"
                  testID="1"></Picker.Item>
                <Picker.Item
                  label="التمارين المعتمدة على وزن الجسم (مثل تمارين الضغط، الرفع، القرفصاء)"
                  value="36"
                  testID="1"></Picker.Item>
                <Picker.Item
                  label="رفع الأثقال"
                  value="37"
                  testID="1"></Picker.Item>
                <Picker.Item label="اليوجا " value="38" testID="1"></Picker.Item>
                <Picker.Item
                  label="تمارين الكروس فيت"
                  value="39"
                  testID="1"></Picker.Item>
                <Picker.Item
                  label="Isometrics تمارين الأيزوميتركس"
                  value="40"
                  testID="1"></Picker.Item>
                <Picker.Item
                  label="الجمباز"
                  value="41"
                  testID="1"></Picker.Item>
                <Picker.Item
                  label="رياضة/تمارين هوائية اخرى"
                  value="42"
                  testID="1"></Picker.Item>
            </Picker>

            <Text style={styles.textBody}>مدّة الرياضة:</Text>
            <Picker
              selectedValue={postDuration}
              onValueChange={value => setPostDuration(value)}
              mode="dropdown"
              style={styles.picker}>
              <Picker.Item
                label="أقل من 30 دقيقة"
                value="14"></Picker.Item>
              <Picker.Item label="من 30 الى 45 دقيقة" value="31"></Picker.Item>
              <Picker.Item
                label="أكثر من 45 دقيقة"
                value="46"></Picker.Item>
            </Picker>

            <Text style={styles.textBody}>وقت الرياضة:</Text>
            <View>
              <Button onPress={showPosTimeMethod} title="قم بتحديد الوقت" />
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
          <Text style={{fontSize: 18, textAlign: 'center', color: 'white',}}>احسب</Text>
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
  
  textAlign: 'right',
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
  
  textAlign: 'right',
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
  marginRight: 10,
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
  marginRight: 10,
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
    paddingRight: 20,
    paddingTop: 15,
    fontSize: 18,
    color: 'red',
  },
//====================newStyle========================
});


export default CalcAR;