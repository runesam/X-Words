import React, { Component } from 'react';
// import firebase from 'firebase';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  // Alert,
  // StatusBar,
  // Keyboard,
  // ScrollView,
  // TouchableWithoutFeedback
} from 'react-native';
// import renderIf from 'render-if';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
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
// const _ = require('lodash');

class OneWord extends Component {
  state= {

  }
  componentWillMount() {

  }
  onPressMe() {

  }
  ComponentDidUpdate() {

  }
  imageHolder() {
    if (this.props.data.image !== ''){
    return (
      <View  style={{ flex: 1, backgroundColor: 'blue',flexDirection: 'row', alignSelf: 'stretch'}} >
        <View style={{ flex:1 }}/>
      <View style={styles.imageHold}>
        <Image source={{ uri: this.props.data.image }} style={styles.image} />
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View style={styles.circle}>
          <Icon name='volume-2' size={30} color='#00cccc' />
        </View>
      </View>
    </View>
    );
    }
    return (<View />);
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.part1}>
          <Text style={styles.headLine}>{this.props.lang.text.choosed} {this.props.choosed} {this.props.lang.text.left} {this.props.left}</Text>
        </View>
        <View style={styles.part2}>
          <Text style={styles.wordEnglish}>{this.props.data.english}</Text>
          <Text style={styles.wordTurkish}>{this.props.data.turkish}</Text>
        </View>
        <View style={styles.part3}>
        {this.imageHolder()}
        </View>
        <View style={styles.part4}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    width: Dimensions.get('window').width - 40,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    alignSelf: 'stretch',
    backgroundColor: 'white',
    borderRadius: 5,
    paddingTop: 30,
    flexDirection: 'column'
  },
  part1: {
    flex: 1,
    alignItems: 'center'
  },
  headLine: {
    fontWeight: '600'
  },
  wordEnglish: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000'
  },
  wordTurkish: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#666666'
  },
  part2: {
    flex: 3,
  alignItems: 'center'
  },
  part3: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  part4: {
    flex: 2,
  },
  circle: {
    borderWidth: 2,
    flex:1,
    width: (Dimensions.get('window').width - 40)/4,
    height: (Dimensions.get('window').width - 40)/4,
    borderRadius: (Dimensions.get('window').width - 40)/8,
    borderColor: '#00cccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageHold: {
    flex:3,
    alignSelf: 'stretch'
  },
  image: {
    resizeMode: 'contain',
    flex: 1
  },
});

module.exports = OneWord;
