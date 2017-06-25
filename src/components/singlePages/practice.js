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

class PracticeHolder extends Component {
  state= {

  }
  componentWillMount() {
    // generalUtils.storageGetAllItems();
    //Actions.FlowDirector();
    //  generalUtils.storageSetItem('learnstatus', 'ready');
    const types = ['CircleFlip', 'Bounce', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce', 'Circle', '9CubeGrid', 'FadingCircle', 'FadingCircleAlt'];
    let i = 10;
    setInterval(() => {
      i = i === types.length - 1 ? 0 : i + 1;
      //this.setState({ type: types[i] }, () => {
      //  console.log(this.state.type);
      //});
    }, 2000);

  }
  ComponentDidUpdate() {

  }
  goSomewhere() {
        Actions.FlowDirector();
  }
  renderLoader() {
    return (
      <ScrollView style={styles.scrollView} contentContainerStyle={{ flex: 1 }}>
        <View style={styles.container}>
          <Button
            text={this.state.startLearn}
            style={styles.SignUpButton}
            textStyle={styles.SignUpButtonText}
            onPressMe={this.goSomewhere.bind(this)}
          />
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

export { PracticeHolder };
