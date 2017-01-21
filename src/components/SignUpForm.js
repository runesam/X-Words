import React, { Component } from 'react';
// import firebase from 'firebase';
import {
  StyleSheet,
  Text,
  // View,
  Image,
  Alert,
  // TextInput
} from 'react-native';
import {
  Button,
  // Card,
  CardSection,
  ShapedTextInput,
  Spinner
} from './common/';

const Logo = require('./images/logo_small.png');
const backgroundImageI = require('./images/main_background.png');

const Phone = require('./images/phone.png');
const Email = require('./images/email.png');

let counter = 0;
class SignUpForm extends Component {
  state= {
    Email: '',
    PassWord: '',
    error: null,
    loading: false,
    loginSuccess: false,
    signupSuccess: false
  }
  componentWillUpdate() {

  }
  onEverythingFail() {
    console.log('onEverythingFail');
    this.setState({ error: 'Authentication Failed', loading: false });
    console.log(this.state.error);
  }
  onLoginSuccess() {
    console.log('onLoginSuccess');
    this.setState({
      Email: '',
      PassWord: '',
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
    counter = 1;
    const email = this.props.email;
    const password = this.props.password;
    this.props.loginUser({ email, password });
    // if (!this.state.loading) {
    //   this.setState({ error: null, loading: true });
    //   firebase.auth().signInWithEmailAndPassword(this.state.Email, this.state.PassWord)
    //   .then(this.onLoginSuccess.bind(this))
    //   .catch(
    //     () => {
    //       firebase.auth().createUserWithEmailAndPassword(this.state.Email, this.state.PassWord)
    //       .then(this.onSignupSuccess.bind(this))
    //       .catch(this.onEverythingFail.bind(this));
    //     }
    //   );
    // }
  }
  updateInput(type, value) {
    switch (type) {
      case 'Email':
        this.props.emailChanged(value);
        break;
      case 'Password':
        this.props.passwordChanged(value);
        break;
      default:
    }
    this.setState({ [type]: value });
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
  renderButton() {
    if (this.props.loading) {
      return <Spinner size='large' />;
    }
    return <Button text={'Login'} onPressMe={this.onPressMe.bind(this)} />;
  }
  renderError() {
    if (this.state.error) {
      return <Text style={styles.error_text}>{this.state.error}</Text>;
    }
  }
  render() {
    return (
      <Image source={backgroundImageI} style={styles.backgroundImageI}>
        <Image source={Logo} style={styles.backgroundImageII} />
          <CardSection>
            <ShapedTextInput
              text='Phone'
              placeholder='5xx 4xx 9x 8x'
              name='Phone'
              onChangeText={this.updateInput.bind(this)}
              keyboardType={'phone-pad'}
              value={this.state.phone}
              iconImage={Phone}
            />
          </CardSection>
          <CardSection>
            <ShapedTextInput
              text='Email'
              placeholder='example@etc.com'
              name='Email'
              onChangeText={this.updateInput.bind(this)}
              secureTextEntry
              keyboardType={'email-address'}
              value={this.state.email}
              iconImage={Email}
            />
          </CardSection>
            {this.renderError()}
          <CardSection>
            {this.renderButton()}
          </CardSection>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  view_style: {

  },
  view_text: {

  },
  error_text: {
    fontSize: 15,
    color: 'red',
    paddingTop: 5,
    paddingLeft: 5,
    alignSelf: 'center'
  },
  backgroundImageI: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    width: null,
    height: null,
  },
  backgroundImageII: {
    marginTop: 30,
    alignSelf: 'center',
  },
});

module.exports = SignUpForm;
