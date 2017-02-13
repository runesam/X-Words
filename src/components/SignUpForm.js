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
  ScrollView
} from 'react-native';
import renderIf from 'render-if';
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
import signUpUtils from '../utils/signUpUtils';
import optionData from './json/levelOptionData.json';
import interestsDataOrigin from './json/interestsData.json';

const _ = require('lodash');

let counter = 0;
class SignUpForm extends Component {
  state= {
    email: null,
    phone: '',
    password: '',
    level: 0,
    openPickerView: false,
    interestsData: '',
    error: []
  }
  componentWillMount() {
    console.log(optionData[0]);
    generalUtils.storageGetAllItems();
    generalUtils.storageGetItem('signupData').done((response) => {
      if (response) {
        this.setState({ interestsData: response.interestsData });
      } else {
        this.setState({ interestsData: interestsDataOrigin });
        generalUtils.storageSetItem('signupData', { interestsData: this.state.interestsData });
      }
    });
  }
  onEverythingFail() {
    console.log('onEverythingFail');
    this.setState({ error: 'Authentication Failed', loading: false });
    console.log(this.state.error);
  }
  onLoginSuccess() {
    console.log('onLoginSuccess');
    this.setState({
      email: '',
      phone: '',
      password: '',
      loading: false,
      error: null,
      loginSuccess: true
    });
  }
  onSignupSuccess() {
    console.log('onSignupSuccess');
    this.setState({
      Email: '',
      PassWord: '',
      loading: false,
      error: null,
      signupSuccess: true
    });
  }
  onPressMe() {
    Object.keys(this.state).forEach((key) => {
      const value = this.state[key];
      console.log(`${key} : ${value}`);
    });
    // this.state.forEach((value, key) => {
    //   console.log(`${key}' : '${value}`);
    // });
    // if (!this.state.loading) {
    //   this.setState({ error: null, loading: true });
    //   firebase.auth().signInWithEmailAndPassword(this.state.Email, this.state.PassWord)
    //   .then(this.onLoginSuccess.bind(this))
    //   .catch(
    //     () => {
    //          this.state.Email, this.state.PassWord)
    //       .then(this.onSignupSuccess.bind(this))
    //       .catch(this.onEverythingFail.bind(this));
    //     }
    //   );
    // }
  }
  updateInput(type, value) {
    switch (type) {
      case 'email':
      case 'phone':
      case 'password':
      case 'level':
        this.setState({ [type]: value });
        setTimeout(() => { console.log(this.state[type]); });
        break;
      case 'interestsData':
        this.setState({
          interestsData: signUpUtils.updateInterestsData(this.state.interestsData, value, 'active')
        });
        break;
      default:
    }
    // this.setState({ [type]: value });
    // console.log(type + value + this.state[type]);
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
          tempError.push('email');
        } else {
          _.remove(tempError, (n) => n === 'email');
        }
        break;
      case 'phone':
        if (!generalUtils.validatePhone(this.state.phone)) {
          tempError.push('phone');
        } else {
          _.remove(tempError, (n) => n === 'phone');
        }
        break;
      case 'password':
        if (this.state.password.length < 8) {
          tempError.push('password');
        } else {
          _.remove(tempError, (n) => n === 'password');
        }
        break;
      default:
    }
    this.setState({ error: tempError });
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
        disabled={!this.state.valid}
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
      <Image source={{ uri: 'user_auth' }} style={styles.userAuth}>
        <StatusBar barStyle="light-content" />
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
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.FlexI}>
            <View style={{ flex: 1 }}>
              <Image source={{ uri: 'logo_white' }} style={styles.logo} />
            </View>
            <View style={{ flex: 2, paddingLeft: 20 }}>
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
                onBlurText={this.validationChecker.bind(this)}
                keyboardType={'email-address'}
                value={this.state.email}
                valid={!this.state.error.includes('email')}
              />
            </CardSection>
            <CardSection>
              <ShapedTextInput
                placeholder='5xx xxx xx xx'
                name='phone'
                onChangeText={this.updateInput.bind(this)}
                onBlurText={this.validationChecker.bind(this)}
                keyboardType={'phone-pad'}
                value={this.state.phone}
                valid={!this.state.error.includes('phone')}
              />
            </CardSection>
            <CardSection>
              <ShapedTextInput
                placeholder='Password (at least 8 letters)'
                name='password'
                onChangeText={this.updateInput.bind(this)}
                onBlurText={this.validationChecker.bind(this)}
                secureTextEntry
                value={this.state.password}
                valid={!this.state.error.includes('password')}
              />
            </CardSection>
            {renderIf(!this.props.deviceAndroid)(
              <PickerButton
                data={optionData}
                level={this.state.level}
                togglePicker={this.togglePicker.bind(this)}
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
            />
            {this.renderButton()}
          </View>
        </ScrollView>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
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
  }
});

module.exports = SignUpForm;
