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
import { Actions } from 'react-native-router-flux';
import {
  Button,
  // CardSection,
  // ShapedTextInput,
  Spinner,
  // PickerView,
  // PickerButton,
  // HscrollView
} from './common/';
import generalUtils from '../utils/generalUtils';
// import levelOptionDataOrigin from '../json/levelOptionData.json';

const _ = require('lodash');

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

const Level = class Interest extends Component {
  state = {

  }
  onPressMe() {
    this.props.updateData(parseInt(this.props.data.level_id, 10));
  }
  render() {
    return (
      <TouchableWithoutFeedback onPress={this.onPressMe.bind(this)}>
        <View style={styles.itemContainer}>
          {renderIf(this.props.data.active)(
            <Icon name='check' size={20} color={'white'} />
          )}
          <Text style={[styles.itemText, this.props.data.active ? { color: 'white' } : { color: '#c5c4d6' }]}>
            {this.props.data.level_name}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
};

class Levels extends Component {
  state = {
    dataSource: ds.cloneWithRows([]),
    levelsStorage: null,
    Levels: null,
    selectedLevel: null,
    dataCame: false
  }
  componentWillMount() {
    generalUtils.getDataFromApi('levels')
      .then(data => {
        const filterLevels = _.filter(data, (o) => o.active === true);
        const tempLevels = [];
        filterLevels.map((value) =>
          tempLevels.push(parseInt(value.level_id, 10))
        );
        this.setState({ dataSource: ds.cloneWithRows(data), dataCame: true, levelsStorage: data, Levels: tempLevels });
      })
      .catch(reason => console.log(reason));
  }
  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }
  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }
  onPressMe() {
    generalUtils.storageSetItem('levelOptionData', this.state.selectedLevel);
    generalUtils.storageGetItem('levelOptionData').then((data) => console.log(data));
    Actions.signup();
  }
  handleAppStateChange() {

  }
  updateData(data) {
    this.setState({ dataCame: false });
    const temp = this.state.levelsStorage;
    this.state.levelsStorage.map((value) => {
      const key = _.findIndex(temp, (o) => parseInt(o.level_id, 10) === parseInt(value.level_id, 10));
      if (parseInt(value.level_id, 10) === data) {
        temp[key].active = true;
      } else {
        temp[key].active = false;
      }
      return false;
    });
    this.setState({
      selectedLevel: data,
      dataSource: ds.cloneWithRows(temp),
      dataCame: true
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
            {renderIf(this.state.dataCame)(
              <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow()}
              />
            )}
            {renderIf(!this.state.dataCame)(
              <Spinner size='large' style={styles.spinnerStyle} />
            )}
          </ScrollView>
        </View>
        <View style={styles.bottonView}>
          <Button
            text={this.props.lang.title.continue}
            style={styles.LevelsButton}
            textStyle={styles.LevelsButtonText}
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
    color: '#ff0050',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5
  },
});

module.exports = Levels;
