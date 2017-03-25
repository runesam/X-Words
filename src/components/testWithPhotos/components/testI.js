import React, { Component } from 'react';
// import firebase from 'firebase';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  // StatusBar,
  // Keyboard,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
// import renderIf from 'render-if';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Button,
  // CardSection,
  // ShapedTextInput,
  Spinner,
  // PickerView,
  // PickerButton,
  // HscrollView
} from '../../common/';
// import generalUtils from '../utils/generalUtils';
const _ = require('lodash');
const Speech = require('react-native-speech');

const window = Dimensions.get('window');
const Option = class Option extends Component {
  state = {
    id: this.props.data.id
  }
  componentWillMount() {
    // console.log((window.width - 10) / 2);
  }
  onPressButton() {
    this.props.onSelectAnswer(this.state.id);
  }
  render() {
    return (
      <TouchableWithoutFeedback onPress={this.onPressButton.bind(this)}>
        <View style={[styles.optionContainer, { width: (window.width - 60) / 2, height: ((window.width - 60) / 2) + 25 }, this.props.data.active ? { backgroundColor: '#00A1FF' } : { backgroundColor: '#E6E6E6' }]} >
          <Image source={{ uri: this.props.data.image }} style={styles.imageOption} />
          <View style={[styles.absolute, styles.absoluteBottom, this.props.data.active ? styles.iconActiveI : styles.iconInactiveI]}>
            <View style={this.props.data.active ? styles.iconActiveII : null} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
};

class testI extends Component {
  state= {
    data: this.props.data,
    disabled: true
  }
  componentWillMount() {

  }
  onPressSpeaker() {
    Speech.speak({
      text: this.props.word,
      voice: 'en-US'
    }).then(started => {
      console.log(started);
    })
    .catch(error => {
      console.log(error);
    });
  }
  onSelectAnswer(data) {
    const temp = this.state.data;
    this.state.data.map((value) => {
      const key = _.findIndex(temp, (o) => o.id === value.id);
      if (value.id === data) {
        temp[key].active = true;
      } else {
        temp[key].active = false;
      }
      return false;
    });
    this.setState({ data: temp, disabled: false });
  }
  onPressMe() {
    this.props.next(this.state.data);
  }
  renderRow() {
    return this.state.data.map((single, i) =>
      <Option key={i} data={single} index={i} onSelectAnswer={this.onSelectAnswer.bind(this)} />
    );
  }
  renderButton() {
    if (this.props.loading) {
      return <Spinner size='large' color='black' />;
    }
    return (
      <Button
        text={this.props.lang.title.submit}
        style={styles.submitButton}
        textStyle={styles.submitButtonText}
        onPressMe={this.onPressMe.bind(this)}
        disabled={this.state.disabled}
      />
    );
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.top}>
          <Text style={styles.topText}>
            {`${this.props.lang.text.which_photo} "${this.props.word}" ?`}
          </Text>
          <TouchableOpacity onPress={this.onPressSpeaker.bind(this) || null}>
            <View style={styles.iconContainer}>
              <Icon name='volume-up' size={25} color='white' style={styles.volIcon} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 10 }}>
          <ScrollView>
            <View style={styles.middleTop}>
              {this.renderRow()}
            </View>
          </ScrollView>
        </View>
        <View style={styles.bottom}>
          {this.renderButton()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // statics
  absolute: {
    position: 'absolute'
  },
  absoluteBottom: {
    bottom: 3
  },
  mainContainer: {
    flex: 1
  },
  top: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 15
  },
  topText: {
    fontSize: 17,
    color: 'black',
    marginRight: 10
  },
  iconContainer: {
    backgroundColor: '#00CCCC',
    borderRadius: 50 / 2,
    width: 40,
    height: 40
  },
  volIcon: {
    position: 'absolute',
    top: 7,
    right: 8
  },
  middleI: {
    flex: 1
  },
  middleTop: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottom: {
    flex: 1.7
  },
  optionContainer: {
    justifyContent: 'flex-start',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 7,
    paddingBottom: 30,
    margin: 10
  },
  imageOption: {
    flex: 1,
    width: null,
    height: null,
    borderRadius: 5,
    resizeMode: 'contain'
  },
  iconActiveI: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    left: 10,
    bottom: 5,
    backgroundColor: 'white',
    width: 23,
    height: 23,
    borderRadius: 50
  },
  iconActiveII: {
    borderColor: '#00A1FF',
    borderWidth: 2,
    backgroundColor: 'white',
    width: 20,
    height: 20,
    borderRadius: 50
  },
  iconInactiveI: {
    left: 10,
    bottom: 5,
    backgroundColor: '#E6E6E6',
    borderColor: 'gray',
    borderWidth: 1.5,
    width: 23,
    height: 23,
    borderRadius: 50
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#8CDD00',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    marginRight: 30,
    marginLeft: 30,
    borderRadius: 250
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '600'
  }
});

module.exports = testI;
