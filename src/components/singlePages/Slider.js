import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  // LayoutAnimation
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
} from '../common/';
import data from '../../json/sliderData.json';

class Slider extends Component {
  state = {
    routing: null,
    loading: false
  }
  componentWillMount() {

  }
  onPress() {
    this.setState({ loading: true });
    setTimeout(() => {
      Actions.interests();
      this.setState({ routing: null });
    }, 500);
  }
  WholeViews() {
    return data.map((single, i) =>
      (
        <View key={i} style={this.state.routing === null ? { flex: 1 } : { flex: 1, opacity: 0 }}>
          <Image source={{ uri: single.img }} style={[styles.sliderImage]}>
            <View style={[styles.placeholder, this.props.deviceAndroid ? { flex: 3 } : { flex: 5 }]}>
              <Spinner size='large' style={[styles.spinnerStyle, this.state.loading ? { opacity: 1 } : { opacity: 0 }]} />
            </View>
            <View style={styles.textViewWrapper}>
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
                    <Text style={styles.nextText}>
                      {this.props.lang.title.continue}
                    </Text>
                    <Icon name='angle-right' size={30} color='white' />
                  </Button>
                </View>
              )}
            </View>
          </Image>
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
        paginationStyle={[styles.paginationStyle, this.props.deviceAndroid ? { bottom: 40 } : { bottom: 10 }]}
        activeDotStyle={{ backgroundColor: '#ff0050' }}
      >
      {this.WholeViews()}
      </Swiper>
    );
  }
}
const styles = StyleSheet.create({
  paginationStyle: {
    position: 'absolute'
  },
  singleView: {
    flex: 1
  },
  sliderImage: {
    justifyContent: 'flex-end',
    width: null,
    height: null,
    flex: 1
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
  placeholder: {
    backgroundColor: 'rgba(0,0,0,0)'
  },
  textViewWrapper: {
    flex: 1,
    paddingTop: 10,
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
    width: 120,
    overflow: 'hidden',
    borderRadius: 200,
    backgroundColor: '#ff0050',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center'
  },
  nextText: {
    alignSelf: 'center',
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
    paddingLeft: 10,
    paddingRight: 5,
    paddingTop: 5,
    paddingBottom: 5
  }
});
module.exports = Slider;
