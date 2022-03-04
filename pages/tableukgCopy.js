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

const tableukgCopy = function(BG, ketonesSource, ketonesLevel){
   currentBG = BG;
   ketones = ketonesSource;
   level = ketonesLevel;
   var recommendation = '';
   var caseNO = '';

   if (currentBG < 70 && currentBG > 0){
       recommendation = 'Re-check your blood glucose in 30 minutes & If your unwell or have persistent vomiting, go to ER';
       handleScheduleNotification('iSugar','Time to Re-check your blood glucose level.', 1);//30
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
        recommendation = 'Encourage sugar-containing fluids intake (At least 100ml every hour) & Take a carbohydrate containing snack & Re-check your blood glucose & Ketone level in 2 hours or sooner if you have hypoglycemia symptoms & If you have vomiting & it is persistent, go to ER';
        handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 2);//120
        break;

    case level >= 0.6 && level <= 0.9:
        console.log('B');
        recommendation = 'Encourage sugar-containing fluids intake (At least 100ml every hour) & Take a carbohydrate containing snack & Re-check your blood glucose & Ketone level in 2 hours & or sooner if you have hypoglycemia symptoms & If you have vomiting & it is persistent, go to ER';
        handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 2);//120
        // there is a clalculation for insulin A
        break;

    case level >= 1 && level <= 1.4:
        console.log('C');
        recommendation = 'Encourage sugar-containing fluids intake (At least 100ml every hour) & Take a carbohydrate containing snack & Re-check your blood glucose & Ketone level in 2 hours & or sooner if you have hypoglycemia symptoms & If you have vomiting & it is persistent, go to ER';
        handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 2);//120
        // there is a clalculation for insulin A
        break;

    case level >= 1.5 && level <= 2.9:
        console.log('D');
        recommendation = 'Encourage sugar-containing fluids intake (At least 100ml every hour) & Take a carbohydrate containing snack & Re-check your blood glucose & Ketone level in 2 hours & or sooner if you have hypoglycemia symptoms & High risk for Diabetes Ketoacidosis (DKA), close monitoring required & If you have vomiting & it is persistent, go to ER';
        handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 2);//120
        // there is a clalculation for insulin A
        break;

    case level >= 3:
        console.log('E');
        recommendation = 'High risk for Diabetes Ketoacidosis (DKA), go to ER & Encourage sugar-containing fluids intake (At least 100ml every hour) & Take a carbohydrate containing snack';
        break;
}//Case 2 between 70-90
    }

if (caseNO == '3'){
switch (caseNO == '3'){
    case level == 'Negative':
        console.log('A2');
        recommendation = 'Encourage sugar-containing fluids intake (At least 100ml every hour) & Take a carbohydrate containing snack & Re-check your blood glucose & Ketone level in 2 hours or sooner if you have hypoglycemia symptoms & If you have vomiting & it is persistent, go to ER';
        handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 2);//120
        break;
    case level == 'Trace':
        console.log('B2');
        recommendation = 'Encourage sugar-containing fluids intake (At least 100ml every hour) & Take a carbohydrate containing snack & Re-check your blood glucose & Ketone level in 2 hours & or sooner if you have hypoglycemia symptoms & If you have vomiting & it is persistent, go to ER';
        handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 2);//120
        // there is a clalculation for insulin A
        break;
    case level == 'Small':
        console.log('C2');
        recommendation = 'Encourage sugar-containing fluids intake (At least 100ml every hour) & Take a carbohydrate containing snack & Re-check your blood glucose & Ketone level in 2 hours & or sooner if you have hypoglycemia symptoms & If you have vomiting & it is persistent, go to ER';
        handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 2);//120
        // there is a clalculation for insulin A
        break;
    case level == 'Moderate':
        console.log('D2');
        recommendation = 'Encourage sugar-containing fluids intake (At least 100ml every hour) & Take a carbohydrate containing snack & Re-check your blood glucose & Ketone level in 2 hours & or sooner if you have hypoglycemia symptoms & High risk for Diabetes Ketoacidosis (DKA), close monitoring required & If you have vomiting & it is persistent, go to ER';
        handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 2);//120
        // there is a clalculation for insulin A
        break;
    case level == 'Large':
        console.log('E2');
        recommendation = 'High risk for Diabetes Ketoacidosis (DKA), go to ER & Encourage sugar-containing fluids intake (At least 100ml every hour) & Take a carbohydrate containing snack';
        break;
}//Case 2 between 70-90
}

