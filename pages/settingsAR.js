<<<<<<< HEAD
/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text, Dimensions, TouchableOpacity, Alert, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import react from 'react';
//import About from './About';
//import Entypo from 'react-native-vector-icons/Entypo';
import RadioForm from 'react-native-simple-radio-button';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import SQLite from 'react-native-sqlite-storage';


//======Local Database======//
global.onlinUserID = '';
global.uID = '162';

const Setting = ({navigation}) => {

  var Language  = [
    {label: 'English', value: 'English', valueIndex: 0},
    {label: 'العربية', value: 'العربية', valueIndex: 1},
    ];

  const twoOptionAlert = () => {
  Alert.alert(
    //Title
    'تغيير اللغة',
    //body
    'هل أنت متأكد من أنك تريد تغيير اللغة؟',
    [
      {
        text: 'إلغاء',
        onPress: () => {
        console.log('Cancel pressed');
        },
      },
      {
        text: 'حسنًا',
        onPress: () => {
        console.log('OK pressed');
        //navigation.navigate('setting');
        //allOperation();
        },
      },
    ]

  );
  };//end twoOption

  const logOutAlert = () => {
    Alert.alert(
      //Title
      'تسجيل الخروج',
      //body
      ' هل أنت متأكد أنك تريد تسجيل الخروج؟ في حال كان حسابك من نوع غير مصاب سيتم حذفه نهائيًا',
    //  'if your account of type non-patient account it will delete it',
      [
        {
          text: 'إلغاء',
          onPress: () => {
          console.log('Cancel pressed');
          },
        },
        {
          text: 'حسنًا',
          onPress: () => {
            allOperation();
          },
        },
      ]

    );
    };//end logoutalert

  const [dbData, setDbData] = useState({
    accountT:'',
  });

  const [dbData2, setDbData2] = useState({
    center:'',
    insulinR: '',
    isfInter: '',
    insulinCalc: '',
  });

  const [dbData3, setDbData3] = useState({
    slidingID:'',
  });

  const [dbData4, setDbData4] = useState({
    takenInsulinID:'',
  });
   useEffect(() => {
    languageState('English');

    FirstRetreive();//select from user Account
    SecondRetreive();//select from patient
    ThirdRetreive();//slect from sliding
    ForthRetreive();//slecet from taken insulin

      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
  const [data, setData] = react.useState({
    currentLanguage: '',
  });

  const languageState = (value) => {
      setData({
        ...data,
        currentLanguage: value,
      });
    };
 // const [visible, setVisible] = react.useState(false);
////////////////////////////////////////////SELECT QUERIES//////////////////////////////////////////////
  const FirstRetreive = ()=>{
    try {
        console.log('in try');
        db.transaction( (tx) => {
            tx.executeSql(
              'SELECT UserID, accountType FROM UserAccount',
              [],
              (tx, results) => {
                var rows = results.rows;
                for (let i = 0; i < rows.length; i++) {
                    var userID = rows.item(i).UserID;
                    // eslint-disable-next-line eqeqeq
                    if (userID == uID){
                      console.log('hi from getlocalInfo:');
                      setDbData({
                        ...dbData,
                        accountT: rows.item(i).accountType,
                      });
                      console.log('account type: ', dbData.accountT);
                     // getLocalInfo2();//select from patient acc
                      return;
                    }//end if
                  }//end for
              }//end results
    // eslint-disable-next-line semi
    )//end executeSql
    // eslint-disable-next-line semi
    }  )//db,transaction
    } catch (error) {
       console.log(error);
    }//end catch
};//end method
//---------------------------------------------------------------
const SecondRetreive = ()=>{
  try {
      console.log('in try 2');
      db.transaction( (tx) => {
          tx.executeSql(
            'SELECT UserID, insulinRegimen, ISFIntervals, insulinCalcMethod, diabetes_center FROM patientprofile',
            [],
            (tx, results) => {
              var rows = results.rows;
              for (let i = 0; i < rows.length; i++) {
                  var userID = rows.item(i).UserID;
                  // eslint-disable-next-line eqeqeq
                  if (userID == uID){
                    console.log('hi from inside info2:');
                    setDbData2({
                      ...dbData2,
                      center: rows.item(i).diabetes_center,
                      insulinR: rows.item(i).insulinRegimen,
                      isfInter: rows.item(i).ISFIntervals,
                      insulinCalc: rows.item(i).insulinCalcMethod,
                    });
                    console.log( dbData2.center + '-' + dbData2.insulinR + '-' + dbData2.isfInter + '-' + dbData2.insulinCalc);
                    return;
                  }//end if
                }//end for
            }//end results
  // eslint-disable-next-line semi
  )//end executeSql
  // eslint-disable-next-line semi
  }  )//db,transaction
  } catch (error) {
     console.log(error);
  }//end catch
};//end method
//--------------------------------------------------------------------
const ThirdRetreive = ()=>{
  try {
      console.log('in try 3');
      db.transaction( (tx) => {
          tx.executeSql(
            'SELECT UserID, ssID FROM ssInterval',
            [],
            (tx, results) => {
              var rows = results.rows;
              for (let i = 0; i < rows.length; i++) {
                  var userID = rows.item(i).UserID;
                  // eslint-disable-next-line eqeqeq
                  if (userID == uID){
                    console.log('hi from inside info3:');
                    setDbData3({
                      ...dbData3,
                     slidingID: rows.item(i).ssID,
                    });
                    console.log('Sliding ID: ',dbData3.slidingID);
                    return;
                  }//end if
                }//end for
            }//end results
  // eslint-disable-next-line semi
  )//end executeSql
  // eslint-disable-next-line semi
  }  )//db,transaction
  } catch (error) {
     console.log(error);
  }//end catch
};//end metho
//--------------------------------------------------------------------
const ForthRetreive = ()=>{
  try {
      console.log('in try 4');
      db.transaction( (tx) => {
          tx.executeSql(
            'SELECT UserID, takenInsulinID FROM takenInsulinDose',
            [],
            (tx, results) => {
              var rows = results.rows;
              for (let i = 0; i < rows.length; i++) {
                  var userID = rows.item(i).UserID;
                  // eslint-disable-next-line eqeqeq
                  if (userID == uID){
                    console.log('hi from inside info4:');
                    setDbData4({
                      ...dbData4,
                     takenInsulinID: rows.item(i).takenInsulinID,
                    });
                    console.log('taken insulin ID: ',dbData4.takenInsulinID);
                    return;
                  }//end if
                }//end for
            }//end results
  // eslint-disable-next-line semi
  )//end executeSql
  // eslint-disable-next-line semi
  }  )//db,transaction
  } catch (error) {
     console.log(error);
  }//end catch
};//end method
//--------------------------------------------------------------------

const SelectUsers = () => {
  try {
    console.log('in try');
    db.transaction( (tx) => {
        tx.executeSql(
          'SELECT UserID, accountType FROM UserAccount',
          [],
          (tx, results) => {
            var rows = results.rows;
            for (let i = 0; i < rows.length; i++) {
                var userID = rows.item(i).UserID;
                console.log(userID);
                // eslint-disable-next-line eqeqeq
                if (userID == uID){
                  console.log('hi from select users:');
                  setDbData({
                    ...dbData,
                    accountT: rows.item(i).accountType,
                  });
                  console.log('account type: ', dbData.accountT);
                 // getLocalInfo2();//select from patient acc
                  return;
                }//end if
              }//end for
          }//end results
// eslint-disable-next-line semi
)//end executeSql
// eslint-disable-next-line semi
}  )//db,transaction
} catch (error) {
   console.log(error);
}//end catch
};

//////////////////////////////////////////////////////END SELECT QUERIES////////////////////////////////////////

///////////////////////////////METHOD FOR DELETE QUERIES////////////////////////////////////////////
const allOperation = () => {
  //navigation.navigate('l');
  navigation.navigate('lo');
  //deleteUserAccount();
  DeleteAll();
  console.log('hello');
// eslint-disable-next-line semi
}
const DeleteAll = () => {

  deleteUserAccount();

  // eslint-disable-next-line eqeqeq
  if (dbData.accountT == 'Patient Account'){
// eslint-disable-next-line eqeqeq
    if (dbData2.center == '1'){
      deleteKSUMC();
    }//end center
    deletePatient();
  }//end if type patient

  // eslint-disable-next-line eqeqeq
  else if (dbData.accountT == 'Non-Patient Account'){
    deleteNonPatient();
  }//end if type non-patient

  // eslint-disable-next-line eqeqeq
  if (dbData2.insulinR == 'Pen'){
    deleteInsulinPen();
  } else {
    deleteInsulinOther();
  }//end insulin type

  // eslint-disable-next-line eqeqeq
  if (dbData2.isfInter == '1'){
    deleteISFInterval();
  }

  // eslint-disable-next-line eqeqeq
  if (dbData2.insulinCalc == 'ICR'){
    deleteICRInterval();
  // eslint-disable-next-line eqeqeq
  } else if (dbData2.insulinCalc == 'Sliding Scale'){
    deleteSSInterval();
    deleteBGlevel();
  }

  // eslint-disable-next-line eqeqeq
  if (dbData4.takenInsulinID != ''){
    deleteTakenInsulin();
    deletePlannedEx();
    deletePrevEx();
  }
  SelectUsers();
// eslint-disable-next-line semi
}//end DeleteAll method

///////////////////////////////////////////DELETE QUERIES/////////////////////////////////////
  const deleteUserAccount = () => {
    try {
      console.log('in try delete user account');
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM UserAccount WHERE UserID = ?',
           [uID],
         (tx, results) => {
          console.log('Results', results.rowsAffected);
                 if (results.rowsAffected > 0) {
                   console.log(uID);
                console.log('record delete successfully');
                      }//end if
      }//result
        // eslint-disable-next-line semi
        )//end executesql
    // eslint-disable-next-line semi
    })
  } catch (error) {
    console.log(error);
 }//end catch
  // eslint-disable-next-line semi
  }
  //end const

  const deletePatient = () => {
    try {
      console.log('in try delete patient');
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM patientprofile WHERE UserID = ?',
           [uID],
         (tx, results) => {
          console.log('Results', results.rowsAffected);
                 if (results.rowsAffected > 0) {
                   console.log(uID);
                console.log('record delete successfully');
                      }//end if
      }//result
        // eslint-disable-next-line semi
        )//end executesql
    // eslint-disable-next-line semi
    })
  } catch (error) {
    console.log(error);
 }//end catch
  // eslint-disable-next-line semi
  }
  //end const

  const deleteNonPatient = () => {
    try {
      console.log('in try delete non-patient');
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM nonPatientprofile WHERE UserID = ?',
           [uID],
         (tx, results) => {
          console.log('Results', results.rowsAffected);
                 if (results.rowsAffected > 0) {
                   console.log(uID);
                console.log('record delete successfull ');
                      }//end if
      }//result
        // eslint-disable-next-line semi
        )//end executesql
    // eslint-disable-next-line semi
    })
  } catch (error) {
    console.log(error);
 }//end catch
  // eslint-disable-next-line semi
  }
  //end const

  const deleteKSUMC = () => {
    try {
      console.log('in try delete ksumc');
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM KSUMC WHERE UserID = ?',
           [uID],
         (tx, results) => {
          console.log('Results', results.rowsAffected);
                 if (results.rowsAffected > 0) {
                   console.log(uID);
                console.log('record delete successfully');
                      }//end if
      }//result
        // eslint-disable-next-line semi
        )//end executesql
       // SelectMRN();
    // eslint-disable-next-line semi
    })

  } catch (error) {
    console.log(error);
 }//end catch
  // eslint-disable-next-line semi
  }
  //end const

  const deleteInsulinPen = () => {
    try {
      console.log('in try delete insulin pen');
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM insulinPen WHERE UserID = ?',
           [uID],
         (tx, results) => {
          console.log('Results', results.rowsAffected);
                 if (results.rowsAffected > 0) {
                   console.log(uID);
                console.log('record delete successfully');
                      }//end if
      }//result
        // eslint-disable-next-line semi
        )//end executesql
    // eslint-disable-next-line semi
    })
  } catch (error) {
    console.log(error);
 }//end catch
  // eslint-disable-next-line semi
  }
  //end const

  const deleteInsulinOther = () => {
    try {
      console.log('in try delete insulin other');
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM insulinOther WHERE UserID = ?',
           [uID],
         (tx, results) => {
          console.log('Results', results.rowsAffected);
                 if (results.rowsAffected > 0) {
                   console.log(uID);
                console.log('record delete successfully');
                      }//end if
      }//result
        // eslint-disable-next-line semi
        )//end executesql
    // eslint-disable-next-line semi
    })
  } catch (error) {
    console.log(error);
 }//end catch
  // eslint-disable-next-line semi
  }
  //end const

  const deleteISFInterval = () => {
    try {
      console.log('in try delete isf interval');
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM isfInterval WHERE UserID = ?',
           [uID],
         (tx, results) => {
          console.log('Results', results.rowsAffected);
                 if (results.rowsAffected > 0) {
                   console.log(uID);
                console.log('record delete successfully');
                      }//end if
      }//result
        // eslint-disable-next-line semi
        )//end executesql
    // eslint-disable-next-line semi
    })
  } catch (error) {
    console.log(error);
 }//end catch
  // eslint-disable-next-line semi
  }
  //end const

  const deleteICRInterval = () => {
    try {
      console.log('in try delete icr interval');
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM icrInterval WHERE UserID = ?',
           [uID],
         (tx, results) => {
          console.log('Results', results.rowsAffected);
                 if (results.rowsAffected > 0) {
                   console.log(uID);
                console.log('record delete successfully');
                      }//end if
      }//result
        // eslint-disable-next-line semi
        )//end executesql
    // eslint-disable-next-line semi
    })
  } catch (error) {
    console.log(error);
 }//end catch
  // eslint-disable-next-line semi
  }
  //end const

  const deleteSSInterval = () => {
    try {
      console.log('in try delete ss interval');
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM ssInterval WHERE UserID = ?',
           [uID],
         (tx, results) => {
          console.log('Results', results.rowsAffected);
                 if (results.rowsAffected > 0) {
                   console.log(uID);
                console.log('record delete successfully');
                      }//end if
      }//result
        // eslint-disable-next-line semi
        )//end executesql
    // eslint-disable-next-line semi
    })
  } catch (error) {
    console.log(error);
 }//end catch
  // eslint-disable-next-line semi
  }
  //end const

  const deleteBGlevel = () => {
    try {
      console.log('in try delete bg level');
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM bgleveltoinsulin WHERE ssID = ?',
           [dbData3.slidingID],
         (tx, results) => {
          console.log('Results', results.rowsAffected);
                 if (results.rowsAffected > 0) {
                   console.log(uID);
                   console.log(dbData3.slidingID);
                console.log('record delete successfully');
                      }//end if
      }//result
        // eslint-disable-next-line semi
        )//end executesql
    // eslint-disable-next-line semi
    })
  } catch (error) {
    console.log(error);
 }//end catch
  // eslint-disable-next-line semi
  }
  //end const

  const deleteTakenInsulin = () => {
    try {
      console.log('in try delete taken insulin');
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM takenInsulinDose WHERE UserID = ?',
           [uID],
         (tx, results) => {
          console.log('Results', results.rowsAffected);
                 if (results.rowsAffected > 0) {
                   console.log(uID);
                   console.log(dbData4.takenInsulinID);
                console.log('record delete successfully');
                      }//end if
      }//result
        // eslint-disable-next-line semi
        )//end executesql
    // eslint-disable-next-line semi
    })
  } catch (error) {
    console.log(error);
 }//end catch
  // eslint-disable-next-line semi
  }
  //end const

  const deletePlannedEx = () => {
    try {
      console.log('in try delete planned exercise');
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM plannedExercise WHERE takenInsulinID = ?',
           [dbData4.takenInsulinID],
         (tx, results) => {
          console.log('Results', results.rowsAffected);
                 if (results.rowsAffected > 0) {
                   console.log(uID);
                   console.log(dbData4.takenInsulinID);
                console.log('record delete successfully');
                      }//end if
      }//result
        // eslint-disable-next-line semi
        )//end executesql
    // eslint-disable-next-line semi
    })
  } catch (error) {
    console.log(error);
 }//end catch
  // eslint-disable-next-line semi
  }
  //end const

  const deletePrevEx = () => {
    try {
      console.log('in try delete prevoius exercise');
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM prevoiusExercise WHERE takenInsulinID = ?',
           [dbData4.takenInsulinID],
         (tx, results) => {
          console.log('Results', results.rowsAffected);
                 if (results.rowsAffected > 0) {
                   console.log(uID);
                   console.log(dbData4.takenInsulinID);
                console.log('record delete successfully');
                      }//end if
      }//result
        // eslint-disable-next-line semi
        )//end executesql
    // eslint-disable-next-line semi
    })
  } catch (error) {
    console.log(error);
 }//end catch
  // eslint-disable-next-line semi
  }
  //end const
