import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import logoScreen from './pages/logoScreen';
import logIn from './pages/logIn';
import signUp from './pages/signUp';
import disclaimer from './pages/disclaimer';
import AccInfo from './pages/AccInfo';
import clinicInfo from './pages/clinicInfo';
import warning from './pages/warning';
import SQLite from 'react-native-sqlite-storage';
import personalInfo from './pages/personalInfo';
import ketones from './pages/ketones';
import insulin from './pages/insulin';
import isf from './pages/isf';
import icr from './pages/icr';
import Calc from './pages/Calc';
import sliding from './pages/sliding';
import editProfile from './pages/editProfile';
import passEdit from './pages/passEdit';
import AccInfoEdit from './pages/AccInfoEdit';
import clinicEdit from './pages/clinicEdit';
import personalEdit from './pages/personalEdit';
import ketonesEdit from './pages/ketonesEdit';
import insulinEdit from './pages/insulinEdit';
import isfEdit from './pages/isfEdit';
import icrEdit from './pages/icrEdit';
import carb from './pages/carb';
import signUpAR from './pages/signUpArabic';
import AccInfoAR from './pages/AccInfoArabic';
import AccInfoAREdit from './pages/AccInfoEditArabic';
import carbAR from './pages/carbArabic';
import clinicEditAR from './pages/clinicEditArabic';
import ketonesAR from './pages/ketonesArabic';
import clinicInfoAR from './pages/clinicInfoArabic';
import disclaimerAR from './pages/disclaimerArabic';
import editProfileAR from './pages/editProfileArabic';
import icrAR from './pages/icrArabic';
import icrEditAR from './pages/icrEditArabic';
import insulinAR from './pages/insulinArabic';
import insulinARe from './pages/insulinEdit';
import isfARA from './pages/isfArabic';
import isfEditAR from './pages/isfEditArabic';
import ketonesEditAR from './pages/ketonesEditArabic';
import logoAR from './pages/logoScreenArabic';
import passEditAR from './pages/passEditArabic';
import personalEditAR from './pages/personalEditArabic';
import warmar from './pages/warninAr';
import AuthStack from './pages/AuthStack';
import logInAR from './pages/logInAR';
import personalInfoAR from './pages/personalInfoArabic';
import AuthStackAR from './pages/AuthStackAR';
//===========Hypo Pages=============
import notConscious from './pages/notConscious';
import notConsciousAR from './pages/notConsciousAR';
import isConPop from './pages/isConPop';
import isConPopAR from './pages/isConPopAR';
import normBGfirst from './pages/normBGfirst';
import normBGfirstAR from './pages/normBGfirstAR';
import hypoConscious from './pages/hypoConscious';
import hypoConsciousAR from './pages/hypoConsciousAR';
import hypo from './pages/hypo';
import hypoAR from './pages/hypoAR';
import reNoHypo from './pages/reNoHypo';
import reNoHypoAR from './pages/reNoHypoAR';
import notMealTime from './pages/notMealTime';
import notMealTimeAR from './pages/notMealTimeAR';
//==================================
//=======Appointments and Calcs Pages=========
import Home from './pages/Home';
import appointments from './pages/appointments';
import Calc from './pages/Calc';
import CalcAR from './pages/CalcAR';
import insuResult from './pages/insuResult';
import insuResultAR from './pages/insuResultAR';
import howCalc from './pages/howCalc'
import howCalcAR from './pages/howCalcAR'
//=============Travel==============
import travel from './pages/travel';
import travelAR from './pages/travelAR';
//===============pumpFailure========
import pump from './pages/pumpFailure';
//==================================
import checkFirst from './pages/checkFirst';
import exercise from './pages/exercise';
import exercise3 from './pages/exercise3';
import recheckExercise from './pages/recheckExercise';
//============Fasting=================
import fasting from './pages/fasting';
import fastingProfile from './pages/fastingProfile';
import calcFasting from './pages/calcFasting';
import calcRecommend from './pages/calcRecommend';
import guidlines from './pages/guidlines';
//===========Last Sprint=============
import logbook from './pages/logbook';
import logbookAR from './pages/logbookAR';
import Educational from './pages/Educational';
import EducationalAR from './pages/EducationalAR';





global.db = SQLite.openDatabase(
  {
    name: 'iSugar.db',
    location: 'Library'
  },
  () => {
    console.log('Success')
   },
  error => {
    console.log("ERROR: " + error);
  }
);

