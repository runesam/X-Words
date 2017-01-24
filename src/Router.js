import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import EmployeeList from './components/EmployeeList';
import Slider from './components/Slider';

class RouterComponent extends Component {
  render() {
    return (
      <Router>
        <Scene key="slider" component={Slider} hideNavBar initial />
        <Scene
          key="signup"
          backTitle="back"
          navigationBarStyle={styles.navigationBarStyle}
          component={SignUpForm}
          title="Sign Up"
          hideNavBar
          sceneStyle={styles.view_style}
          initial
        />
        <Scene
          key="login"
          component={LoginForm}
          title="Please Login"
          hideNavBar={false}
          sceneStyle={styles.view_style}
          titleStyle={styles.titleStyle}
        />
        <Scene
          key="employeelist"
          component={EmployeeList}
          hideNavBar={false}
          title="Employees"
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
