/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable no-undef */
/* eslint-disable eqeqeq */

import moment from 'moment';
import PushNotification from 'react-native-push-notification';
import SQLite from 'react-native-sqlite-storage';

global.db = SQLite.openDatabase(
  {
    name: 'iSugar.db',
    location: 'Library',
  },
  () => {
    console.log('Success');
  },
  error => {
    console.log('ERROR: ' + error);
  },
);

var uID = 15;
var curDate = moment().format('YYYY-MM-DD');
var curTime = moment().format('HH:mm:ss');
var currentBG = '';
var ketones = '';
var level = '';

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

const tableukg = function(BG, ketonesSource, ketonesLevel){
   currentBG = BG;
   ketones = ketonesSource;
   level = ketonesLevel;
   var recommendation = '';

   if (currentBG < 70 && currentBG > 0){
       recommendation = 'Re-check your blood glucose in 30 minutes & If your unwell or have persistent vomiting, go to ER';
       handleScheduleNotification('iSugar','Time to Re-check your blood glucose level.', 1);//30
}//Case1 below 70
else {
    if (currentBG >= 70 && currentBG < 90){
        if ((ketones == 'blood' && level < 0.6) || (ketones == 'urine' && level == 'Negative')){
            recommendation = 'Encourage sugar-containing fluids intake (At least 100ml every hour) & Take a carbohydrate containing snack & Re-check your blood glucose & Ketone level in 2 hours or sooner if you have hypoglycemia symptoms & If you have vomiting & it is persistent, go to ER';
            handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 2);//120
        } else {
            if ((ketones == 'blood' && (level >= 0.6 && level <= 0.9)) || (ketones == 'urine' && level == 'Trace')){
                recommendation = 'Encourage sugar-containing fluids intake (At least 100ml every hour) & Take a carbohydrate containing snack & Re-check your blood glucose & Ketone level in 2 hours & or sooner if you have hypoglycemia symptoms & If you have vomiting & it is persistent, go to ER';
                handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 2);//120
                // there is a clalculation for insulin A
            }
            else {
                if ((ketones == 'blood' && (level >= 1 && level <= 1.4)) || (ketones == 'urine' && level == 'Small')){
                    recommendation = 'Encourage sugar-containing fluids intake (At least 100ml every hour) & Take a carbohydrate containing snack & Re-check your blood glucose & Ketone level in 2 hours & or sooner if you have hypoglycemia symptoms & If you have vomiting & it is persistent, go to ER';
                    handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 2);//120
                    // there is a clalculation for insulin A
                }
                else {
                    if ((ketones == 'blood' && (level >= 1.5 && level <= 2.9)) || (ketones == 'urine' && level == 'Moderate')){
                        recommendation = 'Encourage sugar-containing fluids intake (At least 100ml every hour) & Take a carbohydrate containing snack & Re-check your blood glucose & Ketone level in 2 hours & or sooner if you have hypoglycemia symptoms & High risk for Diabetes Ketoacidosis (DKA), close monitoring required & If you have vomiting & it is persistent, go to ER';
                        handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 2);//120
                    }
                    else {
                        if ((ketones == 'blood' && (level >= 3)) || (ketones == 'urine' && level == 'Large')){
                            recommendation = 'High risk for Diabetes Ketoacidosis (DKA), go to ER & Encourage sugar-containing fluids intake (At least 100ml every hour) & Take a carbohydrate containing snack';
                        }
                    }
                }
            }
        }
    }//Case 2 between 70-90
    else {
        if (currentBG >= 90 && currentBG < 180){
            if ((ketones == 'blood' && level < 0.6) || (ketones == 'urine' && level == 'Negative')){
                recommendation = 'Encourage fluids intake (At least 100ml every hour) & Re-check your blood glucose & Ketone level in 3 hours or sooner if you have hypoglycemia symptoms';
                handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 3);//180
            } else {
                if ((ketones == 'blood' && (level >= 0.6 && level <= 0.9)) || (ketones == 'urine' && level == 'Trace')){
                    recommendation = 'Encourage sugar-containing fluids intake (At least 100ml every hour) & Take a carbohydrate containing snack & Re-check your blood glucose & Ketone level in 3 hours or sooner if you have hypoglycemia symptoms & If you have vomiting & it is persistent, go to ER';
                    handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 3);//180
                }
                else {
                    if ((ketones == 'blood' && (level >= 1 && level <= 1.4)) || (ketones == 'urine' && level == 'Small')){
                        recommendation = 'Encourage sugar-containing fluids intake (At least 100ml every hour) & Take a carbohydrate containing snack & Re-check your blood glucose & Ketone level in 3 hours or sooner if you have hypoglycemia symptoms & If you have vomiting & it is persistent, go to ER';
                        handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 3);//180
                    }
                    else {
                        if ((ketones == 'blood' && (level >= 1.5 && level <= 2.9)) || (ketones == 'urine' && level == 'Moderate')){
                            recommendation = 'Encourage sugar-containing fluids intake (At least 100ml every hour) & Take a carbohydrate containing snack & Re-check your blood glucose & Ketone level in 2 hours or sooner if you have hypoglycemia symptoms & High risk for Diabetes Ketoacidosis (DKA), close monitoring required & If you have vomiting & it is persistent, go to ER';
                            handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 2);//120
                        }
                        else {
                            if ((ketones == 'blood' && (level >= 3)) || (ketones == 'urine' && level == 'Large')){
                                recommendation = 'High risk for Diabetes Ketoacidosis (DKA), go to ER & Encourage sugar-containing fluids intake (At least 100ml every hour) & Take a carbohydrate containing snack';
                            }
                        }
                    }
                }
            }
        }
        else {
            if (currentBG >= 180 && currentBG < 250){
                if ((ketones == 'blood' && level < 0.6) || (ketones == 'urine' && level == 'Negative')){
                    recommendation = 'Encourage fluids intake (At least 100ml every hour) & Re-check your blood glucose & Ketone level in 4 hours If you have vomiting & it is persistent, go to ER';
                    handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 4);//240
                } else {
                    if ((ketones == 'blood' && (level >= 0.6 && level <= 0.9)) || (ketones == 'urine' && level == 'Trace')){
                        recommendation = 'Encourage sugar - containing fluids intake (At least 100ml every hour) & Re-check your blood glucose & Ketone level in 4 hours &If you have vomiting & it is persistent, go to ER';
                        handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 4);//240
                    }
                    else {
                        if ((ketones == 'blood' && (level >= 1 && level <= 1.4)) || (ketones == 'urine' && level == 'Small')){
                            recommendation = 'Encourage sugar - containing fluids intake (At least 100ml every hour) & Take a carbohydrate containing snack & Re-check your blood glucose & Ketone level in 4 hours & If you have vomiting & it is persistent, go to ER';
                            handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 4);//240
                        }
                        else {
                            if ((ketones == 'blood' && (level >= 1.5 && level <= 2.9)) || (ketones == 'urine' && level == 'Moderate')){
                                recommendation = 'Encourage sugar - containing fluids intake (At least 100ml every hour) & Take a carbohydrate containing snack & Re-check your blood glucose & Ketone level in 4 hours & High risk for Diabetes Ketoacidosis (DKA), close monitoring required & If you have vomiting & it is persistent, go to ER';
                                handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 4);//240
                            }
                            else {
                                if ((ketones == 'blood' && (level >= 3)) || (ketones == 'urine' && level == 'Large')){
                                    recommendation = 'High risk for Diabetes Ketoacidosis (DKA), go to ER & Encourage sugar - containing fluids intake (At least 100ml every hour) & Take a carbohydrate containing snack';
                                }
                            }
                        }
                    }
                }

            }//Case4 between 180-250
            if (currentBG >= 250 && currentBG < 400){
                if ((ketones == 'blood' && level < 0.6) || (ketones == 'urine' && level == 'Negative')){
                    recommendation = 'Encourage fluids intake (At least 100ml every hour) & Re-check your blood glucose & Ketone level in 4 hours If you have vomiting & it is persistent, go to ER';
                    handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 4);//240
                } else {
                    if ((ketones == 'blood' && (level >= 0.6 && level <= 0.9)) || (ketones == 'urine' && level == 'Trace')){
                        recommendation = 'Encourage fluids intake (At least 100ml every hour) & Re-check your blood glucose & Ketone level in 4 hours & If you have vomiting & it is persistent, go to ER';
                        handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 4);//240
                    }
                    else {
                        if ((ketones == 'blood' && (level >= 1 && level <= 1.4)) || (ketones == 'urine' && level == 'Small')){
                            recommendation = 'Encourage sugar-free fluids intake (At least 100ml every hour) & Re-check your blood glucose & Ketone level in 2 hours & If you have vomiting & it is persistent, go to ER';
                            handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 2);//120
                        }
                        else {
                            if ((ketones == 'blood' && (level >= 1.5 && level <= 2.9)) || (ketones == 'urine' && level == 'Moderate')){
                                recommendation = '-Encourage sugar-free fluids intake (At least 100ml every hour) & Re-check your blood glucose & Ketone level in 2 hours & High risk for Diabetes Ketoacidosis (DKA), close monitoring required & If you have vomiting & it is persistent, go to ER';
                                handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 2);//120
                            }
                            else {
                                if ((ketones == 'blood' && (level >= 3)) || (ketones == 'urine' && level == 'Large')){
                                    recommendation = 'High risk for Diabetes Ketoacidosis (DKA), go to ER & Encourage sugar-free fluids intake (At least 100ml every hour)';
                                }
                            }
                        }
                    }
                }
            }//case 5 between 250-400
            else {
                console.log('hi');
               if (currentBG >= 400){
                        if ((ketones == 'blood' && level < 0.6) || (ketones == 'urine' && level == 'Negative')){
                            recommendation = 'Encourage sugar-free fluids intake (At least 100ml every hour) & Re-check your blood glucose & Ketone level in 4 hours & If you have vomiting & it is persistent, go to ER';
                            handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 4);//240
                        } else {
                            if ((ketones == 'blood' && (level >= 0.6 && level <= 0.9)) || (ketones == 'urine' && level == 'Trace')){
                                recommendation = 'Encourage sugar-free fluids intake (At least 100ml every hour) & Re-check your blood glucose & Ketone level in 3 hours & If you have vomiting & it is persistent, go to ER';
                                handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 3);//180
                            }
                            else {
                                if ((ketones == 'blood' && (level >= 1 && level <= 1.4)) || (ketones == 'urine' && level == 'Small')){
                                    recommendation = 'Encourage sugar-free fluids intake (At least 100ml every hour) & Re-check your blood glucose & Ketone level in 2 hours & If you have vomiting & it is persistent, go to ER';
                                    handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 2);//120
                                }
                                else {
                                    if ((ketones == 'blood' && (level >= 1.5 && level <= 2.9)) || (ketones == 'urine' && level == 'Moderate')){
                                        recommendation = 'Encourage sugar-free fluids intake (At least 100ml every hour) & Re-check your blood glucose & Ketone level in 2 hours & High risk for Diabetes Ketoacidosis (DKA), close monitoring required & If you have vomiting & it is persistent, go to ER';
                                        handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 2);//120
                                    }
                                    else {
                                        if ((ketones == 'blood' && (level >= 3)) || (ketones == 'urine' && level == 'Large')){
                                            recommendation = 'High risk for Diabetes Ketoacidosis (DKA), go to ER & Encourage sugar-free fluids intake (At least 100ml every hour)';
                                        }
                                    }
                                }
                            }
                        }
                    }//case 6 above 400
            }
        }
    }
}
//saveInfo();
insert();
    return recommendation;
};
  //---insert users-----========================= Withtin-APP DATABASE ***********************
const insert = async () => {
     console.log('in tableukg ' + uID + ' - ' + curDate + ' - ' + curTime);
     try {
      db.transaction( (tx) => {
          tx.executeSql(
           'INSERT INTO SDRecheckNotification (UserID, recheckDate, recheckTime) VALUES (?,?,?)',
             [uID, curDate, curTime]
         );
     })
   } catch (error) {
     console.log(error);
   }
   }
export default tableukg;
