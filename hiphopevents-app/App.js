import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Card } from 'react-native-material-design';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Card>
          <Card.Body>
            <Text>Wu Tang Clan ain't notin to fuck wit</Text>
          </Card.Body>
        </Card>
        <Button text="Click Me"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
