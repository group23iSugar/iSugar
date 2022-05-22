/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-shadow */
/* eslint-disable eqeqeq */
import {useState} from 'react';
import {Alert, alert} from 'react-native';
import timeCompare from './timeCompare';

const insulinAB = function(bgLevel, isMeal, CHO){

 //variables
 const [ReData1, setReData1] = useState({
     startBG: 0,
     targetBG: 0,
     ISF: 0,
  });

  const [ReData2, setReData2] = useState({
    insulinType: '',
  });
  const [halfOrFull, sethalfOrFull] = useState(1);
  // ====== ISF ========== //
  const [fromTime, setFromTime] = useState([]);
  const [toTime, setToTime] = useState([]);
  const [isf, setISF] = useState([]);
  const [tBG, setTBG] = useState([]);
  const [sBG, setSBG] = useState([]);
  //======== ICR AND SS========= //
  const [ICRarr, setICRarr] = useState([]);
  const [ICR, setICR] = useState(0);
  const [SlidingScaleArr, setSlidingScaleArr] = useState([]);
  const [SlidingScale, setSlidingScale] = useState(0);
  // ======= Patient Profile ===== //
  const [calcMethod, setCalcM] = useState('');
  const [isIsfInterval, setInterval] = useState(-1);
  const [insulinReg, setReg] = useState('');
  const [insulinType, setType] = useState('');
  const [isfP, setISFP] = useState(-1); // p indicates patient ;) these values won't be retreived unless isf interval = 0: All day
  const [tBGP, setTBGP] = useState(-1);
  const [sBGP, setSBGP] = useState(-1);

   const calculation = async () => {
   FirstRetrieve();
   retrieve();
   secondretrieve();
   retrieve3();

  if (isIsfInterval == 1){
     checkISFIntervals(); //Retrives from DB
    }
   };
    var a;
    var b;
    var c = 0;
    var flag = 'false';

    calculation();

    if (
        (insulinReg == 'Pen' || insulinReg == 'pen') &&
        (ReData2.insulinType == 'Aspart' ||
          ReData2.insulinType == 'Lispro' ||
          ReData2.insulinType == 'Glulisine')
      ) {
          //did NOT recheck before two hours ago
        if (bgLevel > 70) {
            if (flag == 'false'){
                if (isMeal == 'Yes'){
          if (calcMethod == 'ICR') {
            console.log('is ICR?');
             checkICRIntervals();
            a = CHO / ICR;
            console.log('a: ' + a);
            if (bgLevel > ReData1.startBG) {
              b = (bgLevel - ReData1.targetBG) / ReData1.ISF;
              console.log('b: ' + b);
            } else {
              b = 0;
            }
            c = a + b;
        }//end of ICR
        else {// if calcMethod is Sliding scale
            checkSSIntervals();
            console.log('is Sliding?');
            c = SlidingScale; // from database
            console.log('this is c: ' + c + ' And Sliding: ' + SlidingScale);
            }//end of S.S
        }//end of isMeal ==yes
        else {
           a = 0;
           console.log('a: ' + a);
           if (bgLevel > ReData1.startBG) {
             b = (bgLevel - ReData1.targetBG) / ReData1.ISF;
           } else {
             b = 0;
           }
           c = a + b;
        }//end of isMeal == NO

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
    if (isMeal == 'Yes') {
        //if is not a meal time then no CHO
          a = CHO / ICR;
          b = 0;
          c = a + b;
          console.log('c value: ' + c);
        }
        //if NOT A MEAL TIME
        else {
            c = 0;
        }
    }//if ICR
    else {
        if (isMeal == 'Yes') {
            checkSSIntervals();
            console.log('is Sliding?');
            c = SlidingScale; // from database
            console.log('this is c: ' + c + ' And Sliding: ' + SlidingScale);
            }
            //if NOT A MEAL TIME
            else {
                if (bgLevel > ReData1.startBG) {
                    b = (bgLevel - ReData1.targetBG) / ReData1.ISF;
                  }
                c = b;
            }
    }//if S.s
}// if flag == yes
}//if it BG level is >70
      }//if pen
else {
  alert(
    'Your Insulin type is not supported in this application. Please contact your Diabetes center for instruction & recommendations for insulin bolus calculation & dose determination',
  );
}//if insulin type not pen

