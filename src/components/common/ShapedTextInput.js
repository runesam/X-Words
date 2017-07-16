import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class ShapedTextInput extends Component {
  renderIcon() {
    if (this.props.icon) {
      return (
        <View style={[styles.icon_container, { top: this.props.icon[2] }, { left: this.props.icon[3] }]}>
          <Icon name={this.props.icon[0] || 'bath'} size={this.props.icon[1]} color={this.props.icon[4] || 'white'} />
        </View>
      );
    }
  }
  render() {
    return (
      <View style={[this.props.style ? this.props.style : styles.view_style, this.props.inValid ? { borderWidth: 1.5, borderColor: 'red' } : null]}>
          <TextInput
            placeholder={this.props.placeholder || 'placeholder'}
            placeholderTextColor={this.props.placeholderColor || '#c5c4d6'}
            autoCorrect={this.props.autoCorrect || false}
            style={[this.props.TextInputStyle ? this.props.TextInputStyle : styles.TextInput, this.props.icon ? { paddingLeft: 50 } : { paddingLeft: 20 }]}
            editable={this.props.editable || true}
            maxLength={this.props.maxLength}
            keyboardType={this.props.keyboardType || 'default'}
            secureTextEntry={this.props.secureTextEntry || false}
            value={this.props.value}
            editable={this.props.editable || true}
            multiline={this.props.multiline || false}
            numberOfLines={this.props.numberOfLines || 1}
            maxLength={this.props.maxLength || 1000}
            onBlur={
              function (text) {
                if (this.props.onBlurText && this.props.name) {
                    this.props.onBlurText(this.props.name, text);
                  }
              }.bind(this)
            }
            onChangeText={
              function (text) {
                if (this.props.onChangeText && this.props.name) {
                    this.props.onChangeText(this.props.name, text);
                  }
              }.bind(this)
            }
          />
          {this.renderIcon()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  TextInput: {
    backgroundColor: '#FF5778',
    color: 'white',
    paddingRight: 20,
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
  icon_container: {
    position: 'absolute',
  }
});

export { ShapedTextInput };
