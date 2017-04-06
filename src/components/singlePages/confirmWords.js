import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  //Image,
  // Alert,
  //ScrollView,
  // ScrollView,
  //Dimensions,
  //Animated,
  //TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { Actions } from 'react-native-router-flux';
//import renderIf from 'render-if';

import {
  // Header,
  Button,
} from '../common/';

import generalUtils from '../../utils/generalUtils';

class ConfirmWords extends Component {
  state = {

  };
  componentWillMount() {

  }
  ComponentDidMount() {

  }
render() {
  return (
    <View style={styles.container}>
    </View>
  );
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#00cccc',
    paddingTop: 50
  },
  SignUpButton: {
    borderRadius: 45,
  },
  SignUpButtonText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: '300',
    paddingTop: 12,
    paddingBottom: 12
  },
});
module.exports = ConfirmWords;
