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
    header: '1/4',
    page: 1,
    testIData: null
  }
  componentWillMount() {
    generalUtils.storageGetItem('levelOptionData').then(() => {
      const data = {};
      data.level_id = 4;
      generalUtils.setDataFromApi(this.props.api.getTestByLevel, data)
      .then(res => {
        this.setState({ testIData: res });
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
        <TestI data={this.state.testIData[0]} lang={this.props.lang} />
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
          {renderIf(this.state.page === 1)(
            this.renderRowTestView()
          )}
        </View>
        <View style={styles.footerContainer}>
          <FooterWithNumber number='5' current='1' />
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
