import React from 'react';
import { Text, View } from 'react-native';

const Header = (props) => {
  const { textStyle, viewStyle } = styles;
  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{props.headerText}</Text>
    </View>
  );
};

const styles = {
  viewStyle: {
    backgroundColor: '#00cccc',
    alignItems: 'center',
    height: 70,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    paddingTop: 20
  },
  textStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  }
};

export default Header;
