/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React from 'react';
import { RNCamera } from 'react-native-camera';

export default class Camara extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const onCapture = this.props.onCapture;
    return (
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permiso para usar la cámara',
          message: 'Necesitamos su permiso para usar su cámara',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancelar',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permiso para usar grabación de audio',
          message: 'Necesitamos su permiso para usar su audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancelar',
        }}
        onTextRecognized={textBlocks => {
          for (const item of textBlocks) {
            const valor = item.value;
            let RUN = '';
            let NombreCompleto = '';
            try {
              if (valor.length >= 90) {
                //OCR-B
                const lineas = valor.split('\n');
                if (lineas.length >= 3) {
                  const lineaRUN = lineas[0].split(' ').join('');
                  const codCarnet = lineaRUN.substring(0, 5).toUpperCase();
                  if (codCarnet === 'IDCHL' || codCarnet === 'INCHL') {
                    const linea2 = lineas[1]
                      .split(' ')
                      .join('')
                      .split('<');
                    // Carnet nuevo
                    if (linea2.length > 2) {
                      const largoRut = linea2[0].length;
                      RUN = linea2[0]
                        .substring(largoRut - 8, largoRut)
                        .concat(linea2[1]);
                    } else {
                      // carnet antiguo
                      RUN = lineaRUN.substring(5, 14);
                    }

                    const lineaNombre = lineas[2].split(' ').join('');
                    const fullName = lineaNombre.split('<');
                    NombreCompleto =
                      fullName[3] +
                      ' ' +
                      fullName[4] +
                      ' ' +
                      fullName[0] +
                      ' ' +
                      fullName[1];
                    onCapture(RUN, NombreCompleto);
                  }
                }
              }
            } catch (err) {
              console.log(err);
            }
          }
        }}
      />
    );
  }
}
