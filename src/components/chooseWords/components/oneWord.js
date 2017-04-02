import React, { Component } from 'react';
// import firebase from 'firebase';
import {
  StyleSheet,
  View,
  Text,
  Dimensions
  // Image,
  // Alert,
  // StatusBar,
  // Keyboard,
  // ScrollView,
  // TouchableWithoutFeedback
} from 'react-native';
// import renderIf from 'render-if';
// import Icon from 'react-native-vector-icons/simplelineicons';
import {
  // Button,
  // CardSection,
  // ShapedTextInput,
  // Spinner,
  // PickerView,
  // PickerButton,
  // HscrollView
} from '../../common/';
// import generalUtils from '../utils/generalUtils';
// const _ = require('lodash');

class OneWord extends Component {
  state= {

  }
  componentWillMount() {

  }
  onPressMe() {

  }
  ComponentDidUpdate() {

  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.part1}>
          <Text style={styles.headLine}>{this.props.lang.text.choosed} {this.props.choosed} {this.props.lang.text.left} {this.props.left}</Text>
        </View>
        <View style={styles.part2}>
          <Text style={styles.wordEnglish}>{this.props.data.english}</Text>
          <Text style={styles.wordTurkish}>{this.props.data.turkish}</Text>
        </View>
        <View style={styles.part3}></View>
        <View style={styles.part4}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    width: Dimensions.get('window').width - 40,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    alignSelf: 'stretch',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 30,
    flexDirection: 'column'
  },
  part1: {
    flex: 1,
    alignItems: 'center'
  },
  headLine: {
    fontWeight: '600'
  },
  wordEnglish: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000'
  },
  wordTurkish: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#666666'
  },
  part2: {
    flex: 3,
  alignItems: 'center'
  },
  part3: {
    flex: 2,
  },
  part4: {
    flex: 3,
  },
});

module.exports = OneWord;
