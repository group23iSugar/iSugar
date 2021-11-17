import React from 'react';
import { StyleSheet, 
    View,
    Image, 
    Text,
    TouchableOpacity, 
    useState,
    Button,
    Platform, 
    TextInput,
    Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import react from 'react';

const logIn = ({ navigation }) => {
  const found = false;
  const [data, setData] = react.useState({
      email: '',
      password: '',
      check_textInputChange: false,
      secureTextEntry: true,
  });
  const textInputChange = (val) => { 
    if( val.trim().length != 0 ) {
        setData({
            ...data,
            email: val,
            check_textInputChange: true,
            isValidUser: true
        });
    } else {
        setData({
            ...data,
            email: val,
            check_textInputChange: false,
            isValidUser: false
        });
    }
}
const handlePasswordChange = (val) => {
  if( val.trim().length >= 8 ) {
      setData({
          ...data,
          password: val,
          isValidPassword: true
      });
  } else {
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
const logI = async () => {
  if (data.email.length == 0 || data.password.length == 0 ){
    alert('please fill all the entries');
  } else {
   try {
      db.transaction( (tx) => {
          tx.executeSql(
            'SELECT UserID, firstName, lastName, email, pass, accountType FROM UserAccount',
            [],
            (tx, results) => {
              var rows = results.rows;
              for (let i = 0; i < rows.length; i++) {
                // var id =
                  var item = rows.item(i).pass;
                  var itemS = rows.item(i).email;
                  uID = rows.item(i).UserID;
                  if (data.email == itemS && data.password == item){
                    found = true;
                    navigation.navigate('calc')
                    
                    return;
                  }
                }
            }   
  ) 
      

}  ) 
 } catch (error) {
     console.log(error);
 }
 if (found == false) {
   alert('Your email o password is not correct, please try again');
 }
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
        <Text style={styles.text_footer}>Email</Text>
        <View style={styles.action}>
          <MaterialIcons
           name="alternate-email"
           color='#8CA1BB'
           size={20}

          />
         
          <TextInput 
          style={styles.textInput}
          placeholder='example@gmail.com'
          autoCapitalize="none"
          onChangeText={(val) => textInputChange(val)}
          />
          {data.check_textInputChange ? 
               
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                : null}
          </View>

      
      <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Password</Text>
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
                        size={20}
                    />
                    : 
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
          </View>
          <View style={styles.buttonF}>
            <TouchableOpacity > 
              <Text  style={styles.fPassText}>Forgot password?</Text> 
            </TouchableOpacity>
            </View>
        
        
        <View style={styles.buttonV}>
        <TouchableOpacity onPress={()=>logI()}>
                <LinearGradient
                    colors={['#E7EFFA', '#AABED8', '#AABED8']} style={styles.buttonR}
                >
                    <Text style={styles.titleB}>Log in</Text>
                  
                </LinearGradient>
            </TouchableOpacity>
            </View>
            <View style={styles.buttonS}>
            <TouchableOpacity onPress={()=>navigation.navigate('signup')}>
                  
               
                    <Text  style={styles.SignUptext}>Don't have an account? Sign up!</Text>
                
            </TouchableOpacity>
            </View>
        </View>
     </View>

         

    
  );
};


const {height} = Dimensions.get("screen");
const height_logo = height * 0.15;

export default logIn;

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
    flex: 2.5,
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
  fontSize: 20
},
textInput: {
  flex: 1,
  marginTop: Platform.OS === 'ios' ? 0 : -12,
  paddingLeft: 10,
  color: '#05375a',
},
title: {
    color: '#05375a',
    fontSize: 25,
    fontWeight: 'bold'
},
titleB: {
  color: '#05375a',
  fontSize: 20,
  fontWeight: 'bold',
 
},
buttonV: {
  alignItems: 'center',
  marginTop: 80
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
  borderBottomWidth: 1,
  borderBottomColor: '#f2f2f2',
  paddingBottom: 5
},
buttonR: {
  alignItems: 'center',
  width: 200,
  height: 55,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 15,
  flexDirection: 'row',
  
}
});


