import React, { Component } from 'react';
// import firebase from 'firebase';
import {
  StyleSheet,
  View,
  // Text,
  // Image,
  // Alert,
  // StatusBar,
  ScrollView,
} from 'react-native';
import SettingsList from 'react-native-settings-list';
import { Actions } from 'react-native-router-flux';
// import Loader from 'react-native-spinkit';
// import renderIf from 'render-if';
import Icon from 'react-native-vector-icons/FontAwesome';
// import PushNotification from 'react-native-push-notification';
// import { Button } from '../common/';
import generalUtils from '../../utils/generalUtils';
// import images from '../../json/images.json';
const _ = require('lodash');

class Settings extends Component {
  state= {
    data: {
      words: '10',
      level: 'starter',
    }
  }
  componentWillMount() {
    generalUtils.storageGetAllItems();
    if (this.props.data) {
      this.setState({ data: _.merge(this.state.data, this.props.data) });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      this.setState({ data: _.merge(this.state.data, nextProps.data) });
    }
  }
  onValueChange(value) {
    this.setState({ switchValue: value });
  }
  renderIcon(name, size, color) {
    return (
      <View style={styles.iconStyle}>
        <Icon name={name} size={size} color={color} />
      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
            <SettingsList.Item
              icon={this.renderIcon('calendar-plus-o', 25, 'red')}
              title={this.props.lang.title.words_a_day}
              titleInfo={this.state.data.words}
              onPress={Actions.options.bind(this, { option: 0, wordsPerDay: this.state.data.words })}
            />
            <SettingsList.Item
              icon={this.renderIcon('list-ol', 25, '#9c27b0')}
              title={this.props.lang.title.level_edit}
              titleInfo={this.state.data.level}
              onPress={Actions.options.bind(this, { option: 1, level: this.state.data.level })}
            />
            <SettingsList.Item
              icon={this.renderIcon('paper-plane-o', 25, '#67b100')}
              title={this.props.lang.title.contact_us}
              onPress={Actions.options.bind(this, { option: 2 })}
            />
            <SettingsList.Item
              icon={this.renderIcon('remove', 25, 'white')}
              title={this.props.lang.title.cancel_membership}
              backgroundColor='#c10000'
              titleStyle={{ color: 'white', fontWeight: '800', fontSize: 17 }}
            />
          </SettingsList>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    marginBottom: 60,
  },
  iconStyle: {
    marginLeft: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    width: 25,
    height: 20,
  }
});

export { Settings };
