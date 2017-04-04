import React, { Component } from 'react';
// import firebase from 'firebase';
import {
  StyleSheet,
  View,
  StatusBar,
  // Alert,
  // StatusBar,
  // Keyboard,
  // ScrollView,
  // TouchableWithoutFeedback
} from 'react-native';
import Header from './components/header';
import LearnWithout from './components/LearnWithout';
// import renderIf from 'render-if';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import generalUtils from '../utils/generalUtils';
// const _ = require('lodash');
class LearnWithoutHolder extends Component {
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
        <LearnWithout lang={this.props.lang} deviceAndroid={this.props.deviceAndroid} wordId={this.start} />
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

module.exports = LearnWithoutHolder;
