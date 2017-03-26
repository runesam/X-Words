import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import Slider from './components/Slider';
import Interests from './components/Interests';
import FooterWithNumberHolder from './components/footerWithNumber/footerWithNumberHolder';
import LearnWithPhotoHolder from './components/learnWithPhoto/learnWithPhotoHolder';
import Levels from './components/Levels';
import testWithPhotos from './components/testWithPhotos/testWithPhotos';
import PurchaseHolder from './components/purchase/purchaseHolder';
import HomePageHolder from './components/homePage/homePageHolder';
import ChooseWordsHolder from './components/chooseWords/chooseWordsHolder';


class RouterComponent extends Component {
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
          sceneStyle={styles.view_style}
          titleStyle={styles.titleStyle}
        />
        <Scene
          key="LearnWithPhotoHolder"
          component={LearnWithPhotoHolder}
          hideNavBar
          title="LearnWithPhotoHolder "
          sceneStyle={styles.view_style}
        />
        <Scene
          key="PurchaseHolder"
          lang={this.props.lang}
          component={PurchaseHolder}
          hideNavBar
          title="PurchaseHolder "
          sceneStyle={styles.view_style}
        />
        <Scene
          key="HomePageHolder"
          lang={this.props.lang}
          component={HomePageHolder}
          hideNavBar
          title="HomePageHolder "
          sceneStyle={styles.view_style}
        />
        <Scene
          key="FooterWithNumberHolder"
          component={FooterWithNumberHolder}
          hideNavBar
          title="FooterWithNumberHolder "
          sceneStyle={styles.view_style}
        />
        <Scene
          key="ChooseWordsHolder"
          component={ChooseWordsHolder}
          title="ChooseWordsHolder "
          initial
          lang={this.props.lang}
          hideNavBar
          sceneStyle={styles.view_style}
        />
      </Router>
    );
  }
}

module.exports = RouterComponent;

const styles = StyleSheet.create({
  view_style: {
    // paddingTop: 60
  },
  view_text: {
    color: 'black'
  },
  error_text: {

  },
  titleStyle: {
    color: 'black'
  },
  navigationBarStyle: {
    backgroundColor: 'white'
  }
});
