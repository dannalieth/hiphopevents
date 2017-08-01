import React from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import {Button, Card, Divider, Subheader} from 'react-native-material-design';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      events: undefined,
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
        {this.renderDays()}
      </View>
    );
  }

  renderDays() {
    return this.state.events.map(this.renderSingleDay);
  }

  renderSingleDay = (day) => {
    const renderedEvents = day.events.map(this.renderEvent);
    return (
      <View key={day.date}>
        <Subheader text={day.date} />
        {renderedEvents}
        <Divider />
      </View>
    );
  };

  renderEvent = (event) => {
    return (
      <Card key={event.ticketLink}>
        <Card.Media
          image={<Image source={{uri: event.image}}/>}
        />
        <Card.Body>
          <Text>{event.title}</Text>
          <Text>{event.startTime}</Text>
        </Card.Body>
      </Card>
    );
  };

  _scrapeEvents = () => {
    return fetch('http://10.201.217.202:8081/api/events')
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          isLoading: false,
          events: response,
        });
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
