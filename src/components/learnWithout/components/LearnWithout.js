import React, { Component } from 'react';
import { Text, View, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { Actions } from 'react-native-router-flux';
import Tts from 'react-native-tts';
import renderIf from 'render-if';

import {
  Button,
  // CardSection,
  // ShapedTextInput,
  Spinner,
} from '../../common/';

class LearnWithout extends Component {
  state = {
    word: 'shoes',
    sentence: 'I bought new shoes from the store next to our home',
    disabled: false
  }
  componentWillMount() {
    Tts.setDefaultRate(0.45);
  }
  componentDidMount() {
    // Tts.voices().then(voices => console.log(voices));
    Tts.addEventListener('tts-start', (event) => { this.setState({ disabled: true }); console.log(event); });
    Tts.addEventListener('tts-finish', (event) => { this.setState({ disabled: false }); console.log(event); });
  }
  componentWillUnmount() {
    Tts.removeEventListener('tts-start', (event) => { this.setState({ disabled: true }); console.log(event); });
    Tts.removeEventListener('tts-finish', (event) => { this.setState({ disabled: false }); console.log(event); });
  }
  onPressMe() {
    Actions.LearnWithPhotoHolder();
  }
  textToSpeech(text) {
    Tts.setDefaultVoice('com.apple.ttsbundle.Daniel-compact');
    Tts.speak(text).then((res) => { console.log(res); }).catch((res) => { console.log(res); });
  }
  renderButton() {
    if (this.props.loading) {
      return <Spinner size='large' />;
    }
    return (
      <Button
        text={this.props.lang.title.submit}
        style={styles.submitButton}
        textStyle={styles.submitButtonText}
        onPressMe={this.onPressMe.bind(this)}
      />
    );
  }
  render() {
    return (
      <View style={styles.holder}>
        <ScrollView style={styles.ScrollView}>
          <View style={styles.translateHolder}>
            <Text style={styles.wordEnglish}>{this.state.word}</Text>
            <Text style={styles.wordTurkish}>{'Sample Tr'}</Text>
          </View>
          <View style={styles.imageWrapper}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={this.textToSpeech.bind(this, this.state.word)} style={styles.translateHolderButton} disabled={this.state.disabled}>
                <View style={styles.translateHolderIcon}>
                  {renderIf(!this.state.disabled)(
                    <Icon name='volume-2' size={50} color='white' />
                  )}
                  {renderIf(this.state.disabled)(
                    <Spinner size='large' colors='white' />
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.sentenceHolder}>
            <TouchableOpacity onPress={this.textToSpeech.bind(this, this.state.sentence)} disabled={this.state.disabled}>
              <View style={styles.sentenceHolderIcon}>
                {renderIf(!this.state.disabled)(
                  <Icon name='volume-2' size={20} color='white' />
                )}
                {renderIf(this.state.disabled)(
                  <Spinner size='small' colors='white' />
                )}
              </View>
            </TouchableOpacity>
            <Text style={styles.sentence}>{this.state.sentence}</Text>
          </View>
          <View style={styles.explainHolder}>
            <Text style={styles.explain}>{'it is just a placeholder this data should come from the local storage, but did u learn what to doI bought New Shoes from the shoppi mall and I like it but did u learn what to do'}</Text>
          </View>
          <View style={{ flex: 2, paddingBottom: 10 }}>
            {this.renderButton()}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  holder: {
    flex: 9,
    backgroundColor: '#f2fcfd'
  },
  ScrollView: {
    backgroundColor: '#f2fcfd',
  },
  translateHolder: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15
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
    width: (Dimensions.get('window').width) / 4,
    height: (Dimensions.get('window').width) / 4,
    borderRadius: (Dimensions.get('window').width) / 8
  },
  imageWrapper: {
    flex: 1,
    paddingTop: 5,
    alignItems: 'center'
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
    flex: 1,
    padding: 25,
    paddingTop: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#f2fcfd'
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
    fontSize: 30,
    fontWeight: '600',
    color: '#000'
  },
  wordTurkish: {
    fontSize: 25,
    fontWeight: '400',
    color: '#666666'
  }
};

export default LearnWithout;
