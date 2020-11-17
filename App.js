import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import NfcManager, {NfcEvents, Ndef, NfcTech} from 'react-native-nfc-manager';

const App = () => {
    const [ value, SetValue ] = useState('');
    const [ valueRecord, SetValueRecord ] = useState('SHOW!');

    const _cancel = () => {
        NfcManager.unregisterTagEvent().catch(() => 0);
    };
    
    const _test = async () => {
        try {
            await NfcManager.registerTagEvent();

            // NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
            //     NfcManager.unregisterTagEvent().catch(() => 0);
            //     _cleanUp();
            //     bin2String(tag);
            // }); 
        } catch (ex) {
            console.warn('ex', ex);
            NfcManager.unregisterTagEvent().catch(() => 0);
        }
    };

    const _cleanUp = () => {
        NfcManager.cancelTechnologyRequest().catch(() => 0);
    }
    
    const  _testNdef = async () => {
        try {
            let resp = await NfcManager.requestTechnology(NfcTech.Ndef, {
                alertMessage: 'Ready to write some NFC tags!'
            });

            console.warn('resp: ', resp);

            let ndef = await NfcManager.getNdefMessage();
            console.warn(ndef);

            let bytes = buildUrlPayload(valueRecord);

            await NfcManager.writeNdefMessage(bytes);

            console.warn('successfully write ndef');

            _cleanUp();
        } catch (ex) {
          console.warn('ex', ex);
          _cleanUp();
        }
    };

    function buildUrlPayload(valueToWrite) {
        return Ndef.encodeMessage([
            Ndef.uriRecord(valueToWrite),
        ]);
    };

    useEffect(() => {
        NfcManager.start();
        NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
            bin2String(tag);
            // console.warn('tag', tag);
            // NfcManager.setAlertMessageIOS('I got your tag!');
            NfcManager.unregisterTagEvent().catch(() => 0);
        });
        
        // return () => {
        //     NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
        //     NfcManager.unregisterTagEvent().catch(() => 0);
        //     _cleanUp();
        // }
    });

    function bin2String(tag) {
        const x = Object.values(tag);
        const message = x[0][0]['payload'];

        let result = "";

        for (var i = 0; i < message.length; i++) {
            result = result + String.fromCharCode(message[i]);
            console.warn('char', result);
            SetValue(result);
        }

        console.warn('tag', mes);
      }

    return(
        <View style={{padding: 20}}>
            <Text>NFC Demo</Text>
            <TouchableOpacity 
                style={{padding: 10, width: 200, margin: 20, borderWidth: 1, borderColor: 'black'}}
                onPress={_test}
            >
                <Text>Test</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={{padding: 10, width: 200, margin: 20, borderWidth: 1, borderColor: 'black'}}
                onPress={_cancel}
            >
                <Text>Cancel Test</Text>
            </TouchableOpacity>

            <Text>{value}</Text>

            <Text>NFC Demo</Text>
            <TextInput
                style={styles.inputText}
                placeholder="Mensagem para gravar no cartão"
                placeholderTextColor="#999"
                autoCapitalize="none"
                keyboardType='default'
                autoCorrect={false}
                value={valueRecord}
                onChangeText={SetValueRecord}
            />

            <TouchableOpacity 
                style={{padding: 10, width: 200, margin: 20, borderWidth: 1, borderColor: 'black'}}
                onPress={_testNdef}
            >
                <Text>Test Ndef</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={{padding: 10, width: 200, margin: 20, borderWidth: 1, borderColor: 'black'}}
                onPress={_cleanUp}
            >
                <Text>Cancel Test</Text>
            </TouchableOpacity>

            
        </View>
    )
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'green',
        width: '90%',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10
    },

    container: {
        alignItems: 'center'
    },

    inputText: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        fontSize: 18,
        color: 'black',
        marginVertical: 15,
        width: '90%'
    },
});


// class App extends React.Component {
//   componentDidMount() {
//     NfcManager.start();
//     NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
//       console.warn('tag', tag);
//       NfcManager.setAlertMessageIOS('I got your tag!');
//       NfcManager.unregisterTagEvent().catch(() => 0);
//     });
//   }

//   componentWillUnmount() {
//     NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
//     NfcManager.unregisterTagEvent().catch(() => 0);
//   }

//   render() {
//     return (
//       <View style={{padding: 20}}>
//         <Text>NFC Demo</Text>
//         <TouchableOpacity 
//           style={{padding: 10, width: 200, margin: 20, borderWidth: 1, borderColor: 'black'}}
//           onPress={this._test}
//         >
//           <Text>Test</Text>
//         </TouchableOpacity>

//         <TouchableOpacity 
//           style={{padding: 10, width: 200, margin: 20, borderWidth: 1, borderColor: 'black'}}
//           onPress={this._cancel}
//         >
//           <Text>Cancel Test</Text>
//         </TouchableOpacity>
//       </View>
//     )
//   }

//   _cancel = () => {
//     NfcManager.unregisterTagEvent().catch(() => 0);
//   }

//   _test = async () => {
//     try {
//       await NfcManager.registerTagEvent();
//     } catch (ex) {
//       console.warn('ex', ex);
//       NfcManager.unregisterTagEvent().catch(() => 0);
//     }
//   }
// }

export default App