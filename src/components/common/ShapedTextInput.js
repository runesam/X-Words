import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View,
  TextInput
} from 'react-native';

class ShapedTextInput extends Component {
  render() {
    return (
      <View style={styles.view_style}>
        <Image source={this.props.iconImage} style={styles.iconStyle} />
        <TextInput
          placeholder={this.props.placeholder || 'love'}
          autoCorrect={this.props.autoCorrect || false}
          style={styles.TextInput}
          editable={this.props.editable || true}
          maxLength={this.props.maxLength}
          keyboardType={this.props.keyboardType || 'default'}
          secureTextEntry={this.props.secureTextEntry || false}
          value={this.props.value}
          onChangeTextt={
            function (text) {
              if (this.props.onChangeText && this.props.name) {
                  this.props.onChangeText(this.props.name, text);
                }
            }.bind(this)
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  TextInput: {
    backgroundColor: 'rgba(0,0,0,0)',
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 30,
    flex: 4,
  },
  view_style: {
    height: 60,
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden',
    // alignItems: 'center'
  },
  view_text: {
    fontSize: 18,
    paddingLeft: 15,
    flex: 1
  },
  iconStyle: {
    flex: 1,
    backgroundColor: 'black',
    resizeMode: 'contain',
    width: null,
    height: null,
  }
});

export { ShapedTextInput };
