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

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

const Level = class Level extends Component {
  state = {

  }

  onPressMe() {
  }
  render() {
    return (
        <View style={styles.itemStyle}>
          <Text style={styles.wordEnglish}>{this.props.data.details.english}</Text>
          <Text style={styles.wordTurkish}>{this.props.data.details.turkish}</Text>
        </View>
    );
  }
};

class ConfirmWords extends Component {
  state = {
    dataSource: ds.cloneWithRows([]),
  };
  componentWillMount() {
    this.start = 0;
    this.steps = 5;
    this.notificationsTimes = [];

    generalUtils.storageGetItem('learnstatus').then((data) => {
      if (data !== 'choosed') {
        Actions.pop();
      } else {
        generalUtils.storageGetItem('todayWords').then((data2) => {
        this.setState({ dataSource: ds.cloneWithRows(data2) });
        //console.log(Object.keys(data2).length);
        this.nowTime = new Date().getTime();
        // this.nowTime = new Date().getTime() - (10 * 3600000);

        // this.nowTime = new Date().getTime() - (22 * 3600000);
        var d = new Date(this.nowTime); // for now
        var crnt = d.getHours() + (d.getMinutes() / 60);
        if (crnt <= 9 ) {
        this.start = 9 - crnt;
        }else if (crnt <= 11.5 ) {
        this.start = 11.5 - crnt;
        this.steps=4;
        }else if (crnt <= 14 ) {
        this.start = 14-crnt;
        this.steps=3;
        }else if (crnt <= 16.5 ){
        this.start = 16.5  - crnt;
        this.steps=2;
        }else if (crnt <= 19 ) {
        this.start = 19 - crnt;
        this.steps=1;
        }
    });
  }
    });
  }
  ComponentDidMount() {

  }
  readyTogo = () => {
    var PushNotification = require('react-native-push-notification');
    PushNotification.configure({
    onRegister: function(token) {
        console.log( 'TOKEN:', token );
    },
    onNotification: function(notification) {
        console.log( 'NOTIFICATION:', notification );
    },
    permissions: {
        alert: true,
        badge: true,
        sound: true
    },
    popInitialNotification: true,
    requestPermissions: true,
  });

  if (this.start === 0) {  // this is not defined
  alert('You passed day Please press start tomorrow earler');
  Actions.pop();
  } else {
    this.start -= 0.75;
    this.is=0;
    for (var i = 0; i < this.steps; i++) {
    this.start += 0.75;

    this.notificationsTimes[this.is] = [this.nowTime + (this.start * 60 * 60 * 1000 ), 0, 0];
PushNotification.localNotificationSchedule({
message: 'Time To Learn Words', // (required)
date: new Date(Date.now() + (this.start * 60 * 60 * 1000)) // in 60 secs
});
    this.start += 1.75;
    this.is++;
    this.notificationsTimes[this.is] = [this.nowTime + (this.start * 60 * 60 * 1000 ), 0, 1];
    this.is++;
PushNotification.localNotificationSchedule({
message: 'Time For Your Quiz', // (required)
date: new Date(Date.now() + (this.start * 60 * 60 * 1000)) // in 60 secs
});
}
this.start += 1.25;
this.notificationsTimes[this.is] = [this.nowTime + (this.start * 60 * 60 * 1000 ), 0, 2];
PushNotification.localNotificationSchedule({
message: 'Time to fix mistakes', // (required)
date: new Date(Date.now() + (this.start * 60 * 60 * 1000)) // in 60 secs
});
// console.log(this.notificationsTimes);
generalUtils.storageSetItem('todayFlow', this.notificationsTimes);
console.log(this.notificationsTimes);
const date = new Date();
const newDate = parseInt(date.toLocaleDateString('en-GB').split('/').join(''), 10);
generalUtils.storageSetItem('day', newDate);
generalUtils.storageSetItem('learnstatus', 'confirmed');
Actions.LearnWithPhotoHolder({ action: 'newDay' });
  }
  }
  emptyTogo() {
    Alert.alert(
  this.props.lang.title.cancelBox,
  this.props.lang.title.cancelBoxText,
  [
    { text: this.props.lang.title.cancelBoxbutton, onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
    { text: this.props.lang.title.okBox,
    onPress: () => {
      generalUtils.storageSetItem('learnstatus', 'ready');
      generalUtils.storageSetItem('todayWords', null);
      Actions.ChooseWordsHolder();
    } },
  ],
  { cancelable: false }
);
  }
  renderRow() {
      return (data) =>
      <Level data={data} />
      ;
    }
render() {
  return (
    <View style={styles.container}>
    <View style={styles.listHolder}>
    <ListView
      style={{ flex: 1 }}
      dataSource={this.state.dataSource}
      renderRow={this.renderRow()}
      enableEmptySections
    />
    </View>

    <View style={styles.buttonHolder}>
    <View style={styles.buttonH1}>
    <Button
      text={this.props.lang.title.startLearn}
      style={styles.SignUpButton}
      textStyle={styles.SignUpButtonText}
      onPressMe={this.readyTogo}
    />
    </View>
    <View style={styles.buttonH2}></View>
    <View style={styles.buttonH3}>
    <Button
      text={this.props.lang.text.change}
      style={styles.SignUpButton2}
      textStyle={styles.SignUpButtonText2}
      onPressMe={this.emptyTogo.bind(this)}
    />
    </View>
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
    backgroundColor: 'rgba(255,255,255,1)',
    marginTop: 10,
  },
  SignUpButtonText: {
    alignSelf: 'center',
    color: '#01b5cc',
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
    marginRight: 30,
    marginLeft: 30,
    borderRadius: 5,
    backgroundColor: 'white'
  },
  buttonHolder: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 30,
    marginLeft: 30,
    flexDirection: 'row',
  },
  buttonH1: {
    flex: 3,
    alignSelf: 'stretch',
  },
  buttonH2: {
    flex: 1,
    alignSelf: 'stretch',
  },
  buttonH3: {
    flex: 3,
    alignSelf: 'stretch',
  },
  itemStyle: {
    paddingTop: 18,
    paddingBottom: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#d7d7d7',
    borderBottomWidth: 1,
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
export { ConfirmWords };
