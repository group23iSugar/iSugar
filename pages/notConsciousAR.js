import React, {Component, useEffect, useState} from 'react';
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
  Alert,
  Dimensions,
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import LinearGradient from 'react-native-linear-gradient';
import {Picker} from '@react-native-picker/picker';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RNSearchablePicker from 'react-native-searchable-picker';
import react from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import SQLite from 'react-native-sqlite-storage';
import PushNotification from 'react-native-push-notification';

const notConsciousAR = ({navigation}) => {
  //==================================================================

  // const [weight, setWeight] = useState(0);
  // const [age, setAge] = useState(0);
  const [glucagon, setGlucagon] = useState(0);
  const [CHO, setCHO] = useState(0);
  const [isOnemg, setisOnemg] = useState(false);
  //if age >= 4 -> Show intranasal glucagon

  useEffect(() => {
    glucaNum();
    CHONum();
  }, []);

  //=====================Glucagon Function================

  const glucaNum = () => {
    if (age >= 4) {
      ageFour = true;
    }
    if (age < 6) {
      if (weight < 20) {
        setGlucagon(0.5);
        setisOnemg(true);
      } else {
        setGlucagon(1);
      }
    } else {
      // if age 6 or above
      setGlucagon(1);
    }
  };

  //======================================================
  //=====================CHO Function================

  const CHONum = () => {
    if (age < 5) {
      setCHO(5);
    } else if (age < 10) {
      setCHO(10);
    } else {
      setCHO(15);
    }
  };

  //======================================================

  return (
    <LinearGradient colors={['#AABED8', '#fff']} style={styles.container}>
      <View style={{top: 10, alignItems: 'center'}}>
        <Image source={require('./images/logo.png')} style={styles.pic} />
      </View>
      <ScrollView style={styles.contView}>
        <Text
          style={{
            color: '#000',
            fontSize: 25,
            textAlign: 'left',
            paddingTop: 20,
            paddingLeft: 15,
          }}></Text>
        <Text style={styles.inpTxt}></Text>

        <Text style={styles.inpTxt}>
          اعط المريض
          {glucagon}
          مجم من الجلوكاجون واتصل على الاسعاف (٩٧٧  في السعودية).
          {'\n'}
          {'\n'}
          لإعطاء الجلوكاجون في العضل اتبع الخطوات التالية:
          {'\n'}
          -أزل غطاء الأمان من العبوة التي تحتوي على العلاج المسحوق{'\n'}
          -صل الإبرة بالحقنة المملؤة بالسائل{'\n'}
          -أدخل الحقنة في العبوة ثم ادفع كل السائل إلى داخل العبوة {'\n'}
          -أزل الحقنة ثم رج العلبة جيداً حتى يذوب المسحوق كلياً{'\n'}
          -أعد إدخال الحقنة في العبوة واسحب
          {glucagon}
          مل من المحلول {'\n'}
          -أعطي المريض حقنة العلاج في العضل ( الجزء الخارجي من الفخذ أو الجزء
          الخارجي من العضد){'\n'}
        </Text>

        {isOnemg ? (
          <Text
            style={{
              paddingRight: 20,
              fontSize: 18,
              color: 'grey',
            }}>
            - احتفظ بباقي المحلول في الثلاجة لمدة ٢٤ ساعة ثم تخلص منه {'\n'}
          </Text>
        ) : null}

        {ageFour ? (
          <Text
            style={{
              paddingRight: 20,
              fontSize: 18,
              color: 'grey',
            }}>
            أو {'\n'}
            أعطي المريض ٣ مجم من الجلوكاجون داخل فتحة الأنف واتصل على الإسعاف
            (٩٧٧ في السعودية){'\n'}
             لإعطاء الجلوكاجون عن طريق الأنف: {'\n'}
             العلاج جاهز
            للاستعمال الفوري ولا يحتاج إلى تحضير.{'\n'}
             فقط أزل تغليف الأمان ثم أدخل
            طرف الجهاز داخل فتحة أنف الطفل ثم اضغط المكبس كلياً لإعطاء كامل جرعة
            العلاج.
          </Text>
        ) : null}

        <TouchableOpacity
          style={{
            marginTop: 30,
            paddingTop: 15,
            marginBottom: 15,
            paddingBottom: 30,
            backgroundColor: '#6496d7',
          }}
          onPress={() => navigation.navigate('hypoAR')}>
          <Text style={{fontSize: 18, textAlign: 'center'}}>حسناً</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const {height} = Dimensions.get('screen');
const height_logo = height * 0.15;

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
    width: height_logo,
    height: height_logo,
    marginRight: 10,
  },
  inputT2: {
    //inputs field
    alignSelf: 'center',
    alignItems: 'center',
    marginLeft: 110,
    color: '#000',
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
    paddingRight: 20,
    paddingTop: 15,
    fontSize: 18,
    color: 'grey',
  },

  vNext: {
    // to make items next to each other
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 30,
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
  picker: {
    color: 'grey',
  },
});

export default notConsciousAR;
