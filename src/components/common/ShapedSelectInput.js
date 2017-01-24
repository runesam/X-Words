import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import {
  Select,
  Option,
  OptionList,
} from 'react-native-option-select';

class ShapedSelectInput extends Component {
  state = {
    currentLevel: this.props.data[0].default.text
  }
  getOptionList() {
    return this.refs.OPTIONLIST;
  }
  WholeOptions() {
    return this.props.data[1].options.map((option, i) =>
      (
        <Option
          key={i}
          value={option.value}
          style={styles.optionStyle}
          styleText={styles.optionTextStyle}
        >
          {option.text}
        </Option>
      )
    );
  }
  render() {
    return (
      <View style={styles.view_style}>
        <Select
          // width={350}
          style={styles.selectView}
          styleText={
            this.state.currentLevel === this.props.data[0].default.text ?
              { color: '#c5c4d6', fontSize: 18 }
            :
              { color: 'white', fontSize: 18 }
          }
          ref="SELECT1"
          optionListRef={this.getOptionList.bind(this)}
          defaultValue={this.props.data[0].default.text}
          onSelect={
            function (text) {
              if (this.props.onChangeText && this.props.name) {
                  this.setState({ currentLevel: text });
                  this.props.onChangeText(this.props.name, text);
                }
            }.bind(this)
          }
        >
          {this.WholeOptions()}
        </Select>
        <OptionList ref="OPTIONLIST" overlayStyles={styles.overlayStyles} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view_style: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  selectView: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
    paddingLeft: 10
  },
  optionStyle: {
    backgroundColor: 'rgba(185,105,142,0.30)',
    borderColor: 'gray',
    borderBottomWidth: 1
  },
  optionTextStyle: {
    color: 'black',
    fontSize: 18,
  },
  overlayStyles: {
    backgroundColor: 'black',
    opacity: 0.7,
  }
});

export { ShapedSelectInput };
