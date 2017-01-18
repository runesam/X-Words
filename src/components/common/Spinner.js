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
        <ActivityIndicator size={this.props.size || 'large'} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view_style: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  view_text: {

  },
});

export { Spinner };
