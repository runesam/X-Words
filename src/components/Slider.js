import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  LayoutAnimation
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';
import renderIf from 'render-if';

import {
  // Header,
  // Button,
  Spinner,
} from './common/';
import data from './json/sliderData.json';

class Slider extends Component {
  state = {
    routing: null
  }
  componentWillMount() {

  }
  onPress() {
    LayoutAnimation.spring();
    // this.setState({ routing: true });
    // setTimeout(() => {
      Actions.signup();
    // }, 10);
    setTimeout(() => {
      this.setState({ routing: null });
    }, 500);
  }
  WholeViews() {
    return data.map((single, i) =>
      (
        <View key={i} style={this.state.routing === null ? { flex: 1 } : { flex: 1, opacity: 0 }}>
          <Image source={{ uri: single.img }} style={styles.sliderImage}>
            <Spinner size='large' style={styles.spinnerStyle} />
          </Image>
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
                  onPress={() => this.onPress()}
                >
                  <Icon name='arrow-circle-right' size={50} color='black' />
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
        bounces
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
    fontSize: 20,
    // fontWeight: 'bold',
    textAlign: 'center',
    // marginTop: 20,
    paddingLeft: 10,
    paddingRight: 10
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
    marginTop: 10,
    // paddingTop: 25,
    height: 50,
    width: 50,
    overflow: 'hidden',
    borderRadius: 200,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center'
  }
});
module.exports = Slider;
