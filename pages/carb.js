import React, {useEffect, useState} from 'react';
import { StyleSheet, 
    View,
    Image, 
    Text,
    ScrollView,
    TouchableOpacity, 
    Dimensions } from 'react-native'; 
    import timeCompare from './timeCompare';
    import carbRetrieve from './carbRetrieve';




const carb = ({ navigation }) => {


var cho = carbRetrieve();
const [wholeQuan, setWholeQuan] = useState(0); // from 0-10
const [fractionQuan, setFractionQuan] = useState(0);
const [foodName, setFoodName] = useState(''); // based on user choice 
const [unit, setUnit] = useState(''); // based on database?
const [gram, setGram] = useState(0);  // based on database?


// cho = carbRetrieve();
const quantity = (whole, fraction) => { 
return whole+fraction;
}
//
const CHOcontent = (quan, grams) => {

    return grams * quan; //chpTotal = total+q

}
const search = (id) => {
    for(let i =0; i< cho.length(); i++){
        if (cho[i].id == id ){
            setFoodName(cho[i].foodEnglishName);
            setUnit(cho[i].unit);
            setGram(cho[i].gramsOfCHO);
            CHOcontent(quantity(wholeQuan, fractionQuan), gram )
        }
    }
}
const print = ()=>{
  for (let i =0; i<cho.length;i++){
    console.log(cho[i].foodEnglishName);
  }
}



  return (

    <View style={styles.container}>
       <View style={styles.header}>
         <Text style={styles.textHeader}>Hello Sara
             <Image source={require('../images/ballons.png')}
             style={{height: 30, width: 30}}/> 
         </Text>
         </View>
         <ScrollView>
        <View style={styles.body}>
           <TouchableOpacity onPress={()=>print()}><Text>click meee</Text></TouchableOpacity>
           <Text>
           {timeCompare('3:03 pm', '6:00 pm') ? 'true' : 'false'}
           </Text>
       </View>
        </ScrollView>
    </View>      

    
  );
};


const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

export default carb;

const styles = StyleSheet.create({
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
},
textBody:{
    fontSize: 20,
    color: '#05375a', 
    textAlign: 'center',
    fontWeight: 'bold',
 } 
});


