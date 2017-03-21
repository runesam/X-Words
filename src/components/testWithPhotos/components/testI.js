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
  // ScrollView,
  TouchableOpacity
} from 'react-native';
// import renderIf from 'render-if';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  // Button,
  // CardSection,
  // ShapedTextInput,
  // Spinner,
  // PickerView,
  // PickerButton,
  // HscrollView
} from '../../common/';
// import generalUtils from '../utils/generalUtils';
const _ = require('lodash');

const window = Dimensions.get('window');
const Option = class Option extends Component {
  state = {
    id: this.props.data.id
  }
  onPressButton() {
    this.props.onSelectAnswer(this.state.id);
  }
  render() {
    return (
      <TouchableOpacity onPress={this.onPressButton.bind(this)}>
        <View style={[styles.optionContainer, this.props.data.active ? { backgroundColor: '#00A1FF' } : { backgroundColor: '#E6E6E6' }]} >
          <Image source={{ uri: this.props.data.image }} style={styles.imageOption} />
          <View style={[styles.absolute, styles.absoluteBottom, this.props.data.active ? styles.iconActiveI : styles.iconInactiveI]}>
            <View style={this.props.data.active ? styles.iconActiveII : null} />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
};

class testI extends Component {
  state= {
    data: {}
  }
  componentWillMount() {
    console.log(window.width);
    const images = [this.props.data.correct, this.props.data.wrong1, this.props.data.wrong2, this.props.data.wrong3];
    const answers = [];
    let i = 0;
    function structure() {
      images.forEach((data) => {
        const temp = {};
        temp.id = i;
        temp.image = data;
        temp.active = false;
        temp.correct = i === 0;
        answers.push(temp);
        i++;
      });
    }
    structure();
    this.setState({ data: _.shuffle(answers) });
    setTimeout(() => {
      console.log(this.state.data);
    });
  }
  onPressSpeaker() {

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
    this.setState({ data: temp });
    console.log(this.state.data);
  }
  ComponentDidUpdate() {

  }
  renderRow() {
    return this.state.data.map((single, i) =>
      <Option key={i} data={single} index={i} onSelectAnswer={this.onSelectAnswer.bind(this)} />
    );
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.top}>
          <Text style={styles.topText}>
            {`${this.props.lang.text.which_photo} "${this.props.data.word}" ?`}
          </Text>
          <TouchableOpacity onPress={this.onPressSpeaker.bind(this) || null}>
            <View style={styles.iconContainer}>
              <Icon name='volume-up' size={25} color='white' style={styles.volIcon} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.middleTop}>
          {this.renderRow()}
        </View>
        <View style={styles.bottom}>
          <Text>
            {'test bottom'}
          </Text>
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
  middleTop: {
    flex: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottom: {
    flex: 1.5
  },
  optionContainer: {
    justifyContent: 'flex-start',
    height: 200,
    width: 175,
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
    left: 10,
    bottom: 5,
    backgroundColor: 'white',
    width: 23,
    height: 23,
    borderRadius: 50
  },
  iconActiveII: {
    left: 1.7,
    top: 1.7,
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
});

module.exports = testI;
