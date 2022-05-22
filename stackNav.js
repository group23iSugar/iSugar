/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
/* eslint-disable semi */
/* eslint-disable no-undef */

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
import pass from './pages/passEdit';
import passEAR from './pages/passEditArabic';
import AccInfoAREdit from './pages/AccInfoEditArabic';
// import Calc from './pages/Calc';
import editProfile from './pages/editProfile';
import passEdit from './pages/passEdit';
import AccInfoEdit from './pages/AccInfoEdit';
import clinicEdit from './pages/clinicEdit';
import personalEdit from './pages/personalEdit';
import ketonesEdit from './pages/ketonesEdit';
import insulinEdit from './pages/insulinEdit';
import isfEdit from './pages/isfEdit';
import icrEdit from './pages/icrEdit';
// import carb from './pages/carb';
import signUpAR from './pages/signUpArabic';
import AccInfoAR from './pages/AccInfoArabic';
// import carbAR from './pages/carbArabic';
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
import howCalc from './pages/howCalc';
import isfEditAR from './pages/isfEditArabic';
import ketonesEditAR from './pages/ketonesEditArabic';
import logoScreenAR from './pages/logoScreenArabic';
// import passEditAR from './pages/passEditArabic';
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
import appointments from './pages/appointments';
import appointmentsAR from './pages/appointmentsAR';
// import CalcAR from './pages/CalcAR';
import insuResult from './pages/insuResult';
import insuResultAR from './pages/insuResultAR';
// import howCalc from './pages/howCalc'
// import howCalcAR from './pages/howCalcAR'
//==================================
import checkFirst from './pages/checkFirst';
import exercise from './pages/exercise';
import exercise3 from './pages/exercise3';
import recheckExercise from './pages/recheckExercise';
//===========Last Sprint=============
// import logbook from './pages/logbook';
// import logbookAR from './pages/logbookAR';
// import Educational from './pages/Educational';
// import EducationalAR from './pages/EducationalAR';
//=========================================#
import fastingProfile from './pages/fastingProfile';
import calcFasting from './pages/calcFasting';
import calcRecommend from './pages/calcRecommend';
import guidlines from './pages/guidlines';
import isfFasting from './pages/isfFasting';
import icrFasring from './pages/icrFasring';
import insulinFasting from './pages/insulinFasting';
import isfFastingAR from './pages/isfFastingAR';
import icrFastingAR from './pages/icrFasringAR';
import insulinFastingAR from './pages/insulinFastingAR';
import fastingProfileAR from './pages/fastingProfileAR';
import calcFastingAR from './pages/calcFastingAR';
import calcRecommendAR from './pages/calcRecommendAR';
import guidlinesAR from './pages/guidelinesAR';

