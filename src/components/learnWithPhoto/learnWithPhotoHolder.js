import React, { Component } from 'react';
// import firebase from 'firebase';
import {
  StyleSheet,
  View,
  // Image,
  // Alert,
  StatusBar,
  // Keyboard,
  // ScrollView,
  // TouchableWithoutFeedback
} from 'react-native';
import Header from './components/header';
import LearnWithPhoto from './components/LearnWithPhoto';
// import renderIf from 'render-if';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import generalUtils from '../utils/generalUtils';
// const _ = require('lodash');

class LearnWithPhotoHolder extends Component {
  state= {

  }
  componentWillMount() {
    if (this.props.replaceColor) {
      this.props.replaceColor('#00cccc');
    }
  }
  onPressMe() {

  }
  ComponentDidUpdate() {

  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <StatusBar barStyle='light-content' />
        <Header headerText={'8/10'} />
        <LearnWithPhoto lang={this.props.lang} deviceAndroid={this.props.deviceAndroid} wordId={this.start} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f2fcfd',
    flexDirection: 'column',
    paddingBottom: 60
  }
});

module.exports = LearnWithPhotoHolder;
