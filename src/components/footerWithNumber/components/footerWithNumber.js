import React, { Component } from 'react';
import { Text, View, Dimensions } from 'react-native';

class FooterWithNumber extends Component {
  state = {
    view2LayoutProps: Dimensions.get('window').height / 27

  }
  findDimesions(layout) {
    const { height } = layout;
     this.setState({ view2LayoutProps: height });
   }
    render() {
    const styles = {
     grayBarContainer: {
       flex: 3,
       flexDirection: 'row'
     },
     viewDownStyle: {
        backgroundColor: '#00cccc',
        flex: 7
        },
  circle: {
   flex: 1,
   position: 'relative',
   width: this.state.view2LayoutProps,
   justifyContent: 'center',
   alignItems: 'center',
   borderRadius: this.state.view2LayoutProps / 2,
   backgroundColor: '#4f4f4f'
     },
  circleRed: {
   flex: 1,
   position: 'relative',
   width: this.state.view2LayoutProps,
   justifyContent: 'center',
   alignItems: 'center',
   borderRadius: this.state.view2LayoutProps / 2,
   backgroundColor: '#e84040'
     },
     viewStyle: {
        flex: 1,
        flexDirection: 'column'
     },
     grayBar: {
       flex: 25,
       alignItems: 'center',
       flexDirection: 'column',
     },
     circleText: {
       color: 'white',
       fontWeight: '400'
     },
     downBar: {
       position: 'absolute',
       bottom: 0,
       left: 0,
       height: this.state.view2LayoutProps / 1.9,
       width: Dimensions.get('window').width / this.props.number,
       backgroundColor: '#4f4f4f'
     },
     downBarRed: {
       position: 'absolute',
       bottom: 0,
       left: 0,
       height: this.state.view2LayoutProps / 1.9,
       width: Dimensions.get('window').width / this.props.number,
       backgroundColor: '#e84040'
     }
   };

   const payments = [];
   for (let i = 1; i <= this.props.number; i++) {
if (i > this.props.current) {
     payments.push(
       <View style={styles.grayBar} key={i}>
         <View style={styles.downBar} />
         <View style={styles.circle}><Text style={styles.circleText}>{i}</Text></View>
         </View>
     );
   } else {
     payments.push(
       <View style={styles.grayBar} key={i}>
         <View style={styles.downBarRed} />
         <View style={styles.circleRed}><Text style={styles.circleText}>{i}</Text></View>
         </View>
     );
   }
 }

    return (
      <View style={styles.viewStyle}>
        <View style={styles.grayBarContainer} onLayout={(event) => { this.findDimesions(event.nativeEvent.layout); }}>
          {payments}
        </View>
        <View style={styles.viewDownStyle} />
      </View>
    );
  }

}
export default FooterWithNumber;
