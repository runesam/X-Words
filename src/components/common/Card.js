import React, { Component } from 'react';
import {
StyleSheet,
// Text,
View
} from 'react-native';

class Card extends Component {
  state = {

  }
  componentWillMount() {

  }
  render() {
    return (
      <View style={styles.view_style}>
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view_style: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10
  },
  view_text: {

  },
});

export { Card };
