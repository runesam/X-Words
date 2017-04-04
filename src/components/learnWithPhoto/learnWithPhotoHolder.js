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
        <Header headerText={'8/10'} />
        <LearnWithPhoto lang={this.props.lang} wordId={this.start} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f8f7f7',
    flexDirection: 'column'
  }
});

module.exports = LearnWithPhotoHolder;
