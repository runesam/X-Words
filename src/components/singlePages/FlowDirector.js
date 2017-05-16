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
  //TouchableOpacity
} from 'react-native';
//import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { Actions } from 'react-native-router-flux';
//import renderIf from 'render-if';

import {
  // Header,
  Button,
} from '../common/';
import generalUtils from '../../utils/generalUtils';
class FlowDirector extends Component {
  state = {

  };
  componentWillMount() {
    this.faks = new Date().getTime();
    generalUtils.storageGetItem('showVSquiz').then((showVSquiz) => {
    generalUtils.storageGetItem('wordsPerDay').then((wordsPerDay) => {
    generalUtils.storageGetItem('todayFlow').then((todayFlow) => {
      this.contin=true;
      this.left=0;
      for(var i=0;i<todayFlow.length;i++){
        if(this.contin){
        if(todayFlow[i][1] === 0 &&  this.faks > todayFlow[i][0] ){ // 0 means not finished and > means time passed
          if(todayFlow[i][2]===0){
            // its time to show messages
            this.contin = false;
                this.words = [];
                this.x = 2;
                if (wordsPerDay){
                  this.x = wordsPerDay / 5;
                }
                this.counter = 0;
                Object.keys(showVSquiz).forEach(function(key, index) {
                  if (showVSquiz[key][0] === 0 && this.counter < this.x) {
                    this.counter++;
                    this.words.push([key,0]);
                  }
                }.bind(this));
                Actions.LearnWithPhotoHolder({ action: 'notNew', updateNotificaion: true, words: this.words, iK: i });
          } else if (todayFlow[i][2] === 1) {
            this.contin = false;
            this.words = [];
            this.x = 2;
            if (wordsPerDay){
              this.x = wordsPerDay / 5;
            }
            this.counter = 0;
            Object.keys(showVSquiz).forEach(function(key, index) {
              if (showVSquiz[key][1] === 0 && this.counter < this.x) {
                this.counter++;
                this.words.push([key,0]);
              }
            }.bind(this));
              Actions.QuizHolder({ action: false, updateNotificaion: true, quizes: this.words, iK: i });
          } else if (todayFlow[i][2] === 2) {
            this.contin = false;
            this.words = [];
            this.x = 2;
            if (wordsPerDay){
              this.x = wordsPerDay / 5;
            }
            this.counter = 0;
            Object.keys(showVSquiz).forEach(function(key, index) {
              if (showVSquiz[key][1] === 2 && this.counter < this.x) {
                this.counter++;
                this.words.push([key,0]);
              }
            }.bind(this));
              Actions.QuizHolder({ action: 1, updateNotificaion: true, quizes: this.words, iK: i });
          }
        this.missed++;
      } else if(todayFlow[i][1] === 0 ){
        this.left++;
      }
        }
      }
      if(this.left===0){
         generalUtils.storageSetItem('learnstatus', 'passed');
         //update learned
      }
      if(this.missed === 0){
        Action.HomePageHolder();
      }
    });
    });
    });
  }
  ComponentDidMount() {

  }
  emptyTogo() {

  }

render() {
  return (
    <View style={styles.container}>

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
});
export { FlowDirector };
