/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
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
import moment from 'moment';
import { set } from 'react-native-reanimated';
import insulin from './insulin';



const guidelines = ({ navigation }) => {


  return (

    <View style={styles.container}>
       <Text
          style={{
            color: '#05375a',
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'left',
            paddingTop: 20,
            paddingLeft: 15,
          }}>
          Fasting
        </Text>
         <ScrollView>
         <View style={styles.body}>
         <View style={styles.innerCotainer}>
         <Text style={styles.textHeader}>Ramadan is a holy month characterized by its long fasting hours, different type and times for meals and different sleeping hours. These changes increase the diabetic patient risk by 3-4 folds compared to regular days for: frequent high or low blood sugar levels, dehydration and diabetic ketoacidosis (DKA).</Text>

         </View>
         <View style={styles.innerCotainer}>
         <Text style={styles.textHeader}>It is recommended to visit your doctor before the start of Ramadan to provide you with all adjustment and instructions needed for your diabetic care during fasting.</Text>

         </View>

         <View style={styles.innerCotainer}>
          <Text style={styles.textAlert}>It is not recommended to fast if:</Text>
          <Text style={styles.textBody}>1-	You had frequent hypoglycemia (low blood glucose levels) before or during fasting Ramadan.</Text>
          <Text style={styles.textBody}>2-	You are unable to recognize hypoglycemia.</Text>
          <Text style={styles.textBody}>3-	You are sick or feel unwell.</Text>
          <Text style={styles.textBody}>4-	You had Diabetes Ketoacidosis (DKA) in the past 3 months.</Text>
          <Text style={styles.textBody}>5-	Poor diabetes control (HBA1C of 10% or more in during the last 3 months).</Text>
          <Text style={styles.textBody}>6-	You have kidney disease.</Text>
         </View>
         <View style={styles.innerCotainer}>
          <Text style={styles.textAlert}>Below you can find some general instructions that are important during fasting Ramadan:</Text>
          <Text style={styles.textBody}>Meals:</Text>
          <Text style={styles.textHeader}>- Eat at least 3 balanced meals per day.</Text>
          <Text style={styles.textHeader}>- Drink plenty amount of liquids especially water to minimize the risk of dehydration.</Text>
          <Text style={styles.textHeader}>- Decrease juice consumption even if it was fresh juice. Don’t exceed 1 cup per day.</Text>
          <Text style={styles.textHeader}>- Avoid eating large quantities of carbohydrate such as rice, potatoes, pastas and baked goods..</Text>
          <Text style={styles.textHeader}>- Recommended to eat complex carbohydrate with your meals such as whole grains and oats. </Text>
          <Text style={styles.textHeader}>- Minimize sweets intake. </Text>
          <Text style={styles.textHeader}>- Avoid fried food. </Text>
          <Text style={styles.textHeader}>- Delay Suhur as much as you can to prevent hypoglycemia during fasting.</Text>
         </View>
         <View style={styles.innerCotainer}>
          <Text style={styles.textBody}>Physical activity and Sports:</Text>
          <Text style={styles.textHeader}>- It is important for all during Ramadan..</Text>
          <Text style={styles.textHeader}>- Preferred to be done in the non-fasting hours to minimize risk of hypoglycemia ad dehydration.</Text>
          <Text style={styles.textHeader}>- Follow the same instructions as before Ramadan.</Text>
          <Text style={styles.textHeader}>- Taraweeh prayer is considered a moderate physical activity. It is preferred to be with someone who know your condition and to carry your glucometer and juice box in case of hypoglycemia.</Text>
    </View>
    <View style={styles.innerCotainer}>
          <Text style={styles.textBody}>Blood glucose level monitoring:</Text>
          <Text style={styles.textHeader}>It is recommended you check the level:</Text>
          <Text style={styles.textHeader}>- Before Fatour (Breakfast) and 2 hours after.</Text>
          <Text style={styles.textHeader}>- Before Suhur and 2 hours after.</Text>
          <Text style={styles.textHeader}>- During the daytime (Asr time).</Text>
          <Text style={styles.textHeader}>- If your blood glucose level is low (less than 70mg/dL or less than 4mmol/L) you will need to break your fasting even if there is minimal time for Fatour.</Text>
    </View>
      </View>
        </ScrollView>
    </View>


  );
};


