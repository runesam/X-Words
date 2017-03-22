import React from 'react';
import { Text, View,TouchableHighlight, Image, Alert } from 'react-native';
const onButtonPress = () => {
  Alert.alert('Button has been pressed!');
};
const Footer2 = (props) => {
  const { textStyle, viewStyle } = styles;
var data1=require('../../../img/icon10.png');
var data2=require('../../../img/icon20.png');
var data3=require('../../../img/icon30.png');
var data4=require('../../../img/icon40.png');
var xox=props.icon;
  if( xox == '1' ){
    data1= require('../../../img/icon11.png');
  }
  if( xox == '2'){
    data2 =require('../../../img/icon21.png');
  }
  if( xox == '3'){
    data3 =require('../../../img/icon31.png');
  }
  if( xox == '4'){
    data4 =require('../../../img/icon41.png');
  }
  return (
    <View style={viewStyle}>
      <TouchableHighlight style={styles.highLight} onPress={onButtonPress}>
      <Image
        style={styles.button}
        source={data1}
     />
    </TouchableHighlight>
    <TouchableHighlight style={styles.highLight} onPress={onButtonPress}>
    <Image
      style={styles.button}
      source={data2}
   />
  </TouchableHighlight>
  <TouchableHighlight style={styles.highLight} onPress={onButtonPress}>
  <Image
    style={styles.button}
    source={data3}
 />
</TouchableHighlight>
<TouchableHighlight style={styles.highLight} onPress={onButtonPress}>
<Image
  style={styles.button}
  source={data4}
/>
</TouchableHighlight>


    </View>
);
};

const styles = {
  highLight: {
    flex: 0.25,
    justifyContent: 'center',
      alignItems:'center'
  },
  button:{
    width:25,
    height:25
  },
  viewStyle: {
    backgroundColor: '#00cccc',
    alignItems: 'center',
    flex: 1.5,
    flexDirection: 'row',
  },
textStyle: {
fontSize: 20,
fontWeight: 'bold',
color: '#fff'
}

};
export default Footer2;
