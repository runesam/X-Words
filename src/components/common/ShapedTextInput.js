import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput
} from 'react-native';

class ShapedTextInput extends Component {
  render() {
    return (
      <View style={styles.view_style}>
        <TextInput
          placeholder={this.props.placeholder || 'placeholder'}
          placeholderTextColor={this.props.placeholderColor || '#c5c4d6'}
          autoCorrect={this.props.autoCorrect || false}
          style={styles.TextInput}
          editable={this.props.editable || true}
          maxLength={this.props.maxLength}
          keyboardType={this.props.keyboardType || 'default'}
          secureTextEntry={this.props.secureTextEntry || false}
          value={this.props.value}
          onChangeText={
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
    backgroundColor: 'rgba(255,255,255,0.15)',
    color: 'white',
    paddingRight: 20,
    paddingLeft: 20,
    fontSize: 18,
    lineHeight: 30,
    flex: 4,
    borderRadius: 5,
  },
  view_style: {
    height: 50,
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden',
    borderRadius: 5,
    // alignItems: 'center'
  },
  view_text: {
    fontSize: 18,
    paddingLeft: 15,
    flex: 1
  },
});

export { ShapedTextInput };