try {
  db.transaction( (tx) => {
      tx.executeSql(
       'CREATE TABLE IF NOT EXISTS UserAccount (UserID INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT NOT NULL, lastName	TEXT NOT NULL, email	TEXT NOT NULL, pass	TEXT NOT NULL, accountType	TEXT NOT NULL)',
      []
     );
     //=====//
     try {
      db.transaction( (tx) => {
          tx.executeSql(
           'CREATE TABLE IF NOT EXISTS KSUMC (UserID INTEGER NOT NULL UNIQUE, MRN TEXT NOT NULL, FOREIGN KEY("UserID") REFERENCES "UserAccount"("UserID"))',
          []
         );
     })
    } catch (error) {
     console.log(error);
    }
    //=====//
    try {
      db.transaction( (tx) => {
          tx.executeSql(
           'CREATE TABLE IF NOT EXISTS patientprofile (UserID INTEGER NOT NULL UNIQUE, DOB TEXT NOT NULL, weightKG REAL NOT NULL, latest_HP1AC REAL NOT NULL, latest_HP1AC_date TEXT NOT NULL, typeOfGlucoseM TEXT NOT NULL, glucoseLevel_unit TEXT NOT NULL, ketonesMeasure TEXT NOT NULL, insulinRegimen TEXT NOT NULL, ISF INTEGER, targetBG_correct INTEGER, startBG_correct INTEGER, ISFIntervals INTEGER NOT NULL, insulinCalcMethod TEXT NOT NULL, fromBG INTEGER NOT NULL, toBG INTEGER NOT NULL, height REAL NOT NULL, diabetes_center TEXT NOT NULL, diagnosis_date TEXT NOT NULL, center_name TEXT, center_city TEXT, FOREIGN KEY("UserID") REFERENCES "UserAccount"("UserID"))',
          []
         );
     })
    } catch (error) {
     console.log(error);
    }
        try {
      db.transaction( (tx) => {
          tx.executeSql(
           'CREATE TABLE IF NOT EXISTS patientprofileFasting (UserID INTEGER NOT NULL UNIQUE, DOB TEXT NOT NULL, weightKG REAL NOT NULL, latest_HP1AC REAL NOT NULL, latest_HP1AC_date TEXT NOT NULL, typeOfGlucoseM TEXT NOT NULL, glucoseLevel_unit TEXT NOT NULL, ketonesMeasure TEXT NOT NULL, insulinRegimen TEXT NOT NULL, ISF INTEGER, targetBG_correct INTEGER, startBG_correct INTEGER, ISFIntervals INTEGER NOT NULL, insulinCalcMethod TEXT NOT NULL, fromBG INTEGER NOT NULL, toBG INTEGER NOT NULL, height REAL NOT NULL, diabetes_center TEXT NOT NULL, diagnosis_date TEXT NOT NULL, center_name TEXT, center_city TEXT, FOREIGN KEY("UserID") REFERENCES "UserAccount"("UserID"))',
          []
         );
     })
    } catch (error) {
     console.log(error);
    }
    //========//
    try {
      db.transaction( (tx) => {
          tx.executeSql(
           'CREATE TABLE IF NOT EXISTS nonPatientprofile (UserID INTEGER NOT NULL UNIQUE, DOB TEXT NOT NULL, weightKG REAL NOT NULL, latest_HP1AC REAL NOT NULL, latest_HP1AC_date TEXT NOT NULL, typeOfGlucoseM TEXT NOT NULL, glucoseLevel_unit TEXT NOT NULL, ketonesMeasure TEXT NOT NULL, insulinRegimen TEXT NOT NULL, ISF INTEGER, targetBG_correct INTEGER, startBG_correct INTEGER, ISFIntervals INTEGER NOT NULL, insulinCalcMethod TEXT NOT NULL, fromBG INTEGER NOT NULL, toBG INTEGER NOT NULL, FOREIGN KEY("UserID") REFERENCES "UserAccount"("UserID"))',
          []
         );
     })
    } catch (error) {
     console.log(error);
    }
    //====//
    try {
      db.transaction( (tx) => {
          tx.executeSql(
           'CREATE TABLE IF NOT EXISTS icrInterval (icrID INTEGER PRIMARY KEY AUTOINCREMENT, UserID INTEGER NOT NULL, fromTime TEXT NOT NULL, toTime TEXT NOT NULL, ICR INTEGER NOT NULL, FOREIGN KEY("UserID") REFERENCES "UserAccount"("UserID"))',
          []
         );
     })
    } catch (error) {
     console.log(error);
    }
    //====//
    try {
      db.transaction( (tx) => {
          tx.executeSql(
           'CREATE TABLE IF NOT EXISTS icrIntervalFasting (icrID INTEGER PRIMARY KEY AUTOINCREMENT, UserID INTEGER NOT NULL, fromTime TEXT NOT NULL, toTime TEXT NOT NULL, ICR INTEGER NOT NULL, FOREIGN KEY("UserID") REFERENCES "UserAccount"("UserID"))',
          []
         );
     })
    } catch (error) {
     console.log(error);
    }
    //====//
    try {
      db.transaction( (tx) => {
          tx.executeSql(
           'CREATE TABLE IF NOT EXISTS isfInterval (isfID INTEGER PRIMARY KEY AUTOINCREMENT, UserID INTEGER NOT NULL, fromTime TEXT NOT NULL, toTime TEXT NOT NULL, ISF INTEGER NOT NULL, targetBG_correct INTEGER NOT NULL, startBG_correct INTEGER NOT NULL, FOREIGN KEY("UserID") REFERENCES "UserAccount"("UserID"))',
          []
         );
     })
    } catch (error) {
     console.log(error);
    }
    //======/
    try {
      db.transaction( (tx) => {
          tx.executeSql(
           'CREATE TABLE IF NOT EXISTS isfIntervalFasting (isfID INTEGER PRIMARY KEY AUTOINCREMENT, UserID INTEGER NOT NULL, fromTime TEXT NOT NULL, toTime TEXT NOT NULL, ISF INTEGER NOT NULL, targetBG_correct INTEGER NOT NULL, startBG_correct INTEGER NOT NULL, FOREIGN KEY("UserID") REFERENCES "UserAccount"("UserID"))',
          []
         );
     })
    } catch (error) {
     console.log(error);
    }
    //======/
    try {
      db.transaction( (tx) => {
          tx.executeSql(
           'CREATE TABLE IF NOT EXISTS insulinPen (insulinID INTEGER PRIMARY KEY AUTOINCREMENT, UserID INTEGER NOT NULL, insulinType TEXT NOT NULL, halfORfull INTEGER NOT NULL, FOREIGN KEY("UserID") REFERENCES "UserAccount"("UserID"))',
          []
         );
     })
    } catch (error) {
     console.log(error);
    }
    //======/
    try {
      db.transaction( (tx) => {
          tx.executeSql(
           'CREATE TABLE IF NOT EXISTS insulinPenFasting (insulinID INTEGER PRIMARY KEY AUTOINCREMENT, UserID INTEGER NOT NULL, insulinType TEXT NOT NULL, halfORfull INTEGER NOT NULL, FOREIGN KEY("UserID") REFERENCES "UserAccount"("UserID"))',
          []
         );
     })
    } catch (error) {
     console.log(error);
    }
    //====/
    try {
      db.transaction( (tx) => {
          tx.executeSql(
           'CREATE TABLE IF NOT EXISTS insulinOther (insulinID INTEGER PRIMARY KEY AUTOINCREMENT, UserID INTEGER NOT NULL, insulinType TEXT NOT NULL, iDose REAL NOT NULL, iTime TEXT NOT NULL, FOREIGN KEY("UserID") REFERENCES "UserAccount"("UserID"))',
          []
         );
     })
    } catch (error) {
     console.log(error);
    }
    
    //=====//
      //====/
      try {
        db.transaction( (tx) => {
            tx.executeSql(
             'CREATE TABLE IF NOT EXISTS insulinOtherFasting (insulinID INTEGER PRIMARY KEY AUTOINCREMENT, UserID INTEGER NOT NULL, insulinType TEXT NOT NULL, iDose REAL NOT NULL, iTime TEXT NOT NULL, FOREIGN KEY("UserID") REFERENCES "UserAccount"("UserID"))',
            []
           );
       })
      } catch (error) {
       console.log(error);
      }
      
    try {
      db.transaction( (tx) => {
          tx.executeSql(
           'CREATE TABLE IF NOT EXISTS ssInterval (ssID INTEGER PRIMARY KEY AUTOINCREMENT, UserID INTEGER NOT NULL, fromTime TEXT NOT NULL, toTime TEXT NOT NULL, FOREIGN KEY("UserID") REFERENCES "UserAccount"("UserID"))',
          []
         );
     })
    } catch (error) {
     console.log(error);
    }
    //======//
    try {
      db.transaction( (tx) => {
          tx.executeSql(
           'CREATE TABLE IF NOT EXISTS ssIntervalFasting (ssID INTEGER PRIMARY KEY AUTOINCREMENT, UserID INTEGER NOT NULL, fromTime TEXT NOT NULL, toTime TEXT NOT NULL, FOREIGN KEY("UserID") REFERENCES "UserAccount"("UserID"))',
          []
         );
     })
    } catch (error) {
     console.log(error);
    }
    //======//
    try {
      db.transaction( (tx) => {
          tx.executeSql(
           'CREATE TABLE IF NOT EXISTS bgleveltoinsulin (bgID INTEGER PRIMARY KEY AUTOINCREMENT, ssID INTEGER NOT NULL, fromTime TEXT NOT NULL, toTime TEXT NOT NULL, FOREIGN KEY("ssID") REFERENCES "ssInterval"("ssID"))',
          []
         );
     })
    } catch (error) {
     console.log(error);
    }
    //======//
     //=====//
     try {
      db.transaction( (tx) => {
          tx.executeSql(
           'CREATE TABLE IF NOT EXISTS fasting (UserID INTEGER NOT NULL, recordDate TEXT NOT NULL, recordTime TEXT NOT NULL, FOREIGN KEY("UserID") REFERENCES "UserAccount"("UserID"))',
          []
         );
     })
    } catch (error) {
     console.log(error);
    }
    //=====//
    //======//
    try {
      db.transaction( (tx) => {
          tx.executeSql(
           'CREATE TABLE IF NOT EXISTS bgleveltoinsulinFasting (bgID INTEGER PRIMARY KEY AUTOINCREMENT, ssID INTEGER NOT NULL, fromTime TEXT NOT NULL, toTime TEXT NOT NULL, FOREIGN KEY("ssID") REFERENCES "ssInterval"("ssID"))',
          []
         );
     })
    } catch (error) {
     console.log(error);
    }
    try {
      db.transaction( (tx) => {
          tx.executeSql(
           'CREATE TABLE IF NOT EXISTS takenInsulinDose (takenInsulinID INTEGER PRIMARY KEY AUTOINCREMENT, UserID INTEGER NOT NULL, BG_level REAL NOT NULL, ReasonForInsulin TEXT NOT NULL, CHO REAL NOT NULL, insulinDose INTEGER NOT NULL, Dose_time_hours INTEGER NOT NULL, Dose_time_minutes	INTEGER NOT NULL, Dose_Date_Month INTEGER NOT NULL, Dose_Date_Day INTEGER NOT NULL, Dose_Date_Year INTEGER NOT NULL, spicial TEXT, dateString TEXT, FOREIGN KEY("UserID") REFERENCES "UserAccount"("UserID"))',
          []
         );
     })
    } catch (error) {
     console.log(error);
    }
    //====/
    try {
      db.transaction( (tx) => {
          tx.executeSql(
           'CREATE TABLE IF NOT EXISTS takenInsulinDoseFasting (takenInsulinID INTEGER PRIMARY KEY AUTOINCREMENT, UserID INTEGER NOT NULL, BG_level REAL NOT NULL, ReasonForInsulin TEXT NOT NULL, CHO REAL NOT NULL, insulinDose INTEGER NOT NULL, Dose_time_hours INTEGER NOT NULL, Dose_time_minutes	INTEGER NOT NULL, Dose_Date_Month INTEGER NOT NULL, Dose_Date_Day INTEGER NOT NULL, Dose_Date_Year INTEGER NOT NULL, FOREIGN KEY("UserID") REFERENCES "UserAccount"("UserID"))',
          []
         );
     })
    } catch (error) {
     console.log(error);
    }
    //====/
     //======//
     try {
      db.transaction( (tx) => {
          tx.executeSql(
           'CREATE TABLE IF NOT EXISTS plannedExercise (takenInsulinID INTEGER NOT NULL, type TEXT NOT NULL, duration	INTEGER NOT NULL,  FOREIGN KEY("takenInsulinID") REFERENCES "takenInsulinDose"("takenInsulinID"))',
          []
         );
     })
    } catch (error) {
     console.log(error);
    }
     //======//
     try {
      db.transaction( (tx) => {
          tx.executeSql(
           'CREATE TABLE IF NOT EXISTS plannedExerciseFasting (takenInsulinID INTEGER NOT NULL, type TEXT NOT NULL, duration	INTEGER NOT NULL,  FOREIGN KEY("takenInsulinID") REFERENCES "takenInsulinDose"("takenInsulinID"))',
          []
         );
     })
    } catch (error) {
     console.log(error);
    }
     //======//
     try {
      db.transaction( (tx) => {
          tx.executeSql(
           'CREATE TABLE IF NOT EXISTS prevoiusExercise (takenInsulinID INTEGER NOT NULL, type TEXT NOT NULL, duration	INTEGER NOT NULL, Time	TEXT NOT NULL,  FOREIGN KEY("takenInsulinID") REFERENCES "takenInsulinDose"("takenInsulinID"))',
          []
         );
     })
    } catch (error) {
     console.log(error);
    }
     //======//
     try {
      db.transaction( (tx) => {
          tx.executeSql(
           'CREATE TABLE IF NOT EXISTS prevoiusExerciseFasting (takenInsulinID INTEGER NOT NULL, type TEXT NOT NULL, duration	INTEGER NOT NULL, Time	TEXT NOT NULL,  FOREIGN KEY("takenInsulinID") REFERENCES "takenInsulinDose"("takenInsulinID"))',
          []
         );
     })
    } catch (error) {
     console.log(error);
    }
    try {
      db.transaction( (tx) => {
          tx.executeSql(
           'CREATE TABLE IF NOT EXISTS hypoRecord (dateTime TEXT NOT NULL, UserID INTEGER NOT NULL, glucaFlag INTEGER NOT NULL, FOREIGN KEY("UserID") REFERENCES "UserAccount"("UserID"))',
          []
         );
     })
    } catch (error) {
     console.log(error);
    }
    //====/

    
    //======/
    try {
      db.transaction( (tx) => {
          tx.executeSql(
           'CREATE TABLE IF NOT EXISTS reCheckRecord (dateTime TEXT NOT NULL, UserID INTEGER NOT NULL,reason TEXT , glucaFlag INTEGER NOT NULL, FOREIGN KEY("UserID") REFERENCES "UserAccount"("UserID"))',
          []
         );
     })
    } catch (error) {
     console.log(error);
    }
    //====/

    try {
      db.transaction( (tx) => {
          tx.executeSql(
           'CREATE TABLE IF NOT EXISTS reCheckReminder (dateTime TEXT NOT NULL, UserID INTEGER NOT NULL, FOREIGN KEY("UserID") REFERENCES "UserAccount"("UserID"))',
          []
         );
     })
    } catch (error) {
     console.log(error);
    }
    //====/
     try {
      db.transaction( (tx) => {
          tx.executeSql(
           'CREATE TABLE IF NOT EXISTS prevoiusExercise (takenInsulinID INTEGER NOT NULL, type TEXT NOT NULL, duration	INTEGER NOT NULL, Time	TEXT NOT NULL,  FOREIGN KEY("takenInsulinID") REFERENCES "takenInsulinDose"("takenInsulinID"))',
          []
         );
     })
    } catch (error) {
     console.log(error);
    }
    
    //===Hypo local table===
    try {
      db.transaction( (tx) => {
          tx.executeSql(
           'CREATE TABLE IF NOT EXISTS hypoglycemiaRecords(UserID INTEGER NOT NULL, DateTime TEXT, BGlevel DOUBLE, GlucagonFlag INTEGER, Reason TEXT, Other TEXT, FOREIGN KEY("UserID") REFERENCES "UserAccount"("UserID"))',
          []
         );
     })
    } catch (error) {
     console.log(error);
    }
    //===Hypo local table===
     //======//
     try {
      db.transaction( (tx) => {
          tx.executeSql(
           'CREATE TABLE IF NOT EXISTS CHO (foodID INTEGER PRIMARY KEY AUTOINCREMENT, foodEnglishName TEXT NOT NULL UNIQUE, foodArabicName	TEXT NOT NULL, unit	TEXT NOT NULL, unitArabic	TEXT NOT NULL, gramsOfCHO REAL NOT NULL )',
          []
         );
         //------------child
         try {
          db.transaction( (tx) => {
              tx.executeSql(
               'INSERT INTO CHO (foodEnglishName, foodArabicName, unit, unitArabic, gramsOfCHO) VALUES (?,?,?,?,?),(?,?,?,?,?),(?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?),(?,?,?,?,?),(?,?,?,?,?),(?,?,?,?,?), (?,?,?,?,?),(?,?,?,?,?), (?,?,?,?,?),  (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?) ',
              ['Cantaloupe', 'شمام',	'cup', 'كوب' , '15', 'Pineapple', 'أناناس', 'cup', 'كوب', '20', 'Raspberry', 'توت العليق الأحمر', 'cup', 'كوب', '7.5', 'Blackberry', 'توت العليق الأسود', 'cup', 'كوب', '7', 'Blueberry','التوت الأزرق','cup','كوب','15', 'Strawberry', 'فراولة', 'cup', 'كوب', '12', 'Watermelon ', 'جح' ,'cup' ,'كوب' ,'12', 'Dried fruits','فواكه مجففة','cup','كوب','60', 'Canned fruits', 'فواكه معلبة', 'cup', 'كوب', '30', 'Popcorn', 'فشار', 'cup', 'كوب', '15', 'Indomie','اندومي','cup','كوب','30', 'Corn flakes','كورن فليكس','cup','كوب','30', 'Full fat milk','حليب كامل الدسم','cup','كوب','15', 'Low fat milk', 'حليب قليل الدسم', 'cup', 'كوب', '15', 'Chocolate milk', 'حليب بالشوكولاتة', 'cup', 'كوب', '30', 'Full fat laban', 'لبن كامل الدسم', 'cup', 'كوب', '15', 'skim fat laban','لبن منزوع الدسم','cup','كوب','15', 'Low fat laban', 'لبن قليل الدسم', 'cup', 'كوب', '15', 'Full fat yogurt', 'زبادي كامل الدسم' ,'cup', 'كوب', '15', 'Skim fat yogurt', 'زبادي منزوع الدسم', 'cup', 'كوب', '15', 'Low fat yogurt', 'زبادي قليل الدسم', 'cup', 'كوب', '15', 'Flavoured yogurt','زبادي بالنكهات','cup','كوب','22.5', 'Skim milk','حليب منزوع الدسم','cup','كوب','15', 'Vermicelli', 'شعيرية', 'cup', 'كوب', '60', 'Stewed vegetables', 'مرق خضار', 'cup', 'كوب', '15', 'Oats soup', 'شوربة الشوفان', 'cup', 'كوب', '15', 'Lentils soup', 'شوربة عدس', 'cup', 'كوب', '20']
             );
         })
        } catch (error) {
         console.log(error);
        }

     })
    } catch (error) {
     console.log(error);
    }
 })
 
} catch (error) {
 console.log(error);
}


