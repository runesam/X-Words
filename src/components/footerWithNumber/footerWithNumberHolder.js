import React, { Component } from 'react';
// import firebase from 'firebase';
import {
  StyleSheet,
  View,
  // Image,
  // Alert,
  // StatusBar,
  // Keyboard,
  // ScrollView,
  // TouchableWithoutFeedback
} from 'react-native';
import FooterWithNumber from './components/footerWithNumber';
// import renderIf from 'render-if';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import generalUtils from '../utils/generalUtils';
// const _ = require('lodash');

class FooterWithNumberHolder extends Component {
  state= {

  }
  componentWillMount() {

  }
  onPressMe() {

  }
  ComponentDidUpdate() {

  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={{ flex: 10.5 }} />
          <View style={{ flex: 1.5 }} >
              <FooterWithNumber number='5' current='1' />
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  }
});

module.exports = FooterWithNumberHolder;
