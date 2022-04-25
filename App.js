import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Signup from './src/Screens/Signup';

const App = () => {

  return (
    <SafeAreaView style={styles.body}>
        <Signup/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#696969',
  },
  
});

export default App;
