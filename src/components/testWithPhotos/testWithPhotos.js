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
import renderIf from 'render-if';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { Scene, Actions } from 'react-native-router-flux';
import {
  // Button,
  // CardSection,
  // ShapedTextInput,
  // Spinner,
  // PickerView,
  // PickerButton,
  // HscrollView
} from '../common/';
import TestI from './components/testI';
import FooterWithNumber from './../footerWithNumber/components/footerWithNumber';
import generalUtils from './../../utils/generalUtils';
// const _ = require('lodash');

class component extends Component {
  state= {
    header: null,
    page: 2,
    testIData: null
  }
  componentWillMount() {
    generalUtils.storageGetItem('levelOptionData').then(() => {
      const data = {};
      data.level_id = 4;
      generalUtils.setDataFromApi(this.props.api.getTestByLevel, data)
      .then(res => {
        this.setState({
          testIData: res,
          header: `${this.state.page}/${res.length}`
        });
        console.log(res);
      })
      .catch(reason => console.log(reason));
    });
  }
  onPressMe() {

  }
  ComponentDidMount() {

  }
  renderRowTestView() {
    if (this.state.testIData) {
      return (
        <TestI data={this.state.testIData[this.state.page - 1]} lang={this.props.lang} />
      );
    }
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
          {this.renderRowTestView()}
        </View>
        <View style={styles.footerContainer}>
          <FooterWithNumber number={this.state.testIData ? this.state.testIData.length : null} current={this.state.page} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
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
