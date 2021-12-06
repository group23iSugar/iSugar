import React from 'react';
import { StyleSheet, 
    View,
    Image, 
    Text,
    TouchableOpacity,
    useState,
    Button,
    Platform,
    ScrollView,
    Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import react from 'react';


  const disclaimerAR = ({ navigation, route }) =>{
    const AccountT = route.params;
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
        <ScrollView>
      <Text style={styles.title}>للتوضيح و إخلاء المسؤولية: </Text>
      <View style={styles.textD}>
      <Text style={styles.text_footer}>من المقرر أن يستخدم هذا التطبيق من قبل مرضى السكري 1 الأطفال (الذين تقل أعمارهم عن 18 عاماً) أو مقدمي الرعاية لهم حيث أن المبادئ التوجيهية
       الطبية المستخدمة في هذا التطبيق هي مبادئ توجيهية للأطفال حتى عمر 18 سنة - {'\n'}</Text>
      <Text style={styles.text_footer}> ينبغي ألا يستخدم المصابون الذين يعانون من مرض السكري من النوع 1 وما فوق سن 18 سنة هذا التطبيق
       في إدارة مرض السكري ، حيث أن المبادئ التوجيهية الطبية المستخدمة في هذا التطبيق هي مبادئ توجيهية للأطفال وليست معتمدة بعد سن 18 سنة.- {'\n'}</Text>
      <Text style={styles.text_footer}> يمكن أن يتم تخزين بيانات المرضى واستخدامها لأغراض البحثية في جامعة الملك سعود و المدينة الطبية بجامعة الملك سعود</Text>
      </View>
      
     
        <View style={styles.buttonV}>
        <TouchableOpacity onPress={()=>navigation.navigate('accinfo', AccountT)}>
                <LinearGradient
                    colors={['#E7EFFA', '#AABED8', '#AABED8']} style={styles.buttonR}
                >
                    <Text style={styles.titleB}>أوافق</Text>
                  
                </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('warning')}>
                <LinearGradient
                    colors={['#E7EFFA', '#AABED8', '#AABED8']} style={styles.buttonR}
                >
                    <Text style={styles.titleB}>لا أوافق</Text>
                  
                </LinearGradient>
            </TouchableOpacity>
            </View>
            </ScrollView>
        </View>
     </View>
  
         
  
    );
  
  };


const {height} = Dimensions.get("screen");
const height_logo = height * 0.15;

export default disclaimerAR;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AABED8',
  },
  SignUptext: {
    backgroundColor: '#fff',
    color: '#4c4c4c',
    fontSize: 18,
    
  },
  fPassText: {
    alignItems: 'flex-start',
    marginTop: 5,
    backgroundColor: '#fff',
    color: '#4c4c4c',
    fontSize: 15
    
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
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 10,
},
text_footer: {
  color: '#05375a',
  fontSize: 20
},
textInput: {
  flex: 1,
  marginTop: Platform.OS === 'ios' ? 0 : -12,
  paddingLeft: 10,
  color: '#05375a',
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
  flex: 1,
  flexDirection: 'row',
  marginHorizontal: 50,
  marginTop: 45,
  justifyContent: 'space-between',
  alignItems: 'center',
  
},
buttonS: {
  alignItems: 'center',
  marginTop: 40,
},
buttonF: {
  alignItems: 'flex-start',
  marginTop: 10,
},
action: {
  flexDirection: 'row',
  marginTop: 10,
  borderBottomWidth: 1,
  borderBottomColor: '#f2f2f2',
  paddingBottom: 5
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
textD:{
justifyContent: 'space-between',
marginTop: 25
}
});


