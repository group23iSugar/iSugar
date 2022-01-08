import React from 'react';
import { StyleSheet, 
    View,
    Image, 
    Text,
    TouchableOpacity, 
    Dimensions } from 'react-native'; 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';



const logoScreenAR = ({ navigation }) => {
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
        <Text style={styles.title}>انضم الى السّكر، لحياة سكرية أفضل!<EvilIcons name="heart" size={25} color="#FF6B6B"  /> </Text>
        <Text>


        </Text>
        <Text style={styles.text}>سجل الى حسابك الآن</Text>
        <View style={styles.buttonV}>
        <TouchableOpacity onPress={()=> navigation.navigate('logo')}
        >
          <Text style={styles.text}>English</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('logInAR')}>
                <LinearGradient
                    colors={['#E7EFFA', '#AABED8', '#AABED8']} style={styles.buttonR}
                >
                    <Text style={styles.titleB}>فلنبدأ!<MaterialIcons 
                        name="navigate-next"
                        color='#05375a'
                        size={20}
                    /></Text>
                  
                </LinearGradient>
            </TouchableOpacity>
        </View>
     </View>

    </View>      

    
  );
};


const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

export default logoScreenAR;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AABED8',
  }, 
  text: {
    color: '#4c4c4c',
    fontSize: 15,
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
    flex: 0.5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 10,
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
  alignItems: 'flex-end',
  marginTop: 40,
  flexDirection: 'row',
  justifyContent: 'space-between'
},
buttonR: {
  alignItems: 'flex-end',
  width: 150,
  height: 40,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 15,
  flexDirection: 'row',
  marginRight: 15
}
});


