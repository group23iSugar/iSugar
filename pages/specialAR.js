/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable no-dupe-keys */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
const specialAR = ({ navigation }) => {

    const [gFlag, setgFlag] = useState(true);
    const [autoFlag, setAutoFlag] = useState(false);
    const [edFlag, setEDFlag] = useState(false);
    const [surFlag, setSurFlag] = useState(false);
    const [dFlag, setDFlag] = useState(false);
    const [puFlag, setPuFlag] = useState(false);

    const globalFlag = () => {
      setgFlag(true);
      setAutoFlag(false);
      setDFlag(false);
      setEDFlag(false);
      setPuFlag(false);
      setSurFlag(false);
    };

    const AFlag = () => {
      setgFlag(false);
      setAutoFlag(true);
      setDFlag(false);
      setEDFlag(false);
      setPuFlag(false);
      setSurFlag(false);
    };
    const DFlag = () => {
      setgFlag(false);
      setAutoFlag(false);
      setDFlag(true);
      setEDFlag(false);
      setPuFlag(false);
      setSurFlag(false);
    };
    const EDFlag = () => {
      setgFlag(false);
      setAutoFlag(false);
      setDFlag(false);
      setEDFlag(true);
      setPuFlag(false);
      setSurFlag(false);
    };
    const PUFlag = () => {
      setgFlag(false);
      setAutoFlag(false);
      setDFlag(false);
      setEDFlag(false);
      setPuFlag(true);
      setSurFlag(false);
    };
    const SURFlag = () => {
      setgFlag(false);
      setAutoFlag(false);
      setDFlag(false);
      setEDFlag(false);
      setPuFlag(false);
      setSurFlag(true);
    };

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
            الحالات الخاصة
          </Text>
           <ScrollView>
           <View style={styles.body}>
          {gFlag ? (<View>
            <TouchableOpacity onPress={()=>AFlag()}>
              <LinearGradient style={styles.outer}
              colors={['#a8dadc', '#457b9d']}>
              <View style={styles.inner}>
              <Text style={styles.textBody}>المناعة الذاتية</Text>
              </View>

              </LinearGradient>
              </TouchableOpacity>
       {/* //=================// */}
       <TouchableOpacity onPress={()=>EDFlag()}>
              <LinearGradient style={styles.outer}
              colors={['#a8dadc', '#457b9d']}>
              <View style={styles.inner}>
              <Text style={styles.textBody}>اضطراب الأكل</Text>
              </View>

              </LinearGradient>
              </TouchableOpacity>

              {/* //=================// */}
              <TouchableOpacity onPress={() => PUFlag()}>
              <LinearGradient style={styles.outer}
              colors={['#a8dadc', '#457b9d']}>
              <View style={styles.inner}>
              <Text style={styles.textBody}>مرحلة البلوغ</Text>
              </View>

              </LinearGradient>
              </TouchableOpacity>
              {/* //======= ==========// */}
              <TouchableOpacity onPress={() => DFlag()}>
              <LinearGradient style={styles.outer}
              colors={[ '#a8dadc', '#457b9d']}>
              <View style={styles.inner}>
              <Text style={styles.textBody}>القيادة</Text>
              </View>
              </LinearGradient>
              </TouchableOpacity>
              {/* //=================// */}
            {/* //======= ==========// */}
           <TouchableOpacity onPress={() => SURFlag()}>
              <LinearGradient style={styles.outer}
              colors={[ '#a8dadc', '#457b9d']}>
              <View style={styles.inner}>
              <Text style={styles.textBody}>العمليات</Text>
              </View>
              </LinearGradient>
              </TouchableOpacity>
              {/* //=================// */}
          </View>)
          : null}
          {autoFlag ? (<View>
            <View style={styles.innerCotainer}>
            <Text style={styles.textHeader}>
            الأشخاص المصابون بمرض السكري من النوع الأول هم معرضون أكثر من غيرهم للإصابة بالأمراض المناعية الأخرى. في الأسفل بعض المعلومات عن أكثر الأمراض المناعية المصاحبة لمرض السكري:
            </Text>
            <Text style={styles.textHeader}>
            ١- أمراض الغدة الدرقية:
  أمراض الغدة الدرقية المناعية هي أكثر الأمراض المناعية المصاحبة لمرض السكري وتتراوح نسبة الاصابة من ١٧-٣٠٪ من مرضى السكري النوع الأول. لذلك تحاليلك السنوية تشتمل على تحليل للغدة الدرقية.
  إذا حدث اختلال في هرمونات الغدة الدرقية فإن مريض السكري قد يلاحظ حدوث انخفاض غير مفسر في مستوى السكر بالدم أو قد تؤثر سلباً على مستوى التحكم بمستويات السكر بالدم.
  الأعراض الأخرى تشمل الآتي: عدم تحمل البرد أو الحر، إمساك أو إسهال، جفاف الجلد أو تعرّق شديد، ارتفاع أو نزول بالوزن وكذلك عدم انتظام أو غزارة الدورة الشهرية للإناث.

            </Text>
            <Text style={styles.textHeader}>
            ٢- حساسية القمح (السيلياك):
  حساسية القمح تحدث في ١.٦-١٦.٤٪ من مرضى السكري النوع الأول. يتم الفحص عنه روتينياً ضمن فحوصاتك السنوية حتى لو لم تكن لديك أعراض. تزداد نسبة حدوث انخفاض مستوى سكر الدم لمرضى السكري لمن لم يتم علاج حساسية القمح لديه.
  أعراض حساسية القمح تشمل الآتي: إمساك أو إسهال، نزول بالوزن، انتفاخ بالبطن، ألم بالبطن، خمول، تأخر بالنمو وكذلك تأخر في البلوغ.

            </Text>
            <View style={styles.buttonV}>
          <TouchableOpacity onPress={()=>globalFlag()}>
                  <LinearGradient
                      colors={['#E7EFFA', '#AABED8', '#AABED8']} style={styles.buttonR}
                  >
                      <Text style={{fontSize: 20, fontWeight: 'bold'}}>الانتهاء</Text>

                  </LinearGradient>
              </TouchableOpacity>
            </View>

              </View>
          </View>)
          : null}
               { edFlag ? (<View>
            <View style={styles.innerCotainer}>
            <Text style={styles.textHeader}>
            الأطفال المصابون بالسكري، خصوصاً من هم في مرحلة المراهقة، معرضون أكثر من غيرهم للإصابة بأحد اضطرابات الأكل وبنسبة أكبر في الإناث مقارنة بالذكور. هذه الزيادة في نسبة الإصابة يعتقد انها قد تكون بسبب تغيرات الوزن المصاحبة للعلاج بالأنسولين وكذلك كون مريض السكري يولي اهتماماً كبيراً للطعام الذي يتناوله.
            </Text>
            <Text style={styles.textHeader}>
            أكثر الأعراض شيوعاً لاضطرابات الأكل عند مرضى السكري النوع الأول هي:
  ١- عدم الرضى على وزن وشكل الجسم والرغبة بالنحافة.
  ٢- اتباع الحميات الغذائية والتلاعب بجرعات الأنسولين بغرض التحكم بوزن الجسم.
  ٣- الأكل بشراهة.

            </Text>
            <Text style={styles.textHeader}>
            بالنسبة لمرض السكري فإن اضطرابات الأكل تؤثر سلباً على مستويات سكر الدم وكذلك تعجل من ظهور مضاعفات مرض السكري المرتبطة بالأوعية الدموية الدقيقة.
  التشخيص والعلاج المبكر لاضطرابات الأكل مهم جداً. لذلك يرجى التواصل مع الطبيب إذا كان هناك أي تغيرات سلوكية و اشتباه بوجود اضطرابات بالأكل.

            </Text>
            <View style={styles.buttonV}>
          <TouchableOpacity onPress={()=>globalFlag()}>
                  <LinearGradient
                      colors={['#E7EFFA', '#AABED8', '#AABED8']} style={styles.buttonR}
                  >
                      <Text style={{fontSize: 20, fontWeight: 'bold'}}>الانتهاء</Text>

                  </LinearGradient>
              </TouchableOpacity>
            </View>

              </View>
          </View>)
          : null}
                  { puFlag ? (<View>
            <View style={styles.innerCotainer}>
            <Text style={styles.textHeader}>
            بالنسبة لمرض السكري فإن اضطرابات الأكل تؤثر سلباً على مستويات سكر الدم وكذلك تعجل من ظهور مضاعفات مرض السكري المرتبطة بالأوعية الدموية الدقيقة.
  التشخيص والعلاج المبكر لاضطرابات الأكل مهم جداً. لذلك يرجى التواصل مع الطبيب إذا كان هناك أي تغيرات سلوكية و اشتباه بوجود اضطرابات بالأكل.

            </Text>
            <Text style={styles.textHeader}>
            عند الوصول إلى مرحلة البلوغ ستجد أنك تحتاج إلى جرعات أكبر من الأنسولين وغالبا ًتستمر الحاجة لتعديل الجرعات طوال فترة المراهقة. الإناث قد تجدن أن حاجتهن اليومية من الأنسولين تكون أكثر في أيام الدورة الشهرية مقارنة بباقي الأيام. ولذلك بعضهن يسجلن الجرعات الخاصة بتلك الأيام في المفكرة اليومية أو كإعداد خاص في مضخة الأنسولين. إذا كنت ترغبين بمعرفة كيفية القيام بتسجيل ذلك الرجاء التواصل مع طبيبك.
            </Text>
            <Text style={styles.textHeader}>
            السكري يؤثر على الخصوبة لدى الجنسين. كذلك عند الحمل تحتاج الأم المصابة بالسكري إلى رعاية خاصة لها وللجنين.
           </Text>
            <View style={styles.buttonV}>
          <TouchableOpacity onPress={()=>globalFlag()}>
                  <LinearGradient
                      colors={['#E7EFFA', '#AABED8', '#AABED8']} style={styles.buttonR}
                  >
                      <Text style={{fontSize: 20, fontWeight: 'bold'}}>الانتهاء</Text>

                  </LinearGradient>
              </TouchableOpacity>
            </View>

              </View>
          </View>)
          : null}
            { dFlag ? (<View>
            <View style={styles.innerCotainer}>
            <Text style={styles.textHeader}>

  القيادة مع مرض السكري يحتاج إلى اهتمام خاص وذلك لحماية السائق والآخرين في الطريق. السكري قد يؤثر على قدرتك لقيادة السيارة مما قد يؤدي الى زيادة نسبة الحوادث.  أهم سبب لذلك هو انخفاض التركيز والقدرة المعرفية أثناء انخفاض مستوى السكر بالدم. كذلك مضاعفات مرض السكري قد تؤثر على قدرتك للقيادة مثل اعتلال الشبكية أو اعتمام عدسة العين (الماء الأبيض) التي تؤثر سلباِ على النظر واعتلال الأعصاب الطرفي الذي يؤثر على الإحساس بدواسة القدم للسيارة.

           </Text>
            <Text style={styles.textHeader}>
            اصابتك بمرض السكري من النوع الأول غالباً لا يمنع حصولك على رخصة القيادة وذلك خاضع للأنظمة واللوائح في كل دولة. تجد بالأسفل بعض القواعد العامة للقيادة لمن لديهم مرض السكري من النوع الأول:
            </Text>
            <Text style={styles.textHeader}>
            {'\n'}    ١- دائماً احمل معك جهاز قياس السكر والمستلزمات الأخرى.
  ٢- اجعل في متناول يدك داخل السيارة أي مصدر للكربوهيدرات السريعة مثل مكعبات السكر لعلاج انخفاض مستوى سكر الدم {'\n'}.
  ٣- افحص مستوى السكر بالدم قبل القيادة.{'\n'}
  ٤- لا تقود السيارة إذا كان مستوى السكر بالدم أقل من ٧٠ملجم/ديسيلتر (٤ ممول/لتر).{'\n'}
  ٥- افحص مستوى السكر بالدم كل ٤ ساعات على الأقل إذا كنت ستقود مطولاً.{'\n'}
  ٦- افحص مستوى السكر بالدم كل ساعتين إذا كنت لا تستطيع الإحساس بالأعراض المصاحبة لانخفاض مستوى السكر بالدم (مثل التعرق، الرعشة والخفقان).{'\n'}
  ٧- إذا أحسست بأعراض انخفاض أو ارتفاع مستوى سكر الدم أثناء القيادة، أوقف السيارة في مكان آمن ثم قم بفحص مستوى السكر بالدم وأخذ العلاج اللازم.{'\n'}
  ٨- يفضل عدم القيادة والانتظار لمدة ٤٠ دقيقة بعد علاج انخفاض مستوى سكر الدم وذلك لأن وظائف الدماغ تحتاج إلى وقت لتتعافى كلياً بعد الانخفاض. {'\n'}

           </Text>
            <View style={styles.buttonV}>
          <TouchableOpacity onPress={()=>globalFlag()}>
                  <LinearGradient
                      colors={['#E7EFFA', '#AABED8', '#AABED8']} style={styles.buttonR}
                  >
                      <Text style={{fontSize: 20, fontWeight: 'bold'}}>الانتهاء</Text>

                  </LinearGradient>
              </TouchableOpacity>
            </View>

              </View>
          </View>)
          : null}


  { surFlag ? (<View>
            <View style={styles.innerCotainer}>
            <Text style={styles.textHeader}>
            العمليات الجراحية وبعض الإجراءات الطبية تجعل الجسم تحت ضغط عصبي هرموني مما يؤثر على مستوى السكر بالدم سواء كان المريض مصاب بالسكري أم لا. المريض المصاب بالسكري من النوع الأول لا يستطيع إفراز الأنسولين من البنكرياس للتحكم بمستوى سكر الدم ويتحتم عليه أخذه من مصدر خارجي وهنا تكمن أهمية الاستمرار بأخذ الأنسولين قبل وأثناء وبعد العملية حتى وإن كان صائماً.
            </Text>
            <Text style={styles.textHeader}>
            التحكم الجيد بمستوى سكر الدم قبل وبعد العملية الجراحية يساهم في: سرعة التئام وشفاء الجرح، تقليل خطر حدوث الحموضة الكيتونية، تقليل نسبة حدوث انخفاض بمستوى سكر الدم وكذلك يقلل من نسبة الالتهابات.
  إذا كانت لديك عملية جراحية أو إجراء طبي مجدول الرجاء اخبار طبيبك بذلك. التوصيات لمعالجة السكري تعتمد على نوع العملية أو الإجراء الطبي وكذلك على نوع وآلية أخذ الأنسولين. إذا كان الإجراء الطبي أو العملية قصيرة قد تعطى بعض التوصيات المباشرة. أما إذا كانت العملية كبيرة سيتطلب منك الحرص على استدعاء الفريق الطبي لمعالجة السكري عند التنويم.

            </Text>

            <View style={styles.buttonV}>
          <TouchableOpacity onPress={()=>globalFlag()}>
                  <LinearGradient
                      colors={['#E7EFFA', '#AABED8', '#AABED8']} style={styles.buttonR}
                  >
                      <Text style={{fontSize: 20, fontWeight: 'bold'}}>الانتهاء</Text>

                  </LinearGradient>
              </TouchableOpacity>
            </View>

              </View>
          </View>)
          : null}
             </View>
          </ScrollView>
      </View>


    );
  };


  const {height} = Dimensions.get('screen');
  const height_logo = height * 0.28;

  export default specialAR;

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
      textBody:{
        fontSize: 17,
        color: '#05375a',
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 5,
        paddingTop: 15,
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