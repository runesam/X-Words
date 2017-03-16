import React, { Component } from 'react';
// import firebase from 'firebase';
import {
  StyleSheet,
  ListView,
  View,
  Text,
  // Alert,
  // StatusBar,
  AppState,
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native';
import renderIf from 'render-if';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Button,
  // CardSection,
  // ShapedTextInput,
  // Spinner,
  // PickerView,
  // PickerButton,
  // HscrollView
} from './common/';
import generalUtils from '../utils/generalUtils';
import levelOptionDataOrigin from '../json/levelOptionData.json';

const _ = require('lodash');

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

const Level = class Interest extends Component {
  state = {

  }
  onPressMe() {
    this.props.updateData(this.props.data.id);
  }
  render() {
    return (
      <TouchableWithoutFeedback onPress={this.onPressMe.bind(this)}>
        <View style={styles.itemContainer}>
          {renderIf(this.props.data.active)(
            <Icon name='check' size={20} color={'white'} />
          )}
          <Text style={[styles.itemText, this.props.data.active ? { color: 'white' } : { color: '#c5c4d6' }]}>
            {this.props.data.text}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
};

class Levels extends Component {
  state = {
    dataSource: ds.cloneWithRows(levelOptionDataOrigin),
    levelsStorage: levelOptionDataOrigin,
    Levels: [],
    reRender: true
  }
  componentWillMount() {
    generalUtils.getDataFromApi('interests');
  }
  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }
  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }
  onPressMe() {
    const levelsApi = _.filter(levelOptionDataOrigin, (o) => o.id === this.state.selectedLevel)[0];
    setTimeout(() => {
      console.log(levelsApi);
    }, 10);
  }
  handleAppStateChange() {

  }
  updateData(data) {
    const temp = levelOptionDataOrigin;
    console.log(data);
    Object.keys(temp).forEach((key) => {
      console.log(key);
      if (parseInt(key, 10) !== data) {
        temp[key].active = false;
      } else {
        temp[data].active = true;
      }
    });
    console.log(temp);
    this.setState({
      selectedLevel: data,
      dataSource: ds.cloneWithRows(temp),
    });
  }
  renderRow() {
    return (data) =>
      <Level data={data} updateData={this.updateData.bind(this)} />
    ;
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerText}>
            {this.props.lang.text.levels_text}
          </Text>
        </View>
        <View style={{ flex: 10 }}>
          <ScrollView style={styles.itemsContainer} showsVerticalScrollIndicator={false}>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderRow()}
            />
          </ScrollView>
        </View>
        <View style={styles.bottonView}>
          <Button
            text={this.props.lang.title.continue}
            style={styles.LevelsButton}
            textStyle={[styles.LevelsButtonText, this.state.valid ? { color: '#ff0050' } : { color: '#c5c4d6' }]}
            // disabled={!this.state.valid}
            onPressMe={this.onPressMe.bind(this)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#ff0050',
  },
  headerText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
    fontWeight: '700',
    marginBottom: 10
  },
  itemsContainer: {
    flex: 20
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 10,
    paddingTop: 10,
    marginRight: 10
  },
  itemText: {
    paddingLeft: 10,
    fontWeight: '900',
    fontSize: 16,
  },
  bottonView: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  LevelsButton: {
    borderRadius: 20,
    backgroundColor: 'white',
    width: 120
  },
  LevelsButtonText: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '600',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5
  },
});

module.exports = Levels;