// insulinRegimen, ISFIntervals, insulinCalcMethod Retrive
const FirstRetrieve = () => {
    var interval = -1;
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
                console.log(interval);
                setInterval(interval);
                var calcM = rows.item(i).insulinCalcMethod; // ICR or SS
                console.log(calcM);
                setCalcM(calcM);
                var insulinR = rows.item(i).insulinRegimen; // pen , pump , etc..
                console.log(insulinR);
                setReg(insulinR);
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

 //interval is wither the user is using isf intervals or not ( 1 or 0)
  const retrieve = () => {
    console.log('in second');
    console.log(isIsfInterval);
    if (isIsfInterval != -1) {
      if (isIsfInterval == 1) {
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
                  if (UID == 1) {
                    //user id
                    var from = rows.item(i).fromTime;
                    setFromTime(fromTime => [...fromTime, from]);
                    var to = rows.item(i).toTime;
                    setToTime(toTime => [...toTime, to]);
                    var ISF_ = rows.item(i).ISF;
                    setISF(isf => [...isf, ISF_]);
                    var target = rows.item(i).targetBG_correct;
                    setTBG(tBG => [...tBG, target]);
                    var start = rows.item(i).startBG_correct;
                    setSBG(sBG => [...sBG, start]);
                    //  التخزين في ارايز
                  }
                }
              },
            );
          });
        } catch (error) {
          console.log(error);
        }
      } else if (isIsfInterval == 0) {
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
                    setISFP(ISF_);
                    var target = rows.item(i).targetBG_correct;
                    setTBGP(target);
                    var start = rows.item(i).startBG_correct;
                    setSBGP(start);

                    setReData1({
                      startBG: start,
                      targetBG: target,
                      ISF: ISF_,
                    });
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
  const secondretrieve = () => {
    //calcM??
    console.log('inside is: ' + calcMethod);
    if (calcMethod == 'ICR') {
      var tempArr = [...ICRarr]; // array of obj
      try {
        db.transaction(tx => {
          tx.executeSql(
            'SELECT icrID, fromTime, toTime, ICR FROM icrInterval WHERE UserID=?',
            [1],
            (tx, results) => {
              var rows = results.rows;
              for (let i = 0; i < rows.length; i++) {
                console.log('hello?1?************8');
                tempArr.push({
                  id: rows.item(i).icrID,
                  from: rows.item(i).fromTime,
                  to: rows.item(i).toTime,
                  icr: rows.item(i).ICR,
                });
              }
              setICRarr([...tempArr]);
              console.log(tempArr + 'This is icr arr');
            },
          );
        });
      } catch (error) {
        console.log(error);
      }
    } else if (calcMethod == 'Sliding Scale') {
      console.log('hello Sliding');
      var tempArr = [...SlidingScaleArr];
      try {
        db.transaction(tx => {
          tx.executeSql(
            'SELECT ssID, fromTime, toTime FROM ssInterval WHERE UserID=?',
            [1],
            (tx, results) => {
              var rows = results.rows;
              for (let i = 0; i < rows.length; i++) {
                tempArr.push({
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
                          tempArr[i].Rnages.push({
                            id: rows2.item(j).bgID,
                            BGFrom: rows2.item(j).fromBGLevel,
                            BGTo: rows2.item(j).toBGLevel,
                            insulin: rows2.item(j).insulinDose,
                          });
                          console.log(tempArr[i].Rnages[j]);
                        }

                        setSlidingScaleArr([...tempArr]);
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
                sethalfOrFull(rows.item(i).halfORfull);
                console.log(ReData2.insulinType);

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

  //Choose ISF , Start BG , Target Bg based on current time
  const checkISFIntervals = () => {
    console.log('i got called');
    var index = -1;
    for (let i = 0; i < fromTime.length; i++) {
      // icr: icr.length - ss: SlidingScale.length
      if (timeCompare(fromTime[i], toTime[i])) {
        // icr: (icr[i].from,icr[i].to) -  ss: (SlidingScale[i].from, SlidingScale[i].to )
        console.log('index: ' + i);
        index = i;
        console.log('found interval at: ' + index);

        setReData1({
          ...ReData1,
          ISF: isf[index],
          startBG: sBG[index],
          targetBG: tBG[index],
        });
        console.log(
          ReData1.ISF + ReData1.startBG + ReData1.targetBG + 'Did u work?',
        );
        // return index;
      } else {
        console.log('not found interval');
      }
    }
  };

  //Choose ICR based on current time
  const checkICRIntervals = () => {
    var index = -1;
    for (let i = 0; i < ICRarr.length; i++) {
      // icr: icr.length - ss: SlidingScale.length
      console.log('i got called ICR');
      if (timeCompare(ICRarr[i].from, ICRarr[i].to)) {
        // icr: (icr[i].from,icr[i].to) -  ss: (SlidingScale[i].from, SlidingScale[i].to )
        console.log('index: ' + i);
        index = i;
        console.log('found interval at: ' + index);

        setICR(ICRarr[index].icr);

        console.log(ICR + '  Did u work?');
        // return index;
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

console.log('sum of insulin A+B is: ' + c);
  return c;
};

export default insulinAB;
