import React, { Component } from 'react';
// import firebase from 'firebase';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  // TextInput
  StatusBar,
  // Picker
} from 'react-native';
import {
  Button,
  // Card,
  CardSection,
  ShapedTextInput,
  Spinner,
  ShapedSelectInput
} from './common/';

import optionData from './json/levelOptionData.json';

let counter = 0;
class SignUpForm extends Component {
  state= {
    Email: '',
    phone: '',
    PassWord: '',
    level: '',
    error: null,
    loading: false,
    loginSuccess: false,
    signupSuccess: false
  }
  componentWillMount() {
    console.log(optionData);
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
    // switch (type) {
    //   case 'Email':
    //     this.props.emailChanged(value);
    //     break;
    //   case 'Password':
    //     this.props.passwordChanged(value);
    //     break;
    //   default:
    // }
    // this.setState({ [type]: value });
    console.log(type + value);
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
      <Image source={{ uri: 'user_auth' }} style={styles.userAuth}>
        <StatusBar barStyle="light-content" />
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
              keyboardType={'email-address'}
              // keyboardType={'phone-pad'}
              value={this.state.email}
            />
          </CardSection>
          <CardSection>
            <ShapedTextInput
              placeholder='Telephone'
              name='phone'
              onChangeText={this.updateInput.bind(this)}
              keyboardType={'phone-pad'}
              value={this.state.phone}
            />
          </CardSection>
          <CardSection>
            <ShapedTextInput
              placeholder='Password'
              name='password'
              onChangeText={this.updateInput.bind(this)}
              secureTextEntry
              value={this.state.password}
            />
          </CardSection>
            {this.renderError()}
          <CardSection>
            <ShapedSelectInput
              data={optionData}
              name='level'
              onChangeText={this.updateInput.bind(this)}
            />
          </CardSection>
        </View>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  view_style: {

  },
  view_text: {

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
    // justifyContent: 'center',
    // alignItems: 'center',
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
});

module.exports = SignUpForm;
