/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import { StyleSheet, 
    View,
    Text,
    ScrollView,
    TouchableOpacity, 
    Dimensions } from 'react-native'; 
import LinearGradient from 'react-native-linear-gradient';
import SQLite from 'react-native-sqlite-storage';
import Entypo from 'react-native-vector-icons/Entypo';



const editProfile = ({ navigation }) => {
  return (

    <View style={styles.container}>
      
         <ScrollView> 
         <View style={{top: 10, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', padding: 30}}>
        <TouchableOpacity onPress={()=>navigation.openDrawer()}>
         <Entypo name="menu" color="#05375a" size={35} />
         </TouchableOpacity>
         <View style={{alignItems: 'center', marginRight: 130, paddingTop: -10, paddingEnd: 15}}>
         <Text
          style={{
            color: '#05375a',
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'center',
            paddingLeft: 15,
          }}>
            Profile Information
        </Text>
         </View>
      </View>
        <View style={styles.body}>
           
        <TouchableOpacity onPress={()=>{navigation.navigate('pass', {textE: 'Account Information', }); }}>
            <LinearGradient style={styles.outer}
            colors={['#a8dadc', '#457b9d']}>
            <View style={styles.inner}>
            <Text style={styles.textBody}>Account Information</Text>
            </View>
            
            </LinearGradient>
            </TouchableOpacity>
     {/* //=================// */}
     {AccType == 'Non-Patient Account' ? null : (  <TouchableOpacity onPress={()=>{navigation.navigate('pass', {textE: 'Clinic Information', }); }}>
            <LinearGradient style={styles.outer}
            colors={['#a8dadc', '#457b9d']}>
            <View style={styles.inner}>
            <Text style={styles.textBody}>Clinic Information</Text>
            </View>
            
            </LinearGradient>
            </TouchableOpacity>)}
           
            {/* //=================// */}
            <TouchableOpacity onPress={()=>{navigation.navigate('pass', {textE: 'Personal Information', }); }}>
            <LinearGradient style={styles.outer}
            colors={['#a8dadc', '#457b9d']}>
            <View style={styles.inner}>
            <Text style={styles.textBody}>Personal Information</Text>
            </View>
            
            </LinearGradient>
            </TouchableOpacity>
            {/* //======= ==========// */}
            <TouchableOpacity onPress={()=>{navigation.navigate('pass', {textE: 'Glucose and Ketones Monitoring Information', }); }}>
            <LinearGradient style={styles.outer}
            colors={[ '#a8dadc', '#457b9d']}>
            <View style={styles.inner}>
            <Text style={styles.textBody}>Glucose and Ketones Monitoring Information</Text>
            </View>
            </LinearGradient>
            </TouchableOpacity>
            {/* //=================// */}
            <TouchableOpacity onPress={()=>{navigation.navigate('pass', {textE: 'Insulin Information', }); }}>
            <LinearGradient style={styles.outer}
            colors={[ '#a8dadc', '#457b9d']}>
            <View style={styles.inner}>
            <Text style={styles.textBody}>Insulin Information</Text>
            </View>
            
            </LinearGradient>
            </TouchableOpacity>
             {/* //=================// */}
             <TouchableOpacity onPress={()=>{navigation.navigate('pass', {textE: 'Insulin Sensitivity Factor', }); }}>
            <LinearGradient style={styles.outer}
            colors={['#a8dadc', '#457b9d']}>
            <View style={styles.inner}>
            <Text style={styles.textBody}>Insulin Sensitivity Factor</Text>
            </View>
            
             </LinearGradient>
            </TouchableOpacity>
              {/* //=================// */}
              <TouchableOpacity onPress={()=>{navigation.navigate('pass', {textE: 'Insulin to Carbohydrate Ratio (ICR)', }); }}>
            <LinearGradient style={styles.outer}
            colors={[ '#a8dadc', '#457b9d']}>
            <View style={styles.inner}>
            <Text style={styles.textBody}> Insulin to Carbohydrate{'\n'} Ratio (ICR)</Text>
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

export default editProfile;

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

