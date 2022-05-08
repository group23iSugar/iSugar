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
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

//import { ActivityIndicator, Colors } from 'react-native-paper';
//import dashDB from './dashDB';
const optionsPerPage = [2, 3, 4];

const logbook = ({navigation, theme}) => {
  
  
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
  useEffect(() => {
    setPage(0);
    getLocalInfo();
    ret4();
    dashBoard();
    ret3();

  }, [itemsPerPage]);

  const [within, setWitin] = useState(0);
  const [above, setAbove] = useState(0);
  const [under, setUnder] = useState(0);
  const [bgArr, setBgArr] = useState([]);
  const [lastBG, setLastBG] = useState(0);
  const [lastBGtime, setLastBGtime] = useState('');
  const [startBG, setSBGP] = useState(0);
  const [diagnos, setDiagnos] = useState('');
  

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

              if (userid == 222) {
                fromBGHome = rows.item(i).fromBG;
                toBGHome = rows.item(i).toBG;

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
              if (UID == 222) {
                //***************************************FIXIXIXIX */

                var start = rows.item(i).startBG_correct;
                setSBGP(start);
              }
            }
          },
        );
      });
    } catch (error) {
      console.log(error);
    }
  };



  const [data, setData] = useState({
    fName: '',
    lName: '',
    email: '',
    dateBirth:'',
    weigh: 0,
    diagnosisdate:'',
});

const  [age, setAge] = useState(1);


  const ret4 = () => { //Appointments
    var currentD =  new Date();
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
                 var momFormatd = moment(toObjd).format('dddd yyyy/MM/DD');

                 var bg22 = rows.item(i).BG_level;
                 var cho22 = rows.item(i).CHO;
                 var hour22 = rows.item(i).Dose_time_hours;
                 var insulin22 = rows.item(i).insulinDose;
                 var special22 = rows.item(i).spicial;


                 aaa.push({
                  date: momFormatd, hour: hour22, BG:bg22, insulin:insulin22, special:special22, CHO:cho22
                 });

                 }
            
            setLogbookArr(aaa);
            console.log('this is app array: '+ aaa);
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
      date: '', hour: '', BG:'', insulin:'', special:'', CHO:''
     }
   
  ]); // this is how it should be initialized in order to display it in flat list

  //===========================RETRIVE================


  const getLocalInfo = ()=>{
    try {
        console.log('in try');
        db.transaction( (tx) => {
            tx.executeSql(
              'SELECT UserID, firstName, lastName, email FROM UserAccount',
              [],
              (tx, results) => {
                var rows = results.rows;
                for (let i = 0; i < rows.length; i++) {           
                    var userID = rows.item(i).UserID;
                    if (uID == userID){
                      setData({
                        ...data,
                        fName: rows.item(i).firstName,
                        lName: rows.item(i).lastName,
                        email: rows.item(i).email,
                      });
                   
                    }
                    
                 
                  }
              }   
    ) 
        
    
    }  ) 
    } catch (error) {
       console.log(error);
    }

    try {
      console.log('in try');
      db.transaction( (tx) => {
          tx.executeSql(
            'SELECT UserID, DOB, weightKG FROM patientprofile',
            [],
            (tx, results) => {
              var rows = results.rows;
              for (let i = 0; i < rows.length; i++) {           
                  var userID = rows.item(i).UserID;
                  if (uID == userID){
                      setData({
                          ...data,
                          dateBirth: rows.item(i).DOB,
                          weigh: rows.item(i).weightKG,
                      });
                      
                    
                  }
                }

                var currentDate = new Date();
                var birthDay = new Date(data.dateBirth);
                var age2 = currentDate.getFullYear() - birthDay.getFullYear();
                var mon = currentDate.getMonth() - birthDay.getMonth();
                if (mon < 0 || mon == 0) {
                    age2= age2-1;
                }
                age=age2;
                setAge(age);
            }   
  ) 
      
  
  }  ) 
  } catch (error) {
     console.log(error);
  }

  try {
    console.log('in try');
    db.transaction( (tx) => {
        tx.executeSql(
          'SELECT UserID, diagnosis_date FROM patientprofile',
          [],
          (tx, results) => {
            var rows = results.rows;
            for (let i = 0; i < rows.length; i++) {           
                var userID = rows.item(i).UserID;
                if (uID == userID){
                    setData({
                        ...data,
                        diagnosisdate: rows.item(i).diagnosis_date,
                    });
                    console.log( dbData.diagnosisdate +'-'+dbData.diabetescenter);
                 
                }
              }

              var d = moment(data.diagnosisdate).format('YYYY-MM-DD'); // 2021-11-21
              setDiagnos(d);
          }   
) 
    

}  ) 
} catch (error) {
   console.log(error);
}


  
}


