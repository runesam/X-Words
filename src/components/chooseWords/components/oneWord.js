import React, { Component } from 'react';
// import firebase from 'firebase';
import {
  StyleSheet,
  View,
  Text,
  Dimensions
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
} from '../../common/';
// import generalUtils from '../utils/generalUtils';
// const _ = require('lodash');

class OneWord extends Component {
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
        <Text>{this.props.data[0]}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    width: Dimensions.get('window').width - 60,
    marginLeft: 20,
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 40
  }
});

module.exports = OneWord;
