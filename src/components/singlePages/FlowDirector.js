import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  ListView,
  //Image,
  // Alert,
  //ScrollView,
  // ScrollView,
  //Dimensions,
  //Animated,
  //TouchableOpacity
} from 'react-native';
//import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { Actions } from 'react-native-router-flux';
//import renderIf from 'render-if';

import {
  // Header,
  Button,
} from '../common/';
import generalUtils from '../../utils/generalUtils';



class FlowDirector extends Component {
  state = {

  };
  componentWillMount() {
    generalUtils.storageGetItem('todayFlow').then((todayFlow) => {
      console.log(todayFlow);
      for(var i=0;i<todayFlow.length;i++){
        if(todayFlow[i][1] === 0 &&  this.faks > todayFlow[i][0] ){
          console.log(todayFlow[i][2]);
          if(todayFlow[i][2]===0){
            console.log('show');
          }else if(todayFlow[i][2]===1){
            console.log('quiz');
          }
        this.missed++;
        }
      }
      if(this.missed === 0){
        Action.HomePageHolder();
      }
    });
  }
  ComponentDidMount() {

  }
  emptyTogo() {

  }

render() {
  return (
    <View style={styles.container}>

    </View>
  );
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#00cccc',
    paddingTop: 70
  },
});
export { FlowDirector };
