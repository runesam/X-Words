import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Picker,
  TouchableHighlight,
} from 'react-native';

class PickerButton extends Component {
  state = {

  }
  getOptionList() {
    return this.refs.OPTIONLIST;
  }
  WholeOptions() {
    return this.props.data[1].options.map((option, i) =>
      (
        <Picker.Item style={styles.pickerItem} key={i} label={option.text} value={option.value} />
      )
    );
  }
  render() {
    return (
      <View style={styles.view_style}>
        <TouchableHighlight
          underlayColor="#ffffff"
          style={styles.pickerValueContainer}
          onPress={this.props.togglePicker.bind(this)}
        >
          <Text
            style={[
              styles.pickerValue,
              this.props.level === 0 ?
                { color: '#c5c4d6' } : { color: 'white' }
            ]}
          >
            {this.props.data[this.props.level].text}
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view_style: {

  },
  pickerValueContainer: {
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.2)',
    height: 50,
    justifyContent: 'center',
    paddingLeft: 20
  },
  pickerValue: {
    fontSize: 18
  },
  mainPicker: {
    marginTop: 10,
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  pickerItem: {
    color: 'white'
  }
});

export { PickerButton };
