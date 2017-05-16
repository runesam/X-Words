import React, { Component } from 'react';
import { Text, View, Image, ScrollView, Dimensions, TouchableOpacity, Animated, LayoutAnimation } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
// import { Actions } from 'react-native-router-flux';
import Tts from 'react-native-tts';
import {
  Button,
  // CardSection,
  // ShapedTextInput,
  Spinner,
} from '../../common/';
// import images from '../../../json/images.json';
// import generalUtils from '../../../utils/generalUtils';

class LearnWithPhoto extends Component {
  state = {
    fadeAnim: new Animated.Value(0),
    disabled: false
  }
  componentWillMount() {
    LayoutAnimation.spring();
    // setInterval(() => {
    //   console.log(this.props.data.details);
    // }, 1000);
    Tts.setDefaultRate(0.4);
  }
  componentDidMount() {
    Animated.timing(this.state.fadeAnim, { toValue: 1 }).start();
    Tts.addEventListener('tts-finish', this.endingLoader);
  }
  componentWillUnmount() {
    Tts.removeEventListener('tts-finish', this.endingLoader);
  }
  onPressMe() {
    this.props.next();
  }
  endingLoader = () => {
    this.setState({ disabled: false });
  }
  textToSpeech(text) {
    this.setState({ disabled: true }, () => {
      if (this.props.accent) {
        const accent = `com.apple.ttsbundle.${this.props.accent}-compact`;
        console.log(accent);
        Tts.setDefaultVoice(accent);
      }
      Tts.speak(text);
    });
  }
  translateHolderIcon(data) {
    if (this.state.disabled) {
      return <Spinner size={data[0]} colors='white' />;
    }
    return <Icon name='volume-2' size={data[1]} color='white' />;
  }
  renderButton() {
    if (this.props.loading) {
      return <Spinner size='large' />;
    }
    return (
      <Button
        text={this.props.last ? this.props.lang.title.finish : this.props.lang.title.submit}
        style={styles.submitButton}
        textStyle={styles.submitButtonText}
        onPressMe={this.onPressMe.bind(this)}
      />
    );
  }
  render() {
    return (
      <Animated.View style={[styles.holder, { opacity: this.state.fadeAnim }]}>
        <ScrollView style={styles.ScrollView} contentContainerStyle={Dimensions.get('window').height > 650 ? { flex: 1 } : null}>
          <View style={styles.translateHolder}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={this.textToSpeech.bind(this, this.props.data.details.english)} style={styles.translateHolderButton}>
                <View style={styles.translateHolderIcon}>
                  {this.translateHolderIcon(['large', 35])}
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.translateWorder}>
              <Text style={[styles.wordEnglish, this.props.data.details.english.length > 10 ? { fontSize: 20 } : { fontSize: 25 }]}>{this.props.data.details.english}</Text>
              <Text style={styles.wordTurkish}>{this.props.data.details.turkish}</Text>
            </View>
            <View style={{ flex: 1 }}><Text>{''}</Text></View>
          </View>
          <View style={styles.imageWrapper}>
            <Image source={{ uri: this.props.data.details.image }} style={styles.imageStyle} />
          </View>
          <View style={styles.sentenceHolder}>
            <TouchableOpacity onPress={this.textToSpeech.bind(this, this.props.data.sentence.sentence)}>
              <View style={styles.sentenceHolderIcon}>
                {this.translateHolderIcon(['small', 20])}
              </View>
            </TouchableOpacity>
            <Text style={styles.sentence}>{this.props.data.sentence.sentence}</Text>
          </View>
          <View style={styles.explainHolder}>
            <Text style={styles.explain}>{this.props.data.sentence.explanation}</Text>
          </View>
          <View style={styles.submitButtonContainer}>
            {this.renderButton()}
          </View>
        </ScrollView>
      </Animated.View>
    );
  }
}

const styles = {
  holder: {
    flex: 9,
    backgroundColor: '#f2fcfd'
  },
  ScrollView: {
    paddingTop: 10,
    backgroundColor: '#f2fcfd'
  },
  translateHolder: {
    flex: 2,
    flexDirection: 'row',
  },
  translateHolderButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  translateHolderIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00cccc',
    width: (Dimensions.get('window').width - 100) / 4,
    height: (Dimensions.get('window').width - 100) / 4,
    borderRadius: (Dimensions.get('window').width - 100) / 8
  },
  translateWorder: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageWrapper: {
    flex: 4,
    alignItems: 'center',
  },
  imageStyle: {
    flex: 1,
    width: (Dimensions.get('window').width - 50) / 2,
    height: (Dimensions.get('window').width - 50) / 2,
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: '#00cccc'
  },
  sentenceHolder: {
    flex: 1,
    flexDirection: 'row',
    margin: 15,
    padding: 15,
    borderWidth: 1,
    borderRadius: 2,
    backgroundColor: 'rgba(255,250,0,0.1)',
    borderColor: '#00cccc',
    alignItems: 'center'
  },
  sentenceHolderIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00cccc',
    width: (Dimensions.get('window').width - 100) / 8,
    height: (Dimensions.get('window').width - 100) / 8,
    borderRadius: (Dimensions.get('window').width - 100) / 16
  },
  sentence: {
    fontSize: 16,
    marginRight: 30,
    marginLeft: 10
  },
  explainHolder: {
    flex: 2,
    padding: 25,
    paddingTop: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#f2fcfd',
  },
  explain: {
    color: '#038b9b',
    fontSize: 16,
    textAlign: 'justify',
  },
  submitButton: {
    backgroundColor: '#8CDD00',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Dimensions.get('window').width / 3,
    marginLeft: Dimensions.get('window').width / 3,
    borderRadius: 250
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '600',
    padding: 10
  },
  wordEnglish: {
    fontWeight: '600',
    color: '#000'
  },
  wordTurkish: {
    fontSize: 20,
    fontWeight: '400',
    color: '#666666'
  },
  submitButtonContainer: {
    flex: 1,
    paddingBottom: 10,
    justifyContent: 'flex-end'
  }
};

export default LearnWithPhoto;
