import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  // Image,
  // Alert,
  ListView,
  Alert,
  // ScrollView,
  Dimensions,
  Animated,
  // LayoutAnimation
} from 'react-native';

import {
  // Header,
  Button,
  //  Spinner,
} from '../common/';
import generalUtils from '../../utils/generalUtils';
import OneWord from './components/oneWord';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

// const xOffset = new Animated.Value(0);
// const onScroll = Animated.event([{ nativeEvent: { contentOffset: { x: xOffset } } }]);

class ChooseWordsHolder extends Component {

  state = {
    dataSource: ds.cloneWithRows([['English', 'turkish', 5]]),
    marga: new Animated.Value(0),
    rows: [0],
    temper: -1 * (Dimensions.get('window').width - 50),
    stepper: Dimensions.get('window').width - 40,
    currentX: null,
    level: 'orta',
    not: [],
    memberId: 4,
    interestsNumber: 8,
    getLink: 'get_new_words',
    canGet: true
  };
  componentWillMount() {
    const apiData = {};
    apiData.memberId = this.state.memberId;
    apiData.not = this.state.not;
    generalUtils.setDataFromApi(this.state.getLink, apiData)
    .then(data => {
      this.setState({
      dataSource: ds.cloneWithRows(data),
      rows: data
     });
      for (let i = 0; i < data.length; i++) {
        this.setState({
          not: this.state.not.concat([data[i].word_id]),
         });
      }
    })
    .catch(reason => console.log(reason));
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
  getMore() {
    console.log('hello');
    const apiData = {};
    apiData.memberId = this.state.memberId;
    apiData.not = this.state.not;
    generalUtils.setDataFromApi(this.state.getLink, apiData)
    .then(data => {
      if (data.none) {
        Alert.alert('end');
        this.setState({
          canGet: false,
        });
    } else {
      this.setState({
        rows: this.state.rows.concat(data)
      });
      this.setState({
        dataSource: ds.cloneWithRows(this.state.rows),
        canGet: true
      });
      for (let i = 0; i < data.length; i++) {
        this.setState({
          not: this.state.not.concat([data[i].word_id]),
        });
      }
    }
    })
    .catch(reason => console.log(reason));
  }
  handleScroll(event) {
    const width = this.state.not.length;
    const current = event.nativeEvent.contentOffset.x / Dimensions.get('window').width;
    const ah = width - current;
    console.log(`width ${ah}`);
    if (ah === 3 && this.state.canGet) {
      this.setState({ canGet: false });
      this.getMore();
    }
  }
  ComponentDidMount() {

  }
  renderRow() {
    return (data, sectionID, rowID) => <OneWord data={data} key={rowID} lang={this.props.lang} choosed={0} left={10} />;
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.swipContainer}>
        <ListView
          horizontal
          pagingEnabled
          onScroll={this.handleScroll.bind(this)}
          showsHorizontalScrollIndicator={false}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow()}
        />
      </View>
        <View style={styles.downPart}>
          <View style={styles.downpart1}>
            <Text style={styles.text}>{this.props.lang.text.custom}{this.state.level}, {this.state.interestsNumber}{this.props.lang.text.topic}</Text>
          </View>
          <View style={styles.downpart2}>
            <View style={{ flex: 1 }}></View>
            <View style={styles.buttonHolder}>
              <Button
                text={this.props.lang.text.change}
                style={styles.SignUpButton}
                textStyle={styles.SignUpButtonText}
                onPressMe={this.onPressMe.bind(this)}
              />
            </View>
            <View style={{ flex: 1 }}></View>
          </View>
          <View style={styles.downpart3}></View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  text: {
    color: 'white'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#00cccc'
  },
  swipContainer: {
    flex: Dimensions.get('window').height - 100,
  },
  downPart: {
    height: 100,
    flexDirection: 'column',
    backgroundColor: '#00cccc'
  },
  downpart1: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  downpart2: {
    flex: 2,
    flexDirection: 'row'
  },
  downpart3: {
    flex: 0.5
  },
  SignUpButton: {
    borderRadius: 45,
  },
  SignUpButtonText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: '300',
    paddingTop: 12,
    paddingBottom: 12
  },
  buttonHolder: {
    flex: 1,
    justifyContent: 'center',
    borderColor: 'white',
    borderRadius: 40,
    borderWidth: 1,
    padding: 5
  }
});
module.exports = ChooseWordsHolder;
