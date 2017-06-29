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
    progress: 0
  }
  componentWillMount() {

  }
  componentDidMount() {
    const looper = setInterval(() => {
      if (this.state.progress >= this.props.data[1] / 100) {
        console.log(this.state.progress);
        this.setState({ progress: this.props.data[1] / 100 });
        clearInterval(looper);
      } else {
        this.setState({ progress: this.state.progress + this.props.velocity });
      }
    });
  }
  render() {
    return (
      <View style={styles.SingleContainer}>
        <View style={styles.SingleTitleContainer}>
          <Text style={styles.SingleTitle}>{this.props.data[0]}</Text>
        </View>
        <View style={styles.SingleBodyContainer}>
          <View style={styles.SingleBodyLeftContainer}>
            <Text>{this.props.data[2]}</Text>
            <Text>{this.props.data[3]}</Text>
          </View>
          <View style={styles.SingleSpinnerContainer}>
            <Progress.Circle
              size={80}
              progress={this.state.progress}
              showsText
              borderWidth={0}
              indeterminate={this.props.indeterminate}
              color={this.props.data[6] || 'red'}
              borderColor={this.props.data[6] || 'red'}
              thickness={6}
              unfilledColor='rgba(0,0,0,0.5)'
            />
            <View style={styles.SingleVertical}></View>
          </View>
          <View style={styles.SingleBodyLeftContainer}>
            <Text>{this.props.data[4]}</Text>
            <Text>{this.props.data[5]}</Text>
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
    generalUtils.setDataFromApi('statistics', user.getUserData()).then(res => {
      this.setState({ data: res.data });
    });
    generalUtils.storageGetAllItems();
  }
  componentDidMount() {

  }
  ComponentDidUpdate() {

  }
  renderSingles() {
    if (this.state.data) {
      return this.state.data.map((value, key) => <Single key={key} data={value} indeterminate={false} velocity={0.07} />);
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
    height: 170,
    paddingBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    borderBottomWidth: 1,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5
  },
  SingleTitleContainer: {
    flex: 1,
    alignItems: 'center'
  },
  SingleTitle: {
    fontSize: 17
  },
  SingleBodyContainer: {
    flex: 4,
    flexDirection: 'row'
  },
  SingleBodyLeftContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  SingleSpinnerContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  SingleVertical: {
    height: 30,
    borderRightWidth: 1,
    borderColor: 'gray',
    marginTop: 10
  },
  spinnerStyle: {
    paddingTop: 150
  }
});

export { Analytics };