if (caseNO == '4'){
    switch (caseNO == '4'){
        case level < 0.6:
            console.log('F');
            recommendation = 'Encourage fluids intake (At least 100ml every hour) & Re-check your blood glucose & Ketone level in 3 hours or sooner if you have hypoglycemia symptoms';
            handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 3);//180
            break;
        case level >= 0.6 && level <= 0.9:
            console.log('G');
            recommendation = 'Encourage sugar-containing fluids intake (At least 100ml every hour) & Take a carbohydrate containing snack & Re-check your blood glucose & Ketone level in 3 hours or sooner if you have hypoglycemia symptoms & If you have vomiting & it is persistent, go to ER';
            handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 3);//180
            // there is a clalculation for insulin A
            break;
        case level >= 1 && level <= 1.4:
            console.log('H');
            recommendation = 'Encourage sugar-containing fluids intake (At least 100ml every hour) & Take a carbohydrate containing snack & Re-check your blood glucose & Ketone level in 3 hours or sooner if you have hypoglycemia symptoms & If you have vomiting & it is persistent, go to ER';
            handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 3);//180
            // there is a clalculation for insulin A
            break;
        case level >= 1.5 && level <= 2.9:
            console.log('I');
            recommendation = 'Encourage sugar-containing fluids intake (At least 100ml every hour) & Take a carbohydrate containing snack & Re-check your blood glucose & Ketone level in 2 hours or sooner if you have hypoglycemia symptoms & High risk for Diabetes Ketoacidosis (DKA), close monitoring required & If you have vomiting & it is persistent, go to ER';
            handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 2);//120
            // there is a clalculation for insulin A
            break;
        case level >= 3:
            console.log('J');
            recommendation = 'High risk for Diabetes Ketoacidosis (DKA), go to ER & Encourage sugar-containing fluids intake (At least 100ml every hour) & Take a carbohydrate containing snack';
            break;
    }//Case 4 between 90-180
        }

    if (caseNO == '5'){
    switch (caseNO == '5'){
        case level == 'Negative':
            console.log('F2');
            recommendation = 'Encourage fluids intake (At least 100ml every hour) & Re-check your blood glucose & Ketone level in 3 hours or sooner if you have hypoglycemia symptoms';
            handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 3);//180
            break;
        case level == 'Trace':
            console.log('G2');
            recommendation = 'Encourage sugar-containing fluids intake (At least 100ml every hour) & Take a carbohydrate containing snack & Re-check your blood glucose & Ketone level in 3 hours or sooner if you have hypoglycemia symptoms & If you have vomiting & it is persistent, go to ER';
            handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 3);//180
            // there is a clalculation for insulin A
            break;
        case level == 'Small':
            console.log('H2');
            recommendation = 'Encourage sugar-containing fluids intake (At least 100ml every hour) & Take a carbohydrate containing snack & Re-check your blood glucose & Ketone level in 3 hours or sooner if you have hypoglycemia symptoms & If you have vomiting & it is persistent, go to ER';
            handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 3);//180
            // there is a clalculation for insulin A
            break;
        case level == 'Moderate':
            console.log('I2');
            recommendation = 'Encourage sugar-containing fluids intake (At least 100ml every hour) & Take a carbohydrate containing snack & Re-check your blood glucose & Ketone level in 2 hours or sooner if you have hypoglycemia symptoms & High risk for Diabetes Ketoacidosis (DKA), close monitoring required & If you have vomiting & it is persistent, go to ER';
            handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 2);//120
            // there is a clalculation for insulin A
            break;
        case level == 'Large':
            console.log('J2');
            recommendation = 'High risk for Diabetes Ketoacidosis (DKA), go to ER & Encourage sugar-containing fluids intake (At least 100ml every hour) & Take a carbohydrate containing snack';
            break;
    }//Case 5 between 90-180
    }

    if (caseNO == '6'){
        switch (caseNO == '6'){
            case level < 0.6:
                console.log('K');
                recommendation = 'Encourage fluids intake (At least 100ml every hour) & Re-check your blood glucose & Ketone level in 4 hours If you have vomiting & it is persistent, go to ER';
                handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 4);//240
                break;
            case level >= 0.6 && level <= 0.9:
                console.log('L');
                recommendation = 'Encourage sugar - containing fluids intake (At least 100ml every hour) & Re-check your blood glucose & Ketone level in 4 hours &If you have vomiting & it is persistent, go to ER';
                handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 4);//240
                break;
            case level >= 1 && level <= 1.4:
                console.log('M');
                recommendation = 'Encourage sugar - containing fluids intake (At least 100ml every hour) & Take a carbohydrate containing snack & Re-check your blood glucose & Ketone level in 4 hours & If you have vomiting & it is persistent, go to ER';
                handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 4);//240
                break;
            case level >= 1.5 && level <= 2.9:
                console.log('N');
                recommendation = 'Encourage sugar - containing fluids intake (At least 100ml every hour) & Take a carbohydrate containing snack & Re-check your blood glucose & Ketone level in 4 hours & High risk for Diabetes Ketoacidosis (DKA), close monitoring required & If you have vomiting & it is persistent, go to ER';
                handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 4);//240
                break;
            case level >= 3:
                console.log('P');
                recommendation = 'High risk for Diabetes Ketoacidosis (DKA), go to ER & Encourage sugar - containing fluids intake (At least 100ml every hour) & Take a carbohydrate containing snack';
                break;
        }//Case 6 between 180-250
            }

        if (caseNO == '7'){
        switch (caseNO == '7'){
            case level == 'Negative':
                console.log('K2');
                recommendation = 'Encourage fluids intake (At least 100ml every hour) & Re-check your blood glucose & Ketone level in 4 hours If you have vomiting & it is persistent, go to ER';
                handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 4);//240
                break;
            case level == 'Trace':
                console.log('L2');
                recommendation = 'Encourage sugar - containing fluids intake (At least 100ml every hour) & Re-check your blood glucose & Ketone level in 4 hours &If you have vomiting & it is persistent, go to ER';
                handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 4);//240
                break;
            case level == 'Small':
                console.log('M2');
                recommendation = 'Encourage sugar - containing fluids intake (At least 100ml every hour) & Take a carbohydrate containing snack & Re-check your blood glucose & Ketone level in 4 hours & If you have vomiting & it is persistent, go to ER';
                handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 4);//240
                break;
            case level == 'Moderate':
                console.log('N2');
                recommendation = 'Encourage sugar - containing fluids intake (At least 100ml every hour) & Take a carbohydrate containing snack & Re-check your blood glucose & Ketone level in 4 hours & High risk for Diabetes Ketoacidosis (DKA), close monitoring required & If you have vomiting & it is persistent, go to ER';
                handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 4);//240
                break;
            case level == 'Large':
                console.log('P2');
                recommendation = 'High risk for Diabetes Ketoacidosis (DKA), go to ER & Encourage sugar - containing fluids intake (At least 100ml every hour) & Take a carbohydrate containing snack';
                break;
        }//Case 7 between 180-250
        }

        if (caseNO == '8'){
            switch (caseNO == '8'){
                case level < 0.6:
                    console.log('O');
                    recommendation = 'Encourage fluids intake (At least 100ml every hour) & Re-check your blood glucose & Ketone level in 4 hours If you have vomiting & it is persistent, go to ER';
                    handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 4);//240
                    break;
                case level >= 0.6 && level <= 0.9:
                    console.log('Q');
                    recommendation = 'Encourage fluids intake (At least 100ml every hour) & Re-check your blood glucose & Ketone level in 4 hours & If you have vomiting & it is persistent, go to ER';
                    handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 4);//240
                    break;
                case level >= 1 && level <= 1.4:
                    console.log('R');
                    recommendation = 'Encourage sugar-free fluids intake (At least 100ml every hour) & Re-check your blood glucose & Ketone level in 2 hours & If you have vomiting & it is persistent, go to ER';
                    handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 2);//120
                    break;
                case level >= 1.5 && level <= 2.9:
                    console.log('S');
                    recommendation = '-Encourage sugar-free fluids intake (At least 100ml every hour) & Re-check your blood glucose & Ketone level in 2 hours & High risk for Diabetes Ketoacidosis (DKA), close monitoring required & If you have vomiting & it is persistent, go to ER';
                    handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 2);//120
                    break;
                case level >= 3:
                    console.log('T');
                    recommendation = 'High risk for Diabetes Ketoacidosis (DKA), go to ER & Encourage sugar-free fluids intake (At least 100ml every hour)';
                    break;
            }//Case 8 between 250-400
                }

            if (caseNO == '9'){
            switch (caseNO == '9'){
                case level == 'Negative':
                    console.log('O2');
                    recommendation = 'Encourage fluids intake (At least 100ml every hour) & Re-check your blood glucose & Ketone level in 4 hours If you have vomiting & it is persistent, go to ER';
                    handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 4);//240
                    break;
                case level == 'Trace':
                    console.log('Q2');
                    recommendation = 'Encourage fluids intake (At least 100ml every hour) & Re-check your blood glucose & Ketone level in 4 hours & If you have vomiting & it is persistent, go to ER';
                    handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 4);//240
                    break;
                case level == 'Small':
                    console.log('R2');
                    recommendation = 'Encourage sugar-free fluids intake (At least 100ml every hour) & Re-check your blood glucose & Ketone level in 2 hours & If you have vomiting & it is persistent, go to ER';
                    handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 2);//120
                    break;
                case level == 'Moderate':
                    console.log('S2');
                    recommendation = '-Encourage sugar-free fluids intake (At least 100ml every hour) & Re-check your blood glucose & Ketone level in 2 hours & High risk for Diabetes Ketoacidosis (DKA), close monitoring required & If you have vomiting & it is persistent, go to ER';
                    handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 2);//120
                    break;
                case level == 'Large':
                    console.log('T2');
                    recommendation = 'High risk for Diabetes Ketoacidosis (DKA), go to ER & Encourage sugar-free fluids intake (At least 100ml every hour)';
                    break;
            }//Case 9 between 250-400
            }

            if (caseNO == '10'){
                switch (caseNO == '10'){
                    case level < 0.6:
                        console.log('U');
                        recommendation = 'Encourage sugar-free fluids intake (At least 100ml every hour) & Re-check your blood glucose & Ketone level in 4 hours & If you have vomiting & it is persistent, go to ER';
                        handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 4);//240
                        break;
                    case level >= 0.6 && level <= 0.9:
                        console.log('V');
                        recommendation = 'Encourage sugar-free fluids intake (At least 100ml every hour) & Re-check your blood glucose & Ketone level in 3 hours & If you have vomiting & it is persistent, go to ER';
                        handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 3);//180
                        break;
                    case level >= 1 && level <= 1.4:
                        console.log('W');
                        recommendation = 'Encourage sugar-free fluids intake (At least 100ml every hour) & Re-check your blood glucose & Ketone level in 2 hours & If you have vomiting & it is persistent, go to ER';
                        handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 2);//120
                        break;
                    case level >= 1.5 && level <= 2.9:
                        console.log('X');
                        recommendation = 'Encourage sugar-free fluids intake (At least 100ml every hour) & Re-check your blood glucose & Ketone level in 2 hours & High risk for Diabetes Ketoacidosis (DKA), close monitoring required & If you have vomiting & it is persistent, go to ER';
                        handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 2);//120
                        break;
                    case level >= 3:
                        console.log('W');
                        recommendation = 'High risk for Diabetes Ketoacidosis (DKA), go to ER & Encourage sugar-free fluids intake (At least 100ml every hour)';
                        break;
                }//Case 10 between 400
                    }
                if (caseNO == '11'){
                switch (caseNO == '11'){
                    case level == 'Negative':
                        console.log('U2');
                        recommendation = 'Encourage sugar-free fluids intake (At least 100ml every hour) & Re-check your blood glucose & Ketone level in 4 hours & If you have vomiting & it is persistent, go to ER';
                        handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 4);//240
                        break;
                    case level == 'Trace':
                        console.log('V2');
                        recommendation = 'Encourage sugar-free fluids intake (At least 100ml every hour) & Re-check your blood glucose & Ketone level in 3 hours & If you have vomiting & it is persistent, go to ER';
                        handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 3);//180
                        break;
                    case level == 'Small':
                        console.log('W2');
                        recommendation = 'Encourage sugar-free fluids intake (At least 100ml every hour) & Re-check your blood glucose & Ketone level in 2 hours & If you have vomiting & it is persistent, go to ER';
                        handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 2);//120
                        break;
                    case level == 'Moderate':
                        console.log('X2');
                        recommendation = 'Encourage sugar-free fluids intake (At least 100ml every hour) & Re-check your blood glucose & Ketone level in 2 hours & High risk for Diabetes Ketoacidosis (DKA), close monitoring required & If you have vomiting & it is persistent, go to ER';
                        handleScheduleNotification('iSugar','Time to Re-check your blood glucose & Ketone level.', 2);//120
                        break;
                    case level == 'Large':
                        console.log('Y2');
                        recommendation = 'High risk for Diabetes Ketoacidosis (DKA), go to ER & Encourage sugar-free fluids intake (At least 100ml every hour)';
                        break;
                }//Case 11 between 400
                }
insert();
    return recommendation;
};

 //============== Withtin-APP DATABASE ***********************
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

export default tableukgCopy;
