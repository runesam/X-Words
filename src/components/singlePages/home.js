import React, { Component } from 'react';
// import firebase from 'firebase';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Alert,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Loader from 'react-native-spinkit';
// import renderIf from 'render-if';
// import Icon from 'react-native-vector-icons/FontAwesome';
import PushNotification from 'react-native-push-notification';
import { Button } from '../common/';
import generalUtils from '../../utils/generalUtils';
import images from '../../json/images.json';
// const _ = require('lodash');
class HomePageHolder extends Component {
  state= {
    days: 10,
    words: 130,
    status: '',
    toDo: null,
    loading: false,
    starter: this.props.lang.text.starter,
    startLearn: this.props.lang.title.startLearn,
    type: null
  }
  componentWillMount() {
    const types = ['CircleFlip', 'Bounce', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce', 'Circle', '9CubeGrid', 'FadingCircle', 'FadingCircleAlt'];
    let i = 10;
    setInterval(() => {
      i = i === types.length - 1 ? 0 : i + 1;
    }, 2000);
    PushNotification.configure({
      onRegister: (token) => {
        console.log('TOKEN:', token);
      },
      onNotification: (notification) => {
        console.log(notification);
        Actions.FlowDirector();
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
    generalUtils.storageSetItem('endDate', null);
    generalUtils.storageSetItem('learnstatus', 'ready');
    this.checkstatus = null;
    this.checkMemberId = null;
    this.checkday = null;
    this.missed = 0;
    //generalUtils.storageGetAllItems();
    this.faks = new Date().getTime();
    //  this.faks = new Date().getTime()+ (14 * 3600000);
    generalUtils.storageGetItem('learnstatus').then((status) => {
      this.checksStatus = status;
      this.setState({ status });
      generalUtils.storageGetItem('memeberId').then((memeberId) => {
        this.checkMemberId = memeberId;
        generalUtils.storageGetItem('day').then((day) => {
          this.checkday = day;
          generalUtils.storageGetItem('endDate').then((endDate) => {
            if (this.props.replaceColor) {
              this.props.replaceColor('white');
            }
            if (this.faks < endDate) {
              console.log('not here');
            } else {
              // Actions.PurchaseHolder();
            }
            let buttonT = '';
            let textT = '';
            const date = new Date();
            const newDate = parseInt(date.toLocaleDateString('en-GB').split('/').join(''), 10);
            switch (this.checksStatus) {
              case 'confirmed':
              buttonT = this.props.lang.title.startLearn;
              textT = this.props.lang.text.choosedAlready;
              break;
              case 'choosed':
              buttonT = this.props.lang.title.startLearn;
              textT = this.props.lang.text.choosedAlready;
              break;
              case 'finished':
              generalUtils.storageGetItem('todayFlow').then((todayFlow) => {
                for (let t = 0; t < todayFlow.length; t++) {
                  if (this.checkday === newDate) {
                    if (todayFlow[t][1] === 0 && this.faks > todayFlow[t][0]) {
                      this.missed++;
                    }
                  } else if (todayFlow[t][1] === 0) {
                    this.missed++;
                  }
                }
                if (this.missed === 0) {
                  if (this.checkday === newDate) {
                    this.setState({
                      starter: this.props.lang.text.learnAlready,
                      startLearn: this.props.lang.title.takeQuize,
                    });
                  } else {
                    this.setState({ status: 'finished' });
                    this.setState({
                      starter: this.props.lang.text.saveTodayWork,
                      startLearn: this.props.lang.title.saveWork,
                    });
                  }
                } else {
                  this.setState({
                    toDo: this.missed,
                    starter: this.props.lang.text.missedAlready + this.missed,
                    startLearn: this.props.lang.title.continue,
                  });
                }
              });
              break;
              case 'passed':
              this.setState({ status: 'ready' });
              if (this.checkday === newDate) {
                buttonT = this.props.lang.title.takeQuize;
                textT = this.props.lang.text.learnAlready;
              } else {
                buttonT = this.props.lang.title.chooseWords;
                textT = this.props.lang.text.starter;
                generalUtils.storageSetItem('learnstatus', 'ready');
              }
              break;
              default:
              buttonT = this.props.lang.title.chooseWords;
              textT = this.props.lang.text.starter;
              this.setState({ status: 'ready' });
            }
            this.setState({
              starter: textT,
              startLearn: buttonT,
            });
          });
        });
      });
    });
  }
  componentWillReceiveProps(nextProps) {
    Alert.alert(nextProps.toGo);
  }
  goSomewhere() {
    if (this.state.status === 'choosed') {
      Actions.ConfirmWords();
    } else if (this.state.status === 'confirmed') {
      Actions.LearnWithPhotoHolder({ action: 'newDay' });
    } else if (this.state.status === 'ready') {
      Actions.ChooseWordsHolder();
    } else if (this.state.status === 'finished') {
      const date = new Date();
      const newDate = parseInt(date.toLocaleDateString('en-GB').split('/').join(''), 10);
      if (this.missed === 0) {
        if (this.checkday === newDate) {
          Alert.alert('Not Ready', 'No Work to do for now follow notifcation');
        } else {
          Actions.FlowDirector();
        }
      } else {
        Actions.FlowDirector();
      }
    } else if (this.state.status === 'passed') {
      Actions.ChooseWordsHolder();
    }
  }
  renderLoader() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
          <Loader color='black' size={50} type={this.state.type} />
        </View>
      );
    }
    return (
      <ScrollView style={styles.scrollView} contentContainerStyle={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.spacer} />
          <View style={styles.header}>
            <Text style={styles.headerText}>{this.props.lang.text.welcome}</Text>
          </View>
          <View style={styles.statistics}>
            <View style={styles.popUpContainer}>
              <View style={styles.spacepop} />
              <View style={styles.popUp}>
                <Text style={styles.popText}>{`${this.props.lang.title.days}: ${this.state.days}`}</Text>
                <Text style={styles.popText}>{`${this.props.lang.title.words}: ${this.state.words}`}</Text>
              </View>
            </View>
            <View style={styles.photoHolder}>
              <Image source={{ uri: images.birdImage.data }} style={styles.birdImage} />
            </View>
          </View>
          <View style={styles.startHolder}>
            <Text style={styles.headerText}>{this.state.starter}</Text>
            <Button
              text={this.state.startLearn}
              style={styles.SignUpButton}
              textStyle={styles.SignUpButtonText}
              onPressMe={this.goSomewhere.bind(this)}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <StatusBar barStyle='light-content' />
        <View style={{ flex: 10.5 }} >
          {this.renderLoader()}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  SignUpButton: {
    borderRadius: 20,
    marginLeft: 90,
    marginRight: 90,
    backgroundColor: 'rgba(255,255,255,1)',
    marginTop: 10,
  },
  SignUpButtonText: {
    alignSelf: 'center',
    color: '#00cccc',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  scrollView: {
    flex: 1
  },
  container: {
    flex: 1
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#00cccc',
    paddingBottom: 50
  },
  spacer: {
    flex: 0.5
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00cccc',
    paddingLeft: 40,
    paddingRight: 40
  },
  headerText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center'
  },
  popText: {
    fontSize: 18,
    color: '#00cccc',
    textAlign: 'center'
  },
  statistics: {
    flex: 3.5,
    flexDirection: 'row',
  },
  popUpContainer: {
    flex: 5,
    flexDirection: 'row',
    height: 80,
    marginTop: 10
  },
  spacepop: {
    flex: 1
  },
  popUp: {
    backgroundColor: 'white',
    borderRadius: 10,
    flex: 4,
    justifyContent: 'center'
  },
  photoHolder: {
    flex: 7,
    justifyContent: 'flex-end',
  },
  birdImage: {
    height: 160,
    width: 180,
    marginLeft: 10
  },
  startHolder: {
    flex: 1.5,
    justifyContent: 'center'
  },
});

export { HomePageHolder };
