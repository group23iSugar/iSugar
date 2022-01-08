import React, {useEffect, useState} from 'react';
import { StyleSheet, 
    View,
    Image, 
    Text,
    ScrollView,
    TouchableOpacity, 
    Dimensions } from 'react-native'; 
    import LinearGradient from 'react-native-linear-gradient';
    
import {Picker} from '@react-native-picker/picker';
import { FlatList } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ActivityIndicator, Colors } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';




const carb = ({ navigation }) => {

  useEffect(() => {
    ret(unitSearch);
    }, []);


const [cho, setCHO] = useState([]);  // from 0-10
const [wholeQuan, setWholeQuan] = useState(0); // from 0-10
const [fractionQuan, setFractionQuan] = useState(0);
const [foodName, setFoodName] = useState(''); // based on user choice 
const [unit, setUnit] = useState(''); // based on database?
const [gram, setGram] = useState(0);  // based on database?
const [dummyList, setList] = useState([
  {pokemon: 1, selectedQ: -1, selectedW: 0},{pokemon: 1, selectedQ: -1, selectedW: 0},{pokemon: 1, selectedQ: -1, selectedW: 0},{pokemon: 1, selectedQ: -1, selectedW: 0},
  {pokemon: 1, selectedQ: -1, selectedW: 0},{pokemon: 1, selectedQ: -1, selectedW: 0},{pokemon: 1, selectedQ: -1, selectedW: 0},{pokemon: 1, selectedQ: -1, selectedW: 0},
  {pokemon: 1, selectedQ: -1, selectedW: 0},{pokemon: 1, selectedQ: -1, selectedW: 0},{pokemon: 1, selectedQ: -1, selectedW: 0},{pokemon: 1, selectedQ: -1, selectedW: 0},
  {pokemon: 1, selectedQ: -1, selectedW: 0},{pokemon: 1, selectedQ: -1, selectedW: 0},{pokemon: 1, selectedQ: -1, selectedW: 0},{pokemon: 1, selectedQ: -1, selectedW: 0},
  {pokemon: 1, selectedQ: -1, selectedW: 0},{pokemon: 1, selectedQ: -1, selectedW: 0},{pokemon: 1, selectedQ: -1, selectedW: 0},{pokemon: 1, selectedQ: -1, selectedW: 0},
  {pokemon: 1, selectedQ: -1, selectedW: 0},{pokemon: 1, selectedQ: -1, selectedW: 0},{pokemon: 1, selectedQ: -1, selectedW: 0},{pokemon: 1, selectedQ: -1, selectedW: 0}

]);
const [counter, setCounter] = useState(0);
const [totalCHO, setTtoal] = useState(0);
const [index, setIndex]  = useState(-1);

const ret = (callback) => {
  var tempArr = [...cho];
  try {
    console.log('in try');
      db.transaction(  ( tx) => {
        tx.executeSql(
          'SELECT foodID, foodEnglishName, foodArabicName, unit, unitArabic, gramsOfCHO FROM CHO',
          [],
          (tx, results) => {
            var rows = results.rows;
            for (let i = 0; i < rows.length; i++){
                    tempArr.push({
                        id: rows.item(i).foodID,
                        foodEnglishName: rows.item(i).foodEnglishName,
                        foodArabicName: rows.item(i).foodArabicName,
                        unit: rows.item(i).unit,
                        unitArabic: rows.item(i).unitArabic,
                        gramsOfCHO: rows.item(i).gramsOfCHO,
                    });
                    console.log(tempArr[i].id+' / '+tempArr[i].foodEnglishName+' / '+tempArr[i].foodArabicName+' / '+tempArr[i].unit +' / '+tempArr[i].gramsOfCHO);
                    
              }
              setCHO([...tempArr]);
              callback(tempArr);
          }   
) 

    

}  ) 
} catch (error) {
   console.log(error);
}
}

const quantity = (whole, fraction) => { 
  return parseInt(whole) + parseFloat(fraction);
}
//

const CHOcontent = () => {
  console.log('hhrreee'+ index);
   var g = 0;
   g = search();
  var dish = 0;
  if (dummyList[index].selectedQ !='-1'){
    dish = g * quantity(dummyList[index].selectedQ, dummyList[index].selectedW);
    setTtoal(totalCHO+dish);
  } else {
    alert('Please Select a value');
    return;
  }
    //chpTotal = total+q

}
const unitSearch = (arr) => {
  console.log('In UNITTTT');
  for(let i =0; i< arr.length; i++){
    console.log(arr[i].id);
    if (arr[i].id == dummyList[i].pokemon ){
      console.log('FOUND YA');
        setUnit(arr[i].unit);
        return;
    }
}

}
const search = () => {
    for(let i =0; i< cho.length; i++){
      console.log(cho[i].gramsOfCHO);
        if (cho[i].id == dummyList[index].pokemon ){
            setFoodName(cho[i].foodEnglishName);
            setUnit(cho[i].unit);
            var g =cho[i].gramsOfCHO
            setGram(g);
            return g;
        }
    }
     
}
console.log('i index: '+index);
const increment = () => {
  if (counter >= 20){
    alert('You have reach your limit');
    return;
  } else {
    setCounter(counter+1);
  }
}
const setPokemon = (val, index) => {
  setIndex(index);
var temp = [...dummyList];
temp[index].pokemon = val;
setList([...temp]);
}
const setQ = (val, index) => {
var temp = [...dummyList];
temp[index].selectedQ = val;
setList([...temp]);
}
const setW = (val, index) => {
  var temp = [...dummyList];
  temp[index].selectedW = val;
  setList([...temp]);
}

const renderProductList = () => {
  return cho.map((ch) => {
    return <Picker.Item key= {ch.id+''} label={ch.foodEnglishName+' - '+ch.unit+'         '} value={ch.id+''}    />
  })
} 

  return (

    <View style={styles.container}>
     <View style={{top: 10, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', padding: 30}}>
        <Image source={require('../images/logo.png')} style={styles.pic} />
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
            textAlign: 'left',
            paddingTop: 20,
            paddingLeft: 15,
          }}>
          Carbohydrate Calculator
        </Text>
        <View style={styles.body}>
          {cho.length > 0 ? (<FlatList 
          data={dummyList.slice(0, counter+1)}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index}) => (
            <View>
            <View style={styles.innerCotainer}>
              <Text style={{fontSize: 17, color: 'grey'}}>Food Item: </Text>
            <Picker
            itemStyle={{color: 'black'}}
        selectedValue={item.pokemon}
        onValueChange={(val) => {setPokemon(val, index)}}
        style={{ 
          width: 360,
          height: 40,
        fontSize: 17,
      color: '#05375a'}}
        mode={'dropdown'}>
           <Picker.Item label='Select ...' value='Unknown'    />
           {renderProductList()}
      </Picker>
      </View>
      <View style={styles.innerCotainer}>
        <Text style={{fontSize: 15, color: 'grey'}}>Quantity:</Text>
          <View style={styles.innerView}>
          <Picker
           itemStyle={{color: 'black'}}
        selectedValue={item.selectedQ}
        onValueChange={(val) => setQ(val, index)}
        style={{ width: 90,
          height: 40,
          paddingLeft:5,
          borderWidth: 2,
          borderColor: '#4c4c4c',
        fontSize: 17,
      color: '#05375a'}}
        mode={'dropdown'}>
          <Picker.Item label= 'Select' value='-1'   ></Picker.Item>
           <Picker.Item label= '0  ' value='0'   ></Picker.Item>
            <Picker.Item label= '1  ' value='1'   ></Picker.Item>
            <Picker.Item label= '2  ' value='2'   ></Picker.Item>
            <Picker.Item label= '3  ' value='3'   ></Picker.Item>
            <Picker.Item label= '4  ' value='4'   ></Picker.Item>
            <Picker.Item label= '5  ' value='5'   ></Picker.Item>
            <Picker.Item label= '6  ' value='6'   ></Picker.Item>
            <Picker.Item label= '7  ' value='7'   ></Picker.Item>
            <Picker.Item label= '8  ' value='8'   ></Picker.Item>
            <Picker.Item label= '9  ' value='9'   ></Picker.Item>
            <Picker.Item label= '10  ' value='10'   ></Picker.Item>

      </Picker>
      <Text style={{fontSize: 15, color: 'grey', paddingTop: 20}}>And</Text>
      <Picker
       itemStyle={{color: 'black'}}
        selectedValue={item.selectedW}
        onValueChange={(val) => setW(val, index)}
        style={{ width: 115,
          height: 40,
          borderWidth: 2,
          borderColor: '#4c4c4c',
        fontSize: 17,
        paddingRight: 5,
      color: '#05375a'}}
        mode={'dropdown'}>
           <Picker.Item label= '0  ' value='0'   ></Picker.Item>
            <Picker.Item label= '1/4  ' value='0.25'   ></Picker.Item>
            <Picker.Item label= '1/3  ' value='0.333'   ></Picker.Item>
            <Picker.Item label= '1/2  ' value='0.5'   ></Picker.Item>
            <Picker.Item label= '2/3  ' value='0.666'   ></Picker.Item>
            <Picker.Item label= '3/4  ' value='0.75'   ></Picker.Item>

      </Picker>
     
          </View>
      </View>
      <TouchableOpacity onPress={()=>CHOcontent()}
      style={{alignItems: 'flex-start'}}
      >
      <MaterialIcons
      name="calculate"
      color='#8CA1BB'
      size={45}
      />
    </TouchableOpacity>
      </View>
          )}
          />) 
          : <ActivityIndicator animating={true} color={Colors.blue100} size={'large'} /> }
          <TouchableOpacity onPress={() => increment()}>
            <Text style={{color:' black'}}>Add Another Dish</Text>
            </TouchableOpacity>
  <View style={styles.innerView} >
   
 <View style={styles.innerCotainer2}>
                    <Text style={{fontSize: 15, color: 'grey'}}>Carbohydrate amount:</Text>
                    <Text style={styles.textHeader} >{totalCHO}</Text>
                  
            </View>
            
            </View>
            <View style={styles.buttonV}>
        <TouchableOpacity onPress={()=>navigation.navigate('calc', totalCHO)}>
                <LinearGradient
                    colors={['#E7EFFA', '#AABED8', '#AABED8']} style={styles.buttonR}
                >
                    <Text style={styles.textBody}>Done</Text>
                  
                </LinearGradient>
            </TouchableOpacity>
            </View>
           <Text>
           </Text>
       </View>
        </ScrollView>
    </View>      

    
  );
};


const {height} = Dimensions.get("screen");
const height_logo = height * 0.15;

export default carb;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
   fontSize: 15,
   color: '#05375a', 
},
textBody:{
    fontSize: 20,
    color: '#05375a', 
    textAlign: 'center',
    fontWeight: 'bold',
 }, 
 innerCotainer: {
  backgroundColor: 'white', margin: 10, alignItems: 'center',  borderRadius: 15, padding: 10, width: 330,
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
  backgroundColor: 'white', margin: 10, alignItems: 'center',  borderRadius: 15, padding: 10, width: 200,
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
  alignItems: 'center',
  width: 150,
  height: 55,
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
},
textBody:{
  fontSize: 20,
  color: '#05375a', 
  textAlign: 'center',
  fontWeight: 'bold',
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
