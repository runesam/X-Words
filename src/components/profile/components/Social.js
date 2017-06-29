import React, { Component } from 'react';
// import firebase from 'firebase';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Share,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from 'react-native';
// import renderIf from 'render-if';
// import Icon from 'react-native-vector-icons/SimpleLineIcons';
// import Tts from 'react-native-tts';
import {
  // Button,
  // CardSection,
  // ShapedTextInput,
  // PickerView,
  // PickerButton,
  // HscrollView
} from './../../common/';
import generalUtils from '../../../utils/generalUtils';
import user from '../../../utils/user';
// const _ = require('lodash');

class Social extends Component {
  state= {
    headerTitle: 'Share :)',
    headerText: 'Let Others Get To Know US',
    headerSubText: 'share your current status in 10 words with others',
  }
  componentWillMount() {
    this.apiData = user.getUserData();
    this.apiData.pageNumber = 1;
    generalUtils.setDataFromApi('learned_words_list', this.apiData).then(res => {
      this.setState({ data: res.data });
      console.log(res);
    });
    generalUtils.storageGetAllItems();
  }
  componentDidMount() {

  }
  ComponentDidUpdate() {

  }
  shareNow() {
    Share.share({
      message: 'I wanna share 10 words',
      title: 'best English Training App Ever',
      url: 'http://10words.com'
    }, {
      dialogTitle: '10 words sharing system Title',
      excludedActivityTypes: [
        // we include the apps we don t wanna show here
      ],
      tintColor: 'green'
    })
    .then(data => {
      console.log(data);
    }).catch(err => console.log(err));
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>
              {this.state.headerTitle}
            </Text>
          </View>
          <View style={styles.headerImageTextContainer}>
            <Image style={styles.logo} source={{ uri: 'logo_white' }} />
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerText}>
                {this.state.headerText}
              </Text>
              <Text style={styles.headerSubText}>
                {this.state.headerSubText}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 10 }}>
          <View style={styles.aboutContainer}>
            <ScrollView>
              <Text style={styles.about}>
                {'dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak karıştırdığı 1500\'lerden beri endüstri standardı sahte metinler olarak kullanılmıştır. Beşyüz yıl boyunca varlığını sürdürmekle kalmamış, aynı zamanda pek değişmeden elektronik dizgiye de sıçramıştır. 1960\'larda Lorem Ipsum pasajları da içeren Letraset yapraklarının yayınlanması ile ve yakın zamanda Aldus PageMaker gibi Lorem Ipsum sürümleri içeren masaüstü yayıncılık yazılımları ile popüler olmuştur.'}
              </Text>
            </ScrollView>
          </View>
          <View style={styles.shareContainer}>
            <TouchableOpacity onPress={this.shareNow.bind(this)} style={styles.share}>
              <Text style={styles.shareText}>
                {'share now'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  headerContainer: {
    flex: 3,
    backgroundColor: '#ff0050'
  },
  headerTitleContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600'
  },
  headerImageTextContainer: {
    flex: 4,
    flexDirection: 'row',
    paddingBottom: 10
  },
  logo: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
  },
  headerTextContainer: {
    flex: 3,
    paddingRight: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    color: 'white',
    fontSize: 17
  },
  headerSubText: {
    color: 'white',
    fontStyle: 'italic',
    fontSize: Dimensions.get('window').width < 375 ? 12 : 14
  },
  aboutContainer: {
    flex: 8,
    padding: 10
  },
  about: {
    fontSize: 17,
    lineHeight: 30,
    textAlign: 'center',
    color: '#ff0050',
    textShadowColor: 'black',
    textShadowOffset: {
      width: 1,
      height: 2
    },
    textShadowRadius: 2
  },
  shareContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  share: {
    padding: 5,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#ff0050',
    borderRadius: 50,
    width: 150,
    height: 40,
  },
  shareText: {
    fontSize: 17,
    color: 'white',
    fontWeight: '800',
    textAlign: 'center'
  }
});

export { Social };
