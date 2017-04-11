import React, { Component } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View, Text } from 'react-native';
import { Scene, Router, Actions, Modal } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconBack from 'react-native-vector-icons/MaterialCommunityIcons';

import { Slider, Interests, Levels, SignUpForm, HomePageHolder, ChooseWordsHolder, ConfirmWords, QuizHolder } from './components/singlePages/';

import LoginForm from './components/LoginForm';
import LearnWithPhotoHolder from './components/learnWithPhoto/learnWithPhotoHolder';
import testWithPhotos from './components/testWithPhotos/testWithPhotos';
import LearnWithoutHolder from './components/learnWithout/learnWithoutHolder';
import PurchaseHolder from './components/purchase/purchaseHolder';

const singleTab = class singleTab extends Component {
  state={

  }
  componentWillMount() {

  }
  render() {
    return (
      <View style={styles.singleTabStyle}>
        <Icon name={this.props.iconName || 'home'} size={30} color={this.props.selected ? 'black' : 'rgba(0,0,0,0.5)'} />
        <Text style={this.props.selected ? { color: 'black' } : { color: 'rgba(0,0,0,0.5)' }}>{this.props.title}</Text>
      </View>
    );
  }
};

class RouterComponent extends Component {
  state={

  }
  componentWillMount() {

  }
  onPressMe() {
    Actions.pop();
  }
  backRender(color) {
    return () =>
      <TouchableWithoutFeedback onPress={this.onPressMe.bind(this)}>
        <IconBack name='keyboard-backspace' size={30} color={color} />
      </TouchableWithoutFeedback>
    ;
  }
  render() {
    return (
      <Router duration={500} >
        <Scene key="modal" component={Modal} >
          <Scene key='root'>
            <Scene
              key='slider'
              component={Slider}
              deviceAndroid={this.props.deviceAndroid}
              lang={this.props.lang}
              hideNavBar
            />
            <Scene
              key='interests'
              component={Interests}
              hideNavBar
              sceneStyle={styles.view_style}
              deviceAndroid={this.props.deviceAndroid}
              lang={this.props.lang}
            />
            <Scene
              key='levels'
              component={Levels}
              hideNavBar
              sceneStyle={styles.view_style}
              deviceAndroid={this.props.deviceAndroid}
              lang={this.props.lang}
            />
            <Scene
              key='signup'
              backTitle='back'
              navigationBarStyle={styles.navigationBarStyle}
              component={SignUpForm}
              lang={this.props.lang}
              api={this.props.api}
              title='Sign Up'
              hideNavBar
              sceneStyle={styles.view_style}
              deviceAndroid={this.props.deviceAndroid}
            />
            <Scene
              key='testWithPhotos'
              backTitle='back'
              navigationBarStyle={styles.navigationBarStyle}
              component={testWithPhotos}
              lang={this.props.lang}
              api={this.props.api}
              title='Test With Photos'
              hideNavBar
              sceneStyle={styles.view_style}
              deviceAndroid={this.props.deviceAndroid}
            />
            <Scene
              key='login'
              component={LoginForm}
              title='Please Login'
              hideNavBar={false}
            />
            <Scene
              key='PurchaseHolder'
              lang={this.props.lang}
              component={PurchaseHolder}
              title='PurchaseHolder '
              hideNavBar
              sceneStyle={styles.view_style}
            />
            {/* page with tabs starts */}
            <Scene
              key='main'
              tabs
              tabBarStyle={styles.tabBarStyle}
              tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}
              initial
            >
              {/* first tab starts */}
              <Scene
                key='Home'
                iconName='home'
                icon={singleTab}
                lang={this.props.lang}
                deviceAndroid={this.props.deviceAndroid}
                title={this.props.lang.title.home_tab}
                hideNavBar
                passProps
              >
                <Scene
                  key='HomePageHolder'
                  component={HomePageHolder}
                  lang={this.props.lang}
                  sceneStyle={styles.tabSceneStyle}
                  renderBackButton={this.backRender('white')}
                />
                <Scene
                  key='ConfirmWords'
                  title={this.props.lang.title.confirmWords_pageTitle}
                  component={ConfirmWords}
                  hideNavBar={false}
                  hideTabBar
                  navigationBarStyle={styles.navigationBarStyle}
                  renderBackButton={this.backRender('white')}
                />
                <Scene
                  key='QuizHolder'
                  title={this.props.lang.title.confirmWords_pageTitle}
                  component={QuizHolder}
                  hideNavBar={false}
                  hideTabBar
                  navigationBarStyle={styles.navigationBarStyle}
                  renderBackButton={this.backRender('white')}
                />
                <Scene
                  key='ChooseWordsHolder'
                  title={this.props.lang.title.chooseWords_pageTitle}
                  component={ChooseWordsHolder}
                  hideNavBar={false}
                  hideTabBar
                  navigationBarStyle={styles.navigationBarStyle}
                  renderBackButton={this.backRender('white')}
                />
                <Scene
                  key='LearnWithPhotoHolder'
                  title=''
                  component={LearnWithPhotoHolder}
                  hideNavBar={false}
                  navigationBarStyle={styles.navigationBarStyle}
                  renderBackButton={this.backRender('white')}
                />
                <Scene
                  key='LearnWithoutHolder'
                  component={LearnWithoutHolder}
                  hideNavBar={false}
                  navigationBarStyle={styles.navigationBarStyle}
                  renderBackButton={this.backRender('white')}
                />
              </Scene>
              {/* first tab ends */}
              {/* second tab starts */}
              <Scene
                key='practice'
                title={this.props.lang.title.practice_tab}
                iconName='bolt'
                component={HomePageHolder}
                hideNavBar
                lang={this.props.lang}
                icon={singleTab}
                sceneStyle={styles.tabSceneStyle}
                renderBackButton={this.backRender('white')}
              />
              {/* second tab ends */}
              {/* third tab starts */}
              <Scene
                key='profile'
                title={this.props.lang.title.profile_tab}
                iconName='user'
                component={HomePageHolder}
                hideNavBar
                lang={this.props.lang}
                icon={singleTab}
                sceneStyle={styles.tabSceneStyle}
                renderBackButton={this.backRender('white')}
              />
              {/* third tab ends */}
              {/* forth tab starts */}
              <Scene
                key='settings'
                title={this.props.lang.title.settings_tab}
                iconName='sliders'
                component={HomePageHolder}
                hideNavBar
                lang={this.props.lang}
                icon={singleTab}
                sceneStyle={styles.tabSceneStyle}
                renderBackButton={this.backRender('white')}
              />
              {/* forth tab ends */}
            </Scene>
            {/* page with tabs ends */}
          </Scene>
        </Scene>
      </Router>
    );
  }
}

module.exports = RouterComponent;

const styles = StyleSheet.create({
  view_style: {

  },
  view_text: {

  },
  error_text: {

  },
  titleStyle: {

  },
  navigationBarStyle: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderBottomWidth: 0,
  },
  tabSceneStyle: {

  },
  singleTabStyle: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabBarStyle: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  tabBarSelectedItemStyle: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
});
