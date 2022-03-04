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
  },[]);

  const [flag, setFlag] = useState(false);
  const [within, setWitin] = useState(0);
  const [above, setAbove] = useState(0);
  const [under, setUnder] = useState(0);
  const [bgArr, setBgArr] = useState([]);
  const [lastBG, setLastBG] = useState(0);
  const [lastBGtime, setLastBGtime] = useState('');

  //===========================Functions===============

  const dashBoard = async() => {

    await retrieveDash2();
    
    var w =0;
    var a=0;
    var u=0;
    

    for (let i = 0; i < bgArr.length; i++) {
      if (bgArr[i] >= fromBGHome && bgArr[i] <= toBGHome){
        w++;
      } else if (bgArr[i] > toBGHome){
        a++;
      }else if (bgArr[i] < fromBGHome){
        u++;
      }
    }

    var total = w + a + u;
    var m = (a/total)*100;
    if (m >= 50){
      setFlag(true);
    }else{
      setFlag(false);
    }

    setWitin(w);
    setAbove(a);
    setUnder(u);

  };
  //==================================================
  //===========================RETRIVE================
  const retrieveDash = () => {
    // insulinPen table
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
  const retrieveDash2 = async() => {
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
            var lastString = rows.item(rows.length-1).DateTime;
            var d = new Date(lastString);
            var momFormat = moment(d).format('yyyy/MM/DD  hh:mm a');

            setLastBGtime(momFormat);
            setLastBG(rows.item(rows.length-1).BGlevel);

            for (let i = 0; i < rows.length; i++) {
              var timeString = rows.item(i).DateTime;
              var toObj = new Date(timeString);
              var bgHome = rows.item(i).BGlevel;
              var userid = rows.item(i).UserID;
              console.log((time - toObj) / (1000 * 60 * 60));

              if ((time - toObj) / (1000 * 60 * 60) <= 168) {
                //168 is the last 7 days in hours

                bgArr1.push(bgHome);
              }
            }
            setBgArr(bgArr1);
            console.log(bgArr1 + '   This is bg array');
            console.log(
              fromBGHome + '  ' + toBGHome + '   This is from and to',
            );
          },
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

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


    
    <LinearGradient colors={['#AABED8', '#fff']} style={styles.container}>
      <View style={{top: 10, alignItems: 'center'}}>
        <Image source={require('./images/logo.png')} style={styles.pic} />
      </View>
      <ScrollView style={styles.contView}>
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

        <Text style={styles.inpTxt}>Last BG level Read: {lastBG+'\n'}Time: {lastBGtime}</Text>

        <Text style={styles.inpTxt}>Time in target for the last 7 days:</Text>
                <TouchableOpacity
          style={{
            marginLeft: 350,
          }}
          onPress={dashBoard}>
          <Image source={require('./images/upd.png')} style={{height: 25, width: 25,}} />
        </TouchableOpacity>

        {((bgArr.length > 0)&&(within>0||above>0||under>0)) ? (
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
        {flag? <Text style={styles.msg}>contact diabetes center as you are above target 50% of times</Text> :null}
        <Text>{'\n\n'}</Text>
      

      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  prefix: {
    backgroundColor: '#9c4',
  },
  text: {
    color: '#000',
    fontSize: 30,
  },
  pic: {
    width: 70,
    height: 90,
  },
  inputT: {
    //inputs field

    width: 110,
    fontSize: 16,
    shadowColor: '#000',
    height: 50,
    textAlign: 'center',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.23,
    shadowRadius: 0.62,

    elevation: 2,
  },

  contView: {
    //Conten's view
    backgroundColor: '#fff',
    height: 550,
    width: Dimensions.get('window').width,
    //Dimensions.get("window").width} 360
    alignSelf: 'center',
    top: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 7,
  },

  inpTxt: {
    //lables
    paddingLeft: 20,
    fontSize: 18,
    color: 'gray',
  },
    msg: {
    //lables
    paddingLeft: 20,
    paddingTop: 15,
    fontSize: 18,
    color: 'red',
  },


  vNext: {
    // to make items next to each other
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 10,
  },

  button: {
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 10,
    width: 300,
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingLeft: 30,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.23,
    shadowRadius: 0.9,

    elevation: 3,
  },

  ddown: {
    //drop down list style

    paddingLeft: 0,
    paddingTop: 13,
    shadowColor: '#000',

    height: 40,
    width: 160,

    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    
    shadowOpacity: 0.23,
    shadowRadius: 0.62,

    elevation: 2,
    backgroundColor: '#f5f5f5',
  },
});

export default Home;
