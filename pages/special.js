import React, {useState, useEffect} from 'react';
import { StyleSheet, 
    View,
    Image, 
    Text,
    ScrollView,
    TouchableOpacity, 
    Dimensions } from 'react-native'; 
import LinearGradient from 'react-native-linear-gradient';

const special = ({ navigation }) => {

  const [gFlag, setgFlag]=useState(true);
  const [autoFlag, setAutoFlag]=useState(false);
  const [edFlag, setEDFlag]=useState(false);
  const [surFlag, setSurFlag]=useState(false);
  const [dFlag, setDFlag]=useState(false);
  const [puFlag, setPuFlag]=useState(false);

  const globalFlag = () => {
    setgFlag(true);
    setAutoFlag(false);
    setDFlag(false);
    setEDFlag(false);
    setPuFlag(false);
    setSurFlag(false);
  }

  const AFlag = () => {
    setgFlag(false);
    setAutoFlag(true);
    setDFlag(false);
    setEDFlag(false);
    setPuFlag(false);
    setSurFlag(false);
  }
  const DFlag = () => {
    setgFlag(false);
    setAutoFlag(false);
    setDFlag(true);
    setEDFlag(false);
    setPuFlag(false);
    setSurFlag(false);
  }
  const EDFlag = () => {
    setgFlag(false);
    setAutoFlag(false);
    setDFlag(false);
    setEDFlag(true);
    setPuFlag(false);
    setSurFlag(false);
  }
  const PUFlag = () => {
    setgFlag(false);
    setAutoFlag(false);
    setDFlag(false);
    setEDFlag(false);
    setPuFlag(true);
    setSurFlag(false);
  }
  const SURFlag = () => {
    setgFlag(false);
    setAutoFlag(false);
    setDFlag(false);
    setEDFlag(false);
    setPuFlag(false);
    setSurFlag(true);
  }

  return (

    <View style={styles.container}>
     <View style={{top: 10, flexDirection: 'row', padding: 30}}>
       
        <TouchableOpacity onPress={()=>navigation.openDrawer()}>
         {/* <Entypo name="menu" color="#05375a" size={35} /> */}
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
          Special Circumstances 
        </Text>
         <ScrollView> 
         <View style={styles.body}>
        {gFlag ? (<View>
          <TouchableOpacity onPress={()=>AFlag()}>
            <LinearGradient style={styles.outer}
            colors={['#a8dadc', '#457b9d']}>
            <View style={styles.inner}>
            <Text style={styles.textBody}>Autoimmune</Text>
            </View>
            
            </LinearGradient>
            </TouchableOpacity>
     {/* //=================// */}
     <TouchableOpacity onPress={()=>EDFlag()}>
            <LinearGradient style={styles.outer}
            colors={['#a8dadc', '#457b9d']}>
            <View style={styles.inner}>
            <Text style={styles.textBody}>Eating Disorder</Text>
            </View>
            
            </LinearGradient>
            </TouchableOpacity>
           
            {/* //=================// */}
            <TouchableOpacity onPress={() => PUFlag()}>
            <LinearGradient style={styles.outer}
            colors={['#a8dadc', '#457b9d']}>
            <View style={styles.inner}>
            <Text style={styles.textBody}>Puberty</Text>
            </View>
            
            </LinearGradient>
            </TouchableOpacity>
            {/* //======= ==========// */}
            <TouchableOpacity onPress={() => DFlag()}>
            <LinearGradient style={styles.outer}
            colors={[ '#a8dadc', '#457b9d']}>
            <View style={styles.inner}>
            <Text style={styles.textBody}>Driving</Text>
            </View>
            </LinearGradient>
            </TouchableOpacity>
            {/* //=================// */}
          {/* //======= ==========// */}
         <TouchableOpacity onPress={() => SURFlag()}>
            <LinearGradient style={styles.outer}
            colors={[ '#a8dadc', '#457b9d']}>
            <View style={styles.inner}>
            <Text style={styles.textBody}>Surgery</Text>
            </View>
            </LinearGradient>
            </TouchableOpacity>
            {/* //=================// */}
        </View>)
        : null}
        {autoFlag ? (<View>
          <View style={styles.innerCotainer}>
          <Text style={styles.textHeader}>
          Individuals with Type 1 Diabetes Mellitus are at increased risk for other autoimmune disease compared to general population. Below you can find information about the 2 most common autoimmune diseases associated with diabetes.


          </Text>
          <Text style={styles.textHeader}>
          1- Thyroid disease:
Autoimmune thyroid disease is the most common autoimmune disorder associated with diabetes, occurring in 17-30% of patients with type 1 diabetes. Because of this, screening for thyroid dysfunction is part of your annual tests. Thyroid dysfunction can lead to unexplained frequent hypoglycemic episodes and deterioration of glycemic control.
Other symptoms of thyroid dysfunction are: cold/heat intolerance, constipation/diarrhea, dry skin/excessive sweating, weight gain/weight loss and irregular/heavy periods in females.

          </Text>
          <Text style={styles.textHeader}>
          2- Celiac disease:
Celiac disease occurs in 1.6-16.4% of individuals with type 1 diabetes. Screening for celiac disease is part of your annual test even if you are asymptomatic. Untreated celiac disease can increase risk of hypoglycemia in patients with type 1 diabetes.
Celiac disease symptoms include: Constipation or diarrhea, wight loss, bloating, abdominal pain, fatigue, delayed growth and delayed puberty.

          </Text>
          <View style={styles.buttonV}>
        <TouchableOpacity onPress={()=>globalFlag()}>
                <LinearGradient
                    colors={['#E7EFFA', '#AABED8', '#AABED8']} style={styles.buttonR}
                >
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Done</Text>
                  
                </LinearGradient>
            </TouchableOpacity>
          </View>
          
            </View>
        </View>)
        : null}
             { edFlag ? (<View>
          <View style={styles.innerCotainer}>
          <Text style={styles.textHeader}>
          Children with diabetes, and particularly adolescents, have an increased risk for developing eating disorders with girls being affected more than the boys. This increased risk is thought to be related to the weight changes that can occur with insulin therapy and the extra attention individuals with diabetes must pay to what they eat. 
The most common features of eating disorders in young individuals with type 1 diabetes are:

          </Text>
          <Text style={styles.textHeader}>
          •	Dissatisfaction with their body weight and shape and desire to be thinner.
•	Dieting or manipulation of insulin doses to control weight.
•	Binge eating.

          </Text>
          <Text style={styles.textHeader}>
          Eating disorders from diabetes point of view are associated with poor glycemic control and earlier onset and more rapid progression of microvascular complications.
Early identification and intervention in such disorders is important. If you notice any behavioural changes suggestive of an eating disorder, please consult your doctor.

          </Text>
          <View style={styles.buttonV}>
        <TouchableOpacity onPress={()=>globalFlag()}>
                <LinearGradient
                    colors={['#E7EFFA', '#AABED8', '#AABED8']} style={styles.buttonR}
                >
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Done</Text>
                  
                </LinearGradient>
            </TouchableOpacity>
          </View>
          
            </View>
        </View>)
        : null}
                { puFlag ? (<View>
          <View style={styles.innerCotainer}>
          <Text style={styles.textHeader}>
          Many diabetic adolescents may experience deterioration in their glycemic control. One of the factors attributing to this is the hormonal changes leading to increased insulin resistance and rapid growth. 
          </Text>
          <Text style={styles.textHeader}>
          Once you reach puberty you will notice that your insulin requirement increases. Insulin dosage adjustments are often required throughout adolescent years. Females might also notice that they require more insulin on their menses days compared to other days. So, some diabetic females find it easier to have special insulin dosing for the menses days either written in their logbook or saved in a special setting in their insulin pump. If you are interested in knowing more about how to do this, please ask your doctor.
          </Text>
          <Text style={styles.textHeader}>
          Diabetes effects fertility in both genders. Also, special care is needed for pregnant diabetic mothers and their babies. If this applies to you or you would like to know more, please consult your doctor.
          </Text>
          <View style={styles.buttonV}>
        <TouchableOpacity onPress={()=>globalFlag()}>
                <LinearGradient
                    colors={['#E7EFFA', '#AABED8', '#AABED8']} style={styles.buttonR}
                >
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Done</Text>
                  
                </LinearGradient>
            </TouchableOpacity>
          </View>
          
            </View>
        </View>)
        : null}
          { dFlag ? (<View>
          <View style={styles.innerCotainer}>
          <Text style={styles.textHeader}>
          Driving with diabetes requires special care for your own safety and for the safety of others on the road. Diabetes can impair your driving ability and increases the risk of motor vehicle accidents. The most common cause is decreased cognitive function and concentration during hypoglycemic episodes. Also, diabetes long term complications such as: retinopathy and cataract would impair the vision needed to operate the vehicle and neuropathy would affect the ability to feel the foot pedal impacting the driving safety.
          </Text>
          <Text style={styles.textHeader}>
          Having Type 1 Diabetes Mellitus is not usually a limitation from getting your driver licence with each country having its own rules and regulations. Bellow you can find general recommendations for diabetes and driving:

          </Text>
          <Text style={styles.textHeader}>
          1- Always Carry your glucometer and diabetes supplies.{'\n'}
2- Always keep an emergency supply of fast acting carbohydrate such as dextrose tablet or sugar cubes, within easy reach inside the vehicle.{'\n'}
3- Measure your blood glucose level before driving.{'\n'}
4- Don’t drive if your blood glucose level is 70mg/dl 4mmol/L. {'\n'}
5- Measure your blood glucose level at least every 4 hours if you are on a long ride.{'\n'}
6- Measure your blood glucose level at least every 2 hours if you have hypoglycemia unawareness (lack of early warning symptoms of hypoglycemia, such as tremor, sweatiness and palpitations).{'\n'}
7- If you develop symptoms of hypoglycemia or hyperglycemia, stop the vehicle in a safe location, measure your blood glucose level and treat accordingly.{'\n'}
8- It is recommended to wait for 40 minutes after you treat a hypoglycemic episode as it takes time for judgment and reflexes to the brain to recover fully from hypoglycemia.{'\n'}
          </Text>
          <View style={styles.buttonV}>
        <TouchableOpacity onPress={()=>globalFlag()}>
                <LinearGradient
                    colors={['#E7EFFA', '#AABED8', '#AABED8']} style={styles.buttonR}
                >
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Done</Text>
                  
                </LinearGradient>
            </TouchableOpacity>
          </View>
          
            </View>
        </View>)
        : null}


{ surFlag ? (<View>
          <View style={styles.innerCotainer}>
          <Text style={styles.textHeader}>
          Surgical procedures are known to cause complex neuroendocrine stress response in the human body which effects the blood glucose levels regardless if the individual has diabetes or not. However, this is extremely important in individuals with Type 1 Diabetes Mellites as their pancreas is unable to produce insulin to match the rise in blood glucose level during this time. Thus, diabetic individuals need to continue to take their insulin before, during and after the procedure even if they are fasting. 
          </Text>
          <Text style={styles.textHeader}>
          Having a good glycemic control before and after the procedure helps facilitate wound healing and decrease the risk for DKA, hypoglycemia and infections. 
If you have an upcoming surgical or medical procedure, please inform your doctor. The diabetes management recommendations during surgical/medical procedures depends on type of procedure and your insulin regimen. You might be provided with insulin adjustment instructions if it was a minor procedure or you will be asked to request the inpatient diabetes service if it was a major procedure.

          </Text>
         
          <View style={styles.buttonV}>
        <TouchableOpacity onPress={()=>globalFlag()}>
                <LinearGradient
                    colors={['#E7EFFA', '#AABED8', '#AABED8']} style={styles.buttonR}
                >
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Done</Text>
                  
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


const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

export default special;

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


