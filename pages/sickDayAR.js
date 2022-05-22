/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable semi */
/* eslint-disable no-trailing-spaces */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import { StyleSheet,
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Alert,
    alert,
    Dimensions } from 'react-native';
    import LinearGradient from 'react-native-linear-gradient';
import {Picker} from '@react-native-picker/picker';
import Entypo from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import tableCalc from './tableCalcAR';
import SQLite from 'react-native-sqlite-storage';
import tableukgCopy from './tableukgCopyAR';
import tableText from './tableTextAR';
import timeCompare from './timeCompare';
import PushNotification from 'react-native-push-notification';

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

global.TotalDailyDose = 0;
global.Flags = '';
global.interval = -1;
global.c = 0;
global.dose = 0;
global.hasRecord = '';
global.age = 0;
global.ISF = 0;
global.startBG = 0;
global.targetBG = 0;
global.ICR = 0;
global.ICRarr = [];
global.fromTime = [];
global.toTime = [];
global.isf = [];
global.tBG = [];
global.sBG = [];

global.isfP = -1;
global.tBGP = -1;
global.sBGP = -1;

global.glucagonRecFirst = '';
global.glucagonRecheck = '';
global.glucagonInstruct = '';
global.finalGlucagon = '';
var insulinOther = '';
global.bgArr = [];
global.insuArr = [];
global.SlidingScaleArr = [];
global.SlidingScale = 0;
global.halfOrFull = 0;
global.InsulinTwoWeek = 'false';
global.userDay = 0;
global.userMonth = 0;
global.userYear = 0;
global.totalInsulin = 0;
global.totalAvgInsulin = 0;

