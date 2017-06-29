import React, { Component } from 'react';
// import firebase from 'firebase';
import {
  StyleSheet,
  View,
  Text,
  Image,
  // StatusBar,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from 'react-native';
// import renderIf from 'render-if';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Tts from 'react-native-tts';
import {
  // Button,
  // CardSection,
  // ShapedTextInput,
  Spinner,
  // PickerView,
  // PickerButton,
  // HscrollView
} from './../../common/';
import generalUtils from '../../../utils/generalUtils';
import user from '../../../utils/user';
// const _ = require('lodash');

class Single extends Component {
  state= {

  }
  componentWillMount() {
    Tts.setDefaultRate(0.4);
  }
  componentDidMount() {
    Tts.addEventListener('tts-finish', this.endingLoader);
  }
  componentWillUnmount() {
    Tts.removeEventListener('tts-finish', this.endingLoader);
  }
  endingLoader = () => {
    this.setState({ disabled: false });
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
  translateHolderIcon(data) {
    if (this.state.disabled) {
      return <Spinner size={data[0]} colors='white' />;
    }
    return <Icon name='volume-2' size={data[1]} color='white' />;
  }
  render() {
    return (
      <View style={styles.SingleContainer}>
        <View>
          <Text style={styles.SingleTitle}>
            {this.props.data[0]}
          </Text>
          <Text style={[styles.SingleTitle, { color: 'black' }]}>
            {this.props.data[1]}
          </Text>
        </View>
        <TouchableOpacity onPress={this.textToSpeech.bind(this, this.props.data[0])} style={styles.translateHolderButton}>
          <View style={styles.translateHolderIcon}>
            {this.translateHolderIcon(['large', 35])}
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

class LearnedWords extends Component {
  state= {
    headerTitle: 'Learned Words',
    headerText: 'Your 10 Words History List',
    headerSubText: 'Here you can check what words you\'ve lerned so far',
  }
  componentWillMount() {
    this.apiData = user.getUserData();
    this.apiData.pageNumber = 1;
    generalUtils.setDataFromApi('learned_words_list', this.apiData).then(res => {
      this.setState({ data: res.data });
      console.log(res);
    });
    generalUtils.storageGetAllItems();
  }
  componentDidMount() {

  }
  ComponentDidUpdate() {

  }
  renderSingles() {
    if (this.state.data) {
      return this.state.data.map((value, key) => <Single key={key} data={value} />);
    }
    return <Spinner size='large' style={styles.spinnerStyle} />;
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>
              {this.state.headerTitle}
            </Text>
          </View>
          <View style={styles.headerImageTextContainer}>
            <Image style={styles.logo} source={{ uri: 'logo_white' }} />
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerText}>
                {this.state.headerText}
              </Text>
              <Text style={styles.headerSubText}>
                {this.state.headerSubText}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 10 }}>
          <ScrollView>
            {this.renderSingles()}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  headerContainer: {
    flex: 3,
    backgroundColor: '#ff0050'
  },
  headerTitleContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600'
  },
  headerImageTextContainer: {
    flex: 4,
    flexDirection: 'row',
    paddingBottom: 10
  },
  logo: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
  },
  headerTextContainer: {
    flex: 3,
    paddingRight: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    color: 'white',
    fontSize: 17
  },
  headerSubText: {
    color: 'white',
    fontStyle: 'italic',
    fontSize: Dimensions.get('window').width < 375 ? 12 : 14
  },
  SingleContainer: {
    paddingBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    borderBottomWidth: 1,
    borderColor: 'gray',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 5
  },
  SingleTitleContainer: {
    flex: 1
  },
  SingleTitle: {
    alignItems: 'flex-start',
    textAlign: 'left',
    fontSize: 17
  },
  spinnerStyle: {
    paddingTop: 150
  },
  translateHolderButton: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  translateHolderIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff0050',
    width: (Dimensions.get('window').width - 100) / 4,
    height: (Dimensions.get('window').width - 100) / 4,
    borderRadius: (Dimensions.get('window').width - 100) / 8
  },
});

export { LearnedWords };
