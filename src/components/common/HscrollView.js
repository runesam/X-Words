import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Text,
  TouchableHighlight
} from 'react-native';

class HscrollView extends Component {
  state = {

  }
  interestsHandler(data) {
    this.props.onChangeText(this.props.name, data);
  }
  WholeOptions() {
    if (this.props.data) {
      // return this.props.data.map((data, i) =>
      //   (
      //     <TouchableHighlight
      //       key={i}
      //       style={styles.touchStyle}
      //       onPress={this.interestsHandler.bind(this, data.id)}
      //       underlayColor='rgba(0,0,0,0.3)'
      //     >
      //       <View style={styles.view_style}>
      //         <Image
      //           source={{ uri: data.image }}
      //           style={[styles.imageStyle, data.active ? { opacity: 0.6 } : { opacity: 0.2 }]}
      //         />
      //         <Text
      //           style={[styles.textStyle, data.active ? { color: 'white' } : { color: '#c5c4d6' }]}
      //         >
      //           {data.text}
      //         </Text>
      //       </View>
      //     </TouchableHighlight>
      //   )
      // );
    }
    return <Text>{'love test'}</Text>;
  }
  render() {
    return (
      <View style={styles.ScrollViewContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.ScrollView}
          automaticallyAdjustContentInsets={false}
          onScroll={() => { console.log('onScroll!'); }}
        >
          {this.WholeOptions()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ScrollViewContainer: {
    height: 90,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 5,
    marginTop: 10,
  },
  ScrollView: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  view_style: {
    flex: 1,
    width: 80
  },
  touchStyle: {
    borderRadius: 5,
    paddingBottom: 10
  },
  textStyle: {
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white'
  },
  imageStyle: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'center'
  }
});

export { HscrollView };
