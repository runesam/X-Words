import React, { Component } from 'react';
// import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import {
StyleSheet,
// Text,
View,
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import {
  // Header,
  // Button,
  // Spinner,
  // CardSection
} from './components/common/';
// import LoginForm from './components/LoginForm';
import Router from './Router';
// import LibraryList from './components/LibraryList';
import lang from './json/lang_en.json';

class App extends Component {
  state = {
    store: createStore(reducers, {}, applyMiddleware(ReduxThunk)),
    lang
  }
  componentWillMount() {
    // const config = {
    //   apiKey: 'AIzaSyDWIqk__XudJoxv8dEu1VpE8TdByVFUUKM',
    //   authDomain: 'manager-7edd8.firebaseapp.com',
    //   databaseURL: 'https://manager-7edd8.firebaseio.com',
    //   storageBucket: 'manager-7edd8.appspot.com',
    //   messagingSenderId: '111479488991'
    // };
    // firebase.initializeApp(config);
  }
  componentDidMount() {

  }
  render() {
    return (
      <Provider store={this.state.store}>
        <View style={styles.view_style}>
          <Router deviceAndroid={this.props.deviceAndroid} lang={this.state.lang} />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  view_style: {
    flex: 1
  },
  view_text: {

  },
});

module.exports = App;