global.db = SQLite.openDatabase(
  {
    name: 'iSugar.db',
    location: 'Library',
  },
  () => {
    console.log('Success')
   },
  error => {
    console.log('ERROR: ' + error);
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
           'CREATE TABLE IF NOT EXISTS KSUMC (UserID INTEGER NOT NULL, MRN TEXT NOT NULL, FOREIGN KEY("UserID") REFERENCES "UserAccount"("UserID"))',
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
           'CREATE TABLE IF NOT EXISTS patientprofile (UserID INTEGER NOT NULL, DOB TEXT NOT NULL, weightKG REAL NOT NULL, latest_HP1AC REAL NOT NULL, latest_HP1AC_date TEXT NOT NULL, typeOfGlucoseM TEXT NOT NULL, glucoseLevel_unit TEXT NOT NULL, ketonesMeasure TEXT NOT NULL, insulinRegimen TEXT NOT NULL, ISF INTEGER, targetBG_correct INTEGER, startBG_correct INTEGER, ISFIntervals INTEGER NOT NULL, insulinCalcMethod TEXT NOT NULL, fromBG INTEGER NOT NULL, toBG INTEGER NOT NULL, height REAL NOT NULL, diabetes_center TEXT NOT NULL, diagnosis_date TEXT NOT NULL, center_name TEXT, center_city TEXT, FOREIGN KEY("UserID") REFERENCES "UserAccount"("UserID"))',
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
           'CREATE TABLE IF NOT EXISTS nonPatientprofile (UserID INTEGER NOT NULL, DOB TEXT NOT NULL, weightKG REAL NOT NULL, latest_HP1AC REAL NOT NULL, latest_HP1AC_date TEXT NOT NULL, typeOfGlucoseM TEXT NOT NULL, glucoseLevel_unit TEXT NOT NULL, ketonesMeasure TEXT NOT NULL, insulinRegimen TEXT NOT NULL, ISF INTEGER, targetBG_correct INTEGER, startBG_correct INTEGER, ISFIntervals INTEGER NOT NULL, insulinCalcMethod TEXT NOT NULL, fromBG INTEGER NOT NULL, toBG INTEGER NOT NULL, FOREIGN KEY("UserID") REFERENCES "UserAccount"("UserID"))',
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
           'CREATE TABLE IF NOT EXISTS insulinPen (insulinID INTEGER PRIMARY KEY AUTOINCREMENT, UserID INTEGER NOT NULL, insulinType TEXT NOT NULL, halfORfull INTEGER NOT NULL, FOREIGN KEY("UserID") REFERENCES "UserAccount"("UserID"))',
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
           'CREATE TABLE IF NOT EXISTS bgleveltoinsulin (bgID INTEGER PRIMARY KEY AUTOINCREMENT, ssID INTEGER NOT NULL, fromTime TEXT NOT NULL, toTime TEXT NOT NULL, FOREIGN KEY("ssID") REFERENCES "ssInterval"("ssID"))',
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
           'CREATE TABLE IF NOT EXISTS takenInsulinDose (takenInsulinID INTEGER PRIMARY KEY AUTOINCREMENT, UserID INTEGER, BG_level REAL, ReasonForInsulin TEXT, CHO REAL, insulinDose REAL, Dose_time_hours INTEGER , Dose_time_minutes	INTEGER , Dose_Date_Month INTEGER , Dose_Date_Day INTEGER, Dose_Date_Year INTEGER, spicial TEXT, dateString TEXT, FOREIGN KEY("UserID") REFERENCES "UserAccount"("UserID"))',
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

    //=====
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
    //  try {
    //   db.transaction( (tx) => {
    //       tx.executeSql(
    //        'CREATE TABLE IF NOT EXISTS prevoiusExercise (takenInsulinID INTEGER NOT NULL, type TEXT NOT NULL, duration	INTEGER NOT NULL, Time	TEXT NOT NULL,  FOREIGN KEY("takenInsulinID") REFERENCES "takenInsulinDose"("takenInsulinID"))',
    //       []
    //      );
    //  })
    // } catch (error) {
    //  console.log(error);
    // }

    //===Hypo local table===
    try {
      db.transaction( (tx) => {
          tx.executeSql(
           'CREATE TABLE IF NOT EXISTS hypoglycemiaRecords(UserID INTEGER NOT NULL, DateTime TEXT, BGlevel REAL, GlucagonFlag INTEGER, Reason TEXT, Other TEXT, FOREIGN KEY("UserID") REFERENCES "UserAccount"("UserID"))',
          []
         );
     })
    } catch (error) {
     console.log(error);
    }


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
        //-------------child2 (27 food items!!!)
        try {
          db.transaction( (tx) => {
              tx.executeSql(
               'INSERT INTO CHO (foodEnglishName, foodArabicName, unit, unitArabic, gramsOfCHO) VALUES (?,?,?,?,?),(?,?,?,?,?),(?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?),(?,?,?,?,?),(?,?,?,?,?),(?,?,?,?,?), (?,?,?,?,?),(?,?,?,?,?), (?,?,?,?,?),  (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?) ',
              ['Mulukhiah (cooked Jew’s mallow)', 'ملوخية',	'cup', 'كوب' , '9', 'Cooked mix vegetable', 'خضار مشكلة مطبوخة', 'cup', 'كوب', '10', 'Green salad', 'سلطة خضراء', 'cup', 'كوب', '5', 'Fattoush salad', 'سلطة فتوش', 'cup', 'كوب', '6.5', 'Tabbouleh','تبولة','cup','كوب','12', 'Corn', 'ذرة', 'cup', 'كوب', '30', 'Mashed potato ', 'بطاطس مهروسة' ,'cup' ,'كوب' ,'30', 'Green pea','بازلاء خضراء ','cup','كوب','30', 'Squash-Pumpkin', 'قرع ', 'cup', 'كوب', '15', 'Red beans', 'فاصولياء حمراء ', 'cup', 'كوب', '30', 'White beans','فاصولياء بيضاء','cup','كوب','30', 'Sweet potato','بطاطس حلوة','cup','كوب','30', 'Vegetable juice','عصير خضروات','cup','كوب','10', 'Tomato juice', 'عصير طماطم', 'cup', 'كوب', '10', 'Watermelon seeds', 'بذور البطيخ', 'cup', 'كوب', '7', 'Sunflower seeds', 'بذور تباع (دوار) الشمس', 'cup', 'كوب', '11', 'Almond','لوز','cup','كوب','40', 'Pistachio', 'فستق ', 'cup', 'كوب', '13', 'Peanuts', 'فول سوداني (مكسرات)' ,'cup', 'كوب', '15', 'Cashew ', 'كاجو', 'cup', 'كوب', '30', 'Mixed nuts', 'مكسرات مشكلة', 'cup', 'كوب', '30', 'Coconut (shredded)','جوز الهند (مسحوق)','cup','كوب','6', 'Chickpeas (nuts)','حمص (مكسرات)','cup','كوب','68', 'Pasta', 'مكرونة', 'spoon', 'ملعقة', '1.87', 'Marquq', 'مرقوق', 'spoon', 'ملعقة', '2.5', 'Matazeez', 'مطازيز', 'spoon', 'ملعقة', '2.5', 'Jareesh', 'جريش', 'spoon', 'ملعقة', '2.5']
             );
         })
        } catch (error) {
         console.log(error);
        }
         //-------------child3 (27 food items!!!)
        try {
           db.transaction( (tx) => {
              tx.executeSql(
                'INSERT INTO CHO (foodEnglishName, foodArabicName, unit, unitArabic, gramsOfCHO) VALUES (?,?,?,?,?),(?,?,?,?,?),(?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?),(?,?,?,?,?),(?,?,?,?,?),(?,?,?,?,?), (?,?,?,?,?),(?,?,?,?,?), (?,?,?,?,?),  (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?) ',
                ['Qursan', 'قرصان',	'spoon', 'ملعقة' , '2.5', 'Harees', 'هريس', 'spoon', 'ملعقة', '2.5', 'Rice (cooked)', 'أرز (مطبوخ)', 'spoon', 'ملعقة', '2.5', 'Biryani Rice', 'أرز برياني', 'spoon', 'ملعقة', '5', 'Saleeg','سليق','spoon','ملعقة','2.5', 'Foul (cooked broad beans)', 'فول (مطبوخ)', 'spoon', 'ملعقة', '2.5', 'Addas (cooked lentil)', 'عدس (مطبوخ)' ,'spoon' ,'ملعقة' ,'2.5', 'Hunini','حنيني','spoon','ملعقة','7.5', 'Muhala (Traditional food)', 'محلى (أكلة شعبية) ', 'spoon', 'ملعقة', '7.5', 'Masoub', 'معصوب', 'spoon', 'ملعقة', '5', 'Hummus','حمص (مقبلات)','spoon','ملعقة','7.5', 'Raisins','زبيب','spoon','ملعقة','7.5', 'Sesame','سمسم','spoon','ملعقة','3.75', 'Honey', 'عسل', 'spoon', 'ملعقة', '15', 'Jam', 'مربى', 'spoon', 'ملعقة', '15', 'Sugar', 'سكر', 'spoon', 'ملعقة', '15', 'Peanut butter','زبدة الفول السوداني','spoon','ملعقة','3', 'Ketchup', 'كاتشب ', 'spoon', 'ملعقة', '3.75', 'Mustard', 'خردل' ,'spoon', 'ملعقة', '3', 'Mayonnaise ', 'مايونيز', 'spoon', 'ملعقة', '2.5', 'Samoli bread', 'خبز صامولي', 'Piece', 'حبة كاملة', '30', 'Bagel bread','خبز بيقل','Piece','حبة كاملة','60', 'Toast bread','خبز توست','Slice','شريحة واحدة','15', 'Arabic bread', 'خبز عربي', 'Piece', 'رغيف كامل', '120', 'Lebanese flat bread', 'خبز مفرود لبناني', 'Piece', 'رغيف كامل', '60', 'Rice bread', 'خبز الأرز', 'Piece', 'حبة كاملة', '15', 'Tortilla bread', 'خبز تورتيلا', 'Slice', 'شريحة واحدة', '15']
              );
           })
         } catch (error) {
          console.log(error);
        }
          //-------------child4 (27 food items!!!)
          try {
            db.transaction( (tx) => {
               tx.executeSql(
                 'INSERT INTO CHO (foodEnglishName, foodArabicName, unit, unitArabic, gramsOfCHO) VALUES (?,?,?,?,?),(?,?,?,?,?),(?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?),(?,?,?,?,?),(?,?,?,?,?),(?,?,?,?,?), (?,?,?,?,?),(?,?,?,?,?), (?,?,?,?,?),  (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?) ',
                 ['Burger bun', 'خبز برجر',	'Piece', 'حبة كاملة' , '30', 'Pancake', 'بانكيك', 'Piece', 'حبة كاملة', '15', 'Afghan bread (Tamees)', 'خبز تميس', 'Piece', 'رغيف كامل', '60', 'Rusk', 'شابورة', 'Piece', 'حبة', '7.5', 'Marasie','مراصيع','Piece','حبة','5', 'Masabeeb', 'مصابيب', 'Piece', 'حبة', '5', 'Biscuit (small size)', 'بسكويت (حجم صغير)' ,'Piece' ,'حبة' ,'3', 'Knafeh ','كنافة ','100g piece','القطعة ١٠٠جرام','30', 'Baklava', 'بقلاوة ', '26g piece', 'الحبة ٢٦ جرام', '15', 'Dates ma’amoul ', 'معمل التمر ', '40g piece', 'الحبة ٤٠ جرام', '22', 'Lokma ','لقيمات','Piece','حبة','9', 'Qatayef with cream','قطايف بالقشطة','Piece','حبة','17', 'Stuffed grape leaves','محشي ورق العنب','Piece','حبة','2.5', 'Stuffed zucchini', 'محشي الكوسا ', 'Piece', 'حبة', '13', 'Sambosa ', 'سمبوسة', 'Piece', 'حية', '7.6', 'Mutabaq ', 'مطبق', '33g piece', 'الحبة 33 جرام', '10', 'Manto','منتو','Piece','حبة','5', 'Yagmesh', 'يغمش ', 'Piece', 'حبة', '7.5', 'Kibbeh', 'كبة' ,'Piece', 'حبة', '4', 'Dates ', 'تمر', 'Piece', 'حبة', '5', 'Apple (small size)', 'تفاحة (صغيرة الحجم)', 'Piece', 'حبة كاملة', '15', 'Apricots (fresh or dried)','مشمش (طازج أو مجفف) ','Piece','حبة كاملة','3.75', 'Cherry','كرز ','Piece','حبة ','1.2', 'Grapefruit', 'جريب فروت', 'Piece', 'حبة', '30', 'Grapes (small piece)', 'عنب (حبة صغيرة)', 'Piece', 'حبة', '2', 'Kiwi', 'كيوي', 'Piece', 'حبة ', '15', 'Orange (medium size) ', 'برتقالة (متوسطة الحجم)', 'Piece', 'حبة', '15']
               );
            })
          } catch (error) {
           console.log(error);
         }
         //-------------child5 (27 food items!!!)
            try {
               db.transaction( (tx) => {
                 tx.executeSql(
                    'INSERT INTO CHO (foodEnglishName, foodArabicName, unit, unitArabic, gramsOfCHO) VALUES (?,?,?,?,?),(?,?,?,?,?),(?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?),(?,?,?,?,?),(?,?,?,?,?),(?,?,?,?,?), (?,?,?,?,?),(?,?,?,?,?), (?,?,?,?,?),  (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?),  ,  ,  ,  ,  ,  ,  ,  ,  ,   ',
                    ['Mandarin orange', 'يوسفي',	'Piece', 'حبة' , '15', 'Peach (medium size)', 'خوخ (متوسط الحجم)', 'Piece', 'حبة', '15', 'Pear (medium size)', 'كمثرى (متوسطة الحجم)', 'Piece', 'حبة', '15', 'Banana (big size)', 'موزة (كبيرة الحجم)', 'Piece', 'حبة', '30', 'Mango (big size)','مانجو (كبيرة الحجم)','Piece','حبة','30', 'Pomegranate', 'رمان', 'Piece', 'حبة', '30', 'Guava (big size)', 'جوافة (حجم كبير)' ,'Piece' ,'حبة' ,'15', 'Carrot ','جزر ','piece','حبة','2.5', 'Tomato ', 'طماطم ', 'piece', 'حبة', '5', 'Onion', 'بصل', 'piece', 'حبة', '5', 'Green bell pepper','فلفل رومي أخضر','Piece','حبة','5', 'Chestnut','كستناء (أبو فروة)','Piece','حبة','3.75', 'Pizza ','بيتزا ','107g slice','شريحة ١٠٧ جرام','36', 'Shawarma sandwich', 'ساندويتش شاورما', 'Piece', 'حبة', '14', 'Falafel', 'فلافل', 'Piece', 'حية', '31', 'Fries (small pack)', 'بطاطس مقلي (علبة صغيرة', 'piece', 'حبة', '29', 'Spring roll','سبرينغ رول','Piece','حبة','15']
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
       'CREATE TABLE IF NOT EXISTS appointments (appID INTEGER PRIMARY KEY AUTOINCREMENT, UserID INTEGER NOT NULL, appointmentDate TEXT NOT NULL, note TEXT, FOREIGN KEY("UserID") REFERENCES "UserAccount"("UserID"))',
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
       'CREATE TABLE IF NOT EXISTS Flags (UserID INTEGER NOT NULL, eMsgFlag TEXT NOT NULL, eMsgFlagDate TEXT NOT NULL, FOREIGN KEY("UserID") REFERENCES "UserAccount"("UserID"))',
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
       'CREATE TABLE IF NOT EXISTS exerciseRecords (UserID INTEGER NOT NULL, recordDate TEXT NOT NULL, recordTime TEXT NOT NULL, exerciseType TEXT NOT NULL, suggestedCorrectionDose INTEGER NOT NULL, ketonesLevel TEXT NOT NULL, ketonesSource TEXT NOT NULL, suggestCarbs TEXT NOT NULL, FOREIGN KEY("UserID") REFERENCES "UserAccount"("UserID"))',
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
       'CREATE TABLE IF NOT EXISTS exRecheckRecords (UserID INTEGER NOT NULL, recordDate TEXT NOT NULL, recordTime TEXT NOT NULL, exerciseType TEXT NOT NULL, suggestedCorrectionDose INTEGER NOT NULL, ketonesLevel TEXT NOT NULL, ketonesSource TEXT NOT NULL, suggestCarbs TEXT NOT NULL, FOREIGN KEY("UserID") REFERENCES "UserAccount"("UserID"))',
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
       'CREATE TABLE IF NOT EXISTS exRecheckNotification (UserID INTEGER NOT NULL, recheckDate TEXT NOT NULL, recheckTime TEXT NOT NULL, FOREIGN KEY("UserID") REFERENCES "UserAccount"("UserID"))',
      []
     );
 })
} catch (error) {
 console.log(error);
}

//----------recheck notification for Sick day----------
try {
  db.transaction( (tx) => {
      tx.executeSql(
       'CREATE TABLE IF NOT EXISTS SDRecheckNotification (UserID INTEGER NOT NULL, recheckDate TEXT NOT NULL, recheckTime TEXT NOT NULL, FOREIGN KEY("UserID") REFERENCES "UserAccount"("UserID"))',
      []
     );
 })
} catch (error) {
 console.log(error);
}
// ----------SickDay record----------
try {
  db.transaction( (tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS sickDayRecords (UserID INTEGER NOT NULL, recordDate TEXT NOT NULL, recordTime TEXT NOT NULL, KetonesSource TEXT NOT NULL, KetonesLevel TEXT NOT NULL, isMeal TEXT NOT NULL, mealTime TEXT NULL, Carbs REAL NULL, TDD REAL NULL, tableName TEXT NULL, FOREIGN KEY("UserID") REFERENCES "UserAccount"("UserID"))',
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
       'CREATE TABLE IF NOT EXISTS ssIntervalFasting (ssID INTEGER PRIMARY KEY AUTOINCREMENT, UserID INTEGER NOT NULL, fromTime TEXT NOT NULL, toTime TEXT NOT NULL, FOREIGN KEY("UserID") REFERENCES "UserAccount"("UserID"))',
      []
     );
 })
} catch (error) {
 console.log(error);
}

try {
  db.transaction( (tx) => {
      tx.executeSql(
       'CREATE TABLE IF NOT EXISTS fasting (UserID INTEGER NOT NULL, recordDate TEXT NOT NULL, recordTime TEXT NOT NULL, profileEntry TEXT NOT NULL, FOREIGN KEY("UserID") REFERENCES "UserAccount"("UserID"))',
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
       'CREATE TABLE IF NOT EXISTS takenInsulinDoseFasting (takenInsulinID INTEGER PRIMARY KEY AUTOINCREMENT, UserID INTEGER NOT NULL, BG_level REAL NOT NULL, ReasonForInsulin TEXT NOT NULL, CHO REAL NOT NULL, insulinDose INTEGER NOT NULL, Dose_time_hours INTEGER NOT NULL, Dose_time_minutes	INTEGER NOT NULL, Dose_Date_Month INTEGER NOT NULL, Dose_Date_Day INTEGER NOT NULL, Dose_Date_Year INTEGER NOT NULL, FOREIGN KEY("UserID") REFERENCES "UserAccount"("UserID"))',
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
       'CREATE TABLE IF NOT EXISTS plannedExerciseFasting (takenInsulinID INTEGER NOT NULL, type TEXT NOT NULL, duration	INTEGER NOT NULL,  FOREIGN KEY("takenInsulinID") REFERENCES "takenInsulinDose"("takenInsulinID"))',
      []
     );
 })
} catch (error) {
 console.log(error);
}

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
// try {
//   db.transaction( (tx) => {
//       tx.executeSql(
//        'CREATE TABLE IF NOT EXISTS pumpFailure (pumpID INTEGER NOT NULL, recordDate TEXT NOT NULL, recordTime	TEXT NOT NULL, startingDose	REAL NOT NULL,  FOREIGN KEY("takenInsulinID") REFERENCES "takenInsulinDose"("takenInsulinID"))',
//       []
//      );
//  })
// } catch (error) {
//  console.log(error);
// }
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

global.onlinUserID = 123;
global.uID = '';
global.centName = '';
global.centCity = '';
global.Diabetescenter = '';
global.DOD = '';
global.weightKG = 0;
global.heightCM = 0;
global.DOBirth = '';
global.DOLatestHB1AC = '';
global.latestHB1AC_ = 0;
global.glucoseUnit = '';
global.insulinReg = '';
global.ketonesMeasure = '';
global.bgTarget = 0;
global.bgStart = 0;
global.fromBG = 0;
global.toBG = 0;
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
global.hBGlevel = 0;
global.glucaFlag = 0;// 0 is false 1 is true
//============================================
//============Home Global vars================
global.fromBGHome = -1;
global.toBGHome = -1;
//============================================
//===========Calcs Global vars================
global.totalInulin = 0;
global.howText = '-';//const [howText, setHowText] = useState('-'); //How was the insulin calculated
global.bgLevelDB = 0;
global.reasonDB = '';
global.choDB = '';
//==========================

  // ====== ISF intervals ========== //
  global.ISFfromTimes = []; //const [fromTime, setFromTime] = useState([]);
  global.ISFtoTimes = []; //const [toTime, setToTime] = useState([]);
  global.ISFs = [];//const [isf, setISF] = useState([]);
  global.ISFsTragetBG = [];//const [tBG, setTBG] = useState([]);
  global.ISFsStartBG = [];// const [sBG, setSBG] = useState([]);
  //======== ICR AND SS========= //
  global.ICRarr = [];//const [ICRarr, setICRarr] = useState([]);
  global.ICR = 0;//const [ICR, setICR] = useState(0);
  global.SlidingScaleArr = [];//const [SlidingScaleArr, setSlidingScaleArr] = useState([]);
  global.SlidingScale = 0;//const [SlidingScale, setSlidingScale] = useState(0);


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
  global.prevArr = [];
//=======  Final Sprint ==========//
global.specialLog = '';


global.diagnos = '';
global.DOB = '';
global.fName = '';
global.lName = '';
global.weigh = '';

global.isfAllInt = [];
global.isfAll = [];
isInteee = 0;


const Stack = createNativeStackNavigator();

const mainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="logo" component={logoScreen}  /> 
        <Stack.Screen name="logoAR" component={logoScreenAR}  />
        <Stack.Screen name="login" component={logIn} />
        <Stack.Screen name="logInAR" component={logInAR} />
         <Stack.Screen name="signup" component={signUp} />
         <Stack.Screen name="signupAR" component={signUpAR} />
        <Stack.Screen name="temp" component={disclaimer} />
        <Stack.Screen name="accinfo" component={AccInfo} />
        <Stack.Screen name="AccEdit" component={AccInfoEdit} />
        <Stack.Screen name="clinic" component={clinicInfo} />
        <Stack.Screen name="clinicEdit" component={clinicEdit} />
        <Stack.Screen name="warning" component={warning} />
        <Stack.Screen name="personal" component={personalInfo} />
        <Stack.Screen name="personalEdit" component={personalEdit} />
        <Stack.Screen name="personalAR" component={personalInfoAR} />
        <Stack.Screen name="ketones" component={ketones} />
        <Stack.Screen name="ketonesEdit" component={ketonesEdit} />
        <Stack.Screen name="insulin" component={insulin} />
        <Stack.Screen name="isf" component={isf} />
        <Stack.Screen name="icr" component={icr} />
        <Stack.Screen name="accAR" component={AccInfoAR}  /> 
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
        <Stack.Screen name="Home" component={AuthStack} />
        <Stack.Screen name="HomeAR" component={AuthStackAR} />
        <Stack.Screen name="appointments" component={appointments} />
        <Stack.Screen name="appointmentsAR" component={appointmentsAR} />
        <Stack.Screen name="check" component={checkFirst}  />
        <Stack.Screen name="exercise" component={exercise}  />
        <Stack.Screen name="exercise3" component={exercise3}  />
        <Stack.Screen name="recheckExercise" component={recheckExercise}  />
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
        <Stack.Screen name="isfFasting" component={isfFasting}  />
        <Stack.Screen name="icrFasting" component={icrFasring}  />
        <Stack.Screen name="insulinFasting" component={insulinFasting}  />
        <Stack.Screen name="fastingProfile" component={fastingProfile}  />
        <Stack.Screen name="calcFasting" component={calcFasting}  />
        <Stack.Screen name="calcRecommend" component={calcRecommend}  />
        <Stack.Screen name="guidlines" component={guidlines}  />
        <Stack.Screen name="isfFastingAR" component={isfFastingAR}  />
        <Stack.Screen name="icrFastingAR" component={icrFastingAR}  />
        <Stack.Screen name="insulinFastingAR" component={insulinFastingAR}  />
        <Stack.Screen name="fastingProfileAR" component={fastingProfileAR}  />
        <Stack.Screen name="calcFastingAR" component={calcFastingAR}  />
        <Stack.Screen name="calcRecommendAR" component={calcRecommendAR}  />
        <Stack.Screen name="guidlinesAR" component={guidlinesAR}  />
        <Stack.Screen name="insuResult" component={insuResult}  />
        <Stack.Screen name="insuResultAR" component={insuResultAR}  />
        <Stack.Screen name="passEAR" component={passEAR}  />
        <Stack.Screen name="pass" component={pass}  />
        <Stack.Screen name="accEAR" component={AccInfoAREdit}  />
        <Stack.Screen name="howCalc" component={howCalc}  />

      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default mainStack;
