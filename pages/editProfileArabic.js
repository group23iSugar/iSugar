import React from 'react';
import { StyleSheet, 
    View,
    Image, 
    Text,
    ScrollView,
    TouchableOpacity, 
    Dimensions } from 'react-native'; 
import LinearGradient from 'react-native-linear-gradient';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';




const editProfileAR = ({ navigation }) => {
  return (

    <View style={styles.container}>
         
         <ScrollView> 
         <Text
          style={{
            color: '#05375a',
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'left',
            paddingTop: 20,
            paddingLeft: 15,
          }}>
          معلومات الحساب
        </Text>
        <View style={styles.body}>
           
        <TouchableOpacity onPress={()=>{navigation.navigate('passEAR', {textE: 'Account Information', }); }}>
            <LinearGradient style={styles.outer}
            colors={['#a8dadc', '#457b9d']}>
            <View style={styles.inner}>
            <Text style={styles.textBody}>معلومات الحساب</Text>
            </View>
            
            </LinearGradient>
            </TouchableOpacity>
     {/* //=================// */}
     {AccType == 'Non-Patient Account' ? null : (  <TouchableOpacity onPress={()=>{navigation.navigate('passEAR', {textE: 'Clinic Information', }); }}>
            <LinearGradient style={styles.outer}
            colors={['#a8dadc', '#457b9d']}>
            <View style={styles.inner}>
            <Text style={styles.textBody}>معلومات العيادة</Text>
            </View>
            
            </LinearGradient>
            </TouchableOpacity>)}
           
            {/* //=================// */}
            <TouchableOpacity onPress={()=>{navigation.navigate('passEAR', {textE: 'Personal Information', }); }}>
            <LinearGradient style={styles.outer}
            colors={['#a8dadc', '#457b9d']}>
            <View style={styles.inner}>
            <Text style={styles.textBody}> معلومات الشخصية</Text>
            </View>
            
            </LinearGradient>
            </TouchableOpacity>
            {/* //======= ==========// */}
            <TouchableOpacity onPress={()=>{navigation.navigate('passEAR', {textE: 'Glucose and Ketones Monitoring Information', }); }}>
            <LinearGradient style={styles.outer}
            colors={[ '#a8dadc', '#457b9d']}>
            <View style={styles.inner}>
            <Text style={styles.textBody}>معلومات مراقبة الجلوكوز والكيتونات</Text>
            </View>
            </LinearGradient>
            </TouchableOpacity>
            {/* //=================// */}
            <TouchableOpacity onPress={()=>{navigation.navigate('passEAR', {textE: 'Insulin Information', }); }}>
            <LinearGradient style={styles.outer}
            colors={[ '#a8dadc', '#457b9d']}>
            <View style={styles.inner}>
            <Text style={styles.textBody}> معلومات الإنسولين</Text>
            </View>
            
            </LinearGradient>
            </TouchableOpacity>
             {/* //=================// */}
             <TouchableOpacity onPress={()=>{navigation.navigate('passEAR', {textE: 'Insulin Sensitivity Factor', }); }}>
            <LinearGradient style={styles.outer}
            colors={['#a8dadc', '#457b9d']}>
            <View style={styles.inner}>
            <Text style={styles.textBody}>معامل حساسية الأنسولين</Text>
            </View>
            
             </LinearGradient>
            </TouchableOpacity>
              {/* //=================// */}
              <TouchableOpacity onPress={()=>{navigation.navigate('passEAR', {textE: 'Insulin to Carbohydrate Ratio (ICR)', }); }}>
            <LinearGradient style={styles.outer}
            colors={[ '#a8dadc', '#457b9d']}>
            <View style={styles.inner}>
            <Text style={styles.textBody}>معامل الكربوهيدرات{'\n'} Ratio (ICR)</Text>
            </View>
            
            </LinearGradient>
            </TouchableOpacity>
           
        </View>
        </ScrollView>
    </View>      

    
  );
};


const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

export default editProfileAR;

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
outer: {
    width: 275,
    height: 110,
    marginTop: 15,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
  inner: {
    width: 250,
    height: 110,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white'
    
  },
textHeader:{
   fontSize: 15,
   color: '#05375a', 
},
textBody:{
    fontSize: 20,
    color: '#05375a', 
    textAlign: 'center',
    fontWeight: 'bold',
 } 
});


