import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class iconTabBar extends Component {
  componentWillMount() {
    this.tabIcons = [];
  }
  componentDidMount() {

  }
  renderSingleTabs() {
    return this.props.tabs.map((tab, i) =>
      <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={styles.tab}>
        <Icon
          name={tab}
          size={30}
          color={this.props.activeTab === i ? 'white' : 'rgba(0,0,0,0.6)'}
          ref={(icon) => { this.tabIcons[i] = icon; }}
        />
      </TouchableOpacity>
    );
  }
  render() {
    return (
      <View style={[styles.tabs, this.props.style]}>
        {this.renderSingleTabs()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    paddingTop: 30
  },
  tabs: {
    backgroundColor: '#ff0050',
    height: 60,
    flexDirection: 'row',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
});

export default iconTabBar;
