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
    return this.props.data.map((option, i) =>
      (
        <Picker.Item style={styles.pickerItem} key={i} label={option.text} value={option.value} />
      )
    );
  }
  render() {
    return (
      <View style={[styles.container, this.props.deviceAndroid && this.props.inValid ? { borderWidth: 1.5, borderColor: 'red' } : null]}>
        <Picker
          style={this.props.deviceAndroid ?
                  [styles.androidMainPicker, this.props.selectedValue === 0 ?
                    { color: '#c5c4d6' }
                  :
                    { color: 'white' }
                  ]
                :
                  styles.iosMainPicker
                }
          itemStyle={styles.pickerItem}
          // mode="dropdown"
          selectedValue={this.props.selectedValue}
          onValueChange={!this.props.deviceAndroid ?
            function (text) {
              if (this.props.onChangeText && this.props.name) {
                this.props.togglePicker();
                this.props.onChangeText(this.props.name, text);
              }
            }.bind(this)
            :
            function (text) {
              if (this.props.onChangeText && this.props.name) {
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
  iosMainPicker: {
    flex: 1,
    // marginTop: 10,
    // borderRadius: 5,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)'
  },
  androidMainPicker: {
    flex: 1,
    // marginTop: 10,
    borderRadius: 5,
    justifyContent: 'center',
    marginLeft: 10
  },
  container: {
    flex: 1,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.2)'
  },
  pickerItem: {
    color: 'white'
  }
});

export { PickerView };
