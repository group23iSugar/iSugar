/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable semi */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */

import React, {useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  alert,
  Alert,
} from 'react-native';
import moment from 'moment';


const checkFirst = ({navigation}) => {
  var onlinUserID = 15;
  var uID = 15;
  var dateIsFirst = '';
  var currentDate = moment().format('YYYY-MM-DD');

  var BGlevel = 0;
  var glucagonFlag = '';
  var finding = '';
  var checkCase1 = '';
  var checkCase2 = '';
  var checkCase3 = '';
  var checkCase4 = '';
  var flags = '1';
  var flagDate = '';

  var date = new Date().getDate();//current
  var month = new Date().getMonth() + 1;//current
  var year = new Date().getFullYear();//current

  var years = '';
  var months = '';
  var day = '';
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    checkIsFirst();
    checkFlag();
    checkHypo();
    checkBGLevel();
    checkGlucagon();
    checkAnnual();
      }, []);

    const checkFirstTime = () => {
      if (dateIsFirst == currentDate){
        navigation.navigate('recheckExercise');
      }
      else {
          if (flags == '1'){//if exercise message flag = true, and first time to enter exercise tab in this day
            navigation.navigate('exercise');
          }
          else {//if eMsgFlag = false-----------------
              //console.log(date + '-' + month + '-' + year);
              console.log('current year is: ' + year);
              console.log('current month is: ' + month);
              console.log('current day is: ' + date);
              if (month == months){
                console.log('Equals months');
                if (day + 13 <= date){//two week ago
                    console.log('YAAAAYYY');
                    flags = '1';
                    flagDate = moment().format('YYYY-MM-DD');
                    insert();
                    updateFlag();
                    navigation.navigate('exercise');
                } else {
                  if (checkCase1 == '1' || checkCase2 == '1' || checkCase3 == '1' || checkCase4 == '1'){
                    eMsgFlag = '1';
                    updateFlag();
                    navigation.navigate('exercise');
                  } else {
                    console.log('Here I am');
                    navigation.navigate('exercise3');
                  }
                }
              }//if it's the same month
              else {

                  //if the month has 31 days------------------------------------------
                  if (months == 1 || months == 3 || months == 5 || months == 7 || months == 8 || months == 10 || months == 12){
                      var diff = 31 - day;
                      var curDiff = date;
                      var sum = diff + curDiff;
                      console.log('different: ' + diff);
                      if (sum >= 14){
                        flags = '1';
                        flagDate = moment().format('YYYY-MM-DD');
                        insert();
                        updateFlag();
                        navigation.navigate('exercise');
                      }
                      else {
                        if (checkCase1 == '1' || checkCase2 == '1' || checkCase3 == '1' || checkCase4 == '1'){
                          eMsgFlag = '1';
                          updateFlag();
                          navigation.navigate('exercise');
                        } else {
                          navigation.navigate('exercise3');
                        }
                    }
                  }//end if
                   //if the month has 30 days------------------------------------------
                  if (months == 4 || months == 6 || months == 9 || months == 11){
                    var diff = 30 - day;
                    var curDiff = date;
                    var sum = diff + curDiff;
                    console.log('different: ' + diff);
                    if (sum >= 14){
                      flags = '1';
                      flagDate = moment().format('YYYY-MM-DD');
                      updateFlag();
                      insert();
                      navigation.navigate('exercise');
                    }
                    else {
                      if (checkCase1 == '1' || checkCase2 == '1' || checkCase3 == '1' || checkCase4 == '1'){
                        eMsgFlag = '1';
                        updateFlag();
                        navigation.navigate('exercise');
                      } else {
                        navigation.navigate('exercise3');
                      }
                  }
                }//end if
                  //if the month has 30 days------------------------------------------
                  if (months == 2){
                    var diff = 28 - day;
                    var curDiff = date;
                    var sum = diff + curDiff;
                    console.log('different: ' + diff);
                    if (sum >= 14){
                      flags = '1';
                      flagDate = moment().format('YYYY-MM-DD');
                      updateFlag();
                      insert();
                      navigation.navigate('exercise');
                    }
                    else {
                      if (checkCase1 == '1' || checkCase2 == '1' || checkCase3 == '1' || checkCase4 == '1'){
                        eMsgFlag = '1';
                        updateFlag();
                        navigation.navigate('exercise');
                      } else {
                        navigation.navigate('exercise3');
                      }
                  }
                }//end if
              }//end else
          }
      }
    };
        const checkIsFirst = () => {
          console.log('in DB of check if it is the first time to enter exercise tab');
  // eslint-disable-next-line quotes
  var InsertAPIURL = "https://isugarserver.com/checkExerciseRecord.php";   //API to  signup

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
            dateIsFirst = response[0].Date;
            console.log(response[0].Date);
              //console.log(Date.now());
       //}
       console.log(onlinUserID + '-' + dateIsFirst);
       checkFirstTime();
       //checkWeight();
       } else if (response[0].flag == 'False'){
        dateIsFirst = 'false';
        console.log('date is first: ' + dateIsFirst);
       }
       //console.log(dateIsFirst);
       console.log('inside onlineDB: ');
      })
      .catch((error)=>{
          // alert('Error Occured' + error);
      })
    }
        const checkFlag = () => {
            console.log('in DB of check flag');
            // eslint-disable-next-line quotes
            var InsertAPIURL = "https://isugarserver.com/checkFlag.php";   //API to  signup

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
               console.log(response[0].flag + '-----------------------');
           if (response[0].flag == 'true'){
            // if (onlinUserID != '0'){
                console.log(response[0].userID);
                flags = response[0].msgFlag;
                console.log('flag is: ' + response[0].msgFlag);
                flagDate = response[0].msgFalgDate;
                getParsedDate(flagDate);
                console.log(response[0].msgFalgDate);

           console.log(onlinUserID + '-' + flags + '-' + flagDate);
           checkFirstTime();
           }
           console.log('inside onlineDB: ');
          })
          .catch((error)=>{
              // alert('Error Occured' + error);
          })
          }

          const getParsedDate = (strDate) => {
            var strSplitDate = String(strDate).split('-');
            console.log('Date is: ' + strSplitDate);
             years = strSplitDate[0].split(',');
            console.log('year is: ' + years);
             months = strSplitDate[1].split(',');
            console.log('month is: ' + months);
             day = strSplitDate[2].split(',');
            console.log('day is: ' + day);
        };

        const updateFlag = () => {
            console.log('in DB of check flag');
            // eslint-disable-next-line quotes
            var InsertAPIURL = "https://isugarserver.com/updateEMsgFlag.php";   //API to  signup

            var headers = {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            };
            var Data = {
              UserID: onlinUserID,
              eMsgFlag: flags,
              eMsgFlagDate: flagDate,
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
              // alert('Error Occured' + error);
          })
          }

          const checkHypo = () => {
            console.log('in DB1:');
            // eslint-disable-next-line quotes
            var InsertAPIURL = "https://isugarserver.com/checkHypo.php";   //API to  signup

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
            // if (onlinUserID != '0'){
                console.log(response[0].userID);
                checkCase1 = '1';
                  console.log('inside hypo: checkCase1- ' + checkCase1);
           //}
           console.log(onlinUserID + '-' + response[0].flag + '-' + response[0].flag2);
           }
           console.log('inside onlineDB for hypo: ');
          // checkBGLevel();
          })
          .catch((error)=>{
              // alert('Error Occured' + error);
          })
          }
  //====================================================To check if User had BG< 50mg/dl in past 48h============================================
          const checkBGLevel = () => {
            console.log('in DB2:');
            // eslint-disable-next-line quotes
            var InsertAPIURL = "https://isugarserver.com/checkBGLevel.php";   //API to  signup

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
                BGlevel = response[0].bglevel;
                console.log(response[0].bglevel);
                  console.log('inside bg level: ');
                  checkCase2 = '1';
                  console.log('inside bglevel: checkCase2- ' + checkCase2);
           //}
           console.log(onlinUserID + ' - bg level in past 48h: ' + BGlevel);
           }
           console.log('inside onlineDB for BG level: ');
           //checkGlucagon();
          })
          .catch((error)=>{
              // alert('Error Occured' + error);
          })
          }
  //====================================================To check if Glucagon message appeared for the user in hypoglycemia section==============
          const checkGlucagon = () => {
            console.log('in DB3:');
            // eslint-disable-next-line quotes
            var InsertAPIURL = "https://isugarserver.com/checkGlucagonFlag.php";   //API to  signup

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
                glucagonFlag = response[0].glucagonFlag;
                console.log(response[0].glucagonFlag);
                checkCase3 = '1';
                  console.log('inside glucagon: checkCase3-  ' + checkCase3);
           //}
           console.log(onlinUserID + '- glucagon flag: ' + glucagonFlag);
           }
           console.log('inside onlineDB for glucagon: ');
           //checkAnnual();
          })
          .catch((error)=>{
              // alert('Error Occured' + error);
          })
          }
  //====================================================To check if	User selected evidence of retinopathy=======================================
          const checkAnnual = () => {
            console.log('in DB4:');
            // eslint-disable-next-line quotes
            var InsertAPIURL = "https://isugarserver.com/checkAnnualTest.php";   //API to  signup

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
                console.log(response[0].userID);
                finding = response[0].EvidenceOfRetinopathy;
                console.log(response[0].EvidenceOfRetinopathy);
                checkCase4 = '1';
                console.log('check case 4: ' + checkCase4);
                  console.log('inside Annual test: checkCase4- ' + checkCase4);
           console.log(onlinUserID + '- EvidenceOfRetinopathy: ' + finding);
           }
           console.log('inside onlineDB for annual test: ');
          })
          .catch((error)=>{
              // alert('Error Occured' + error);
          })
          }
//=================================================WITHIN-APP DATABASE======================================
const insert = async () => {

  //------------ Flags -------------------

     console.log(uID + ' - ' + flags + ' - ' + flagDate);
     try {
      db.transaction( (tx) => {
          tx.executeSql(
           'INSERT INTO BGLevel (UserID, eMsgFlag, eMsgFlagDate)'
           + 'VALUES (?,?,?)',
             [uID, flags, flagDate]
         );
     })

 } catch (error) {
     console.log(error);
 }
 }
    return (<View></View>);
};
export default checkFirst;
