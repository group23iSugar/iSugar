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



const fastingProfile = ({ navigation }) => {
    useEffect(() => {
        firstTimeCheck();
        }, []);
        const [firstFlag, setFirst] = useState(false);
    const firstTimeCheck = () => {
        try {
                        db.transaction(tx => {
                          tx.executeSql(
                            'SELECT profileEntry FROM fasting WHERE userID =?',
                            [uID],
                            (tx, results) => {
                              var rows = results.rows;
                              for (let i = 0; i < rows.length; i++) {
                                if (rows.item(i).profileEntry == 'false'){
                                    setFirst(true);
                                    try {
                                        console.log('in try2');
                                        db.transaction( (tx) => {
                                            tx.executeSql(
                                              'UPDATE fasting SET profileEntry=? WHERE UserID=? ',
                                              ['true', uID],
                                              (tx, results) => {
                                                console.log('Results', results.rowsAffected);
                                             if (results.rowsAffected > 0) {
                                             console.log('record updated seuccefully');
                                             console.log(center);
                                                  }
                                              }    
                                    ) 
                                        
                                    
                                    }  ) 
                                    } catch (error) {
                                       console.log(error);
                                    }
                                }
                                
                              }
                            },
                          );
                        });
                      } catch (error) {
                        console.log(error);
                      }

       
        
    };

    const alertMessage = () => {
      alert('This feature is not available yet!');
    }
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
          Fasting Profile
        </Text>
         <ScrollView> 
         <View style={styles.body}>
             {firstFlag == false ? (  <View style={styles.innerCotainer}>
          <Text style={styles.textBody}>- Adjustments made here in Ramadan insulin profile page will be saved here ONLY. (Will NOT be saved in your main profile page)</Text>
          <Text style={styles.textBody}>- Insulin information here in Ramadan profile page will be used for Ramadan fasting section of the application ONLY.</Text>
 
          </View>) : (
                <View style={styles.innerCotainer}>
          <Text style={styles.textBody}>- Your insulin information in this section has been obtained from your Main profile page and initial adjustment of your ICR/meals sliding scales for Ramadan fasting has been made. You might need to do further adjustments later. </Text>
          <Text style={styles.textBody}>- Adjustments made here in Ramadan insulin profile page will be saved here ONLY. (Will NOT be saved in your main profile page)</Text>
          <Text style={styles.textBody}>- Insulin information here in Ramadan profile page will be used for Ramadan fasting section of the application ONLY.</Text>
 
          </View>
             )}
         
      
        
        <TouchableOpacity onPress={()=>{navigation.navigate('insulinFasting')}}>
            <LinearGradient style={styles.outer}
            colors={['#a8dadc', '#457b9d']}>
            <View style={styles.inner}>
            <Text style={styles.textBody}>Insulin Information</Text>
            </View>
            
            </LinearGradient>
            </TouchableOpacity>
     {/* //=================// */}
     <TouchableOpacity onPress={()=>{navigation.navigate('isfFasting')}}>
            <LinearGradient style={styles.outer}
            colors={['#a8dadc', '#457b9d']}>
            <View style={styles.inner}>
            <Text style={styles.textBody}>ISF Information</Text>
            </View>
            
            </LinearGradient>
            </TouchableOpacity>
           
            {/* //=================// */}
            <TouchableOpacity onPress={()=>{navigation.navigate('icrFasting')}}>
            <LinearGradient style={styles.outer}
            colors={['#a8dadc', '#457b9d']}>
            <View style={styles.inner}>
            <Text style={styles.textBody}>ICR Information</Text>
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

export default fastingProfile;

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


