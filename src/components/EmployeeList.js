import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  // ListView
} from 'react-native';

class EmployeeList extends Component {
  componentWillMount() {

  }
  render() {
    return (
      <View style={styles.view_style}>
        <Text>{'test w 3ahd allah'}</Text>
        <Text>{'test w 3ahd allah'}</Text>
        <Text>{'test w 3ahd allah'}</Text>
        <Text>{'test w 3ahd allah'}</Text>
        <Text>{'test w 3ahd allah'}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  view_style: {

  },
  view_text: {

  },
});

module.exports = EmployeeList;
