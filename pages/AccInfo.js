/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-useless-escape */
/* eslint-disable keyword-spacing */
/* eslint-disable jsx-quotes */
/* eslint-disable semi */
/* eslint-disable eqeqeq */
/* eslint-disable space-infix-ops */
/* eslint-disable no-trailing-spaces */
/* eslint-disable comma-dangle */
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
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Feather from 'react-native-vector-icons/Feather';
import react from 'react';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

global.AccType = 'Patient Account';
  const AccInfo = ({ navigation, route }) =>{
//  useEffect(() => {
//   register();
//     }, []);
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
    
 
    const register = async () => {

         if ( data.fName.trim().length>2 && data.lName.trim().length>2 && data.isValidEmail == true && data.isValidPassword == true ){
          navigation.navigate('clinic')
          //  onlineDB();
          try {
            db.transaction( (tx) => {
                tx.executeSql(
                 'INSERT INTO UserAccount (firstName, lastName, email, pass, accountType) VALUES (?,?,?,?,?)',
                   [data.fName, data.lName, data.email, data.password, AccType]
               );
              
              //  getData();
           }) 
           
       } catch (error) {
           console.log(error);
       }
       try {
        db.transaction( (tx) => {
            tx.executeSql(
              'SELECT UserID, firstName, lastName, email, pass, accountType FROM UserAccount',
              [],
              (tx, results) => {
                var rows = results.rows;
                for (let i = 0; i < rows.length; i++) {           
                    var userEmail = rows.item(i).email;
                    if (data.email == userEmail){
                      if (AccType != 'Patient Account'){
                        navigation.navigate('personal')
                      // navigation.navigate('clinic')
                     }
                      // else{
                      //   navigation.navigate('personal')
                      // }
                      return;
                    }
                  }
              }   
    ) 
        
  
  }  ) 
   } catch (error) {
       console.log(error);
   }
           
         } else if (data.isValidPassword == false){
          alert('Password must contain at least on capital litter and a special character!');
         }
           else {
           
            alert('Please fill all the entries ');
        
         
          
           }

    }
  
   



//-----------------------------
const onlineDB = () => {
  if (AccType == 'Patient Account'){
    console.log('in DB1');
    var InsertAPIURL = "https://isugarserver.com/userAccount.php";   //API to  signup
  
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    
    var Data ={
      firstname: data.fName,
      lastname: data.lName,
      email: data.email,
      pass: data.password,
      accountType: AccType
    };
  
  // FETCH func ------------------------------------
  fetch(InsertAPIURL,{
      method:'POST',
      headers:headers,
      body: JSON.stringify(Data) //convert data to JSON
  })
  .then((response)=>response.json()) //check response type of API (CHECK OUTPUT OF DATA IS IN JSON)
  .then((response)=>{
    if (response[0].Message == "false"){
      alert('Email already exists!');
    } else {
      console.log('Response', response[0].Message);
      // getOnlineInfo(); 
    }
  })
  .catch((error)=>{
      // alert("Error Occured" + error);
  })
  } 
}
//---------------------------------------
const getOnlineInfo = () => {
  var InsertAPIURL = "https://isugarserver.com/findAccount.php"; 
  var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  
  var Data ={
    email: data.email
  };
  // FETCH func ------------------------------------
  fetch(InsertAPIURL,{
  method:'POST',
  headers:headers,
  body: JSON.stringify(Data) //convert data to JSON
})
  .then((response)=>response.json()) //check response type of API (CHECK OUTPUT OF DATA IS IN JSON)
  .then((response)=>{
    onlinUserID= response[0].userID;
    navigation.navigate("clinic"); //Navigate to next screen if authentications are valid
    // alert('ID: '+onlinUserID);
})
.catch((error)=>{
    alert("Error Occured" + error);
})
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
      {AccType == 'Patient Account' ? 
      <Text style={styles.title}>Step 1 of 7: Account Information{'\n'}</Text> :
      <Text style={styles.title}>Step 1 of 6: Account Information{'\n'}</Text>
    }
      <Text style={styles.text_footer}>First Name</Text>
        <View style={styles.action}>
          
         
          <TextInput 
          style={styles.textInput}
          placeholder ='eg. Sara'
          laceholderTextColor={'grey'}
          autoCapitalize="none"
          onChangeText={(val) => fnameCheck(val)}
          onEndEditing={(e)=>validFN(e.nativeEvent.text)}
          />
          
          
          
          </View>
          { data.isValidFN ? null : 
          <Text style={styles.errorMsg}>Name must be at least 2 characters long.</Text>}
          <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Last Name</Text>
        <View style={styles.action}>
          
         
          <TextInput 
          style={styles.textInput}
          placeholder ='eg. Alawwad'
          laceholderTextColor={'grey'}
          autoCapitalize="none"
          onChangeText={(val) => lnameCheck(val)}
          onEndEditing={(e)=>validLN(e.nativeEvent.text)}
          />
        
          
          </View>
          { data.isValidLN ? null : 
          <Text style={styles.errorMsg}>Name must be at least 2 characters long.</Text>}
          <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Email</Text>
        <View style={styles.action}>

          <TextInput 
          style={styles.textInput}
          placeholder='example@gmail.com'
          laceholderTextColor={'grey'}
          autoCapitalize="none"
          onChangeText={(val) => emailCheck(val)}
          onEndEditing={(e)=>validEmail(e.nativeEvent.text)}
          />
          
          
          
          </View>
          { data.isValidEmail ? null : 
          <Text style={styles.errorMsg}>Please enter a valid email.</Text>}
          <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Password</Text>
        <View style={styles.action}>
          <TextInput 
          style={styles.textInput}
          placeholder='***********'
          laceholderTextColor={'grey'}
          autoCapitalize="none"
          secureTextEntry={data.secureTextEntry ? true : false}
          onChangeText={(val) => handlePasswordChange(val)}
          />
           <TouchableOpacity
                    onPress={updateSecureTextEntry}
                 />
          </View>
          
          <View style={styles.buttonV}>
        <TouchableOpacity onPress={()=>register()} >
                <LinearGradient
                    colors={['#E7EFFA', '#AABED8', '#AABED8']} style={styles.buttonR}
                >
                    <Text style={styles.titleB}>Continue</Text>
                  
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

export default AccInfo;

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
