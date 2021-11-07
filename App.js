import React from 'react';
import { StyleSheet, Image, Button, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//import firstTime from './pages/firstTime';
//import { StackNavigator } from 'react-navigation';

const idk = ({navigation}) => {
  return (
    <LinearGradient colors={['#AABED8','#fff']} style={styles.container}>
      <Image source={require('./images/logo.png')} style={styles.pic}/>
      <Button 
      title='Go bestie' 
      onPress={() => navigation.navigate('no') }
      />

    </LinearGradient>
    
  );
};
const another = ({navigation}) => {
  return (
    <LinearGradient colors={['#AABED8','#fff']} style={styles.container}>
      <Text style={styles.text}> Hello yall</Text>
      <Button title='back bestie' 
       onPress={() => navigation.navigate('Home') }/>

    </LinearGradient>
  );
};
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={idk} />
        <Stack.Screen name="no" component={another} />
      </Stack.Navigator>
    </NavigationContainer>
  );

};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }, 
  text: {
    color: '#000',
    fontSize: 30,
  },
  pic: {
    width: 170,
    height: 200,

  }
});

export default App;
