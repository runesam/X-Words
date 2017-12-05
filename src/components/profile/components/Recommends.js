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

  }
  componentWillMount() {

  }
  componentDidMount() {

  }
  render() {
    return (
      <View style={styles.SingleContainer}>
        <Text style={styles.SingleTitle}>{this.props.data[0]}</Text>
        <Text style={[styles.SingleTitle, { color: 'black' }]}>{this.props.data[1]}</Text>
      </View>
    );
  }
}

class Recommends extends Component {
  state= {
    headerTitle: 'Recommendations',
    headerText: 'Your 10 Words Recommends',
    headerSubText: 'You can follow the following tips to get higher scores',
  }
  componentWillMount() {
    generalUtils.setDataFromApi('recommendations', user.getUserData()).then(res => {
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
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 5
  },
  SingleTitleContainer: {
    flex: 1
  },
  SingleTitle: {
    alignItems: 'flex-start',
    fontSize: 17,
    textAlign: 'left'
  },
  spinnerStyle: {
    paddingTop: 150
  }
});

export { Recommends };
