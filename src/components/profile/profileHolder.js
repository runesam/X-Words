import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  // Text,
  // Alert,
  // StatusBar,
  // Keyboard,
  // ScrollView,
  // TouchableWithoutFeedback
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
// import renderIf from 'render-if';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { DefaultTabBar, Analytics, Recommends, LearnedWords, Social } from './components/';
import {
  // Button,
  // CardSection,
  // ShapedTextInput,
  // Spinner,
  // PickerView,
  // PickerButton,
  // HscrollView
} from '../common/';
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
          <Analytics lang={this.props.lang} />
        </View>
        <View style={styles.Analytics} tabLabel="ios-people">
          <Recommends lang={this.props.lang} />
        </View>
        <View style={styles.Analytics} tabLabel="ios-chatboxes">
          <LearnedWords lang={this.props.lang} />
        </View>
        <View style={styles.Analytics} tabLabel="ios-notifications">
          <Social lang={this.props.lang} />
        </View>
      </ScrollableTabView>
    );
  }
}

const styles = StyleSheet.create({
  ScrollableTabView: {
  },
  tabView: {
    padding: 10,
  },
  Analytics: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.04)',
    paddingBottom: 60
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
