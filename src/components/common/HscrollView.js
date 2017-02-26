import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  // Image,
  // Text,
  // TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import renderIf from 'render-if';
import {
  Spinner,
  Interest
} from './';

class HscrollView extends Component {
  state = {

  }
  interestsHandler(data) {
    console.log(data);
    this.props.onChangeText(this.props.name, data);
  }
  WholeOptions() {
    if (this.props.data) {
      return this.props.data.map((data, i) =>
        <Interest key={i} data={data} interestsHandler={this.interestsHandler.bind(this, data.id)} />
      );
    }
  }
  render() {
    return (
      <View style={[styles.ScrollViewContainer, this.props.inValid ? { borderWidth: 1.5, borderColor: 'red' } : null, this.props.data ? { flexDirection: 'row' } : null]}>
        {renderIf(this.props.data)(
          <View style={styles.leftArrow}>
            <Icon name='angle-left' size={30} color='white' />
          </View>
        )}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.ScrollView}
          automaticallyAdjustContentInsets={false}
          onScroll={() => { console.log('onScroll!'); }}
        >
          {this.WholeOptions()}
        </ScrollView>
        {renderIf(!this.props.data)(
          <View style={styles.spinnerContainer}>
            <Spinner size='small' />
          </View>
        )}
        {renderIf(this.props.data)(
          <View style={styles.rightArrow}>
            <Icon name='angle-right' size={30} color='white' />
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
    borderRadius: 5,
    marginTop: 10,
  },
  leftArrow: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
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
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
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
