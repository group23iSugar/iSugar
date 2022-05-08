import React, {useEffect, useState} from 'react';
import { StyleSheet, 
    View,
    Image, 
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity, 
    Dimensions } from 'react-native'; 
    import LinearGradient from 'react-native-linear-gradient';
    
import {Picker} from '@react-native-picker/picker';
import { FlatList } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ActivityIndicator, Colors } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';




const travel = ({ navigation }) => {
    useEffect(() => {
        firstRetrieve(checkInsulinType);
        secondRetrieve();
        cityRetrieve();
        }, [])
    //===Vars=====//
    const [insulin, setInsulin] = useState([]);
    const [dose, setDose] = useState(0);
    const [insulinType, setType] = useState('');
    const [insulin2, setInsulin2] = useState([]);
    const [insulinPen, setInsulinPen] = useState('');
    const [selected, setS] = useState('-1');
    const [selected2, setS2] = useState('-1');
    const [timeDiff, setTime] = useState(-1);
    const [globalFlag, setFlag] = useState(false);
    const [globalFlag2, setFlag2] = useState(false);
    const [globalFlag3, setFlag3] = useState(false);
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [city, setCity] = useState([]);  // city table
    const [cityName, setCityName] = useState('');  // city name
    const [fromORTo, setfromORTo] = useState('');  // from or to saudi arabia
    //=======//

    const cityRetrieve = () => {
      var tempArr = [...city];
      console.log('in city');
      try {
          db.transaction(  ( tx) => {
            tx.executeSql(
              'SELECT cityID, cityEnglishName, cityArabicName, fromOrTo, timeDifference FROM city',
              [],
              (tx, results) => {
                var rows = results.rows;
                for (let i = 0; i < rows.length; i++){
                  console.log('in city loop');
                        tempArr.push({
                            id: rows.item(i).cityID,
                            cityEnglishName: rows.item(i).cityEnglishName,
                            cityArabicName: rows.item(i).cityArabicName,
                            fromOrTo: rows.item(i).fromOrTo,
                            timeDifference: rows.item(i).timeDifference,
                        });
                        console.log(tempArr[i].id+' / '+tempArr[i].cityEnglishName+' / '+tempArr[i].cityArabicName+' / '+tempArr[i].fromOrTo +' / '+tempArr[i].timeDifference);
                        
                  }
                  setCity([...tempArr]);
              }   
    ) 
    
        
    
    }  ) 
    } catch (error) {
       console.log(error);
    }
    }
    const firstRetrieve = (callback) => {
        var tempArr = [...insulin];

  try {
    console.log('in try');
      db.transaction(  ( tx) => {
        tx.executeSql(
          'SELECT insulinType, iDose, iTime FROM insulinOther', 
          [],
          (tx, results) => {
            var rows = results.rows;
            for (let i = 0; i < rows.length; i++){
                    tempArr.push({
                      insulinType: rows.item(i).insulinType,
                      iDose: rows.item(i).iDose,
                      iTime: rows.item(i).iTime,
                    });
                    if ( rows.item(i).insulinType == 'Glargine' || rows.item(i).insulinType == 'Detemir' || rows.item(i).insulinType == 'Degludec'){
                      setDose(rows.item(i).iDose);
                      setType(rows.item(i).insulinType);
                    }
              }
             setInsulin([...tempArr]);
             callback(tempArr);
          }   
) 

    

}  ) 
} catch (error) {
   console.log(error);
}
    }
      const secondRetrieve = () => {
        var tempArr = [...insulin2];
  try {
    console.log('in try2');
      db.transaction(  ( tx) => {
        tx.executeSql(
          'SELECT insulinType FROM insulinPen',
          [],
          (tx, results) => {
            var rows = results.rows;
            for (let i = 0; i < rows.length; i++){
              setInsulinPen(rows.item(i).insulinType);
              tempArr.push({
                insulinType: rows.item(i).insulinType,
              });
              }
              setInsulin2([...tempArr]);
          }   
  ) 

    

  }  ) 
  } catch (error) {
  console.log(error);
  }
    }

    const checkInsulinType = (types) => {
        // checking whether user insulin is supported or not
        // if not then return false, else true
        var insulinType = [...types];
        for (var i = 0; i < insulinType.length; i++){
          console.log(insulinType[i]+ ' I am here');
          if (insulinType[i] == 'NPH' || insulinType[i] == 'Deguldec+Aspart Mix' || insulinType[i] == 'mixed rapid+ intermediate' ){ //should check all other insulin
             setFlag2(false);
          } else {
            setFlag2(true);
          }
        }
    }
    const getInsulinType = () => {
        if (insulinType == 'Glargine'){
           setType('جلارجين');
        } else if (insulinType == 'Detemir'){
            setType('ديتيمير');
        } else if (insulinType == 'Degludec'){
            setType('ديجلوديك');
        }
      return insulinType;
    }

    const getTimeDifference = () => {
      if (selected == 0){ // take 'from' column
          return 0;
      } else if (selected == 1){ // take 'to' column 
          return 1;
      }

    }
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
    };
  
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode('Year');
    };
    const AdjustInsulin = (time) => { 
      console.log(time + ' ///// '+timeDiff);
        var timeD = timeDiff;

        if (timeD >= 5){ //-----
          if (time == 'before'){
            return dose;
          }
          else if (time == 'during'){
            return Math.round(dose+(dose*0.25));
          }
          else if (time == 'after'){
            return dose;
          } 
        } else if (timeD <= -5){ //------
          if (time == 'before'){
            return Math.round(dose-(dose*0.25));
          }
          else if (time == 'during'){
            return 0;
          }
          else if (time == 'after'){
            return dose;
          } 
        } else { //---------
          if (time == 'before'){
            return dose;
          }
          else if (time == 'during'){
            return 0;
          }
          else if (time == 'after'){
            return dose;
          } 
        }
    }

    const searchCity = (val) => {
      var column = getTimeDifference();
      setS2(val);
      for(let i =0; i< city.length; i++){
        // iterating in the city array of objects that contains all the city info
          if (city[i].id == val ){
            // If the id in city array matched the user selection
             setCityName(city[i].cityArabicName);
             if (column == 0) {// FROM col
              if (city[i].fromOrTo == 'from'){
                setfromORTo(city[i].fromOrTo);
                var tDiff = city[i].timeDifference;
                setTime(tDiff);
                return;
              }
             } else  if (column == 1) {// TO col 
              if (city[i].fromOrTo == 'to'){
                setfromORTo(city[i].fromOrTo);
                var tDiff = city[i].timeDifference;
                setTime(tDiff);
                return;
              }
             }
          }
      }
     
   
    }

    const renderCityList = () => {
      return city.map((ch) => {
        return <Picker.Item key= {ch.id+''} label={ch.cityArabicName +' ( '+ch.timeDifference+' )'} value={ch.id+''}    />
      })
    } 
    const alertMsg = () => {
      alert(`لضمان الاختيار الصحيح الرجاء قراءة التعليمات التالية:\n- تم احتساب فارق التوقيت في القائمة استناداً على التوقيت الأساسي للدول (ST).  إذا كانت الدولة التي سيتم السفر إليها أو منها ممن يتبنى التوقيت الصيفي *(DST) خلال تاريخ سفرك الرجاء اختيار أخرى وإدخال فارق التوقيت يدوياً.\n- القائمة مبنية على عواصم الدول. إذا كانت الوجهة المراد السفر منها أو إليها غير متوفرة في القائمة الرجاء اختيار أخرى وإدخال فارق التوقيت يدوياً.\n*التوقيت الصيفي (Daylight Saving Time- DST) تتبناه بعض الدول بتقديم التوقيت ساعة خلال أشهر الصيف ومن ثم ارجاعها للتوقيت الأساسي في الخريف وذلك للاستفادة من الضوء الطبيعي في النهار. `);
    }
    const insertDB = () => {
      setFlag(true);
      console.log(date+' - '+cityName+' - '+timeDiff+' - '+fromORTo);
      try {
        db.transaction( (tx) => {
            tx.executeSql(
             'INSERT INTO travel (UserID, travelDate, cityName, timeDifference, fromOrTO)' 
             +'VALUES (?,?,?,?,?)',
               [uID, date, cityName, timeDiff, fromORTo ]
           );
       })
       
      } catch (error) {
       console.log(error);
      }

      //if (AccType == 'Patient Account')
      // -----------online
      var InsertAPIURL3 = "https://isugarserver.com/travel.php";   //API to  signup

      var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };
       var Data ={
        UserID: onlinUserID,
        travelDate: date.toString(),
        cName: cityName,
        fromOrTo: fromORTo,
        timeDifference: timeDiff
      };
    
    // FETCH func ------------------------------------
    fetch(InsertAPIURL3,{
          method:'POST',
        headers:headers,
        body: JSON.stringify(Data) //convert data to JSON
    })
    .then((response)=>response.json()) //check response type of API (CHECK OUTPUT OF DATA IS IN JSON)
    .then((response)=>{      // If data is in JSON => Display alert msg
    })
    .catch((error)=>{
        alert("Error Occured" + error);
    })
    }
  return (

    <View style={styles.container}>
     <View style={{top: 10, flexDirection: 'row', padding: 30}}>
       
        <TouchableOpacity onPress={()=>navigation.openDrawer()}>
         <Entypo name="menu" color="#05375a" size={35} />
         </TouchableOpacity>
      </View>

        
        
         <ScrollView>

         <Text
          style={{
            color: '#05375a',
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'right',
            paddingTop: 20,
            paddingRight: 15,
          }}>
          السفر
        </Text>

          {insulin.length > 0 ? (<View>
            {!globalFlag3? 
            (<View>
              <Text style={{
            color: '#05375a',
            fontSize: 17,
            fontWeight: 'bold',
            textAlign: 'right',
            paddingTop: 20,
            paddingRight: 15,
          }}>هل تم تحديث جرعة الأنسولين طويل المفعول {getInsulinType()} في صفحتك الشخصية بالتطبيق؟</Text>
           <Text style={{
            color: '#05375a',
            fontSize: 17,
            fontWeight: 'bold',
            textAlign: 'right',
            paddingTop: 20,
            paddingRight: 15,
          }}>وذلك مهم لإعطائك التوصيات بشكل صحيح</Text>
          <View style={{flexDirection: 'row'}}>
         
            <TouchableOpacity onPress={()=>{navigation.navigate('pass', {textE: 'Insulin Information', }); }}>
                <LinearGradient
                    colors={['#E7EFFA', '#AABED8', '#AABED8']} style={styles.buttonR}
                >
                    <Text style={{ fontWeight: 'bold', color: '#05375a', }}>لا</Text>
                  
                </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setFlag3(true)}>
                <LinearGradient
                    colors={['#E7EFFA', '#AABED8', '#AABED8']} style={styles.buttonR}
                >
                    <Text style={{fontWeight: 'bold', color: '#05375a',}}>نعم</Text>
                  
                </LinearGradient>
            </TouchableOpacity>
            </View>
            </View>)
            : null}
            
            {globalFlag3 && !globalFlag? (<View>
              { ( globalFlag2 && city.length > 0) ? 
             ( <View>
               <View style={styles.innerCotainer}>
               <Text style={{color: 'darkblue', textAlign: 'right'}}>المملكة العربية السعودية </Text>  
                      <Picker
                        itemStyle={{color: 'black'}}
                        selectedValue={selected}
                        onValueChange={(val) => setS(val)}
                        style={{ width: 125,
                          height: 40,
                          borderWidth: 2,
                          borderColor: '#4c4c4c',
                        fontSize: 17,
                        paddingRight: 5,
                      color: '#05375a'}}
                        mode={'dropdown'}>
                            <Picker.Item label= 'اختر' value='-1'   ></Picker.Item>
                            <Picker.Item label= 'من' value='0'   ></Picker.Item>
                            <Picker.Item label= 'إلى' value='1'   ></Picker.Item>
                
                      </Picker> 
                      <Text style={{color: 'darkblue', textAlign: 'right'}}>السفر</Text>
               </View>
               <View style={styles.innerCotainer}>
               <Picker
                        itemStyle={{color: 'black'}}
                        selectedValue={selected2}
                        onValueChange={(val) => searchCity(val)}
                        onFocus={()=>alertMsg()}
                        style={{ width: 190,
                          height: 40,
                          borderWidth: 2,
                          borderColor: '#4c4c4c',
                        fontSize: 17,
                        paddingRight: 5,
                      color: '#05375a'}}
                        mode={'dropdown'}>
                            <Picker.Item label= 'اخرى' value='-1'   ></Picker.Item>
                            {renderCityList()}
                
                      </Picker>
                      {selected == '-1'?  <Text style={{color: 'darkblue'}}>من\إلى</Text> :
                      (<View>{selected == '0'? <Text style={{color: 'darkblue'}}>إلى</Text> : <Text style={{color: 'darkblue'}}>من</Text>}</View>) }
                      
               <Text style={{color: 'darkblue', textAlign: 'right'}}>السفر </Text> 
                     
               </View>
               {selected2 == '-1' ? (<View style={styles.innerCotainer}>
                <TextInput 
                          style={styles.textInput}
                          defaultValue={timeDiff+''}
                          autoCapitalize="none"
                          onChangeText={(val) => setTime(val)}

                      />
                     <Text style={{color: 'darkblue', textAlign: 'right'}}>فارق التوقيت:      </Text> 
                     
                     </View>)
                : null}
                     
                     <View style={styles.innerCotainer}>
                     <TouchableOpacity onPress={showDatepicker}
                 >
             <Text testID="dateTimePicker"
             style={{fontSize: 17, color: 'grey', alignItems: 'flex-start'}} >
                             {moment(date).format('DD/MM/YYYY')}
                             </Text> 
          
                 </TouchableOpacity>
                   
                 {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          display="default"
          onChange={onChange}
        />
      )}
                     <Text style={{color: 'darkblue', textAlign: 'right'}}>تاريخ السفر:  </Text> 
                 
                     </View>
                      
                      <TouchableOpacity onPress={()=>insertDB()}>
                <LinearGradient
                    colors={['#E7EFFA', '#AABED8', '#AABED8']} style={styles.buttonR}
                >
                    <Text style={{ fontWeight: 'bold', color: '#05375a', }}>تم</Text>
                  
                </LinearGradient>
            </TouchableOpacity>
                      </View>)
             : <Text>توصيات السفر غير متوفرة لمن يستخدم أنسولين {getInsulinType()}. الرجاء التواصل مع مركز السكر الذي تتابع فيه لتوصيات جرعات الأنسولين أثناء السفر.
             </Text> }
            </View>) : null}
           
          </View>): null}
          
           
          {globalFlag == true ? (<View style={styles.innerCotainer2}>
              <Text style={styles.textBody}>قم بتعديل جرعة الأنسولين طويل المفعول {getInsulinType()} باتباع التوصيات التالية:</Text>
              <Text style={styles.textBody}>قبل السفر:</Text>
              <Text style={styles.textHeader}>خذ {AdjustInsulin('before')} وحدة من أنسولين  {insulinType} في وقتك المعتاد للجرعة</Text>
              <Text style={styles.textBody}>أثناء السفر بالطائرة:</Text>
              <Text style={styles.textHeader}>خذ {AdjustInsulin('during')} وحدة من أنسولين {getInsulinType} بعد ٦ ساعات من الإقلاع.</Text>
              <Text style={styles.textBody}>بعد الوصول:</Text>
              <Text style={styles.textHeader}>خذ {AdjustInsulin('after')} وحدة من أنسولين {getInsulinType()} في وقتك المعتاد للجرعة لكن بتوقيت {cityName}</Text>
              <Text style={styles.textBody}>خذ أنسولين {insulinPen} كالمعتاد. لا توجد تغييرات في هذا النوع من الأنسولين عند السفر وفرق التوقيت بين البلدين.</Text>
              <Text style={styles.textBody}>افحص مستوى سكر الدم كل ٣-٤ ساعات أثناء السفر.</Text>
              <Text style={styles.textBody}>خذ أنسولين {insulinPen} مع جميع الوجبات أثناء السفر. الرجاء استخدام حاسبة جرعات الأنسولين المتوفرة في التطبيق.</Text>
              <Text style={styles.textBody}>عند الوصول إلى {cityName} الرجاء التأكد من تحديث الوقت في جهازك إلى توقيت {cityName}. هذه الخطوة مهمة لحساب جرعات الأنسولين بشكل صحيح في التطبيق.</Text>
            
             </View>) : null}      

        </ScrollView>
    
    </View>      

    
  );
};


