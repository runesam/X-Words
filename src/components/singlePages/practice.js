import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  StatusBar,
  Dimensions,
} from 'react-native';
// import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconY from 'react-native-vector-icons/SimpleLineIcons';
import Tts from 'react-native-tts';
import { Spinner, Button } from '../common/';
import user from '../../utils/user';
import generalUtils from '../../utils/generalUtils';
// const _ = require('lodash');


class Question extends Component {
  state= {

  }
  componentWillMount() {
    this.answers = this.props.queue;
    this.setState({ queue: this.props.queue });
  }
  componentDidMount() {
    Tts.addEventListener('tts-finish', this.endingLoader);
  }
  componentWillUnmount() {
    Tts.removeEventListener('tts-finish', this.endingLoader);
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
    return <IconY name='volume-2' size={data[1]} color={this.props.data.lang === 'tr' ? 'gray' : 'white'} />;
  }
  applyHeight(e) {
    this.answersContainerheight = e.nativeEvent.layout.height;
  }
  updateAnswer(data, type) {
    const tempSelectedAnswers = this.state.selectedAnswers ? JSON.parse(JSON.stringify(this.state.selectedAnswers)) : [];
    const tempQueue = JSON.parse(JSON.stringify(this.state.queue));
    if (type === 'answers') {
      tempSelectedAnswers.push(this.props.queue[data].word);
      tempQueue[data].selected = !tempQueue[data].selected;
    } else {
      const index = tempQueue.findIndex((item) => item.word === this.state.selectedAnswers[data]);
      tempSelectedAnswers.splice(data, 1);
      tempQueue[index].selected = !tempQueue[index].selected;
    }
    this.props.updateAnswer(tempSelectedAnswers.join(' '), tempSelectedAnswers.length);
    return this.setState({ selectedAnswers: tempSelectedAnswers.length > 0 ? tempSelectedAnswers : null, queue: tempQueue });
  }
  renderLines() {
    return this.answers.map((value, key) => <View key={key} style={styles.singleLine}></View>);
  }
  renderSelectedWords(data, type) {
    return data ? data.map(
      (value, key) => (
        <TouchableOpacity onPress={this.updateAnswer.bind(this, key, type)} key={key} disabled={type === 'answers' && value.selected}>
          <View style={[styles.singleAnswer, type === 'answers' && value.selected ? { backgroundColor: 'gray' } : { backgroundColor: 'white' }]}>
              <Text style={[styles.singleAnswerText, type === 'answers' && value.selected ? { color: 'gray' } : { color: 'black' }]}>{type === 'answers' ? value.word : value}</Text>
          </View>
        </TouchableOpacity>
      )
    ) : <Text>{this.props.lang.text.choose_answers}</Text>;
  }
  render() {
    if (!this.props.data.question) {
      return <Text>{this.props.lange.text.no_learned_words}</Text>;
    }
    return (
      <View style={styles.questionContainer}>
        <View style={{ flex: 1 }}>
          <Text style={styles.questionTitle}>
            {this.answers.length > 1 ? this.props.lang.text.practice_sentence : this.props.lang.text.practice_word}
          </Text>
        </View>
        <View style={styles.questioningContainer}>
          <TouchableOpacity
            onPress={this.textToSpeech.bind(this, this.props.data.question)}
            style={styles.translateHolderButton}
            disabled={this.props.data.lang === 'tr'}
          >
            <View style={styles.translateHolderIcon}>
              {this.translateHolderIcon(['large', 25])}
            </View>
          </TouchableOpacity>
          <Text style={styles.questioningText}>{this.props.data.question}</Text>
        </View>
        <View style={styles.answersContainer} onLayout={this.applyHeight.bind(this)}>
          <View style={styles.linesContainer}>
            {this.renderLines()}
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {this.renderSelectedWords(this.state.selectedAnswers, 'selectedAnswers')}
          </View>
        </View>
        <View style={styles.answerOptionsContainer}>
          {this.renderSelectedWords(this.state.queue, 'answers')}
        </View>
      </View>
    );
  }
}

