import React, {useState} from 'react';
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
} from 'react-native';
<<<<<<< HEAD
import LinearGradient from 'react-native-linear-gradient';
=======
import ModalDropdown from 'react-native-modal-dropdown';
import LinearGradient from 'react-native-linear-gradient';
import {Picker} from '@react-native-picker/picker';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import moment from 'moment';

>>>>>>> 02d91af4584ffbad2b0fa06dde4607295acc5fa6
const insuResult = ({navigation, route}) => {
  
  
  var total = route.params.result;
  var calcM = route.params.calcM;
  var reason= route.params.reasonD;
  var bg =  route.params.bg;
  var cho = route.params.cho;
  
  const [dose, setDose]=useState(0);
<<<<<<< HEAD
  var cDate =  new Date();
  
=======
  var cDate =  var tO = new Date(t);
  setDose(total);
>>>>>>> 02d91af4584ffbad2b0fa06dde4607295acc5fa6

  const insertE = ()=>{
    try {
          db.transaction( (tx) => {
              tx.executeSql(
               'INSERT INTO takenInsulinDose (UserID, BG_level, ReasonForInsulin, CHO, insulinDose, Dose_time, Dose_date) VALUES (?,?,?,?,?,?,?)',
                 [uID, bg, reason, cho, total, cDate, cDate]
             );
            
            //  getData();
         })
         
     } catch (error) {
         console.log(error);
     }

  }

  return (
    <LinearGradient colors={['#AABED8', '#fff']} style={styles.container}>
      <View style={{top: 10, alignItems: 'center'}}>
<<<<<<< HEAD
        <Image source={require('../images/logo.png')} style={styles.pic} />
=======
        <Image source={require('./images/logo.png')} style={styles.pic} />
>>>>>>> 02d91af4584ffbad2b0fa06dde4607295acc5fa6
      </View>
      <ScrollView style={styles.contView}>
        <Text
          style={{
            color: '#000',
            fontSize: 25,
            textAlign: 'left',
            paddingTop: 20,
            marginTop: 90,
            paddingLeft: 15,
            fontWeight: 'bold',
          }}>
          Your suggested insulin dose:
        </Text>

                <Text
          style={{
            color: '#000',
            fontSize: 30,
            textAlign: 'center',
            paddingTop: 20,
            marginTop: 10,
            paddingLeft: 15,
            fontWeight: 'bold',
          }}>
          {total}
        </Text>

        
          <Text
            style={{
              paddingLeft: 12,
              
              textAlign: 'center',
              fontSize: 20,
            }}>
            Please inter the insulin dose amount that you will take:
            

          </Text>

          <TextInput
            keyboardType="decimal-pad"
            defaultValue={''+total}

            onChangeText={value => setDose(value)}
            style={styles.inputT}></TextInput>
        
        

              <Text
            style={{
              paddingLeft: 12,
              marginTop: 20,
              textAlign: 'center',
              fontSize: 20,
            }}>
           Enter 0 if you are not taking any
            

          </Text>

      
        <View style={styles.vNext}>
<<<<<<< HEAD
                  {/* <Image source={require('./images/info.png')} style={{height:45 , width:45}} /> */}
=======
                  <Image source={require('./images/info.png')} style={{height:45 , width:45}} />
>>>>>>> 02d91af4584ffbad2b0fa06dde4607295acc5fa6
                   <TouchableOpacity
                   onPress={()=>navigation.navigate('how',{ calcM: calcM, reasonD: reason, bg: bg, cho: cho})}
                   >
          <Text style={{fontSize: 18, textAlign: 'center'}}>
            How did we calculate the dose?
          </Text>

        </TouchableOpacity>
      </View>
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
    alignSelf:'center',

    width: 150,
    fontSize: 25,
    shadowColor: '#000',
    height: 70,
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
    width: 360,
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
    paddingTop: 15,
    fontSize: 18,
  },

  vNext: {
    // to make items next to each other
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 80,
    marginLeft:25,

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

<<<<<<< HEAD
export default insuResult;
=======
export default insuResult;
>>>>>>> 02d91af4584ffbad2b0fa06dde4607295acc5fa6
