import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  // Alert,
  // StatusBar,
  // Keyboard,
  ScrollView,
  // TouchableWithoutFeedback
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
// import renderIf from 'render-if';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { DefaultTabBar, Analytics } from './components/';
import {
  // Button,
  // CardSection,
  // ShapedTextInput,
  // Spinner,
  // PickerView,
  // PickerButton,
  // HscrollView
} from '../common/';
// import generalUtils from '../utils/generalUtils';
// const _ = require('lodash');

class profile extends Component {
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
      <ScrollableTabView
        initialPage={0}
        renderTabBar={() => <DefaultTabBar />}
        style={styles.ScrollableTabView}
      >
        <View style={styles.Analytics} tabLabel="ios-analytics">
          <Analytics />
        </View>
        <ScrollView tabLabel="ios-people" style={styles.tabView}>
          <View style={styles.card}>
            <Text>Friends</Text>
          </View>
        </ScrollView>
        <ScrollView tabLabel="ios-chatboxes" style={styles.tabView}>
          <View style={styles.card}>
            <Text>Messenger</Text>
          </View>
        </ScrollView>
        <ScrollView tabLabel="ios-notifications" style={styles.tabView}>
          <View style={styles.card}>
            <Text>Notifications</Text>
          </View>
        </ScrollView>
        <ScrollView tabLabel="ios-list" style={styles.tabView}>
          <View style={styles.card}>
            <Text>Other nav</Text>
          </View>
        </ScrollView>
      </ScrollableTabView>
    );
  }
}

const styles = StyleSheet.create({
  ScrollableTabView: {
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  tabView: {
    padding: 10,
  },
  Analytics: {
    flex: 1,
    marginBottom: 60
    // backgroundColor: 'red'
  },
  card: {
    flex: 1,
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 5,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  }
});

module.exports = profile;
