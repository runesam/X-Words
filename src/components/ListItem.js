import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  LayoutAnimation,
  // Alert
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import {
  // Header,
  // Button,
  // Spinner,
  CardSection
} from './common/';

class ListItem extends Component {
  state = {
    active: false
  }
  componentWillUpdate() {
    LayoutAnimation.spring();
    setTimeout(
      () => {
      if (this.props.expanded) {
        this.setState({ active: true });
        console.log(this.props.expanded);
      } else {
        this.setState({ active: false });
      }
    });
  }
  onPress() {
    this.props.selectLibrary(this.props.data.id);
  }
  renderDesc() {
    if (this.props.expanded) {
      return (
        <CardSection>
          <Text>{this.props.data.description}</Text>
        </CardSection>
      );
    }
  }
  render() {
    return (
      <TouchableWithoutFeedback onPress={this.onPress.bind(this)}>
        <View>
          <View>
          <CardSection>
            <Text style={this.state.active === true ? styles.view_style : null}>
              {this.props.data.title}
            </Text>
          </CardSection>
        </View>
          {this.renderDesc()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
const styles = StyleSheet.create({
  view_style: {
    backgroundColor: 'blue',
    color: 'white',
    fontSize: 18,
    paddingLeft: 15
  },
  view_text: {
    fontSize: 18,
    paddingLeft: 15,
  },
});
const mapStateToProps = (state, props) => {
  const data = {};
  data.expanded = state.selectedLibraryId === props.data.id;
  return data;
};
module.exports = connect(mapStateToProps, actions)(ListItem);
