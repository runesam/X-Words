import React, { Component } from 'react';
import {
  StyleSheet,
  // Text,
  View,
  // Image,
  // Alert,
  ListView,
  // ScrollView,
  Dimensions,
  Animated,
  PanResponder
  // LayoutAnimation
} from 'react-native';

import {
  // Header,
  Button,
  //  Spinner,
} from '../common/';
import OneWord from './components/oneWord';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

// const xOffset = new Animated.Value(0);
// const onScroll = Animated.event([{ nativeEvent: { contentOffset: { x: xOffset } } }]);

class ChooseWordsHolder extends Component {
  state = {
    dataSource: ds.cloneWithRows([['row 1', 'row 2'], ['row 1', 'row 2'], ['row 1', 'row 2'], ['row 1', 'row 2'], ['row 1', 'row 2'], ['row 1', 'row 2']]),
    marga: new Animated.Value(0),
    temper: -1 * (Dimensions.get('window').width - 50),
    stepper: Dimensions.get('window').width - 40,
    currentX: null
  };
  componentWillMount() {
    console.log(654);
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.test,
      onMoveShouldSetPanResponder: this.test,
      onPanResponderGrant: this.test,
      onPanResponderMove: this.test,
      onPanResponderRelease: this.test,
      onPanResponderTerminate: this.test,
    });
  }
  onPressMe() {
    Animated.timing(
      this.state.marga,
      { toValue: this.state.temper }
    ).start();
    this.setState({
      temper: this.state.temper - this.state.stepper
    });
  }
  goLeft() {
    Animated.timing(
      this.state.marga,
      { toValue: this.state.temper }
    ).start();
    this.setState({
      temper: this.state.temper - this.state.stepper
    });
  }
  goRight() {
    Animated.timing(
      this.state.temper,
      { toValue: this.state.marga }
    ).start();
    this.setState({
      temper: this.state.temper - this.state.stepper
    });
  }
  start(event) {
    this.setState({ current: Math.floor(event.nativeEvent.pageX) });
    console.log(Math.floor(event.nativeEvent.pageX));
    return true;
  }
  end(event) {
    if (this.state.current < Math.floor(event.nativeEvent.pageX)) {
      this.goLeft();
      console.log('go Left');
    } else {
      this.goLeft();
      console.log('go Right');
    }
    return true;
  }
  ComponentDidMount() {

  }
  renderRow() {
    return (data) => <OneWord data={data} />;
  }
  render() {
    return (
      <View style={styles.container}>
        <ListView
          horizontal
          style={styles.swipContainer}
          showsHorizontalScrollIndicator={false}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow()}
          pagingEnabled
        />
        <View style={styles.downPart}>
          <Button
            text={this.props.lang.title.start_test}
            style={styles.SignUpButton}
            textStyle={styles.SignUpButtonText}
            onPressMe={this.onPressMe.bind(this)}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  itemsContainer: {
  },
  switcher: {
    flex: 3,
    backgroundColor: 'white',
    alignItems: 'stretch',
    marginTop: 50,
  },
  switcherPadding: {
    flex: 1,
    marginTop: 30
  },
  wrapper: {
  },
  slide1: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
    flexDirection: 'column'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#00cccc'
  },
  swipContainer: {
    flex: 4,
  },
  downPart: {
    flex: 0.8,
    backgroundColor: '#00cccc'
  }
});
module.exports = ChooseWordsHolder;