//----------BGLevel----------
try {
  db.transaction( (tx) => {
      tx.executeSql(
       'CREATE TABLE IF NOT EXISTS BGLevel (UserID INTEGER, BGLevel REAL NOT NULL, DateTime TEXT NOT NULL, FOREIGN KEY("UserID") REFERENCES "UserAccount"("UserID"))',
      []
     );
 })
} catch (error) {
 console.log(error);
}

//----------Appointments----------
try {
  db.transaction( (tx) => {
      tx.executeSql(
       'CREATE TABLE IF NOT EXISTS appointments (UserID INTEGER, appID PRIMARY KEY AUTOINCREMENT, appointmentDate TEXT NOT NULL,note TEXT, FOREIGN KEY("UserID") REFERENCES "UserAccount"("UserID"))',
      []
     );
 })
} catch (error) {
 console.log(error);
}

//----------Flags----------
try {
  db.transaction( (tx) => {
      tx.executeSql(
       'CREATE TABLE IF NOT EXISTS Flags (UserID INTEGER NOT NULL UNIQUE, eMsgFlag TEXT NOT NULL, eMsgFlagDate TEXT NOT NULL, FOREIGN KEY("UserID") REFERENCES "UserAccount"("UserID"))',
      []
     );
 })
} catch (error) {
 console.log(error);
}

