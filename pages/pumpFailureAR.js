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


const pumpFailureAR = ({ navigation }) => {
    useEffect(() => {
        }, [])
    //===global Vars=====//
    const [yesFlag, setYes] = useState(false); 
    const [noFlag, setNo] = useState(false);
    const [convertFlag, setConvert] = useState(false);
    const [showFrom, setShowFrom] = useState(false);
    const [selectedID, setID] = useState(-1);
    const [flag1, setfalg1] = useState(false);
    const [flag2, setfalg2] = useState(false);
    const [showTo, setShowTo] = useState(false);
    const [mode, setMode] = useState('date');
    const [rapid, setRapid] = useState('0');
    const [basal, setBasal] = useState('0');
    const [penUnit, setUnit] = useState('0');
    const [insulin, setInsulin] = useState(0);
    //=======ISF Vars======//
    const [isfInterval, setISF] = useState('0');
    const [ISF, setISFM] = useState(0);
    const [targetBG, setTargetBG] = useState(0);
    const [startBG, setStartBG] = useState(0);
    const [ISFList, setISFList]= useState([{id: 0, from: new Date(), to: new Date(), isf: -1, start: -1, target: -1, flagF: true}]);
    const [isfCount, setISFCount] = useState(0);
    //======================//
    //======ICR Vars========//
    const [ICR, setICR]= useState([{id: 0, from: new Date(), to: new Date(), icr: -1, flagC: true}]);
    const [icrCount, setIcrCount] = useState(0);

    //======================//
    const addISF = ()=> {
      setISFCount(isfCount+1);
      var obj = {id: isfCount+1, from: new Date(), to: new Date(), isf: -1, start: -1, target: -1, flagF: false};
      ISFList.push(obj);
      ISFList[isfCount+1].flagF = true;
      }
      const addICR = ()=> {
        setIcrCount(icrCount+1);
        var obj = {id: icrCount+1, from: new Date(), to: new Date(), icr: -1, flagC: false};
        ICR.push(obj);
        ICR[icrCount+1].flagC = true;
        }
        const changeICR = (val, index) =>{
          const newArr = [...ICR];
          newArr[index].icr = val;
          setICR([...newArr]);
          console.log(ICR[index].icr);
          }
      const changeISF = (val, index) =>{
        const newArr = [...ISFList];
        newArr[index].isf = val;
        setISFList([...newArr]);
        console.log(ISFList[index].isf+ ' ISF');
        }

      const changeStart = (val, index) =>{
          const newArr = [...ISFList];
          newArr[index].start = val;
          setISFList([...newArr]);
          console.log(ISFList[index].start+ ' START');
          }
      const changeTarget = (val, index) =>{
            const newArr = [...ISFList];
            newArr[index].target = val;
            setISFList([...newArr]);
            console.log(ISFList[index].target+ ' TARGET');
            }
   
            const onChangeFromF = (event, selectedDate) => { 
              setShowFrom(Platform.OS === 'ios');
              if (flag1==false){
                return;
               }
              const currentDate = selectedDate || ISFList[isfCount].from;
              const newArr = [...ISFList];
              
              if (ISFList[isfCount].id == selectedID && flag1==true){
                    setfalg1(false);
                    newArr[isfCount].from = currentDate;
                    setISFList([...newArr]);
                    return;
                   }
                 
              
            };

            const onChangeToF = (event, selectedDate) => { 
              setShowTo(Platform.OS === 'ios');
              if (flag2==false){
                return;
               }
              const currentDate = selectedDate || ISFList[isfCount].to;
              const newArr = [...ISFList];
              
              if (ISFList[isfCount].id == selectedID && flag2==true){
                    setfalg2(false);
                    newArr[isfCount].to = currentDate;
                    setISFList([...newArr]);
                    return;
                   }
                 
              
              };
//============from icr==============
const onChangeFromC = (event, selectedDate) => { 
  setShowFrom(Platform.OS === 'ios');
  if (flag1==false){
    return;
   }
  const currentDate = selectedDate || ICR[icrCount].from;
  const newArr = [...ICR];
  
  if (ICR[icrCount].id == selectedID && flag1==true){
        setfalg1(false);
        newArr[icrCount].from = currentDate;
        setICR([...newArr]);
        return;
       }
     
  
};
//==========icr to============
const onChangeToC = (event, selectedDate) => { 
  setShowTo(Platform.OS === 'ios');
  if (flag2==false){
    return;
   }
  const currentDate = selectedDate || ICR[icrCount].to;
  const newArr = [...ICR];
  
  if (ICR[icrCount].id == selectedID && flag2==true){
        setfalg2(false);
        newArr[icrCount].to = currentDate;
        setICR([...newArr]);
        return;
       }
     
  
  };
  //=====From========
const showModeFrom = (currentMode) => {
  setShowFrom(true);
  setMode(currentMode);
};
//==========To=======
const showModeTo = (currentMode) => {
setShowTo(true);
setMode(currentMode);
};
//======From=======
const showTimepickerF = () => {
  showModeFrom('time');
};
//======To========
const showTimepickerT = () => {
showModeTo('time');
};
//=======From=======
const combineF = (id) => {
  showTimepickerF();
  setID(id);  
}
//=======To=======
const combineT = (id) => {
showTimepickerT();
setID(id);
}
   const settingYesFlag = ()=> {
     setYes(true);
     setNo(false);
     console.log('yes in yes: '+yesFlag);
     console.log('no in yes: '+noFlag);
   }
   const settingNoFlag = ()=> {
    setYes(false);
    setNo(true);
    console.log('yes in no: '+yesFlag);
     console.log('no in no: '+noFlag);
  }

  const getNameB = () => {
    if (basal == '0'){
      return  'Detemir';
    } else if (basal == '1'){
      return  'Glargine';
    } else if (basal == '2'){
      return 'Degludec';
    }
  }
  const getNameA = () => {
    if (rapid == '0'){
      return  'Aspart';
    } else if (rapid == '1'){
      return  'Lispro';
    } else if (rapid == '2'){
      return 'Glulisine';
    }
  }
 
  return (

    <View style={styles.container}>
     <View style={{top: 10, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', padding: 30}}>
       
        <TouchableOpacity onPress={()=>navigation.openDrawer()}>
         <Entypo name="menu" color="#05375a" size={35} />
         </TouchableOpacity>
      </View>

        
      <Text
          style={{
            color: '#05375a',
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'left',
            paddingTop: 20,
            paddingLeft: 15,
          }}>
          فشل المضخة
        </Text>
         <ScrollView>
        
        {yesFlag == true ? null
        : (<View style={styles.innerCotainer}>
          <Text style={styles.textBody}>هل لديك إعدادات المضخة؟</Text>
          <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
            
              <TouchableOpacity  onPress={()=>settingNoFlag()}>
                  <LinearGradient
                      colors={['#E7EFFA', '#AABED8', '#AABED8']} style={styles.buttonR}
                  >
                      <Text style={{ fontWeight: 'bold', color: '#05375a', }}>لا</Text>
                    
                  </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity  onPress={()=>settingYesFlag()}>
                  <LinearGradient
                      colors={['#E7EFFA', '#AABED8', '#AABED8']} style={styles.buttonR}
                  >
                      <Text style={{fontWeight: 'bold', color: '#05375a',}}>نعم</Text>
                    
                  </LinearGradient>
              </TouchableOpacity>
          </View>
          </View>)  }
        
        {noFlag == true ? ( <View style={styles.innerCotainer}>
          <Text style={styles.textAlert}>تواصل مع فريق السكر أو اذهب مباشرة للإسعاف</Text>
        </View>)
        : null }
        {yesFlag == true ? (<View>
          <View style = {styles.innerCotainer2}>
          <Text style = {styles.textHeader}>مجموع جرعات الانسولين القاعدي لليوم </Text>
          <TextInput 
                          style={styles.textInput}
                          autoCapitalize="none"
                          placeholder="00"
                          keyboardType="decimal-pad"
                         onChangeText={(val) => setInsulin(val)}
                      />
          <Text>units/day</Text>
        </View>
        <View style={styles.innerCotainerISF}>
        <Text style = {styles.textBody}>معامل حساسية الانسولين</Text>
        <Text style={styles.textHeader}>مستوى سكر الدم المرغوب التصحيح إليه</Text>
        <Picker
              itemStyle={{color: '#000'}}
              selectedValue={isfInterval}
              onValueChange={(value) => setISF(value)}
              mode="dropdown"
              style={styles.picker}
              >
            <Picker.Item label= 'طوال اليوم' value='0'></Picker.Item>
            <Picker.Item label= 'ساعات محددة' value='1'></Picker.Item>

        </Picker>
        {isfInterval=='0' ? (<View>
          <View style = {{flexDirection: 'row'}}>
          <Text style={styles.textHeader}>معامل حساسية الانسولين</Text>
          <TextInput
             keyboardType="decimal-pad"
             placeholder="000"
             onChangeText={(val)=>setISFM(val)}
             style={styles.textInput}></TextInput>
          </View>
          <View style = {{flexDirection: 'row'}}>
          <Text style={styles.textHeader}>مستوى سكر الدم المرغوب التصحيح إليه</Text>
          <TextInput
            keyboardType="decimal-pad"
            placeholder="000"
            onChangeText={(val)=>setTargetBG(val)}
            style={styles.textInput}></TextInput>
          </View>
          <View style = {{flexDirection: 'row'}}>
          <Text style={styles.textHeader}>التصحيح يبدأ اذا كان سكر الدم أعلى من</Text>
          <TextInput
            keyboardType="decimal-pad"
            placeholder="000"
            onChangeText={(val)=>setStartBG(val)}
            style={styles.textInput}></TextInput>
          </View> 
        </View>):
         (<View>
        <View style={{alignItems:'center'}}>
        <FlatList
        data={ISFList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View>
             <Text style={styles.innerTitle}>من</Text>
              <TouchableOpacity onPress={()=> combineF(item.id)} 
              onPressOut={()=>setfalg1(true)}
              style={styles.innerCotainer}
               >
           <Text testID="dateTimePicker"
           style={{fontSize: 17, color: 'grey', alignItems: 'flex-start'}} >
                           {moment(item.from).format('h:mm a')}
                           </Text> 
        
               </TouchableOpacity>
                 
                 {showFrom && (
                   <DateTimePicker
                     testID="dateTimePicker"
                     value={item.from}
                     mode={mode}
                     is24Hour={false}
                     display="default"
                     onChange={(e, v) => {
                      setShowFrom(Platform.OS === "ios");
                      onChangeFromF(e, v);
                    }}
                     
                   />
                 )}
                   <Text style={styles.innerTitle}>إلى</Text>
                   <TouchableOpacity onPress={()=> combineT(item.id)} 
                   onPressOut={()=>setfalg2(true)}
                   style={styles.innerCotainer}
                 >
             <Text testID="dateTimePicker" 
             style={{fontSize: 17, color: 'grey'}} >
                             {moment(item.to).format('h:mm a')}
                             </Text> 
                 </TouchableOpacity>
                   
                   {showTo && (
                     <DateTimePicker
                       testID="dateTimePicker"
                       value={item.to}
                       mode={mode}
                       is24Hour={false}
                       display="default"
                       onChange={(e, v) => {
                        setShowTo(Platform.OS === "ios");
                        onChangeToF(e, v);
                      }}
                     />
                   )} 
                    <View style={styles.innerCotainer}>
                    <View style={styles.innerView}>
                    <Text style={styles.innerTitle}>معامل حساسية الانسولين </Text>
                    <TextInput
                    style={{borderColor: 'grey', borderBottomWidth: 1,paddingBottom: 0, paddingTop:0, color: 'grey'}}
                     keyboardType="decimal-pad"
                     placeholder="000"
                     onChangeText={(val) => changeISF(val, index)}
                    />
                    </View>
                    <View style={styles.innerView}>
                    <Text style={styles.innerTitle}>الهدف</Text>
                    <TextInput
                    style={{borderColor: 'grey', borderBottomWidth: 1,paddingBottom: 0, paddingTop:0, color: 'grey'}}
                     keyboardType="decimal-pad"
                     placeholder="000"
                     onChangeText={(val) => changeTarget(val, index)}
                    />
                    </View>
                    <View style={styles.innerView}>
                    <Text style={styles.innerTitle}>البداية </Text>
                    <TextInput
                    style={{borderColor: 'grey', borderBottomWidth: 1,paddingBottom: 0, paddingTop:0, color: 'grey'}}
                     keyboardType="decimal-pad"
                     placeholder="000"
                     onChangeText={(val) => changeStart(val, index)}
                    />
                    </View>
                    </View>
                    <Text style={{textAlign: 'center'}}>----------------------------------------</Text>
          </View>
        )}

        />
        <TouchableOpacity onPress={()=>addISF()}><Text style={styles.textHeader}>اضافة</Text></TouchableOpacity>
       
      </View>
        </View>)}
        </View>
        <View style={styles.innerCotainerISF}>
        <Text style = {styles.textBody}>معامل الكربوهيدرات</Text>
        <FlatList
        data={ICR}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.outerContainer}>
             <Text style={styles.innerTitle}>من</Text>
              <TouchableOpacity onPress={()=> combineF(item.id)} 
              onPressOut={()=>setfalg1(true)}
              style={styles.innerCotainer}
               >
           <Text testID="dateTimePicker"
           style={{fontSize: 17, color: 'grey', alignItems: 'flex-start'}} >
                           {moment(item.from).format('h:mm a')}
                           </Text> 
        
               </TouchableOpacity>
                 
                 {showFrom && (
                   <DateTimePicker
                     testID="dateTimePicker"
                     value={item.from}
                     mode={mode}
                     is24Hour={false}
                     display="default"
                     onChange={(e, v) => {
                      setShowFrom(Platform.OS === "ios");
                      onChangeFromC(e, v);
                    }}
                     
                   />
                 )}
                   <Text style={styles.innerTitle}>إلى</Text>
                   <TouchableOpacity onPress={()=> combineT(item.id)} 
                   onPressOut={()=>setfalg2(true)}
                   style={styles.innerCotainer}
                 >
             <Text testID="dateTimePicker" 
             style={{fontSize: 17, color: 'grey'}} >
                             {moment(item.to).format('h:mm a')}
                             </Text> 
                 </TouchableOpacity>
                   
                   {showTo && (
                     <DateTimePicker
                       testID="dateTimePicker"
                       value={item.to}
                       mode={mode}
                       is24Hour={false}
                       display="default"
                       onChange={(e, v) => {
                        setShowTo(Platform.OS === "ios");
                        onChangeToC(e, v);
                      }}
                     />
                   )} 
                    <View style={styles.innerCotainer}>
                    <View style={styles.innerView}>
                    <Text style={styles.innerTitle}>معامل الكربوهيدرات </Text>
                    <TextInput
                    style={{borderColor: 'grey', borderBottomWidth: 1,paddingBottom: 0, paddingTop:0, color: 'grey'}}
                     keyboardType="decimal-pad"
                     placeholder="000"
                     onChangeText={(val) => changeICR(val, index)}
                    />
                    </View>
                    </View>
          </View>
        )}

        />
        <TouchableOpacity onPress={()=>addICR()}><Text style={styles.textHeader}>إضافة</Text></TouchableOpacity>
        </View>
        <View style = {styles.innerCotainerISF}>
          <Text style = {styles.textBody}>قلم الانسولين الذي سيتم استعماله</Text>
          <View style={styles.innerCotainer}>
            <Text style={styles.textHeader}>اسم الانسولين سريع المفعول</Text>
            <Picker
              itemStyle={{color: '#000'}}
              selectedValue={rapid}
              onValueChange={(value) => setRapid(value)}
              mode="dropdown"
              style={styles.picker}
              >
            <Picker.Item label= 'أسبارت (نوفورابد أو نوفولوج)' value='0'></Picker.Item>
            <Picker.Item label= 'ليسبرو (هيومالوج)' value='1'></Picker.Item>
            <Picker.Item label= 'غلوليزين (أبيدرا)' value='2'></Picker.Item>
        </Picker>
        <Text style={styles.textHeader}>غلوليزين (أبيدرا)</Text>
        <Picker
              itemStyle={{color: '#000'}}
              selectedValue={penUnit}
              onValueChange={(value) => setUnit(value)}
              mode="dropdown"
              style={styles.picker}
              >
            <Picker.Item label= 'نعم' value='0'></Picker.Item>
            <Picker.Item label= 'لا' value='1'></Picker.Item>
        </Picker>
          </View>
          <View style={styles.innerCotainer}>
            <Text style={styles.textHeader}>اسم الانسولين طويل المفعول (القاعدي) </Text>
            <Picker
              itemStyle={{color: '#000'}}
              selectedValue={basal}
              onValueChange={(value) => setBasal(value)}
              mode="dropdown"
              style={styles.picker}
              >
            <Picker.Item label= 'ديتيمير (ليفيمير)' value='0'></Picker.Item>
            <Picker.Item label= 'جلارجين (لانتوس، باسجلار، توجيو)' value='1'></Picker.Item>
            <Picker.Item label= 'ديجلوديك (تريسيبا)' value='2'></Picker.Item>
        </Picker>
          </View>
          
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center', margin: 15, padding: 15}}></View>
         <TouchableOpacity onPress={()=> setConvert(true)}>
                <LinearGradient
                    colors={['#E7EFFA', '#AABED8', '#AABED8']} style={styles.buttonConvert}
                >
                    <Text style={{ fontWeight: 'bold', color: '#05375a', }}>تحويل</Text>
                  
                </LinearGradient>
            </TouchableOpacity>
        </View>) 
        : null}
        {convertFlag ? (<View>
          <View style={styles.innerCotainerISF}>
            <Text style={styles.textHeader}>التالي هي جرعات مبدئية لتحويل الانسولين من المضخة للأقلام وقد تحتاج إلى تعديل. الرجاء التواصل مع فريق السكر في أقرب وقت.</Text>
            <Text style={styles.textHeader}>تأكد من تاريخ صلاحية قلم الانسولين</Text>
            <Text style={styles.textHeader}>لا تستخدم أقلام انسولين منتهية الصلاحية</Text>
            <Text style={styles.textHeader}>خذ {insulin} وحدة من انسولين {getNameB()} الآن ثم أعد قياس مستوى سكر الدم بعد ساعتين</Text>
            <Text style={styles.textHeader}>خذ ؟؟ وحدة من انسولين {getNameB} الآن ثم أعد قياس مستوى سكر الدم بعد ساعتين</Text>
            <Text style={styles.textHeader}>افحص مستوى سكر الدم قبل كل وجبة وقبل النوم</Text>
            <Text style={styles.textHeader}>استخدم قلم انسولين {getNameA()} لأخذ جرعات الانسولين قبل الوجبات ولتصحيح ارتفاع مستوى سكر الدم</Text>
            <Text style={styles.textHeader}>استخدم حاسبة جرعات الانسولين المتوفرة في التطبيق لحساب جرعة الانسولين للوجبات والتصحيح.</Text>
            <Text style={styles.textHeader}>قم بقياس مستوى الكيتونات إذا كان مستوى سكر الدم أكثر أو مساوٍ ل ٢٥٠ ميليجرام/ديسيلتر </Text>
            <Text style={styles.textHeader}>لا تنسى تغيير مكان الحقن مع كل جرعة انسولين</Text>
          </View>
        </View>) 
        : null}
       
        </ScrollView>
    </View>      

    
  );
};


const {height} = Dimensions.get("screen");
const height_logo = height * 0.15;

export default pumpFailureAR;

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

{/* */}
