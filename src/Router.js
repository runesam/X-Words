import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';
import Slider from './components/Slider';

class RouterComponent extends Component {
  render() {
    return (
      <Router>
        <Scene key="slider" component={Slider} title="Please Login" hideNavBar initial />
        <Scene
          key="login"
          component={LoginForm}
          title="Please Login"
          hideNavBar={false}
          sceneStyle={styles.view_style}
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
    paddingTop: 60
  },
  view_text: {

  },
  error_text: {

  }
});