//----------exercise record----------
try {
  db.transaction( (tx) => {
      tx.executeSql(
       'CREATE TABLE IF NOT EXISTS exerciseRecords (UserID INTEGER NOT NULL UNIQUE, recordDate TEXT NOT NULL, recordTime TEXT NOT NULL, exerciseType TEXT NOT NULL, suggestedCorrectionDose INTEGER NOT NULL, ketonesLevel TEXT NOT NULL, ketonesSource TEXT NOT NULL, suggestCarbs TEXT NOT NULL, FOREIGN KEY("UserID") REFERENCES "UserAccount"("UserID"))',
      []
     );
 })
} catch (error) {
 console.log(error);
}


//----------recheck record----------
try {
  db.transaction( (tx) => {
      tx.executeSql(
       'CREATE TABLE IF NOT EXISTS exRecheckRecords (UserID INTEGER NOT NULL UNIQUE, recordDate TEXT NOT NULL, recordTime TEXT NOT NULL, exerciseType TEXT NOT NULL, suggestedCorrectionDose INTEGER NOT NULL, ketonesLevel TEXT NOT NULL, ketonesSource TEXT NOT NULL, suggestCarbs TEXT NOT NULL, FOREIGN KEY("UserID") REFERENCES "UserAccount"("UserID"))',
      []
     );
 })
} catch (error) {
 console.log(error);
}


