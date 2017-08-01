import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Button, Card } from 'react-native-material-design';

export default class App extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this._scrapeEvents();
  }

  render() {
    if (this.state.isLoading) {
      return (
          <View style={{flex: 1, paddingTop: 20}}>
            <ActivityIndicator />
          </View>
        );
    }

    return (
      <View style={styles.container}>
        <Card>
          <Card.Body>
            <Text>Wu Tang Clan ain't notin to fuck wit. asdf</Text>
          </Card.Body>
          <Card.Actions>
            <Button text="Enter the Thirty-Six Chambers"/>
          </Card.Actions>
        </Card>
      </View>
    );
  }

  _scrapeEvents = () => {
    return fetch('http://www.nuyorican.org/calendar/')
      .then((response) => {
        console.log(response);
        this.setState({ isLoading: false });
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

const styles = StyleSheet.create({
  container: {
  },
});
