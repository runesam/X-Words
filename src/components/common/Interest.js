import React, { Component } from 'react';
import {
StyleSheet,
Text,
View,
TouchableHighlight,
Image
} from 'react-native';

class Interest extends Component {
  state = {
    active: this.props.data.active
  }
  componentWillMount() {

  }
  toggle(data) {
    this.setState({ active: !this.state.active });
    this.props.interestsHandler(data.id);
  }
  render() {
    return (
      <TouchableHighlight
        style={styles.touchStyle}
        underlayColor='rgba(0,0,0,0.3)'
        onPress={this.toggle.bind(this, this.props.data)}
      >
        <View style={styles.view_style}>
          <Image
            source={{ uri: this.props.data.image }}
            style={[styles.imageStyle, this.state.active ? { opacity: 0.6 } : { opacity: 0.2 }]}
          />
          <Text
            style={[styles.textStyle, this.state.active ? { color: 'white' } : { color: '#c5c4d6' }]}
          >
            {this.props.data.text}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  touchStyle: {
    borderRadius: 5,
    paddingBottom: 10,
    paddingTop: 10
  },
  view_style: {
    flex: 1,
    width: 80
  },
  imageStyle: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'center'
  },
  textStyle: {
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white'
  }
});

export { Interest };
