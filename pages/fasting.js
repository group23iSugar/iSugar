import React, {useState, useEffect} from 'react';
import { StyleSheet, 
    View,
    Image, 
    Text,
    ScrollView,
    TouchableOpacity, 
    Dimensions } from 'react-native'; 
import LinearGradient from 'react-native-linear-gradient';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import { set } from 'react-native-reanimated';

//====Patient Profile table=======
global.centNameF = '';
global.centCityF = '';
global.DiabetescenterF= '';
global.DODF = '';
global.weightKGF = 0;
global.heightCMF = 0;
global.DOBirthF= '';
global.DOLatestHB1ACF = '';
global.latestHB1AC_F = 0; 
global.glucoseUnitF = '';
global.insulinRegF = '';
global.ketonesMeasureF = '';
global.bgTargetF = 0;
global.bgStartF = 0;
global.fromBGF = 0;
global.toBGF= 0;
global.InsulinSFF = 0;
global.intervalISFF = '';
global.insulinCalcMethodF = '';
global.glucoseMonitorF = '';
global.nameG = '';
//==========ICR Fasting========
global.ICRFasting = [];

//========ISF Fasting=========
global.ISFFasting = [];

//========SS Fasting==========
global.SSFasting = [];
global.bgleveltoinsulinFating = [];

//========PEN Fasting==========
global.penFating = [];

//=======Other Fasting=========
global.otherFasting = [];

//=======TakenDose Fasting=====
global.takenInsulinDoseFasting = [];

//========Planned Fasting======
global.plannedExerciseFasting = [];

//========Previous Fasting=====
global.previousExerciseFasting = [];


