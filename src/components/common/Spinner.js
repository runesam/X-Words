import React, { Component } from 'react';
import {
StyleSheet,
// Text,
View,
ActivityIndicator
} from 'react-native';

class Spinner extends Component {
  state = {

  }
  componentWillMount() {

  }
  render() {
    return (
      <View style={styles.view_style}>
        <ActivityIndicator color='white' size={this.props.size || 'large'} style={styles.spinner} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view_style: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    flexDirection: 'row',
  },
});

export { Spinner };