const widthScreen = Dimensions.get('window').width;
  const heightScreen = Dimensions.get('window').height;
  const pieData = [
    {
      name: 'Under Target',
      population: under,
      color: '#FF5541',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Above Target',
      population: above,
      color: '#FF9A41',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Within Target',
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
          log book
        </Text>

        <TouchableOpacity
          style={{
            marginLeft: 350,
          }}
          onPress={ret4}>
          <Image
            source={require('./images/upd.png')}
            style={{height: 25, width: 25}}
          />
        </TouchableOpacity>


        <View style={styles.innerCotainer}>
          Name: {data.fName+''+data.lName+'        '} Age: {age+'        '} Weigt: {data.weigh+'\n'}
          Target BG level per day: {fromBGHome+'-'+toBGHome+' mg/dl'+'        '} Diagnosis Date:{diagnos+'\n'}





          <Text style={styles.textBody}>{'\n\n\n\n'}Time in target for the last 7 days:</Text>
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
            Contact diabetes center as you are above target 50% of times
          </Text>
        ) : null}
        <Text>{'\n\n'}</Text>

        </View>

        <ScrollView horizontal={true}>
          <DataTable style={{borderRadius: 15, backgroundColor: 'white', textAlign:'center', alignItems:'cetner'}}>
            <DataTable.Row>
              <DataTable.Cell style={{paddingRight: 100, width:90}}>Date</DataTable.Cell>
              <DataTable.Cell style={{paddingLeft: 30, width:90}}>Hour</DataTable.Cell>
              <DataTable.Cell style={{paddingLeft: 30, width:90}}>BG Level</DataTable.Cell>
              <DataTable.Cell style={{paddingLeft: 30, width:90}}>Insulin Dose</DataTable.Cell>
              <DataTable.Cell style={{paddingLeft: 30, width:90}}>CHO</DataTable.Cell>
              <DataTable.Cell style={{paddingLeft: 30, width:90}}>Special</DataTable.Cell>
            </DataTable.Row>

            <FlatList
              data={logbookArr}
              renderItem={({item}) => (
                <View>

               
            <DataTable.Row>
            <DataTable.Cell style={{paddingRight: 20, width:90}}>{item.date}</DataTable.Cell>
            <DataTable.Cell style={{padding: 20, width:90}}>{item.hour}</DataTable.Cell>
            <DataTable.Cell style={{padding: 40, width:90}}>{item.BG}</DataTable.Cell>
            <DataTable.Cell style={{padding: 40, width:90}}>{item.insulin}</DataTable.Cell>
            <DataTable.Cell style={{padding: 30, width:90}}>{item.CHO}</DataTable.Cell>
            <DataTable.Cell style={{padding: 20, width:90}}>{item.special}</DataTable.Cell>
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
    textAlign: 'center',
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
    alignItems: 'center',
    borderRadius: 15,
    padding: 5,
    width: 380,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  innerCotainer2: {
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 15,
    paddingBottom: 45,
    marginBottom: 100,
    width: 380,

    alignSelf: 'center',
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

export default logbook;
