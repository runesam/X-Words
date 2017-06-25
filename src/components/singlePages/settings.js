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
import Icon from 'react-native-vector-icons/FontAwesome';
import PushNotification from 'react-native-push-notification';
import { Button } from '../common/';
import generalUtils from '../../utils/generalUtils';
import images from '../../json/images.json';
import SettingsList from 'react-native-settings-list';

// const _ = require('lodash');
class Settings extends Component {
  state= {

  }
  componentWillMount() {

  }
  componentWillReceiveProps(nextProps) {
Alert.alert(nextProps.toGo);
  }

  constructor(){
    super();
    this.onValueChange = this.onValueChange.bind(this);
    this.state = {switchValue: false};
  }
  render() {
    var bgColor = '#DCE3F4';
    return (
      <View style={{backgroundColor:'#EFEFF4',flex:1}}>
        <View style={{backgroundColor:'#EFEFF4',flex:1}}>
          <ScrollView>
          <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
            <SettingsList.Header />
            <SettingsList.Item
              icon={
                <View style={styles.imageStyle}>
                  <Icon name="apple" size={25} color="#ff9500" />
                </View>
              }
              hasSwitch={true}
              switchState={this.state.switchValue}
              switchOnValueChange={this.onValueChange}
              hasNavArrow={false}
              title='Airplane Mode'
            />
            <SettingsList.Item
              icon={
                <View style={styles.imageStyle}>
                  <Icon name="apple" size={25} color="#007aff" />
                </View>
              }
              title='Wi-Fi'
              titleInfo='Bill Wi The Science Fi'
              titleInfoStyle={styles.titleInfoStyle}
              onPress={() => Alert.alert('Route to Wifi Page')}
            />
            <SettingsList.Item
              icon={
                <View style={styles.imageStyle}>
                  <Icon name="apple" size={25} color="#007aff" />
                </View>
              }
              title='Blutooth'
              titleInfo='Off'
              titleInfoStyle={styles.titleInfoStyle}
              onPress={() => Alert.alert('Route to Blutooth Page')}
            />
            <SettingsList.Item
              icon={
                <View style={styles.imageStyle}>
                  <Icon name="apple" size={25} color="#4cd964" />
                </View>
              }
              title='Cellular'
              onPress={() => Alert.alert('Route To Cellular Page')}
            />
            <SettingsList.Item
              icon={
                <View style={styles.imageStyle}>
                  <Icon name="apple" size={25} color="#4cd964" />
                </View>
              }
              title='Personal Hotspot'
              titleInfo='Off'
              titleInfoStyle={styles.titleInfoStyle}
              onPress={() => Alert.alert('Route To Hotspot Page')}
            />
            <SettingsList.Header headerStyle={{marginTop:15}}/>
            <SettingsList.Item
              icon={
                <View style={styles.imageStyle}>
                  <Icon name="apple" size={25} color="#ff3b30" />
                </View>
              }
              title='Notifications'
              onPress={() => Alert.alert('Route To Notifications Page')}
            />
            <SettingsList.Item
              icon={
                <View style={styles.imageStyle}>
                  <Icon name="apple" size={25} color="#8e8e93" />
                </View>
              }
              title='Control Center'
              onPress={() => Alert.alert('Route To Control Center Page')}
            />
            <SettingsList.Item
              icon={
                <View style={styles.imageStyle}>
                  <Icon name="apple" size={25} color="#ff9500" />
                </View>
              }
              title='Do Not Disturb'
              onPress={() => Alert.alert('Route To Do Not Disturb Page')}
            />
            <SettingsList.Header headerStyle={{marginTop:15}}/>
            <SettingsList.Item
              icon={
                <View style={styles.imageStyle}>
                  <Icon name="apple" size={25} color="#ff9500" />
                </View>
              }
              title='General'
              onPress={() => Alert.alert('Route To General Page')}
            />
            <SettingsList.Item
              icon={
                <View style={styles.imageStyle}>
                  <Icon name="apple" size={25} color="#ff9500" />
                </View>
              }
              title='Display & Brightness'
              onPress={() => Alert.alert('Route To Display Page')}
            />
          </SettingsList>
        </ScrollView>
        </View>
      </View>
    );
  }
  onValueChange(value){
    this.setState({switchValue: value});
  }
}
const styles = StyleSheet.create({
  imageStyle:{
     marginLeft:10,
     alignSelf:'center',
     width:20,
     height:20,
     justifyContent:'center'
   }
});

export { Settings };
