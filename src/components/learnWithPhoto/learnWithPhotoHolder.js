import React, { Component } from 'react';
// import firebase from 'firebase';
import {
  StyleSheet,
  View,
  // Image,
  // Alert,
  StatusBar,
  Text,
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
    total: 10,
    next: 1,
    current: 0,
    max: 10,
    dataSource: null,
    able: false
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
      this.manyNumbers();
      break;
      case 'notNEw':
      this.manyNumber(this.props.startider);
      break;
      default:

    }
  }
  onPressMe() {

  }
  manyNumbers(id = 0) {
    generalUtils.storageGetItem('todayWords').then((data) => {
      const currentId = id + 1;
      const datakeys = Object.keys(data);
      const head = `${currentId} / ${datakeys.length}`;
      this.currentWordData = {};
      generalUtils.storageGetItem('reminder').then((reminders) => {
        this.reminders = reminders;
        const currentSentenceId = this.reminders[datakeys[id]][0];
        this.reminders[datakeys[id]][0]++;
        this.currentWordData.sentence = data[datakeys[id]].sentences[currentSentenceId];
        this.currentWordData.details = data[datakeys[id]].details;
      });
      this.setState({
        max: datakeys.length,
        dataSource: this.currentWordData,
        headline: head
      });
      const tempInterval = setInterval(() => {
        if (this.state.dataSource.details) {
          clearInterval(tempInterval);
          this.setState({ able: true });
          generalUtils.storageSetItem('reminder', this.reminders);
        }
      });
    });
  }
  ComponentDidUpdate() {

  }
  renderItem() {
    if (this.state.able) {
      return <LearnWithPhoto lang={this.props.lang} deviceAndroid={this.props.deviceAndroid} data={this.state.dataSource} accent={this.state.accent} />;
    }
    return <Text>Loading...</Text>;
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <StatusBar barStyle='light-content' />
        <Header headerText={this.state.headline} />
        {this.renderItem()}
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
