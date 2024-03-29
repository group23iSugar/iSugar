/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable jsx-quotes */
/* eslint-disable quotes */
/* eslint-disable no-useless-escape */
/* eslint-disable keyword-spacing */
/* eslint-disable eqeqeq */
/* eslint-disable space-infix-ops */
/* eslint-disable no-shadow */
/* eslint-disable semi */
/* eslint-disable comma-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-undef */
import React, {useEffect}from 'react';
import {  StyleSheet, 
  View,
  Image, 
  Text,
  TouchableOpacity,
  useState,
  Button,
  Platform, 
  TextInput,
  ScrollView,
  Dimensions,
Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import react from 'react';
import {openDatabase} from 'react-native-sqlite-storage';
import SQLite from 'react-native-sqlite-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


  const AccInfoARE = ({ navigation, route }) =>{
    useEffect(() => {
        getLocalInfo();
        }, []);
        const [data, setData] = react.useState({
          fName: '',
          lName: '',
          email: '',
          password: '',
          secureTextEntry: true,
          isValidFN: true,
          isValidLN: true,
          isValidEmail: true,
          isValidPassword: true,
      });
      const [pass, setPass] = react.useState('');
      
        const fnameCheck = (val) => {
          if (val.trim().length > 2){
            setData({
              ...data,
              fName: val,
              isValidFN: true,
    
            });
          } else {
            setData({
              ...data,
              fName: val,
              isValidFN: false,
    
            });
        }
      }
      
      const validFN = (val) => {
        if( val.trim().length > 2 ) {
            setData({
                ...data,
                isValidFN: true
            });
        } else {
            setData({
                ...data,
                isValidFN: false
            });
        }
    }
      const lnameCheck = (val) => {
        if (val.trim().length != 0){
          setData({
            ...data,
            lName: val,
            isValidLN: true,
    
          });
          
        } else {
          setData({
            ...data,
            lName: val,
            isValidLN: false,
    
          });
          return false;
      }
    }
    const validLN = (val) => {
      if( val.trim().length > 2 ) {
          setData({
              ...data,
              isValidLN: true
          });
      } else {
          setData({
              ...data,
              isValidLN: false
          });
      }
    }
    const emailCheck = (val) => {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (reg.test(val) === false) {
        setData({ 
          ...data,
          email: val, 
          isValidEmail: false,
        });
        
      }
      else {
        setData({ 
          ...data,
          email: val, 
          isValidEmail: true,
        });
      }
    }
    const validEmail = (val) => {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if( reg.test(val) === true ) {
          setData({
              ...data,
              isValidEmail: true
          });
      } else {
          setData({
              ...data,
              isValidEmail: false
          });
      }
    }
        const handlePasswordChange = (val) => {
          let regPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
          if( regPass.test(val) == true) {
              setData({
                  ...data,
                  password: val,
                  isValidPassword: true
             
                });
             
               } 
          else {
              setData({
                  ...data,
                  password: val,
                  isValidPassword: false
              });
          }
        }
    
        
        const updateSecureTextEntry = () => {
          setData({
              ...data,
              secureTextEntry: !data.secureTextEntry
          });
        }
      
    
    
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
                        console.log(rows.item(i).UserID + ' local ID');
                        console.log(1 + ' global ID');   
                        var userID = rows.item(i).UserID;
                          setData({
                            ...data,
                            fName: rows.item(i).firstName,
                            lName: rows.item(i).lastName,
                            email: rows.item(i).email,
                          });
                          return;
                        
                        
                     
                      }
                  }   
        ) 
            
        
        }  ) 
        } catch (error) {
           console.log(error);
        }
      
    }
    //=========================================//
 
    const localUpdate =() => {
      if (data.isValidPassword){
        onlineDBPP();
        try {
            console.log('in try2');
            db.transaction( (tx) => {
                tx.executeSql(
                  'UPDATE UserAccount SET firstName=?, lastName=?, email=?  WHERE UserID=? ',
                  [data.fName, data.lName, data.email, 1],
                  (tx, results) => {
                    console.log('Results', results.rowsAffected);
                 if (results.rowsAffected > 0) {
                  navigation.navigate('editProAR');
                      }
                  }   
        ) 
            
        
        }  ) 
        } catch (error) {
           console.log(error);
        }
      } else {
        alert('من فضلك قم بتعبئة جميع الحقول');
      }
      navigation.navigate('editProAR');
    
    }
    
    const onlineDBPP = () => {
      if (AccType == 'Patient Profile'){
        console.log('in DB1');
        var InsertAPIURL = "https://isugarserver.com/updateUserAccount.php";   //API to  signup
      
        var headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        };
        
        var Data ={
          UserID: onlinUserID,
          firstname: data.fName,
          lastname: data.lName,
          email: data.email,
          pass: data.password,
        };
      
      // FETCH func ------------------------------------
      fetch(InsertAPIURL,{
          method:'POST',
          headers:headers,
          body: JSON.stringify(Data) //convert data to JSON
      })
      .then((response)=>response.json()) //check response type of API (CHECK OUTPUT OF DATA IS IN JSON)
      .then((response)=>{ 
        alert('تم التحديث!')     // If data is in JSON => Display alert msg
      })
      .catch((error)=>{
          alert("Error Occured" + error);
      })
      }
      
    }

    return (
      <View style={styles.container}>
      <LinearGradient colors={['#E7EFFA', '#E7EFFA','#AABED8']} style={styles.container}>
         <View style={styles.header}>
         <Image source={require('../images/logo.png')}
         style={styles.logo}
         resizeMode='stretch'/>
         </View>
      </LinearGradient>
      <View style={styles.footer}>
        <ScrollView>
     
      <Text style={styles.title}>تعديل معلومات الحساب{'\n'}</Text> 
    
      <Text style={styles.text_footer}>الاسم الأول</Text>
        <View style={styles.action}>
          
         
          <TextInput 
          style={styles.textInput}
          defaultValue = {data.fName}
          autoCapitalize="none"
          onChangeText={(val) => fnameCheck(val)}
          onEndEditing={(e)=>validFN(e.nativeEvent.text)}
          />
          
          
          
          </View>
          { data.isValidFN ? null : 
          <Text style={styles.errorMsg}>يجب على الاسم أن يحتوي على حرفين على الأقل</Text>}
          <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>الاسم الاخير</Text>
        <View style={styles.action}>
          
         
          <TextInput 
          style={styles.textInput}
          defaultValue={data.lName}
          autoCapitalize="none"
          onChangeText={(val) => lnameCheck(val)}
          onEndEditing={(e)=>validLN(e.nativeEvent.text)}
          />
            
          
          </View>
          { data.isValidLN ? null : 
          <Text style={styles.errorMsg}>يجب على الاسم أن يحتوي على حرفين على الأقل</Text>}
          <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>البريد الالكتروني</Text>
        <View style={styles.action}>
        <MaterialIcons
           name="alternate-email"
           color='#8CA1BB'
           size={20}

          />
         
          <TextInput 
          style={styles.textInput}
          defaultValue={data.email}
          autoCapitalize="none"
          onChangeText={(val) => emailCheck(val)}
          onEndEditing={(e)=>validEmail(e.nativeEvent.text)}
          />
          
          
          
          </View>
          { data.isValidEmail ? null : 
          <Text style={styles.errorMsg}>من فضلك ادخل بريد إلكتروني صالح</Text>}
          <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>كلمة المرور</Text>
        <View style={styles.action}>
          <FontAwesome
           name="lock"
           color='#8CA1BB'
           size={20}

          />
          <TextInput 
          style={styles.textInput}
          placeholder='***********'
          autoCapitalize="none"
          secureTextEntry={data.secureTextEntry ? true : false}
          onChangeText={(val) => handlePasswordChange(val)}
          />
           <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={18}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={18}
                    />
                    }
                </TouchableOpacity>
          </View>
          
          <View style={styles.buttonV}>
        <TouchableOpacity onPress={()=>localUpdate()} >
                <LinearGradient
                    colors={['#E7EFFA', '#AABED8', '#AABED8']} style={styles.buttonR}
                >
                    <Text style={styles.titleB}>تحديث</Text>
                  
                </LinearGradient>
            </TouchableOpacity>
            </View>
           
          </ScrollView>
         
        </View>
     </View>
  
         
  
    );
  
                  };



