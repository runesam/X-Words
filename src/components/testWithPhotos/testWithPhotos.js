import React, { Component } from 'react';
// import firebase from 'firebase';
import {
  StyleSheet,
  Text,
  View,
  // Image,
  // Alert,
  StatusBar,
  // Keyboard,
  // ScrollView,
  // TouchableWithoutFeedback
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import renderIf from 'render-if';
import DeviceInfo from 'react-native-device-info';
// import Icon from 'react-native-vector-icons/EvilIcons';
// import { Scene, Actions } from 'react-native-router-flux';
import {
  // Button,
  // CardSection,
  // ShapedTextInput,
  Spinner,
  // PickerView,
  // PickerButton,
  // HscrollView
} from '../common/';
import TestI from './components/testI';
import FooterWithNumber from './components/footerWithNumber';
import generalUtils from './../../utils/generalUtils';

const _ = require('lodash');

class component extends Component {
  state= {
    header: null,
    page: 1,
    word: null,
    id: null,
    testIData: null,
    singleData: null,
    accent: null,
    result: {}
  }
  componentWillMount() {
    const version = parseInt(DeviceInfo.getSystemVersion(), 10);
    if (!this.props.deviceAndroid || (this.props.deviceAndroid && version > 5)) {
      generalUtils.storageGetItem('accent').then((data) => {
        this.setState({ accent: data || 'Moira' }, () => { console.log(this.state.accent); });
      });
    }
    generalUtils.storageGetItem('levelOptionData').then(() => {
      const data = {};
      data.level_id = 4;
      generalUtils.setDataFromApi(this.props.api.getTestByLevel, data)
      .then(res => {
        this.setState({
          testIData: res,
          header: `${this.state.page}/${res.length}`
        });
        // console.log(res);
        this.manageData();
      })
      .catch(reason => console.log(reason));
    });
  }
  componentDidUpdate() {

  }
  onPressMe(data) {
    const temp = this.state.result;
    temp[this.state.id] = (_.filter(data, { active: true, correct: true }).length > 0).toString();
    // console.log(temp);
    this.setState({
      singleData: null,
      result: temp
    });
    if (this.state.page !== this.state.testIData.length) {
      this.setState({ page: this.state.page + 1 });
      setTimeout(() => {
        this.manageData();
      });
    } else {
      generalUtils.storageGetItem('memberId').then((memberId) => {
        const apiData = {};
        apiData.member_id = memberId;
        apiData.results = temp;
        generalUtils.setDataFromApi(this.props.api.saveTest, apiData)
        .then(res => {
          console.log(res);
        })
        .catch(reason => console.log(reason));
      });
      Actions.PurchaseHolder();
    }
  }
  manageData() {
    const images = [this.state.testIData[this.state.page - 1].correct, this.state.testIData[this.state.page - 1].wrong1, this.state.testIData[this.state.page - 1].wrong2, this.state.testIData[this.state.page - 1].wrong3];
    const answers = [];
    let i = 0;
    function structure() {
      images.forEach((data) => {
        const temp = {};
        temp.id = i;
        temp.image = data;
        temp.active = false;
        temp.correct = i === 0;
        answers.push(temp);
        i++;
      });
    }
    structure();
    this.setState({
      singleData: _.shuffle(answers),
      word: this.state.testIData[this.state.page - 1].word,
      id: this.state.testIData[this.state.page - 1].question_id,
      header: `${this.state.page}/${this.state.testIData.length}`
    });
    setTimeout(() => {
      // console.log(this.state.singleData);
    });
  }
  ComponentDidMount() {

  }
  renderRowTestView() {
    if (this.state.singleData) {
      return (
        <TestI data={this.state.singleData} word={this.state.word} next={this.onPressMe.bind(this)} lang={this.props.lang} accent={this.state.accent} />
      );
    }
    return <Spinner size='large' color='black' />;
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <StatusBar barStyle='light-content' />
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>
            {this.state.header}
          </Text>
        </View>
        <View style={styles.rowContainer}>
          {renderIf(this.state.page)(
            this.renderRowTestView()
          )}
        </View>
        <View style={styles.footerContainer}>
          <FooterWithNumber number={this.state.testIData ? this.state.testIData.length : null} current={this.state.page} lang={this.props.lang} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#E6E6E6',
  },
  headerContainer: {
    backgroundColor: '#00CCCC',
    height: 70,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10,
    flex: 1
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600'
  },
  rowContainer: {
    flex: 10,
    backgroundColor: '#E6E6E6'
  },
  footerContainer: {
    backgroundColor: '#E6E6E6',
    flex: 1.5
  }
});

module.exports = component;