//////////////////////////////////////////////////////END DELETE QUERIES///////////////////////////////////////////
  return (
 <View style={styles.container}>
   <LinearGradient colors={['#E7EFFA', '#E7EFFA','#AABED8']} style={styles.container}>
   <View style={{top: 10, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', padding: 30}}>
        <Image source={require('../images/logo.png')} style={styles.pic} />
        <TouchableOpacity onPress={()=>navigation.openDrawer()}>
         <Entypo name="menu" color="#05375a" size={35} />
         </TouchableOpacity>
      </View>


    <View style={styles.footer}>
    <View style={{flexDirection: 'row' ,marginLeft:5, paddingTop: 30 }}>
      <Fontisto name="world-o" color="#05375a" size={22}/>
       <Text style={styles.title}>اللغة</Text>
      </View>
      <View style={styles.radioB}>
         <RadioForm
          radio_props = {Language}
          onPress={ twoOptionAlert }
          buttonSize = {15}
          buttonOuterSize = {25}
          buttonColor= "#AABED8"
          selectedButtonColor = "#8FA5C1"
          labelStyle = {{fontSize: 20, color: '#05375a', padding: 10}}
          formHorizontal={false}
         />
        </View>
    </View>

    <View style={{marginBottom: 30}}>
  <View style={{flexDirection: 'row' ,marginLeft:20, paddingTop: 50 }}>
       <MaterialIcons name="account-circle" color="#05375a" size={22}/>
       <Text style={styles.title}>الحساب</Text>
     </View>
        <View style={styles.buttonV}>
           <TouchableOpacity>
             <LinearGradient
               colors={['#fff', '#fff', '#fff']}
               style={styles.buttonR}>
                <SimpleLineIcons name="logout" color="#05375a" size={22}/>
               <Text
                onPress={ logOutAlert }
               style={styles.titleB}
               >
                 تسجيل الخروج
                 </Text>
             </LinearGradient>
            </TouchableOpacity>
         </View>
         </View>
         </LinearGradient>
 </View>
  );
};

const {height} = Dimensions.get('screen');
const height_logo = height * 0.15;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  pic: {

    width: height_logo,
    height: height_logo,
    marginRight: 10,
},
    title: {
      color: '#05375a',
      fontSize: 18,
      fontWeight: 'bold',
      marginLeft: 10,
      marginBottom: -10,
    },

  footer: {
      flex: 1,
      width: 380,
      height: 50,
      marginTop: 10,
      marginBottom: -100,
      marginLeft: 15,
      backgroundColor: '#fff',
      borderRadius: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 10,
  },
  titleB: {
    color: '#05375a',
    fontSize: 18,
    marginLeft: 15,
    marginTop: -10,
  },
  radioB :{
    marginTop: 25,
    justifyContent: 'space-between',
    padding: 10,
    paddingTop:5,
    marginBottom: 10,
    },
    buttonV: {
      marginTop: 10,
    },
    buttonR: {
      alignItems: 'flex-end',
      marginBottom: 120,
      width: 380,
      height: 50,
      borderRadius: 3,
      flexDirection: 'row',
      marginLeft: 15,
      paddingVertical: 10,
    },
    modalBackground: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: -40,
      marginBottom: 20,
    },
    modalContainer: {
      width: '80%',
      backgroundColor: '#fff',
      paddingHorizontal: 0,
      paddingVertical: 35,
      borderRadius: 20,
    },
    header: {
      textAlign: 'center',
      height: 40,
      marginVertical: 20,
      marginTop: -10,
      paddingTop: -20,
      color: 'black',
    },
});
  export default Setting;
