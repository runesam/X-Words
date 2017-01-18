import React, { Component } from 'react';
// import firebase from 'firebase';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  // TextInput
} from 'react-native';
import { emailChanged, passwordChanged, loginUser, clearAlert } from '../actions/';
import {
  Button,
  Card,
  CardSection,
  AppTextInput,
  Spinner
} from './common/';

let counter = 0;
class LoginForm extends Component {
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
    console.log(this.props.user);
    return (
      <View style={styles.view_style}>
        <Card>
          <CardSection>
            <AppTextInput
              text='E-mail'
              placeholder='example@test.com'
              name='Email'
              onChangeText={this.updateInput.bind(this)}
              keyboardType={'email-address'}
              value={this.props.email}
            />
          </CardSection>
          {this.alertRender()}
          <CardSection>
            <AppTextInput
              text='Password'
              placeholder='password'
              name='Password'
              onChangeText={this.updateInput.bind(this)}
              secureTextEntry
              value={this.props.password}
            />
          </CardSection>
            {this.renderError()}
          <CardSection>
            {this.renderButton()}
          </CardSection>
        </Card>
      </View>
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
  }
});

const mapStateToProps = (state) => {
  const data = {};
  data.email = state.auth.email;
  data.password = state.auth.password;
  data.user = state.auth.user;
  data.error = state.auth.error;
  data.loading = state.auth.loading;
  return data;
};

const Actions = {
  emailChanged,
  passwordChanged,
  loginUser,
  clearAlert
};

module.exports = connect(mapStateToProps, Actions)(LoginForm);
