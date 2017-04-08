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
    console.log(this.props.data);
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
    generalUtils.storageGetItem('status').then((data) => {
      if (data !== 'choosed') {
        Actions.HomePageHolder();
      } else {
        generalUtils.storageGetItem('todayWords').then((data2) => {
        this.setState({ dataSource: ds.cloneWithRows(data2) });
    });
  }
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
});
export { ConfirmWords };
