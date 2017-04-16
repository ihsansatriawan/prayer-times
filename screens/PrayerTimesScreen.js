import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput } from 'react-native';
import Keys from '../constants/Keys';

export default class PrayerTimesScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Prayer Times',
    },
  };

  constructor(props) {
    super(props);
    
    this.state = ({
      dataPrayer: null,
      text: ''
    });
  }

  componentWillMount() {
    return fetch(`http://muslimsalat.com/jakarta.json?key=${Keys.SALAT_API_KEY}`)
      .then((response) => response.json())
      .then((responseJson) => {
        return this.setState({
          dataPrayer: responseJson
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { dataPrayer, text } = this.state;
    const times = dataPrayer && dataPrayer.items[0]
    if (!dataPrayer) {
      return <Text>Loading...</Text>
    }
    return dataPrayer && (
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>

        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({text})}
          value={text}
        />
        <Text>
          {text}
        </Text>
        <Text>
          Waktu solat Dzuhur ({times.date_for}):
        </Text>
        <Text>
          Subuh : {times.fajr}
        </Text>
        <Text>
          Dzuhur : {times.dhuhr}
        </Text>
        <Text>
          Ashar : {times.asr}
        </Text>
        <Text>
          Magrib : {times.maghrib}
        </Text>
        <Text>
          Isya : {times.isha}
        </Text>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
});
