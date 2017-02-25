import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  // Text,
  View
} from 'react-native';

const App = require('./src/app');

class manager extends Component {
  render() {
    return (
      <View style={styles.container}>
          <App deviceAndroid />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

AppRegistry.registerComponent('ten_words', () => manager);
