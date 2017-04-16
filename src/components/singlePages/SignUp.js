import React, { Component } from 'react';
// import firebase from 'firebase';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  StatusBar,
  // Keyboard,
  ScrollView,
  // TouchableWithoutFeedback
} from 'react-native';
// import renderIf from 'render-if';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Button,
  CardSection,
  ShapedTextInput,
  Spinner,
} from '../common/';
import generalUtils from '../../utils/generalUtils';

const _ = require('lodash');

class SignUpForm extends Component {
  state= {
    name: null,
    phone: null,
    email: null,
    password: null,
    interests: null,
    level: null,
    error: ['name', 'phone', 'email', 'password'],
    submitted: false
  }
  componentWillMount() {
    generalUtils.storageGetItem('levelOptionData').then((data) => {
      this.setState({ level: data });
    });
    generalUtils.storageGetItem('interestsData').then((data) => {
      this.setState({ interests: data });
    });
    generalUtils.storageGetAllItems();
  }
  onPressMe() {
    const errorText = {};
    if (_.isEmpty(this.state.error)) {
      const apiData = {};
      // Alert.alert('everything', 'thing is', [{ text: 'ok' }]);
      apiData.name = this.state.name;
      apiData.phone = this.state.phone;
      apiData.email = this.state.email;
      apiData.password = this.state.password;
      apiData.interests = this.state.interests;
      apiData.level = this.state.level;
      generalUtils.setDataFromApi(this.props.api.register, apiData)
      .then(data => {
        if (data.result) {
          generalUtils.storageSetItem('memberId', data.member_id);
          generalUtils.storageSetItem('status', 'test');
          Actions.testWithPhotos();
        } else {
          Alert.alert(
            this.props.lang.title.error,
            data.message,
            [{ text: this.props.lang.title.ok }]
          );
        }
      })
      .catch(reason => console.log(reason));
    } else {
      switch (this.state.error[0]) {
        case 'name':
          errorText.val = this.props.lang.text.nameError;
          break;
        case 'phone':
          errorText.val = this.props.lang.text.phoneError;
          break;
        case 'email':
          errorText.val = this.props.lang.text.emailError;
          break;
        case 'password':
          errorText.val = this.props.lang.text.passwordError;
          break;
        default:
      }
      Alert.alert(
        this.props.lang.title.error,
        errorText.val,
        [{ text: this.props.lang.title.ok }]
      );
    }
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

  }
  updateInput(type, value) {
    switch (type) {
      case 'name':
      case 'phone':
      case 'email':
      case 'password':
        this.setState({ [type]: value });
        break;
      default:
    }
    setTimeout(() => {
      this.validationChecker(type);
    });
  }
  validationChecker(type) {
    const tempError = this.state.error;
    switch (type) {
      case 'name':
        if (this.state.name.length < 1) {
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
      case 'email':
        if (!generalUtils.validateEmail(this.state.email)) {
          if (!tempError.includes(type)) {
            tempError.push(type);
          }
        } else {
          _.remove(tempError, (n) => n === type);
        }
        break;
      case 'password':
      if (this.state.password.length < 6) {
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
  }
  renderButton() {
    if (this.props.loading) {
      return <Spinner size='large' />;
    }
    return (
      <Button
        text={this.props.lang.title.start_test}
        style={styles.SignUpButton}
        textStyle={styles.SignUpButtonText}
        onPressMe={this.onPressMe.bind(this)}
      />
    );
  }
  render() {
    return (
      <View style={styles.userAuth}>
        <StatusBar barStyle='light-content' />
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} >
          <View style={styles.FlexI}>
            <View style={{ flex: 1 }}>
              <Image source={{ uri: 'logo_white' }} style={styles.logo} />
            </View>
            <View style={{ flex: 2, paddingLeft: 10 }}>
              <Text style={styles.textI}>{this.props.lang.title.register}</Text>
              <Text style={styles.textII}>
                {this.props.lang.text.signup_text_I}
              </Text>
            </View>
          </View>
          <View style={styles.FlexII}>
            <CardSection>
              <ShapedTextInput
                placeholder={this.props.lang.title.placeholder_name}
                placeholderColor={'white'}
                name='name'
                onChangeText={this.updateInput.bind(this)}
                keyboardType={'default'}
                value={this.state.name}
                icon={['user', 30, 10, 13]}
                inValid={this.state.error.includes('name') && this.state.submitted}
              />
            </CardSection>
            <CardSection>
              <ShapedTextInput
                placeholder={this.props.lang.title.placeholder_phone}
                placeholderColor={'white'}
                name='phone'
                onChangeText={this.updateInput.bind(this)}
                keyboardType={'phone-pad'}
                value={this.state.phone}
                icon={['mobile', 40, 5, 13]}
                inValid={this.state.error.includes('phone') && this.state.submitted}
              />
            </CardSection>
            <CardSection>
              <ShapedTextInput
                placeholder={this.props.lang.title.placeholder_email}
                placeholderColor={'white'}
                name='email'
                onChangeText={this.updateInput.bind(this)}
                keyboardType={'email-address'}
                value={this.state.email}
                icon={['envelope-o', 25, 13, 10]}
                inValid={this.state.error.includes('email') && this.state.submitted}
              />
            </CardSection>
            <CardSection>
              <ShapedTextInput
                placeholder={this.props.lang.title.placeholder_password}
                placeholderColor={'white'}
                name='password'
                onChangeText={this.updateInput.bind(this)}
                secureTextEntry
                value={this.state.password}
                icon={['lock', 25, 13, 10]}
                inValid={!this.state.error.includes('password') && !this.state.submitted}
              />
            </CardSection>
            <Text style={styles.textII}>
              {this.props.lang.text.signup_text_II}
            </Text>
          </View>
          {this.renderButton()}
          <View style={styles.flexOne}>
            <View style={styles.lineHelp} />
            <View style={styles.textHelpContainer}>
              <Text style={styles.textHelp}>
                {this.props.lang.text.trouble}
              </Text>
              <View style={styles.phoneContainer}>
                <Icon name='phone-square' size={30} color='white' />
                <Text style={styles.phoneContainerText}>
                  {this.props.lang.title.phone}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flexOne: {
    flex: 0.2,
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
    borderColor: 'rgba(255,255,255,0.3)',
  },
  textHelpContainer: {
    backgroundColor: 'rgba(255,255,255,0)',
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
    paddingBottom: 0,
    backgroundColor: '#FF2C55',
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
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,1)',
    marginTop: 10,
  },
  SignUpButtonText: {
    alignSelf: 'center',
    color: '#FF2C55',
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

export { SignUpForm };
