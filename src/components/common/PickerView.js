import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Picker,
} from 'react-native';

class PickerView extends Component {
  state = {

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
        <Picker
          style={styles.mainPicker}
          itemStyle={styles.pickerItem}
          onValueChange={
            function (text) {
              if (this.props.onChangeText && this.props.name) {
                this.props.togglePicker();
                this.props.onChangeText(this.props.name, text);
              }
            }.bind(this)
          }
        >
          {this.WholeOptions()}
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainPicker: {
    marginTop: 10,
    // borderRadius: 5,
    backgroundColor: 'rgba(0,0,0,0.6)'
  },
  pickerItem: {
    color: 'white'
  }
});

export { PickerView };
