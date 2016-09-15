/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ScrollView,
  View,
  Image
} from 'react-native';

class ReactHelloWorld extends Component {
  componentDidMount() {
    _this = this;
    fetch('https://reverb.com/api/listings/grid', {
      method: 'GET',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Accept-Version': '3.0',
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState(responseJson);
    })
    .catch((error) => {
      console.log("BOOOO!!!")
      console.error(error);
    });
  }

  total() {
    if(this.state) {
      return this.state.total;
    } else {
      return "Loading";
    }
  }

  listings() {
    if(this.state) {
      return this.state.listings.map((listing, index) => {
        console.log(listing);
        return(<View key={listing.id} style={styles.card}>
          <Image
            source={{uri: listing.photos[0]._links.mobile_small.href}}
            style={{width: 400, height: 400}}
          />
          <Text>
            {listing.title}
          </Text>
        </View>)
      });
    }
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.welcome}>
          {this.total()}
        </Text>
        {this.listings()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    height: 10000,
    paddingVertical: 0,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  card: {
    marginTop: 50,
  },
});

AppRegistry.registerComponent('ReactHelloWorld', () => ReactHelloWorld);
