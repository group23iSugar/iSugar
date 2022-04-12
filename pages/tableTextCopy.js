/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable no-undef */
/* eslint-disable eqeqeq */
//import {useState} from 'react';
import moment from 'moment';
import PushNotification from 'react-native-push-notification';
import SQLite from 'react-native-sqlite-storage';
// import timeDiffrence from './timeDiffrence';

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
var uID = 222;
var curDate = moment().format('YYYY-MM-DD');
var cTime = new Date();
var flag = '';
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
    const tableTextCopy = function(BG, ketonesSource, ketonesLevel, isMeal, flags){
        var currentBG = BG;
        var ketones = ketonesSource;
        var level = ketonesLevel;
        var recommendation = '';
        flag = flags;
        var ifMealTime = 'Take your insulin dose as usual for your meal/snack' + '\n' + '• for correction if needed based on your current blood glucose reading.'; //displayes message if its a meal time.
        var notMealTime = 'Take your insulin dose as usual for corrections if needed based on your current blood glucose reading.';//displayes message if its not a meal time.
        var finalRecommendation = '';
        var caseNO = '';
        console.log('is meal time? ' + isMeal);

    if (currentBG < 70 && currentBG > 0){
        console.log('flag now is-: ' + flag);
       recommendation = '• Re-check your blood glucose in 30 minutes' + '\n' + '• If your unwell or have persistent vomiting, go to ER';
       if (isMeal == 'Yes'){
           finalRecommendation = ifMealTime + recommendation;
       }
       else {
          finalRecommendation = notMealTime + recommendation;
       }
       if (flag != 'true'){
        handleScheduleNotification('iSugar','Time to Re-check your blood glucose level.', 30);//30
        }
    }//Case1 below 70

    if (currentBG >= 70 && currentBG < 90 && ketones == 'blood'){
        caseNO = '2';
        console.log('2');
    }

    if (currentBG >= 70 && currentBG < 90 && ketones == 'urine'){
        caseNO = '3';
        console.log('3');
    }

    if (currentBG >= 90 && currentBG < 180 && ketones == 'blood'){
        caseNO = '4';
        console.log('4');
    }

    if (currentBG >= 90 && currentBG < 180 && ketones == 'urine'){
        caseNO = '5';
        console.log('5');
    }

    if (currentBG >= 180 && currentBG < 250 && ketones == 'blood'){
        caseNO = '6';
        console.log('6');
    }

    if (currentBG >= 180 && currentBG < 250 && ketones == 'urine'){
        caseNO = '7';
        console.log('7');
    }

    if (currentBG >= 250 && currentBG < 400 && ketones == 'blood'){
        caseNO = '8';
        console.log('8');
    }

    if (currentBG >= 250 && currentBG < 400 && ketones == 'urine'){
        caseNO = '9';
        console.log('9');
    }

    if (currentBG >= 400 && ketones == 'blood'){
        caseNO = '10';
        console.log('10');
    }

    if (currentBG >= 400 && ketones == 'urine'){
        caseNO = '11';
        console.log('11');
    }


    if (caseNO == '2'){
switch (caseNO == '2'){
    case level < 0.6:
        console.log('A');
        recommendation = '• No extra insulin required for illness at this time' + '\n' + '• Encourage sugar-containing fluids intake (At least 100ml every hour)' + '\n' + '• Take a carbohydrate containing snack' + '\n' + '• Re-check your blood glucose & Ketone level in 2 hours or sooner if you have hypoglycemia symptoms' + '\n' + '• If you have vomiting & it is persistent, go to ER';
             if (isMeal == 'Yes'){
                 finalRecommendation = ifMealTime + recommendation;
             }
             else {
                finalRecommendation = notMealTime + recommendation;
             }
             if (flag != 'true'){
                handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 120);//120
                }
        break;

    case level >= 0.6 && level <= 0.9:
        console.log('B');
        recommendation = '• No extra insulin required for illness at this time' + '\n' + '• Encourage sugar-containing fluids intake (At least 100ml every hour)' + '\n' + '• Take a carbohydrate containing snack' + '\n' + '• Re-check your blood glucose & Ketone level in 2 hours & or sooner if you have hypoglycemia symptoms' + '\n' + '• If you have vomiting & it is persistent, go to ER';
        if (isMeal == 'Yes'){
           finalRecommendation = ifMealTime + recommendation;
       }
       else {
          finalRecommendation = notMealTime + recommendation;
       }
       if (flag != 'true'){
        handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 120);//120
        }
        // there is a clalculation for insulin A
        break;

    case level >= 1 && level <= 1.4:
        console.log('C');
        recommendation = '• No extra insulin required for illness at this time' + '\n' + '• Encourage sugar-containing fluids intake (At least 100ml every hour)' + '\n' + '• Take a carbohydrate containing snack' + '\n' + '• Re-check your blood glucose & Ketone level in 2 hours or sooner if you have hypoglycemia symptoms' + '\n' + '• If you have vomiting & it is persistent, go to ER';
        if (isMeal == 'Yes'){
                finalRecommendation = ifMealTime + recommendation;
            }
            else {
                finalRecommendation = notMealTime + recommendation;
            }
            if (flag != 'true'){
                 handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 120);//120
            }
        // there is a clalculation for insulin A
        break;

    case level >= 1.5 && level <= 2.9:
        console.log('D');
        recommendation = '• No extra insulin required for illness at this time' + '\n' + '• Encourage sugar-containing fluids intake (At least 100ml every hour)' + '\n' + '• Take a carbohydrate containing snack' + '\n' + '• Re-check your blood glucose & Ketone level in 2 hours & or sooner if you have hypoglycemia symptoms' + '\n' + '• High risk for Diabetes Ketoacidosis (DKA), close monitoring required' + '\n' + '• If you have vomiting & it is persistent, go to ER';
        if (isMeal == 'Yes'){
                finalRecommendation = ifMealTime + recommendation;
            }
            else {
                finalRecommendation = notMealTime + recommendation;
            }
            if (flag != 'true'){
                handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 120);//120
            }
        // there is a clalculation for insulin A
        break;

    case level >= 3:
        console.log('E');
        recommendation = '• No extra insulin required for illness at this time' + '\n' + '• High risk for Diabetes Ketoacidosis (DKA), go to ER' + '\n' + '• Encourage sugar-containing fluids intake (At least 100ml every hour)' + '\n' + '• Take a carbohydrate containing snack';
        if (isMeal == 'Yes'){
                finalRecommendation = ifMealTime + recommendation;
            }
            else {
                finalRecommendation = notMealTime + recommendation;
            }
        break;
}//Case 2 between 70-90
    }

    if (caseNO == '3'){
switch (caseNO == '3'){
    case level == 'Negative':
        console.log('A2');
        recommendation = '• No extra insulin required for illness at this time' + '\n' + '• Encourage sugar-containing fluids intake (At least 100ml every hour)' + '\n' + '• Take a carbohydrate containing snack' + '\n' + '• Re-check your blood glucose & Ketone level in 2 hours or sooner if you have hypoglycemia symptoms' + '\n' + '• If you have vomiting & it is persistent, go to ER';
        if (isMeal == 'Yes'){
                 finalRecommendation = ifMealTime + recommendation;
             }
             else {
                finalRecommendation = notMealTime + recommendation;
             }
             if (flag != 'true'){
                handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 120);//120
                }
        break;
    case level == 'Trace':
        console.log('B2');
        recommendation = '• No extra insulin required for illness at this time' + '\n' + '• Encourage sugar-containing fluids intake (At least 100ml every hour)' + '\n' + '• Take a carbohydrate containing snack' + '\n' + '• Re-check your blood glucose & Ketone level in 2 hours & or sooner if you have hypoglycemia symptoms' + '\n' + '• If you have vomiting & it is persistent, go to ER';
        if (isMeal == 'Yes'){
           finalRecommendation = ifMealTime + recommendation;
       }
       else {
          finalRecommendation = notMealTime + recommendation;
       }
       if (flag != 'true'){
        handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 120);//120
        }
        // there is a clalculation for insulin A
        break;
    case level == 'Small':
        console.log('C2');
        recommendation = '• No extra insulin required for illness at this time' + '\n' + '• Encourage sugar-containing fluids intake (At least 100ml every hour)' + '\n' + '• Take a carbohydrate containing snack' + '\n' + '• Re-check your blood glucose & Ketone level in 2 hours or sooner if you have hypoglycemia symptoms' + '\n' + '• If you have vomiting & it is persistent, go to ER';
        if (isMeal == 'Yes'){
                finalRecommendation = ifMealTime + recommendation;
            }
            else {
                finalRecommendation = notMealTime + recommendation;
            }
            if (flag != 'true'){
                 handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 120);//120
            }
        // there is a clalculation for insulin A
        break;
    case level == 'Moderate':
        console.log('D2');
        recommendation = '• No extra insulin required for illness at this time' + '\n' + '• Encourage sugar-containing fluids intake (At least 100ml every hour)' + '\n' + '• Take a carbohydrate containing snack' + '\n' + '• Re-check your blood glucose & Ketone level in 2 hours & or sooner if you have hypoglycemia symptoms' + '\n' + '• High risk for Diabetes Ketoacidosis (DKA), close monitoring required' + '\n' + '• If you have vomiting & it is persistent, go to ER';
        if (isMeal == 'Yes'){
                finalRecommendation = ifMealTime + recommendation;
            }
            else {
                finalRecommendation = notMealTime + recommendation;
            }
            if (flag != 'true'){
                handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 120);//120
            }
        // there is a clalculation for insulin A
        break;
    case level == 'Large':
        console.log('E2');
        recommendation = '• No extra insulin required for illness at this time' + '\n' + '• Encourage sugar-containing fluids intake (At least 100ml every hour)' + '\n' + '• Take a carbohydrate containing snack' + '\n' + '• Re-check your blood glucose & Ketone level in 2 hours & or sooner if you have hypoglycemia symptoms' + '\n' + '• High risk for Diabetes Ketoacidosis (DKA), close monitoring required' + '\n' + '• If you have vomiting & it is persistent, go to ER';
        if (isMeal == 'Yes'){
                finalRecommendation = ifMealTime + recommendation;
            }
            else {
                finalRecommendation = notMealTime + recommendation;
            }
            break;
}//Case 2 between 70-90
    }

    if (caseNO == '4'){
    switch (caseNO == '4'){
        case level < 0.6:
            console.log('F');
            recommendation = '• No extra insulin required for illness at this time' + '\n' + '• Encourage fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 3 hours or sooner if you have hypoglycemia symptoms';
            if (isMeal == 'Yes'){
                    finalRecommendation = ifMealTime + recommendation;
                }
                else {
                   finalRecommendation = notMealTime + recommendation;
                }
                if (flag != 'true'){
                    handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 180);//180
                    }
            break;
        case level >= 0.6 && level <= 0.9:
            console.log('G');
            recommendation = '• No extra insulin required for illness at this time' + '\n' + '• Encourage sugar-containing fluids intake (At least 100ml every hour)' + '\n' + '• Take a carbohydrate containing snack' + '\n' + '• Re-check your blood glucose & Ketone level in 3 hours or sooner if you have hypoglycemia symptoms' + '\n' + '• If you have vomiting & it is persistent, go to ER';
            if (isMeal == 'Yes'){
                        finalRecommendation = ifMealTime + recommendation;
                    }
                    else {
                       finalRecommendation = notMealTime + recommendation;
                    }
                    if (flag != 'true'){
                        handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 180);//180
                        }
            // there is a clalculation for insulin A
            break;
        case level >= 1 && level <= 1.4:
            console.log('H');
            recommendation = '• No extra insulin required for illness at this time' + '\n' + '• Encourage sugar-containing fluids intake (At least 100ml every hour)' + '\n' + '• Take a carbohydrate containing snack' + '\n' + '• Re-check your blood glucose & Ketone level in 3 hours or sooner if you have hypoglycemia symptoms' + '\n' + '• If you have vomiting & it is persistent, go to ER';
            if (isMeal == 'Yes'){
                    finalRecommendation = ifMealTime + recommendation;
                }
                else {
                    finalRecommendation = notMealTime + recommendation;
                }
                if (flag != 'true'){
                    handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 180);//180
                }
            // there is a clalculation for insulin A
            break;
        case level >= 1.5 && level <= 2.9:
            console.log('I');
            recommendation = '• Take an extra insulin dose calculated as 5% of your Total Daily Dose' + '\n' + '• Encourage sugar-containing fluids intake (At least 100ml every hour)' + '\n' + '• Take a carbohydrate containing snack' + '\n' + '• Re-check your blood glucose & Ketone level in 2 hours or sooner if you have hypoglycemia symptoms' + '\n' + '• High risk for Diabetes Ketoacidosis (DKA), close monitoring required' + '\n' + '• If you have vomiting & it is persistent, go to ER';
            if (isMeal == 'Yes'){
               finalRecommendation = ifMealTime + recommendation;
           }
           else {
              finalRecommendation = notMealTime + recommendation;
           }
           if (flag != 'true'){
            handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 120);//120
            }
            // there is a clalculation for insulin A
            break;
        case level >= 3:
            console.log('J');
            recommendation = '• Take an extra insulin dose calculated as 5% of your Total Daily Dose' + '\n' + '• High risk for Diabetes Ketoacidosis (DKA), go to ER' + '\n' + '• Encourage sugar-containing fluids intake (At least 100ml every hour)' + '\n' + '• Take a carbohydrate containing snack';
            if (isMeal == 'Yes'){
                                    finalRecommendation = ifMealTime + recommendation;
                                }
                                else {
                                   finalRecommendation = notMealTime + recommendation;
                                }
                                break;
    }//Case 4 between 90-180
    }

    if (caseNO == '5'){
    switch (caseNO == '5'){
        case level == 'Negative':
            console.log('F2');
            recommendation = '• No extra insulin required for illness at this time' + '\n' + '• Encourage fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 3 hours or sooner if you have hypoglycemia symptoms';
            if (isMeal == 'Yes'){
                    finalRecommendation = ifMealTime + recommendation;
                }
                else {
                   finalRecommendation = notMealTime + recommendation;
                }
                if (flag != 'true'){
                    handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 180);//180
                    }
            break;
        case level == 'Trace':
            console.log('G2');
            recommendation = '• No extra insulin required for illness at this time' + '\n' + '• Encourage sugar-containing fluids intake (At least 100ml every hour)' + '\n' + '• Take a carbohydrate containing snack' + '\n' + '• Re-check your blood glucose & Ketone level in 3 hours or sooner if you have hypoglycemia symptoms' + '\n' + '• If you have vomiting & it is persistent, go to ER';
            if (isMeal == 'Yes'){
                        finalRecommendation = ifMealTime + recommendation;
                    }
                    else {
                       finalRecommendation = notMealTime + recommendation;
                    }
                    if (flag != 'true'){
                        handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 180);//180
                        }
            // there is a clalculation for insulin A
            break;
        case level == 'Small':
            console.log('H2');
            recommendation = '• No extra insulin required for illness at this time' + '\n' + '• Encourage sugar-containing fluids intake (At least 100ml every hour)' + '\n' + '• Take a carbohydrate containing snack' + '\n' + '• Re-check your blood glucose & Ketone level in 3 hours or sooner if you have hypoglycemia symptoms' + '\n' + '• If you have vomiting & it is persistent, go to ER';
            if (isMeal == 'Yes'){
                finalRecommendation = ifMealTime + recommendation;
            }
            else {
                finalRecommendation = notMealTime + recommendation;
            }
            if (flag != 'true'){
                handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 180);//180
            }
            // there is a clalculation for insulin A
            break;
        case level == 'Moderate':
            console.log('I2');
            recommendation = '• Take an extra insulin dose calculated as 5% of your Total Daily Dose' + '\n' + '• Encourage sugar-containing fluids intake (At least 100ml every hour)' + '\n' + '• Take a carbohydrate containing snack' + '\n' + '• Re-check your blood glucose & Ketone level in 2 hours or sooner if you have hypoglycemia symptoms' + '\n' + '• High risk for Diabetes Ketoacidosis (DKA), close monitoring required' + '\n' + '• If you have vomiting & it is persistent, go to ER';
            if (isMeal == 'Yes'){
               finalRecommendation = ifMealTime + recommendation;
           }
           else {
              finalRecommendation = notMealTime + recommendation;
           }
           if (flag != 'true'){
            handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 120);//120
            }
            // there is a clalculation for insulin A
            break;
        case level == 'Large':
            console.log('J2');
            recommendation = '• Take an extra insulin dose calculated as 5% of your Total Daily Dose' + '\n' + '• High risk for Diabetes Ketoacidosis (DKA), go to ER' + '\n' + '• Encourage sugar-containing fluids intake (At least 100ml every hour)' + '\n' + '• Take a carbohydrate containing snack';
            if (isMeal == 'Yes'){
                                    finalRecommendation = ifMealTime + recommendation;
                                }
                                else {
                                   finalRecommendation = notMealTime + recommendation;
                                }
                                break;
    }//Case 5 between 90-180
    }

    if (caseNO == '6'){
        switch (caseNO == '6'){
            case level < 0.6:
                console.log('K');
                recommendation = '• Encourage fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 4 hours' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                    if (isMeal == 'Yes'){
                        finalRecommendation = ifMealTime + recommendation;
                    }
                    else {
                       finalRecommendation = notMealTime + recommendation;
                    }
                    if (flag != 'true'){
                        handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 240);//240
                        }
                break;
            case level >= 0.6 && level <= 0.9:
                console.log('L');
                recommendation = '• Take an extra insulin dose calculated as 5% of your Total Daily Dose' + '\n' + '• Encourage sugar - containing fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 4 hours' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                if (isMeal == 'Yes'){
                            finalRecommendation = ifMealTime + recommendation;
                        }
                        else {
                           finalRecommendation = notMealTime + recommendation;
                        } if (flag != 'true'){
                handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 240);//240
                }
                break;
            case level >= 1 && level <= 1.4:
                console.log('M');
                recommendation = '• Take an extra insulin dose calculated as 5% of your Total Daily Dose' + '\n' + '• Encourage sugar - containing fluids intake (At least 100ml every hour)' + '\n' + '• Take a carbohydrate containing snack' + '\n' + '• Re-check your blood glucose & Ketone level in 4 hours' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                if (isMeal == 'Yes'){
                                finalRecommendation = ifMealTime + recommendation;
                            }
                            else {
                               finalRecommendation = notMealTime + recommendation;
                            } if (flag != 'true'){
                handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 240);//240
                }
                break;
            case level >= 1.5 && level <= 2.9:
                console.log('N');
                recommendation = '• Take an extra insulin dose calculated as 10% of your Total Daily Dose' + '\n' + '• Encourage sugar - containing fluids intake (At least 100ml every hour)' + '\n' + '• Take a carbohydrate containing snack' + '\n' + '• Re-check your blood glucose & Ketone level in 4 hours' + '\n' + '• High risk for Diabetes Ketoacidosis (DKA), close monitoring required' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                if (isMeal == 'Yes'){
                                    finalRecommendation = ifMealTime + recommendation;
                                }
                                else {
                                   finalRecommendation = notMealTime + recommendation;
                                } if (flag != 'true'){
                handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 240);//240
                }
                break;
            case level >= 3:
                console.log('P');
                recommendation = '• Take an extra insulin dose calculated as 20% of your Total Daily Dose' + '\n' + '• High risk for Diabetes Ketoacidosis (DKA), go to ER' + '\n' + '• Encourage sugar - containing fluids intake (At least 100ml every hour)' + '\n' + '• Take a carbohydrate containing snack';
                if (isMeal == 'Yes'){
                                        finalRecommendation = ifMealTime + recommendation;
                                    }
                                    else {
                                       finalRecommendation = notMealTime + recommendation;
                                    }
                break;
        }//Case 6 between 180-250
    }

    if (caseNO == '7'){
        switch (caseNO == '7'){
            case level == 'Negative':
                console.log('K2');
                recommendation = '• Encourage fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 4 hours' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                if (isMeal == 'Yes'){
                        finalRecommendation = ifMealTime + recommendation;
                    }
                    else {
                       finalRecommendation = notMealTime + recommendation;
                    }
                    if (flag != 'true'){
                        handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 240);//240
                        }
                break;
            case level == 'Trace':
                console.log('L2');
                recommendation = '• Take an extra insulin dose calculated as 5% of your Total Daily Dose' + '\n' + '• Encourage sugar - containing fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 4 hours' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                if (isMeal == 'Yes'){
                            finalRecommendation = ifMealTime + recommendation;
                        }
                        else {
                           finalRecommendation = notMealTime + recommendation;
                        } if (flag != 'true'){
                handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 240);//240
                }
                break;
            case level == 'Small':
                console.log('M2');
                recommendation = '• Take an extra insulin dose calculated as 5% of your Total Daily Dose' + '\n' + '• Encourage sugar - containing fluids intake (At least 100ml every hour)' + '\n' + '• Take a carbohydrate containing snack' + '\n' + '• Re-check your blood glucose & Ketone level in 4 hours' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                if (isMeal == 'Yes'){
                                finalRecommendation = ifMealTime + recommendation;
                            }
                            else {
                               finalRecommendation = notMealTime + recommendation;
                            } if (flag != 'true'){
                handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 240);//240
                }
                break;
            case level == 'Moderate':
                console.log('N2');
                recommendation = '• Take an extra insulin dose calculated as 10% of your Total Daily Dose' + '\n' + '• Encourage sugar - containing fluids intake (At least 100ml every hour)' + '\n' + '• Take a carbohydrate containing snack' + '\n' + '• Re-check your blood glucose & Ketone level in 4 hours' + '\n' + '• High risk for Diabetes Ketoacidosis (DKA), close monitoring required' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                if (isMeal == 'Yes'){
                                    finalRecommendation = ifMealTime + recommendation;
                                }
                                else {
                                   finalRecommendation = notMealTime + recommendation;
                                } if (flag != 'true'){
                handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 240);//240
                }
                break;
            case level == 'Large':
                console.log('P2');
                recommendation = '• Take an extra insulin dose calculated as 20% of your Total Daily Dose' + '\n' + '• High risk for Diabetes Ketoacidosis (DKA), go to ER' + '\n' + '• Encourage sugar - containing fluids intake (At least 100ml every hour)' + '\n' + '• Take a carbohydrate containing snack';
                if (isMeal == 'Yes'){
                                        finalRecommendation = ifMealTime + recommendation;
                                    }
                                    else {
                                       finalRecommendation = notMealTime + recommendation;
                                    }
                                    break;
        }//Case 7 between 180-250
    }

    if (caseNO == '8'){
            switch (caseNO == '8'){
                case level < 0.6:
                    console.log('O');
                    recommendation = '• Encourage fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 4 hours' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                    if (isMeal == 'Yes'){
                        finalRecommendation = ifMealTime + recommendation;
                    }
                    else {
                       finalRecommendation = notMealTime + recommendation;
                    }
                    if (flag != 'true'){
                    handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 240);//240
                    }
                    break;
                case level >= 0.6 && level <= 0.9:
                    console.log('Q');
                    recommendation = '• Encourage fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 4 hours' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                         if (isMeal == 'Yes'){
                            finalRecommendation = ifMealTime + recommendation;
                        }
                        else {
                           finalRecommendation = notMealTime + recommendation;
                        }
                    if (flag != 'true'){
                    handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 240);//240
                    }
                    break;
                case level >= 1 && level <= 1.4:
                    console.log('R');
                    recommendation = '• Encourage sugar-free fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 2 hours' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                    if (isMeal == 'Yes'){
                        finalRecommendation = ifMealTime + recommendation;
                    }
                    else {
                       finalRecommendation = notMealTime + recommendation;
                    }
                    if (flag != 'true'){
                    handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 120);//120
                    }
                    break;
                case level >= 1.5 && level <= 2.9:
                    console.log('S');
                    recommendation = '' + '\n' + '• Encourage sugar-free fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 2 hours' + '\n' + '• High risk for Diabetes Ketoacidosis (DKA), close monitoring required' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                    if (isMeal == 'Yes'){
                        finalRecommendation = ifMealTime + recommendation;
                    }
                    else {
                       finalRecommendation = notMealTime + recommendation;
                    }
                    if (flag != 'true'){
                    handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 120);//120
                    }
                    break;
                case level >= 3:
                    console.log('T');
                    recommendation = '• High risk for Diabetes Ketoacidosis (DKA), go to ER' + '\n' + '• Encourage sugar-free fluids intake (At least 100ml every hour)';
                    if (isMeal == 'Yes'){
                        finalRecommendation = ifMealTime + recommendation;
                    }
                    else {
                       finalRecommendation = notMealTime + recommendation;
                    }
                    break;
            }//Case 8 between 250-400
    }

    if (caseNO == '9'){
            switch (caseNO == '9'){
                case level == 'Negative':
                    console.log('O2');
                    recommendation = '• Encourage fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 4 hours' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                    if (isMeal == 'Yes'){
                        finalRecommendation = ifMealTime + recommendation;
                    }
                    else {
                       finalRecommendation = notMealTime + recommendation;
                    }
                    if (flag != 'true'){
                    handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 240);//240
                    }
                    break;
                case level == 'Trace':
                    console.log('Q2');
                    recommendation = '• Encourage fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 4 hours' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                    if (isMeal == 'Yes'){
                       finalRecommendation = ifMealTime + recommendation;
                   }
                   else {
                      finalRecommendation = notMealTime + recommendation;
                   }
               if (flag != 'true'){
               handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 240);//240
               }
                    break;
                case level == 'Small':
                    console.log('R2');
                    recommendation = '• Encourage sugar-free fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 2 hours' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                    if (isMeal == 'Yes'){
                        finalRecommendation = ifMealTime + recommendation;
                    }
                    else {
                       finalRecommendation = notMealTime + recommendation;
                    }
                    if (flag != 'true'){
                    handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 120);//120
                    }
                    break;
                case level == 'Moderate':
                    console.log('S2');
                    recommendation = '' + '\n' + '• Encourage sugar-free fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 2 hours' + '\n' + '• High risk for Diabetes Ketoacidosis (DKA), close monitoring required' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                    if (isMeal == 'Yes'){
                        finalRecommendation = ifMealTime + recommendation;
                    }
                    else {
                       finalRecommendation = notMealTime + recommendation;
                    }
                    if (flag != 'true'){
                    handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 120);//120
                    }
                    break;
                case level == 'Large':
                    console.log('T2');
                    recommendation = '• High risk for Diabetes Ketoacidosis (DKA), go to ER' + '\n' + '• Encourage sugar-free fluids intake (At least 100ml every hour)';
                    if (isMeal == 'Yes'){
                        finalRecommendation = ifMealTime + recommendation;
                    }
                    else {
                       finalRecommendation = notMealTime + recommendation;
                    }
                    break;
            }//Case 9 between 250-400
    }

    if (caseNO == '10'){
                switch (caseNO == '10'){
                    case level < 0.6:
                        console.log('U');
                        recommendation = '' + '\n' + '• Take an extra insulin dose calculated as 5% of your Total Daily Dose' + '\n' + '• Encourage fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 4 hours' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                        if (isMeal == 'Yes'){
                                finalRecommendation = ifMealTime + recommendation;
                            }
                            else {
                               finalRecommendation = notMealTime + recommendation;
                            } if (flag != 'true'){
                        handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 240);//240
                        }
                        break;
                    case level >= 0.6 && level <= 0.9:
                        console.log('V');
                        recommendation = '• Take an extra insulin dose calculated as 5% of your Total Daily Dose' + '\n' + '• Encourage fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 4 hours' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                        if (isMeal == 'Yes'){
                                    finalRecommendation = ifMealTime + recommendation;
                                }
                                else {
                                   finalRecommendation = notMealTime + recommendation;
                                } if (flag != 'true'){
                        handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 180);//180
                        }
                        break;
                    case level >= 1 && level <= 1.4:
                        console.log('W');
                        recommendation = '• Take an extra insulin dose calculated as 10% of your Total Daily Dose' + '\n' + '• Encourage sugar-free fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 2 hours' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                        if (isMeal == 'Yes'){
                                        finalRecommendation = ifMealTime + recommendation;
                                    }
                                    else {
                                       finalRecommendation = notMealTime + recommendation;
                                    } if (flag != 'true'){
                        handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 120);//120
                        }
                        break;
                    case level >= 1.5 && level <= 2.9:
                        console.log('X');
                        recommendation = '• Take an extra insulin dose calculated as 10% of your Total Daily Dose' + '\n' + '• Encourage sugar-free fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 2 hours' + '\n' + '• High risk for Diabetes Ketoacidosis (DKA), close monitoring required' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                        if (isMeal == 'Yes'){
                                            finalRecommendation = ifMealTime + recommendation;
                                        }
                                        else {
                                           finalRecommendation = notMealTime + recommendation;
                                        } if (flag != 'true'){
                        handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 120);//120
                        }
                        break;
                    case level >= 3:
                        console.log('Y');
                        recommendation = '• Take an extra insulin dose calculated as 10% of your Total Daily Dose' + '\n' + '• High risk for Diabetes Ketoacidosis (DKA), go to ER' + '\n' + '• Encourage sugar-free fluids intake (At least 100ml every hour)';
                        if (isMeal == 'Yes'){
                                                finalRecommendation = ifMealTime + recommendation;
                                            }
                                            else {
                                               finalRecommendation = notMealTime + recommendation;
                                            }
                                            break;
                }//Case 10 between 400
                    }
    if (caseNO == '11'){
                switch (caseNO == '11'){
                    case level == 'Negative':
                        console.log('U2');
                        recommendation = '' + '\n' + '• Take an extra insulin dose calculated as 5% of your Total Daily Dose' + '\n' + '• Encourage fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 4 hours' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                        if (isMeal == 'Yes'){
                                finalRecommendation = ifMealTime + recommendation;
                            }
                            else {
                               finalRecommendation = notMealTime + recommendation;
                            } if (flag != 'true'){
                        handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 240);//240
                        }
                        break;
                    case level == 'Trace':
                        console.log('V2');
                        recommendation = '• Take an extra insulin dose calculated as 10% of your Total Daily Dose' + '\n' + '• Encourage sugar-free fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 2 hours' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                        if (isMeal == 'Yes'){
                                    finalRecommendation = ifMealTime + recommendation;
                                }
                                else {
                                   finalRecommendation = notMealTime + recommendation;
                                } if (flag != 'true'){
                        handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 180);//180
                        }
                        break;
                    case level == 'Small':
                        console.log('W2');
                        recommendation = 'Take an extra insulin dose calculated as 10% of your Total Daily Dose & Encourage sugar-free fluids intake (At least 100ml every hour) & Re-check your blood glucose & Ketone level in 2 hours & If you have vomiting & it is persistent, go to ER';
                        if (isMeal == 'Yes'){
                           finalRecommendation = ifMealTime + recommendation;
                       }
                       else {
                          finalRecommendation = notMealTime + recommendation;
                       } if (flag != 'true'){
           handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 120);//120
           }
                        break;
                    case level == 'Moderate':
                        console.log('X2');
                        recommendation = '• Take an extra insulin dose calculated as 10% of your Total Daily Dose' + '\n' + '• Encourage sugar-free fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 2 hours' + '\n' + '• High risk for Diabetes Ketoacidosis (DKA), close monitoring required' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                        if (isMeal == 'Yes'){
                                            finalRecommendation = ifMealTime + recommendation;
                                        }
                                        else {
                                           finalRecommendation = notMealTime + recommendation;
                                        } if (flag != 'true'){
                        handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 120);//120
                        }
                        break;
                    case level == 'Large':
                        console.log('Y2');
                        recommendation = '• Take an extra insulin dose calculated as 10% of your Total Daily Dose' + '\n' + '• High risk for Diabetes Ketoacidosis (DKA), go to ER' + '\n' + '• Encourage sugar-free fluids intake (At least 100ml every hour)';
                        if (isMeal == 'Yes'){
                                                finalRecommendation = ifMealTime + recommendation;
                                            }
                                            else {
                                               finalRecommendation = notMealTime + recommendation;
                                            }
                                            break;
                }//Case 11 between 400
    }

    insert();
    return finalRecommendation;
};
 const insert = async () => {
    console.log('in tableukg ' + uID + ' - ' + curDate + ' - ' + cTime);
    try {
     db.transaction( (tx) => {
         tx.executeSql(
          'INSERT INTO SDRecheckNotification (UserID, recheckDate, recheckTime) VALUES (?,?,?)',
            [uID, curDate, cTime]
        );
        console.log('in tab ' + uID + ' - ' + curDate + ' - ' + cTime);
    })
  } catch (error) {
    console.log(error);
  }
  }

  export default tableTextCopy;
