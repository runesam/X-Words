import React from 'react';
import { Text, View, Image, Button, Alert, TextInput, ScrollView, TouchableHighlight} from 'react-native';
const onButtonPress = () => {
  Alert.alert('Button has been pressed!');
};
const LearnWithPhoto = (props) => {
const exampleText = 'I bought New Shoes from the shoppi mall and I like it but did u learn what to do';
const englishWord = 'extra ordinary';
const turkishWord = 'Ailde new da';
const grammerExplaination = ' but did u learn what to doI bought New Shoes from the shoppi mall and I like it but did u learn what to do';
  return (
  <View style={styles.holder} >
    <ScrollView style={{ backgroundColor: '#f2fcfd' }}>
    <View style={styles.outerContainer}>
      <View style={styles.translateHolder}>
        <View style={styles.translateWorder2}>
            <Image source={require('../../../img/show1.png')}  style={styles.imageStyle} />
        </View>

        <View style={styles.translateWorder}>
        <Text style={styles.wordEnglish}>{englishWord}</Text>
        <Text style={styles.wordTurkish}>{turkishWord}</Text>
        <View style={styles.soundHolder}>
          <TouchableHighlight onPress={onButtonPress}>
            <Image source={require('../../../img/sound.png')} style={styles.abImage} />
        </TouchableHighlight>

          </View>
      </View>
      </View>
      <View style={styles.exampleSentence}>
      <View style={styles.sentenceHolder}>
        <TouchableHighlight onPress={onButtonPress}>
          <Image source={require('../../../img/sound.png')} style={styles.exampleSoundImage} />
      </TouchableHighlight>
      <Text style={styles.sentence}>{exampleText}</Text>
      </View>
      </View>

      <View style={styles.explainHolder}>
<Text style={styles.explain}>{grammerExplaination}</Text>
<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
  <View style={styles.empty} />
  <TouchableHighlight style={styles.button} onPress={onButtonPress}>
    <Text style={styles.buttonText}>İleri</Text>
</TouchableHighlight>
        <View style={styles.empty} />
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
              flexDirection: 'column',
              backgroundColor: '#f2fcfd'
            },
              outerContainer: {
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#f0f0f0',
              flex: 1
            },
              imageStyle: {
              width: 140,
              height: 140
            },
            imageHolder: {
              flex: 4,
              position: 'relative',
              alignSelf: 'stretch',
              alignItems: 'center'
            },
            abImageHolder: {
              position: 'absolute',
              height: 70,
              width: 70,
              top: 50,
              right: 0,
            },
            abImage: {
              width: 50,
              height: 50
            },
            exampleSentence: {
              alignItems: 'center',
              justifyContent: 'flex-start',
              flexDirection: 'row',
            },
            explainHolder: {
              flex: 1,
              padding: 25,
              paddingTop: 10,
              flexDirection: 'column',
              justifyContent: 'center',
              backgroundColor: '#f2fcfd'
            },
              translateHolder: {
            flex: 2,
            width: null,
            justifyContent: 'center',
            flexDirection: 'row'
          },
          explain: {
            color: '#038b9b',
            fontSize: 16
          },
            exampleSoundImage: {
              width: 30,
              height: 30,
            },
          soundImageStyle: {
              width: 50,
              height: 50
            },
            translateWorder2: {
              flexDirection: 'column',
              flex: 2,
              paddingTop: 15,
              paddingLeft: 5,
            },
            translateWorder: {
              flexDirection: 'column',
              flex: 3,
              paddingTop: 15,
            },
            wordEnglish: {
              fontSize: 30,
              fontWeight: 'bold',
              color: '#000'
            },
            wordTurkish: {
              fontSize: 25,
              fontWeight: 'bold',
              color: '#666666'
            },
            sentenceHolder: {
              flexDirection: 'row',
              margin: 15,
              padding: 15,
              borderWidth: 1,
              borderRadius: 2,
              backgroundColor: 'white',
              borderColor: '#00cccc',
              alignItems: 'center'
            },
            exSound: {
              flex: 1,
              alignItems: 'center'
            },
            sentence: {
              fontSize: 16,
              marginRight: 30,
              marginLeft: 10
            },
            button: {
              flex: 2,
              paddingTop: 8,
              paddingBottom: 8,
              borderRadius: 15,
              backgroundColor: '#feab35',
              justifyContent: 'center',
              marginTop: 15
            },
            empty: {
              flex: 1.8,
            },
            buttonText: {
            fontSize: 18,
            fontWeight: '400',
            color: '#fff',
            textAlign: 'center'
          },
          soundHolder: {
          paddingRight: 10,
          alignItems: 'flex-end'
          },
              };
export default LearnWithPhoto;
