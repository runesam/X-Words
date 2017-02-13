import React, { Component } from 'react';
import {
StyleSheet,
Text,
// View,
TouchableOpacity
} from 'react-native';

class Button extends Component {
  state = {

  }
  componentWillMount() {

  }
  render() {
    return (
      <TouchableOpacity
        style={this.props.style ? this.props.style : styles.buttonStyle}
        onPress={this.props.onPressMe.bind(this) || null}
        disabled={this.props.disabled ? this.props.disabled : false}
      >
        <Text style={this.props.textStyle ? this.props.textStyle : styles.view_text}>
          {this.props.text || 'Please Inject "text"'}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5
  },
  view_text: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
});

export { Button };
