  import React, { Component } from 'react';
  // import firebase from 'firebase';
  import {
    StyleSheet,
    View,
    Text,
  Image,
    // Alert,
    StatusBar,
    // Keyboard,
    ScrollView,
    // TouchableWithoutFeedback
  } from 'react-native';
  import { Actions } from 'react-native-router-flux';
  // import renderIf from 'render-if';
  // import Icon from 'react-native-vector-icons/FontAwesome';
  import {
    Button,
    // CardSection,
    // ShapedTextInput,
    // Spinner,
    // PickerView,
    // PickerButton,
    // HscrollView
  } from '../common/';
  import generalUtils from '../../utils/generalUtils';
  import images from '../../json/images.json';
  // const _ = require('lodash');

  class HomePageHolder extends Component {
    state= {
      days: 10,
      words: 130
    }
    componentWillMount() {

      console.log(this.props);
      if (this.props.replaceColor) {
        this.props.replaceColor('white');
      }
      generalUtils.storageGetItem('status').then((data) => {
      this.setState({ status: data });
      });
    }
    ComponentDidUpdate() {

    }
    render() {
      return (
        <View style={styles.mainContainer}>
          <StatusBar barStyle='light-content' />
          <View style={{ flex: 10.5 }} >
            <ScrollView style={styles.scrollView} contentContainerStyle={{ flex: 1 }}>
              <View style={styles.container}>
                <View style={styles.spacer} />
                <View style={styles.header}>
                  <Text style={styles.headerText}>{this.props.lang.text.welcome}</Text>
                </View>
                <View style={styles.statistics}>
                  <View style={styles.popUpContainer}>
                    <View style={styles.spacepop} />
                    <View style={styles.popUp}>
                      <Text style={styles.popText}>{`${this.props.lang.title.days}: ${this.state.days}`}</Text>
                      <Text style={styles.popText}>{`${this.props.lang.title.words}: ${this.state.words}`}</Text>
                    </View>
                  </View>
                  <View style={styles.photoHolder}>
                    <Image source={{ uri: images.birdImage.data }} style={styles.birdImage} />
                  </View>
                </View>
                <View style={styles.startHolder}>
                  <Text style={styles.headerText}>{this.props.lang.text.starter}</Text>
                  <Button
                    text={this.props.lang.title.startLearn}
                    style={styles.SignUpButton}
                    textStyle={styles.SignUpButtonText}
                    onPressMe={Actions.ChooseWordsHolder}
                  />
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      );
    }
  }
  const styles = StyleSheet.create({
    SignUpButton: {
      borderRadius: 20,
      marginLeft: 90,
      marginRight: 90,
      backgroundColor: 'rgba(255,255,255,1)',
      marginTop: 10,
    },
    SignUpButtonText: {
      alignSelf: 'center',
      color: '#00cccc',
      fontSize: 16,
      fontWeight: '600',
      paddingTop: 10,
      paddingBottom: 10
    },
    scrollView: {
      flex: 1
    },
    container: {
      flex: 1
    },
    mainContainer: {
      flex: 1,
      backgroundColor: '#00cccc',
      paddingBottom: 50
    },
    spacer: {
      flex: 0.5
    },
    header: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#00cccc',
      paddingLeft: 40,
      paddingRight: 40
    },
    headerText: {
      fontSize: 18,
      color: 'white',
      textAlign: 'center'
    },
    popText: {
      fontSize: 18,
      color: '#00cccc',
      textAlign: 'center'
    },
    statistics: {
      flex: 3.5,
      flexDirection: 'row',
    },
    popUpContainer: {
      flex: 5,
      flexDirection: 'row',
      height: 80,
      marginTop: 10
    },
    spacepop: {
      flex: 1
    },
    popUp: {
      backgroundColor: 'white',
      borderRadius: 10,
      flex: 4,
      justifyContent: 'center'
    },
    photoHolder: {
      flex: 7,
      justifyContent: 'flex-end',
    },
    birdImage: {
      height: 160,
      width: 180,
      marginLeft: 10
    },
    startHolder: {
      flex: 1.5,
      justifyContent: 'center'
    },
  });

  module.exports = HomePageHolder;