const sickDay = ({ navigation }) => {

      //variables
      var onlinUserID = 15;//54 is the user for table 3
      var uID = 1;
      var curDate = moment().format('YYYY-MM-DD');
      var curTime = moment().format('HH:mm:ss');
      var cTime = new Date();
      var currentDate = moment().format('YYYY-MM-DD');
      var currentTime = moment().format('HH:mm:ss');
      const [currentBG, setCurrentBG] = useState('');//for current BG level
      const [ketones, setKetones] = useState('0');//for ketones source
      const [blood, setBlood] = useState('0');//for ketones level -blood
      const [urine, setUrine] = useState('0');//for ketones level -urine
      const [meal, setMeal] = useState('No');//to check if it is a meal time
      const [mealTime, setMealTime] = useState('0');//to check which meal is
      const [carb, setCarb] = useState('0');//for carbs
      //to recheck if recommendation will be from table SD ukg
      const [ReData1, setReData1] = useState({
          weight: 0,
          additionDate: '',
          weightInSixMonth: 'false',
          dob: '',
        });
      const [ReData2, setReData2] = useState({
        insulinR: '',
        insuClac: '',
        insulinType: '',
        //insulinType: '',
      });

      const [ReData3, setReData3] = useState({
        takeTDD: 'false',
        lessThanTwo: 'false',
      });

      const [flag, setFlag] = useState('false');
      const [recom, setRecom] = useState('0');//recommendations
      const [level, setLevel] = useState('0');//either it's blood or urine ketones source
      const [extraInsulin, setExtraInsulin] = useState('0');//for extra insulin
      const [TDD, setTDD] = useState(0);//for extra insulin
      const [lessThanTwoHour, setLessThanTwoHour] = useState(' ');
      var recommendation = '';
      global.T = '';
      global.Total = '';
      global.ketonesLevel = '';
      global.TotalDD = '';
      // ======= Patient Profile ===== //
      const [calcMethod, setCalcM] = useState('');
      const [isIsfInterval, setInterval] = useState(-1);
      const [insulinReg, setReg] = useState('');
      const [insulinType, setType] = useState('');
      
      useEffect(() => {
          check();
          checkReg();
          checkInsulinType();
          checkLessThanTwoHour();    
          lessthanTwo();
          FirstRetrieve();
          // insert2();
          // retrieveTableTwo();
          // eslint-disable-next-line react-hooks/exhaustive-deps
          }, []);

    const Recommendations = () => {
                if (currentBG != '' && ketones != '0'){ //to ensure all fields are not empty
                    if (ReData1.weightInSixMonth == 'true' && (ReData2.insulinType == 'Aspart' || ReData2.insulinType == 'Lispro' || ReData2.insulinType == 'Glulisine')){
                      T = 'T1';  
                      //table 1
                           if (blood != '0'){
                            setLevel(blood);
                             console.log('k : ' + ketones);
                             if (meal != 'No'){
                             TotalDD = insuliAB(currentBG, ketones, blood, carb, Flags);
                             }
                             console.log('MEEAAAL? ' + meal);
                            recommendation = tableukgCopy(currentBG, ketones, blood, meal, Flags);
                           } else {
                             if (urine == 'Negative' || urine == 'Trace' || urine == 'Small' || urine == 'Moderate' || urine == 'Large'){
                             setLevel(urine);
                              console.log('k : ' + ketones);
                              if (meal != 'No'){
                              TotalDD = insuliAB(currentBG, ketones, urine, carb, Flags);
                             }
                             console.log('MEEAAAL? ' + meal);
                             recommendation = tableukgCopy(currentBG, ketones, urine, meal, Flags);
                             }
                           }
                        console.log('The recommendation is : ' + recommendation);
                        console.log('Table name: ' + T);
                        //only we calculate the extra insulin dose in this two situations
                        if ( (ReData3.lessThanTwo == 'true' && ReData3.takeTDD == 'false') ||
                        ReData3.lessThanTwo == 'false'){
                          console.log('Hi1');
                          if ( Flags != 'true'){
                          if (blood != '0'){
                            extraInsulinKg(currentBG, ketones, blood, ReData1.weight);
                           } else {
                             if (urine == 'Negative' || urine == 'Trace' || urine == 'Small' || urine == 'Moderate' || urine == 'Large'){
                              extraInsulinKg(currentBG, ketones, urine, ReData1.weight);
                             }
                           } 
                          }//to ensure no recheck before 2 hours     
                        } else {
                          console.log('Hi2');
                          ReData3.takeTDD = 'false';
                        }

                    }//end if
                    else { // if the weight date > 6 months
                      if ((ReData2.insulinR != 'pump' && ReData2.insulinR != 'Pump') && (ReData2.insulinType == 'Aspart' || ReData2.insulinType == 'Lispro' || ReData2.insulinType == 'Glulisine') && insulinOther != ''){
                          //table 2
                          T = 'T2';  
                                if (blood != '0'){
                                setLevel(blood);
                                  console.log('k : ' + ketones);
                                TotalDD = insuliAB(currentBG, ketones, blood, carb, Flags);
                                recommendation = tableCalc(currentBG, ketones, blood, Flags);
                                } else {
                                  if (urine == 'Negative' || urine == 'Trace' || urine == 'Small' || urine == 'Moderate' || urine == 'Large'){
                                  setLevel(urine);
                                  console.log('k : ' + ketones);
                                  TotalDD = insuliAB(currentBG, ketones, urine, carb, Flags);
                                  recommendation = tableCalc(currentBG, ketones, urine, Flags);
                                  }
                                }
                            console.log('The recommendation is : ' + recommendation);
                            console.log('Table name: ' + T);

                             //only we calculate the extra insulin dose in this two situations
                              if ( (ReData3.lessThanTwo == 'true' && ReData3.takeTDD == 'false') ||
                              ReData3.lessThanTwo == 'false'){
                                console.log('Hi1');
                                if ( Flags != 'true'){
                                if (blood != '0'){
                                   extraInsulinCalc(currentBG, ketones, blood, totalAvgInsulin);
                                } else {
                                  if (urine == 'Negative' || urine == 'Trace' || urine == 'Small' || urine == 'Moderate' || urine == 'Large'){
                                    extraInsulinCalc(currentBG, ketones, urine, totalAvgInsulin);
                                  }
                                } 
                                }//to ensure no recheck before 2 hours     
                              } else {
                                console.log('Hi2');
                                ReData3.takeTDD = 'false';
                              }
                      } else {
                            T = 'T3';
                            //table 3
                          console.log('table3');
                      if (blood != '0'){
                        setLevel(blood);
                         console.log('k : ' + ketones);
                         if (meal != 'No'){
                          TotalDD = insuliAB(currentBG, ketones, blood, carb, Flags);
                          }
                         recommendation = tableText(currentBG, ketones, blood, meal, ReData2.insulinType, Flags);
                       } else {
                         if (urine == 'Negative' || urine == 'Trace' || urine == 'Small' || urine == 'Moderate' || urine == 'Large'){
                         setLevel(urine);
                          console.log('k : ' + ketones);
                          if (meal != 'No'){
                            TotalDD = insuliAB(currentBG, ketones, urine, carb, Flags);
                            }
                          recommendation = tableText(currentBG, ketones, urine, meal, ReData2.insulinType, Flags);
                         }
                       }
                    console.log('The recommendation is : ' + recommendation);
                    console.log('Table name: ' + T);
                      }
                  }
                    setRecom(recommendation);
                    setFlag('true');
                    insert();
                    saveInfo();
            } else {
                Alert.alert('Fill all the fields');
            }
      };//end method

    const check = () => { //to check if the recommendatio will be from table ukg
        // eslint-disable-next-line quotes
        var InsertAPIURL = "http://192.168.56.1/isugar/checkSD1.php";   //API to  signup
      
        var headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        };
        var Data = {
          UserID: onlinUserID,
          curDate: currentDate,
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
console.log('flaaags? ' + response[0].flag);
       if (response[0].flag == 'true'){
            ReData1.weight = response[0].weight;
            ReData1.weightInSixMonth = response[0].tableUkg;
            ReData1.dob = response[0].dob;
       console.log(onlinUserID + '-' + ReData1.weight + '-' + ReData1.weightInSixMonth);
       }
       console.log('inside onlineDB: ');
      })
      .catch((error)=>{
          alert('Error Occured' + error);
      })
      
      }

      const checkReg = () => { //to check insulin regimen
        // eslint-disable-next-line quotes
        var InsertAPIURL = "http://192.168.56.1/isugar/checkSD3.php";   //API to  signup
      
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
       if (response[0].flag == 'true'){
            ReData2.insulinR = response[0].insulinReg;
            ReData2.insuClac = response[0].insulinCal;
       console.log(onlinUserID + '-' + ReData2.insulinR + '-' + ReData2.insuClac);
       }
       console.log('inside onlineDB: ');
      })
      .catch((error)=>{
          alert('Error Occured' + error);
      })
      
      }

      const checkInsulinType = () => { //to check insulin regimen
        console.log('in DB for Sick day');
        // eslint-disable-next-line quotes
        var InsertAPIURL = "http://192.168.56.1/isugar/checkInsulinType.php";   //API to  signup
      
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
            ReData2.insulinR = response[0].insulinReg;
            console.log(response[0].insulinReg);
            ReData2.insulinType = response[0].insulinType;
            console.log(response[0].insulinType);
            insulinOther = response[0].insulinTypeOther;
            console.log(response[0].insulinTypeOther);
            
              console.log('inside recheck: ');
       //}
       console.log(onlinUserID + '-' +  ReData2.insulinR + '-' + ReData2.insulinType + ' ~~ ' + insulinOther);
       }
       console.log('inside onlineDB: ');
      })
      .catch((error)=>{
          alert('Error Occured' + error);
      })
      
      }

      const extraInsulinKg = (BG, ketone, lev, weight) => {//to calculate extra insulin
          if ((BG >= 90 && BG < 180) && ((ketone == 'blood' && (lev >= 1.5 && lev <= 2.9)) || (ketone == 'urine' && (lev == 'Moderate')))){
            Total = 0.05 * weight;
                setExtraInsulin(Total);
                console.log('1Extra insulin is: ' + Total);
                ReData3.takeTDD = 'true';
          } else {
            if ((BG >= 90 && BG < 180) && ((ketone == 'blood' && (lev >= 3)) || (ketone == 'urine' && (lev == 'Large')))){
                Total = 0.05 * weight;
                setExtraInsulin(Total);
                    console.log('2Extra insulin is: ' + Total);
                    ReData3.takeTDD = 'true';
              }
              else {    
                  if ((BG >= 180 && BG < 250) && ((ketone == 'blood' && (lev >= 0.6 && lev <= 0.9)) || (ketone == 'urine' && (lev == 'Trace')))){
                    Total = 0.05 * weight;
                    setExtraInsulin(Total);
                        console.log('3Extra insulin is: ' + Total);
                        ReData3.takeTDD = 'true';
                  }
                  else {
                     if ((BG >= 180 && BG < 250) &&  ((ketone == 'blood' && (lev >= 1 && lev <= 1.4)) || (ketone == 'urine' && (lev == 'Small')))){
                      Total = 0.05 * weight;
                      setExtraInsulin(Total);
                            console.log('4Extra insulin is: ' + Total);
                            ReData3.takeTDD = 'true';
                      }
                      else {
                        if ((BG >= 180 && BG < 250) &&  ((ketone == 'blood' && (lev >= 1.5 && lev <= 2.9)) || (ketone == 'urine' && (lev == 'Moderate')))){
                          Total = 0.10 * weight;
                          setExtraInsulin(Total);
                                console.log('5Extra insulin is: ' + Total);
                                ReData3.takeTDD = 'true';
                          }
                          else {
                            if ((BG >= 180 && BG < 250) &&  ((ketone == 'blood' && (lev >= 3)) || (ketone == 'urine' && (lev == 'Large')))){
                              Total = 0.10 * weight;
                              setExtraInsulin(Total);
                                    console.log('6Extra insulin is: ' + Total);
                                    ReData3.takeTDD = 'true';
                              }
                              else {
                                if (BG >= 250 && BG < 400 && ((ketone == 'blood' && lev < 0.6) || (ketone == 'urine' && lev == 'Negative'))){
                                  Total = 0.05 * weight;
                                  setExtraInsulin(Total);
                                        console.log('7Extra insulin is: ' + Total);
                                        ReData3.takeTDD = 'true';
                                  }
                                  else { 
                                    if ((BG >= 250 && BG < 400) && ((ketone == 'blood' && (lev >= 0.6 && lev <= 0.9)) || (ketone == 'urine' && (lev == 'Trace')))){
                                      Total = 0.05 * weight;
                                      setExtraInsulin(Total);
                                            console.log('8Extra insulin is: ' + Total);
                                            ReData3.takeTDD = 'true';
                                      }  else { 
                                        if ((BG >= 250 && BG < 400) && ((ketone == 'blood' && (lev >= 1 && lev <= 1.4)) || (ketone == 'urine' && (lev == 'Small')))){
                                            Total = 0.10 * weight;
                                            setExtraInsulin(Total);
                                                console.log('9Extra insulin is: ' + Total);
                                                ReData3.takeTDD = 'true';
                                          }
                                          else { 
                                            if ((BG >= 250 && BG < 400) && ((ketone == 'blood' && (lev >= 1.5 && lev <= 2.9)) || (ketone == 'urine' && (lev == 'Moderate')))){
                                                Total = 0.15 * weight;
                                            setExtraInsulin(Total);
                                                    console.log('10Extra insulin is: ' + Total);
                                                    ReData3.takeTDD = 'true';
                                              }
                                              else { 
                                                if ((BG >= 250 && BG < 400) &&  ((ketone == 'blood' && (lev >= 3)) || (ketone == 'urine' && (lev == 'Large')))){
                                                    Total = 0.20 * weight;
                                                   setExtraInsulin(Total);
                                                        console.log('11Extra insulin is: ' + Total);
                                                        ReData3.takeTDD = 'true';
                                                  }
                                                  else {
                                                    if ((BG >= 400) &&  ((ketone == 'blood' && lev < 0.6) || (ketone == 'urine' && (lev == 'Negative')))){
                                                        
                                                        Total = 0.10 * weight;
                                            setExtraInsulin(Total);
                                                            console.log('12Extra insulin is: ' + Total);
                                                            ReData3.takeTDD = 'true';
                                                            
                                                      }
                                                      else { 
                                                        if ((BG >= 400) && ((ketone == 'blood' && (lev >= 0.6 && lev <= 0.9)) || (ketone == 'urine' && (lev == 'Trace')))){
                                                          Total = 0.10 * weight;
                                                          setExtraInsulin(Total);
                                                                console.log('13Extra insulin is: ' + Total);
                                                                ReData3.takeTDD = 'true';
                                                          }  else { 
                                                            if ((BG >= 400) && ((ketone == 'blood' && (lev >= 1 && lev <= 1.4)) || (ketone == 'urine' && (lev == 'Small')))){
                                                              Total = 0.10 * weight;
                                                              setExtraInsulin(Total);
                                                                    console.log('14Extra insulin is: ' + Total);
                                                                    ReData3.takeTDD = 'true';
                                                              }
                                                              else { 
                                                                if ((BG >= 400) && ((ketone == 'blood' && (lev >= 1.5 && lev <= 2.9)) || (ketone == 'urine' && (lev == 'Moderate')))){
                                                                  Total = 0.20 * weight;
                                                                  setExtraInsulin(Total);
                                                                        console.log('15Extra insulin is: ' + Total);
                                                                        ReData3.takeTDD = 'true';
                                                                  }
                                                                  else { 
                                                                    if ((BG >= 400) && ((ketone == 'blood' && (lev >= 3)) || (ketone == 'urine' && (lev == 'Large')))){
                                                                      Total = 0.20 * weight;
                                                                      setExtraInsulin(Total);
                                                                            console.log('16Extra insulin is: ' + Total);
                                                                            ReData3.takeTDD = 'true';
                                                                      }
                                                                  }
                                                              }
                                                          } 
                                                      }
                                                  }
                                              }
                                          }
                                      } 
                                  }
                              }
                          }
                      }
                  }
                 
              }
          }
         // return extraInsulin; //could be not necessery :)
      }

      const extraInsulinCalc = (BG, ketone, lev, Avg) => {//to calculate extra insulin
        if (BG < 70){
          glucagonDose();
        }
        if ((BG >= 90 && BG < 180) && ((ketone == 'blood' && (lev >= 1.5 && lev <= 2.9)) || (ketone == 'urine' && (lev == 'Moderate')))){
          Total = 0.05 * Avg;
              setExtraInsulin(Total);
              console.log('1Extra insulin is: ' + Total);
              ReData3.takeTDD = 'true';
        }  else {
          if ((BG >= 90 && BG < 180) && ((ketone == 'blood' && (lev >= 3)) || (ketone == 'urine' && (lev == 'Large')))){
              Total = 0.05 * Avg;
              setExtraInsulin(Total);
                  console.log('2Extra insulin is: ' + Total);
                  ReData3.takeTDD = 'true';
            }
            else {    
                if ((BG >= 180 && BG < 250) && ((ketone == 'blood' && (lev >= 0.6 && lev <= 0.9)) || (ketone == 'urine' && (lev == 'Trace')))){
                  Total = 0.05 * Avg;
                  setExtraInsulin(Total);
                      console.log('3Extra insulin is: ' + Total);
                      ReData3.takeTDD = 'true';
                }
                else {
                   if ((BG >= 180 && BG < 250) &&  ((ketone == 'blood' && (lev >= 1 && lev <= 1.4)) || (ketone == 'urine' && (lev == 'Small')))){
                    Total = 0.05 * Avg;
                    setExtraInsulin(Total);
                          console.log('4Extra insulin is: ' + Total);
                          ReData3.takeTDD = 'true';
                    }
                    else {
                      if ((BG >= 180 && BG < 250) &&  ((ketone == 'blood' && (lev >= 1.5 && lev <= 2.9)) || (ketone == 'urine' && (lev == 'Moderate')))){
                        Total = 0.10 * Avg;
                        setExtraInsulin(Total);
                              console.log('5Extra insulin is: ' + Total);
                              ReData3.takeTDD = 'true';
                        }
                        else {
                          if ((BG >= 180 && BG < 250) &&  ((ketone == 'blood' && (lev >= 3)) || (ketone == 'urine' && (lev == 'Large')))){
                            Total = 0.15 * Avg;
                            setExtraInsulin(Total);
                                  console.log('6Extra insulin is: ' + Total);
                                  ReData3.takeTDD = 'true';
                            }
                            else {
                              if (BG >= 250 && BG < 400 && ((ketone == 'blood' && lev < 0.6) || (ketone == 'urine' && lev == 'Negative'))){
                                Total = 0.05 * Avg;
                                setExtraInsulin(Total);
                                      console.log('7Extra insulin is: ' + Total);
                                      ReData3.takeTDD = 'true';
                                }
                                else { 
                                  if ((BG >= 250 && BG < 400) && ((ketone == 'blood' && (lev >= 0.6 && lev <= 0.9)) || (ketone == 'urine' && (lev == 'Trace')))){
                                    Total = 0.05 * Avg;
                                    setExtraInsulin(Total);
                                          console.log('8Extra insulin is: ' + Total);
                                          ReData3.takeTDD = 'true';
                                    }  else { 
                                      if ((BG >= 250 && BG < 400) && ((ketone == 'blood' && (lev >= 1 && lev <= 1.4)) || (ketone == 'urine' && (lev == 'Small')))){
                                          Total = 0.10 * Avg;
                                          setExtraInsulin(Total);
                                              console.log('9Extra insulin is: ' + Total);
                                              ReData3.takeTDD = 'true';
                                        }
                                        else { 
                                          if ((BG >= 250 && BG < 400) && ((ketone == 'blood' && (lev >= 1.5 && lev <= 2.9)) || (ketone == 'urine' && (lev == 'Moderate')))){
                                              Total = 0.15 * Avg;
                                          setExtraInsulin(Total);
                                                  console.log('10Extra insulin is: ' + Total);
                                                  ReData3.takeTDD = 'true';
                                            }
                                            else { 
                                              if ((BG >= 250 && BG < 400) &&  ((ketone == 'blood' && (lev >= 3)) || (ketone == 'urine' && (lev == 'Large')))){
                                                  Total = 0.20 * Avg;
                                                 setExtraInsulin(Total);
                                                      console.log('11Extra insulin is: ' + Total);
                                                      ReData3.takeTDD = 'true';
                                                }
                                                else {
                                                  if ((BG >= 400) &&  ((ketone == 'blood' && lev < 0.6) || (ketone == 'urine' && (lev == 'Negative')))){
                                                      
                                                      Total = 0.10 * Avg;
                                                      setExtraInsulin(Total);
                                                          console.log('12Extra insulin is: ' + Total);
                                                          ReData3.takeTDD = 'true';
                                                          
                                                    }
                                                    else { 
                                                      if ((BG >= 400) && ((ketone == 'blood' && (lev >= 0.6 && lev <= 0.9)) || (ketone == 'urine' && (lev == 'Trace')))){
                                                        Total = 0.10 * Avg;
                                                        setExtraInsulin(Total);
                                                              console.log('13Extra insulin is: ' + Total);
                                                              ReData3.takeTDD = 'true';
                                                        }  else { 
                                                          if ((BG >= 400) && ((ketone == 'blood' && (lev >= 1 && lev <= 1.4)) || (ketone == 'urine' && (lev == 'Small')))){
                                                            Total = 0.15 * Avg;
                                                            setExtraInsulin(Total);
                                                                  console.log('14Extra insulin is: ' + Total);
                                                                  ReData3.takeTDD = 'true';
                                                            }
                                                            else { 
                                                              if ((BG >= 400) && ((ketone == 'blood' && (lev >= 1.5 && lev <= 2.9)) || (ketone == 'urine' && (lev == 'Moderate')))){
                                                                Total = 0.20 * Avg;
                                                                setExtraInsulin(Total);
                                                                      console.log('15Extra insulin is: ' + Total);
                                                                      ReData3.takeTDD = 'true';
                                                                }
                                                                else { 
                                                                  if ((BG >= 400) && ((ketone == 'blood' && (lev >= 3)) || (ketone == 'urine' && (lev == 'Large')))){
                                                                    Total = 0.20 * Avg;
                                                                    setExtraInsulin(Total);
                                                                          console.log('16Extra insulin is: ' + Total);
                                                                          ReData3.takeTDD = 'true';
                                                                    }
                                                                }
                                                            }
                                                        } 
                                                    }
                                                }
                                            }
                                        }
                                    } 
                                }
                            }
                        }
                    }
                }
               
            }
        }
       // return extraInsulin; //could be not necessery :)
    }

      const checkLessThanTwoHour = () => {
        console.log('in DB for Sick day to check if you have check less than two hours');
        // eslint-disable-next-line quotes
        var InsertAPIURL = "http://192.168.56.1/isugar/checkFirstCheck.php";   //API to  signup
      
        var headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        };
        var Data = {
          UserID: onlinUserID,
          curDate: currentDate,
          curTime: currentTime,
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
       
        hasRecord = response[0].flag;
        console.log('has a record ? ' + response[0].flag);
     if (response[0].flag == 'true'){
           ReData3.lessThanTwo = response[0].lessThanTwoHour;
            ReData3.takeTDD = response[0].takeExtraInsulin;
            console.log(onlinUserID + '-' +  ReData3.lessThanTwo + '-' + ReData3.takeTDD);
     }
     console.log('inside onlineDB: ');
    })
    .catch((error)=>{
        alert('Error Occured' + error);
    })
    
      
      }

      const lessthanTwo = () => {
      try {
        db.transaction(tx => {
          tx.executeSql(
            'SELECT UserID, recheckDate, recheckTime FROM SDRecheckNotification',
            [],
            (tx, results) => {
              var rows = results.rows;
              for (let i = 0; i < rows.length; i++) {
                  var userid = rows.item(i).UserID;
                if (userid == 1 ) {
                  var lastString = rows.item(i).recheckDate;
                  var d = new Date(lastString);
                  var momFormat = moment(d).format('YYYY-MM-DD');
                  console.log('mom:' + momFormat);//date for user
                  
                  var timeString = rows.item(i).recheckTime;
                  var t = new Date(timeString);
                  
                 
                  if (currentDate != momFormat){
                    Flags = 'false';
                    setLessThanTwoHour(Flags);
                    console.log('flag is: ' + Flags);
                  
                  } else {
                    if (currentDate == momFormat){
                    // console.log('hhooolllllaaaaa');
                    var timeUser = new Date(t);
                    var currenTime = new Date(cTime);
                    var currentHour = currenTime.getHours();
                    var userHour = timeUser.getHours();
                    var diff = currentHour - userHour;
                    console.log('diff: ' + diff);
                   
                          if (diff <= 2){
                            // console.log('less than two');//current time right now
                            Flags = 'true';
                            setLessThanTwoHour(Flags);
                            console.log('flag is: ' + Flags);

                          } else {
                              Flags = 'false';
                              setLessThanTwoHour(Flags);
                              console.log('flag is: ' + Flags);
                          }
                        }
                  }
                }
                return;
              }
            },
          );
        });
      } catch (error) {
        console.log(error);
      }
      } 

      const insuliAB = async (bgLevel, ketones, level, CHO, flag) => {
        console.log('table ' + T);
          var a = 0;
          var b = 0;
          c = 0;     
      
          if (
              (insulinReg == 'Pen' || insulinReg == 'pen') &&
              (ReData2.insulinType == 'Aspart' ||
                ReData2.insulinType == 'Lispro' ||
                ReData2.insulinType == 'Glulisine')
            ) {
                //did NOT recheck before two hours ago
              if (bgLevel > 70) {
                  if (flag == 'false'){
                if (calcMethod == 'ICR') {
                  console.log('is ICR?');
                    checkICRIntervals();
                    console.log('is?');
                    a = CHO / ICR;
                    console.log('a: ' + a);
                    if (bgLevel >= 70 && bgLevel < 90){
                      if (T == 'T1'){
                      if (ketones == 'blood'){
                        if (level < 0.6){
                          a = 0.20 * a;
                        }
                        if (level >= 0.6 && level <= 0.9){
                          a = 0.15 * a;
                        }
                        if (level >= 1 && level <= 1.4){
                          a = 0.10 * a;
                        } 
                      } else {
                        console.log('urine');
                        if (level == 'Negative'){
                          a = 0.20 * a;
                        }
                        if (level == 'Trace'){
                          a = 0.15 * a;
                        }
                        if (level == 'Small'){
                          a = 0.10 * a;
                        } 
                      }
                   }//if table is table1
                   if (T == 'T2'){
                    if (ketones == 'blood'){
                      if (level < 0.6){
                        a = 0.15 * a;
                      }
                      if (level >= 0.6 && level <= 0.9){
                        a = 0.10 * a;
                      }
                    } else {
                      console.log('urine');
                      if (level == 'Negative'){
                        a = 0.15 * a;
                      }
                      if (level == 'Trace'){
                        a = 0.10 * a;
                      }
                    }
                 }//if table is table2
                   if (T == 'T3'){
                    if (ketones == 'blood'){
                      if (level < 0.6){
                        a = 0.15 * a;
                      }
                      if (level >= 0.6 && level <= 0.9){
                        a = 0.10 * a;
                      }
                    } else {
                      console.log('urine');
                      if (level == 'Negative'){
                        a = 0.15 * a;
                      }
                      if (level == 'Trace'){
                        a = 0.10 * a;
                      }
                    }
                 }//if table is table1
                 
                    }
              
                  console.log('final a: ' + a);
                  console.log('-start: ' + sBG);
                  console.log('-target: ' + tBG);
                  console.log('-ISF: ' + isf);
                  console.log('-bg level: ' + bgLevel);

                  if (bgLevel > sBG) {
                    b = (bgLevel - tBG) / isf;
                    if (b < 0){
                      b = 0;
                    }
                    console.log('b: ' + b);
                  } 
             
                  c = a + b;
              }//end of ICR
              else {// if calcMethod is Sliding scale
                  checkSSIntervals();
                  console.log('is Sliding?');
                  c = SlidingScale; // from database
                  console.log('this is c: ' + c + ' And Sliding: ' + SlidingScale);
                  }//end of S.S
          //if insulin type is a pen
      if (halfOrFull == 1){
          c = Math.round(c);
          }
          else {//half-units
          var r1 = Math.round((c * 10) / 10); // rounds to 1 decimal after point
          var r1_whole = Math.trunc(r1); // the whole part of the number
          var r1_fraction = r1 - r1_whole; // the fraction part of the number
          var roundedFraction = 0;
          if (r1_fraction <= 0.2){
              roundedFraction = 0;
          }
          else if (r1_fraction <= 0.7 ){
              roundedFraction = 0.5;
          }
          else {
              roundedFraction = 1.0;
          }
          c = r1_whole + roundedFraction;
          }
      }//if flag == NO
      
      else {
          if (calcMethod == 'ICR'){
            console.log('is ICR?');
            checkICRIntervals();
            console.log('is?');
              //if is not a meal time then no CHO
                a = CHO / ICR;
                console.log('a: ' + a);
                if (bgLevel >= 70 && bgLevel < 90){
                  if (T == 'T1'){
                  if (ketones == 'blood'){
                    if (level < 0.6){
                      a = 0.20 * a;
                    }
                    if (level >= 0.6 && level <= 0.9){
                      a = 0.15 * a;
                    }
                    if (level >= 1 && level <= 1.4){
                      a = 0.10 * a;
                    } 
                  } else {
                    console.log('urine');
                    if (level == 'Negative'){
                      a = 0.20 * a;
                    }
                    if (level == 'Trace'){
                      a = 0.15 * a;
                    }
                    if (level == 'Small'){
                      a = 0.10 * a;
                    } 
                  }
               }//if table is table1
               if (T == 'T3'){
                if (ketones == 'blood'){
                  if (level < 0.6){
                    a = 0.15 * a;
                  }
                  if (level >= 0.6 && level <= 0.9){
                    a = 0.10 * a;
                  }
                } else {
                  console.log('urine');
                  if (level == 'Negative'){
                    a = 0.15 * a;
                  }
                  if (level == 'Trace'){
                    a = 0.10 * a;
                  }
                }
             }//if table is table1
             
                }
          
              console.log('final a: ' + a);
                b = 0;
                c = a + b;
                console.log('c value: ' + c);
          }//if ICR
          else {
                  checkSSIntervals();
                  console.log('is Sliding?');
                  c = SlidingScale; // from database
                  console.log('this is c: ' + c + ' And Sliding: ' + SlidingScale);
          }//if S.s
      }// if flag == yes
      }//if it BG level is >70
      else {
        glucagonDose();
      }
            }//if pen
      else {
        alert(
          'نوع الأنسولين الخاص بك غير مدعوم في هذا التطبيق. يرجى الاتصال بمركز السكري الخاص بك للحصول على التعليمات والتوصيات الخاصة بحساب جرعة الأنسولين وتحديد الجرعة',
        );
      }//if insulin type not pen     
      console.log(c);
        return c;
      };

      const  getAge = (dateString)=>{ // calculate age based on DOB
        var today = new Date();
        var birthDate = new Date(dateString);
        age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        // eslint-disable-next-line no-lone-blocks
        {
            if (age <= -1){
                isValidAge = false;
            } else {
                isValidAge = true;
            }
        }
        return age;
    }

    const glucagonDose = () => {
      finalGlucagon = '';
       age = getAge(ReData1.dob);
      console.log('Your age is: ' + age + hasRecord);
      if (hasRecord == 'False'){//first time to enter this section
        if (age < 2){
          dose = 2;
        }
        else {
          if (age >= 2 && age < 15){
            dose = age;
          }
          else {
            dose = 15;
          }
        } 
        handleScheduleNotification('السُّكر','حان وقت إعادة فحص مستوى سكر الدم', 30);//30
         finalGlucagon = ' خذ ' + dose + '  وحدة من الجلوكاجون (جرعة مصغرة) باستخدام حقنة الانسولين, أعد فحص مستوى سكر الدم بعد ٣٠ دقيقة, إذا كنت تشعر أنك مريض أو كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف ' + '\n' + ' Instruction on how to mix & take mini-dose glucagon: ' + '\n' +
         'أزل غطاء الأمان من العبوة التي تحتوي على العلاج المسحوق.' + '\n' +
         'صل الإبرة بالحقنة المملؤة بالسائل ' + '\n' +
         'أدخل الحقنة في العبوة ثم ادفع كل السائل إلى داخل العبوة' + '\n' +
         'أزل الحقنة ثم رج العلبة جيداً حتى يذوب المسحوق كلياً' + '\n' +
         'باستخدام حقنة الانسولين اسحب ' + dose + ' وحدة من المحلول ' + '\n' +
         'احقن الجرعة كما تحقن الانسولين' + '\n' +
         'احفظ علبة محلول الجلوكاجون المتبقي في الثلاجة لمدة ٢٤ ساعة ثم تخلص منه' + '\n';
      }
      else if (hasRecord == 'true'){
        if (age < 2){
          dose = 4;
        }
        else {
          if (age >= 2 && age < 15){
            dose = 2 * age;
          }
          else {
            dose = 30;
          }
        } 
         finalGlucagon = ' خذ ' + dose +  '  وحدة من الجلوكاجون (جرعة مصغرة) باستخدام حقنة الانسولين و أذهب إلى الاسعاف ';
      }
      console.log('Your age is: ' + age + ' and the instructor: ' + finalGlucagon);
      c = dose;
      console.log('Your dose is: ' + c );
      return finalGlucagon;
    }
          //insulinRegimen, ISFIntervals, insulinCalcMethod Retrive
          const FirstRetrieve = () => {
            // var interval = -1;
            console.log('in first');
            try {
              db.transaction(tx => {
                tx.executeSql(
                  'SELECT UserID, insulinRegimen, ISFIntervals, insulinCalcMethod FROM patientprofile',
                  [],
                  (tx, results) => {
                    var rows = results.rows;
                    for (let i = 0; i < rows.length; i++) {
                      var UID = rows.item(i).UserID;
                      if (UID == 1) {
                        console.log('in if (user is found)');
                        interval = rows.item(i).ISFIntervals; //boolean 0 or 1
                        console.log('i' + interval);
                        setInterval(interval);
                        var calcM = rows.item(i).insulinCalcMethod; // ICR or SS
                        console.log('calculation method: ' + calcM);
                        setCalcM(calcM);
                        var insulinR = rows.item(i).insulinRegimen; // pen , pump , etc..
                        console.log(insulinR);
                        setReg(insulinR);
                        retrieve(interval);
                        secondretrieve(calcM);
                        retrieve3();

                        //return;
                      }
                    }
                    
                  },
                 
                );
              });
            } catch (error) {
              console.log(error);
            }
          };    
         //interval is wither the user is using isf intervals or not ( 1 or 0)
          const retrieve = (i) => {
            var isInterval = i;
            var from = '';
            var to = '';
            var ISF_ = '';
            var target = '';
            var start = '';
            console.log('in second');
            console.log('My interval: ' + isInterval);
            if (isInterval != -1) {
              if (isInterval == 1) {
                // specific hours
                try {
                  db.transaction(tx => {
                    tx.executeSql(
                      'SELECT isfID, UserID, fromTime, toTime, ISF, targetBG_correct, startBG_correct FROM isfInterval',
                      [],
                      (tx, results) => {
                        var rows = results.rows;
                        console.log('in secondd');
                        console.log(rows.length);
                        for (let i = 0; i < rows.length; i++) {
                          var UID = rows.item(i).UserID;
                          if (UID == 1) {
                            //user id
                            from = rows.item(i).fromTime;
                            // fromTime = [from];
                             to = rows.item(i).toTime;
                            // toTime =  [to];
                             ISF_ = rows.item(i).ISF;
                            // isf =  [ISF_];
                             target = rows.item(i).targetBG_correct;
                            // tBG = [target];
                             start = rows.item(i).startBG_correct;
                            // sBG = [start];
                            if (timeCompare(from, to)) {
                            //  التخزين في ارايز
                            fromTime = [from];
                            console.log(fromTime);
                            toTime =  [to];
                            console.log(toTime);
                            isf =  [ISF_];
                            console.log(isf);
                            tBG = [target];
                            console.log(tBG);
                            sBG = [start];
                            console.log(sBG);
                            }
                            
                          }
                        }

                      },
                    );
                  });
                } catch (error) {
                  console.log(error);
                }
                
              } else if (isInterval == 0) {
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
                          if (UID == 1) {
                            //***************************************FIXIXIXIX */
                            var ISF_ = rows.item(i).ISF;
                            // setISFP(ISF_);
                            isfP = ISF_;
                            var target = rows.item(i).targetBG_correct;
                            // setTBGP(target);
                            tBGP = target;
                            var start = rows.item(i).startBG_correct;
                            // setSBGP(start);
                            sBGP = start;
        
                              startBG = start;
                              targetBG = target;
                              ISF = ISF_;
                        
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
          //ICR or SS intervals
          const secondretrieve = (method) => {
            var calc = method;
            //calcM??
            console.log('inside is: ' + calc);
            if (calc == 'ICR') {
              // var tempArr = [...ICRarr]; // array of obj
              try {
                db.transaction(tx => {
                  tx.executeSql(
                    'SELECT icrID, fromTime, toTime, ICR FROM icrInterval WHERE UserID=?',
                    [1],
                    (tx, results) => {
                      var rows = results.rows;
                      for (let i = 0; i < rows.length; i++) {
                        ICRarr.push({
                          id: rows.item(i).icrID,
                          from: moment(rows.item(i).fromTime).format('h:mm a'),
                          to: moment(rows.item(i).toTime).format('h:mm a'),
                          icr: rows.item(i).ICR,
                        });
                      }
                      console.log(ICRarr);
                    },
                  );
                });
              } catch (error) {
                console.log(error);
              }
            } else if (calc == 'Sliding Scale') {
              console.log('hello Sliding');
              // var tempArr = [...SlidingScaleArr];
              try {
                db.transaction(tx => {
                  tx.executeSql(
                    'SELECT ssID, fromTime, toTime FROM ssInterval WHERE UserID=?',
                    [1],
                    (tx, results) => {
                      var rows = results.rows;
                      for (let i = 0; i < rows.length; i++) {
                        SlidingScaleArr.push({
                          id: rows.item(i).ssID,
                          from: rows.item(i).fromTime,
                          to: rows.item(i).toTime,
                          Rnages: [],
                        });
                        try {
                          db.transaction(tx => {
                            tx.executeSql(
                              'SELECT bgID, fromBGLevel, toBGLevel, insulinDose FROM bgleveltoinsulin WHERE ssID=?',
                              [SlidingScaleArr[i].id],
                              (tx, results) => {
                                var rows2 = results.rows;
                                for (let j = 0; j < rows2.length; j++) {
                                  SlidingScaleArr[i].Rnages.push({
                                    id: rows2.item(j).bgID,
                                    BGFrom: rows2.item(j).fromBGLevel,
                                    BGTo: rows2.item(j).toBGLevel,
                                    insulin: rows2.item(j).insulinDose,
                                  });
                                  console.log(SlidingScaleArr[i].Rnages[j]);
                                }
        
                               
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
          //Insulin Type
          const retrieve3 = () => {
            console.log('in third')
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
        
                      if (userid == 1) {
                        setReData2({
                          ...ReData2,
                          insulinType: rows.item(i).insulinType,
                        });
                        halfOrFull = rows.item(i).halfORfull;
                        console.log('Your type ' + ReData2.insulinType + halfOrFull);
        
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
          //Choose ICR based on current time
          const checkICRIntervals = () => {
        
            var index = -1;
            console.log(ICRarr.length);
            for (let i = 0; i < ICRarr.length; i++) {
              // icr: icr.length - ss: SlidingScale.length
              console.log(i);
              if (timeCompare(ICRarr[i].from, ICRarr[i].to)) {
                index = i;
                ICR = ICRarr[index].icr;
                console.log(ICR + '  Did u work?');
                return index;
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
              } else {
                console.log('not found interval');
              }
            }
          };
          //to calculate total daily dose - insulin A + insulin B + any extra insulin
          const calculateTotal = () => {
            if (currentBG < 70){
              TotalDailyDose = dose;
            }
            else {
              if ( Flags != 'true'){
                if (extraInsulin != 0){
                TotalDailyDose = extraInsulin + c;
                } else {
                  TotalDailyDose = c;
                }
              }
              else {
                TotalDailyDose = c;
              }
            }
            return TotalDailyDose;
          }
//To Save information in within-app database
          const insert = async () => {

            //------------ BG LEVEL -------------------

              console.log(1 + ' *-* ' + currentBG + ' - ' + cTime);
              try {
                db.transaction( (tx) => {
                    tx.executeSql(
                      'INSERT INTO BGLevel (UserID, BGLevel, DateTime) VALUES (?,?,?)',
                      [1, currentBG, cTime],
                      (tx, results) => {
                        console.log('Results: ' + results.rowsAffected);
                        if (results.rowsAffected > 0){
                          console.log('Perfect');
                        }  
                      },
                  )
                   print();
                
              })

          } catch (error) {
              console.log(error);
          }

          //----------------Sick day RECORD------------------
          if (blood > 0.0){
            ketonesLevel = blood;
            console.log(uID + ' - ' + curDate + ' - ' + cTime + ' - ' + ketones + ' - ' + blood + ' - ' + meal + ' - ' + mealTime + ' - ' + carb + ' - ' + TotalDailyDose + ' - ' + T);
            try {
            db.transaction( (tx) => {
                tx.executeSql(
                  'INSERT INTO sickDayRecords (UserID, recordDate, recordTime, KetonesSource, KetonesLevel, isMeal, mealTime, Carbs, TDD, tableName) VALUES (?,?,?,?,?,?,?,?,?,?)',
                    [uID, curDate, cTime, ketones, blood, meal, mealTime, carb, TotalDailyDose, T]
                );
                
              })

        } catch (error) {
            console.log(error);
        }
          }

          else {
            if (urine == 'Negative' || urine == 'Trace' || urine == 'Small' || urine == 'Moderate' || urine == 'Large'){
              ketonesLevel = urine;
              console.log(uID + ' - ' + curDate + ' - ' + cTime + ' - ' + ketones + ' - ' + urine + ' - ' + meal + ' - ' + mealTime + ' - ' + carb + ' - ' + TotalDailyDose + ' - ' + T);
              try {
              db.transaction( (tx) => {
                  tx.executeSql(
                    'INSERT INTO sickDayRecords (UserID, recordDate, recordTime, KetonesSource, KetonesLevel, isMeal, mealTime, Carbs, TDD, tableName) VALUES (?,?,?,?,?,?,?,?,?,?)',
                      [uID, curDate, cTime, ketones, urine, meal, mealTime, carb, TotalDailyDose, T],
                  );
                })
          
          } catch (error) {
              console.log(error);
          }
            }
          }
          }

          const print = async () => {
            try {
              db.transaction(tx => {
                tx.executeSql(
                  'SELECT UserID, BGLevel, DateTime FROM BGLevel',
                  [],
                  (tx, results) => {
                    var rows = results.rows;
        
                    for (let i = 0; i < rows.length; i++) {
                      var userid = rows.item(i).UserID;
                      // if (userid == 1) {
                        usID = rows.item(i).UserID;
                        uBG = rows.item(i).BGLevel;
                        uDateTime = rows.item(i).DateTime;
                        console.log(usID);
                        console.log(rows.item(i).BGLevel);
                        console.log(uDateTime);
                        // return;
                      // }
                    }
                  },
                );
              });
            } catch (error) {
              console.log(error);
            }
          };

          const retrieveTableTwo = async () => {
            var time = new Date(); // Mon Jan 31 2022 23:07:59 GMT+0300 (+03)
            var booleanFlag = false;
          //   // insulinPen table
            try {
              db.transaction(tx => {
                tx.executeSql(
                  'SELECT UserID, BG_level, insulinDose, Dose_Date_Month, Dose_Date_Day, Dose_Date_Year FROM takenInsulinDose WHERE UserID=?',
                  [1],
                  (tx, results) => {
                    var rows = results.rows;
                    console.log('Wow' + rows.length);
                    for (let i = 0; i < rows.length; i++) {
                      userMonth = rows.item(i).Dose_Date_Month;
                      userDay = rows.item(i).Dose_Date_Day;
                      userYear = rows.item(i).Dose_Date_Year;
                      console.log('userMonth: ' + userMonth);
                      console.log('userDay: ' + userDay);
                      console.log('userYear: ' + userYear);
                      checkTwoWeeks(userMonth, userDay, userYear);
                      // console.log(booleanFlag);

                      console.log(global.InsulinTwoWeek);
                      if (InsulinTwoWeek){
                        
                        insuArr.push({
                          BG: rows.item(i).BG_level,
                          insulin: rows.item(i).insulinDose,
                          month: rows.item(i).Dose_Date_Month,
                          day: rows.item(i).Dose_Date_Day,
                          year: rows.item(i).Dose_Date_Year,
                        });
                      }
                  }
                    console.log(insuArr);
                    console.log('==================================================');
                    for (let i = 0; i < insuArr.length; i++) {
                      totalInsulin = totalInsulin + insuArr[i].insulin;
                    }
                    console.log('totalInsulin');
                    console.log(totalInsulin);
                    totalAvgInsulin = totalInsulin / insuArr.length;
                    console.log(totalAvgInsulin);
                  },
                );
              });
            } catch (error) {
              console.log(error);
            }

            try {
              db.transaction(tx => {
                tx.executeSql(
                  'SELECT UserID, BGLevel, DateTime FROM BGLevel WHERE UserID=?',
                  [1],
                  (tx, results) => {
                    var rows = results.rows;
                    console.log('Wo0w' + rows.length);
                    for (let i = 0; i < rows.length; i++) {
                      var timeString = rows.item(i).DateTime;
                      var toObj = new Date(timeString);
                      if ((time - toObj) / (1000 * 60 * 60) <= 336) {
                        // 336 is the last 14 days in hours
                        bgArr.push({
                        BG: rows.item(i).BGLevel,
                        dTime: toObj,
                      });

                    }
                  }
                    console.log(bgArr);
                    console.log('***************************************************');
                  },
                );
              });
            } catch (error) {
              console.log(error);
            }
          };
//To save all the information inside online database
          const saveInfo = () => {
              // eslint-disable-next-line quotes
              var InsertAPIURL = "http://192.168.56.1/isugar/recheckSickDay.php";   //API to  signup
              var headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              };
              var Data = {
                  UserID: onlinUserID,
                  RecheckDate: curDate,
                  RecheckTime: curTime,
                  ketonesSource: ketones,
                  ketonesLevel: global.ketonesLevel,
                  IsMeal: meal,
                  MealTime: mealTime,
                  Carbs: carb,
                  TDD: TotalDailyDose,
                  takeExtraInsulin: ReData3.takeTDD,	
                  tableName: T,
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

          const checkTwoWeeks = (m, d, y) => {
          console.log('in DB for Sick day check within two week');
          // eslint-disable-next-line quotes
          var InsertAPIURL = "http://192.168.56.1/isugar/checkTwoWeeks.php";   //API to  signup
        
          var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          };
          var Data = {
            UserID: onlinUserID,
            currDate: curDate,
            Month: m,
            Day: d,
            Year: y,
          };
        
          // FETCH func ------------------------------------
          fetch(InsertAPIURL,{
            method:'POST',
            headers:headers,
            body: JSON.stringify(Data),//convert data to JSON
        })
        .then((response)=>response.json()) //check response type of API (CHECK OUTPUT OF DATA IS IN JSON)
        .then((response)=>{
          //onlinUserID = response[0].userID;
             console.log(response[0].flag);
         if (response[0].flag == 'true'){
          // if (onlinUserID != '0'){
             
            global.InsulinTwoWeek = true;
              console.log(global.InsulinTwoWeek); 
         //}

         }
         console.log('&&&' + global.InsulinTwoWeek);
        })
        .catch((error)=>{
            alert('Error Occured' + error);
        })
        
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
          إدارة يوم المرض
        </Text>
         </View>
      </View>
         <ScrollView>
         <View style={styles.buttonV}>
<View style = {styles.innerCotainer}>
    <Text style= {styles.textBody}>مستوى سكر الدم </Text>
    <TextInput
                keyboardType="decimal-pad"
                placeholder="000.0"
                onChangeText={(val)=>setCurrentBG(val)}
                style={styles.inputT} />
              <Text style={{fontSize: 13}}> mg/dl </Text>
</View>
</View>

<View style={styles.buttonV}>
<View style = {styles.innerCotainer}>
<Text style= {styles.textBody}>مصدر قراءة مستوى الكيتونات</Text>
<Picker
            itemStyle={{color: 'black'}}
              selectedValue={ketones}
              onValueChange={value => setKetones(value)}
              mode="dropdown"
              style={styles.picker}>
              <Picker.Item label="اختار" value="0"/>
              <Picker.Item label="دم" value="blood"/>
              <Picker.Item label="بول" value="urine"/>
              </Picker>
              {ketones == 'blood' && currentBG != '0' ?

<View style={{flexDirection: 'row'}}>
<Text style= {styles.textBody2}>دم </Text>
<TextInput
  keyboardType="decimal-pad"
  placeholder="0.0"
  onChangeText={(val)=>setBlood(val)}
  style={styles.inputT} />
<Text style={{fontSize: 13, paddingTop: 20}}> mmol/L </Text>
</View>
      : null
      }

{ketones == 'urine' && currentBG != '0' ?
<View style={{flexDirection: 'row'}}>
<Text style= {styles.textBody2}>بول </Text>
<Picker
            itemStyle={{color: 'black'}}
              selectedValue={urine}
              onValueChange={(value => setUrine(value))}
              mode="dropdown"
              style={styles.picker}>
              <Picker.Item label="اختار" value="0"/>
              <Picker.Item label="سالبة" value="Negative"/>
              <Picker.Item label="قليلة" value="Trace"/>
              <Picker.Item label="صغيرة" value="Small"/>
              <Picker.Item label="متوسطة" value="Moderate"/>
              <Picker.Item label="كبيرة" value="Large"/>
              </Picker>
              </View>
      : null
      }
</View>
</View>

<View style={styles.buttonV}>
<View style = {styles.innerCotainer}>
<Text style= {styles.textBody}>هل ستتناول الآن وجبة؟ </Text>
<Picker
            itemStyle={{color: 'black'}}
              selectedValue={meal}
              onValueChange={value => setMeal(value)}
              mode="dropdown"
              style={styles.picker}>
              <Picker.Item label="نعم" value="Yes"/>
              <Picker.Item label="لا" value="No"/>
              </Picker>
{meal == 'Yes' ?
<View style={{flexDirection: 'row'}}>
<Text style= {styles.textBody2}>الوجبة هي</Text>
<Picker
            itemStyle={{color: 'black'}}
              selectedValue={mealTime}
              onValueChange={value => setMealTime(value)}
              mode="dropdown"
              style={styles.picker}>
              <Picker.Item label="اختار" value="-1"/>
              <Picker.Item label="فطور" value="Breakfast"/>
              <Picker.Item label="غداء" value="Lunch"/>
              <Picker.Item label="عشاء" value="Dinner"/>
              </Picker>
              </View>
              
      : null
      }

{meal == 'Yes' && ReData2.insuClac != 'Sliding Scale' ?
              <View style={{flexDirection: 'row'}}>
<Text style= {styles.textBody2}>محتوى الكربوهيدرات في الوجبة </Text>
              <TextInput
                keyboardType="decimal-pad"
                placeholder="000"
                onChangeText={(val)=> setCarb(val)}
                style={styles.inputT} />
              <Text style={{fontSize: 13, paddingTop: 20}}> جرام</Text>
              </View>
      : null
      }
              </View>
              </View>
              <View style={styles.buttonV}>
              {flag == 'true' && currentBG != '' && ketones != '' && level != '' ?
     (     <View style = {styles.innerCotainer}>
    <Text style= {styles.textBody}>التوصيات </Text>

    {flag == 'true' && currentBG != '' && currentBG > 70 && ketones != '' && level != '' ?
    
    <Text style= {styles.textHeader}>خذ {calculateTotal()} وحدة من {ReData2.insulinType} انسولين </Text> 
    : null } 
     {flag == 'true' && currentBG != '' && currentBG > 70 && ketones != '' && level != '' ?
    
    <Text style= {styles.textHeader}>{recom}</Text>
    : null } 

    {flag == 'true' && currentBG != '' && currentBG < 70 && ketones != '' && level != '' ?
    
    <Text style= {styles.textHeader}>خذ {calculateTotal()} وحدة من {ReData2.insulinType} انسولين </Text>  
    : null} 
      {flag == 'true' && currentBG != '' && currentBG < 70 && ketones != '' && level != '' ?
    
    <Text style= {styles.textHeader}>{recom + finalGlucagon}</Text>
    : null} 


</View>)
      : null
      }
          <TouchableOpacity onPress={Recommendations}>
            <LinearGradient
              colors={['#f5f5f5', '#e9ebee', '#e9ebee']}
              style={styles.buttonR}>
              <Text style={{ fontSize: 17, color: '#05375a', textAlign: 'center', fontWeight: 'bold'}}>
               OK
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          </View>
        </ScrollView>
    </View>
  );
};
export default sickDay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF0F2',
  },
textHeader:{
  fontSize: 18,
  paddingBottom: 15,
  paddingTop: 15,
  color: '#05375a',
  textAlign: 'right',
  paddingLeft: 10,
  paddingRight: 10,
  lineHeight: 30,
},
textBody:{
    fontSize: 17,
    color: '#05375a',
    textAlign: 'center',
    fontWeight: 'bold',
 },
 textBody2:{
     paddingTop: 16,
    fontSize: 17,
    color: '#05375a',
    textAlign: 'center',
    fontWeight: 'bold',
 },
 innerCotainer: {
  backgroundColor: 'white', margin: 10, alignItems: 'center', borderRadius: 15, padding: 10, width: 370,
  flexDirection: 'row',
    flexWrap: 'wrap',
              shadowColor: '#000',
              shadowOffset: {
              width: 0,
              height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
},
innerCotainer2: {
  backgroundColor: 'white', margin: 10, alignItems: 'center',  borderRadius: 15, padding: 10, width: 200,
              shadowColor: '#000',
              shadowOffset: {
              width: 0,
              height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
},
buttonV: {
  marginTop: 10,
  alignItems: 'center',

},
buttonR: {
  alignItems: 'center',
  width: 150,
  height: 55,
  borderColor: '#000',
  shadowColor: '#5c5b5b',
  justifyContent: 'center',
  borderRadius: 15,
  flexDirection: 'row',
},
inpTxt: {
  //lables
  paddingRight: 20,
  paddingTop: 15,
  fontSize: 18,
},
picker: {
  color: 'grey',
    width: 150,
    borderWidth: 2,
    paddingRight: -10,
    borderColor: '#4c4c4c',
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

});

