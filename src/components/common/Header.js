import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

class Header extends Component {
  render() {
    return (
      <View style={styles.view_style}>
        <Text style={styles.view_text}>
          {this.props.headerText}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view_style: {
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    elevation: 2,
    position: 'relative'
  },
  view_text: {
    fontSize: 20
  },
});

export { Header };
