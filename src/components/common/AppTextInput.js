import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';

class AppTextInput extends Component {
  render() {
    return (
      <View style={styles.view_style}>
        <Text style={styles.view_text}>
          {this.props.text || ''}
        </Text>
        <TextInput
          placeholder={this.props.placeholder || 'love'}
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
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 30,
    flex: 2
  },
  view_style: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  view_text: {
    fontSize: 18,
    paddingLeft: 15,
    flex: 1
  },
});

export { AppTextInput };
