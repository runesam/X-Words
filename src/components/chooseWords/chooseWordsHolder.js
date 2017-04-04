import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
Image,
  // Alert,
  ListView,
  Alert,
  // ScrollView,
  Dimensions,
  Animated,
  // LayoutAnimation
} from 'react-native';

import {
  // Header,
  Button,
  //  Spinner,
} from '../common/';
import generalUtils from '../../utils/generalUtils';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

// const xOffset = new Animated.Value(0);
// const onScroll = Animated.event([{ nativeEvent: { contentOffset: { x: xOffset } } }]);
const Item = class Item extends Component {
  state= {
clicked: false
  }
  iWant() {
    this.setState({ clicked: true });
    this.props.handler(this.props.wordId);
  }
  render() {
    return (
      <Button
        text={this.props.title}
        style={{
              borderRadius: 20,
              marginLeft: 50,
              marginRight: 50,
              backgroundColor: '#ffb434', }}
        textStyle={{
          alignSelf: 'center',
          color: 'white',
          fontSize: 16,
          fontWeight: '600',
          paddingTop: 10,
          paddingBottom: 10 }}
        onPressMe={this.iWant.bind(this)}
        disabled={this.state.clicked}
      />
    );
  }

};
class ChooseWordsHolder extends Component {

  state = {
    dataSource: ds.cloneWithRows([['English', 'turkish', 5]]),
    marga: new Animated.Value(0),
    rows: [0],
    temper: -1 * (Dimensions.get('window').width - 50),
    stepper: Dimensions.get('window').width - 40,
    currentX: null,
    level: 'orta',
    not: [],
    idsArray: [],
    choosed: 0,
    left: 10, // how many words
    memberId: 4,
    interestsNumber: 8,
    getLink: 'get_new_words',
    canGet: true,
    offset: 0,
    clicked: false,
    getWordsLinks: 'get_words_data'
  };
  componentWillMount() {
    const apiData = {};
    apiData.memberId = this.state.memberId;
    apiData.not = this.state.not;
    generalUtils.setDataFromApi(this.state.getLink, apiData)
    .then(data => {
      this.setState({
      dataSource: ds.cloneWithRows(data),
      rows: data
     });
      for (let i = 0; i < data.length; i++) {
        this.setState({
          not: this.state.not.concat([data[i].word_id]),
         });
      }
    })
    .catch(reason => console.log(reason));
  }
  onPressMe() {
    Animated.timing(
      this.state.marga,
      { toValue: this.state.temper }
    ).start();
    this.setState({
      temper: this.state.temper - this.state.stepper
    });
  }
  getMore() {
    console.log('hello');
    const apiData = {};
    apiData.memberId = this.state.memberId;
    apiData.not = this.state.not;
    generalUtils.setDataFromApi(this.state.getLink, apiData)
    .then(data => {
      if (data.none) {
        Alert.alert('end');
        this.setState({
          canGet: false,
        });
    } else {
      this.setState({
        rows: this.state.rows.concat(data)
      });
      this.setState({
        dataSource: ds.cloneWithRows(this.state.rows),
        canGet: true
      });
      for (let i = 0; i < data.length; i++) {
        this.setState({
          not: this.state.not.concat([data[i].word_id]),
        });
      }
    }
    })
    .catch(reason => console.log(reason));
  }
  handleScroll(event) {
    const width = this.state.not.length;
    this.setState({ offset: event.nativeEvent.contentOffset.x });
    const current = event.nativeEvent.contentOffset.x / Dimensions.get('window').width;
    const ah = width - current;
    if (ah === 3 && this.state.canGet) {
      this.setState({ canGet: false });
      this.getMore();
    }
  }
  ComponentDidMount() {

  }
  handler(wordId) {
    this.setState({
      choosed: this.state.choosed + 1,
      left: this.state.left - 1,
      idsArray: this.state.idsArray.concat([wordId])
    }, function () {
    if(this.state.left === 0){

      const apiData = {};
      apiData.memberId = this.state.memberId;
      apiData.ids = this.state.idsArray;
      generalUtils.setDataFromApi(this.state.getWordsLinks, apiData)
      .then(data => {
        console.log(data);

      /*  this.setState({
        dataSource: ds.cloneWithRows(data),
        rows: data
       });
        for (let i = 0; i < data.length; i++) {
          this.setState({
            not: this.state.not.concat([data[i].word_id]),
           });
        }*/

      })
      .catch(reason => console.log(reason));


    }
    });

    const width = this.state.not.length;
    const current = this.state.offset / Dimensions.get('window').width;
    const ah = width - current;
    if (ah > 1) {
      this.refs.wordsa.scrollTo({ x: this.state.offset + Dimensions.get('window').width, y: 0, animated: true });
    }

  }

