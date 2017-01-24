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
  // AsyncStorage
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

import optionData from './json/levelOptionData.json';
import interestsData from './json/interestsData.json';

let counter = 0;
class SignUpForm extends Component {
  state= {
    email: '',
    phone: '',
    password: '',
    level: optionData[0].default.text,
    openPickerView: false,
    interestsData: {}
  }
  componentWillMount() {
  //   try {
  //     const value = AsyncStorage.getItem('interests');
  //     if (value !== null) {
  //      this.setState({ interestsData: value});
  //      console.log('Recovered selection from disk: ' + value);
  //     } else {
  //       try {
  //         AsyncStorage.setItem('interests', interestsData);
  //         console.log('Saved selection to disk: ' + selectedValue);
  //       } catch (error) {
  //         console.log('AsyncStorage error: ' + error.message);
  //       }
  //      console.log('Initialized with no selection on disk.');
  //    }
  //  } catch (error) {
  //    console.log('AsyncStorage error: ' + error.message);
  //  }
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
    //   case 'email':
    //     this.props.emailChanged(value);
    //     break;
    //   case 'phone':
    //     this.props.emailChanged(value);
    //     break;
    //   case 'password':
    //     this.props.passwordChanged(value);
    //     break;
    //   case 'level':
    //     this.props.emailChanged(value);
    //     break;
    //   default:
    // }
    this.setState({ [type]: value });
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
  togglePicker() {
    Keyboard.dismiss();
    this.setState({ openPickerView: !this.state.openPickerView });
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
        {renderIf(this.state.openPickerView)(
          <View style={styles.PickerView}>
            <PickerView
              data={optionData}
              name='level'
              togglePicker={this.togglePicker.bind(this)}
              onChangeText={this.updateInput.bind(this)}
            />
          </View>
        )}
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
          <PickerButton
            data={optionData}
            level={this.state.level}
            togglePicker={this.togglePicker.bind(this)}
          />
          <View style={styles.topics} >
            <View style={styles.line} />
            <Text style={styles.topicsText}>{'Choose Some Interests'}</Text>
            <View style={styles.line} />
          </View>
          <HscrollView
            data={interestsData}
            name='interests'
            onChangeText={this.updateInput.bind(this)}
          />
        </View>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  PickerView: {
    position: 'absolute',
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
    flex: 2.5,
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
});

module.exports = SignUpForm;