=======
/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text, Dimensions, TouchableOpacity, Alert, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import react from 'react';
//import About from './About';
//import Entypo from 'react-native-vector-icons/Entypo';
import RadioForm from 'react-native-simple-radio-button';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import SQLite from 'react-native-sqlite-storage';


//======Local Database======//
global.db = SQLite.openDatabase(
  {
    name: 'iSugear.db',
    createFromLocation: '~iSugarL.db',
    location: 'Library',
  },
  () => {
    console.log('Yes it is open');
   },
  error => {
    console.log('ERROR: ' + error);
  }
);

global.onlinUserID = '';
global.uID = '162';

const Setting = ({navigation}) => {

  var Language  = [
    {label: 'English', value: 'English', valueIndex: 0},
    {label: 'العربية', value: 'العربية', valueIndex: 1},
    ];

  const twoOptionAlert = () => {
  Alert.alert(
    //Title
    'تغيير اللغة',
    //body
    'هل أنت متأكد من أنك تريد تغيير اللغة؟',
    [
      {
        text: 'إلغاء',
        onPress: () => {
        console.log('Cancel pressed');
        },
      },
      {
        text: 'حسنًا',
        onPress: () => {
        console.log('OK pressed');
        //navigation.navigate('l');
        //allOperation();
        },
      },
    ]

  );
  };//end twoOption

  const logOutAlert = () => {
    Alert.alert(
      //Title
      'تسجيل الخروج',
      //body
      ' هل أنت متأكد أنك تريد تسجيل الخروج؟ في حال كان حسابك من نوع غير مصاب سيتم حذفه نهائيًا',
    //  'if your account of type non-patient account it will delete it',
      [
        {
          text: 'إلغاء',
          onPress: () => {
          console.log('Cancel pressed');
          },
        },
        {
          text: 'حسنًا',
          onPress: () => {
            allOperation();
          },
        },
      ]

    );
    };//end logoutalert

  const [dbData, setDbData] = useState({
    accountT:'',
  });

  const [dbData2, setDbData2] = useState({
    center:'',
    insulinR: '',
    isfInter: '',
    insulinCalc: '',
  });

  const [dbData3, setDbData3] = useState({
    slidingID:'',
  });

  const [dbData4, setDbData4] = useState({
    takenInsulinID:'',
  });
   useEffect(() => {
    languageState('English');

    FirstRetreive();//select from user Account
    SecondRetreive();//select from patient
    ThirdRetreive();//slect from sliding
    ForthRetreive();//slecet from taken insulin

      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
  const [data, setData] = react.useState({
    currentLanguage: '',
  });

  const languageState = (value) => {
      setData({
        ...data,
        currentLanguage: value,
      });
    };
 // const [visible, setVisible] = react.useState(false);
////////////////////////////////////////////SELECT QUERIES//////////////////////////////////////////////
  const FirstRetreive = ()=>{
    try {
        console.log('in try');
        db.transaction( (tx) => {
            tx.executeSql(
              'SELECT UserID, accountType FROM UserAccount',
              [],
              (tx, results) => {
                var rows = results.rows;
                for (let i = 0; i < rows.length; i++) {
                    var userID = rows.item(i).UserID;
                    // eslint-disable-next-line eqeqeq
                    if (userID == uID){
                      console.log('hi from getlocalInfo:');
                      setDbData({
                        ...dbData,
                        accountT: rows.item(i).accountType,
                      });
                      console.log('account type: ', dbData.accountT);
                     // getLocalInfo2();//select from patient acc
                      return;
                    }//end if
                  }//end for
              }//end results
    // eslint-disable-next-line semi
    )//end executeSql
    // eslint-disable-next-line semi
    }  )//db,transaction
    } catch (error) {
       console.log(error);
    }//end catch
};//end method
//---------------------------------------------------------------
const SecondRetreive = ()=>{
  try {
      console.log('in try 2');
      db.transaction( (tx) => {
          tx.executeSql(
            'SELECT UserID, insulinRegimen, ISFIntervals, insulinCalcMethod, diabetes_center FROM patientprofile',
            [],
            (tx, results) => {
              var rows = results.rows;
              for (let i = 0; i < rows.length; i++) {
                  var userID = rows.item(i).UserID;
                  // eslint-disable-next-line eqeqeq
                  if (userID == uID){
                    console.log('hi from inside info2:');
                    setDbData2({
                      ...dbData2,
                      center: rows.item(i).diabetes_center,
                      insulinR: rows.item(i).insulinRegimen,
                      isfInter: rows.item(i).ISFIntervals,
                      insulinCalc: rows.item(i).insulinCalcMethod,
                    });
                    console.log( dbData2.center + '-' + dbData2.insulinR + '-' + dbData2.isfInter + '-' + dbData2.insulinCalc);
                    return;
                  }//end if
                }//end for
            }//end results
  // eslint-disable-next-line semi
  )//end executeSql
  // eslint-disable-next-line semi
  }  )//db,transaction
  } catch (error) {
     console.log(error);
  }//end catch
};//end method
//--------------------------------------------------------------------
const ThirdRetreive = ()=>{
  try {
      console.log('in try 3');
      db.transaction( (tx) => {
          tx.executeSql(
            'SELECT UserID, ssID FROM ssInterval',
            [],
            (tx, results) => {
              var rows = results.rows;
              for (let i = 0; i < rows.length; i++) {
                  var userID = rows.item(i).UserID;
                  // eslint-disable-next-line eqeqeq
                  if (userID == uID){
                    console.log('hi from inside info3:');
                    setDbData3({
                      ...dbData3,
                     slidingID: rows.item(i).ssID,
                    });
                    console.log('Sliding ID: ',dbData3.slidingID);
                    return;
                  }//end if
                }//end for
            }//end results
  // eslint-disable-next-line semi
  )//end executeSql
  // eslint-disable-next-line semi
  }  )//db,transaction
  } catch (error) {
     console.log(error);
  }//end catch
};//end metho
//--------------------------------------------------------------------
const ForthRetreive = ()=>{
  try {
      console.log('in try 4');
      db.transaction( (tx) => {
          tx.executeSql(
            'SELECT UserID, takenInsulinID FROM takenInsulinDose',
            [],
            (tx, results) => {
              var rows = results.rows;
              for (let i = 0; i < rows.length; i++) {
                  var userID = rows.item(i).UserID;
                  // eslint-disable-next-line eqeqeq
                  if (userID == uID){
                    console.log('hi from inside info4:');
                    setDbData4({
                      ...dbData4,
                     takenInsulinID: rows.item(i).takenInsulinID,
                    });
                    console.log('taken insulin ID: ',dbData4.takenInsulinID);
                    return;
                  }//end if
                }//end for
            }//end results
  // eslint-disable-next-line semi
  )//end executeSql
  // eslint-disable-next-line semi
  }  )//db,transaction
  } catch (error) {
     console.log(error);
  }//end catch
};//end method
//--------------------------------------------------------------------

const SelectUsers = () => {
  try {
    console.log('in try');
    db.transaction( (tx) => {
        tx.executeSql(
          'SELECT UserID, accountType FROM UserAccount',
          [],
          (tx, results) => {
            var rows = results.rows;
            for (let i = 0; i < rows.length; i++) {
                var userID = rows.item(i).UserID;
                console.log(userID);
                // eslint-disable-next-line eqeqeq
                if (userID == uID){
                  console.log('hi from select users:');
                  setDbData({
                    ...dbData,
                    accountT: rows.item(i).accountType,
                  });
                  console.log('account type: ', dbData.accountT);
                 // getLocalInfo2();//select from patient acc
                  return;
                }//end if
              }//end for
          }//end results
// eslint-disable-next-line semi
)//end executeSql
// eslint-disable-next-line semi
}  )//db,transaction
} catch (error) {
   console.log(error);
}//end catch
};

//////////////////////////////////////////////////////END SELECT QUERIES////////////////////////////////////////

///////////////////////////////METHOD FOR DELETE QUERIES////////////////////////////////////////////
const allOperation = () => {
  //navigation.navigate('l');
  navigation.navigate('lo');
  //deleteUserAccount();
  DeleteAll();
  console.log('hello');
// eslint-disable-next-line semi
}
const DeleteAll = () => {

  deleteUserAccount();

  // eslint-disable-next-line eqeqeq
  if (dbData.accountT == 'Patient Account'){
// eslint-disable-next-line eqeqeq
    if (dbData2.center == '1'){
      deleteKSUMC();
    }//end center
    deletePatient();
  }//end if type patient

  // eslint-disable-next-line eqeqeq
  else if (dbData.accountT == 'Non-Patient Account'){
    deleteNonPatient();
  }//end if type non-patient

  // eslint-disable-next-line eqeqeq
  if (dbData2.insulinR == 'Pen'){
    deleteInsulinPen();
  } else {
    deleteInsulinOther();
  }//end insulin type

  // eslint-disable-next-line eqeqeq
  if (dbData2.isfInter == '1'){
    deleteISFInterval();
  }

  // eslint-disable-next-line eqeqeq
  if (dbData2.insulinCalc == 'ICR'){
    deleteICRInterval();
  // eslint-disable-next-line eqeqeq
  } else if (dbData2.insulinCalc == 'Sliding Scale'){
    deleteSSInterval();
    deleteBGlevel();
  }

  // eslint-disable-next-line eqeqeq
  if (dbData4.takenInsulinID != ''){
    deleteTakenInsulin();
    deletePlannedEx();
    deletePrevEx();
  }
  SelectUsers();
// eslint-disable-next-line semi
}//end DeleteAll method

///////////////////////////////////////////DELETE QUERIES/////////////////////////////////////
  const deleteUserAccount = () => {
    try {
      console.log('in try delete user account');
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM UserAccount WHERE UserID = ?',
           [uID],
         (tx, results) => {
          console.log('Results', results.rowsAffected);
                 if (results.rowsAffected > 0) {
                   console.log(uID);
                console.log('record delete successfully');
                      }//end if
      }//result
        // eslint-disable-next-line semi
        )//end executesql
    // eslint-disable-next-line semi
    })
  } catch (error) {
    console.log(error);
 }//end catch
  // eslint-disable-next-line semi
  }
  //end const

  const deletePatient = () => {
    try {
      console.log('in try delete patient');
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM patientprofile WHERE UserID = ?',
           [uID],
         (tx, results) => {
          console.log('Results', results.rowsAffected);
                 if (results.rowsAffected > 0) {
                   console.log(uID);
                console.log('record delete successfully');
                      }//end if
      }//result
        // eslint-disable-next-line semi
        )//end executesql
    // eslint-disable-next-line semi
    })
  } catch (error) {
    console.log(error);
 }//end catch
  // eslint-disable-next-line semi
  }
  //end const

  const deleteNonPatient = () => {
    try {
      console.log('in try delete non-patient');
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM nonPatientprofile WHERE UserID = ?',
           [uID],
         (tx, results) => {
          console.log('Results', results.rowsAffected);
                 if (results.rowsAffected > 0) {
                   console.log(uID);
                console.log('record delete successfull ');
                      }//end if
      }//result
        // eslint-disable-next-line semi
        )//end executesql
    // eslint-disable-next-line semi
    })
  } catch (error) {
    console.log(error);
 }//end catch
  // eslint-disable-next-line semi
  }
  //end const

  const deleteKSUMC = () => {
    try {
      console.log('in try delete ksumc');
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM KSUMC WHERE UserID = ?',
           [uID],
         (tx, results) => {
          console.log('Results', results.rowsAffected);
                 if (results.rowsAffected > 0) {
                   console.log(uID);
                console.log('record delete successfully');
                      }//end if
      }//result
        // eslint-disable-next-line semi
        )//end executesql
       // SelectMRN();
    // eslint-disable-next-line semi
    })

  } catch (error) {
    console.log(error);
 }//end catch
  // eslint-disable-next-line semi
  }
  //end const

  const deleteInsulinPen = () => {
    try {
      console.log('in try delete insulin pen');
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM insulinPen WHERE UserID = ?',
           [uID],
         (tx, results) => {
          console.log('Results', results.rowsAffected);
                 if (results.rowsAffected > 0) {
                   console.log(uID);
                console.log('record delete successfully');
                      }//end if
      }//result
        // eslint-disable-next-line semi
        )//end executesql
    // eslint-disable-next-line semi
    })
  } catch (error) {
    console.log(error);
 }//end catch
  // eslint-disable-next-line semi
  }
  //end const

  const deleteInsulinOther = () => {
    try {
      console.log('in try delete insulin other');
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM insulinOther WHERE UserID = ?',
           [uID],
         (tx, results) => {
          console.log('Results', results.rowsAffected);
                 if (results.rowsAffected > 0) {
                   console.log(uID);
                console.log('record delete successfully');
                      }//end if
      }//result
        // eslint-disable-next-line semi
        )//end executesql
    // eslint-disable-next-line semi
    })
  } catch (error) {
    console.log(error);
 }//end catch
  // eslint-disable-next-line semi
  }
  //end const

  const deleteISFInterval = () => {
    try {
      console.log('in try delete isf interval');
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM isfInterval WHERE UserID = ?',
           [uID],
         (tx, results) => {
          console.log('Results', results.rowsAffected);
                 if (results.rowsAffected > 0) {
                   console.log(uID);
                console.log('record delete successfully');
                      }//end if
      }//result
        // eslint-disable-next-line semi
        )//end executesql
    // eslint-disable-next-line semi
    })
  } catch (error) {
    console.log(error);
 }//end catch
  // eslint-disable-next-line semi
  }
  //end const

  const deleteICRInterval = () => {
    try {
      console.log('in try delete icr interval');
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM icrInterval WHERE UserID = ?',
           [uID],
         (tx, results) => {
          console.log('Results', results.rowsAffected);
                 if (results.rowsAffected > 0) {
                   console.log(uID);
                console.log('record delete successfully');
                      }//end if
      }//result
        // eslint-disable-next-line semi
        )//end executesql
    // eslint-disable-next-line semi
    })
  } catch (error) {
    console.log(error);
 }//end catch
  // eslint-disable-next-line semi
  }
  //end const

  const deleteSSInterval = () => {
    try {
      console.log('in try delete ss interval');
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM ssInterval WHERE UserID = ?',
           [uID],
         (tx, results) => {
          console.log('Results', results.rowsAffected);
                 if (results.rowsAffected > 0) {
                   console.log(uID);
                console.log('record delete successfully');
                      }//end if
      }//result
        // eslint-disable-next-line semi
        )//end executesql
    // eslint-disable-next-line semi
    })
  } catch (error) {
    console.log(error);
 }//end catch
  // eslint-disable-next-line semi
  }
  //end const

  const deleteBGlevel = () => {
    try {
      console.log('in try delete bg level');
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM bgleveltoinsulin WHERE ssID = ?',
           [dbData3.slidingID],
         (tx, results) => {
          console.log('Results', results.rowsAffected);
                 if (results.rowsAffected > 0) {
                   console.log(uID);
                   console.log(dbData3.slidingID);
                console.log('record delete successfully');
                      }//end if
      }//result
        // eslint-disable-next-line semi
        )//end executesql
    // eslint-disable-next-line semi
    })
  } catch (error) {
    console.log(error);
 }//end catch
  // eslint-disable-next-line semi
  }
  //end const

  const deleteTakenInsulin = () => {
    try {
      console.log('in try delete taken insulin');
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM takenInsulinDose WHERE UserID = ?',
           [uID],
         (tx, results) => {
          console.log('Results', results.rowsAffected);
                 if (results.rowsAffected > 0) {
                   console.log(uID);
                   console.log(dbData4.takenInsulinID);
                console.log('record delete successfully');
                      }//end if
      }//result
        // eslint-disable-next-line semi
        )//end executesql
    // eslint-disable-next-line semi
    })
  } catch (error) {
    console.log(error);
 }//end catch
  // eslint-disable-next-line semi
  }
  //end const

  const deletePlannedEx = () => {
    try {
      console.log('in try delete planned exercise');
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM plannedExercise WHERE takenInsulinID = ?',
           [dbData4.takenInsulinID],
         (tx, results) => {
          console.log('Results', results.rowsAffected);
                 if (results.rowsAffected > 0) {
                   console.log(uID);
                   console.log(dbData4.takenInsulinID);
                console.log('record delete successfully');
                      }//end if
      }//result
        // eslint-disable-next-line semi
        )//end executesql
    // eslint-disable-next-line semi
    })
  } catch (error) {
    console.log(error);
 }//end catch
  // eslint-disable-next-line semi
  }
  //end const

  const deletePrevEx = () => {
    try {
      console.log('in try delete prevoius exercise');
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM prevoiusExercise WHERE takenInsulinID = ?',
           [dbData4.takenInsulinID],
         (tx, results) => {
          console.log('Results', results.rowsAffected);
                 if (results.rowsAffected > 0) {
                   console.log(uID);
                   console.log(dbData4.takenInsulinID);
                console.log('record delete successfully');
                      }//end if
      }//result
        // eslint-disable-next-line semi
        )//end executesql
    // eslint-disable-next-line semi
    })
  } catch (error) {
    console.log(error);
 }//end catch
  // eslint-disable-next-line semi
  }
  //end const
