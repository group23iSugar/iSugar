/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eqeqeq */
/* eslint-disable quotes */
/* eslint-disable keyword-spacing */
/* eslint-disable comma-dangle */
/* eslint-disable space-infix-ops */
/* eslint-disable no-trailing-spaces */
/* eslint-disable semi */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */

import React, {useState} from 'react';
import { StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    alert,
    Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';



  const passEditAR = ({ navigation, route }) => {
    var infoType = route.params.textE;
    const[password, setPass] = useState(''); 
     var flag1 = '';
    const check = () => {
      console.log(' DODODODODOD');
    //   var InsertAPIURL = "https://isugarserver.com/comparePass.php"; 

    //   var headers = {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   };
    //   console.log(password);
    //   var Data ={
    //     UserID: onlinUserID,
    //     pass: password,
    //   };
    //   // FETCH func ------------------------------------
    //   fetch(InsertAPIURL,{
    //   method:'POST',
    //   headers:headers,
    //   body: JSON.stringify(Data) //convert data to JSON
    // })
    //   .then((response)=>response.json()) //check response type of API (CHECK OUTPUT OF DATA IS IN JSON)
    //   .then((response)=>{
    //     console.log(response[0].flag + ' DODODODODOD');
    //     flag1 = response[0].flag
    // })
    // .catch((error)=>{
    //     alert("Error Occured" + error);
    // })
        
    
   

    var InsertAPIURL = "https://isugarserver.com/comparePass.php";   //API to  signup
 
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    onlinUserID = 121;
    console.log(onlinUserID + ' ID');
    console.log(password + ' PASSWORD');
    var Data = {
      UserID: onlinUserID,
      pass: password,
    };
  
  // FETCH func ------------------------------------
  fetch(InsertAPIURL,{
      method:'POST',
      headers:headers,
      body: JSON.stringify(Data) //convert data to JSON
  })
  .then((response)=>response.json()) //check response type of API (CHECK OUTPUT OF DATA IS IN JSON)
  .then((response)=>{
    console.log(response[0].flag + ' DODODODODOD');
    flag1 = response[0].flag;
  })
  .catch((error)=>{
      alert("Error Occured" + error);
  })

   if (flag1=='true'){
      if(infoType=='Account Information'){
        navigation.navigate('accEAR')
      }
      if (infoType=='Clinic Information'){
        navigation.navigate('clinicEAR')
      }
      if (infoType=='Personal Information'){
        navigation.navigate('personalEAR')
      }
      if (infoType=='Glucose and Ketones Monitoring Information'){
        navigation.navigate('ketonesEAR')
      }
      if (infoType=='Insulin Information'){
        navigation.navigate('insARE')
      }
      if (infoType=='Insulin Sensitivity Factor'){
        navigation.navigate('isfEditAR')
      }
      if (infoType=='Insulin to Carbohydrate Ratio (ICR)'){
        navigation.navigate('icrERA')
      }
      
    }
    
    }
    
  return (

    <View style={styles.container}>
       <View style={styles.header}>
         
         </View>
         <ScrollView>
        <View style={styles.body}>
        <Text style={styles.textBody}>{infoType}</Text>
        <View style={styles.outer}>
          <Text style={styles.textHeader}>من فضلك قم بإدخال كلمة مرور حسابك: </Text>
          <View style={styles.inputT}>
          <TextInput 
          style={{color:'black'}}
          autoCapitalize="none"
          onChangeText={(val)=>setPass(val)}
          />
          </View>
        </View>
           
        
        <TouchableOpacity onPress={()=>check()}>
                <LinearGradient
                    colors={['#E7EFFA', '#AABED8', '#AABED8']} style={styles.buttonR}
                >
                    <Text style={styles.textBody}>التأكيد</Text>
                  
                </LinearGradient>
            </TouchableOpacity>
        </View>
        </ScrollView>
    </View>      

    
  );
};


const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

export default passEditAR;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF0F2',
  },
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
buttonR: {
  alignItems: 'center',
  width: 100,
  height: 40,
  justifyContent: 'center',
  borderRadius: 15,
  flexDirection: 'row',
  
},
outer: {
    width: 275,
    marginTop: 100,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputT: {
    width: 150,
    height: 40,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
    
  },
textHeader:{
   fontSize: 17,
   color: '#05375a',  
   textAlign: 'center',
   marginTop: 10,
},
textBody:{
    fontSize: 20,
    color: '#05375a', 
    textAlign: 'center',
    fontWeight: 'bold',
 } 
});