  renderMyRow(rowData, sectionID, rowID) {
         return(
           <View style={styles.mainContainer}>
             <View style={styles.part1}>
               <Text style={styles.headLine}>{this.props.lang.text.choosed} {this.state.choosed} {this.props.lang.text.left} {this.state.left}</Text>
             </View>
             <View style={styles.part2}>
               <Text style={styles.wordEnglish}>{rowData.english}</Text>
               <Text style={styles.wordTurkish}>{rowData.turkish}</Text>
             </View>
             <View style={styles.part3}>
             {this.imageHolder(rowData.image)}
             </View>
             <View style={styles.part4}>
             <Item title={this.props.lang.title.iWantLearn} handler={this.handler.bind(this)} wordId={rowData.word_id}/>
             </View>
           </View>
         );
     }

  imageHolder(image) {
    if ( image !== '') {
    return (
      <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'stretch' }} >
        <View style={{ flex: 1 }} />
      <View style={styles.imageHold}>
        <Image source={{ uri: image }} style={styles.image} />
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.circle}>
          <Icon name='volume-2' size={28} color='#00cccc' />
        </View>
      </View>
    </View>
    );
    }
    return (<View />);
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.swipContainer}>
        <ListView
          horizontal
          ref="wordsa"
          pagingEnabled
          onScroll={this.handleScroll.bind(this)}
          showsHorizontalScrollIndicator={false}
          dataSource={this.state.dataSource}
          renderRow={this.renderMyRow.bind(this)}
        />
      </View>
        <View style={styles.downPart}>
          <View style={styles.downpart1}>
            <Text style={styles.text}>{this.props.lang.text.custom}{this.state.level}, {this.state.interestsNumber}{this.props.lang.text.topic}</Text>
          </View>
          <View style={styles.downpart2}>
            <View style={{ flex: 1 }}></View>
            <View style={styles.buttonHolder}>
              <Button
                text={this.props.lang.text.change}
                style={styles.SignUpButton}
                textStyle={styles.SignUpButtonText}
                onPressMe={this.onPressMe.bind(this)}
              />
            </View>
            <View style={{ flex: 1 }}></View>
          </View>
          <View style={styles.downpart3}></View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  text: {
    color: 'white'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#00cccc',
    paddingTop: 50
  },
  swipContainer: {
    flex: Dimensions.get('window').height - 100,
  },
  downPart: {
    height: 100,
    flexDirection: 'column',
    backgroundColor: '#00cccc'
  },
  downpart1: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  downpart2: {
    flex: 2,
    flexDirection: 'row'
  },
  downpart3: {
    flex: 0.5
  },
  SignUpButton: {
    borderRadius: 45,
  },
  SignUpButtonText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: '300',
    paddingTop: 12,
    paddingBottom: 12
  },
  buttonHolder: {
    flex: 1,
    justifyContent: 'center',
    borderColor: 'white',
    borderRadius: 40,
    borderWidth: 1,
    padding: 5
  },
  mainContainer: {
    width: Dimensions.get('window').width - 40,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    alignSelf: 'stretch',
    backgroundColor: 'white',
    borderRadius: 5,
    paddingTop: 30,
    flexDirection: 'column'
  },
  part1: {
    flex: 0.7,
    alignItems: 'center'
  },
  headLine: {
    fontWeight: '600'
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
  part2: {
    flex: 2,
    justifyContent: 'center',
  alignItems: 'center'
  },
  part3: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  part4: {
    flex: 2,
    justifyContent: 'center',
  },
  circle: {
    borderWidth: 2,
    width: (Dimensions.get('window').width - 120) / 4,
    height: (Dimensions.get('window').width - 120) / 4,
    borderRadius: (Dimensions.get('window').width - 110) / 8,
    borderColor: '#00cccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageHold: {
    flex: 2.3,
    alignSelf: 'stretch',
    flexDirection: 'row'
  },
  image: {
    resizeMode: 'contain',
    flex: 1
  }
});
module.exports = ChooseWordsHolder;
