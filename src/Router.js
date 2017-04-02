import React, { Component } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View, Text } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/singlePages/SignUp';
import Slider from './components/singlePages/Slider';
import Interests from './components/singlePages/Interests';
import LearnWithPhotoHolder from './components/learnWithPhoto/learnWithPhotoHolder';
import Levels from './components/singlePages/Levels';
import testWithPhotos from './components/testWithPhotos/testWithPhotos';
import PurchaseHolder from './components/purchase/purchaseHolder';
import HomePageHolder from './components/singlePages/home';
import ChooseWordsHolder from './components/chooseWords/chooseWordsHolder';


const singleTab = class singleTab extends Component {
  componentWillMount() {
    // console.log(this.props);
  }
  render() {
    return (
      <View style={styles.singleTabStyle}>
        <Icon name={this.props.iconName || 'home'} size={30} color={this.props.selected ? 'white' : 'rgba(0,0,0,0.5)'} />
        <Text style={this.props.selected ? { color: 'white' } : { color: 'rgba(0,0,0,0.5)' }}>{this.props.title}</Text>
      </View>
    );
  }
};

class RouterComponent extends Component {
  onPressMe() {
    Actions.pop();
  }
  backRender(color) {
    return () =>
      <TouchableWithoutFeedback onPress={this.onPressMe.bind(this)}>
        <Icon name='chevron-circle-left' size={30} color={color} />
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
          initial
        />
        <Scene
          key='login'
          component={LoginForm}
          title='Please Login'
          hideNavBar={false}
        />
        <Scene
          key='LearnWithPhotoHolder'
          component={LearnWithPhotoHolder}
          hideNavBar
          title='LearnWithPhotoHolder'
          sceneStyle={styles.view_style}
        />
        <Scene
          key='PurchaseHolder'
          lang={this.props.lang}
          component={PurchaseHolder}
          title='PurchaseHolder '
          hideNavBar
          sceneStyle={styles.view_style}
        />
        <Scene
          key='main'
          tabs
          tabBarStyle={styles.tabBarStyle}
          tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}
        >
          <Scene
            key='HomePageHolder'
            title={this.props.lang.title.home_tab}
            iconName='home'
            component={HomePageHolder}
            hideNavBar
            lang={this.props.lang}
            icon={singleTab}
            sceneStyle={styles.tabSceneStyle}
            renderBackButton={this.backRender('white')}
          />
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
        </Scene>
        <Scene
          key='ChooseWordsHolder'
          title={this.props.lang.title.chooseWords_pageTitle}
          component={ChooseWordsHolder}
          lang={this.props.lang}
          hideNavBar={false}
          navigationBarStyle={styles.navigationBarStyle}
          renderBackButton={this.backRender('white')}
        />
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
