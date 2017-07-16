import React, { Component } from 'react';
// import firebase from 'firebase';
import {
  StyleSheet,
  // ListView,
  View,
  Text,
  Alert,
  StatusBar,
  // AppState,
  TouchableWithoutFeedback,
  ScrollView,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { Button, Spinner, CardSection, ShapedTextInput } from '../common/';
import generalUtils from '../../utils/generalUtils';
import user from '../../utils/user';

class Options extends Component {
  state = {
    wordsPerDayOptions: [10, 20, 30, 40, 50],
  }
  componentWillMount() {
    const title = this.props.option === 0 ? this.props.lang.title.words_a_day : this.props.option === 1 ? this.props.lang.title.level_edit : this.props.option === 2 ? this.props.lang.title.contact_us : this.props.lang.title.cancel;
    Actions.refresh({ title, hideNavBar: this.props.option === 2, hideTabBar: this.props.option === 2 });
    if (this.props.option === 0 && this.props.wordsPerDay) {
      this.setState({ wordsPerDay: parseInt(this.props.wordsPerDay, 10) });
    } else if (this.props.options === 1 && this.props.level) {
      this.setState({ level: this.props.level });
    }
    if (this.props.option === 1) {
      generalUtils.getDataFromApi('levels').then(data => {
        this.setState({ levelsOptions: data });
      }).catch(reason => console.log(reason));
    }
  }
  componentDidMount() {

  }
  componentWillUnmount() {

  }
  onPressMe(key, data) {
    Actions[this.props.parent]({ data: { [key]: data } });
  }
  updateInput(name, data) {
    this.setState({ [name]: data });
  }
  submit() {
    if (!this.state.phone || this.state.phone.length < 10) {
      return Alert.alert(
      'Error',
      this.props.lang.text.phoneError,
        [
          { text: this.props.lang.title.ok, onPress: () => '' },
          // { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          // { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false }
      );
    } else if (!this.state.message || this.state.message.length < 1) {
      return Alert.alert(
      'Error',
      this.props.lang.text.messageError,
        [
          { text: this.props.lang.title.ok, onPress: () => '' },
          // { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          // { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false }
      );
    }
    this.setState({ loading: true });
    this.apiData = user.getUserData();
    this.apiData.telephone = this.state.phone;
    this.apiData.message = this.state.message;
    generalUtils.setDataFromApi('contactus', this.apiData).then(res => {
      Alert.alert(
        res.status,
        res.message,
        [
          { text: this.props.lang.title.ok, onPress: () => this.setState({ phone: '', message: '', loading: false }) },
          // { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          // { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false }
      );
    });
  }
  renderButton() {
    if (this.state.loading) {
      return <Spinner size='large' colors='white' />;
    }
    return (
      <Button
        text={this.props.lang.title.send}
        style={styles.ContactButton}
        textStyle={styles.ContactButtonText}
        onPressMe={this.submit.bind(this)}
      />
    );
  }
  renderOptions() {
    if (this.props.option === 0) {
      return this.state.wordsPerDayOptions.map((value, key) =>
        <Button
          key={key}
          text={`${value} a Day`}
          style={[styles.submitButton, value === parseInt(this.props.wordsPerDay, 10) ? { backgroundColor: '#ff0050' } : '']}
          textStyle={styles.submitButtonText}
          onPressMe={this.onPressMe.bind(this, 'words', JSON.stringify(value))}
        />
      );
    } else if (this.props.option === 1 && this.state.levelsOptions) {
      return this.state.levelsOptions.map((value, key) =>
        <Button
          key={key}
          text={value.level_name}
          style={[styles.submitButton, value.level_name === this.props.level ? { backgroundColor: '#ff0050' } : '']}
          textStyle={styles.submitButtonText}
          onPressMe={this.onPressMe.bind(this, 'level', value.level_name)}
        />
      );
    } else if (this.props.option === 2) {
      return (
        <View style={[styles.userAuth, { padding: 0 }]}>
          <View style={styles.backButton}>
            <TouchableWithoutFeedback onPress={() => Actions.pop()} style={{ margin: 10 }}>
              <Icon name='arrow-left' size={20} color='white' />
            </TouchableWithoutFeedback>
          </View>
          <StatusBar barStyle='light-content' />
          <ScrollView style={[styles.userAuth, { flex: 1 }]} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always'>
            <View style={styles.FlexI}>
              <View style={{ flex: 1 }}>
                <Image source={{ uri: 'logo_white' }} style={styles.logo} />
              </View>
              <View style={{ flex: 2, paddingLeft: 10 }}>
                <Text style={styles.textI}>{this.props.lang.title.contact_us}</Text>
                <Text style={styles.textII}>
                  {this.props.lang.text.contact_text_I}
                </Text>
              </View>
            </View>
            <View style={styles.FlexII}>
              <CardSection>
                <ShapedTextInput
                  placeholder={this.props.lang.title.placeholder_phone}
                  placeholderColor={'white'}
                  name='phone'
                  onChangeText={this.updateInput.bind(this)}
                  keyboardType={'phone-pad'}
                  value={this.state.phone}
                  icon={['mobile', 40, 5, 13]}
                />
              </CardSection>
              <CardSection>
                <ShapedTextInput
                  style={styles.input}
                  TextInputStyle={styles.TextInputStyle}
                  placeholder={this.props.lang.title.placeholder_message}
                  placeholderColor={'white'}
                  name='message'
                  onChangeText={this.updateInput.bind(this)}
                  value={this.state.message}
                  editable
                  multiline
                  numberOfLines={10}
                  maxLength={400}
                />
                <View style={styles.waterMark}>
                  <Icon name='comment-o' size={150} color='rgba(255,255,255,0.1)' />
                </View>
              </CardSection>
              <Text style={styles.textII}>
                {this.props.lang.text.contact_text_II}
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
    return <Spinner size='large' colors='#ff0050' />;
  }
  render() {
    return (
      <View style={[styles.mainContainer, this.props.option === 2 ? { marginTop: 0 } : '']}>
        {this.renderOptions()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: 60,
    backgroundColor: 'white',
  },
  backButton: {
    flex: 1,
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 500,
    padding: 10,
    width: 50,
    height: 50,
    top: 10,
    left: 10
  },
  submitButton: {
    backgroundColor: '#00cccc',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
    marginBottom: 0,
    borderRadius: 250,
    height: 50
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '600'
  },
  contactContainer: {
    padding: 20
  },
  input: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.2)',
    position: 'relative',
    zIndex: 50
  },
  TextInputStyle: {
    color: 'white',
    paddingRight: 20,
    fontSize: 18,
    lineHeight: 30,
    flex: 1,
    paddingTop: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: 5,
    textAlignVertical: 'top',
  },
  waterMark: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0
  },
  flexOne: {
    height: 130
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
    top: 10,
    right: 0,
    left: 0,
    height: 80
  },
  textHelp: {
    textAlign: 'center',
    color: 'white'
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
    textAlign: 'center'
  },
  textII: {
    color: 'white',
    textAlign: 'center'
  },
  userAuth: {
    flex: 1,
    padding: 30,
    paddingBottom: 0,
    backgroundColor: '#FF2C55',
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
  ContactButton: {
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,1)',
    marginTop: 10,
  },
  ContactButtonText: {
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

export { Options };
