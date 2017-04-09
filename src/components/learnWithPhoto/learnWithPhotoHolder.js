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
import DeviceInfo from 'react-native-device-info';
// import renderIf from 'render-if';
// import Icon from 'react-native-vector-icons/FontAwesome';
import Header from './components/header';
import LearnWithPhoto from './components/LearnWithPhoto';
import generalUtils from '../../utils/generalUtils';
// const _ = require('lodash');

class LearnWithPhotoHolder extends Component {
  state= {
    accent: null,
  }
  componentWillMount() {
    const version = parseInt(DeviceInfo.getSystemVersion(), 10);
    if (!this.props.deviceAndroid || (this.props.deviceAndroid && version > 5)) {
      generalUtils.storageGetItem('accent').then((data) => {
        this.setState({ accent: data || 'Moira' }, () => { console.log(this.state.accent); });
      });
    }
    if (this.props.replaceColor) {
      this.props.replaceColor('#00cccc');
    }
    switch (this.props.action) {
      case 'newDay':
        break;
      default:

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
        <Header headerText={this.state.headline} />
        <LearnWithPhoto lang={this.props.lang} deviceAndroid={this.props.deviceAndroid} wordId={this.start} accent={this.state.accent} />
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
