import React, { Component } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View, Text } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconBack from 'react-native-vector-icons/MaterialCommunityIcons';

import { Slider, Interests, Levels, SignUpForm, HomePageHolder, ChooseWordsHolder, ConfirmWords } from './components/singlePages/';

import LoginForm from './components/LoginForm';
import LearnWithPhotoHolder from './components/learnWithPhoto/learnWithPhotoHolder';
import testWithPhotos from './components/testWithPhotos/testWithPhotos';
import LearnWithoutHolder from './components/learnWithout/learnWithoutHolder';
import PurchaseHolder from './components/purchase/purchaseHolder';

let globalTabColor = null;

const singleTab = class singleTab extends Component {
  state={
    color: globalTabColor
  }
  componentWillMount() {
    console.log(globalTabColor);
    // globalTabColor = 'white';
  }
  render() {
    return (
      <View style={styles.singleTabStyle}>
        <Icon name={this.props.iconName || 'home'} size={30} color={this.props.selected ? this.state.color : 'rgba(0,0,0,0.5)'} />
        <Text style={this.props.selected ? { color: this.state.color } : { color: 'rgba(0,0,0,0.5)' }}>{this.props.title}</Text>
      </View>
    );
  }
};

class RouterComponent extends Component {
  state={
    color: null
  }
  componentWillMount() {

  }
  onPressMe() {
    Actions.pop();
  }
  replaceColor(data) {
    globalTabColor = data;
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
      <Router>
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
          initial
          tabBarStyle={styles.tabBarStyle}
          tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}
        >
          {/* first tab starts */}
          <Scene
            key='Home'
            iconName='home'
            icon={singleTab}
            lang={this.props.lang}
            title={this.props.lang.title.home_tab}
          >
            <Scene
              key='HomePageHolder'
              component={HomePageHolder}
              lang={this.props.lang}
              hideNavBar
              sceneStyle={styles.tabSceneStyle}
              deviceAndroid={this.props.deviceAndroid}
              renderBackButton={this.backRender('white')}
              replaceColor={this.replaceColor.bind(this)}
            />
            <Scene
              key='ChooseWordsHolder'
              title={this.props.lang.title.chooseWords_pageTitle}
              component={ChooseWordsHolder}
              lang={this.props.lang}
              accent={this.props.accent}
              deviceAndroid={this.props.deviceAndroid}
              hideNavBar={false}
              hideTabBar
              navigationBarStyle={styles.navigationBarStyle}
              renderBackButton={this.backRender('white')}
            />
            <Scene
              key='ConfirmWords'
              title={this.props.lang.title.confirmWords_pageTitle}
              component={ConfirmWords}
              lang={this.props.lang}
              hideNavBar={false}
              hideTabBar
              navigationBarStyle={styles.navigationBarStyle}
              renderBackButton={this.backRender('white')}
            />
            <Scene
              key='LearnWithPhotoHolder'
              component={LearnWithPhotoHolder}
              lang={this.props.lang}
              hideNavBar={false}
              navigationBarStyle={styles.navigationBarStyle}
              renderBackButton={this.backRender('white')}
              replaceColor={this.replaceColor.bind(this)}
            />
            <Scene
              key='LearnWithoutHolder'
              component={LearnWithoutHolder}
              lang={this.props.lang}
              hideNavBar={false}
              navigationBarStyle={styles.navigationBarStyle}
              renderBackButton={this.backRender('white')}
              replaceColor={this.replaceColor.bind(this)}
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
            replaceColor={this.replaceColor.bind(this)}
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
            replaceColor={this.replaceColor.bind(this)}
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
            replaceColor={this.replaceColor.bind(this)}
          />
          {/* forth tab ends */}
        </Scene>
        {/* page with tabs ends */}
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
