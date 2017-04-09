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
import Header from './components/header';
import LearnWithPhoto from './components/LearnWithPhoto';
// import renderIf from 'render-if';
// import Icon from 'react-native-vector-icons/FontAwesome';
import generalUtils from '../../utils/generalUtils';
// const _ = require('lodash');

class LearnWithPhotoHolder extends Component {
  state= {
    headline: '1/10',
    total: 10,
    next: 1,
    current: 0,
    max: 10,
    dataSource: null,
  }
  componentWillMount() {
    if (this.props.replaceColor) {
      this.props.replaceColor('#00cccc');
    }
    switch (this.props.action) {
      case 'newDay':
      this.manyNumbers();
        break;
      case 'notNEw':
      this.manyNumber(this.props.startider)
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
      this.setState({
        max: datakeys.length,
        dataSource: data[datakeys[id]],
        headline: head
      });
    });
  }
  ComponentDidUpdate() {

  }
  renderItem() {
    if (this.state.dataSource) {
      return <LearnWithPhoto lang={this.props.lang} deviceAndroid={this.props.deviceAndroid} data={this.state.dataSource} />;
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
