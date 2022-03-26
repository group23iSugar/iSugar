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



const calcRecommend = ({ navigation }) => {
    const [notFlag, setNot] = useState(false);
    const [insType, setInsT] = useState('');
    const [dose, setDose] = useState(0);
    useEffect(() => {
        firstCheck();
        }, []);
    const firstCheck = () => {
        var curDate = new Date();
        try {
            console.log('in try');
            db.transaction( (tx) => {
                tx.executeSql(
                  'SELECT UserID, latest_HP1AC, latest_HP1AC_date FROM patientprofile',
                  [],
                  (tx, results) => {
                    var rows = results.rows;
                    for (let i = 0; i < rows.length; i++) {           
                        var userID = rows.item(i).UserID;
                        if (userID == uID){
                          console.log(rows.item(i).latest_HP1AC_date);
                          console.log(rows.item(i).latest_HP1AC);
                        if (((curDate - rows.item(i).latest_HP1AC_date)  / (1000 * 60 * 60) > 2920) || (rows.item(i).latest_HP1AC > 8)){
                            setNot(true);
                            return;
                           }
                          // if ((curDate - DOLatestHB1ACF)  / (1000 * 60 * 60) <= 2190){ //past 3 months of hb1ac
                            //             if(latestHB1AC_F>=10) {
                            //                 setYes(true);
                            //                 setNo(false);
                            //             }
                        
                        }
                      }
                  }   
        ) 
            
        
        }  ) 
        } catch (error) {
           console.log(error);
        }
        try {
            console.log('in try');
            db.transaction( (tx) => {
                tx.executeSql(
                  'SELECT UserID, insulinType, iDose FROM insulinOther',
                  [],
                  (tx, results) => {
                    var rows = results.rows;
                    for (let i = 0; i < rows.length; i++) {           
                        var userID = rows.item(i).UserID;
                       if (userID == uID) {
                      console.log(rows.item(i).insulinType);
                       if ( rows.item(i).insulinType == 'Detemir' || rows.item(i).insulinType == 'Glargine' || rows.item(i).insulinType == 'Degludec' ){
                            setInsT(rows.item(i).insulinType);
                            setDose( rows.item(i).iDose);
                            }
                            return;
                        }
                      }
                  }   
        ) 
            
        
        }  ) 
        } catch (error) {
           console.log(error);
        }

    };

 
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
             {notFlag ? (  <View style={styles.innerCotainer}>
          <Text style={styles.textAlert}>This section is temporarily unavailable for you as your HBA1C does not match with our algorithm. Please contact your Diabetes center for assistance.</Text>
         
          </View>) : (
                <View style={styles.innerCotainer}>
          <Text style={styles.textHeader}>1- If long acting insulin in profile </Text>
          <Text style={styles.textBody}>- Take {insType} Insulin at Maghrib time OR after Taraweeh prayer.</Text>
          <Text style={styles.textBody}>- The {insType} insulin dose is recommended to be reduced during Ramadan fasting by 20-30% from your original dose before Ramadan.</Text>
          <Text style={styles.textBody}>- 20-30% reduction of your original {insType} insulin dose makes your starting Ramadan fasting dose of {dose} insulin range from {(dose) - (dose*0.20)} to {(dose) - (dose*0.30)} units. </Text>
 
          <Text style={styles.textHeader}>2- If pump user in profile page:</Text>
          <Text style={styles.textBody}>- It is recommended to decrease your basal rate during fasting hours by 20%.</Text>
          <Text style={styles.textBody}>- It is recommended to decrease your Insulin to Carbohydrate Ratio (ICR) at breakfast (Fatour) by 1-2 grams (leads to taking more insulin bolus at this time)</Text>
          <Text style={styles.textBody}>- It is recommended to Increase your Insulin to Carbohydrate Ratio (ICR) at Suhur by 1-2 grams (leads to taking less insulin bolus at this time)</Text>
 
          </View>
             )}
         
      
      </View>
        </ScrollView>
    </View>      

    
  );
};


const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

export default calcRecommend;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEF0F2',
      },
      innerTitle: {
        fontSize: 15, color: '#05375a', fontWeight:'bold', textAlign: 'center'
    },
      pic: {
        width: height_logo,
        height: height_logo,
        marginRight: 10,
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
       fontSize: 18,
       paddingBottom: 15,
       paddingTop: 15,
       color: '#05375a', 
       textAlign: 'left',
       paddingLeft: 10,
       paddingRight: 10
    },
    textAlert:{
      fontSize: 17,
      color: 'red', 
      fontWeight: 'bold',
      textAlign: 'center',
      paddingLeft: 10,
      paddingRight: 10
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
      color: '#000'
    },
    textInputISF: {
      width: 60,
      height: 45,
      marginLeft: 35,
      marginRight: 5,
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderColor: '#CACDD1',
      color: '#000'
    },
     innerCotainer: {
      backgroundColor: 'white', margin: 10, alignItems: 'center',  borderRadius: 15, padding: 10, width: 310,
                  shadowColor: "#000",
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
                  shadowColor: "#000",
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
                  shadowColor: "#000",
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
      alignItems: 'center',
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
      alignItems: 'center',
      borderRadius: 15,
      flexDirection: 'row',
    },
    innerView: {
        flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, marginTop: 10,
    }, 
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
    textBody:{
      fontSize: 17,
      color: '#05375a', 
      textAlign: 'center',
      fontWeight: 'bold',
      marginTop: 5,
      paddingTop: 15
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
      width: 300
    }
 
});


