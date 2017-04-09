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

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

const Level = class Level extends Component {
  state = {

  }

  onPressMe() {
    console.log('as');
  }
  render() {
    const styles = {
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
    };
    return (
      <TouchableOpacity onPress={this.onPressMe}>
        <View style={styles.itemStyle}>
          <Text style={styles.wordEnglish}>{this.props.data.details.english}</Text>
          <Text style={styles.wordTurkish}>{this.props.data.details.turkish}</Text>
        </View>
      </TouchableOpacity>
    );
  }
};

class QuizHolder extends Component {
  state = {
    dataSource: ds.cloneWithRows([]),
    disable: true
  };
  componentWillMount() {
        generalUtils.storageGetItem('todayWords').then((data2) => {
        this.setState({ dataSource: ds.cloneWithRows(data2) });
    });
  }
  ComponentDidMount() {

  }
  readyTogo() {
    generalUtils.storageSetItem('status', 'confirmed');
    Actions.LearnWithPhotoHolder({ action: 'newDay' });
  }
  emptyTogo() {
    Alert.alert(
  this.props.lang.title.cancelBox,
  this.props.lang.title.cancelBoxText,
  [
    { text: this.props.lang.title.cancelBoxbutton, onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
    { text: this.props.lang.title.okBox,
    onPress: () => {
      generalUtils.storageSetItem('status', 'ready');
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
      <View style={styles.header}>
        <Text style={styles.headerText}>{this.props.lang.text.question}</Text>
      </View>
    <View style={styles.listHolder}>
    <ListView
      style={{ flex: 1 }}
      dataSource={this.state.dataSource}
      renderRow={this.renderRow()}
      enableEmptySections
    />
    </View>

    <View style={styles.buttonHolder}>
      <Button
        text={this.props.lang.title.startLearn}
        style={styles.SignUpButton}
        textStyle={styles.SignUpButtonText}
        onPressMe={this.readyTogo}
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
});
export { QuizHolder };
