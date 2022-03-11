/* eslint-disable prettier/prettier */
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
    Image,
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
import tableukg from './tableukg';
import tableCalc from './tableCalc';
import tableText from './tableText';
import SQLite from 'react-native-sqlite-storage';
import tableukgCopy from './tableukgCopy';

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

const sickDay = ({ navigation }) => {
    //variables
    var onlinUserID = 15;//54 is the user for table 3
    var uID = 15;
    var curDate = moment().format('YYYY-MM-DD');
    var curTime = moment().format('HH:mm:ss');
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
      });

      const [ReData2, setReData2] = useState({
        insulinR: '',
        insulinType: '',
      });

      const [ReData3, setReData3] = useState({
        takeTDD: 'false',
        lessThanTwo: 'false',
      });

      const [flag, setFlag] = useState('false');
      const [recom, setRecom] = useState('0');//recommendations
      const [level, setLevel] = useState('0');//either it's blood or urine ketones source
      const [table, setTable] = useState('');//for current BG level
      const [extraInsulin, setExtraInsulin] = useState('0');//for extra insulin
      const [TDD, setTDD] = useState(0);//for extra insulin
      const [tableThree, setTableThree] = useState('No');//for extra insulin
      var recommendation = '';
      global.T = '';
      global.Total = '';
      global.ketonesLevel = '';
      useEffect(() => {
          check();
          checkReg();
          checkInsulinType();
          checkLessThanTwoHour();
          console.log(currentDate);
          // eslint-disable-next-line react-hooks/exhaustive-deps
          }, []);

    const Recommendations = () => {

                if (currentBG != '' && ketones != '0'){ //to ensure all fields are not empty
                    if (ReData1.weightInSixMonth == 'true' && (ReData2.insulinType == 'Aspart' || ReData2.insulinType == 'Lispro' || ReData2.insulinType == 'Glulisine')){
                        //table 1
                           if (blood != '0'){
                            setLevel(blood);
                             console.log('k : ' + ketones);
                            recommendation = tableukgCopy(currentBG, ketones, blood);
                           } else {
                             if (urine == 'Negative' || urine == 'Trace' || urine == 'Small' || urine == 'Moderate' || urine == 'Large'){
                             setLevel(urine);
                              console.log('k : ' + ketones);
                              recommendation = tableukgCopy(currentBG, ketones, urine);
                             }
                           }
                        console.log('The recommendation is : ' + recommendation);
                        T = 'T1';
                        setTable(T);
                        console.log('Table name: ' + T);
                        //only we calculate the extra insulin dose in this two situations
                        if ( (ReData3.lessThanTwo == 'true' && ReData3.takeTDD == 'false') ||
                        ReData3.lessThanTwo == 'false'){
                          console.log('Hi1');
                          if (blood != '0'){
                            extraInsulinKg(currentBG, ketones, blood, ReData1.weight);
                           } else {
                             if (urine == 'Negative' || urine == 'Trace' || urine == 'Small' || urine == 'Moderate' || urine == 'Large'){
                              extraInsulinKg(currentBG, ketones, urine, ReData1.weight);
                             }
                           }      
                        } else {
                          console.log('Hi2');
                          ReData3.takeTDD = 'false';
                        }
                    }//end if
                    setRecom(recommendation);
                    setFlag('true');
                    insert();
                    saveInfo();
            } else {
                Alert.alert('Fill all the fields');
            }
        };//end method

    const check = () => { //to check if the recommendatio will be from table ukg
        console.log('in DB for Sick day');
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
           console.log(response[0].flag);
      
       if (response[0].flag == 'true'){
        // if (onlinUserID != '0'){
            console.log(response[0].userID);
           ReData1.weight = response[0].weight;
            console.log(response[0].weight);
           ReData1.weightInSixMonth = response[0].tableUkg;
             console.log(response[0].tableUkg);
              console.log('inside recheck: ');
       //}
       console.log(onlinUserID + '-' + ReData1.weight + '-' + ReData1.weightInSixMonth);
       }
       console.log('inside onlineDB: ');
      })
      .catch((error)=>{
          alert('Error Occured' + error);
      })
      
      }

      const checkReg = () => { //to check insulin regimen
        console.log('in DB for Sick day');
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
           console.log(response[0].flag);
      
       if (response[0].flag == 'true'){
        // if (onlinUserID != '0'){
            console.log(response[0].userID);
           ReData2.insulinR = response[0].insulinReg;
            console.log(response[0].insulinReg);
              console.log('inside recheck: ');
       //}
       console.log(onlinUserID + '-' + ReData2.insulinR);
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
              console.log('inside recheck: ');
       //}
       console.log(onlinUserID + '-' +  ReData2.insulinR + '-' + ReData2.insulinType);
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
      
        console.log('ID: ' + onlinUserID + ' Current Date&Time' + currentDate + '-' + currentTime);
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
           ReData3.lessThanTwo = response[0].lessThanTwoHour;
            console.log(response[0].lessThanTwoHour);
            ReData3.takeTDD = response[0].takeExtraInsulin;
            console.log(response[0].takeExtraInsulin);

            console.log('inside recheck if there is check: ');
            console.log(onlinUserID + '-' +  ReData3.lessThanTwo + '-' + ReData3.takeTDD);
     //}
 
     }
     console.log('inside onlineDB: ');
    })
    .catch((error)=>{
        alert('Error Occured' + error);
    })
    
      
      }
     
   //------------------Save information in within-app & online database--------------------------
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

   //----------------Sick day RECORD------------------
   if (blood > 0.0){
    ketonesLevel = blood;
    console.log(uID + ' - ' + curDate + ' - ' + curTime + ' - ' + ketones + ' - ' + blood + ' - ' + meal + ' - ' + mealTime + ' - ' + carb + ' - ' + Total + ' - ' + T);
    try {
     db.transaction( (tx) => {
         tx.executeSql(
          'INSERT INTO sickDayRecords (UserID, recordDate, recordTime, KetonesSource, KetonesLevel, isMeal, mealTime, Carbs, TDD, tableName) VALUES (?,?,?,?,?,?,?,?,?,?)',
            [uID, curDate, curTime, ketones, blood, meal, mealTime, carb, Total, T]
        );
        
      })

} catch (error) {
    console.log(error);
}
   }

   else {
     if (urine == 'Negative' || urine == 'Trace' || urine == 'Small' || urine == 'Moderate' || urine == 'Large'){
      ketonesLevel = urine;
      console.log(uID + ' - ' + curDate + ' - ' + curTime + ' - ' + ketones + ' - ' + urine + ' - ' + meal + ' - ' + mealTime + ' - ' + carb + ' - ' + Total + ' - ' + T);
      try {
       db.transaction( (tx) => {
           tx.executeSql(
            'INSERT INTO sickDayRecords (UserID, recordDate, recordTime, KetonesSource, KetonesLevel, isMeal, mealTime, Carbs, TDD, tableName) VALUES (?,?,?,?,?,?,?,?,?,?)',
              [uID, curDate, curTime, ketones, urine, meal, mealTime, carb, Total, T]
          );
          
        })
  
  } catch (error) {
      console.log(error);
  }
     }
   }
   }
   
