import moment from 'moment/src/moment';
import React from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, ScrollView, View, WebView, RefreshControl} from 'react-native';
import {Card, Divider, Subheader} from 'react-native-material-design';
import {StackNavigator} from "react-navigation";

export class MainScreen extends React.Component {
  static navigationOptions = {
    title: 'Events',
    headerTintColor: 'grey',
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      events: undefined,
    };
  }

  componentWillMount() {
    this._refresh();
  }

  render() {
    if (this.state.isLoading) {
      return (
          <View style={{flex: 1, paddingTop: 50}}>
            <ActivityIndicator color="mediumslateblue" size="large"/>
          </View>
        );
    }

    return (
      <View style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.isLoading}
              onRefresh={this._refresh}
            />
          }
        >
          {this.renderDays()}
        </ScrollView>
      </View>
    );
  }

  renderDays() {
    return this.state.events.map(this.renderSingleDay);
  }

  renderSingleDay = (day) => {
    const renderedEvents = day.events.map(this.renderEvent);
    const humanReadableDate = moment(day.date).calendar(null, {
      lastDay: '[Yesterday]',
      sameDay: '[Today]',
      nextDay: '[Tomorrow]',
      lastWeek: '[last] dddd',
      nextWeek: 'dddd',
      sameElse: 'dddd - LL'
    });

    return (
      <View key={day.date}>
        <Subheader text={humanReadableDate} />
        {renderedEvents}
        <Divider />
      </View>
    );
  };

  renderEvent = (event) => {
    const { navigate } = this.props.navigation;
    return (
      <Card
        key={event.ticketLink}
        onPress={() => navigate('Event', { event: event })}>
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

  _refresh = () => {
    this.setState({isLoading: true});
    this._scrapeEvents();
  };

  _scrapeEvents = () => {
    return fetch('http://165.227.75.208:9081/api/events')
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

class EventDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.event.title}`,
  });

  render() {
    const { event } = this.props.navigation.state.params;
    return (
      <WebView
        source={{uri: event.eventLink}}
      />
    );
  }
}

const MainScreenNavigator = StackNavigator({
  Main: { screen: MainScreen },
  Event: { screen: EventDetailScreen },
});

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MainScreenNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
