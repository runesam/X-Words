import React, { Component } from 'react';
// import firebase from 'firebase';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  StatusBar,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native';
import renderIf from 'render-if';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Button,
  CardSection,
  ShapedTextInput,
  Spinner,
  PickerView,
  PickerButton,
  HscrollView
} from './common/';
import generalUtils from '../utils/generalUtils';
// import signUpUtils from '../utils/signUpUtils';
import optionData from '../json/levelOptionData.json';
import interestsDataOrigin from '../json/interestsData.json';

const _ = require('lodash');

let newData;

let counter = 0;
class SignUpForm extends Component {
  state= {
    email: null,
    phone: '',
    level: 0,
    openPickerView: false,
    interestsData: '',
    newInterests: '',
    error: ['email', 'phone', 'level', 'interestsData'],
    submitted: false
  }
  componentWillMount() {
    generalUtils.storageGetAllItems();
    generalUtils.storageGetItem('signupData').done((response) => {
      if (response) {
        this.setState({ interestsData: response.interestsData });
        this.validationChecker('interestsData');
      } else {
        this.setState({ interestsData: interestsDataOrigin });
        generalUtils.storageSetItem('signupData', { interestsData: this.state.interestsData });
      }
    });
  }
  onPressMe() {
    this.setState({ submitted: true });
    Object.keys(this.state).forEach((key) => {
      this.validationChecker(key);
    });
    setTimeout(() => {
      Object.keys(this.state).forEach((key) => {
        const value = this.state[key];
        console.log(`${key} : ${value}`);
        console.log(this.state.interestsData);
      });
    });
    // firebase.auth().signInWithEmailAndPassword(this.state.Email, this.state.PassWord)
    // .then(this.onLoginSuccess.bind(this))
    // .catch(
    //   () => {
    //        this.state.Email, this.state.PassWord)
    //     .then(this.onSignupSuccess.bind(this))
    //     .catch(this.onEverythingFail.bind(this));
    //   }
    // );
  }
  ComponentDidUpdate() {
    console.log(123);
    this.setState({
      interestsData: newData
    });
    Object.keys(this.state).forEach((key) => {
      this.validationChecker(key);
    });
  }
  updateInput(type, value) {
    newData = this.state.interestsData;
    let saveTimer = null;
    switch (type) {
      case 'email':
      case 'phone':
        this.setState({ [type]: value });
        break;
      case 'level':
        this.setState({ [type]: value });
        break;
      case 'interestsData':
        newData[value].active = !newData[value].active;
        clearTimeout(saveTimer);
        saveTimer = setTimeout(() => {
          // signUpUtils.updateInterestsData(this.state.interestsData, value, 'active');

        }, 1000);

        break;
      default:
    }
  }
  alertRender() {
    if (this.props.error && counter === 1 && !this.props.user) {
      counter++;
      Alert.alert(
        this.props.error.code,
        this.props.error.message,
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]
      );
    } else if (this.props.user && counter === 1 && !this.props.error) {
      counter++;
      Alert.alert(
        'Success',
        'Logged In Successfully',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]
      );
    }
  }
  togglePicker() {
    Keyboard.dismiss();
    this.setState({ openPickerView: !this.state.openPickerView });
  }
  validationChecker(type) {
    const tempError = this.state.error;
    switch (type) {
      case 'email':
        if (!generalUtils.validateEmail(this.state.email)) {
          if (!tempError.includes(type)) {
            tempError.push(type);
          }
        } else {
          _.remove(tempError, (n) => n === type);
        }
        break;
      case 'phone':
        if (!generalUtils.validatePhone(this.state.phone)) {
          if (!tempError.includes(type)) {
            tempError.push(type);
          }
        } else {
          _.remove(tempError, (n) => n === type);
        }
        break;
      case 'level':
        if (this.state[type] === 0 || this.state[type] === '0') {
          if (!tempError.includes(type)) {
            tempError.push(type);
          }
        } else {
          _.remove(tempError, (n) => n === type);
        }
        break;
      case 'interestsData':
        if (!_.find(this.state[type], (data) => data.active)) {
          if (!tempError.includes(type)) {
            tempError.push(type);
          }
        } else {
          _.remove(tempError, (n) => n === type);
        }
      break;
      default:
    }
    this.setState({ error: tempError });
    if (_.isEmpty(this.state.error)) {
      this.setState({ valid: true });
    } else {
      this.setState({ valid: false });
    }
    console.log(this.state.error);
  }
  renderButton() {
    if (this.props.loading) {
      return <Spinner size='large' />;
    }
    return (
      <Button
        text={'Sign Up'}
        style={styles.SignUpButton}
        textStyle={[styles.SignUpButtonText, this.state.valid ? { color: 'white' } : { color: '#c5c4d6' }]}
        // disabled={!this.state.valid}
        onPressMe={this.onPressMe.bind(this)}
      />
    );
  }
  renderError() {
    if (this.state.error) {
      return <Text style={styles.error_text}>{this.state.error}</Text>;
    }
  }
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss.bind(this)}>
        <Image source={{ uri: 'user_auth' }} style={styles.userAuth}>
          <StatusBar barStyle='light-content' />
          {renderIf(this.state.openPickerView && !this.props.deviceAndroid)(
            <View style={styles.PickerView}>
              <PickerView
                data={optionData}
                name='level'
                togglePicker={this.togglePicker.bind(this)}
                onChangeText={this.updateInput.bind(this)}
              />
            </View>
          )}
          <ScrollView style={{ flex: 7 }} showsVerticalScrollIndicator={false}>
            <View style={styles.FlexI}>
              <View style={{ flex: 1 }}>
                <Image source={{ uri: 'logo_white' }} style={styles.logo} />
              </View>
              <View style={{ flex: 2, paddingLeft: 10 }}>
                <Text style={styles.textI}>{'Register'}</Text>
                <Text style={styles.textII}>
                  {'Register to get our free offers and more ways to approve your English'}
                </Text>
              </View>
            </View>
            <View style={styles.FlexII}>
              <CardSection>
                <ShapedTextInput
                  placeholder='Email'
                  name='email'
                  onChangeText={this.updateInput.bind(this)}
                  keyboardType={'email-address'}
                  value={this.state.email}
                  inValid={this.state.error.includes('email') && this.state.submitted}
                />
              </CardSection>
              <CardSection>
                <ShapedTextInput
                  placeholder='5xx xxx xx xx'
                  name='phone'
                  onChangeText={this.updateInput.bind(this)}
                  keyboardType={'phone-pad'}
                  value={this.state.phone}
                  inValid={this.state.error.includes('phone') && this.state.submitted}
                />
              </CardSection>
              {/* <CardSection>
                <ShapedTextInput
                  placeholder='Password (at least 8 letters)'
                  name='password'
                  onChangeText={this.updateInput.bind(this)}
                  secureTextEntry
                  value={this.state.password}
                  inValid={!this.state.error.includes('password') && !this.state.submitted}
                />
              </CardSection> */}
              {renderIf(!this.props.deviceAndroid)(
                <PickerButton
                  data={optionData}
                  level={this.state.level}
                  togglePicker={this.togglePicker.bind(this)}
                  inValid={this.state.error.includes('level') && this.state.submitted}
                />
              )}
              {renderIf(this.props.deviceAndroid)(
                <View style={{ flex: 1, borderRadius: 10 }}>
                <PickerView
                  data={optionData}
                  name='level'
                  deviceAndroid={this.props.deviceAndroid}
                  onChangeText={this.updateInput.bind(this)}
                  selectedValue={this.state.level}
                  inValid={this.state.error.includes('level') && this.state.submitted}
                />
              </View>
              )}
              <View style={styles.topics} >
                <View style={styles.line} />
                <Text style={styles.topicsText}>{'Choose Some Interests'}</Text>
                <View style={styles.line} />
              </View>
              <HscrollView
                data={this.state.interestsData}
                name='interestsData'
                onChangeText={this.updateInput.bind(this)}
                inValid={this.state.error.includes('interestsData') && this.state.submitted}
              />
              {this.renderButton()}
            </View>
          </ScrollView>
          <View style={styles.flexOne}>
            <View style={styles.lineHelp} />
            <View style={styles.textHelpContainer}>
              <Text style={styles.textHelp}>
                {'Having troubles please call us on'}
              </Text>
              <View style={styles.phoneContainer}>
                <Icon name='phone-square' size={30} color='white' />
                <Text style={styles.phoneContainerText}>
                  {'0 (212) 988 - 19 88'}
                </Text>
              </View>
            </View>
          </View>
        </Image>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  flexOne: {
    flex: 0.2,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: 100,
    paddingTop: 5
  },
  lineHelp: {
    flex: 1,
    paddingTop: 10,
    position: 'absolute',
    top: 5,
    right: 0,
    left: 0,
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  textHelpContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
    height: 80
  },
  textHelp: {
    textAlign: 'center',
    color: 'white'
  },
  PickerView: {
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 90
  },
  topics: {
    marginTop: 20,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  topicsText: {
    flex: 4,
    backgroundColor: 'rgba(0,0,0,0)',
    color: '#c5c4d6',
    textAlign: 'center',
    marginTop: -10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  line: {
    flex: 1,
    alignSelf: 'flex-start',
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  textI: {
    fontSize: 20,
    color: 'white',
    paddingBottom: 5,
  },
  textII: {
    color: 'white'
  },
  error_text: {
    fontSize: 15,
    color: 'red',
    paddingTop: 5,
    paddingLeft: 5,
    alignSelf: 'center'
  },
  userAuth: {
    flex: 1,
    padding: 30,
    paddingBottom: 100,
    width: null,
    height: null,
  },
  FlexI: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  logo: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain'
  },
  FlexII: {
    flex: 5,
    marginTop: 10
  },
  SignUpButton: {
    flex: 1,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginTop: 10,
  },
  SignUpButtonText: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 15,
    paddingBottom: 15
  },
  phoneContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneContainerText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    paddingLeft: 10
  }
});

module.exports = SignUpForm;
