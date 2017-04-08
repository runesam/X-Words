import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  // Alert,
  ScrollView,
  // ScrollView,
  Dimensions,
  Animated,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { Actions } from 'react-native-router-flux';
import Tts from 'react-native-tts';
import renderIf from 'render-if';
import DeviceInfo from 'react-native-device-info';

import {
  // Header,
  Button,
  Spinner,
} from '../common/';

import generalUtils from '../../utils/generalUtils';

const Item = class Item extends Component {
  state= {
    clicked: false,
    choosed: 10,
    left: 0,
    disabled: false
  }
  iWant() {
    this.setState({ clicked: true });
    this.props.handler(this.props.rowData.word_id);
  }
  call(chooseda, lefta) {
    this.setState({
      choosed: chooseda,
      left: lefta
    });
  }
  componentWillMount() {
    Tts.setDefaultRate(0.45);
  }
  componentDidMount() {
    // Tts.voices().then(voices => console.log(voices));
    // Tts.addEventListener('tts-start', (event) => { this.setState({ disabled: true }); console.log(event); });
    Tts.addEventListener('tts-finish', () => this.setState({ disabled: false }));
  }
  componentWillUnmount() {
    // Tts.removeEventListener('tts-start', (event) => { this.setState({ disabled: true }); console.log(event); });
    // Tts.removeEventListener('tts-finish', () => this.setState({ disabled: false }));
  }
  onPressMe() {
    Actions.LearnWithPhotoHolder();
  }
  textToSpeech(text) {
    this.setState({ disabled: true }, () => {
      if (this.props.accent) {
        const accent = `com.apple.ttsbundle.${this.props.accent}-compact`;
        console.log(accent);
        Tts.setDefaultVoice(accent);
      }
      Tts.speak(text);
    });
  }
  imageHolder(image) {
    if (image) {
      return (
        <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch' }} >
          <View style={{ flex: 1 }} />
          <View style={styles.imageHold}>
            <Image source={{ uri: image }} style={styles.image} />
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={this.textToSpeech.bind(this, this.props.rowData.english)} disabled={this.state.disabled}>
              <View style={styles.circle}>
                {renderIf(!this.state.disabled)(
                  <Icon name='volume-2' size={28} color='#00cccc' />
                )}
                {renderIf(this.state.disabled)(
                  <Spinner size='small' colors='#00cccc' />
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return <Spinner size='large' color='black' />;
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.part1}>
          <Text style={styles.headLine}>{this.props.lang.text.choosed} {this.props.choosed} {this.props.lang.text.left} {this.props.left}</Text>
        </View>
        <View style={styles.part2}>
          <Text style={styles.wordEnglish}>{this.props.rowData.english}</Text>
          <Text style={styles.wordTurkish}>{this.props.rowData.turkish}</Text>
        </View>
        <View style={styles.part3}>
          {this.imageHolder(this.props.rowData.image)}
        </View>
        <View style={styles.part4}>
          <Button
            text={this.props.lang.title.iWantLearn}
            style={{
              borderRadius: 20,
              marginLeft: 50,
              marginRight: 50,
              backgroundColor: '#ffb434'
            }}
            textStyle={{
              alignSelf: 'center',
              color: 'white',
              fontSize: 16,
              fontWeight: '600',
              paddingTop: 10,
              paddingBottom: 10
            }}
            onPressMe={this.iWant.bind(this)}
            disabled={this.state.clicked}
          />
        </View>
      </View>
    );
  }
};

class ChooseWordsHolder extends Component {
  state = {
    dataSource: [['English', 'turkish', 5]],
    marga: new Animated.Value(0),
    rows: [0],
    temper: -1 * (Dimensions.get('window').width - 50),
    stepper: Dimensions.get('window').width - 40,
    currentX: null,
    level: 'orta',
    not: [],
    wida: Dimensions.get('window').width,
    idsArray: [],
    choosed: 0,
    left: 10, // how many words
    memberId: 4,
    interestsNumber: 8,
    getLink: 'get_new_words',
    canGet: true,
    offset: 0,
    clicked: false,
    getWordsLinks: 'get_words_data',
    accent: null
  };
  componentWillMount() {
    const version = parseInt(DeviceInfo.getSystemVersion(), 10);
    if (!this.props.deviceAndroid || (this.props.deviceAndroid && version > 5)) {
      generalUtils.storageGetItem('accent').then((data) => {
        this.setState({ accent: data || 'Moira' }, () => { console.log(this.state.accent); });
      });
    }
    generalUtils.storageGetItem('status').then((data) => {
      if (data === 'choosed') {
        Actions.ConfirmWords();
      } else {
        // console.log("1");
        const apiData = {};
        apiData.memberId = this.state.memberId;
        apiData.not = this.state.not;
        // console.log("2");
        generalUtils.setDataFromApi(this.state.getLink, apiData).then(res => {
          // console.log("3");
          this.setState({
            dataSource: res,
            rows: res
          });
          // console.log("4");
          for (let i = 0; i < res.length; i++) {
            this.setState({
              not: this.state.not.concat([res[i].word_id]),
            });
          }
          // console.log("5");
        }).catch(reason => console.log(reason));
      }
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
  getMore() {
    // console.log('state');
    const apiData = {};
    apiData.memberId = this.state.memberId;
    apiData.not = this.state.not;
    generalUtils.setDataFromApi(this.state.getLink, apiData).then(data => {
      if (data.none) {
        this.setState({
          canGet: false,
        });
        console.log('no more');
        // update the level
      } else {
        const all = this.state.rows.concat(data);
        this.setState({
          rows: all,
          dataSource: all,
          canGet: true
        });
        console.log('added');
        for (let i = 0; i < data.length; i++) {
          this.setState({
            not: this.state.not.concat([data[i].word_id]),
          });
        }
      }
    }).catch(reason => {
      console.log(reason);
    });
  }
  handleScroll(event) {
    console.log('start scroll');
    const width = this.state.not.length;
    this.setState({ offset: event.nativeEvent.contentOffset.x });
    const current = event.nativeEvent.contentOffset.x / Dimensions.get('window').width;
    const currentPage = width - current;
    const can = this.state.canGet;
    if (currentPage < 7 && can) {
      this.setState({ canGet: false });
      this.getMore();
    }
  }
  ComponentDidMount() {

  }
  handler(wordId) {
    if (this.state.left > 0) {
      const ch = this.state.choosed + 1;
      const le = this.state.left - 1;
      this.setState({
        choosed: ch,
        left: le,
        idsArray: this.state.idsArray.concat([wordId])
      }, () => {
       if (this.state.left === 0) {
          const apiData = {};
          apiData.memberId = this.state.memberId;
          apiData.ids = this.state.idsArray;
          generalUtils.setDataFromApi(this.state.getWordsLinks, apiData).then(data => {
            generalUtils.storageSetItem('todayWords', data);
            generalUtils.storageSetItem('status', 'choosed');
            const date = new Date();
            const newDate = parseInt(date.toLocaleDateString('en-GB').split('/').join(''), 10);
            generalUtils.storageSetItem('day', newDate);
            Actions.ConfirmWords();
          }).catch(reason => console.log(reason));
        }
      });
      const width = this.state.not.length;
      const current = this.state.offset / this.state.wida;
      const ah = width - current;
      if (ah > 1) {
        this.refs.wordsa.scrollTo({ x: this.state.offset + this.state.wida, animated: true });
      }
    }
  }
  renderMyRow() {
    if (this.state.dataSource === [['English', 'turkish', 5]]) {
      return this.state.dataSource.map((value, key) =>
        <Text key={key}>Loading...</Text>
      );
    }
    return this.state.dataSource.map((value, key) =>
      <Item key={key} lang={this.props.lang} handler={this.handler.bind(this)} rowData={value} choosed={this.state.choosed} left={this.state.left} accent={this.state.accent} />
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.swipContainer}>
          <ScrollView
            horizontal
            ref="wordsa"
            pagingEnabled
            onScroll={this.handleScroll.bind(this)}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={200}
          >
            {this.renderMyRow()}
          </ScrollView>
        </View>
        <View style={styles.downPart}>
          <View style={styles.downpart1}>
            <Text style={styles.text}>{this.props.lang.text.custom}{this.state.level}, {this.state.interestsNumber}{this.props.lang.text.topic}</Text>
          </View>
          <View style={styles.downpart2}>
            <View style={{ flex: 1 }}><Text>{''}</Text></View>
            <View style={styles.buttonHolder}>
              <Button
                text={this.props.lang.text.change}
                style={styles.SignUpButton}
                textStyle={styles.SignUpButtonText}
                onPressMe={this.onPressMe.bind(this)}
              />
            </View>
            <View style={{ flex: 1 }}><Text>{''}</Text></View>
          </View>
          <View style={styles.downpart3}><Text>{''}</Text></View>
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
    backgroundColor: '#00cccc',
    paddingTop: 50
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
  },
  mainContainer: {
    width: Dimensions.get('window').width - 40,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    alignSelf: 'stretch',
    backgroundColor: 'white',
    borderRadius: 5,
    paddingTop: 30,
    flexDirection: 'column'
  },
  part1: {
    flex: 0.7,
    alignItems: 'center'
  },
  headLine: {
    fontWeight: '600'
  },
  wordEnglish: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000'
  },
  wordTurkish: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#666666'
  },
  part2: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  part3: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  part4: {
    flex: 2,
    justifyContent: 'center',
  },
  circle: {
    borderWidth: 2,
    width: (Dimensions.get('window').width - 120) / 4,
    height: (Dimensions.get('window').width - 120) / 4,
    borderRadius: (Dimensions.get('window').width - 110) / 8,
    borderColor: '#00cccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageHold: {
    flex: 2.3,
    alignSelf: 'stretch',
    flexDirection: 'row'
  },
  image: {
    resizeMode: 'contain',
    flex: 1
  }
});
export { ChooseWordsHolder };
