import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';

class RouterComponent extends Component {
  render() {
    return (
      <Router sceneStyle={styles.view_style}>
        <Scene key="login" component={LoginForm} title="Please Login" initial />
        <Scene key="employeelist" component={EmployeeList} title="Employees" />
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
