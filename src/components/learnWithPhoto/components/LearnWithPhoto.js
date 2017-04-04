import React, { Component } from 'react';
import { Text, View, Image, Alert, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {
  Button,
  // CardSection,
  // ShapedTextInput,
  Spinner,
} from '../../common/';
import images from '../../../json/images.json';

const onButtonPress = () => {
  Alert.alert('Button has been pressed!');
};

class LearnWithPhoto extends Component {
  onPressMe() {

  }
  renderButton() {
    if (this.props.loading) {
      return <Spinner size='large' />;
    }
    return (
      <Button
        text={this.props.lang.title.submit}
        style={styles.submitButton}
        textStyle={styles.submitButtonText}
        onPressMe={this.onPressMe.bind(this)}
      />
    );
  }
  render() {
    return (
      <View style={styles.holder}>
        <ScrollView style={styles.ScrollView}>

          <View style={styles.translateHolder}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={onButtonPress} style={styles.translateHolderButton}>
                <View style={styles.translateHolderIcon}>
                  <Icon name='volume-2' size={35} color='white' />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.translateWorder}>
              <Text style={styles.wordEnglish}>{'Sample En'}</Text>
              <Text style={styles.wordTurkish}>{'Sample Tr'}</Text>
            </View>
            <View style={{ flex: 1 }}><Text>{''}</Text></View>
          </View>

          <View style={styles.imageWrapper}>
            <Image source={{ uri: images.sampleShoes.data }} style={styles.imageStyle} />
          </View>

          <View style={styles.sentenceHolder}>
            <TouchableOpacity onPress={onButtonPress}>
              <View style={styles.sentenceHolderIcon}>
                <Icon name='volume-2' size={20} color='white' />
              </View>
            </TouchableOpacity>
            <Text style={styles.sentence}>{'I bought New Shoes from the shoppi mall'}</Text>
          </View>

          <View style={styles.explainHolder}>
            <Text style={styles.explain}>{'it is just a placeholder this data should come from the local storage, but did u learn what to doI bought New Shoes from the shoppi mall and I like it but did u learn what to do'}</Text>
          </View>

          {this.renderButton()}

        </ScrollView>
      </View>
    );
  }
}

const styles = {
  holder: {
    flex: 9,
  },
  ScrollView: {
    backgroundColor: '#f2fcfd'
  },
  translateHolder: {
    flex: 1,
    flexDirection: 'row',
    padding: 15
  },
  translateHolderButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  translateHolderIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00cccc',
    width: (Dimensions.get('window').width - 100) / 4,
    height: (Dimensions.get('window').width - 100) / 4,
    borderRadius: (Dimensions.get('window').width - 100) / 8
  },
  translateWorder: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageWrapper: {
    flex: 1,
    paddingTop: 5,
    alignItems: 'center'
  },
  imageStyle: {
    flex: 1,
    width: (Dimensions.get('window').width - 50) / 2,
    height: (Dimensions.get('window').width - 50) / 2,
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: '#00cccc'
  },
  sentenceHolder: {
    flexDirection: 'row',
    margin: 15,
    padding: 15,
    borderWidth: 1,
    borderRadius: 2,
    backgroundColor: 'rgba(255,250,0,0.1)',
    borderColor: '#00cccc',
    alignItems: 'center'
  },
  sentenceHolderIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00cccc',
    width: (Dimensions.get('window').width - 100) / 8,
    height: (Dimensions.get('window').width - 100) / 8,
    borderRadius: (Dimensions.get('window').width - 100) / 16
  },
  sentence: {
    fontSize: 16,
    marginRight: 30,
    marginLeft: 10
  },
  explainHolder: {
    flex: 1,
    padding: 25,
    paddingTop: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#f2fcfd'
  },
  explain: {
    color: '#038b9b',
    fontSize: 16,
    textAlign: 'justify',
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#8CDD00',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Dimensions.get('window').width / 3,
    marginLeft: Dimensions.get('window').width / 3,
    borderRadius: 250
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '600',
    padding: 10
  },
  wordEnglish: {
    fontSize: 30,
    fontWeight: '600',
    color: '#000'
  },
  wordTurkish: {
    fontSize: 25,
    fontWeight: '400',
    color: '#666666'
  }
};

export default LearnWithPhoto;
