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
            textAlign: 'right',
            paddingTop: 20,
            paddingLeft: 15,
          }}>
          الصيام
        </Text>
         <ScrollView>
         <View style={styles.body}>
         <View style={styles.innerCotainer}>
         <Text style={styles.textHeader}>يتميز شهر رمضان المبارك بساعات الصوم الطويلة، واختلاف وقت ونوع الطعام بالإضافة إلى اختلاف أوقات النوم والاستيقاظ مما يجعل مريض السكري أكثر عرضة لحدوث انخفاضات أو ارتفاعات في مستوى سكر الدم، الحموضة الكيتونية، والجفاف أكثر من ٣-٤ مرات من الأيام العادية.</Text>

         </View>
         <View style={styles.innerCotainer}>
         <Text style={styles.textHeader}>ينصح جميع المرضى بمراجعة الطبيب المعالج قبل دخول رمضان وذلك لإجراء التعديلات اللازمة على النظام الدوائي والغذائي.</Text>

         </View>

         <View style={styles.innerCotainer}>
          <Text style={styles.textAlert}>لا يوصى بالصيام في الحالات التالية:</Text>
          <Text style={styles.textBody}>١- كان لديك انخفاضات متكررة في مستوى سكر الدم قبل أو خلال شهر رمضان.</Text>
          <Text style={styles.textBody}>٢- لا تستطيع الإحساس بأعراض انخفاض مستوى سكر الدم.</Text>
          <Text style={styles.textBody}>٣- إذا كنت مريضاً أو تشعر بالإعياء.</Text>
          <Text style={styles.textBody}>٤- كان لديك حموضة كيتونية خلال الثلاثة أشهر الماضية.</Text>
          <Text style={styles.textBody}>٥- تحكم ضعيف بمرض السكري (السكر التراكمي ١٠٪ أو أعلى خلال الثلاثة أشهر الماضية).</Text>
          <Text style={styles.textBody}>٦- لديك اعتلال في الكلى.</Text>
         </View>
         <View style={styles.innerCotainer}>
          <Text style={styles.textAlert}>تجد بالأسفل بعض التوصيات الهامة لصيام رمضان:</Text>
          <Text style={styles.textBody}>الوجبات الغذائية:</Text>
          <Text style={styles.textHeader}>- تناول ٣ وجبات متوازنة في اليوم.</Text>
          <Text style={styles.textHeader}>- شرب كميات معتدلة من السوائل وخصوصاً الماء لتفادي خطر الجفاف.</Text>
          <Text style={styles.textHeader}>- تقليل شرب العصير حتى لو كان طازج بحيث لا تتجاوز كوب واحد في اليوم. </Text>
          <Text style={styles.textHeader}>- تناول الكربوهيدرات بطيئة الامتصاص والتي بالعادة تحتوي على الألياف مثل الخبز الأسمر والشوفان.</Text>
          <Text style={styles.textHeader}>- تجنب تناول كميات كبيرة من النشويات كالأرز، البطاطس، المعكرونة والمعجنات.</Text>
          <Text style={styles.textHeader}>- الحد من تناول الحلويات.</Text>
          <Text style={styles.textHeader}>- تأخير تناول السحور إلى قبيل السحر لتجنب حدوث انخفاضات في مستوى سكر الدم أثناء الصيام.</Text>

         </View>
         <View style={styles.innerCotainer}>
          <Text style={styles.textBody}>الرياضة:</Text>
          <Text style={styles.textHeader}>- النشاط الرياضي مهم للجميع حتى في شهر رمضان.</Text>
          <Text style={styles.textHeader}>- يفضل أن يكون بعد الفطور تفادياً للجفاف وانخفاض مستوى سكر الدم.</Text>
          <Text style={styles.textHeader}>- اتبع نفس تعليمات الرياضة قبل رمضان.</Text>
          <Text style={styles.textHeader}>- صلاة التراويح تمثل نوع من أنواع النشاط البدني ولذلك ينصح أن تكون برفقة أحد على علم بحالتك وكذلك حمل جهاز تحليل السكر وعلبة عصير معك إلى المسجد في حال حدوث انخفاض في مستوى سكر الدم.</Text>
    </View>
    <View style={styles.innerCotainer}>
          <Text style={styles.textBody}>متابعة مستوى سكر بالدم:</Text>
          <Text style={styles.textHeader}>ينصح بقياس مستوى سكر الدم:</Text>
          <Text style={styles.textHeader}>-  قبل الفطور وبعده بساعتين.</Text>
          <Text style={styles.textHeader}>- قبل السحور وبعده بساعتين.</Text>
          <Text style={styles.textHeader}>- أثناء فترة العصر.</Text>
          <Text style={styles.textHeader}>- اذا كان السكر منخفضا (أقل من ٧٠ملجم/ديسيلتر) يجب الإفطار مباشرة دون أي تأخير حتى لو تبقى القليل على آذان المغرب.</Text>
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
       textAlign: 'right',
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
        textAlign: 'right',
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

