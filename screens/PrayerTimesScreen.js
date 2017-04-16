import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, Button, View } from 'react-native';
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
      text: '',
      progress: false
    });

    this.onClick = this.onClick.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData(text) {
    return fetch(`http://muslimsalat.com/${text}.json?key=${Keys.SALAT_API_KEY}`)
      .then((response) => response.json())
      .then((responseJson) => {
        return this.setState({
          dataPrayer: responseJson,
          progress: false
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  onClick() {
    const { text } = this.state;
    this.setState({
      progress: true
    })
    return this.fetchData(text)
  }

  componentWillMount() {
    return this.fetchData('jakarta')
  }

  render() {
    const { dataPrayer, text, progress } = this.state;
    const times = dataPrayer && dataPrayer.items[0]
    if (!dataPrayer) {
      return <Text>Loading...</Text>
    }
    if (progress) {
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
        <Button
          onPress={this.onClick}
          title="Search Prayer Times"
          accessibilityLabel="See an informative alert"
        />
        <Text>
          Waktu solat Dzuhur {dataPrayer.state} ({times.date_for}):
        </Text>
        <Text>
          Subuh {times.fajr}
        </Text>
        <Text>
          Dzuhur {times.dhuhr}
        </Text>
        <Text>
          Ashar {times.asr}
        </Text>
        <Text>
          Magrib {times.maghrib}
        </Text>
        <Text>
          Isya {times.isha}
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