const {height} = Dimensions.get("screen");
const height_logo = height * 0.15;

export default travel;

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    backgroundColor: '#EEF0F2',
    
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
   fontSize: 17,
   color: '#05375a', 
   textAlign: 'center',
   marginLeft: 30
},
textBody:{
    fontSize: 18,
    color: '#05375a', 
    textAlign: 'center',
    fontWeight: 'bold',
    marginLeft: 30
 }, 
 textInput: {
  width: 180,
  borderRightWidth: 1,
  borderBottomWidth: 1,
  borderColor: '#CACDD1',
  color: '#000'
},
 innerCotainer: {
  backgroundColor: 'white', margin: 10, marginLeft: 40, alignItems: 'center', justifyContent: 'flex-end',  borderRadius: 15, padding: 10, width: 330,
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
innerCotainer2: {
  backgroundColor: 'white', margin: 10, alignItems: 'flex-start', textAlign: 'right',  borderRadius: 15, padding: 10, width: 330,
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
  marginLeft: 85,
  alignItems: 'center',
  width: 50,
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
textHeader:{
 fontSize: 15,
 color: '#05375a', 
 
 marginTop: 5,
 paddingTop: 15
},
textBody:{
  fontSize: 20,
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
  color: 'grey'
}

});

{/* */}
