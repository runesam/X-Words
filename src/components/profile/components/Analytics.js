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
  // TouchableWithoutFeedback
} from 'react-native';
import * as Progress from 'react-native-progress';
// import renderIf from 'render-if';
// import Icon from 'react-native-vector-icons/FontAwesome';
import {
  // Button,
  // CardSection,
  // ShapedTextInput,
  // Spinner,
  // PickerView,
  // PickerButton,
  // HscrollView
} from './../../common/';
// import generalUtils from '../utils/generalUtils';
// const _ = require('lodash');

class Single extends Component {
  state= {
    progress: 0
  }
  componentWillMount() {

  }
  componentDidMount() {
    const looper = setInterval(() => {
      if (this.state.progress >= this.props.data.target / 100) {
        console.log(this.state.progress);
        this.setState({ progress: this.props.data.target / 100 });
        clearInterval(looper);
      } else {
        this.setState({ progress: this.state.progress + this.props.velocity });
      }
    });
  }
  render() {
    return (
      <View style={{ height: 170, paddingBottom: 10, marginLeft: 20, marginRight: 20, borderBottomWidth: 1, borderColor: 'gray', justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={{ fontSize: 17 }}>{this.props.data.title}</Text>
        </View>
        <View style={{ flexDirection: 'row', flex: 4 }}>
          <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
            <Text>{this.props.data.statices[0].number}</Text>
            <Text>{this.props.data.statices[0].text}</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
            <Progress.Circle
              size={80}
              progress={this.state.progress}
              showsText
              borderWidth={1}
              indeterminate={this.props.indeterminate}
              color={this.props.data.color}
              borderColor={this.props.data.color}
            />
            <View style={{ height: 30, borderRightWidth: 1, borderColor: 'gray', marginTop: 10 }}></View>
          </View>
          <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
            <Text>{this.props.data.statices[1].number}</Text>
            <Text>{this.props.data.statices[1].text}</Text>
          </View>
        </View>
      </View>
    );
  }
}

class Analytics extends Component {
  state= {
    headerTitle: 'Analytics',
    headerText: 'Your 10 Words Analytics',
    headerSubText: 'You can share your score on social media',
  }
  componentWillMount() {
    this.data = [
      {
        title: 'Correct Answers Percentage',
        target: 40,
        color: 'green',
        statices: [
          {
            number: 34,
            text: 'One Week'
          },
          {
            number: 55,
            text: 'One Month'
          }
        ]
      },
      {
        title: 'Hours Percentage',
        target: 72,
        color: 'red',
        statices: [
          {
            number: 77,
            text: 'One Week'
          },
          {
            number: 54,
            text: 'One Month'
          }
        ]
      },
      {
        title: 'Points & Averge',
        target: 23,
        color: 'blue',
        statices: [
          {
            number: 77,
            text: 'One Week'
          },
          {
            number: 34,
            text: 'One Month'
          }
        ]
      }
    ];
  }
  componentDidMount() {

  }
  ComponentDidUpdate() {

  }
  renderSingles() {
    return this.data.map((value, key) => <Single key={key} data={value} indeterminate={false} velocity={0.07} />);
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
    flex: 2,
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
  }
});

export { Analytics };
