import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import Swiper from 'react-native-swiper';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';
import renderIf from 'render-if';

import {
  // Header,
  // Button,
  // Card,
} from './common/';
import data from './data.json';

class Slider extends Component {
  state = {

  }
  componentWillMount() {

  }
  onPress() {
    Actions.signup();
  }
  WholeViews() {
    return data.map((single, i) =>
      (
        <View key={i} style={styles.singleView}>
          <Image source={{ uri: single.img }} style={styles.sliderImage} />
            {/* <Image source={logo} style={styles.logoImage} /> */}
            <View style={styles.textWrapper}>
              {renderIf(!single.last)(
                <Text style={styles.text}>
                  {single.text}
                </Text>
              )}
              {renderIf(single.last)(
              <View style={styles.textWrapper}>
                <Button
                  containerStyle={styles.buttonRounded}
                  style={{ fontSize: 40, color: 'white' }}
                  onPress={() => this.onPress()}
                >
                  ✓
                </Button>
              </View>
            )}
            </View>
        </View>
      )
    );
  }
  render() {
    return (
      <Swiper
        showsButtons={false}
        nextButton={<Text style={styles.arrows}>›</Text>}
        prevButton={<Text style={styles.arrows}>‹</Text>}
        loop={false}
      >
      {this.WholeViews()}
      </Swiper>
    );
  }
}
const styles = StyleSheet.create({
  singleView: {
    flex: 1
  },
  sliderImage: {
    flex: 4,
    justifyContent: 'flex-end',
    // alignItems: 'center',
    width: null,
    height: null
  },
  logoImage: {
    justifyContent: 'center',
    alignItems: 'center',
    // resizeMode: 'cover'
  },
  text: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20
  },
  textWrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  arrows: {
    color: 'black',
    fontSize: 60,
    fontWeight: 'bold'
  },
  buttonRounded: {
    marginTop: 20,
    paddingTop: 25,
    height: 50,
    width: 50,
    overflow: 'hidden',
    borderRadius: 200,
    backgroundColor: '#00b4ff',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
module.exports = Slider;
