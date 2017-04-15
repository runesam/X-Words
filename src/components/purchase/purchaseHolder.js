import React, { Component } from 'react';
// import firebase from 'firebase';
import {
  StyleSheet,
  View,
  Text,
  // Alert,
  StatusBar,
  // Keyboard,
  // ScrollView,
  // TouchableWithoutFeedback
} from 'react-native';
// import renderIf from 'render-if';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icony from 'react-native-vector-icons/FontAwesome';
import {
  Button,
  // CardSection,
  // ShapedTextInput,
  // Spinner,
  // PickerView,
  // PickerButton,
  // HscrollView
} from '../common/';
import generalUtils from '../../utils/generalUtils';
// const _ = require('lodash');

class PurchaseHolder extends Component {
  state= {

  }
  componentWillMount() {

  }
  purchase(){
    //if success
    const daysnumber = 5;
    const date = new Date().getTime() + (1000 * 24 * 60 * 60 * daysnumber);
    console.log(date);
    generalUtils.storageSetItem('endDate',date);
    generalUtils.storageSetItem('status','ready');
    return true;
  }
  onPressMe() {
    if(this.purchase()){
Actions.HomePageHolder();
Actions.pop();
}
  }
  ComponentDidUpdate() {

  }
  render() {
    return (
      <View style={styles.mainContainer} >
        <StatusBar barStyle='light-content' />
        <View style={styles.imageHolder}>
          <Icon name='trophy' style={styles.iconSuccess} size={150} />
          <Text style={styles.imageLabel}>{this.props.lang.title.congrats}</Text>
          <Text style={styles.congratsText}>{this.props.lang.text.congrats_text}</Text>
        </View>
        <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.offerText}>{this.props.lang.title.offer}</Text>
        </View>
        <View style={styles.footer}>
          <Button
            text={this.props.lang.title.buy_now}
            style={styles.BuyButton}
            textStyle={styles.BuyButtonText}
            onPressMe={this.onPressMe.bind(this)}
          />
          <Text style={styles.buyLabel}>{this.props.lang.text.cancel_time}</Text>
        </View>
        <View style={styles.lineHelp} />
        <View style={styles.textHelpContainer}>
          <Text style={styles.textHelp}>
            {this.props.lang.text.more_info}
          </Text>
          <View style={styles.phoneContainer}>
            <Icony name='phone-square' size={30} color='white' />
            <Text style={styles.phoneContainerText}>
              {this.props.lang.title.phone}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#ff0050',
    justifyContent: 'center'
  },
  imageHolder: {
    flex: 6,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 30,
    paddingRight: 30
  },
  iconSuccess: {
    color: 'white'
  },
  imageLabel: {
    color: 'white',
    fontSize: 25,
  },
  congratsText: {
    color: 'white',
    fontSize: 13,
    textAlign: 'center',
    paddingTop: 10
  },
  offerText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 35,
    fontWeight: '600'
  },
  footer: {
    flex: 2,
    justifyContent: 'center',
  },
  BuyButton: {
    backgroundColor: '#8CDD00',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginRight: 30,
    marginLeft: 30,
    borderRadius: 10
  },
  BuyButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '600'
  },
  buyLabel: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
    marginTop: 5
  },
  lineHelp: {
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    paddingTop: 5,
  },
  textHelpContainer: {
    backgroundColor: 'rgba(255,255,255,0)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
    paddingBottom: 10
  },
  textHelp: {
    textAlign: 'center',
    color: 'white'
  },
  phoneContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneContainerText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    paddingLeft: 10
  }
});

module.exports = PurchaseHolder;