//----------recheck notification----------
try {
  db.transaction( (tx) => {
      tx.executeSql(
       'CREATE TABLE IF NOT EXISTS exRecheckNotification (UserID INTEGER NOT NULL UNIQUE, recheckDate TEXT NOT NULL, recheckTime TEXT NOT NULL, FOREIGN KEY("UserID") REFERENCES "UserAccount"("UserID"))',
      []
     );
 })
} catch (error) {
 console.log(error);
}

//----------Travel------------

    try {
      db.transaction( (tx) => {
          tx.executeSql(
           'CREATE TABLE IF NOT EXISTS travel (travelID INTEGER PRIMARY KEY AUTOINCREMENT, UserID INTEGER NOT NULL, travelDate TEXT NOT NULL, cityName TEXT NOT NULL,  timeDifference	INTEGER NOT NULL, fromOrTO TEXT NOT NULL, FOREIGN KEY("UserID") REFERENCES "UserAccount"("UserID"))',
          []
         );
     })
    } catch (error) {
     console.log(error);
    }
    
//----------City create and insert---------------
      try {
        db.transaction( (tx) => {
            tx.executeSql(
             'CREATE TABLE IF NOT EXISTS city (cityID INTEGER PRIMARY KEY AUTOINCREMENT, cityEnglishName TEXT NOT NULL UNIQUE, cityArabicName	TEXT NOT NULL, fromOrTo	TEXT NOT NULL,  timeDifference	INTEGER NOT NULL)',
            []
           );
           try {
            db.transaction( (tx) => {
                tx.executeSql(
                  'INSERT INTO city (cityEnglishName, cityArabicName, fromOrTo, timeDifference) VALUES (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?)',
                ['Abu Dhabi, United Arab Emirates', 'أبوظبي، الإمارات العربية المتحدة', 'from', '1', 'Abuja, Nigeria', 'أبوجا، نيجيريا', 'from', '-2','Accra, Ghana', 'أكرا، غانا', 'from', '-3','Addis Ababa, Ethiopia', 'أديس أبابا، اثيوبيا', 'from', '0','Algiers, Algeria', 'الجزائر العاصمة، الجزائر', 'from', '-2','Alofi, Niue', 'ألوفي، نيوي', 'from', '-14','Amman, Jordan', 'عمّان، الأردن', 'from', '-1','Amsterdam, Netherlands', 'أمستردام، هولندا', 'from', '-2','Andorra La Vella, Andorra', 'أندورا لا فيلا، أندورا', 'from', '-2','Ankara, Turkey', 'أنقرة، تركيا', 'from', '0','Antananarivo, Madagascar', 'أنتاناناريفو، مدغشقر', 'from', '0','Apia, Samoa', 'أبيا، ساموا', 'from', '10','Ashgabat, Turkmenistan', 'عشق أباد، تركمانستان', 'from', '2', 'Asmara, Eritrea', 'أسمرة، إريتريا', 'from', '0','Asuncion, Paraguay', 'أسونسيون، باراغواي', 'from', '-7','Athens, Greece', 'أثينا، اليونان', 'from', '-1','Baghdad, Iraq', 'بغداد، العراق', 'from', '0','Baku, Azerbaijan', 'باكو، أذربيجان', 'from', '1','Bamako, Mali', 'باماكو، مالي', 'from', '-3','Bandar Seri Begawan, Brunei', 'بندر سري بكاوان، بروناي', 'from', '5']
               );
           })
          } catch (error) {
           console.log(error);
          }
       })
      } catch (error) {
       console.log(error);
      }
