import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  ListView,
  //Image,
  // Alert,
  //ScrollView,
  // ScrollView,
  //Dimensions,
  //Animated,
  TouchableOpacity,
} from 'react-native';
//import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { Actions } from 'react-native-router-flux';
//import renderIf from 'render-if';

import {
  // Header,
  Button,
} from '../common/';
import generalUtils from '../../utils/generalUtils';

const _ = require('lodash');

class Answer extends Component {
  state = {
selected: false,
wordName: 'word'
  }
  handler() {
    this.props.handler(this.props.refa);
  }
  render() {
    return (
    <View style={[{backgroundColor:'white', flex:1, borderColor: '#d7d7d7'}, this.props.refa!== 3 ? { borderBottomWidth: 1 } : { borderBottomWidth: 0 }]}>
      <TouchableOpacity onPress={this.handler.bind(this)} style={{ flex: 1,backgroundColor: 'white' }}>
        <View style={[styles.itemStyle, this.props.selected === this.props.refa ? {backgroundColor: 'green'} : {backgroundColor: 'white'}]}>
          <Text style={[styles.wordEnglish, this.props.selected === this.props.refa ? {color: 'white'}:{color: 'black'}]}>{this.props.data[0]}</Text>
        </View>
      </TouchableOpacity>
    </View>
    );
  }
};
class QuizHolder extends Component {
  state = {
    dataSource: null,
    disable: true,
    selected: null,
    answers: null,
    result: 0
  };
  componentWillMount() {
    this.allToUpdate = [];
    this.maxTe = this.props.quizes.length;
    this.words = this.props.quizes;
    generalUtils.storageGetItem('todayWords').then((data) => {
      this.wordsData = data;
      generalUtils.storageGetItem('reminder').then((reminders) => {
        this.reminders = reminders;
        this.renderIT(this.words);
      });
      });
  }
  getIt() {
    if (this.state.dataSource && this.state.answers) {
      return this.state.answers.map((option, key) =>
        <Answer data={option} refa={key} key={key} handler={this.handler.bind(this)} selected={this.state.selected} />
      );
    }
    return <Text>Loading..</Text>;
  }
  updateReminder(wordId) {
    this.reminders[wordId][1] = this.reminders[wordId][1] === 4 ? 0 : this.reminders[wordId][1] + 1;
  }
  handler(idko) {
    if (this.state.answers[idko][0] === 'correct') {
    this.setState({ selected: idko, disable: false, result: 1 });
  } else {
    this.setState({ selected: idko, disable: false, result: -1 });
  }
  }
  readyTogo() {
    this.allToUpdate.push([this.currentId, this.state.result]);
    if (this.last) {
      this.repeat = [];
      generalUtils.storageSetItem('reminder', this.reminders);
      if (this.props.updateNotificaion) {
        generalUtils.storageGetItem('todayFlow').then((todayFlow) => {
          this.todayFlowNew = todayFlow;
          this.todayFlowNew[this.props.iK][1] = 1;
          generalUtils.storageSetItem('todayFlow', this.todayFlowNew).then(() => {
            generalUtils.storageGetItem('showVSquiz').then((showVSquiz) => {
              this.showVSquiz = showVSquiz;
              for(var i=0;i < this.allToUpdate.length; i++){
                if(this.props.action === 1){
                  this.showVSquiz[this.allToUpdate[i][0]][1] = this.allToUpdate[i][1]  === 1 ? 1 : 3;
                }else{
                this.showVSquiz[this.allToUpdate[i][0]][1] = this.allToUpdate[i][1]  === 1 ? 1 : 2;
                }
                if(this.allToUpdate[i][1]  === -1){
                  this.repeat.push([this.allToUpdate[i][0],0]);
                }
              }
              generalUtils.storageSetItem('showVSquiz', this.showVSquiz).then(() => {
                if(this.repeat.length>0){
                  Actions.LearnWithPhotoHolder({ action: 'notNew', updateNotificaion: false, words: this.repeat, iK: i });
                }else{
                  Actions.FlowDirector();
                }
              });
            });
          });
        });
      } else {
        Actions.FlowDirector();
      }
    } else {
      this.words[this.keyF][1] = 1;
      this.setState({ selected: null, disable:true });
      this.renderIT(this.words);
    }
  }
  renderIT(wordstemp) {
    this.tempwords = wordstemp;

      this.continueSearch=true;
      this.whichstep=0;
      for(var i=0;i < this.tempwords.length; i++){
      if(this.tempwords[i][1]===0 && this.continueSearch){
        this.continueSearch=false;
        this.whichstep = i + 1;
        this.keyF=i;
        if (this.whichstep === this.maxTe) {
          this.last = true;
        }

        this.currentId = this.tempwords[this.keyF][0];
      this.currentSentenceId = this.reminders[this.currentId][1];
      this.currentWordData = this.wordsData[this.currentId].quizes[this.currentSentenceId];
      this.currentWordData.word = this.wordsData[this.currentId].details.english;
      this.updateReminder(this.currentId);
      this.setState({ dataSource: this.currentWordData, wordName: this.currentWordData.word }, () => {
        const temp = [];
        temp.push(['correct', this.state.dataSource.correct]);
        temp.push(['wrong1', this.state.dataSource.wrong1]);
        temp.push(['wrong2', this.state.dataSource.wrong2]);
        temp.push(['wrong3', this.state.dataSource.wrong3]);
        this.answers = _.shuffle(temp);
        this.setState({ answers: this.answers });
      });
    }
  }

    //    this.setState({ dataSource: ds.cloneWithRows(data2) });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{this.props.lang.text.question} "{this.state.wordName}"</Text>
        </View>
        <View style={styles.listHolder}>
          {this.getIt()}
        </View>
        <View style={styles.buttonHolder}>
          <Button
            text={this.props.lang.title.startLearn}
            style={styles.SignUpButton}
            textStyle={styles.SignUpButtonText}
            onPressMe={this.readyTogo.bind(this)}
            disabled={this.state.disable}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#00cccc',
    paddingTop: 70
  },
  SignUpButton: {
    borderRadius: 20,
    marginLeft: 90,
    marginRight: 90,
    backgroundColor: 'rgba(255,255,255,1)',
    marginTop: 10,
    flex: 1
  },
  SignUpButtonText: {
    alignSelf: 'center',
    color: '#00cccc',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  SignUpButton2: {
    borderRadius: 20,
    backgroundColor: '#ffb434',
    marginTop: 10,
  },
  SignUpButtonText2: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  listHolder: {
    flex: 7,
    marginTop: 10,
    marginRight: 30,
    marginLeft: 30,
    borderRadius: 5,
    backgroundColor: 'white'
  },
  buttonHolder: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonH1: {
    flex: 0.7,
    alignSelf: 'stretch',
  },
  buttonH2: {
    flex: 1,
    alignSelf: 'stretch',
  },
  buttonH3: {
    flex: 0.7,
    alignSelf: 'stretch',
  },
  headerText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center'
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 40,
    paddingRight: 40
  },
  itemStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wordEnglish: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000'
  },
  wordTurkish: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#666666'
  },
});
export { QuizHolder };
