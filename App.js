/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, Button } from 'react-native';
import Camara from './Camara';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      capture: false,
      run: '',
      nombre: '',
    };
    this.getValues = this.getValues.bind(this);
  }

  getValues(Run, Nombre) {
    this.setState({ capture: false, run: Run, nombre: Nombre });
  }

  render() {
    const { capture, run, nombre } = this.state;
    if (capture) {
      return <Camara onCapture={this.getValues} />;
    }
    return (
      <View>
        <Text
          style={{
            marginTop: 50,
            marginBottom: 20,
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          Prueba OCR React Native
        </Text>
        {run.length > 0 && (
          <Text
            style={{
              marginTop: 10,
              fontSize: 14,
              textAlign: 'center',
            }}>
            RUN: {run}
          </Text>
        )}
        {nombre.length > 0 && (
          <Text
            style={{
              marginTop: 10,
              fontSize: 14,
              textAlign: 'center',
            }}>
            Nombre: {nombre}
          </Text>
        )}
        <Button
          style={{ marginTop: 30 }}
          title="Capturar reverso de carnet"
          onPress={() => {
            this.setState({ capture: true });
          }}
        />
      </View>
    );
  }
}