const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;

export default guidelines;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEF0F2',
      },
      innerTitle: {
        fontSize: 15, color: '#05375a', fontWeight:'bold', textAlign: 'center',
    },
      pic: {
        width: height_logo,
        height: height_logo,
        marginRight: 10,
    },
      header: {
        justifyContent: 'center',
        alignItems: 'center',
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
        shadowColor: '#000',
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
        backgroundColor: 'white',

      },
    textHeader:{
       fontSize: 18,
       paddingBottom: 15,
       paddingTop: 15,
       color: '#05375a',
       textAlign: 'left',
       paddingLeft: 10,
       paddingRight: 10,
    },
    textAlert:{
      fontSize: 17,
      color: 'red',
      fontWeight: 'bold',
      textAlign: 'center',
      paddingLeft: 10,
      paddingRight: 10,
    },
    textBody:{
        fontSize: 20,
        marginBottom: 15,
        paddingBottom: 15,
        color: '#05375a',
        textAlign: 'left',
        fontWeight: 'bold',
     },
     textInput: {
      width: 50,
      height: 45,
      marginLeft: 5,
      marginRight: 5,
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderColor: '#CACDD1',
      color: '#000',
    },
    textInputISF: {
      width: 60,
      height: 45,
      marginLeft: 35,
      marginRight: 5,
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderColor: '#CACDD1',
      color: '#000',
    },
     innerCotainer: {
      backgroundColor: 'white', margin: 10, alignItems: 'center',  borderRadius: 15, padding: 10, width: 310,
                  shadowColor: '#000',
                  shadowOffset: {
                  width: 0,
                  height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
    },
    innerCotainerISF: {
      backgroundColor: 'white', margin: 10,  borderRadius: 15, padding: 10, width: 360,
                  shadowColor: '#000',
                  shadowOffset: {
                  width: 0,
                  height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
    },
    innerCotainer2: {
      backgroundColor: 'white', margin: 10, alignItems: 'center',  borderRadius: 15, padding: 10, width: 360,
      flexDirection: 'row',
                  shadowColor: '#000',
                  shadowOffset: {
                  width: 0,
                  height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
    },
    buttonV: {
      marginTop: 60,
      alignItems: 'center',

    },
    buttonR: {
      marginTop: 20,
      marginLeft: 30,
      alignItems: 'center',
      width: 50,
      height: 35,
      justifyContent: 'center',
      borderRadius: 15,
      flexDirection: 'row',
    },
    buttonConvert: {
      marginTop: 20,
      marginLeft: 30,
      alignItems: 'center',
      width: 100,
      height: 35,
      justifyContent: 'center',
      borderRadius: 15,
      flexDirection: 'row',
    },
    innerView: {
        flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, marginTop: 10,
    },
      ddown: {
      //drop down list style


      marginTop: 20,
      shadowColor: '#000',
      alignSelf: 'center',
      width: 300,


      alignItems: 'center',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.33,
      shadowRadius: 0.62,

      elevation: 7,
      backgroundColor: '#f5f5f5',
    },
    ddown2: {
      //drop down list style


      marginTop: 20,
      marginLeft: 10,
      shadowColor: '#000',

      width: 100,
      fontSize: 5,

      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.33,
      shadowRadius: 0.62,

      elevation: 7,
      backgroundColor: '#f5f5f5',
    },
      ddown3: {
      //drop down list style


      marginTop: 20,
      marginLeft: 10,
      shadowColor: '#000',

      width: 130,
      fontSize: 5,

      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.33,
      shadowRadius: 0.62,

      elevation: 7,
      backgroundColor: '#f5f5f5',
    },
    inpTxt: {
      //lables
      paddingLeft: 20,
      paddingTop: 15,
      fontSize: 18,
    },
    picker: {
      color: 'grey',
      width: 300,
    },

});