//////////////////////////////////////////////////////END DELETE QUERIES///////////////////////////////////////////
  return (
 <View style={styles.container}>
   <LinearGradient colors={['#E7EFFA', '#E7EFFA','#AABED8']} style={styles.container}>
   <View style={{top: 10, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', padding: 30}}>
        <Image source={require('../images/logo.png')} style={styles.pic} />
        <TouchableOpacity onPress={()=>navigation.openDrawer()}>
         <Entypo name="menu" color="#05375a" size={35} />
         </TouchableOpacity>
      </View>


    <View style={styles.footer}>
    <View style={{flexDirection: 'row' ,marginLeft:5, paddingTop: 30 }}>
      <Fontisto name="world-o" color="#05375a" size={22}/>
       <Text style={styles.title}>اللغة</Text>
      </View>
      <View style={styles.radioB}>
         <RadioForm
          radio_props = {Language}
          onPress={ twoOptionAlert }
          buttonSize = {15}
          buttonOuterSize = {25}
          buttonColor= "#AABED8"
          selectedButtonColor = "#8FA5C1"
          labelStyle = {{fontSize: 20, color: '#05375a', padding: 10}}
          formHorizontal={false}
         />
        </View>
    </View>

    <View style={{marginBottom: 30}}>
  <View style={{flexDirection: 'row' ,marginLeft:20, paddingTop: 50 }}>
       <MaterialIcons name="account-circle" color="#05375a" size={22}/>
       <Text style={styles.title}>الحساب</Text>
     </View>
        <View style={styles.buttonV}>
           <TouchableOpacity>
             <LinearGradient
               colors={['#fff', '#fff', '#fff']}
               style={styles.buttonR}>
                <SimpleLineIcons name="logout" color="#05375a" size={22}/>
               <Text
                onPress={ logOutAlert }
               style={styles.titleB}
               >
                 تسجيل الخروج
                 </Text>
             </LinearGradient>
            </TouchableOpacity>
         </View>
         </View>
         </LinearGradient>
 </View>
  );
};

const {height} = Dimensions.get('screen');
const height_logo = height * 0.15;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  pic: {

    width: height_logo,
    height: height_logo,
    marginRight: 10,
},
    title: {
      color: '#05375a',
      fontSize: 18,
      fontWeight: 'bold',
      marginLeft: 10,
      marginBottom: -10,
    },

  footer: {
      flex: 1,
      width: 380,
      height: 50,
      marginTop: 10,
      marginBottom: -100,
      marginLeft: 15,
      backgroundColor: '#fff',
      borderRadius: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 10,
  },
  titleB: {
    color: '#05375a',
    fontSize: 18,
    marginLeft: 15,
    marginTop: -10,
  },
  radioB :{
    marginTop: 25,
    justifyContent: 'space-between',
    padding: 10,
    paddingTop:5,
    marginBottom: 10,
    },
    buttonV: {
      marginTop: 10,
    },
    buttonR: {
      alignItems: 'flex-end',
      marginBottom: 120,
      width: 380,
      height: 50,
      borderRadius: 3,
      flexDirection: 'row',
      marginLeft: 15,
      paddingVertical: 10,
    },
    modalBackground: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: -40,
      marginBottom: 20,
    },
    modalContainer: {
      width: '80%',
      backgroundColor: '#fff',
      paddingHorizontal: 0,
      paddingVertical: 35,
      borderRadius: 20,
    },
    header: {
      textAlign: 'center',
      height: 40,
      marginVertical: 20,
      marginTop: -10,
      paddingTop: -20,
      color: 'black',
    },
});
  export default Setting;
>>>>>>> 02d91af4584ffbad2b0fa06dde4607295acc5fa6
