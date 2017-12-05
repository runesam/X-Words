import React, { Component } from 'react';
import {
  StyleSheet,
  // Text,
  View,
  // Alert,
  // ListView,
  //Image,
  // Alert,
  //ScrollView,
  // ScrollView,
  //Dimensions,
  //Animated,
  //TouchableOpacity
} from 'react-native';
//import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { Actions } from 'react-native-router-flux';
//import renderIf from 'render-if';

import {
  // Header,
  // Button,
} from '../common/';
import generalUtils from '../../utils/generalUtils';

class FlowDirector extends Component {
  state = {
    getLink: 'update_words_results'
  };
  componentWillMount() {
    this.faks = new Date().getTime();
    this.checkday = null;
    this.results = [];
    generalUtils.storageGetItem('showVSquiz').then((showVSquiz) => {
      generalUtils.storageGetItem('wordsPerDay').then((wordsPerDay) => {
        generalUtils.storageGetItem('todayFlow').then((todayFlow) => {
          generalUtils.storageGetItem('day').then((day) => {
            this.checkday = day;
            this.newDate = null;
            this.showVSquiz = showVSquiz;
            this.contin = true;
            this.left = 0;
            this.missed = 0;
            this.words = [];
            const date = new Date();
            this.newDate = parseInt(date.toLocaleDateString('en-GB').split('/').join(''), 10);
            for (let i = 0; i < todayFlow.length; i++) {
              if (this.contin) {
                if ((todayFlow[i][1] === 0 && this.faks > todayFlow[i][0]) || (todayFlow[i][1] === 0 && this.checkday !== this.newDate)) {
                  // 0 means not finished and > means time passed
                  if (todayFlow[i][2] === 0) {
                    // its time to show messages
                    this.contin = false;
                    this.x = 2;
                    if (wordsPerDay) {
                      this.x = wordsPerDay / 5;
                    }
                    this.counter = 0;
                    Object.keys(showVSquiz).forEach((key) => {
                      if (showVSquiz[key][0] === 0 && this.counter < this.x) {
                        this.counter++;
                        this.words.push([key, 0]);
                        this.missed++;
                      }
                    });
                    Actions.LearnWithPhotoHolder({ action: 'notNew', updateNotificaion: true, words: this.words, iK: i });
                  } else if (todayFlow[i][2] === 1) {
                    this.contin = false;
                    this.x = 2;
                    if (wordsPerDay) {
                      this.x = wordsPerDay / 5;
                    }
                    this.counter = 0;
                    Object.keys(showVSquiz).forEach(key => {
                      if (showVSquiz[key][1] === 0 && this.counter < this.x) {
                        this.counter++;
                        this.words.push([key, 0]);
                        this.missed++;
                      }
                    });
                    Actions.QuizHolder({ action: false, updateNotificaion: true, quizes: this.words, iK: i });
                  } else if (todayFlow[i][2] === 2) {
                    this.contin = false;
                    this.words = [];
                    this.counter = 0;
                    Object.keys(showVSquiz).forEach(key => {
                      console.log(key);
                      if (showVSquiz[key][1] === 2) {
                        this.counter++;
                        this.words.push([key, 0]);
                        this.missed++;
                      }
                    });
                    if (this.words.length > 0) {
                      Actions.QuizHolder({ action: 1, updateNotificaion: true, quizes: this.words, iK: i });
                    }
                  }
                }
              } else if (todayFlow[i][1] === 0) {
                this.left++;
              }
            }
            console.log();
            if (this.missed === 0) {
              console.log('ak');
              if (this.checkday !== this.newDate) {
                Object.keys(this.showVSquiz).forEach(key => {
                  this.results[key] = showVSquiz[key][1];
                });
                console.log(this.results);
                generalUtils.storageGetItem('memberId').then((memberId) => {
                  const apiData = {};
                  apiData.memberId = memberId;
                  apiData.results = this.results;
                  console.log(apiData);
                  generalUtils.setDataFromApi(this.state.getLink, apiData).then(res => {
                    console.log(res);
                    if (res.result === 'SUCCESFUL') {
                      generalUtils.storageSetItem('learnstatus', 'passed');
                      console.log('kakak');
                      Actions.HomePageHolder();
                    } else {
                      Actions.refresh();
                    }
                  }).catch(reason => console.log(reason));
                });
              } else {
                Actions.HomePageHolder();
              }
            }
          });
        });
      });
    });
  }
  ComponentDidMount() {

  }
  emptyTogo() {

  }
  render() {
    return <View style={styles.container} />;
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#00cccc',
    paddingTop: 70
  },
});
export { FlowDirector };
