import React from 'react';
import { Text, View, Image, Button, Alert, TextInput, ScrollView} from 'react-native';
const onButtonPress = () => {
  Alert.alert('Button has been pressed!');
};
const LearnWithPhoto = (props) => {
  const onButtonPress = () => {
  Alert.alert('Button has been pressed!');
};


  return (
  <View style={styles.holder} >
    <ScrollView>
    <View style={styles.outerContainer}>
      <View style={styles.translateHolder}>
        <Image source={require('../img/sound.png')}  style={styles.soundImageStyle} />
        <View style={styles.translateWorder}>
        <Text style={styles.wordEnglish}>Shoes</Text>
        <Text style={styles.wordTurkish}>Ayakkabı</Text>
        </View>
      </View>
    </View>
  </ScrollView>
    </View>
        );
          };
          const styles = {
              holder: {
              flex: 9,
              flexDirection: 'column'
            },
              outerContainer: {
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'red',
              flex: 1
            },
              imageStyle: {
              width: 150,
              height: 150
            },
              translateHolder: {
                flex: 2,
                backgroundColor: 'red',
            paddingTop: 10,
            paddingBottom: 15,
            width: null,
            justifyContent: 'flex-start',
            flexDirection: 'row'
          },
          soundImageStyle: {
              width: 50,
              height: 50
            },
            translateWorder: {
              flexDirection: 'column',
              marginLeft: 15
            },
            wordEnglish: {
              fontSize: 20,
              fontWeight: 'bold',
              color: '#000'
            },
            wordTurkish: {
              fontSize: 18,
              fontWeight: 'bold',
              color: '#666666'
            },
              };
export default LearnWithPhoto;
