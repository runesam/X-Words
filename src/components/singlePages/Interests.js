import React, { Component } from 'react';
// import firebase from 'firebase';
import {
  StyleSheet,
  ListView,
  View,
  Text,
  Alert,
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
} from '../common/';
import generalUtils from '../../utils/generalUtils';
// import interestsDataOrigin from '../json/interestsData.json';

const _ = require('lodash');

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

const Interest = class Interest extends Component {
  state = {
    active: this.props.data.active
  }
  onPressMe() {
    this.props.updateData(parseInt(this.props.data.interest_id, 10), !this.state.active);
    this.setState({ active: !this.state.active });
  }
  render() {
    return (
      <TouchableWithoutFeedback onPress={this.onPressMe.bind(this)}>
        <View style={styles.itemContainer}>
          <Icon name='check' size={20} color={this.state.active ? 'white' : '#ff0050'} />
          <Text style={[styles.itemText, this.state.active ? { color: 'white' } : { color: '#c5c4d6' }]}>
            {this.props.data.name_english}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
};

class Interests extends Component {
  state = {
    dataSource: ds.cloneWithRows([]),
    interestsStorage: null,
    Interests: [],
    dataCame: false
  }
  componentWillMount() {
    generalUtils.getDataFromApi('interests')
      .then(data => {
        const filterInterests = _.filter(data, (o) => o.active === true);
        const tempInterests = [];
        filterInterests.map((value) =>
          tempInterests.push(parseInt(value.interest_id, 10))
        );
        this.setState({ dataSource: ds.cloneWithRows(data), dataCame: true, interestsStorage: data, Interests: tempInterests });
        console.log(this.state.Interests);
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
    if (this.state.Interests.length < 3) {
      Alert.alert(this.props.lang.title.error, this.props.lang.text.error_interests_validation, [{ text: this.props.lang.title.ok }]);
    } else {
      generalUtils.storageSetItem('interestsData', this.state.Interests);
      generalUtils.storageSetItem('status','levels');
      generalUtils.storageGetItem('interestsData').then((data) => console.log(data));
      Actions.levels();
    }
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
            {renderIf(this.state.dataCame)(
              <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow()}
              />
            )}
            {renderIf(!this.state.dataCame)(
              <Spinner size='large' style={styles.spinnerStyle} colors='white' />
            )}
          </ScrollView>
        </View>
        <View style={styles.bottonView}>
          <Button
            text={this.props.lang.title.continue}
            style={styles.InterestsButton}
            textStyle={styles.InterestsButtonText}
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
    paddingRight: 15,
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
    color: '#ff0050',
    fontWeight: '600',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5
  },
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center'
  }
});

export { Interests };
