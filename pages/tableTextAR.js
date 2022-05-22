/* eslint-disable prettier/prettier */
/* eslint-disable eqeqeq */
import moment from 'moment';
import PushNotification from 'react-native-push-notification';
import SQLite from 'react-native-sqlite-storage';

global.db = SQLite.openDatabase(
    {
      name: 'iSugear.db',
      location: 'Library',
    },
    () => {
      console.log('Success');
    },
    error => {
      console.log('ERROR: ' + error);
    },
  );
  var uID = 1;
  var curDate = moment().format('YYYY-MM-DD');
  var cTime = new Date();
//==============for notification=============================
const handleScheduleNotification = (title, message, time) => {
    PushNotification.localNotificationSchedule({
        channelId: 'channel-id',
        title: title,
        message: message,
        date: new Date(Date.now() + (time * 60 * 1000)),
        allowWhileIdle: true,
    });
    };

const tableText = function(BG, ketonesSource, ketonesLevel, isMeal, insulinType, flags){
    var currentBG = BG;
    var ketones = ketonesSource;
    var level = ketonesLevel;
    var Meal = isMeal;
    var insType = insulinType;
    var recommendation = '';
    var caseNO = '';
    var ifMealTime = '• خذ جرعة الانسولين كالمعتاد للوجبة والتصحيح (إذا لزم حسب قراءة مستوى سكر الدم) '; //displayes message if the its the meal time.
    var rapid = '• وخذ جرعة انسولين إضافية مستخدماً قلم الانسولين سريع المفعول.';
    var finalRecommendation = '';
    var flag = flags;

    if (currentBG < 70 && currentBG > 0){
            if (ketones == 'blood' && level < 0.6){
                if (Meal != 'No'){
                    recommendation = '• أعد فحص مستوى سكر الدم بعد ٣٠ دقيقة' + '\n' + '• إذا كنت تشعر أنك مريض أو كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                } else {
                    recommendation = '• أعد فحص مستوى سكر الدم بعد ٣٠ دقيقة' + '\n' + '• إذا كنت تشعر أنك مريض أو كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                }
                if (flag != 'true'){
                    handleScheduleNotification('السُّكر','حان وقت إعادة فحص مستوى سكر الدم و الكيتونات', 30);//30
                    }
            }
            else if (ketones == 'blood' && level == 'Negative'){
                if (Meal != 'No'){
                    recommendation = '• أعد فحص مستوى سكر الدم بعد ٣٠ دقيقة' + '\n' + '• إذا كنت تشعر أنك مريض أو كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                } else {
                    recommendation = '• أعد فحص مستوى سكر الدم بعد ٣٠ دقيقة' + '\n' + '• إذا كنت تشعر أنك مريض أو كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                }
                if (flag != 'true'){
                    handleScheduleNotification('السُّكر','حان وقت إعادة فحص مستوى سكر الدم و الكيتونات', 30);//30
                    }
            }
        if (insType != 'Aspart' || insType != 'Lispro' || insType != 'Glulisine'){
            if (Meal != 'No'){
            finalRecommendation = ifMealTime + '\n' + rapid;
        }
        else {
           finalRecommendation = rapid;
        }
    }
 }//Case1 below 70
    if (currentBG >= 70 && currentBG < 90 && ketones == 'blood'){
        caseNO = '2';
        console.log('2');
    }
    if (currentBG >= 70 && currentBG < 90 && ketones == 'urine'){
        caseNO = '3';
        console.log('3');
    }
    if (currentBG >= 90 && currentBG < 180 && ketones == 'blood'){
        caseNO = '4';
        console.log('4');
    }
    if (currentBG >= 90 && currentBG < 180 && ketones == 'urine'){
        caseNO = '5';
        console.log('5');
    }
    if (currentBG >= 180 && currentBG < 250 && ketones == 'blood'){
        caseNO = '6';
        console.log('6');
    }
    if (currentBG >= 180 && currentBG < 250 && ketones == 'urine'){
        caseNO = '7';
        console.log('7');
    }
    if (currentBG >= 250 && currentBG < 400 && ketones == 'blood'){
        caseNO = '8';
        console.log('8');
    }
    if (currentBG >= 250 && currentBG < 400 && ketones == 'urine'){
        caseNO = '9';
        console.log('9');
    }
    if (currentBG >= 400 && ketones == 'blood'){
        caseNO = '10';
        console.log('10');
    }
    if (currentBG >= 400 && ketones == 'urine'){
        caseNO = '11';
        console.log('11');
    }


    if (caseNO == '2'){
switch (caseNO == '2'){
    case level < 0.6:
        console.log('A');
        if (Meal != 'No'){
       recommendation = '• الآن لا تحتاج إلى جرعة انسولين إضافية' + '\n' + '• احرص على شرب السوائل المحلاة (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ساعتين أو أبكر إذا كان لديك أعراض انخفاض سكر الدم' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
        } else {
            recommendation = '• الآن لا تحتاج إلى جرعة انسولين إضافية' + '\n' + '• احرص على شرب السوائل المحلاة (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• تناول وجبة خفيفة تحتوي على الكربوهيدرات' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ساعتين أو أبكر إذا كان لديك أعراض انخفاض سكر الدم' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
        }
        finalRecommendation = recommendation;
        if (flag != 'true'){
        handleScheduleNotification('السُّكر','حان وقت إعادة فحص مستوى سكر الدم و الكيتونات', 120);//120
        }
        if (insType != 'Aspart' || insType != 'Lispro' || insType != 'Glulisine'){
            if (Meal != 'No'){
            finalRecommendation = ifMealTime + '\n' + recommendation + '\n' + rapid;
        }
        else {
           finalRecommendation = recommendation + '\n' + rapid;
        }
    }
        break;

    case level >= 0.6 && level <= 0.9:
        console.log('B');
        if (Meal != 'No'){
            recommendation = '• الآن لا تحتاج إلى جرعة انسولين إضافية' + '\n' + '• احرص على شرب السوائل المحلاة (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ساعتين أو أبكر إذا كان لديك أعراض انخفاض سكر الدم' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
             } else {
                 recommendation = '• الآن لا تحتاج إلى جرعة انسولين إضافية' + '\n' + '• احرص على شرب السوائل المحلاة (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• تناول وجبة خفيفة تحتوي على الكربوهيدرات' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ساعتين أو أبكر إذا كان لديك أعراض انخفاض سكر الدم' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
             }
             finalRecommendation = recommendation;
        if (flag != 'true'){
        handleScheduleNotification('السُّكر','حان وقت إعادة فحص مستوى سكر الدم و الكيتونات', 120);//120
        }
        if (insType != 'Aspart' || insType != 'Lispro' || insType != 'Glulisine'){
            if (Meal != 'No'){
            finalRecommendation = ifMealTime + '\n' + recommendation + '\n' + rapid;
        }
        else {
           finalRecommendation = recommendation + '\n' + rapid;
        }
    }
        // there is a clalculation for insulin A
        break;

    case level >= 1 && level <= 1.4:
        console.log('C');
        if (Meal != 'No'){
            recommendation = '• الآن لا تحتاج إلى جرعة انسولين إضافية' + '\n' + '• احرص على شرب السوائل المحلاة (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ساعتين أو أبكر إذا كان لديك أعراض انخفاض سكر الدم' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
             } else {
                 recommendation = '• الآن لا تحتاج إلى جرعة انسولين إضافية' + '\n' + '• احرص على شرب السوائل المحلاة (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• تناول وجبة خفيفة تحتوي على الكربوهيدرات' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ساعتين أو أبكر إذا كان لديك أعراض انخفاض سكر الدم' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
             }
             finalRecommendation = recommendation;
        if (flag != 'true'){
        handleScheduleNotification('السُّكر','حان وقت إعادة فحص مستوى سكر الدم و الكيتونات', 120);//120
        }
        if (insType != 'Aspart' || insType != 'Lispro' || insType != 'Glulisine'){
            if (Meal != 'No'){
            finalRecommendation = ifMealTime + '\n' + recommendation + '\n' + rapid;
        }
        else {
           finalRecommendation = recommendation + '\n' + rapid;
        }
    }
        // there is a clalculation for insulin A
        break;

    case level >= 1.5 && level <= 2.9:
        console.log('D');
        if (Meal != 'No'){
            recommendation = '• الآن لا تحتاج إلى جرعة انسولين إضافية' + '\n' + '• احرص على شرب السوائل المحلاة (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ساعتين أو أبكر إذا كان لديك أعراض انخفاض سكر الدم' + '\n' + '• تحتاج إلى متابعة قريبة لارتفاع احتمال حدوث الحموضة الكيتونية' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
             } else {
                 recommendation = '• الآن لا تحتاج إلى جرعة انسولين إضافية' + '\n' + '• احرص على شرب السوائل المحلاة (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• تناول وجبة خفيفة تحتوي على الكربوهيدرات' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ساعتين أو أبكر إذا كان لديك أعراض انخفاض سكر الدم' + '\n' + '• تحتاج إلى متابعة قريبة لارتفاع احتمال حدوث الحموضة الكيتونية' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
             }
             finalRecommendation = recommendation;
        if (flag != 'true'){
        handleScheduleNotification('السُّكر','حان وقت إعادة فحص مستوى سكر الدم و الكيتونات', 120);//120
        }
        if (insType != 'Aspart' || insType != 'Lispro' || insType != 'Glulisine'){
            if (Meal != 'No'){
            finalRecommendation = ifMealTime + '\n' + recommendation + '\n' + rapid;
        }
        else {
           finalRecommendation = recommendation + '\n' + rapid;
        }
    }
        // there is a clalculation for insulin A
        break;

    case level >= 3:
        console.log('E');
        if (Meal != 'No'){
            recommendation = '• الآن لا تحتاج إلى جرعة انسولين إضافية' + '\n' + '• خطر الحموضة الكيتونية عالي، اذهب إلى الإسعاف' + '\n' + '• احرص على شرب السوائل المحلاة (على الأقل ١٠٠مل كل ساعة)';
        } else {
            recommendation = '• الآن لا تحتاج إلى جرعة انسولين إضافية' + '\n' + '• خطر الحموضة الكيتونية عالي، اذهب إلى الإسعاف' + '\n' + '• احرص على شرب السوائل المحلاة (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• تناول وجبة خفيفة تحتوي على الكربوهيدرات';
        }
        finalRecommendation = recommendation;
        if (insType != 'Aspart' || insType != 'Lispro' || insType != 'Glulisine'){
            if (Meal != 'No'){
            finalRecommendation = ifMealTime + '\n' + recommendation + '\n' + rapid;
        }
        else {
           finalRecommendation = recommendation + '\n' + rapid;
        }
    }
        break;
}//Case 2 between 70-90
    }
    if (caseNO == '3'){
switch (caseNO == '3'){
    case level == 'Negative':
        console.log('A2');
        if (Meal != 'No'){
            recommendation = '• الآن لا تحتاج إلى جرعة انسولين إضافية' + '\n' + '• احرص على شرب السوائل المحلاة (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ساعتين أو أبكر إذا كان لديك أعراض انخفاض سكر الدم' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
             } else {
                 recommendation = '• الآن لا تحتاج إلى جرعة انسولين إضافية' + '\n' + '• احرص على شرب السوائل المحلاة (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• تناول وجبة خفيفة تحتوي على الكربوهيدرات' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ساعتين أو أبكر إذا كان لديك أعراض انخفاض سكر الدم' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
             }
             finalRecommendation = recommendation;
        if (flag != 'true'){
        handleScheduleNotification('السُّكر','حان وقت إعادة فحص مستوى سكر الدم و الكيتونات', 120);//120
        }
        if (insType != 'Aspart' || insType != 'Lispro' || insType != 'Glulisine'){
            if (Meal != 'No'){
            finalRecommendation = ifMealTime + '\n' + recommendation + '\n' + rapid;
        }
        else {
           finalRecommendation = recommendation + '\n' + rapid;
        }
    }
        break;
    case level == 'Trace':
        console.log('B2');
        if (Meal != 'No'){
            recommendation = '• الآن لا تحتاج إلى جرعة انسولين إضافية' + '\n' + '• احرص على شرب السوائل المحلاة (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ساعتين أو أبكر إذا كان لديك أعراض انخفاض سكر الدم' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
             } else {
                 recommendation = '• الآن لا تحتاج إلى جرعة انسولين إضافية' + '\n' + '• احرص على شرب السوائل المحلاة (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• تناول وجبة خفيفة تحتوي على الكربوهيدرات' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ساعتين أو أبكر إذا كان لديك أعراض انخفاض سكر الدم' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
             }
             finalRecommendation = recommendation;
        if (flag != 'true'){
        handleScheduleNotification('السُّكر','حان وقت إعادة فحص مستوى سكر الدم والكيتونات', 120);//120
        }
        if (insType != 'Aspart' || insType != 'Lispro' || insType != 'Glulisine'){
            if (Meal != 'No'){
            finalRecommendation = ifMealTime + '\n' + recommendation + '\n' + rapid;
        }
        else {
           finalRecommendation = recommendation + '\n' + rapid;
        }
    }
        // there is a clalculation for insulin A
        break;
    case level == 'Small':
        console.log('C2');
        if (Meal != 'No'){
            recommendation = '• الآن لا تحتاج إلى جرعة انسولين إضافية' + '\n' + '• احرص على شرب السوائل المحلاة (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ساعتين أو أبكر إذا كان لديك أعراض انخفاض سكر الدم' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
             } else {
                 recommendation = '• الآن لا تحتاج إلى جرعة انسولين إضافية' + '\n' + '• احرص على شرب السوائل المحلاة (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• تناول وجبة خفيفة تحتوي على الكربوهيدرات' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ساعتين أو أبكر إذا كان لديك أعراض انخفاض سكر الدم' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
             }
             finalRecommendation = recommendation;
        if (flag != 'true'){
        handleScheduleNotification('السُّكر','حان وقت إعادة فحص مستوى سكر الدم والكيتونات', 120);//120
        }
        if (insType != 'Aspart' || insType != 'Lispro' || insType != 'Glulisine'){
            if (Meal != 'No'){
            finalRecommendation = ifMealTime + '\n' + recommendation + '\n' + rapid;
        }
        else {
           finalRecommendation = recommendation + '\n' + rapid;
        }
    }
        // there is a clalculation for insulin A
        break;
    case level == 'Moderate':
        console.log('D2');
        if (Meal != 'No'){
            recommendation = '• الآن لا تحتاج إلى جرعة انسولين إضافية' + '\n' + '• احرص على شرب السوائل المحلاة (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ساعتين أو أبكر إذا كان لديك أعراض انخفاض سكر الدم' + '\n' + '• تحتاج إلى متابعة قريبة لارتفاع احتمال حدوث الحموضة الكيتونية' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
             } else {
                 recommendation = '• الآن لا تحتاج إلى جرعة انسولين إضافية' + '\n' + '• احرص على شرب السوائل المحلاة (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• تناول وجبة خفيفة تحتوي على الكربوهيدرات' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ساعتين أو أبكر إذا كان لديك أعراض انخفاض سكر الدم' + '\n' + '• تحتاج إلى متابعة قريبة لارتفاع احتمال حدوث الحموضة الكيتونية' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
             }
             finalRecommendation = recommendation;
        if (flag != 'true'){
        handleScheduleNotification('السُّكر','حان وقت إعادة فحص مستوى سكر الدم والكيتونات', 120);//120
        }
        if (insType != 'Aspart' || insType != 'Lispro' || insType != 'Glulisine'){
            if (Meal != 'No'){
            finalRecommendation = ifMealTime + '\n' + recommendation + '\n' + rapid;
        }
        else {
           finalRecommendation = recommendation + '\n' + rapid;
        }
    }
        // there is a clalculation for insulin A
        break;
    case level == 'Large':
        console.log('E2');
        if (Meal != 'No'){
            recommendation = '• الآن لا تحتاج إلى جرعة انسولين إضافية' + '\n' + '• خطر الحموضة الكيتونية عالي، اذهب إلى الإسعاف' + '\n' + '• احرص على شرب السوائل المحلاة (على الأقل ١٠٠مل كل ساعة)';
        } else {
            recommendation = '• الآن لا تحتاج إلى جرعة انسولين إضافية' + '\n' + '• خطر الحموضة الكيتونية عالي، اذهب إلى الإسعاف' + '\n' + '• احرص على شرب السوائل المحلاة (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• تناول وجبة خفيفة تحتوي على الكربوهيدرات';
        }
        finalRecommendation = recommendation;
        if (insType != 'Aspart' || insType != 'Lispro' || insType != 'Glulisine'){
            if (Meal != 'No'){
            finalRecommendation = ifMealTime + '\n' + recommendation + '\n' + rapid;
        }
        else {
           finalRecommendation = recommendation + '\n' + rapid;
        }
    }
        break;
}//Case 2 between 70-90
    }//70-90

    if (caseNO == '4'){
    switch (caseNO == '4'){
        case level < 0.6:
            console.log('F');
            if (Meal != 'No'){
                recommendation = '• الآن لا تحتاج إلى جرعة انسولين إضافية' + '\n' + '• احرص على شرب السوائل (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ٣ساعات أو أبكر إذا كان لديك أعراض انخفاض سكر الدم';
            } else {
                recommendation = '• الآن لا تحتاج إلى جرعة انسولين إضافية' + '\n' + '• احرص على شرب السوائل (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ٣ساعات أو أبكر إذا كان لديك أعراض انخفاض سكر الدم';
            }
            finalRecommendation = recommendation;
            if (flag != 'true'){
            handleScheduleNotification('السُّكر','حان وقت إعادة فحص مستوى سكر الدم والكيتونات', 180);//180
            }
            if (insType != 'Aspart' || insType != 'Lispro' || insType != 'Glulisine'){
                if (Meal != 'No'){
                finalRecommendation = ifMealTime + '\n' + recommendation + '\n' + rapid;
            }
            else {
               finalRecommendation = recommendation + '\n' + rapid;
            }
        }
            break;
        case level >= 0.6 && level <= 0.9:
            console.log('G');
            if (Meal != 'No'){
                recommendation = '• الآن لا تحتاج إلى جرعة انسولين إضافية' + '\n' + '• احرص على شرب السوائل المحلاة (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ٣ساعات أو أبكر إذا كان لديك أعراض انخفاض سكر الدم' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                 } else {
                     recommendation = '• الآن لا تحتاج إلى جرعة انسولين إضافية' + '\n' + '• احرص على شرب السوائل المحلاة (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• تناول وجبة خفيفة تحتوي على الكربوهيدرات' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ٣ساعات أو أبكر إذا كان لديك أعراض انخفاض سكر الدم' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                 }
                 finalRecommendation = recommendation;
            if (flag != 'true'){
            handleScheduleNotification('السُّكر','حان وقت إعادة فحص مستوى سكر الدم والكيتونات', 180);//180
            }
            if (insType != 'Aspart' || insType != 'Lispro' || insType != 'Glulisine'){
                if (Meal != 'No'){
                finalRecommendation = ifMealTime + '\n' + recommendation + '\n' + rapid;
            }
            else {
               finalRecommendation = recommendation + '\n' + rapid;
            }
        }
            // there is a clalculation for insulin A
            break;
        case level >= 1 && level <= 1.4:
            console.log('H');
            if (Meal != 'No'){
                recommendation = '• الآن لا تحتاج إلى جرعة انسولين إضافية' + '\n' + '• احرص على شرب السوائل المحلاة (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد  ٣ساعات أو أبكر إذا كان لديك أعراض انخفاض سكر الدم' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                 } else {
                     recommendation = '• الآن لا تحتاج إلى جرعة انسولين إضافية' + '\n' + '• احرص على شرب السوائل المحلاة (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• تناول وجبة خفيفة تحتوي على الكربوهيدرات' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ٣ساعات أو أبكر إذا كان لديك أعراض انخفاض سكر الدم' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                 }
                 finalRecommendation = recommendation;
            if (flag != 'true'){
            handleScheduleNotification('السُّكر','حان وقت إعادة فحص مستوى سكر الدم والكيتونات', 180);//180
            }
            if (insType != 'Aspart' || insType != 'Lispro' || insType != 'Glulisine'){
                if (Meal != 'No'){
                finalRecommendation = ifMealTime + '\n' + recommendation + '\n' + rapid;
            }
            else {
               finalRecommendation = recommendation + '\n' + rapid;
            }
        }
            // there is a clalculation for insulin A
            break;
        case level >= 1.5 && level <= 2.9:
            console.log('I');
            if (Meal != 'No'){
                recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ٥٪ من مجموع الجرعة اليومية' + '\n' + '• احرص على شرب السوائل المحلاة (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ساعتين أو أبكر إذا كان لديك أعراض انخفاض سكر الدم' + '\n' + '• تحتاج إلى متابعة قريبة لارتفاع احتمال حدوث الحموضة الكيتونية' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                 } else {
                     recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ٥٪ من مجموع الجرعة اليومية'  + '\n' + '• احرص على شرب السوائل المحلاة (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• تناول وجبة خفيفة تحتوي على الكربوهيدرات' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ساعتين أو أبكر إذا كان لديك أعراض انخفاض سكر الدم' + '\n' + '• تحتاج إلى متابعة قريبة لارتفاع احتمال حدوث الحموضة الكيتونية' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                 }
                 finalRecommendation = recommendation;
            if (flag != 'true'){
            handleScheduleNotification('السُّكر','حان وقت إعادة فحص مستوى سكر الدم والكيتونات', 120);//120
            }
            if (insType != 'Aspart' || insType != 'Lispro' || insType != 'Glulisine'){
                if (Meal != 'No'){
                finalRecommendation = ifMealTime + '\n' + recommendation + '\n' + rapid;
            }
            else {
               finalRecommendation = recommendation + '\n' + rapid;
            }
        }
            // there is a clalculation for insulin A
            break;
        case level >= 3:
            console.log('J');
            if (Meal != 'No'){
                recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ٥٪ من مجموع الجرعة اليومية' + '\n' + '• خطر الحموضة الكيتونية عالي، اذهب إلى الإسعاف' + '\n' + '• احرص على شرب السوائل المحلاة (على الأقل ١٠٠مل كل ساعة)';
            } else {
                recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ٥٪ من مجموع الجرعة اليومية' + '\n' + '• خطر الحموضة الكيتونية عالي، اذهب إلى الإسعاف' + '\n' + '• احرص على شرب السوائل المحلاة (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• تناول وجبة خفيفة تحتوي على الكربوهيدرات';
            }
            finalRecommendation = recommendation;
            if (insType != 'Aspart' || insType != 'Lispro' || insType != 'Glulisine'){
                if (Meal != 'No'){
                finalRecommendation = ifMealTime + '\n' + recommendation + '\n' + rapid;
            }
            else {
               finalRecommendation = recommendation + '\n' + rapid;
            }
        }
            break;
    }//Case 4 between 90-180
    }
    if (caseNO == '5'){
    switch (caseNO == '5'){
        case level == 'Negative':
            console.log('F2');
            if (Meal != 'No'){
                recommendation = '• الآن لا تحتاج إلى جرعة انسولين إضافية' + '\n' + '• احرص على شرب السوائل (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ٣ساعات أو أبكر إذا كان لديك أعراض انخفاض سكر الدم';
            } else {
                recommendation = '• الآن لا تحتاج إلى جرعة انسولين إضافية' + '\n' + '• احرص على شرب السوائل (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ٣ساعات أو أبكر إذا كان لديك أعراض انخفاض سكر الدم';
            }
            finalRecommendation = recommendation;
            if (flag != 'true'){
            handleScheduleNotification('السُّكر','حان وقت إعادة فحص مستوى سكر الدم والكيتونات', 180);//180
            }
            if (insType != 'Aspart' || insType != 'Lispro' || insType != 'Glulisine'){
                if (Meal != 'No'){
                finalRecommendation = ifMealTime + '\n' + recommendation + '\n' + rapid;
            }
            else {
               finalRecommendation = recommendation + '\n' + rapid;
            }
        }
            break;
        case level == 'Trace':
            console.log('G2');
            if (Meal != 'No'){
                recommendation = '• الآن لا تحتاج إلى جرعة انسولين إضافية' + '\n' + '• احرص على شرب السوائل المحلاة (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ٣ساعات أو أبكر إذا كان لديك أعراض انخفاض سكر الدم' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                 } else {
                     recommendation = '• الآن لا تحتاج إلى جرعة انسولين إضافية' + '\n' + '• احرص على شرب السوائل المحلاة (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• تناول وجبة خفيفة تحتوي على الكربوهيدرات' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ٣ساعات أو أبكر إذا كان لديك أعراض انخفاض سكر الدم' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                 }
                 finalRecommendation = recommendation;
            if (flag != 'true'){
            handleScheduleNotification('السُّكر','حان وقت إعادة فحص مستوى سكر الدم والكيتونات', 180);//180
            }
            if (insType != 'Aspart' || insType != 'Lispro' || insType != 'Glulisine'){
                if (Meal != 'No'){
                finalRecommendation = ifMealTime + '\n' + recommendation + '\n' + rapid;
            }
            else {
               finalRecommendation = recommendation + '\n' + rapid;
            }
        }
            // there is a clalculation for insulin A
            break;
        case level == 'Small':
            console.log('H2');
            if (Meal != 'No'){
                recommendation = '• الآن لا تحتاج إلى جرعة انسولين إضافية' + '\n' + '• احرص على شرب السوائل المحلاة (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد  ٣ساعات أو أبكر إذا كان لديك أعراض انخفاض سكر الدم' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                 } else {
                     recommendation = '• الآن لا تحتاج إلى جرعة انسولين إضافية' + '\n' + '• احرص على شرب السوائل المحلاة (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• تناول وجبة خفيفة تحتوي على الكربوهيدرات' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ٣ساعات أو أبكر إذا كان لديك أعراض انخفاض سكر الدم' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                 }
                 finalRecommendation = recommendation;
            if (flag != 'true'){
            handleScheduleNotification('السُّكر','حان وقت إعادة فحص مستوى سكر الدم والكيتونات', 180);//180
            }
            if (insType != 'Aspart' || insType != 'Lispro' || insType != 'Glulisine'){
                if (Meal != 'No'){
                finalRecommendation = ifMealTime + '\n' + recommendation + '\n' + rapid;
            }
            else {
               finalRecommendation = recommendation + '\n' + rapid;
            }
        }
            // there is a clalculation for insulin A
            break;
        case level == 'Moderate':
            console.log('I2');
            if (Meal != 'No'){
                recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ٥٪ من مجموع الجرعة اليومية' + '\n' + '• احرص على شرب السوائل المحلاة (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ساعتين أو أبكر إذا كان لديك أعراض انخفاض سكر الدم' + '\n' + '• تحتاج إلى متابعة قريبة لارتفاع احتمال حدوث الحموضة الكيتونية' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                 } else {
                     recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ٥٪ من مجموع الجرعة اليومية'  + '\n' + '• احرص على شرب السوائل المحلاة (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• تناول وجبة خفيفة تحتوي على الكربوهيدرات' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ساعتين أو أبكر إذا كان لديك أعراض انخفاض سكر الدم' + '\n' + '• تحتاج إلى متابعة قريبة لارتفاع احتمال حدوث الحموضة الكيتونية' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                 }
                 finalRecommendation = recommendation;
            if (flag != 'true'){
            handleScheduleNotification('السُّكر','حان وقت إعادة فحص مستوى سكر الدم والكيتونات', 120);//120
            }
            if (insType != 'Aspart' || insType != 'Lispro' || insType != 'Glulisine'){
                if (Meal != 'No'){
                finalRecommendation = ifMealTime + '\n' + recommendation + '\n' + rapid;
            }
            else {
               finalRecommendation = recommendation + '\n' + rapid;
            }
        }
            // there is a clalculation for insulin A
            break;
        case level == 'Large':
            console.log('J2');
            if (Meal != 'No'){
                recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ٥٪ من مجموع الجرعة اليومية' + '\n' + '• خطر الحموضة الكيتونية عالي، اذهب إلى الإسعاف' + '\n' + '• احرص على شرب السوائل المحلاة (على الأقل ١٠٠مل كل ساعة)';
            } else {
                recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ٥٪ من مجموع الجرعة اليومية' + '\n' + '• خطر الحموضة الكيتونية عالي، اذهب إلى الإسعاف' + '\n' + '• احرص على شرب السوائل المحلاة (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• تناول وجبة خفيفة تحتوي على الكربوهيدرات';
            }
            finalRecommendation = recommendation;
            if (insType != 'Aspart' || insType != 'Lispro' || insType != 'Glulisine'){
                if (Meal != 'No'){
                finalRecommendation = ifMealTime + '\n' + recommendation + '\n' + rapid;
            }
            else {
               finalRecommendation = recommendation + '\n' + rapid;
            }
        }
            break;
    }//Case 5 between 90-180
    }//90-180

    if (caseNO == '6'){
        switch (caseNO == '6'){
            case level < 0.6:
                console.log('K');
                if (Meal != 'No'){
                    recommendation = '• الآن لا تحتاج إلى جرعة انسولين إضافية' + '\n' + '• احرص على شرب السوائل (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ٤ ساعات' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                     } else {
                         recommendation = '• الآن لا تحتاج إلى جرعة انسولين إضافية' + '\n' + '• احرص على شرب السوائل (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ٤ ساعات' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                     }
                     finalRecommendation = recommendation;
                if (flag != 'true'){
                handleScheduleNotification('السُّكر','حان وقت إعادة فحص مستوى سكر الدم والكيتونات', 240);//240
                }
                if (insType != 'Aspart' || insType != 'Lispro' || insType != 'Glulisine'){
                    if (Meal != 'No'){
                    finalRecommendation = ifMealTime + '\n' + recommendation + '\n' + rapid;
                }
                else {
                   finalRecommendation = recommendation + '\n' + rapid;
                }
            }
                break;
            case level >= 0.6 && level <= 0.9:
                console.log('L');
                if (Meal != 'No'){
                    recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ٥٪ من مجموع الجرعة اليومية' + '\n' + '• احرص على شرب السوائل المحلاة (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ٤ ساعات أو أبكر إذا كان لديك أعراض انخفاض سكر الدم' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                     } else {
                        recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ٥٪ من مجموع الجرعة اليومية' + '\n' + '• احرص على شرب السوائل المحلاة (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ٤ ساعات أو أبكر إذا كان لديك أعراض انخفاض سكر الدم' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                    }
                     finalRecommendation = recommendation;
                if (flag != 'true'){
                handleScheduleNotification('السُّكر','حان وقت إعادة فحص مستوى سكر الدم والكيتونات', 240);//240
                }
                if (insType != 'Aspart' || insType != 'Lispro' || insType != 'Glulisine'){
                    if (Meal != 'No'){
                    finalRecommendation = ifMealTime + '\n' + recommendation + '\n' + rapid;
                }
                else {
                   finalRecommendation = recommendation + '\n' + rapid;
                }
            }
                break;
            case level >= 1 && level <= 1.4:
                console.log('M');
                 if (Meal != 'No'){
                    recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ٥٪ من مجموع الجرعة اليومية' + '\n' + '• احرص على شرب السوائل المحلاة (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ٤ ساعات أو أبكر إذا كان لديك أعراض انخفاض سكر الدم' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                 } else {
                     recommendation =  '• خذ جرعة انسولين إضافية الجرعة الإضافية = ٥٪ من مجموع الجرعة اليومية' + '\n' + '• احرص على شرب السوائل المحلاة (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• تناول وجبة خفيفة تحتوي على الكربوهيدرات' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ٤ ساعات أو أبكر إذا كان لديك أعراض انخفاض سكر الدم' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                 }
                     finalRecommendation = recommendation;
                if (flag != 'true'){
                handleScheduleNotification('السُّكر','حان وقت إعادة فحص مستوى سكر الدم والكيتونات', 240);//240
                }
                if (insType != 'Aspart' || insType != 'Lispro' || insType != 'Glulisine'){
                    if (Meal != 'No'){
                    finalRecommendation = ifMealTime + '\n' + recommendation + '\n' + rapid;
                }
                else {
                   finalRecommendation = recommendation + '\n' + rapid;
                }
            }
                break;
            case level >= 1.5 && level <= 2.9:
                console.log('N');
                if (Meal != 'No'){
                    recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ١٠٪ من مجموع الجرعة اليومية' + '\n' + '• احرص على شرب السوائل المحلاة (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ٤ ساعات' + '\n' + '• تحتاج إلى متابعة قريبة لارتفاع احتمال حدوث الحموضة الكيتونية' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                     } else {
                         recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ١٠٪ من مجموع الجرعة اليومية'  + '\n' + '• احرص على شرب السوائل المحلاة (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• تناول وجبة خفيفة تحتوي على الكربوهيدرات' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ٤ ساعات' + '\n' + '• تحتاج إلى متابعة قريبة لارتفاع احتمال حدوث الحموضة الكيتونية' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                     }
                     finalRecommendation = recommendation;
                if (flag != 'true'){
                handleScheduleNotification('السُّكر','حان وقت إعادة فحص مستوى سكر الدم والكيتونات', 240);//240
                }
                if (insType != 'Aspart' || insType != 'Lispro' || insType != 'Glulisine'){
                    if (Meal != 'No'){
                    finalRecommendation = ifMealTime + '\n' + recommendation + '\n' + rapid;
                }
                else {
                   finalRecommendation = recommendation + '\n' + rapid;
                }
            }
                break;
            case level >= 3:
                console.log('P');
                if (Meal != 'No'){
                    recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ١٥٪ من مجموع الجرعة اليومية' + '\n' + '• خطر الحموضة الكيتونية عالي، اذهب إلى الإسعاف' + '\n' + '• احرص على شرب السوائل المحلاة (على الأقل ١٠٠مل كل ساعة)';
                } else {
                    recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ١٥٪ من مجموع الجرعة اليومية' + '\n' + '• خطر الحموضة الكيتونية عالي، اذهب إلى الإسعاف' + '\n' + '• احرص على شرب السوائل المحلاة (على الأقل ١٠٠مل كل ساعة)';
                }
                finalRecommendation = recommendation;
                if (insType != 'Aspart' || insType != 'Lispro' || insType != 'Glulisine'){
                    if (Meal != 'No'){
                    finalRecommendation = ifMealTime + '\n' + recommendation + '\n' + rapid;
                }
                else {
                   finalRecommendation = recommendation + '\n' + rapid;
                }
            }
                break;
        }//Case 6 between 180-250
    }
    if (caseNO == '7'){
        switch (caseNO == '7'){
            case level == 'Negative':
                console.log('K2');
                if (Meal != 'No'){
                    recommendation = '• الآن لا تحتاج إلى جرعة انسولين إضافية' + '\n' + '• احرص على شرب السوائل (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ٤ ساعات' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                     } else {
                         recommendation = '• الآن لا تحتاج إلى جرعة انسولين إضافية' + '\n' + '• احرص على شرب السوائل (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ٤ ساعات' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                     }
                     finalRecommendation = recommendation;
                if (flag != 'true'){
                handleScheduleNotification('السُّكر','حان وقت إعادة فحص مستوى سكر الدم والكيتونات', 240);//240
                }
                if (insType != 'Aspart' || insType != 'Lispro' || insType != 'Glulisine'){
                    if (Meal != 'No'){
                    finalRecommendation = ifMealTime + '\n' + recommendation + '\n' + rapid;
                }
                else {
                   finalRecommendation = recommendation + '\n' + rapid;
                }
            }
                break;
            case level == 'Trace':
                console.log('L2');
                if (Meal != 'No'){
                    recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ٥٪ من مجموع الجرعة اليومية' + '\n' + '• احرص على شرب السوائل المحلاة (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ٤ ساعات أو أبكر إذا كان لديك أعراض انخفاض سكر الدم' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                     } else {
                        recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ٥٪ من مجموع الجرعة اليومية' + '\n' + '• احرص على شرب السوائل المحلاة (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ٤ ساعات أو أبكر إذا كان لديك أعراض انخفاض سكر الدم' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                    }
                     finalRecommendation = recommendation;
                if (flag != 'true'){
                handleScheduleNotification('السُّكر','حان وقت إعادة فحص مستوى سكر الدم والكيتونات', 240);//240
                }
                if (insType != 'Aspart' || insType != 'Lispro' || insType != 'Glulisine'){
                    if (Meal != 'No'){
                    finalRecommendation = ifMealTime + '\n' + recommendation + '\n' + rapid;
                }
                else {
                   finalRecommendation = recommendation + '\n' + rapid;
                }
            }
                break;
            case level == 'Small':
                console.log('M2');
                if (Meal != 'No'){
                    recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ٥٪ من مجموع الجرعة اليومية' + '\n' + '• احرص على شرب السوائل المحلاة (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ٤ ساعات أو أبكر إذا كان لديك أعراض انخفاض سكر الدم' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                 } else {
                     recommendation =  '• خذ جرعة انسولين إضافية الجرعة الإضافية = ٥٪ من مجموع الجرعة اليومية' + '\n' + '• احرص على شرب السوائل المحلاة (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• تناول وجبة خفيفة تحتوي على الكربوهيدرات' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ٤ ساعات أو أبكر إذا كان لديك أعراض انخفاض سكر الدم' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                 }
                     finalRecommendation = recommendation;
                if (flag != 'true'){
                handleScheduleNotification('السُّكر','حان وقت إعادة فحص مستوى سكر الدم والكيتونات', 240);//240
                }
                if (insType != 'Aspart' || insType != 'Lispro' || insType != 'Glulisine'){
                    if (Meal != 'No'){
                    finalRecommendation = ifMealTime + '\n' + recommendation + '\n' + rapid;
                }
                else {
                   finalRecommendation = recommendation + '\n' + rapid;
                }
            }
                break;
            case level == 'Moderate':
                console.log('N2');
                if (Meal != 'No'){
                    recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ١٠٪ من مجموع الجرعة اليومية' + '\n' + '• احرص على شرب السوائل المحلاة (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ٤ ساعات' + '\n' + '• تحتاج إلى متابعة قريبة لارتفاع احتمال حدوث الحموضة الكيتونية' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                     } else {
                         recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ١٠٪ من مجموع الجرعة اليومية'  + '\n' + '• احرص على شرب السوائل المحلاة (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• تناول وجبة خفيفة تحتوي على الكربوهيدرات' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ٤ ساعات' + '\n' + '• تحتاج إلى متابعة قريبة لارتفاع احتمال حدوث الحموضة الكيتونية' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                     }
                     finalRecommendation = recommendation;
                if (flag != 'true'){
                handleScheduleNotification('السُّكر','حان وقت إعادة فحص مستوى سكر الدم والكيتونات', 240);//240
                }
                if (insType != 'Aspart' || insType != 'Lispro' || insType != 'Glulisine'){
                    if (Meal != 'No'){
                    finalRecommendation = ifMealTime + '\n' + recommendation + '\n' + rapid;
                }
                else {
                   finalRecommendation = recommendation + '\n' + rapid;
                }
            }
                break;
            case level == 'Large':
                console.log('P2');
                if (Meal != 'No'){
                    recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ١٥٪ من مجموع الجرعة اليومية' + '\n' + '• خطر الحموضة الكيتونية عالي، اذهب إلى الإسعاف' + '\n' + '• احرص على شرب السوائل المحلاة (على الأقل ١٠٠مل كل ساعة)';
                } else {
                    recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ١٥٪ من مجموع الجرعة اليومية' + '\n' + '• خطر الحموضة الكيتونية عالي، اذهب إلى الإسعاف' + '\n' + '• احرص على شرب السوائل المحلاة (على الأقل ١٠٠مل كل ساعة)';
                }
                finalRecommendation = recommendation;
                if (insType != 'Aspart' || insType != 'Lispro' || insType != 'Glulisine'){
                    if (Meal != 'No'){
                    finalRecommendation = ifMealTime + '\n' + recommendation + '\n' + rapid;
                }
                else {
                   finalRecommendation = recommendation + '\n' + rapid;
                }
            }
                break;
        }//Case 7 between 180-250
    }

    if (caseNO == '8'){
            switch (caseNO == '8'){
                case level < 0.6:
                    console.log('O');
                    if (Meal != 'No'){
                        recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ٥٪ من مجموع الجرعة اليومية' + '\n' + '• احرص على شرب السوائل (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ٤ ساعات' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                         } else {
                             recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ٥٪ من مجموع الجرعة اليومية' + '\n' + '• احرص على شرب السوائل (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ٤ ساعات' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                         }
                         finalRecommendation = recommendation;
                    if (flag != 'true'){
                    handleScheduleNotification('السُّكر','حان وقت إعادة فحص مستوى سكر الدم والكيتونات', 240);//240
                    }
                    if (insType != 'Aspart' || insType != 'Lispro' || insType != 'Glulisine'){
                        if (Meal != 'No'){
                        finalRecommendation = ifMealTime + '\n' + recommendation + '\n' + rapid;
                    }
                    else {
                       finalRecommendation = recommendation + '\n' + rapid;
                    }
                }
                    break;
                case level >= 0.6 && level <= 0.9:
                    console.log('Q');
                    if (Meal != 'No'){
                        recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ٥٪ من مجموع الجرعة اليومية' + '\n' + '• احرص على شرب السوائل (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ٤ ساعات' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                         } else {
                             recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ٥٪ من مجموع الجرعة اليومية' + '\n' + '• احرص على شرب السوائل (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ٤ ساعات' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                         }
                         finalRecommendation = recommendation;
                    if (flag != 'true'){
                    handleScheduleNotification('السُّكر','حان وقت إعادة فحص مستوى سكر الدم والكيتونات', 240);//240
                    }
                    if (insType != 'Aspart' || insType != 'Lispro' || insType != 'Glulisine'){
                        if (Meal != 'No'){
                        finalRecommendation = ifMealTime + '\n' + recommendation + '\n' + rapid;
                    }
                    else {
                       finalRecommendation = recommendation + '\n' + rapid;
                    }
                }
                    break;
                case level >= 1 && level <= 1.4:
                    console.log('R');
                    if (Meal != 'No'){
                        recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ١٠٪ من مجموع الجرعة اليومية' + '\n' + '• احرص على شرب السوائل الغير المحلاة (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ساعتين' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                         } else {
                             recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ١٠٪ من مجموع الجرعة اليومية'  + '\n' + '• احرص على شرب السوائل الغير المحلاة (على الأقل ١٠٠مل كل ساعة)' + '\n' +  '• أعد فحص مستوى سكر الدم والكيتونات بعد ساعتين' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                         }
                         finalRecommendation = recommendation;
                    if (flag != 'true'){
                    handleScheduleNotification('السُّكر','حان وقت إعادة فحص مستوى سكر الدم والكيتونات', 120);//120
                    }
                    if (insType != 'Aspart' || insType != 'Lispro' || insType != 'Glulisine'){
                        if (Meal != 'No'){
                        finalRecommendation = ifMealTime + '\n' + recommendation + '\n' + rapid;
                    }
                    else {
                       finalRecommendation = recommendation + '\n' + rapid;
                    }
                }
                    break;
                case level >= 1.5 && level <= 2.9:
                    console.log('S');
                    if (Meal != 'No'){
                        recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ١٥٪ من مجموع الجرعة اليومية' + '\n' + '• احرص على شرب السوائل الغير محلاة (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ساعتين' + '\n' + '• تحتاج إلى متابعة قريبة لارتفاع احتمال حدوث الحموضة الكيتونية' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                         } else {
                            recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ١٥٪ من مجموع الجرعة اليومية' + '\n' + '• احرص على شرب السوائل الغير محلاة (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ساعتين' + '\n' + '• تحتاج إلى متابعة قريبة لارتفاع احتمال حدوث الحموضة الكيتونية' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                        }
                         finalRecommendation = recommendation;
                    if (flag != 'true'){
                    handleScheduleNotification('السُّكر','حان وقت إعادة فحص مستوى سكر الدم والكيتونات', 120);//120
                    }
                    if (insType != 'Aspart' || insType != 'Lispro' || insType != 'Glulisine'){
                        if (Meal != 'No'){
                        finalRecommendation = ifMealTime + '\n' + recommendation + '\n' + rapid;
                    }
                    else {
                       finalRecommendation = recommendation + '\n' + rapid;
                    }
                }
                    break;
                case level >= 3:
                    console.log('T');
                    if (Meal != 'No'){
                        recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ٢٠٪ من مجموع الجرعة اليومية' + '\n' + '• خطر الحموضة الكيتونية عالي، اذهب إلى الإسعاف' + '\n' + '• احرص على شرب السوائل الغير المحلاة (على الأقل ١٠٠مل كل ساعة)';
                    } else {
                        recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ٢٠٪ من مجموع الجرعة اليومية' + '\n' + '• خطر الحموضة الكيتونية عالي، اذهب إلى الإسعاف' + '\n' + '• احرص على شرب السوائل الغير المحلاة (على الأقل ١٠٠مل كل ساعة)';
                    }
                    finalRecommendation = recommendation;
                    if (insType != 'Aspart' || insType != 'Lispro' || insType != 'Glulisine'){
                        if (Meal != 'No'){
                        finalRecommendation = ifMealTime + '\n' + recommendation + '\n' + rapid;
                    }
                    else {
                       finalRecommendation = recommendation + '\n' + rapid;
                    }
                }
                    break;
            }//Case 8 between 250-400
    }
    if (caseNO == '9'){
            switch (caseNO == '9'){
                case level == 'Negative':
                    console.log('O2');
                    if (Meal != 'No'){
                        recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ٥٪ من مجموع الجرعة اليومية' + '\n' + '• احرص على شرب السوائل (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ٤ ساعات' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                         } else {
                             recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ٥٪ من مجموع الجرعة اليومية' + '\n' + '• احرص على شرب السوائل (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ٤ ساعات' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                         }
                         finalRecommendation = recommendation;
                    if (flag != 'true'){
                    handleScheduleNotification('السُّكر','حان وقت إعادة فحص مستوى سكر الدم والكيتونات', 240);//240
                    }
                     if (insType != 'Aspart' || insType != 'Lispro' || insType != 'Glulisine'){
                            if (Meal != 'No'){
                            finalRecommendation = ifMealTime + '\n' + recommendation + '\n' + rapid;
                        }
                        else {
                           finalRecommendation = recommendation + '\n' + rapid;
                        }
                    }
                    break;
                case level == 'Trace':
                    console.log('Q2');
                    if (Meal != 'No'){
                        recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ٥٪ من مجموع الجرعة اليومية' + '\n' + '• احرص على شرب السوائل (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ٤ ساعات' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                         } else {
                             recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ٥٪ من مجموع الجرعة اليومية' + '\n' + '• احرص على شرب السوائل (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ٤ ساعات' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                         }
                         finalRecommendation = recommendation;
                    if (flag != 'true'){
                    handleScheduleNotification('السُّكر','حان وقت إعادة فحص مستوى سكر الدم والكيتونات', 240);//240
                    }
                    if (insType != 'Aspart' || insType != 'Lispro' || insType != 'Glulisine'){
                        if (Meal != 'No'){
                        finalRecommendation = ifMealTime + '\n' + recommendation + '\n' + rapid;
                    }
                    else {
                       finalRecommendation = recommendation + '\n' + rapid;
                    }
                }
                    break;
                case level == 'Small':
                    console.log('R2');
                    if (Meal != 'No'){
                        recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ١٠٪ من مجموع الجرعة اليومية' + '\n' + '• احرص على شرب السوائل الغير المحلاة (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ساعتين' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                         } else {
                             recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ١٠٪ من مجموع الجرعة اليومية'  + '\n' + '• احرص على شرب السوائل الغير المحلاة (على الأقل ١٠٠مل كل ساعة)' + '\n' +  '• أعد فحص مستوى سكر الدم والكيتونات بعد ساعتين' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                         }
                         finalRecommendation = recommendation;
                    if (flag != 'true'){
                    handleScheduleNotification('السُّكر','حان وقت إعادة فحص مستوى سكر الدم والكيتونات', 120);//120
                    }
                    if (insType != 'Aspart' || insType != 'Lispro' || insType != 'Glulisine'){
                        if (Meal != 'No'){
                        finalRecommendation = ifMealTime + '\n' + recommendation + '\n' + rapid;
                    }
                    else {
                       finalRecommendation = recommendation + '\n' + rapid;
                    }
                }
                    break;
                case level == 'Moderate':
                    console.log('S2');
                    if (Meal != 'No'){
                        recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ١٥٪ من مجموع الجرعة اليومية' + '\n' + '• احرص على شرب السوائل الغير محلاة (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ساعتين' + '\n' + '• تحتاج إلى متابعة قريبة لارتفاع احتمال حدوث الحموضة الكيتونية' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                         } else {
                            recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ١٥٪ من مجموع الجرعة اليومية' + '\n' + '• احرص على شرب السوائل الغير محلاة (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ساعتين' + '\n' + '• تحتاج إلى متابعة قريبة لارتفاع احتمال حدوث الحموضة الكيتونية' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                        }
                         finalRecommendation = recommendation;
                    if (flag != 'true'){
                    handleScheduleNotification('السُّكر','حان وقت إعادة فحص مستوى سكر الدم والكيتونات', 120);//120
                    }
                    if (insType != 'Aspart' || insType != 'Lispro' || insType != 'Glulisine'){
                        if (Meal != 'No'){
                        finalRecommendation = ifMealTime + '\n' + recommendation + '\n' + rapid;
                    }
                    else {
                       finalRecommendation = recommendation + '\n' + rapid;
                    }
                }
                    break;
                case level == 'Large':
                    console.log('T2');
                    if (Meal != 'No'){
                        recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ٢٠٪ من مجموع الجرعة اليومية' + '\n' + '• خطر الحموضة الكيتونية عالي، اذهب إلى الإسعاف' + '\n' + '• احرص على شرب السوائل الغير المحلاة (على الأقل ١٠٠مل كل ساعة)';
                    } else {
                        recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ٢٠٪ من مجموع الجرعة اليومية' + '\n' + '• خطر الحموضة الكيتونية عالي، اذهب إلى الإسعاف' + '\n' + '• احرص على شرب السوائل الغير المحلاة (على الأقل ١٠٠مل كل ساعة)';
                    }
                    finalRecommendation = recommendation;
                    if (insType != 'Aspart' || insType != 'Lispro' || insType != 'Glulisine'){
                        if (Meal != 'No'){
                        finalRecommendation = ifMealTime + '\n' + recommendation + '\n' + rapid;
                    }
                    else {
                       finalRecommendation = recommendation + '\n' + rapid;
                    }
                }
                    break;
            }//Case 9 between 250-400
    }

    if (caseNO == '10'){
                switch (caseNO == '10'){
                    case level < 0.6:
                        console.log('U');
                        if (Meal != 'No'){
                            recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ١٠٪ من مجموع الجرعة اليومية' + '\n' + '• احرص على شرب الغير محلاة السوائل (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ٤ ساعات' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                             } else {
                                 recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ١٠٪ من مجموع الجرعة اليومية' + '\n' + '• احرص على شرب الغير محلاة السوائل (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ٤ ساعات' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                             }
                             finalRecommendation = recommendation;
                        if (flag != 'true'){
                        handleScheduleNotification('السُّكر','حان وقت إعادة فحص مستوى سكر الدم والكيتونات', 240);//240
                        }
                        if (insType != 'Aspart' || insType != 'Lispro' || insType != 'Glulisine'){
                            if (Meal != 'No'){
                            finalRecommendation = ifMealTime + '\n' + recommendation + '\n' + rapid;
                        }
                        else {
                           finalRecommendation = recommendation + '\n' + rapid;
                        }
                    }
                        break;
                    case level >= 0.6 && level <= 0.9:
                        console.log('V');
                        if (Meal != 'No'){
                            recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ١٠٪ من مجموع الجرعة اليومية' + '\n' + '• احرص على شرب الغير محلاة السوائل (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ٣ ساعات' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                             } else {
                                 recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ١٠٪ من مجموع الجرعة اليومية' + '\n' + '• احرص على شرب الغير محلاة السوائل (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ٣ ساعات' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                             }
                             finalRecommendation = recommendation;
                        if (flag != 'true'){
                        handleScheduleNotification('السُّكر','حان وقت إعادة فحص مستوى سكر الدم والكيتونات', 180);//180
                        }
                        if (insType != 'Aspart' || insType != 'Lispro' || insType != 'Glulisine'){
                            if (Meal != 'No'){
                            finalRecommendation = ifMealTime + '\n' + recommendation + '\n' + rapid;
                        }
                        else {
                           finalRecommendation = recommendation + '\n' + rapid;
                        }
                    }
                        break;
                    case level >= 1 && level <= 1.4:
                        console.log('W');
                        if (Meal != 'No'){
                            recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ١٥٪ من مجموع الجرعة اليومية' + '\n' + '• احرص على شرب الغير محلاة السوائل (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ساعتين' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                             } else {
                                 recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ١٥٪ من مجموع الجرعة اليومية' + '\n' + '• احرص على شرب الغير محلاة السوائل (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ساعتين' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                             }
                             finalRecommendation = recommendation;
                        if (flag != 'true'){
                        handleScheduleNotification('السُّكر','حان وقت إعادة فحص مستوى سكر الدم والكيتونات', 120);//120
                        }
                        if (insType != 'Aspart' || insType != 'Lispro' || insType != 'Glulisine'){
                            if (Meal != 'No'){
                            finalRecommendation = ifMealTime + '\n' + recommendation + '\n' + rapid;
                        }
                        else {
                           finalRecommendation = recommendation + '\n' + rapid;
                        }
                    }
                        break;
                    case level >= 1.5 && level <= 2.9:
                        console.log('X');
                        if (Meal != 'No'){
                            recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ٢٠٪ من مجموع الجرعة اليومية' + '\n' + '• احرص على شرب السوائل الغير محلاة (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ساعتين' + '\n' + '• تحتاج إلى متابعة قريبة لارتفاع احتمال حدوث الحموضة الكيتونية' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                             } else {
                                recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ٢٠٪ من مجموع الجرعة اليومية' + '\n' + '• احرص على شرب السوائل الغير محلاة (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ساعتين' + '\n' + '• تحتاج إلى متابعة قريبة لارتفاع احتمال حدوث الحموضة الكيتونية' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                            }
                             finalRecommendation = recommendation;
                        if (flag != 'true'){
                        handleScheduleNotification('السُّكر','حان وقت إعادة فحص مستوى سكر الدم والكيتونات', 120);//120
                        }
                        if (insType != 'Aspart' || insType != 'Lispro' || insType != 'Glulisine'){
                            if (Meal != 'No'){
                            finalRecommendation = ifMealTime + '\n' + recommendation + '\n' + rapid;
                        }
                        else {
                           finalRecommendation = recommendation + '\n' + rapid;
                        }
                    }
                        break;
                    case level >= 3:
                        console.log('Y');
                        if (Meal != 'No'){
                            recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ٢٠٪ من مجموع الجرعة اليومية' + '\n' + '• خطر الحموضة الكيتونية عالي، اذهب إلى الإسعاف' + '\n' + '• احرص على شرب السوائل الغير المحلاة (على الأقل ١٠٠مل كل ساعة)';
                        } else {
                            recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ٢٠٪ من مجموع الجرعة اليومية' + '\n' + '• خطر الحموضة الكيتونية عالي، اذهب إلى الإسعاف' + '\n' + '• احرص على شرب السوائل الغير المحلاة (على الأقل ١٠٠مل كل ساعة)';
                        }
                        finalRecommendation = recommendation;
                        if (insType != 'Aspart' || insType != 'Lispro' || insType != 'Glulisine'){
                            if (Meal != 'No'){
                            finalRecommendation = ifMealTime + '\n' + recommendation + '\n' + rapid;
                        }
                        else {
                           finalRecommendation = recommendation + '\n' + rapid;
                        }
                    }
                        break;
                }//Case 10 between 400
    }
    if (caseNO == '11'){
                switch (caseNO == '11'){
                    case level == 'Negative':
                        console.log('U2');
                        if (Meal != 'No'){
                            recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ١٠٪ من مجموع الجرعة اليومية' + '\n' + '• احرص على شرب الغير محلاة السوائل (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ٤ ساعات' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                             } else {
                                 recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ١٠٪ من مجموع الجرعة اليومية' + '\n' + '• احرص على شرب الغير محلاة السوائل (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ٤ ساعات' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                             }
                             finalRecommendation = recommendation;
                        if (flag != 'true'){
                        handleScheduleNotification('السُّكر','حان وقت إعادة فحص مستوى سكر الدم والكيتونات', 240);//240
                        }
                        if (insType != 'Aspart' || insType != 'Lispro' || insType != 'Glulisine'){
                            if (Meal != 'No'){
                            finalRecommendation = ifMealTime + '\n' + recommendation + '\n' + rapid;
                        }
                        else {
                           finalRecommendation = recommendation + '\n' + rapid;
                        }
                    }
                        break;
                    case level == 'Trace':
                        console.log('V2');
                        if (Meal != 'No'){
                            recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ١٠٪ من مجموع الجرعة اليومية' + '\n' + '• احرص على شرب الغير محلاة السوائل (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ٣ ساعات' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                             } else {
                                 recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ١٠٪ من مجموع الجرعة اليومية' + '\n' + '• احرص على شرب الغير محلاة السوائل (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ٣ ساعات' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                             }
                             finalRecommendation = recommendation;
                        if (flag != 'true'){
                        handleScheduleNotification('السُّكر','حان وقت إعادة فحص مستوى سكر الدم والكيتونات', 180);//180
                        }
                        if (insType != 'Aspart' || insType != 'Lispro' || insType != 'Glulisine'){
                            if (Meal != 'No'){
                            finalRecommendation = ifMealTime + '\n' + recommendation + '\n' + rapid;
                        }
                        else {
                           finalRecommendation = recommendation + '\n' + rapid;
                        }
                    }
                        break;
                    case level == 'Small':
                        console.log('W2');
                        if (Meal != 'No'){
                            recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ١٥٪ من مجموع الجرعة اليومية' + '\n' + '• احرص على شرب الغير محلاة السوائل (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ساعتين' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                             } else {
                                 recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ١٥٪ من مجموع الجرعة اليومية' + '\n' + '• احرص على شرب الغير محلاة السوائل (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ساعتين' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                             }
                             finalRecommendation = recommendation;
                        if (flag != 'true'){
                        handleScheduleNotification('السُّكر','حان وقت إعادة فحص مستوى سكر الدم والكيتونات', 120);//120
                        }
                        if (insType != 'Aspart' || insType != 'Lispro' || insType != 'Glulisine'){
                            if (Meal != 'No'){
                            finalRecommendation = ifMealTime + '\n' + recommendation + '\n' + rapid;
                        }
                        else {
                           finalRecommendation = recommendation + '\n' + rapid;
                        }
                    }
                        break;
                    case level == 'Moderate':
                        console.log('X2');
                        if (Meal != 'No'){
                            recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ٢٠٪ من مجموع الجرعة اليومية' + '\n' + '• احرص على شرب السوائل الغير محلاة (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ساعتين' + '\n' + '• تحتاج إلى متابعة قريبة لارتفاع احتمال حدوث الحموضة الكيتونية' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                             } else {
                                recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ٢٠٪ من مجموع الجرعة اليومية' + '\n' + '• احرص على شرب السوائل الغير محلاة (على الأقل ١٠٠مل كل ساعة)' + '\n' + '• أعد فحص مستوى سكر الدم والكيتونات بعد ساعتين' + '\n' + '• تحتاج إلى متابعة قريبة لارتفاع احتمال حدوث الحموضة الكيتونية' + '\n' + '• إذا كان لديك استفراغ (ترجيع) مستمر اذهب إلى الإسعاف';
                            }
                             finalRecommendation = recommendation;
                        if (flag != 'true'){
                        handleScheduleNotification('السُّكر','حان وقت إعادة فحص مستوى سكر الدم والكيتونات', 120);//120
                        }
                        if (insType != 'Aspart' || insType != 'Lispro' || insType != 'Glulisine'){
                            if (Meal != 'No'){
                            finalRecommendation = ifMealTime + '\n' + recommendation + '\n' + rapid;
                        }
                        else {
                           finalRecommendation = recommendation + '\n' + rapid;
                        }
                    }
                        break;
                    case level == 'Large':
                        console.log('Y2');
                        if (Meal != 'No'){
                            recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ٢٠٪ من مجموع الجرعة اليومية' + '\n' + '• خطر الحموضة الكيتونية عالي، اذهب إلى الإسعاف' + '\n' + '• احرص على شرب السوائل الغير المحلاة (على الأقل ١٠٠مل كل ساعة)';
                        } else {
                            recommendation = '• خذ جرعة انسولين إضافية الجرعة الإضافية = ٢٠٪ من مجموع الجرعة اليومية' + '\n' + '• خطر الحموضة الكيتونية عالي، اذهب إلى الإسعاف' + '\n' + '• احرص على شرب السوائل الغير المحلاة (على الأقل ١٠٠مل كل ساعة)';
                        }
                        finalRecommendation = recommendation;
                        if (insType != 'Aspart' || insType != 'Lispro' || insType != 'Glulisine'){
                            if (Meal != 'No'){
                            finalRecommendation = ifMealTime + '\n' + recommendation + '\n' + rapid;
                        }
                        else {
                           finalRecommendation = recommendation + '\n' + rapid;
                        }
                    }
                        break;
                }//Case 11 between 400
    }

    // return finalRecommendation;

     insert();
     return finalRecommendation;
 };
  const insert = async () => {
     console.log('in tableukg ' + uID + ' - ' + curDate + ' - ' + cTime);
     try {
      // eslint-disable-next-line no-undef
      db.transaction( (tx) => {
          tx.executeSql(
           'INSERT INTO SDRecheckNotification (UserID, recheckDate, recheckTime) VALUES (?,?,?)',
             [uID, curDate, cTime]
         );
         console.log('in tab ' + uID + ' - ' + curDate + ' - ' + cTime);
     });
   } catch (error) {
     console.log(error);
   }
   };
 export default tableText;
