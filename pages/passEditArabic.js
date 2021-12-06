import React, {useState} from 'react';
import { StyleSheet, 
    View,
    Image, 
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput, 
    Dimensions } from 'react-native'; 
import LinearGradient from 'react-native-linear-gradient';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';



const passEditAR = ({ navigation, route }) => {
    var infoType = route.params.textE;
    const[password, setPass] = useState(''); 
     var flag1 = '';
    const check = () => {
        if (AccType == 'Patient Account'){
var InsertAPIURL = "http://192.168.12.1/isugar/comparePass.php"; 
      var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };
      
      var Data ={
        UserID: onlinUserID,
        pass: password
      };
      // FETCH func ------------------------------------
      fetch(InsertAPIURL,{
      method:'POST',
      headers:headers,
      body: JSON.stringify(Data) //convert data to JSON
    })
      .then((response)=>response.json()) //check response type of API (CHECK OUTPUT OF DATA IS IN JSON)
      .then((response)=>{
        flag1 = response[0].flag
    })
    .catch((error)=>{
        alert("Error Occured" + error);
    })
        } else {
            
        }
    
    if (flag1=='true'){
      if(infoType=='Account Information'){
        navigation.navigate('AccEdit')
      }
      if (infoType=='Clinic Information'){
        navigation.navigate('clinicEdit')
      }
      if (infoType=='Personal Information'){
        navigation.navigate('personalEdit')
      }
      if (infoType=='Glucose and Ketones Monitoring Information'){
        navigation.navigate('ketonesEdit')
      }
      if (infoType=='Insulin Information'){
        navigation.navigate('insulinEdit')
      }
      if (infoType=='Insulin Sensitivity Factor'){
        navigation.navigate('isfEdit')
      }
      if (infoType=='Insulin to Carbohydrate Ratio (ICR)'){
        navigation.navigate('icrEdit')
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
  alignItems: 'center',
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