class PracticeHolder extends Component {
  state= {

  }
  componentWillMount() {
    // const types = ['CircleFlip', 'Bounce', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce', 'Circle', '9CubeGrid', 'FadingCircle', 'FadingCircleAlt'];
    this.apiData = user.getUserData();
    generalUtils.setDataFromApi('practice', this.apiData).then(data => {
      this.setQuestionData(data);
    }).catch(reason => {
      console.log(reason);
    });
  }
  onPressMe() {
    console.log(this.apiData);
    this.apiData.result = this.result;
    this.apiData.questionId = this.state.data.questionId;
    this.setState({ data: null });
    Alert.alert(
      this.result === 'correct' ? this.props.lang.title.cool : this.props.lang.title.not_cool,
      this.result === 'correct' ? this.props.lang.text.cool_message : this.props.lang.text.not_cool_message,
      [
        {
          text: this.props.lang.title.next,
          onPress: () => generalUtils.setDataFromApi('practice', this.apiData).then(data => {
            this.setQuestionData(data);
          }).catch(reason => {
            console.log(reason);
          })
        },
      ]
    );
  }
  setQuestionData = (data) => {
    if (!data.questionId) {
      return this.setState({ data });
    }
    this.queue = [];
    data.queue.forEach(item => {
      this.queue.push({ selected: false, word: item });
    });
    console.log(data);
    console.log(this.queue);
    this.setState({ data, queue: this.queue });
  }
  updateAnswer(data, answer) {
    this.result = data === this.state.data.answer ? 'correct' : 'wrong';
    this.setState({ validAnswer: answer > 0 });
  }
  renderQuestion() {
    if (this.state.data) {
      return <Question lang={this.props.lang} data={this.state.data} queue={this.state.queue} updateAnswer={this.updateAnswer.bind(this)} />;
    }
    return <Spinner size='large' colors='black' />;
  }
  renderSubmissionButton() {
    if (!this.state.data) {
      return <Spinner size='large' color='black' />;
    }
    return (
      <Button
        text={this.props.lang.title.submit}
        style={styles.submitButton}
        textStyle={styles.submitButtonText}
        onPressMe={this.onPressMe.bind(this)}
        disabled={!this.state.data.questionId || !this.state.validAnswer}
      />
    );
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <StatusBar barStyle='light-content' />
        <View style={styles.headerContainer}>
          <Icon name='bolt' size={25} color='white' />
          <Text style={styles.headerText}>{this.props.lang.title.practice_tab}</Text>
        </View>
        <View style={styles.rowContainer}>
          {this.renderQuestion()}
        </View>
        {this.renderSubmissionButton()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#E6E6E6',
    paddingBottom: 60
  },
  headerContainer: {
    backgroundColor: '#00CCCC',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingBottom: 10,
    flex: 1
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    paddingLeft: 10
  },
  rowContainer: {
    flex: 10,
  },
  questionContainer: {
    flex: 1,
    padding: 20,
    paddingBottom: 0
  },
  questionTitle: {
    fontSize: 20,
    color: 'black',
    fontWeight: '600'
  },
  questioningContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  translateHolderButton: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  translateHolderIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00CCCC',
    width: (Dimensions.get('window').width - 100) / 5,
    height: (Dimensions.get('window').width - 100) / 5,
    borderRadius: (Dimensions.get('window').width - 100) / 8,
    marginRight: 10
  },
  questioningText: {
    fontSize: 20,
    fontWeight: '800',
    color: 'orange'
  },
  answersContainer: {
    flex: 5,
    overflow: 'hidden',
    paddingTop: 10
  },
  answerOptionsContainer: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  linesContainer: {
    position: 'absolute',
    paddingTop: 10,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  singleLine: {
    borderColor: 'gray',
    opacity: 0.3,
    borderBottomWidth: 2,
    width: Dimensions.get('window').width - 40,
    height: Dimensions.get('window').width / 10
  },
  singleAnswer: {
    padding: 10,
    marginRight: 10,
    marginBottom: 3,
    justifyContent: 'center',
    height: (Dimensions.get('window').width / 10) - 3,
    backgroundColor: 'white'
  },
  singleAnswerText: {
    color: 'black'
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#8CDD00',
    justifyContent: 'center',
    alignItems: 'center',
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

  export { PracticeHolder };