//---------Pump Failure-----------------
  try {
      db.transaction( (tx) => {
          tx.executeSql(
           'CREATE TABLE IF NOT EXISTS pumpFailure (pumpID INTEGER PRIMARY KEY AUTOINCREMENT, UserID INTEGER NOT NULL, failDate TEXT NOT NULL, startingDose REAL NOT NULL, FOREIGN KEY("UserID") REFERENCES "UserAccount"("UserID"))',
          []
         );
     })
    } catch (error) {
     console.log(error);
    }
    




global.uID='';
global.onlinUserID = 0;
global.AccType = '';
global.centName = '';
global.centCity = '';
global.Diabetescenter= '';
global.DOD = '';
global.weightKG = 0;
global.heightCM = 0;
global.DOBirth= '';
global.DOLatestHB1AC = '';
global.latestHB1AC_ = 0; 
global.glucoseUnit = '';
global.insulinReg = '';
global.ketonesMeasure = '';
global.bgTarget = 0;
global.bgStart = 0;
global.fromBG = 0;
global.toBG= 0;
global.InsulinSF = 0;
global.intervalISF = '';
global.insulinCalcMethod = '';
global.glucoseMonitor = '';
//============Hypo Global vars================
global.weight = 0;
global.age = 0;
global.recheckCounter = 0;
global.isRecheck = false;
global.ageFour = false;
global.hBGlevel =0;
global.glucaFlag = 0;// 0 is false 1 is true
//============================================
//============Home Global vars================
global.fromBGHome = -1;
global.toBGHome = -1;
//============================================
//===========Calcs Global vars================
global.totalInulin = 0;
global.howText = '-';//const [howText, setHowText] = useState('-'); //How was the insulin calculated
global.bgLevelDB=0;
global.reasonDB='';
global.choDB='';
//==========================

  // ====== ISF intervals ========== //
  global.ISFfromTimes = []; //const [fromTime, setFromTime] = useState([]);
  global.ISFtoTimes = []; //const [toTime, setToTime] = useState([]);
  global.ISFs = [];//const [isf, setISF] = useState([]);
  global.ISFsTragetBG = [];//const [tBG, setTBG] = useState([]);
  global.ISFsStartBG = [];// const [sBG, setSBG] = useState([]);
  //======== ICR AND SS========= //
  global.ICRarr = [];//const [ICRarr, setICRarr] = useState([]);
  global.ICR=0;//const [ICR, setICR] = useState(0);
  global.SlidingScaleArr = [];//const [SlidingScaleArr, setSlidingScaleArr] = useState([]);
  global.SlidingScale=0;//const [SlidingScale, setSlidingScale] = useState(0);

  

  // ======= Patient Profile ===== //
  global.calcMethod = '';//const [calcMethod, setCalcM] = useState('');
  global.isIsfInterval = -1;//const [isIsfInterval, setInterval] = useState(-1);
  global.insulinReg = '';//const [insulinReg, setReg] = useState('');
  global.insulinType = '';//const [insulinType, setType] = useState('');
  global.halfOrFull = -1;//const [halfOrFull, sethalfOrFull]= useState(-1);
  global.isfP = -1;//const [isfP, setISFP] = useState(-1);
  global.tBGP = -1;//const [tBGP, setTBGP] = useState(-1);
  global.sBGP = -1;//const [sBGP, setSBGP] = useState(-1);
  // p indicates patient ;) these values won't be retreived unless isf interval = 0: All day
 
  //======= Previous Dose==========//
  global.prevArr =[];
  //=======  Final Sprint ==========//
  global.specialLog=''; 



