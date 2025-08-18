import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

{/* CSS em arquivo arquivo*/}
import styles_out from './src/css/style.css'

const App = () => {
  return (
        <View style={styles.container}>
          <Text style={styles_out.text}>Hello World!</Text>
        </View>
  );
};

{/* CSS no mesmo arquivo*/}
const styles = StyleSheet.create(
  {
    container:{
      backgroundColor: 'yellow', 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center'
    }
  }
)


export default App;
