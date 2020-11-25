import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import NfcManager, { Ndef, NfcTech, NfcEvents } from 'react-native-nfc-manager';

import NFC from './images/ic_nfc.png';

const TesteLeituraEscrita = ({text, restartWrite, WriteDone}) => {
    const [ sucessfully, setSucessufully ] = useState('');

    useEffect(() => {
        let mounted = true;

        NfcManager.start();

        setSucessufully('');

        _testNdef();

        _test();    

        NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {

            const x = Object.values(tag);

            var message = '';
            var message = x[0][0]['payload'];
            console.log('FFFFFFFFFFFFFF');

            convert(message);
        });

        // return () => {
        //     _cleanUp();
        // };
        return () => mounted = false;
    },[restartWrite]);

    const _cleanUp = () => {
        NfcManager.cancelTechnologyRequest().catch(() => 0);
    }
    
    const _testNdef = async () => {
        console.log(text);
        console.log(restartWrite);
        try {
            let resp = await NfcManager.requestTechnology(NfcTech.Ndef, {
                alertMessage: 'Ready to write some NFC tags!'
            });

            // console.warn('resp: ', resp);

            let ndef = await NfcManager.getNdefMessage();
            // console.warn(ndef);

            let bytes = buildUrlPayload(text);

            await NfcManager.writeNdefMessage(bytes);

            // console.warn('successfully write ndef');
            setSucessufully('Sucesso ao gravar informação!');
            WriteDone(sucessfully);

            
        } catch (ex) {
        //   console.warn('ex', ex);
          _cleanUp();
        }
    };

    const _test = async () => {
        try {
            await NfcManager.registerTagEvent();

            _cleanUp();
        } catch (ex) {
            // console.warn('ex', ex);
            NfcManager.unregisterTagEvent().catch(() => 0);
        }
    };

    function WriteDone(result){
        return result;
    }

    function convert(x){
        console.log('X: ', x);

        let result = "";

        if( x != ''){
            for (var i = 0; i < x.length; i++) {
                if(x[i] != 0) result = result + String.fromCharCode(x[i]);            
            }
        }

        setSucessufully(result);
        return result;
    }

    function buildUrlPayload(valueToWrite) {
        return Ndef.encodeMessage([
            Ndef.uriRecord(valueToWrite),
        ]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.textTitle}>Gravar Cartão NFC</Text>

            <Image
                style={styles.imageLogo}
                source={NFC}
            />

            <View style={styles.containerMessageWrite}>
                {sucessfully == '' ? (
                    <Text style={styles.textWrite}>Aproxime o Cartão</Text>
                ):(
                    <Text style={styles.textWrite}>{sucessfully}</Text>
                )}                
            </View>            
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        alignItems: 'center'
    },
    containerMessageWrite:{
        alignItems: 'center',
    },

    imageLogo: {
        width: 170,
        height: 170,
        resizeMode: 'contain',
    },
    textTitle:{
        fontSize: 22,
    },
    textWrite:{
        fontSize: 14,
        color: 'gray'
    }
})

export default TesteLeituraEscrita;
