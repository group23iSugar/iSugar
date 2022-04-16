/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable no-undef */
/* eslint-disable eqeqeq */
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

var uID = 222;
var curDate = moment().format('YYYY-MM-DD');
var cTime = new Date();
var currentBG = '';
var ketones = '';
var level = '';
var flag = '';
var Meal = '';

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

const tableukgCopy = function(BG, ketonesSource, ketonesLevel, meal, flags){
   currentBG = BG;
   ketones = ketonesSource;
   level = ketonesLevel;
   Meal = meal;
   flag = flags;
   var recommendation = '';
   var caseNO = '';

console.log('flag now is-: ' + flag);
console.log('Meal now is-: ' + Meal);
    if (currentBG < 70 && currentBG > 0){
        if (ketones == 'blood' && level < 0.6){
            recommendation = '• Re-check your blood glucose in 30 minutes' + '\n' + '• If your unwell or have persistent vomiting, go to ER';
        }
        else if (ketones == 'blood' && level == 'Negative'){
            recommendation = '• Re-check your blood glucose in 30 minutes' + '\n' + '• If your unwell or have persistent vomiting, go to ER';
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
        if (Meal != 'No'){
       recommendation = '• Encourage sugar-containing fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 2 hours or sooner if you have hypoglycemia symptoms' + '\n' + '• If you have vomiting & it is persistent, go to ER';
        } else {
        recommendation = '• Encourage sugar-containing fluids intake (At least 100ml every hour)' + '\n' + '• Take a carbohydrate containing snack' + '\n' + '• Re-check your blood glucose & Ketone level in 2 hours or sooner if you have hypoglycemia symptoms' + '\n' + '• If you have vomiting & it is persistent, go to ER';
        }
        if (flag != 'true'){
        handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 120);//120
        }
        break;

    case level >= 0.6 && level <= 0.9:
        console.log('B');
        if (Meal != 'No'){
            recommendation = '• Encourage sugar-containing fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 2 hours or sooner if you have hypoglycemia symptoms' + '\n' + '• If you have vomiting & it is persistent, go to ER';
        } else {
                recommendation = '• Encourage sugar-containing fluids intake (At least 100ml every hour)' + '\n' + '• Take a carbohydrate containing snack' + '\n' + '• Re-check your blood glucose & Ketone level in 2 hours or sooner if you have hypoglycemia symptoms' + '\n' + '• If you have vomiting & it is persistent, go to ER';
            }
        if (flag != 'true'){
        handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 120);//120
        }
        // there is a clalculation for insulin A
        break;

    case level >= 1 && level <= 1.4:
        console.log('C');
        if (Meal != 'No'){
            recommendation = '• Encourage sugar-containing fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 2 hours or sooner if you have hypoglycemia symptoms' + '\n' + '• If you have vomiting & it is persistent, go to ER';
        } else {
            recommendation = '• Encourage sugar-containing fluids intake (At least 100ml every hour)' + '\n' + '• Take a carbohydrate containing snack' + '\n' + '• Re-check your blood glucose & Ketone level in 2 hours or sooner if you have hypoglycemia symptoms' + '\n' + '• If you have vomiting & it is persistent, go to ER';
        }
        if (flag != 'true'){
        handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 120);//120
        }
        // there is a clalculation for insulin A
        break;

    case level >= 1.5 && level <= 2.9:
        console.log('D');
        if (Meal != 'No'){
            recommendation = '• Encourage sugar-containing fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 2 hours or sooner if you have hypoglycemia symptoms' + '\n' + '• High risk for Diabetes Ketoacidosis (DKA), close monitoring required' + '\n' + '• If you have vomiting & it is persistent, go to ER';
        } else {
            recommendation = '• Encourage sugar-containing fluids intake (At least 100ml every hour)' + '\n' + '• Take a carbohydrate containing snack' + '\n' + '• Re-check your blood glucose & Ketone level in 2 hours or sooner if you have hypoglycemia symptoms' + '\n' + '• High risk for Diabetes Ketoacidosis (DKA), close monitoring required' + '\n' + '• If you have vomiting & it is persistent, go to ER';
        }
        if (flag != 'true'){
        handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 120);//120
        }
        // there is a clalculation for insulin A
        break;

    case level >= 3:
        console.log('E');
        if (Meal != 'No'){
            recommendation = '• High risk for Diabetes Ketoacidosis (DKA), go to ER' + '\n' + '• Encourage sugar-containing fluids intake (At least 100ml every hour)';
        } else {
            recommendation = '• High risk for Diabetes Ketoacidosis (DKA), go to ER' + '\n' + '• Encourage sugar-containing fluids intake (At least 100ml every hour)' + '\n' + '• Take a carbohydrate containing snack';
        }
        break;
}//Case 2 between 70-90
    }
    if (caseNO == '3'){
switch (caseNO == '3'){
    case level == 'Negative':
        console.log('A2');
        if (Meal != 'No'){
            recommendation = '• Encourage sugar-containing fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 2 hours or sooner if you have hypoglycemia symptoms' + '\n' + '• If you have vomiting & it is persistent, go to ER';
        } else {
            recommendation = '• Encourage sugar-containing fluids intake (At least 100ml every hour)' + '\n' + '• Take a carbohydrate containing snack' + '\n' + '• Re-check your blood glucose & Ketone level in 2 hours or sooner if you have hypoglycemia symptoms' + '\n' + '• If you have vomiting & it is persistent, go to ER';
        }
        if (flag != 'true'){
        handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 120);//120
        }
        break;
    case level == 'Trace':
        console.log('B2');
        if (Meal != 'No'){
            recommendation = '• Encourage sugar-containing fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 2 hours or sooner if you have hypoglycemia symptoms' + '\n' + '• If you have vomiting & it is persistent, go to ER';
        } else {
            recommendation = '• Encourage sugar-containing fluids intake (At least 100ml every hour)' + '\n' + '• Take a carbohydrate containing snack' + '\n' + '• Re-check your blood glucose & Ketone level in 2 hours or sooner if you have hypoglycemia symptoms' + '\n' + '• If you have vomiting & it is persistent, go to ER';
        }
        if (flag != 'true'){
        handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 120);//120
        }
        // there is a clalculation for insulin A
        break;
    case level == 'Small':
        console.log('C2');
        if (Meal != 'No'){
            recommendation = '• Encourage sugar-containing fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 2 hours or sooner if you have hypoglycemia symptoms' + '\n' + '• If you have vomiting & it is persistent, go to ER';
        } else {
            recommendation = '• Encourage sugar-containing fluids intake (At least 100ml every hour)' + '\n' + '• Take a carbohydrate containing snack' + '\n' + '• Re-check your blood glucose & Ketone level in 2 hours or sooner if you have hypoglycemia symptoms' + '\n' + '• If you have vomiting & it is persistent, go to ER';
        }
        if (flag != 'true'){
        handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 120);//120
        }
        // there is a clalculation for insulin A
        break;
    case level == 'Moderate':
        console.log('D2');
        if (Meal != 'No'){
            recommendation = '• Encourage sugar-containing fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 2 hours or sooner if you have hypoglycemia symptoms' + '\n' + '• High risk for Diabetes Ketoacidosis (DKA), close monitoring required' + '\n' + '• If you have vomiting & it is persistent, go to ER';
        } else {
            recommendation = '• Encourage sugar-containing fluids intake (At least 100ml every hour)' + '\n' + '• Take a carbohydrate containing snack' + '\n' + '• Re-check your blood glucose & Ketone level in 2 hours or sooner if you have hypoglycemia symptoms' + '\n' + '• High risk for Diabetes Ketoacidosis (DKA), close monitoring required' + '\n' + '• If you have vomiting & it is persistent, go to ER';
        }
        if (flag != 'true'){
        handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 120);//120
        }
        // there is a clalculation for insulin A
        break;
    case level == 'Large':
        console.log('E2');
        if (Meal != 'No'){
            recommendation = '• High risk for Diabetes Ketoacidosis (DKA), go to ER' + '\n' + '• Encourage sugar-containing fluids intake (At least 100ml every hour)';
        } else {
            recommendation = '• High risk for Diabetes Ketoacidosis (DKA), go to ER' + '\n' + '• Encourage sugar-containing fluids intake (At least 100ml every hour)' + '\n' + '• Take a carbohydrate containing snack';
        }
        break;
}//Case 2 between 70-90
    }

    if (caseNO == '4'){
    switch (caseNO == '4'){
        case level < 0.6:
            console.log('F');
            if (Meal != 'No'){
                recommendation = '• Encourage fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 3 hours or sooner if you have hypoglycemia symptoms';
            } else {
                recommendation = '• Encourage fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 3 hours or sooner if you have hypoglycemia symptoms';
            }
            if (flag != 'true'){
            handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 180);//180
            }
            break;
        case level >= 0.6 && level <= 0.9:
            console.log('G');
            if (Meal != 'No'){
                recommendation = '• Encourage sugar-containing fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 3 hours or sooner if you have hypoglycemia symptoms' + '\n' + '• If you have vomiting & it is persistent, go to ER';
            } else {
                recommendation = '• Encourage sugar-containing fluids intake (At least 100ml every hour)' + '\n' + '• Take a carbohydrate containing snack' + '\n' + '• Re-check your blood glucose & Ketone level in 3 hours or sooner if you have hypoglycemia symptoms' + '\n' + '• If you have vomiting & it is persistent, go to ER';
            }
            if (flag != 'true'){
            handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 180);//180
            }
            // there is a clalculation for insulin A
            break;
        case level >= 1 && level <= 1.4:
            console.log('H');
            if (Meal != 'No'){
                recommendation = '• Encourage sugar-containing fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 3 hours or sooner if you have hypoglycemia symptoms' + '\n' + '• If you have vomiting & it is persistent, go to ER';
            } else {
                recommendation = '• Encourage sugar-containing fluids intake (At least 100ml every hour)' + '\n' + '• Take a carbohydrate containing snack' + '\n' + '• Re-check your blood glucose & Ketone level in 3 hours or sooner if you have hypoglycemia symptoms' + '\n' + '• If you have vomiting & it is persistent, go to ER';
            }
            if (flag != 'true'){
            handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 180);//180
            }
            // there is a clalculation for insulin A
            break;
        case level >= 1.5 && level <= 2.9:
            console.log('I');
            if (Meal != 'No'){
                recommendation = '• Encourage sugar-containing fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 2 hours or sooner if you have hypoglycemia symptoms' + '\n' + '• High risk for Diabetes Ketoacidosis (DKA), close monitoring required' + '\n' + '• If you have vomiting & it is persistent, go to ER';
            } else {
                recommendation = '• Encourage sugar-containing fluids intake (At least 100ml every hour)' + '\n' + '• Take a carbohydrate containing snack' + '\n' + '• Re-check your blood glucose & Ketone level in 2 hours or sooner if you have hypoglycemia symptoms' + '\n' + '• High risk for Diabetes Ketoacidosis (DKA), close monitoring required' + '\n' + '• If you have vomiting & it is persistent, go to ER';
            }
            if (flag != 'true'){
            handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 120);//120
            }
            // there is a clalculation for insulin A
            break;
        case level >= 3:
            console.log('J');
            if (Meal != 'No'){
                recommendation = '• High risk for Diabetes Ketoacidosis (DKA), go to ER' + '\n' + '• Encourage sugar-containing fluids intake (At least 100ml every hour)';
            } else {
                recommendation = '• High risk for Diabetes Ketoacidosis (DKA), go to ER' + '\n' + '• Encourage sugar-containing fluids intake (At least 100ml every hour)' + '\n' + '• Take a carbohydrate containing snack';
            }
            break;
    }//Case 4 between 90-180
    }
    if (caseNO == '5'){
    switch (caseNO == '5'){
        case level == 'Negative':
            console.log('F2');
            if (Meal != 'No'){
                recommendation = '• Encourage fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 3 hours or sooner if you have hypoglycemia symptoms';
            } else {
                recommendation = '• Encourage fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 3 hours or sooner if you have hypoglycemia symptoms';
            }
            if (flag != 'true'){
            handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 180);//180
            }
            break;
        case level == 'Trace':
            console.log('G2');
            if (Meal != 'No'){
                recommendation = '• Encourage sugar-containing fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 3 hours or sooner if you have hypoglycemia symptoms' + '\n' + '• If you have vomiting & it is persistent, go to ER';
            } else {
                recommendation = '• Encourage sugar-containing fluids intake (At least 100ml every hour)' + '\n' + '• Take a carbohydrate containing snack' + '\n' + '• Re-check your blood glucose & Ketone level in 3 hours or sooner if you have hypoglycemia symptoms' + '\n' + '• If you have vomiting & it is persistent, go to ER';
            }
            if (flag != 'true'){
            handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 180);//180
            }
            // there is a clalculation for insulin A
            break;
        case level == 'Small':
            console.log('H2');
            if (Meal != 'No'){
                recommendation = '• Encourage sugar-containing fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 3 hours or sooner if you have hypoglycemia symptoms' + '\n' + '• If you have vomiting & it is persistent, go to ER';
            } else {
                recommendation = '• Encourage sugar-containing fluids intake (At least 100ml every hour)' + '\n' + '• Take a carbohydrate containing snack' + '\n' + '• Re-check your blood glucose & Ketone level in 3 hours or sooner if you have hypoglycemia symptoms' + '\n' + '• If you have vomiting & it is persistent, go to ER';
            }
            if (flag != 'true'){
            handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 180);//180
            }
            // there is a clalculation for insulin A
            break;
        case level == 'Moderate':
            console.log('I2');
            if (Meal != 'No'){
                recommendation = '• Encourage sugar-containing fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 2 hours or sooner if you have hypoglycemia symptoms' + '\n' + '• High risk for Diabetes Ketoacidosis (DKA), close monitoring required' + '\n' + '• If you have vomiting & it is persistent, go to ER';
            } else {
                recommendation = '• Encourage sugar-containing fluids intake (At least 100ml every hour)' + '\n' + '• Take a carbohydrate containing snack' + '\n' + '• Re-check your blood glucose & Ketone level in 2 hours or sooner if you have hypoglycemia symptoms' + '\n' + '• High risk for Diabetes Ketoacidosis (DKA), close monitoring required' + '\n' + '• If you have vomiting & it is persistent, go to ER';
            }
            if (flag != 'true'){
            handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 120);//120
            }
            // there is a clalculation for insulin A
            break;
        case level == 'Large':
            console.log('J2');
            if (Meal != 'No'){
                recommendation = '• High risk for Diabetes Ketoacidosis (DKA), go to ER' + '\n' + '• Encourage sugar-containing fluids intake (At least 100ml every hour)';
            } else {
                recommendation = '• High risk for Diabetes Ketoacidosis (DKA), go to ER' + '\n' + '• Encourage sugar-containing fluids intake (At least 100ml every hour)' + '\n' + '• Take a carbohydrate containing snack';
            }
            break;
    }//Case 5 between 90-180
    }

    if (caseNO == '6'){
        switch (caseNO == '6'){
            case level < 0.6:
                console.log('K');
                if (Meal != 'No'){
                    recommendation = '• Encourage fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 4 hours' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                } else {
                    recommendation = '• Encourage fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 4 hours' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                }
                if (flag != 'true'){
                handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 240);//240
                }
                break;
            case level >= 0.6 && level <= 0.9:
                console.log('L');
                if (Meal != 'No'){
                    recommendation = '• Encourage sugar - containing fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 4 hours' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                } else {
                    recommendation = '• Encourage sugar - containing fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 4 hours' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                }
                if (flag != 'true'){
                handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 240);//240
                }
                break;
            case level >= 1 && level <= 1.4:
                console.log('M');
                if (Meal != 'No'){
                    recommendation = '• Encourage sugar - containing fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 4 hours & If you have vomiting' + '\n' + '• it is persistent, go to ER';
                } else {
                    recommendation = '• Encourage sugar - containing fluids intake (At least 100ml every hour)' + '\n' + '• Take a carbohydrate containing snack' + '\n' + '• Re-check your blood glucose & Ketone level in 4 hours & If you have vomiting' + '\n' + '• it is persistent, go to ER';
                }
                if (flag != 'true'){
                handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 240);//240
                }
                break;
            case level >= 1.5 && level <= 2.9:
                console.log('N');
                if (Meal != 'No'){
                    recommendation = '• Encourage sugar - containing fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 4 hours' + '\n' + '• High risk for Diabetes Ketoacidosis (DKA), close monitoring required' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                } else {
                    recommendation = '• Encourage sugar - containing fluids intake (At least 100ml every hour)' + '\n' + '• Take a carbohydrate containing snack' + '\n' + '• Re-check your blood glucose & Ketone level in 4 hours' + '\n' + '• High risk for Diabetes Ketoacidosis (DKA), close monitoring required' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                }
                if (flag != 'true'){
                handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 240);//240
                }
                break;
            case level >= 3:
                console.log('P');
                if (Meal != 'No'){
                    recommendation = '• High risk for Diabetes Ketoacidosis (DKA), go to ER' + '\n' + '• Encourage sugar - containing fluids intake (At least 100ml every hour)';
                } else {
                    recommendation = '• High risk for Diabetes Ketoacidosis (DKA), go to ER' + '\n' + '• Encourage sugar - containing fluids intake (At least 100ml every hour)' + '\n' + '• Take a carbohydrate containing snack';
                }
                break;
        }//Case 6 between 180-250
    }
    if (caseNO == '7'){
        switch (caseNO == '7'){
            case level == 'Negative':
                console.log('K2');
                if (Meal != 'No'){
                    recommendation = '• Encourage fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 4 hours' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                } else {
                    recommendation = '• Encourage fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 4 hours' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                }
                if (flag != 'true'){
                handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 240);//240
                }
                break;
            case level == 'Trace':
                console.log('L2');
                if (Meal != 'No'){
                    recommendation = '• Encourage sugar - containing fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 4 hours' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                } else {
                    recommendation = '• Encourage sugar - containing fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 4 hours' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                }
                if (flag != 'true'){
                handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 240);//240
                }
                break;
            case level == 'Small':
                console.log('M2');
                if (Meal != 'No'){
                    recommendation = '• Encourage sugar - containing fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 4 hours' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                } else {
                    recommendation = '• Encourage sugar - containing fluids intake (At least 100ml every hour)' + '\n' + '• Take a carbohydrate containing snack' + '\n' + '• Re-check your blood glucose & Ketone level in 4 hours' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                }
                if (flag != 'true'){
                handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 240);//240
                }
                break;
            case level == 'Moderate':
                console.log('N2');
                if (Meal != 'No'){
                    recommendation = '• Encourage sugar - containing fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 4 hours' + '\n' + '• High risk for Diabetes Ketoacidosis (DKA), close monitoring required' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                } else {
                    recommendation = '• Encourage sugar - containing fluids intake (At least 100ml every hour)' + '\n' + '• Take a carbohydrate containing snack' + '\n' + '• Re-check your blood glucose & Ketone level in 4 hours' + '\n' + '• High risk for Diabetes Ketoacidosis (DKA), close monitoring required' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                }
                if (flag != 'true'){
                handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 240);//240
                }
                break;
            case level == 'Large':
                console.log('P2');
                if (Meal != 'No'){
                    recommendation = '• High risk for Diabetes Ketoacidosis (DKA), go to ER' + '\n' + '• Encourage sugar - containing fluids intake (At least 100ml every hour)';
                } else {
                    recommendation = '• High risk for Diabetes Ketoacidosis (DKA), go to ER' + '\n' + '• Encourage sugar - containing fluids intake (At least 100ml every hour)' + '\n' + '• Take a carbohydrate containing snack';
                }
                break;
        }//Case 7 between 180-250
    }

    if (caseNO == '8'){
            switch (caseNO == '8'){
                case level < 0.6:
                    console.log('O');
                    if (Meal != 'No'){
                        recommendation = '• Encourage fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 4 hours' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                    } else {
                        recommendation = '• Encourage fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 4 hours' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                    }
                    if (flag != 'true'){
                    handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 240);//240
                    }
                    break;
                case level >= 0.6 && level <= 0.9:
                    console.log('Q');
                    if (Meal != 'No'){
                        recommendation = '• Encourage fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 4 hours' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                    } else {
                        recommendation = '• Encourage fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 4 hours' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                    }
                    if (flag != 'true'){
                    handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 240);//240
                    }
                    break;
                case level >= 1 && level <= 1.4:
                    console.log('R');
                    if (Meal != 'No'){
                        recommendation = '• Encourage sugar-free fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 2 hours' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                    } else {
                        recommendation = '• Encourage sugar-free fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 2 hours' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                    }
                    if (flag != 'true'){
                    handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 120);//120
                    }
                    break;
                case level >= 1.5 && level <= 2.9:
                    console.log('S');
                    if (Meal != 'No'){
                        recommendation = '• Encourage sugar-free fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 2 hours' + '\n' + '• High risk for Diabetes Ketoacidosis (DKA), close monitoring required' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                    } else {
                        recommendation = '• Encourage sugar-free fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 2 hours' + '\n' + '• High risk for Diabetes Ketoacidosis (DKA), close monitoring required' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                    }
                    if (flag != 'true'){
                    handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 120);//120
                    }
                    break;
                case level >= 3:
                    console.log('T');
                    if (Meal != 'No'){
                        recommendation = '• High risk for Diabetes Ketoacidosis (DKA), go to ER' + '\n' + '• Encourage sugar-free fluids intake (At least 100ml every hour)';
                    } else {
                        recommendation = '• High risk for Diabetes Ketoacidosis (DKA), go to ER' + '\n' + '• Encourage sugar-free fluids intake (At least 100ml every hour)';
                    }
                    break;
            }//Case 8 between 250-400
    }
    if (caseNO == '9'){
            switch (caseNO == '9'){
                case level == 'Negative':
                    console.log('O2');
                    if (Meal != 'No'){
                        recommendation = '• Encourage fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 4 hours' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                    } else {
                        recommendation = '• Encourage fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 4 hours' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                    }
                    if (flag != 'true'){
                    handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 240);//240
                    }
                    break;
                case level == 'Trace':
                    console.log('Q2');
                    if (Meal != 'No'){
                        recommendation = '• Encourage fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 4 hours' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                    } else {
                        recommendation = '• Encourage fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 4 hours' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                    }
                    if (flag != 'true'){
                    handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 240);//240
                    }
                    break;
                case level == 'Small':
                    console.log('R2');
                    if (Meal != 'No'){
                        recommendation = '• Encourage sugar-free fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 2 hours' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                    } else {
                        recommendation = '• Encourage sugar-free fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 2 hours' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                    }
                    if (flag != 'true'){
                    handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 120);//120
                    }
                    break;
                case level == 'Moderate':
                    console.log('S2');
                    if (Meal != 'No'){
                        recommendation = '• Encourage sugar-free fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 2 hours' + '\n' + '• High risk for Diabetes Ketoacidosis (DKA), close monitoring required' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                    } else {
                        recommendation = '• Encourage sugar-free fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 2 hours' + '\n' + '• High risk for Diabetes Ketoacidosis (DKA), close monitoring required' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                    }
                    if (flag != 'true'){
                    handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 120);//120
                    }
                    break;
                case level == 'Large':
                    console.log('T2');
                    if (Meal != 'No'){
                        recommendation = '• High risk for Diabetes Ketoacidosis (DKA), go to ER' + '\n' + '• Encourage sugar-free fluids intake (At least 100ml every hour)';
                    } else {
                        recommendation = '• High risk for Diabetes Ketoacidosis (DKA), go to ER' + '\n' + '• Encourage sugar-free fluids intake (At least 100ml every hour)';
                    }
                    break;
            }//Case 9 between 250-400
    }

    if (caseNO == '10'){
                switch (caseNO == '10'){
                    case level < 0.6:
                        console.log('U');
                        if (Meal != 'No'){
                            recommendation = '• Encourage sugar-free fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 4 hours' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                        } else {
                            recommendation = '• Encourage sugar-free fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 4 hours' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                        }
                        if (flag != 'true'){
                        handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 240);//240
                        }
                        break;
                    case level >= 0.6 && level <= 0.9:
                        console.log('V');
                        if (Meal != 'No'){
                            recommendation = '• Encourage sugar-free fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 3 hours' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                        } else {
                            recommendation = '• Encourage sugar-free fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 3 hours' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                        }
                        if (flag != 'true'){
                        handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 180);//180
                        }
                        break;
                    case level >= 1 && level <= 1.4:
                        console.log('W');
                        if (Meal != 'No'){
                            recommendation = '• Encourage sugar-free fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 2 hours' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                        } else {
                            recommendation = '• Encourage sugar-free fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 2 hours' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                        }
                        if (flag != 'true'){
                        handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 120);//120
                        }
                        break;
                    case level >= 1.5 && level <= 2.9:
                        console.log('X');
                        if (Meal != 'No'){
                            recommendation = '• Encourage sugar-free fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 2 hours' + '\n' + '• High risk for Diabetes Ketoacidosis (DKA), close monitoring required' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                        } else {
                            recommendation = '• Encourage sugar-free fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 2 hours' + '\n' + '• High risk for Diabetes Ketoacidosis (DKA), close monitoring required' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                        }
                        if (flag != 'true'){
                        handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 120);//120
                        }
                        break;
                    case level >= 3:
                        console.log('W');
                        if (Meal != 'No'){
                            recommendation = '• High risk for Diabetes Ketoacidosis (DKA), go to ER' + '\n' + '• Encourage sugar-free fluids intake (At least 100ml every hour)';
                        } else {
                            recommendation = '• High risk for Diabetes Ketoacidosis (DKA), go to ER' + '\n' + '• Encourage sugar-free fluids intake (At least 100ml every hour)';
                        }
                        break;
                }//Case 10 between 400
    }
    if (caseNO == '11'){
                switch (caseNO == '11'){
                    case level == 'Negative':
                        console.log('U2');
                        if (Meal != 'No'){
                            recommendation = '• Encourage sugar-free fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 4 hours' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                        } else {
                            recommendation = '• Encourage sugar-free fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 4 hours' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                        }
                        if (flag != 'true'){
                        handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 240);//240
                        }
                        break;
                    case level == 'Trace':
                        console.log('V2');
                        if (Meal != 'No'){
                            recommendation = '• Encourage sugar-free fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 3 hours' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                        } else {
                            recommendation = '• Encourage sugar-free fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 3 hours' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                        }
                        if (flag != 'true'){
                        handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 180);//180
                        }
                        break;
                    case level == 'Small':
                        console.log('W2');
                        if (Meal != 'No'){
                            recommendation = '• Encourage sugar-free fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 2 hours' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                        } else {
                            recommendation = '• Encourage sugar-free fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 2 hours' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                        }
                        if (flag != 'true'){
                        handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 120);//120
                        }
                        break;
                    case level == 'Moderate':
                        console.log('X2');
                        if (Meal != 'No'){
                            recommendation = '• Encourage sugar-free fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 2 hours' + '\n' + '• High risk for Diabetes Ketoacidosis (DKA), close monitoring required' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                        } else {
                            recommendation = '• Encourage sugar-free fluids intake (At least 100ml every hour)' + '\n' + '• Re-check your blood glucose & Ketone level in 2 hours' + '\n' + '• High risk for Diabetes Ketoacidosis (DKA), close monitoring required' + '\n' + '• If you have vomiting & it is persistent, go to ER';
                        }
                        if (flag != 'true'){
                        handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 120);//120
                        }
                        break;
                    case level == 'Large':
                        console.log('Y2');
                        if (Meal != 'No'){
                            recommendation = '• High risk for Diabetes Ketoacidosis (DKA), go to ER' + '\n' + '• Encourage sugar-free fluids intake (At least 100ml every hour)';
                        } else {
                            recommendation = '• High risk for Diabetes Ketoacidosis (DKA), go to ER' + '\n' + '• Encourage sugar-free fluids intake (At least 100ml every hour)';
                        }
                        break;
                }//Case 11 between 400
    }

    insert();
    return recommendation;
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

export default tableukgCopy;
