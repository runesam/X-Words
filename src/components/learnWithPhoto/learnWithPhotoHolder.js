import React, { Component } from 'react';
// import firebase from 'firebase';
import {
  StyleSheet,
  View,
  // Alert,
  StatusBar,
  // Text,
  // Keyboard,
  // ScrollView,
  // TouchableWithoutFeedback
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { Actions } from 'react-native-router-flux';
// import renderIf from 'render-if';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { Spinner } from '../common/';
import Header from './components/header';
import LearnWithPhoto from './components/LearnWithPhoto';
import generalUtils from '../../utils/generalUtils';

const _ = require('lodash');

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
      case 'notNew':
      this.manyNumber(this.props.startider);
      break;
      default:

    }
  }
  updateReminder(wordId) {
    this.reminders[wordId][0] = this.reminders[wordId][0] === 4 ? 0 : this.reminders[wordId][0] + 1;
    generalUtils.storageSetItem('reminder', this.reminders);
  }
  structureAndSetWordData() {
    this.setState({ able: false });
    this.currentWordData = {};
    const currentSentenceId = this.reminders[this.datakeys[this.currentId]][0];
    this.updateReminder(this.datakeys[this.currentId]);
    this.currentWordData.sentence = this.wordsData[this.datakeys[this.currentId]].sentences[currentSentenceId];
    this.currentWordData.details = this.wordsData[this.datakeys[this.currentId]].details;
    const head = `${this.currentId + 1} / ${this.datakeys.length}`;
    this.setState({
      dataSource: this.currentWordData,
      headline: head
    });
    const tempInterval = setInterval(() => {
      if (this.state.dataSource.details) {
        clearInterval(tempInterval);
        if (this.currentId + 1 === this.datakeys.length) {
          this.last = true;
        }
        this.setState({ able: true });
        generalUtils.storageSetItem('reminder', this.reminders);
      }
    });
  }
  next() {
    if (this.currentId + 1 === this.datakeys.length) {
      generalUtils.storageSetItem('status', 'finished');
      Actions.Home();
      return false;
    }
    this.currentId++;
    this.structureAndSetWordData();
  }
  manyNumbers() {
    generalUtils.storageGetItem('todayWords').then((data) => {
      console.log(data);
      this.wordsData = data;
      this.datakeys = Object.keys(data);
      generalUtils.storageGetItem('reminder').then((reminders) => {
        this.reminders = reminders;
        console.log(this.reminders);
        const firstWordNeverBeenReadId = _.findKey(this.reminders, (reminder) => reminder[0] === 0);
        this.currentId = firstWordNeverBeenReadId ? this.datakeys.indexOf(firstWordNeverBeenReadId.toString()) : 0;
        console.log(this.currentId);
        this.structureAndSetWordData();
      });
      this.setState({ max: this.datakeys.length });
    });
  }
  ComponentDidUpdate() {

  }
  renderItem() {
    if (this.state.able) {
      return <LearnWithPhoto lang={this.props.lang} deviceAndroid={this.props.deviceAndroid} next={this.next.bind(this)} data={this.state.dataSource} accent={this.state.accent} last={this.last} />;
    }
    return <Spinner size='large' color='black' />;
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
