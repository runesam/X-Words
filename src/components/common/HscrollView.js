import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Text,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import renderIf from 'render-if';
import {
  Spinner,
} from './';

class HscrollView extends Component {
  state = {

  }
  interestsHandler(data) {
    this.props.onChangeText(this.props.name, data);
  }
  WholeOptions() {
    if (this.props.data) {
      return this.props.data.map((data, i) =>
        (
          <TouchableHighlight
            key={i}
            style={styles.touchStyle}
            onPress={this.interestsHandler.bind(this, data.id)}
            underlayColor='rgba(0,0,0,0.3)'
          >
            <View style={styles.view_style}>
              <Image
                source={{ uri: data.image }}
                style={[styles.imageStyle, data.active ? { opacity: 0.6 } : { opacity: 0.2 }]}
              />
              <Text
                style={[styles.textStyle, data.active ? { color: 'white' } : { color: '#c5c4d6' }]}
              >
                {data.text}
              </Text>
            </View>
          </TouchableHighlight>
        )
      );
    }
  }
  render() {
    return (
      <View style={[styles.ScrollViewContainer, this.props.inValid ? { borderWidth: 1.5, borderColor: 'red' } : null]}>
        <View style={styles.leftArrow}>
          <Icon name='angle-left' size={30} color='white' />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.ScrollView}
          automaticallyAdjustContentInsets={false}
          onScroll={() => { console.log('onScroll!'); }}
        >
          {this.WholeOptions()}
        </ScrollView>
        <View style={styles.rightArrow}>
          <Icon name='angle-right' size={30} color='white' />
        </View>
        {renderIf(!this.props.data)(
          <View style={styles.spinnerContainer}>
            <Spinner size='small' />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'absolute',
    top: 35
  },
  ScrollViewContainer: {
    height: 90,
    backgroundColor: 'rgba(255,255,255,0.2)',
    flexDirection: 'row',
    borderRadius: 5,
    marginTop: 10,
  },
  leftArrow: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    width: 20
  },
  ScrollView: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  rightArrow: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    width: 20
  },
  view_style: {
    flex: 1,
    width: 80
  },
  touchStyle: {
    borderRadius: 5,
    paddingBottom: 10,
    paddingTop: 10
  },
  textStyle: {
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white'
  },
  imageStyle: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'center'
  }
});

export { HscrollView };
