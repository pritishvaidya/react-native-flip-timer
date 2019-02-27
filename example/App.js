/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 */
/* eslint-disable  no-unused-vars */
import React, { Component } from 'react';
import {
  StyleSheet, View, TouchableOpacity, Text,
} from 'react-native';
import { FormatNumbers, FlipNumber } from 'react-native-flip-timer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    marginTop: 100,
  },
  button: {
    height: 40,
    backgroundColor: '#333333',
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    shadowColor: '#1f1f1f',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 1,
    elevation: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#cccccc',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default class App extends Component {
  state = {
    play: true,
  }

  play = () => {
    this.setState(({ play }) => ({ play: !play }));
  }

  render() {
    const { play } = this.state;
    return (
      <View style={styles.container}>
        <FormatNumbers time={500} play={play} />
        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.button} onPress={this.play}>
            <Text style={styles.text}>{play ? 'Pause' : 'Play'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
