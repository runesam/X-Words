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
import interestsDataOrigin from './json/interestsData.json';

const _ = require('lodash');

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

const Interest = class Interest extends Component {
  state = {
    active: this.props.data.active
  }
  onPressMe() {
    this.props.updateData(this.props.data.id, !this.state.active);
    this.setState({ active: !this.state.active });
  }
  render() {
    return (
      <TouchableWithoutFeedback onPress={this.onPressMe.bind(this)}>
        <View style={styles.itemContainer}>
          {renderIf(this.state.active)(
            <Icon name='check' size={20} color={'white'} />
          )}
          <Text style={[styles.itemText, this.state.active ? { color: 'white' } : { color: '#c5c4d6' }]}>
            {this.props.data.text}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
};

class Interests extends Component {
  state = {
    dataSource: ds.cloneWithRows(interestsDataOrigin),
    interestsStorage: interestsDataOrigin,
    Interests: [],
  }
  componentWillMount() {
    generalUtils.storageGetItem('interestsData').done((response) => {
      if (response) {
        console.log(this.state.dataSource);
        this.setState({ dataSource: ds.cloneWithRows(response) });
      } else {
        this.setState({ dataSource: ds.cloneWithRows(interestsDataOrigin) });
      }
    });
  }
  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }
  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }
  onPressMe() {
    const interestsApi = [];
    this.state.Interests.map((value) =>
      interestsApi.push(_.filter(interestsDataOrigin, (o) => o.id === value)[0])
    );
    setTimeout(() => {
      console.log(interestsApi);
    }, 10);
  }
  handleAppStateChange() {

  }
  updateData(data, state) {
    const temp = this.state.Interests;
    if (state) {
      temp.push(data);
    } else {
      _.remove(temp, (n) =>
        n === data
      );
    }
    const tempVar = interestsDataOrigin;
    _.forEach(temp, (value) => {
      tempVar[value].active = true;
    });
    generalUtils.storageSetItem('interestsData', tempVar);
  }
  renderRow() {
    return (data) =>
      <Interest data={data} updateData={this.updateData.bind(this)} />
    ;
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerText}>
            {this.props.lang.text.interests_text}
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
            style={styles.InterestsButton}
            textStyle={[styles.InterestsButtonText, this.state.valid ? { color: '#ff0050' } : { color: '#c5c4d6' }]}
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
  InterestsButton: {
    borderRadius: 20,
    backgroundColor: 'white',
    width: 120
  },
  InterestsButtonText: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '600',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5
  },
});

module.exports = Interests;
