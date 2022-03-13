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
//import { ActivityIndicator, Colors } from 'react-native-paper';
//import dashDB from './dashDB';

const Home = ({navigation}) => {
  useEffect(() => {
    dashBoard();
    ret3();
    //ret4();
  }, []);

  const [flag, setFlag] = useState(false);
  const [within, setWitin] = useState(0);
  const [above, setAbove] = useState(0);
  const [under, setUnder] = useState(0);
  const [bgArr, setBgArr] = useState([]);
  const [lastBG, setLastBG] = useState(0);
  const [lastBGtime, setLastBGtime] = useState('');
  const [addBGlevel, setAddBGlevel] = useState(0);
  const [startBG, setSBGP] = useState(0);
  const [reason, setReason] = useState('');
  const [appointments, setAppointments] = useState([]);

  //===========================Functions===============

  const addBG = () => {
    var time = new Date(); // Mon Jan 31 2022 23:07:59 GMT+0300 (+03)
    var timeString = time.toString();

    try {
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO BGLevel (UserID, BGlevel, DateTime) VALUES (?,?,?)',
          [222, addBGlevel, timeString],
        );
        console.log('inserted!!');
      });
    } catch (error) {
      console.log(error);
    }
    dashBoard();

    if (addBGlevel <= 70) {
      navigation.navigate('hypo');
    } else if (addBGlevel > startBG) {
      //startbgcorr =150
      navigation.navigate('Calc');
    }else if (reason == '1'){
      navigation.navigate('Calc');
    }
    
  };

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
  //==================================================
  //===========================RETRIVE================
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

  //==================================================
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
  //==================================================
  const ret4 = () => { //Appointments
    var currentD =  new Date();
    var counter = 0;
    var aaa = [];
    try {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT UserID, appointmentDate FROM appointments',
          [],
          (tx, results) => {
            var rows = results.rows;
            
            for (let i = 0; i < rows.length; i++) {
              //console.log(rows.item(i).appointmentDate + 'iiiiiiiiii');
              // var UID = rows.item(i).UserID;
              // if (UID == 222) {
                 console.log(rows.item(i).appointmentDate + 'iiiiiiiiii');
                 var d = rows.item(i).appointmentDate;
                 var toObjd = new Date(d);
                 var momFormatd = moment(toObjd).format('dddd yyyy/MM/DD');
                 var weeksNum =  (toObjd-currentD)/(1000 * 60 * 60 *24*7);
                 var weeksNum2= Math.floor(weeksNum);
                 if((toObjd-currentD)/(1000 * 60 * 60 *24) > 0){
                   
                  //aaa.push(momFormatd+'\n');
                  aaa.push({key: counter, name: momFormatd, weeks: weeksNum2});
                  counter++;
                 }

              // }
            }
            setAppointments(aaa);
            //console.log('this is app array: '+ aaa);
          },
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  //===============================Online DB===========================
const updateFlag = () => {

      var time = new Date(); 
      var timeString = time.toString();
            console.log('in DB of check flag');
            // eslint-disable-next-line quotes
            var InsertAPIURL = "http://192.168.56.1/isugar/updateEMsgFlag.php";   //API to  signup

            var headers = {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            };
            var Data = {
              UserID: onlinUserID,
              BGlevel: addBGlevel,
              Date_Time: timeString,



            };

          // FETCH func ------------------------------------
          fetch(InsertAPIURL,{
              method:'POST',
              headers:headers,
              body: JSON.stringify(Data),//convert data to JSON
          })
          .then((response)=>response.json()) //check response type of API (CHECK OUTPUT OF DATA IS IN JSON)
          .then((response)=>{
          })
          .catch((error)=>{
              alert('Error Occured' + error);
          })
          }
//===================================================================
  //==================================================
  const widthScreen = Dimensions.get('window').width;
  const heightScreen = Dimensions.get('window').height;
  const data = [
    {
      name: 'Under Target',
      population: under,
      color: '#9286FF',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Above Target',
      population: above,
      color: '#FF8686',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Within Target',
      population: within,
      color: '#86FF9E',
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
          Home
        </Text>

         <View style={styles.innerCotainer}>

        <Text style={styles.textBody}>Last BG level Read: {lastBG + '\n'}Time: {lastBGtime}
        </Text>

        <Text style={styles.textBody}>Time in target for the last 7 days:</Text>
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
            data={data}
            width={widthScreen}
            height={150}
            chartConfig={chartConfig}
            accessor={'population'}
            backgroundColor={'#ECECEC'}

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

        <View style={styles.innerCotainer}>
          <Text style={styles.textBody}>Add new BG level read: </Text>

          <TextInput
            keyboardType="decimal-pad"
            placeholder="000.00"
            onChangeText={value => setAddBGlevel(value)}
            style={styles.inputT}
          />
          <Text style={{fontSize: 15, paddingTop: 15}}>mg/dl</Text>


          <Text style={styles.textBody}>BG read reason: </Text>

          <Picker
            itemStyle={{color: 'black'}}
            selectedValue={reason}
            onValueChange={value => setReason(value)}
            mode="dropdown"
            style={styles.ddown}>
            <Picker.Item label="Bedtime" value="0"></Picker.Item>
            <Picker.Item label="pre- meal/snack" value="1"></Picker.Item>
            <Picker.Item label="other" value="2"></Picker.Item>
          </Picker>

          <TouchableOpacity style={styles.buttonV} onPress={addBG}>
              <Text style={{color:'white', fontSize: 10, textAlign: 'center', fontWeight: 'bold'}}>Add</Text>
          </TouchableOpacity>

          </View>
            <View style={styles.innerCotainer2}>
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

            <Text style={styles.textBody}> Upcoming Appointments:{'\n'}
            </Text>
            <FlatList
            data={appointments}
            renderItem={({ item }) => (<TouchableOpacity onPress={()=>{alert('You have an appointment at the diabetes Center after '+item.weeks+' weeks on '+item.name+'. If you are scheduled to have your annual lab work please don’t forget to do them.')}}><Text style={styles.textBody2}>{item.name}</Text></TouchableOpacity>)}
              />


          <TouchableOpacity  style={styles.buttonR} onPress={()=>{navigation.navigate('appointments')}}>
           
              <Text style={{color:'white', fontSize: 15, textAlign: 'center', fontWeight: 'bold'}}>Add an appiontment</Text>


  
            
          </TouchableOpacity>
            

            </View>
            
        
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
    alignItems: 'center'
},
body: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,

},
textBody:{
    
    fontSize: 20,
    color: '#05375a', 
    textAlign: 'center',
    fontWeight: 'bold',
 }, 
 textBody2:{
   marginTop:5,
   padding: 10,
    
  fontSize: 15,
  backgroundColor: '#506c80', 
  color: 'white',
  textAlign: 'center',
  fontWeight: 'bold',
  borderRadius: 10,
}, 
 innerCotainer: {
  backgroundColor: 'white', margin: 10, alignItems: 'center',  borderRadius: 15, padding: 5, width: 380,
       flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
              shadowColor: "#000",
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
  marginBottom:100,
  width: 380,
      
    
    alignSelf: 'center',
              shadowColor: "#000",
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
  shadowColor: "#000",
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
  marginTop:20,
  justifyContent: 'center',
  borderRadius: 15,
  flexDirection: 'row',
  shadowColor: "#000",
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
  color: 'grey'
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

export default Home;