const {height} = Dimensions.get("screen");
const height_logo = height * 0.15;

export default AccInfoARE;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AABED8',
  },
  SignUptext: {
    backgroundColor: '#fff',
    color: '#4c4c4c',
    fontSize: 18,
    
  },
  fPassText: {
    alignItems: 'flex-start',
    marginTop: 5,
    backgroundColor: '#fff',
    color: '#4c4c4c',
    fontSize: 15
    
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
},
  logo: {
    width: height_logo,
    height: height_logo,

  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
},
footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 10,
},
text_footer: {
  color: '#05375a',
  fontSize: 17
},
textInput: {
  flex: 1,
  marginTop: Platform.OS === 'ios' ? 0 : -12,
  paddingLeft: 10,
  color: '#05375a',
},
title: {
    color: '#05375a',
    fontSize: 20,
    fontWeight: 'bold'
},

titleB: {
  color: '#05375a',
  fontSize: 20,
  fontWeight: 'bold',
 
},
buttonV: {
  marginTop: 45,
  alignItems: 'center',
  
},
buttonS: {
  alignItems: 'center',
  marginTop: 40,
},
buttonF: {
  alignItems: 'flex-start',
  marginTop: 10,
},
action: {
  flexDirection: 'row',
  marginTop: 10,
  borderRightWidth: 1,
  borderBottomWidth: 1,
  borderColor: '#CACDD1',
  paddingBottom: 5,
  
},
buttonR: {
  alignItems: 'center',
  width: 100,
  height: 40,
  justifyContent: 'center',
  borderRadius: 15,
  flexDirection: 'row',
  
},
textD:{
justifyContent: 'space-between',
marginTop: 25
}
});