//============================================

const Stack = createNativeStackNavigator();
const mainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
  screenOptions={{
    headerShown: false 
  }}
>



        <Stack.Screen name="logo" component={logoScreen}  />
        <Stack.Screen name="login" component={logIn} />
        <Stack.Screen name="signup" component={signUp} />
        <Stack.Screen name="temp" component={disclaimer} />
        <Stack.Screen name="accinfo" component={AccInfo} />
        <Stack.Screen name="clinic" component={clinicInfo} />
        <Stack.Screen name="warning" component={warning} />
        <Stack.Screen name="personal" component={personalInfo} />
        <Stack.Screen name="ketones" component={ketones} />
        <Stack.Screen name="insulin" component={insulin} />
        <Stack.Screen name="isf" component={isf} />
        <Stack.Screen name="icr" component={icr} />
        //<Stack.Screen name="home" component={AuthStack} />
        <Stack.Screen name="sliding" component={sliding} />
        <Stack.Screen name="pass" component={passEdit}  />
        <Stack.Screen name="insulinEdit" component={insulinEdit}  />
        <Stack.Screen name="carb" component={carb}  />
        <Stack.Screen name="edit" component={editProfile}  />
        <Stack.Screen name="icrEdit" component={icrEdit}  />
        <Stack.Screen name="isfEdit" component={isfEdit}  />
        <Stack.Screen name="CalcAR" component={CalcAR}  />
        <Stack.Screen name="ketonesEdit" component={ketonesEdit}  />
        <Stack.Screen name="personalEdit" component={personalEdit}  />   
        <Stack.Screen name="clinicEdit" component={clinicEdit}  />
        <Stack.Screen name="AccEdit" component={AccInfoEdit}  />   
        <Stack.Screen name="signupAR" component={signUpAR}  />   
        <Stack.Screen name="accAR" component={AccInfoAR}  />   
        <Stack.Screen name="accEAR" component={AccInfoAREdit}  /> 
        <Stack.Screen name="carbAR" component={carbAR}  /> 
        <Stack.Screen name="ketoAR" component={ketonesAR}  /> 
        <Stack.Screen name="clinicEAR" component={clinicEditAR}  /> 
        <Stack.Screen name="clinicInfoAR" component={clinicInfoAR}  /> 
        <Stack.Screen name="discAR" component={disclaimerAR}  /> 
        <Stack.Screen name="icrAR" component={icrAR}  /> 
        <Stack.Screen name="icrERA" component={icrEditAR}  /> 
        <Stack.Screen name="isfARA" component={isfARA}  /> 
        <Stack.Screen name="insARE" component={insulinARe}  /> 
        <Stack.Screen name="insAR" component={insulinAR}  /> 
        <Stack.Screen name="editProAR" component={editProfileAR}  /> 
        <Stack.Screen name="ketonesEAR" component={ketonesEditAR}  /> 
        <Stack.Screen name="logoAR" component={logoAR}  /> 
        <Stack.Screen name="passEAR" component={passEditAR}  />  
        <Stack.Screen name="personalEAR" component={personalEditAR}  /> 
        <Stack.Screen name="warningAR" component={warmar}  /> 
        <Stack.Screen name="logInAR" component={logInAR}  />
        <Stack.Screen name="personalAR" component={personalInfoAR}  />
        <Stack.Screen name="HomeAR" component={AuthStackAR} />
        <Stack.Screen name="isfEditAR" component={isfEditAR} />
          
     //================Hypo Navigations========================
        <Stack.Screen name="hypoAR" component={hypoAR}  />
        <Stack.Screen name="notConsciousAR" component={notConsciousAR}  />
        <Stack.Screen name="hypo" component={hypo}  />
        <Stack.Screen name="isConPop" component={isConPop}  />
        <Stack.Screen name="isConPopAR" component={isConPopAR}  />
        <Stack.Screen name="notConscious" component={notConscious}  />
        <Stack.Screen name="normBGfirst" component={normBGfirst}  />
        <Stack.Screen name="normBGfirstAR" component={normBGfirstAR}  />
        <Stack.Screen name="hypoConscious" component={hypoConscious}  />
        <Stack.Screen name="hypoConsciousAR" component={hypoConsciousAR}  />
        <Stack.Screen name="notMealTime" component={notMealTime}  />
        <Stack.Screen name="notMealTimeAR" component={notMealTimeAR}  />
        <Stack.Screen name="reNoHypo" component={reNoHypo}  />
        <Stack.Screen name="reNoHypoAR" component={reNoHypoAR}  />
     //=========================================================
     //================Home&Calc Navigations====================  
        <Stack.Screen name="Home" component={Home}  />
        <Stack.Screen name="appointments" component={appointments}  />  
        <Stack.Screen name="Calc" component={Calc} />
        <Stack.Screen name="insuResult" component={insuResult} />
        <Stack.Screen name="howCalc" component={howCalc}  /> 
        <Stack.Screen name="CalcAR" component={CalcAR} />
        <Stack.Screen name="insuResultAR" component={insuResultAR} />
        <Stack.Screen name="howCalcAR" component={howCalcAR}  /> 
     //=========================================================
        <Stack.Screen name="check" component={checkFirst}  />
        <Stack.Screen name="exercise" component={exercise}  />
        <Stack.Screen name="exercise3" component={exercise3}  />
        <Stack.Screen name="recheckExercise" component={recheckExercise}  />
      //=========================================================
            <Stack.Screen name="travelAR" component={travelAR}  />
            <Stack.Screen name="travel" component={travel}  />
            <Stack.Screen name="fasting" component={fasting}  />
            <Stack.Screen name="fastingProfile" component={fastingProfile}  />
            <Stack.Screen name="calcFasting" component={calcFasting}  />
            <Stack.Screen name="calcRecommend" component={calcRecommend}  />
            <Stack.Screen name="guidlines" component={guidlines}  />
            <Stack.Screen name="pump" component={pump}  />
     //=======================Last Sprint!!!!===================
           <Stack.Screen name="EducationalAR" component={EducationalAR} />
          <Stack.Screen name="Educational" component={Educational} />
          <Stack.Screen name="logbook" component={logbook} />
            <Stack.Screen name="logbookAR" component={logbookAR} />

      </Stack.Navigator>
    </NavigationContainer>
  );//fffSS
  };
export default mainStack;
