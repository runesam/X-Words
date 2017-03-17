import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import renderIf from 'render-if';

class ShapedTextInput extends Component {
  render() {
    return (
      <View style={[styles.view_style, this.props.inValid ? { borderWidth: 1.5, borderColor: 'red' } : null]}>
          <TextInput
            placeholder={this.props.placeholder || 'placeholder'}
            placeholderTextColor={this.props.placeholderColor || '#c5c4d6'}
            autoCorrect={this.props.autoCorrect || false}
            style={[styles.TextInput, this.props.icon ? { paddingLeft: 50 } : { paddingLeft: 20 }]}
            editable={this.props.editable || true}
            maxLength={this.props.maxLength}
            keyboardType={this.props.keyboardType || 'default'}
            secureTextEntry={this.props.secureTextEntry || false}
            value={this.props.value}
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
        {renderIf(this.props.icon)(
          <View style={styles.icon_container}>
            <Icon name={this.props.icon || 'bath'} size={30} color='white' />
          </View>
        )}
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
    top: 10,
    left: 20
  }
});

export { ShapedTextInput };