const saveInfo = () => {
    console.log('Carbs: ' + carb);
    console.log('in DB of Saving information');

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
        TDD: Total,
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
          Sick Day
        </Text>
         </View>
      </View>
         <ScrollView>
         <View style={styles.buttonV}>
<View style = {styles.innerCotainer}>
    <Text style= {styles.textBody}>Blood glucose level </Text>
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
<Text style= {styles.textBody}>Ketone reading source</Text>
<Picker
            itemStyle={{color: 'black'}}
              selectedValue={ketones}
              onValueChange={value => setKetones(value)}
              mode="dropdown"
              style={styles.picker}>
              <Picker.Item label="Select" value="0"/>
              <Picker.Item label="blood" value="blood"/>
              <Picker.Item label="urine" value="urine"/>
              </Picker>
              {ketones == 'blood' && currentBG != '0' ?

<View style={{flexDirection: 'row'}}>
<Text style= {styles.textBody2}>Blood </Text>
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
<Text style= {styles.textBody2}>Urine </Text>
<Picker
            itemStyle={{color: 'black'}}
              selectedValue={urine}
              onValueChange={(value => setUrine(value))}
              mode="dropdown"
              style={styles.picker}>
              <Picker.Item label="Select" value="0"/>
              <Picker.Item label="Negative" value="Negative"/>
              <Picker.Item label="Trace" value="Trace"/>
              <Picker.Item label="Small" value="Small"/>
              <Picker.Item label="Moderate" value="Moderate"/>
              <Picker.Item label="Large" value="Large"/>
              </Picker>
              </View>
      : null
      }
</View>
</View>

<View style={styles.buttonV}>
<View style = {styles.innerCotainer}>
<Text style= {styles.textBody}>Is it meal time ? </Text>
<Picker
            itemStyle={{color: 'black'}}
              selectedValue={meal}
              onValueChange={value => setMeal(value)}
              mode="dropdown"
              style={styles.picker}>
              <Picker.Item label="Yes" value="Yes"/>
              <Picker.Item label="No" value="No"/>
              </Picker>
{meal == 'Yes' ?
<View style={{flexDirection: 'row'}}>
<Text style= {styles.textBody2}>Meal is </Text>
<Picker
            itemStyle={{color: 'black'}}
              selectedValue={mealTime}
              onValueChange={value => setMealTime(value)}
              mode="dropdown"
              style={styles.picker}>
              <Picker.Item label="Select" value="-1"/>
              <Picker.Item label="Breakfast" value="Breakfast"/>
              <Picker.Item label="Lunch" value="Lunch"/>
              <Picker.Item label="Dinner" value="Dinner"/>
              </Picker>
              </View>
              
      : null
      }

{meal == 'Yes' ?
              <View style={{flexDirection: 'row'}}>
<Text style= {styles.textBody2}>Meal carbohydrate content </Text>
              <TextInput
                keyboardType="decimal-pad"
                placeholder="000"
                onChangeText={(val)=> setCarb(val)}
                style={styles.inputT} />
              <Text style={{fontSize: 13, paddingTop: 20}}> grams</Text>
              </View>
      : null
      }
              </View>
              </View>
              <View style={styles.buttonV}>
              {flag == 'true' && currentBG != '' && ketones != '' && level != '' ?
     (     <View style = {styles.innerCotainer}>
    <Text style= {styles.textBody}>Recommendations: </Text>


    <Text style= {styles.textHeader}>Total Daily Dose: {extraInsulin} </Text> 

    <Text style= {styles.textHeader}>{recom}</Text>
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
const {height} = Dimensions.get('screen');
const height_logo = height * 0.15;

export default sickDay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF0F2',
  },
  pic: {
    width: height_logo,
    height: height_logo,
    marginRight: 10,
},
textHeader:{
   fontSize: 15,
   color: '#05375a',
   textAlign: 'center',
   lineHeight: 27,
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
  paddingLeft: 20,
  paddingTop: 15,
  fontSize: 18,
},
picker: {
  color: 'grey',
    width: 150,
    borderWidth: 2,
    paddingLeft: -10,
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
