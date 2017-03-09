import React, { Component } from 'react';
// import firebase from 'firebase';
import {
  StyleSheet,
  Text,
  View,
  // Image,
  // Alert,
  // StatusBar,
  // Keyboard,
  // ScrollView,
  // TouchableWithoutFeedback
} from 'react-native';
// import renderIf from 'render-if';
// import Icon from 'react-native-vector-icons/FontAwesome';
import {
  // Button,
  // CardSection,
  // ShapedTextInput,
  // Spinner,
  // PickerView,
  // PickerButton,
  // HscrollView
} from './common/';
// import generalUtils from '../utils/generalUtils';
// const _ = require('lodash');

class template extends Component {
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
        <Text>
          {'test'}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  }
});

module.exports = template;
