import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Share,
  Dimensions,
  TouchableOpacity
} from 'react-native';

class Social extends Component {
  state= {
    headerTitle: 'Share :)',
    headerText: 'Let Others Get To Know US',
    headerSubText: 'share your current status in 10 words with others',
  }
  componentWillMount() {
    this.shareContents = [
      {
        message: 'I wanna share 10 words',
        title: 'best English Training App Ever',
        url: 'http://10words.com'
      },
      {
        message: 'I wanna share 10 words',
        title: 'best English Training App Ever',
        url: 'http://10words.com'
      },
      {
        message: 'I wanna share 10 words',
        title: 'best English Training App Ever',
        url: 'http://10words.com'
      }
    ];
  }
  componentDidMount() {

  }
  ComponentDidUpdate() {

  }
  shareNow(type) {
    Share.share(this.shareContents[type], {
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
        <View style={styles.buttonsContainer}>
          <View style={{ height: 30 }} />
          <TouchableOpacity onPress={this.shareNow.bind(this, 0)} style={styles.share}>
            <Text style={styles.shareText}>
              {'share now'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.shareNow.bind(this, 1)} style={styles.share}>
            <Text style={styles.shareText}>
              {'share now'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.shareNow.bind(this, 2)} style={styles.share}>
            <Text style={styles.shareText}>
              {'share now'}
            </Text>
          </TouchableOpacity>
          <View style={{ height: 30 }} />
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
  buttonsContainer: {
    flex: 10,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  share: {
    padding: 5,
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
