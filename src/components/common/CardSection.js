import React, { Component } from 'react';
import {
StyleSheet,
// Text,
View
} from 'react-native';

class CardSection extends Component {
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
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative'
  },
  view_text: {

  },
});

export { CardSection };
