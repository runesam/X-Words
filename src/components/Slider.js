import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  // View,
  Image
} from 'react-native';
import Swiper from 'react-native-swiper';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';

import {
  // Header,
  // Button,
  // Card,
} from './common/';

const Logo = require('./images/logo.png');
const backgroundImageI = require('./images/slider_background_00.png');
const backgroundImageII = require('./images/slider_background_01.png');
const backgroundImageIII = require('./images/slider_background_02.png');
const backgroundImageIV = require('./images/slider_background_03.png');
const backgroundImageV = require('./images/slider_background_04.png');

class Slider extends Component {
  state = {

  }
  componentWillUpdate() {

  }
  onPress() {
    Actions.signup();
  }
  render() {
    return (
      <Swiper
        showsButtons
        nextButton={<Text style={styles.arrows}>›</Text>}
        prevButton={<Text style={styles.arrows}>‹</Text>}
        loop={false}
      >
        <Image source={backgroundImageI} style={styles.backgroundImageI}>
          <Image source={Logo} style={styles.backgroundImageII} />
          <Text style={styles.text}>
            {'Learn & Have Fun'}
          </Text>
        </Image>
        <Image source={backgroundImageII} style={styles.backgroundImageI}>
          <Image source={Logo} style={styles.backgroundImageII} />
          <Text style={styles.text}>
            {'Learn & Have Fun'}
          </Text>
        </Image>
        <Image source={backgroundImageIII} style={styles.backgroundImageI}>
          <Image source={Logo} style={styles.backgroundImageII} />
          <Text style={styles.text}>
            {'Learn & Have Fun'}
          </Text>
        </Image>
        <Image source={backgroundImageIV} style={styles.backgroundImageI}>
          <Image source={Logo} style={styles.backgroundImageII} />
          <Text style={styles.text}>
            {'Learn & Have Fun'}
          </Text>
        </Image>
        <Image source={backgroundImageV} style={styles.backgroundImageI}>
          <Image source={Logo} style={styles.backgroundImageII} />
          <Text style={styles.text}>
            {'Learn & Have Fun'}
          </Text>
          <Text>
            {'Powered By Finest Group'}
          </Text>
          <Button
            containerStyle={styles.buttonContainer}
            style={{ fontSize: 60, color: 'black' }}
            onPress={() => this.onPress()}
          >
            ✓
          </Button>
        </Image>
      </Swiper>
    );
  }
}
const styles = StyleSheet.create({
  backgroundImageI: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: null,
    height: null
  },
  backgroundImageII: {
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover'
  },
  text: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 100
  },
  arrows: {
    color: 'black',
    fontSize: 60,
    fontWeight: 'bold'
  },
  buttonContainer: {
    marginTop: 30,
    paddingTop: 30,
    height: 70,
    width: 70,
    overflow: 'hidden',
    borderRadius: 1000,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
module.exports = Slider;
