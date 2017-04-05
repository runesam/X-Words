import React, { Component } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View, Text } from 'react-native';
import { Scene, Router, Actions, Modal } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconBack from 'react-native-vector-icons/MaterialCommunityIcons';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/singlePages/SignUp';
import Slider from './components/singlePages/Slider';
import Interests from './components/singlePages/Interests';
import LearnWithPhotoHolder from './components/learnWithPhoto/learnWithPhotoHolder';
import Levels from './components/singlePages/Levels';
import testWithPhotos from './components/testWithPhotos/testWithPhotos';
import LearnWithoutHolder from './components/learnWithout/learnWithoutHolder';
import PurchaseHolder from './components/purchase/purchaseHolder';
import HomePageHolder from './components/singlePages/home';
import ChooseWordsHolder from './components/singlePages/chooseWords';

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
      <Router duration={0} >
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
            <Scene
              key='main'
              tabs
              initial
              tabBarStyle={styles.tabBarStyle}
              tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}
              initial
            >
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
                  renderBackButton={this.backRender('white')}
                  replaceColor={this.replaceColor.bind(this)}
                />
                <Scene
                  key='ChooseWordsHolder'
                  title={this.props.lang.title.chooseWords_pageTitle}
                  component={ChooseWordsHolder}
                  lang={this.props.lang}
                  hideNavBar={false}
                  hideTabBar
                  navigationBarStyle={styles.navigationBarStyle}
                  renderBackButton={this.backRender('white')}
                  initial
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
            </Scene>
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
