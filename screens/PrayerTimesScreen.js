import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default class PrayerTimesScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Links',
    },
  };

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>
        <Text>
          INI PRAYER TIMES COI
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