const fasting = ({ navigation }) => {
    const [yesFlag, setYes] = useState(false); 
    const [noFlag, setNo] = useState(false);
    const [typeFlag, setType] = useState(false);
    // const msgShow = () => {
    //     if (noFlag){
    //         var curDate = new Date();
    //         var firstEnteryDate = '';
    //         var firstEntryTime = '';
    //         try {
    //             db.transaction(tx => {
    //               tx.executeSql(
    //                 'SELECT  recordDate, recordTime FROM fasting',
    //                 [],
    //                 (tx, results) => {
    //                   var rows = results.rows;
    //                   for (let i = 0; i < rows.length; i++) {
    //                     firstEnteryDate = new Date(rows.item(i).recordDate);
    //                     firstEntryTime = rows.item(i).recordTime;
    //                   }
    //                 },
    //               );
    //             });
    //           } catch (error) {
    //             console.log(error);
    //           }
    //           if ((curDate - firstEnteryDate) / (1000 * 60 * 60) >= 336) { // show every 2 weeks
    //             setYes(true);
    //             setNo(false);
    //           }
    //           if ((curDate - DOLatestHB1ACF)  / (1000 * 60 * 60) <= 2190){ //past 3 months of hb1ac
    //             if(latestHB1AC_F>=10) {
    //                 setYes(true);
    //                 setNo(false);
    //             }
              
    //         }

    //     }
    // }
    //======Retreives=========//
    const pTableRetrieve = (callback, callback2, callback3, callback4) => {
        var interval = -1;
        var calcM = '';
    console.log('in first');
    try {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT UserID, DOB, weightKG, latest_HP1AC, latest_HP1AC_date, typeOfGlucoseM, glucoseLevel_unit, ketonesMeasure, insulinRegimen, ISF, targetBG_correct, startBG_correct, ISFIntervals, insulinCalcMethod, fromBG, toBG, height, diabetes_center, diagnosis_date, center_name, center_city FROM patientprofile',
          [],
          (tx, results) => {
            var rows = results.rows;
            for (let i = 0; i < rows.length; i++) {
              var UID = rows.item(i).UserID;
              console.log(UID);
              if (UID == uID) {
                DODF = rows.item(i).diagnosis_date;
                console.log(DODF+' heya');
                centNameF = rows.item(i).center_name;
                centCityF = rows.item(i).center_city;
                DiabetescenterF = rows.item(i).diabetes_center;
                weightKGF = rows.item(i).weightKG;
                heightCMF = rows.item(i).height;
                DOBirthF = rows.item(i).DOB;
                DOLatestHB1ACF = rows.item(i).latest_HP1AC_date;
                latestHB1AC_F = rows.item(i).latest_HP1AC;
                glucoseUnitF = rows.item(i).glucoseLevel_unit; 
                insulinRegF  = rows.item(i).insulinRegimen; 
                ketonesMeasureF = rows.item(i).ketonesMeasure; 
                bgTargetF = rows.item(i).targetBG_correct;
                bgStartF = rows.item(i).startBG_correct;
                fromBGF = rows.item(i).fromBG;
                toBGF = rows.item(i).toBG;
                InsulinSFF = rows.item(i).ISF;
                intervalISFF = rows.item(i).ISFIntervals;
                interval = rows.item(i).ISFIntervals;
                insulinCalcMethodF = rows.item(i).insulinCalcMethod;
                calcM = rows.item(i).insulinCalcMethod;
                glucoseMonitorF = rows.item(i).typeOfGlucoseM;
                //=============================================
                
                callback(intervalISFF);
                callback3();
                callback4();
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

    const retrieve = (interval) => {
        //interval is wither the user is using isf intervals or not ( 1 or 0)
        console.log('in second');
        console.log(interval);
        if (interval != -1) {
          if (interval == 1) {
            console.log('in instervalsssss');
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
                        ISFFasting.push({
                            from: rows.item(i).fromTime,
                            to: rows.item(i).toTime,
                            ISF_: rows.item(i).ISF,
                            target: rows.item(i).targetBG_correct,
                            start: rows.item(i).startBG_correct
                        });
                        console.log(ISFFasting[i]);
                      }
                    }
                  },
                );
              });
            } catch (error) {
              console.log(error);
            }
          } else {
              return;
          }
        }
      };
      const secondretrieve = (method) => {
        //calcM??
        console.log('inside is: ' + method);
        if (method == 'ICR') {
          try {
            db.transaction(tx => {
              tx.executeSql(
                'SELECT icrID, fromTime, toTime, ICR FROM icrInterval WHERE UserID=?',
                [uID],
                (tx, results) => {
                  var rows = results.rows;
                  for (let i = 0; i < rows.length; i++) {
                    ICRFasting.push({
                      id: rows.item(i).icrID,
                      from: rows.item(i).fromTime,
                      to: rows.item(i).toTime,
                      icr: rows.item(i).ICR,
                    });
                    
                  console.log(ICRFasting[i].from + ' This is icr arr');
                  }
                  inserts();
                },
                
              );
              
            });
          } catch (error) {
            console.log(error);
          }
        } else if (method == 'Sliding Scale') {
          console.log('hello Sliding');
          try {
            db.transaction(tx => {
              tx.executeSql(
                'SELECT ssID, fromTime, toTime FROM ssInterval WHERE UserID=?',
                [uID],
                (tx, results) => {
                  var rows = results.rows;
                  for (let i = 0; i < rows.length; i++) {
                    SSFasting.push({
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
                                SSFasting[i].Rnages.push({
                                id: rows2.item(j).bgID,
                                BGFrom: rows2.item(j).fromBGLevel,
                                BGTo: rows2.item(j).toBGLevel,
                                insulin: rows2.item(j).insulinDose,
                              });
                              console.log(SSFasting[i].Rnages[j]);
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
              inserts();
            });
          } catch (error) {
            console.log(error);
          }
        }
      };

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
                    penFating.push({
                        insulinType: rows.item(i).insulinType,
                        halfORfull: rows.item(i).halfORfull,
                    });
                    
                  console.log(penFating[i].insulinType + ' This is pennn arr');
                    return;
                  }
                }
              },
            );
          });
        } catch (error) {
          console.log(error);
        }
        //========OTHER=========
        try {
            db.transaction(tx => {
              tx.executeSql(
                'SELECT UserID, insulinType, iDose, iTime FROM insulinPen',
                [],
                (tx, results) => {
                  var rows = results.rows;
      
                  for (let i = 0; i < rows.length; i++) {
                    var userid = rows.item(i).UserID;
                  
                    if (userid == uID) {
                        otherFasting.push({
                          insulinType: rows.item(i).insulinType,
                          iDose: rows.item(i).iDose,
                          iTime: rows.item(i).iTime,
                      });
                      console.log(otherFasting[i] + ' This is pennn arr');
                      if (rows.item(i).insulinType == 'NPH' || rows.item(i).insulinType == 'mixed rapid+ intermediate' || rows.item(i).insulinType == 'Deguldec+Aspart Mix'){
                            setType(true);
                            nameG = rows.item(i).insulinType;
                      }
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
    
      const retrieve4 = () => {
        try {
          db.transaction(tx => {
            tx.executeSql(
              'SELECT UserID, BG_level, ReasonForInsulin, CHO, insulinDose, Dose_time_hours, Dose_time_minutes, Dose_Date_Month, Dose_Date_Day, Dose_Date_Year FROM takenInsulinDose',
              [],
              (tx, results) => {
                var rows = results.rows;
    
                for (let i = 0; i < rows.length; i++) {
                  var userid = rows.item(i).UserID;
                
                  if (userid == uID) {
                    takenInsulinDoseFasting.push({
                        BG_level: rows.item(i).BG_level,
                        ReasonForInsulin: rows.item(i).ReasonForInsulin,
                        insulinDose: rows.item(i).insulinDose,
                        CHO: rows.item(i).CHO,
                        Dose_time_hours: rows.item(i).Dose_time_hours,
                        Dose_time_minutes: rows.item(i).Dose_time_minutes,
                        Dose_Date_Month: rows.item(i).Dose_Date_Month,
                        Dose_Date_Day: rows.item(i).Dose_Date_Day,
                        Dose_Date_Year: rows.item(i).Dose_Date_Year,
                    });
    
                    return;
                  }
                }
              },
            );
          });
        } catch (error) {
          console.log(error);
        }
        try {
            db.transaction(tx => {
              tx.executeSql(
                'SELECT UserID, type, duration FROM plannedExercise',
                [],
                (tx, results) => {
                  var rows = results.rows;
      
                  for (let i = 0; i < rows.length; i++) {
                    var userid = rows.item(i).UserID;
                  
                    if (userid == uID) {
                        plannedExerciseFasting.push({
                            type: rows.item(i).type,
                            duration: rows.item(i).duration,
                      });
      
                      return;
                    }
                  }
                },
              );
            });
          } catch (error) {
            console.log(error);
          }
          try {
            db.transaction(tx => {
              tx.executeSql(
                'SELECT UserID, type, duration, Time FROM prevoiusExercise',
                [],
                (tx, results) => {
                  var rows = results.rows;
      
                  for (let i = 0; i < rows.length; i++) {
                    var userid = rows.item(i).UserID;
                  
                    if (userid == uID) {
                        previousExerciseFasting.push({
                            type: rows.item(i).type,
                            duration: rows.item(i).duration,
                            Time: rows.item(i).Time,
                      });
      
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

      const inserts = () =>{
        console.log('in inserts');
        try {
            db.transaction( (tx) => {
                tx.executeSql(
                 'INSERT INTO patientprofileFasting (UserID, DOB, weightKG, latest_HP1AC, latest_HP1AC_date, typeOfGlucoseM, glucoseLevel_unit, ketonesMeasure, insulinRegimen, ISF, targetBG_correct, startBG_correct, ISFIntervals, insulinCalcMethod, fromBG, toBG, height, diabetes_center, diagnosis_date, center_name, center_city)' 
                 +'VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                   [uID, DOBirthF, weightKGF, latestHB1AC_F, DOLatestHB1ACF, glucoseMonitorF, glucoseUnitF, ketonesMeasureF, insulinRegF, InsulinSFF, bgTargetF, bgStartF, intervalISFF, insulinCalcMethodF, fromBGF, toBGF, heightCMF, DiabetescenterF, DODF, centNameF, centCityF ]
               );
           })
           try {
            db.transaction(tx => {
              tx.executeSql(
                'SELECT UserID, DOB, weightKG, latest_HP1AC, latest_HP1AC_date, typeOfGlucoseM, glucoseLevel_unit, ketonesMeasure, insulinRegimen, ISF, targetBG_correct, startBG_correct, ISFIntervals, insulinCalcMethod, fromBG, toBG, height, diabetes_center, diagnosis_date, center_name, center_city FROM patientprofileFasting',
                [],
                (tx, results) => {
                  var rows = results.rows;
                  for (let i = 0; i < rows.length; i++) {
                    var UID = rows.item(i).UserID;
                    console.log(UID);
                    console.log(rows.item(i).DOB);
                  }
                },
              );
            });
          } catch (error) {
            console.log(error);
          }
       } catch (error) {
           console.log(error);
       }  
       //===============icr==========
       if (insulinCalcMethodF == 'ICR'){
           if (ICRFasting.length > 0){
            for (let i = 0; i < ICRFasting.length; i++){
              try {
                db.transaction( (tx) => {
                    tx.executeSql(
                     'INSERT INTO icrIntervalFasting (UserID, fromTime, toTime, ICR)' 
                     +'VALUES (?,?,?,?)',
                       [uID, ICRFasting[i].from, ICRFasting[i].to, ICRFasting[i].icr ]
                   );
               })
               try {
                db.transaction(tx => {
                  tx.executeSql(
                    'SELECT UserID, fromTime FROM icrIntervalFasting',
                    [],
                    (tx, results) => {
                      var rows = results.rows;
                      for (let i = 0; i < rows.length; i++) {
                        var UID = rows.item(i).UserID;
                        console.log(UID);
                        console.log(rows.item(i).fromTime+ ' after insert');
                      }
                    },
                  );
                });
              } catch (error) {
                console.log(error);
              }
              } catch (error) {
               console.log(error);
              }
            }

                
            
           }
        
       } else {
           if (SSFasting.length  >0){
            for (let i = 0; i < SSFasting.length; i++){
              try { 
                console.log('in if 1');
                db.transaction( (tx) => { 
                    tx.executeSql(
                     'INSERT INTO ssIntervalFasting (UserID, fromTime, toTime)' 
                     +'VALUES (?,?,?)',
                       [uID, SSFasting[i].FromTime, SSFasting[i].toTime]
                   );
                   for (let j=0; j<SSFasting[i].Rnages.length; j++){
                    if (SSFasting[i].Rnages[j].flagI){
                      try {
                        db.transaction( (tx) => {
                            tx.executeSql(
                             'INSERT INTO bgleveltoinsulinFasting (ssID, fromBGLevel, toBGLevel, insulinDose)' 
                             +'VALUES (?,?,?,?)',
                               [ssID, SSFasting[i].Rnages[j].BGFrom, SSFasting[i].Rnages[j].BGTo, SSFasting[i].Rnages[j].insulin]
                           );
                           bgtoIOnlineDb(i, j);
                       })
                       console.log(SSFasting[i].Rnages[j].BGFrom+' / '+SSFasting[i].Rnages[j].BGTo+' / '+ SSFasting[i].Rnages[j].insulin);
                      } catch (error) {
                       console.log(error);
                      }
                    }
                  }
               })
               
           
           } catch (error) {
               console.log(error);
           }
           
            
            }
                  
              
           }
       
       }
     //==========ISF==============
     if (intervalISFF == 1){
        if (ISFFasting.length > 0){
          for (let i = 0; i < ISFFasting.length; i++){
            try {
              db.transaction( (tx) => {
                  tx.executeSql(
                   'INSERT INTO isfIntervalFasting (UserID, fromTime, toTime, ISF, targetBG_correct, startBG_correct)' 
                   +'VALUES (?,?,?,?,?,?)',
                     [uID, ISFFasting[i].from, ISFFasting[i].to, ISFFasting[i].ISF_, ISFFasting[i].target, ISFFasting[i].start ]
                 );
             })
             try {
              db.transaction(tx => {
                tx.executeSql(
                  'SELECT UserID, fromTime FROM isfIntervalFasting',
                  [],
                  (tx, results) => {
                    var rows = results.rows;
                    for (let i = 0; i < rows.length; i++) {
                      var UID = rows.item(i).UserID;
                      console.log(UID);
                      console.log(rows.item(i).fromTime+ ' after isffffffff');
                    }
                  },
                );
              });
            } catch (error) {
              console.log(error);
            }
            } catch (error) {
             console.log(error);
            }
          }
                 
                
                }
                }
     //================Taken Insulin========
     if (takenInsulinDoseFasting.length > 0){
      for (let i = 0; i < takenInsulinDoseFasting.length; i++){
        try {
          db.transaction( (tx) => {
              tx.executeSql(
               'INSERT INTO takenInsulinDoseFasting (UserID, BG_level, ReasonForInsulin, CHO, insulinDose, Dose_time_hours, Dose_time_minutes, Dose_Date_Month, Dose_Date_Day, Dose_Date_Year)' 
               +'VALUES (?,?,?,?,?,?,?,?,?,?)',
                 [uID, takenInsulinDoseFasting[i].BG_level, takenInsulinDoseFasting[i].ReasonForInsulin, takenInsulinDoseFasting[i].CHO, takenInsulinDoseFasting[i].insulinDose, takenInsulinDoseFasting[i].Dose_time_hours, takenInsulinDoseFasting[i].Dose_time_minutes, takenInsulinDoseFasting[i].Dose_Date_Month, takenInsulinDoseFasting[i].Dose_Date_Day, takenInsulinDoseFasting[i].Dose_Date_Year ]
             );
         })
         
        } catch (error) {
         console.log(error);
        }
      }
              
            
            }
    //================planned===============
    if (plannedExerciseFasting.length > 0){
      for (let i = 0; i < plannedExerciseFasting.length; i++){
        try {
          db.transaction( (tx) => {
              tx.executeSql(
               'INSERT INTO plannedExerciseFasting (UserID, type, duration)' 
               +'VALUES (?,?,?)',
                 [uID, plannedExerciseFasting[i].type, plannedExerciseFasting[i].duration ]
             );
         })
         
        } catch (error) {
         console.log(error);
        }
      }
           
            
            }
    
    //================previous==============
    if (previousExerciseFasting.length > 0){
      for (let i = 0; i < previousExerciseFasting.length; i++){
        try {
          db.transaction( (tx) => {
              tx.executeSql(
               'INSERT INTO previousExerciseFasting (UserID, type, duration, Time)' 
               +'VALUES (?,?,?)',
                 [uID, previousExerciseFasting[i].type, previousExerciseFasting[i].duration, previousExerciseFasting[i].Time ]
             );
         })
         
        } catch (error) {
         console.log(error);
        }
      }
             
            
            }
            try {
                db.transaction( (tx) => {
                    tx.executeSql(
                     'INSERT INTO fasting (UserID, recordDate, recordTime, profileEntry)' 
                     +'VALUES (?,?,?,?)',
                       [uID, new Date(), moment(new Date()).format('h:mm a'), 'false']
                   );
               })
               try {
                db.transaction(tx => {
                  tx.executeSql(
                    'SELECT UserID, profileEntry FROM fasting',
                    [],
                    (tx, results) => {
                      var rows = results.rows;
                      for (let i = 0; i < rows.length; i++) {
                        var UID = rows.item(i).UserID;
                        console.log(UID);
                        console.log(rows.item(i).profileEntry+ ' after fasting========');
                      }
                    },
                  );
                });
              } catch (error) {
                console.log(error);
              }
              } catch (error) {
               console.log(error);
              }
              for (let i = 0; i < penFating.length; i++){
                try {
                  db.transaction( (tx) => {
                      tx.executeSql(
                       'INSERT INTO insulinPenFasting (UserID, insulinType, halfORfull)' 
                       +'VALUES (?,?,?)',
                         [uID, penFating[i].insulinType, penFating[i].halfORfull]
                     );
                 })
                 try {
                  db.transaction(tx => {
                    tx.executeSql(
                      'SELECT UserID, insulinType FROM insulinPenFasting',
                      [],
                      (tx, results) => {
                        var rows = results.rows;
                        for (let i = 0; i < rows.length; i++) {
                          var UID = rows.item(i).UserID;
                          console.log(UID);
                          console.log(rows.item(i).insulinType+ ' after pennnnnnnnnnnnn');
                        }
                      },
                    );
                  });
                } catch (error) {
                  console.log(error);
                }
                } catch (error) {
                 console.log(error);
                }
              }
             
            
      };
      const settingYesFlag = ()=> {
        setYes(true);
        setNo(false);
        pTableRetrieve(retrieve, secondretrieve, retrieve3, retrieve4);
        console.log('yes in yes: '+yesFlag);
        console.log('no in yes: '+noFlag);
      }
      const settingNoFlag = ()=> {
       setYes(false);
       setNo(true);
       pTableRetrieve(retrieve, secondretrieve, retrieve3, retrieve4);
       console.log('yes in no: '+yesFlag);
        console.log('no in no: '+noFlag);
     }
  return (

    <View style={styles.container}>
       <Text
          style={{
            color: '#05375a',
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'left',
            paddingTop: 20,
            paddingLeft: 15,
          }}>
          Fasting
        </Text>
         <ScrollView> 
         <View style={styles.body}>
             {noFlag ? null : (
                <View style={styles.innerCotainer}>
          <Text style={styles.textAlert}>It is not recommended to fast if:</Text>
          <Text style={styles.textBody}>1-	You had frequent hypoglycemia (low blood glucose levels) before or during fasting Ramadan.</Text>
          <Text style={styles.textBody}>2-	You are unable to recognize hypoglycemia.</Text>
          <Text style={styles.textBody}>3-	You are sick or feel unwell.</Text>
          <Text style={styles.textBody}>4-	You had Diabetes Ketoacidosis (DKA) in the past 3 months.</Text>
          <Text style={styles.textBody}>5-	Poor diabetes control (HBA1C of 10% or more in during the last 3 months).</Text>
          <Text style={styles.textBody}>6-	You have kidney disease.</Text>
          
          {yesFlag || noFlag ? null : ( <View>
            <Text style={styles.textHeader}>Would you like to see this message daily?</Text>
            <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
            <TouchableOpacity  onPress={()=>settingYesFlag()}>
                  <LinearGradient
                      colors={['#E7EFFA', '#AABED8', '#AABED8']} style={styles.buttonR}
                  >
                      <Text style={{fontWeight: 'bold', color: '#05375a',}}>Yes</Text>
                    
                  </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity  onPress={()=>settingNoFlag()}>
                  <LinearGradient
                      colors={['#E7EFFA', '#AABED8', '#AABED8']} style={styles.buttonR}
                  >
                      <Text style={{ fontWeight: 'bold', color: '#05375a', }}>No</Text>
                    
                  </LinearGradient>
              </TouchableOpacity>
          </View>
          </View>
           
          )}
          
          </View>
             )}
         
      
           {typeFlag ? (<View>
            <View style={styles.innerCotainer}>
          <Text style={styles.textAlert}>Fasting recommendations for users who take {nameG} insulin is not supported in this application. Please contact your Diabetes center for required insulin adjustments during fasting.</Text>
          
          </View>
           </View>) : (
             <View>
               
             </View>
           )}
        <TouchableOpacity onPress={()=>{navigation.navigate('fastingProfile'); }}>
            <LinearGradient style={styles.outer}
            colors={['#a8dadc', '#457b9d']}>
            <View style={styles.inner}>
            <Text style={styles.textBody}>Insulin profile for Ramadan fasting</Text>
            </View>
            
            </LinearGradient>
            </TouchableOpacity>
     {/* //=================// */}
     <TouchableOpacity onPress={()=>{navigation.navigate('calcFasting'); }}>
            <LinearGradient style={styles.outer}
            colors={['#a8dadc', '#457b9d']}>
            <View style={styles.inner}>
            <Text style={styles.textBody}>Insulin bolus calculator for Ramadan fasting</Text>
            </View>
            
            </LinearGradient>
            </TouchableOpacity>
           
            {/* //=================// */}
            <TouchableOpacity onPress={()=>{navigation.navigate('calcRecommend'); }}>
            <LinearGradient style={styles.outer}
            colors={['#a8dadc', '#457b9d']}>
            <View style={styles.inner}>
            <Text style={styles.textBody}>Basal insulin adjustments recommendations for Ramadan fasting. </Text>
            </View>
            
            </LinearGradient>
            </TouchableOpacity>
            {/* //======= ==========// */}
            <TouchableOpacity onPress={()=>{navigation.navigate('guidlines'); }}>
            <LinearGradient style={styles.outer}
            colors={[ '#a8dadc', '#457b9d']}>
            <View style={styles.inner}>
            <Text style={styles.textBody}>General guidelines for fasting and diabetes </Text>
            </View>
            </LinearGradient>
            </TouchableOpacity>
            {/* //=================// */}
           </View>
        </ScrollView>
    </View>      

    
  );
};


const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

export default fasting;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEF0F2',
      },
      innerTitle: {
        fontSize: 15, color: '#05375a', fontWeight:'bold', textAlign: 'center'
    },
      pic: {
        width: height_logo,
        height: height_logo,
        marginRight: 10,
    },
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
    outer: {
        width: 275,
        height: 110,
        marginTop: 15,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
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
      inner: {
        width: 250,
        height: 110,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'white'
        
      },
    textHeader:{
       fontSize: 18,
       paddingBottom: 15,
       paddingTop: 15,
       color: '#05375a', 
       textAlign: 'left',
       paddingLeft: 10,
       paddingRight: 10
    },
    textAlert:{
      fontSize: 17,
      color: 'red', 
      fontWeight: 'bold',
      textAlign: 'center',
      paddingLeft: 10,
      paddingRight: 10
    },
    textBody:{
        fontSize: 20,
        marginBottom: 15,
        paddingBottom: 15,
        color: '#05375a', 
        textAlign: 'left',
        fontWeight: 'bold',
     }, 
     textInput: {
      width: 50,
      height: 45,
      marginLeft: 5,
      marginRight: 5,
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderColor: '#CACDD1',
      color: '#000'
    },
    textInputISF: {
      width: 60,
      height: 45,
      marginLeft: 35,
      marginRight: 5,
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderColor: '#CACDD1',
      color: '#000'
    },
     innerCotainer: {
      backgroundColor: 'white', margin: 10, alignItems: 'center',  borderRadius: 15, padding: 10, width: 310,
                  shadowColor: "#000",
                  shadowOffset: {
                  width: 0,
                  height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
    },
    innerCotainerISF: {
      backgroundColor: 'white', margin: 10,  borderRadius: 15, padding: 10, width: 360,
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
      backgroundColor: 'white', margin: 10, alignItems: 'center',  borderRadius: 15, padding: 10, width: 360,
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
    buttonV: {
      marginTop: 60,
      alignItems: 'center',
      
    },
    buttonR: {
      marginTop: 20,
      marginLeft: 30,
      alignItems: 'center',
      width: 50,
      height: 35,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 15,
      flexDirection: 'row',
    },
    buttonConvert: {
      marginTop: 20,
      marginLeft: 30,
      alignItems: 'center',
      width: 100,
      height: 35,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 15,
      flexDirection: 'row',
    },
    innerView: {
        flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, marginTop: 10,
    }, 
    container: {
      flex: 1,
      backgroundColor: '#EEF0F2',
    },
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
    outer: {
      width: 275,
      height: 110,
      marginTop: 15,
      marginBottom: 20,
      justifyContent: 'center',
      alignItems: 'center',
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
    inner: {
      width: 250,
      height: 110,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: 'white'
      
    },
    textBody:{
      fontSize: 17,
      color: '#05375a', 
      textAlign: 'center',
      fontWeight: 'bold',
      marginTop: 5,
      paddingTop: 15
    },
      ddown: {
      //drop down list style
    
    
      marginTop: 20,
      shadowColor: '#000',
      alignSelf: 'center',
      width: 300,
    
    
      alignItems: 'center',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.33,
      shadowRadius: 0.62,
    
      elevation: 7,
      backgroundColor: '#f5f5f5',
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
    inpTxt: {
      //lables
      paddingLeft: 20,
      paddingTop: 15,
      fontSize: 18,
    },
    picker: {
      color: 'grey',
      width: 300
    }
 
});


