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
import Header from './header';
import Footer2 from './footer2';
import LearnWithPhoto from './LearnWithPhoto';
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
      <View style={{ backgroundColor: '#f8f7f7', flex: 1, flexDirection: 'column' }}>
      <Header headerText={'8/10'} />
      <LearnWithPhoto wordId={'5'} />
      <Footer2 icon='2' />
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
