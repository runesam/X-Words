import React, { Component } from 'react';
import { Text, View, Dimensions, StyleSheet, Image } from 'react-native';
import images from '../../../json/images.json';

class FooterWithNumber extends Component {
  state = {
    view2LayoutProps: Dimensions.get('window').height / 27
  }
  findDimesions(layout) {
    const { height } = layout;
    this.setState({ view2LayoutProps: height });
  }
  render() {
    const payments = [];
    for (let i = 1; i <= this.props.number; i++) {
      if (i > this.props.current) {
        payments.push(
          <View style={styles.grayBar} key={i}>
            <View style={[styles.downBar, { height: this.state.view2LayoutProps / 1.9, width: Dimensions.get('window').width / this.props.number }]} />
            <View style={[styles.circle, { width: this.state.view2LayoutProps, borderRadius: this.state.view2LayoutProps / 2 }]}>
              <Text style={styles.circleText}>{i}</Text>
            </View>
          </View>
        );
      } else {
        payments.push(
          <View style={styles.grayBar} key={i}>
            <View style={[styles.downBarRed, { height: this.state.view2LayoutProps / 1.9, width: Dimensions.get('window').width / this.props.number }]} />
            <View style={[styles.circleRed, { width: this.state.view2LayoutProps, borderRadius: this.state.view2LayoutProps / 2 }]}>
              <Text style={styles.circleText}>{i}</Text>
            </View>
          </View>
        );
      }
    }
    return (
      <View style={styles.viewStyle}>
        <View
          style={styles.grayBarContainer}
          onLayout={(event) => {
            this.findDimesions(event.nativeEvent.layout);
          }}
        >
          {payments}
        </View>
        <View style={styles.viewDownStyle}>
          <Image source={{ uri: images.footerBirdImage.data }} style={styles.viewDownImage} />
          <Text style={{ flex: 5, color: 'white' }}>
            {this.props.lang.text.test_footer}
          </Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  grayBarContainer: {
    flex: 3,
    flexDirection: 'row'
  },
  viewDownStyle: {
    backgroundColor: '#00cccc',
    flex: 7,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5
  },
  viewDownImage: {
    flex: 1,
    resizeMode: 'contain',
    width: null,
    height: null,
  },
  circle: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4f4f4f'
  },
  circleRed: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e84040'
  },
  viewStyle: {
    flex: 1,
    flexDirection: 'column'
  },
  grayBar: {
    flex: 25,
    alignItems: 'center',
    flexDirection: 'column'
  },
  circleText: {
    color: 'white',
    fontWeight: '400'
  },
  downBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: '#4f4f4f'
  },
  downBarRed: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: '#e84040'
  }
});

export default FooterWithNumber;
