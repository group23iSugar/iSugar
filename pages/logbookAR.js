import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Image,
  Button,
  ScrollView,
  StatusBar,
  Text,
  View,
  AppRegistry,
  Navigator,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Switch,
  FlatList,
  Dimensions,
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import LinearGradient from 'react-native-linear-gradient';
import {Picker} from '@react-native-picker/picker';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PieChart} from 'react-native-chart-kit';
import moment from 'moment';
import {DataTable} from 'react-native-paper';
//import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

//import { ActivityIndicator, Colors } from 'react-native-paper';
//import dashDB from './dashDB';
const optionsPerPage = [2, 3, 4];

const logbookAR = ({navigation, theme}) => {
  useEffect(() => {
    retre1();
    retre2();
    ret4();
    dashBoard();
    ret3();
  }, []);

  const [flag, setFlag] = useState(false);
  const [within, setWitin] = useState(0);
  const [above, setAbove] = useState(0);
  const [under, setUnder] = useState(0);
  const [bgArr, setBgArr] = useState([]);
  const [lastBG, setLastBG] = useState(0);
  const [lastBGtime, setLastBGtime] = useState('');
  const [startBG, setSBGP] = useState(0);

  // const [diagnos, setDiagnos] = useState('');
  // const [DOB, setDOB] = useState('');
  // const [fName, setfName] = useState('');
  // const [lName, setlName] = useState('');
  // const [weigh, setWeigh] = useState('');

  const dashBoard = async () => {
    await retrieveDash2();

    var w = 0;
    var a = 0;
    var u = 0;

    for (let i = 0; i < bgArr.length; i++) {
      if (bgArr[i] >= fromBGHome && bgArr[i] <= toBGHome) {
        w++;
      } else if (bgArr[i] > toBGHome) {
        a++;
      } else if (bgArr[i] < fromBGHome) {
        u++;
      }
    }

    var total = w + a + u;
    var m = (a / total) * 100;
    if (m >= 50) {
      setFlag(true);
    } else {
      setFlag(false);
    }

    setWitin(w);
    setAbove(a);
    setUnder(u);
  };

  const retrieveDash = () => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT UserID, fromBG, toBG FROM patientprofile',
          [],
          (tx, results) => {
            var rows = results.rows;

            for (let i = 0; i < rows.length; i++) {
              var userid = rows.item(i).UserID;

              fromBGHome = rows.item(i).fromBG;
              toBGHome = rows.item(i).toBG;
            }
          },
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  //==================================================
  const retrieveDash2 = async () => {
    await retrieveDash();
    var time = new Date(); // Mon Jan 31 2022 23:07:59 GMT+0300 (+03)
    var bgArr1 = [];
    // insulinPen table
    try {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT UserID, BGlevel, DateTime FROM BGLevel',
          [],
          (tx, results) => {
            var rows = results.rows;
            var lastString = rows.item(rows.length - 1).DateTime;
            var d = new Date(lastString);
            var momFormat = moment(d).format('yyyy/MM/DD  hh:mm a');

            setLastBGtime(momFormat);
            setLastBG(rows.item(rows.length - 1).BGlevel);

            for (let i = 0; i < rows.length; i++) {
              var timeString = rows.item(i).DateTime;
              var toObj = new Date(timeString);
              var bgHome = rows.item(i).BGlevel;
              var userid = rows.item(i).UserID;
              //console.log((time - toObj) / (1000 * 60 * 60));

              if ((time - toObj) / (1000 * 60 * 60) <= 168) {
                //168 is the last 7 days in hours

                bgArr1.push(bgHome);
              }
            }
            setBgArr(bgArr1);
            //console.log(bgArr1 + '   This is bg array');
            // console.log(
            //   fromBGHome + '  ' + toBGHome + '   This is from and to',
            // );
          },
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  const ret3 = () => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT UserID, startBG_correct FROM patientprofile',
          [],
          (tx, results) => {
            var rows = results.rows;
            for (let i = 0; i < rows.length; i++) {
              var UID = rows.item(i).UserID;
              var start = rows.item(i).startBG_correct;
              setSBGP(start);
            }
          },
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  const ret4 = () => {
    //Appointments
    var currentD = new Date();
    var counter = 0;
    var aaa = [];
    try {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT UserID, BG_level, ReasonForInsulin, CHO, insulinDose, Dose_time_hours, spicial, dateString FROM takenInsulinDose',
          [],
          (tx, results) => {
            var rows = results.rows;

            for (let i = 0; i < rows.length; i++) {
              var d = rows.item(i).dateString;
              var toObjd = new Date(d);
              var momFormatd = moment(toObjd).format('yyyy/MM/DD');

              var bg22 = rows.item(i).BG_level;
              var cho22 = rows.item(i).CHO;
              var hour22 = rows.item(i).Dose_time_hours;
              var insulin22 = rows.item(i).insulinDose;
              var special22 = rows.item(i).spicial;

              aaa.push({
                date: momFormatd,
                hour: hour22,
                BG: bg22,
                insulin: insulin22,
                special: special22,
                CHO: cho22,
              });
            }

            setLogbookArr(aaa);
          },
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  //const [logbookArr, setLogbookArr] = useState([]);
  const [logbookArr, setLogbookArr] = useState([
    {
      date: '',
      hour: '',
      BG: '',
      insulin: '',
      special: '',
      CHO: '',
    },
  ]); // this is how it should be initialized in order to display it in flat list

  //===========================RETRIVE================

  const retre1 = () => {
    try {
      console.log('in try');
      db.transaction(tx => {
        tx.executeSql(
          'SELECT UserID, firstName, lastName, email FROM UserAccount',
          [],
          (tx, results) => {
            var rows = results.rows;
            for (let i = 0; i < rows.length; i++) {
              var userID = rows.item(i).UserID;
              fName = rows.item(i).firstName;
              lName = rows.item(i).lastName;
            }
          },
        );
      });
    } catch (error) {
      console.log(error);
    }
  };
  //=================================
  const retre2 = () => {
    retre1();
    retre3();
    retre4();
    retre5();
    var tempArr = [];
    try {
      console.log('in try2');
      db.transaction(tx => {
        tx.executeSql(
          'SELECT UserID, DOB, ISFIntervals, weightKG, diagnosis_date, ISF, targetBG_correct, startBG_correct FROM patientprofile',
          [],
          (tx, results) => {
            var rows = results.rows;
            for (let i = 0; i < rows.length; i++) {
              var userID = rows.item(i).UserID;

              DOB = rows.item(i).DOB;
              isInteee = rows.item(i).ISFIntervals;
              console.log(DOB);
              weigh = rows.item(i).weightKG;
              var wewe = rows.item(i).diagnosis_date;
             // var x = new Date(wewe);

             // var d = moment(x).format('YYYY-MM-DD'); // 2021-11-21
              diagnos = wewe;

              tempArr.push({
                isf: rows.item(i).ISF,
                sbg: rows.item(i).startBG_correct,
                tbg: rows.item(i).targetBG_correct,
              });
            }

            isfAll = tempArr;

            var currentDate = new Date();
            var birthDay = new Date(DOB);
            var age2 = currentDate.getFullYear() - birthDay.getFullYear();
            var mon = currentDate.getMonth() - birthDay.getMonth();
            if (mon < 0 || mon == 0) {
              age2 = age2 - 1;
            }
            age = age2;
          },
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  const retre3 = () => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT UserID, insulinType, halfORfull FROM insulinPen',
          [],
          (tx, results) => {
            var rows = results.rows;

            for (let i = 0; i < rows.length; i++) {
              var userid = rows.item(i).UserID;

              insulinType = rows.item(i).insulinType;
              return;
            }
          },
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  const retre4 = () => {
    var tempArr = []; // array of obj
    try {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT fromTime, toTime, ICR FROM icrInterval WHERE UserID=?',
          [222],
          (tx, results) => {
            var rows = results.rows;
            for (let i = 0; i < rows.length; i++) {
              console.log('hello?1?************8');
              tempArr.push({
                from: rows.item(i).fromTime,
                to: rows.item(i).toTime,
                icr: rows.item(i).ICR,
              });
            }
            ICRarr = tempArr;
          },
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  const retre5 =()=>{
    var tempArr = [];
    try {
      db.transaction( (tx) => {
          tx.executeSql(
              'SELECT fromTime, toTime, ISF, targetBG_correct, startBG_correct FROM isfInterval',
            [],
            (tx, results) => {
              var rows = results.rows;
              for (let i = 0; i < rows.length; i++){

                var a = new Date(rows.item(i).fromTime);
                var b = new Date(rows.item(i).toTime);
        

                   tempArr.push({
                     
                     from: moment(a).format('hh:mm a'),
                     to: moment(b).format('hh:mm a'),
                     isf: rows.item(i).ISF,
                     tBG: rows.item(i).targetBG_correct,
                     sBG: rows.item(i).startBG_correct,
                   });

                   
                   
              
              isfAllInt = tempArr;  
              
             
            }
           
            
            },
          );
        });
      } catch (error) {
        console.log(error);
      }

  };

  const widthScreen = Dimensions.get('window').width;
  const heightScreen = Dimensions.get('window').height;
  const pieData = [
    {
      name: 'تحت الهدف',
      population: under,
      color: '#FF5541',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'فوق الهدف',
      population: above,
      color: '#FF9A41',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'مع الهدف',
      population: within,
      color: '#41FF48',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => 'rgba(26, 255, 146)',
    barPercentage: 0.5,
  };

  return (
    //dashBoard(),

    <View style={styles.container}>
      <View style={{top: 10, alignItems: 'center'}}>
        <Image source={require('./images/logo.png')} style={styles.pic} />
      </View>
      <ScrollView>
        <Text
          style={{
            color: '#000',
            fontSize: 25,
            textAlign: 'center',
            paddingTop: 20,
            paddingLeft: 15,
            fontWeight: 'bold',
          }}>
          السجل
        </Text>

        <TouchableOpacity
          style={{
            marginRight: 350,
          }}
          onPress={retre2}>
          <Image
            source={require('./images/upd.png')}
            style={{height: 25, width: 25}}
          />
        </TouchableOpacity>

        <View style={styles.innerCotainer}>
          <Text style={styles.textBody}>
            الاسم: {fName + '' + lName + '\n'} العمر: {age + '      '} الوزن:{' '}
            {weigh + 'kg' + '\n'}
            هدف مستوى السكر اليومي:{' '}
            {fromBGHome + '-' + toBGHome + ' mg/dl' + '        '} تاريخ التشخيص:{diagnos + '\n'}
            نوع الانسولين: {insulinType + '\n\n'} معامل الكاربوهاديرات:{' '}
          </Text>
          <FlatList
            data={ICRarr}
            renderItem={({item}) => (
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.textBody}>
                  {item.from + '-' + item.to + ' =  ' + item.icr + ''}
                </Text>
              </View>
            )}
          />

          <Text style={styles.textBody}>{'\n'} معامل حساسية الانسولين بالفترات:</Text>

          
          { (isInteee == 0) ? <FlatList
            data={isfAll}
            renderItem={({item}) => (
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.textBody}>
                  {' '}
                  معامل حساسية الانسولين طول اليوم = {item.isf} مستوى السكر = {item.sbg} مستوى السكر المرغوب ={' '}
                  {item.tbg}{' '}
                </Text>
              </View>
            )}
          /> : (  <FlatList
            data={isfAllInt}
            renderItem={({item}) => (
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.textBody}>
                  {' '}
                  من= {item.from} الى= {item.to} معامل حساسية الانسولين={item.isf} مستوى السكر={item.sBG} مستوى السكر المرغوب={item.tBG}
                  
                </Text>
              </View>
            )}
          />

        )}
          

          

          <Text style={styles.textBody}>
            {'\n\n\n\n'}الوقت في الهدف:
          </Text>
          <TouchableOpacity
            style={{
              marginLeft: 350,
            }}
            onPress={dashBoard}>
            <Image
              source={require('./images/upd.png')}
              style={{height: 25, width: 25}}
            />
          </TouchableOpacity>

          {bgArr.length > 0 && (within > 0 || above > 0 || under > 0) ? (
            <PieChart
              data={pieData}
              width={widthScreen}
              height={150}
              chartConfig={chartConfig}
              accessor={'population'}
              backgroundColor={'white'}

              //absolute
            />
          ) : (
            <ActivityIndicator size="large" />
          )}
          {flag ? (
            <Text style={styles.msg}>
                       الرجاء التواصل مع فريق السكر حيث أن قراءات مستوى سكر الدم أعلى من
              الهدف في ٥٠٪ من الوقت أو أكثر.
            </Text>
          ) : null}
          <Text>{'\n\n'}</Text>
        </View>

        <TouchableOpacity
          style={{
            marginRight: 350,
          }}
          onPress={ret4}>
          <Image
            source={require('./images/upd.png')}
            style={{height: 25, width: 25}}
          />
        </TouchableOpacity>

        <ScrollView horizontal={true}>
          <DataTable
            style={{
              borderRadius: 15,
              backgroundColor: 'white',
              textAlign: 'center',
              alignItems: 'center',
              marginBottom: 30,
            }}>
            <DataTable.Row>
              <DataTable.Cell style={{paddingRight: 15, width: 120}}>
                التاريخ
              </DataTable.Cell>
              <DataTable.Cell style={{paddingLeft: 15, width: 90}}>
                الساعة
              </DataTable.Cell>
              <DataTable.Cell style={{paddingLeft: 15, width: 90}}>
                مستوى السكر
              </DataTable.Cell>
              <DataTable.Cell style={{paddingLeft: 15, width: 90}}>
                الجرعة
              </DataTable.Cell>
              <DataTable.Cell style={{paddingLeft: 15, width: 90}}>
                الكاربوهايدرات
              </DataTable.Cell>
              <DataTable.Cell style={{paddingLeft: 15, width: 90}}>
                استثناءات
              </DataTable.Cell>
            </DataTable.Row>

            <FlatList
              data={logbookArr}
              renderItem={({item}) => (
                <View>
                  <DataTable.Row>
                    <DataTable.Cell style={{paddingRight: 20, width: 120}}>
                      {item.date}
                    </DataTable.Cell>
                    <DataTable.Cell style={{padding: 20, width: 90}}>
                      {item.hour}
                    </DataTable.Cell>
                    <DataTable.Cell style={{padding: 20, width: 90}}>
                      {item.BG}
                    </DataTable.Cell>
                    <DataTable.Cell style={{padding: 20, width: 90}}>
                      {item.insulin}
                    </DataTable.Cell>
                    <DataTable.Cell style={{padding: 20, width: 90}}>
                      {item.CHO}
                    </DataTable.Cell>
                    <DataTable.Cell style={{padding: 20, width: 90}}>
                      {item.special}
                    </DataTable.Cell>
                  </DataTable.Row>
                </View>
              )}
            />

            {/* 
            <DataTable.Row>
              <DataTable.Cell numeric>6.0</DataTable.Cell>
            </DataTable.Row> */}
          </DataTable>
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  pic: {
    width: 70,
    height: 90,
  },

  //====================newStyle========================
  container: {
    flex: 1,
    backgroundColor: '#EEF0F2',
  },
  //   pic: {
  //     width: height_logo,
  //     height: height_logo,
  //     marginRight: 10,
  // },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  textBody: {
    fontSize: 20,
    color: '#05375a',
    marginLeft: 15,
    fontWeight: 'bold',
  },
  textBody2: {
    marginTop: 5,
    padding: 10,

    fontSize: 15,
    backgroundColor: '#506c80',
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    borderRadius: 10,
  },
  innerCotainer: {
    backgroundColor: 'white',
    margin: 10,

    borderRadius: 15,

    width: 380,
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
    backgroundColor: '#05375a',
    alignItems: 'center',
    width: 50,
    height: 35,
    justifyContent: 'center',
    borderRadius: 15,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonR: {
    backgroundColor: '#05375a',
    alignItems: 'center',
    width: 150,
    height: 35,
    marginTop: 20,
    justifyContent: 'center',
    borderRadius: 15,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  ddown: {
    //drop down list style

    shadowColor: '#000',
    alignSelf: 'center',
    width: 140,

    alignItems: 'center',
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
  picker: {
    color: 'grey',
  },
  msg: {
    //lables
    paddingLeft: 20,
    paddingTop: 15,
    fontSize: 18,
    color: 'red',
  },
  //====================newStyle========================
});

export default logbookAR;
