import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import NfcManager, { NfcEvents } from 'react-native-nfc-manager';

import NFC from './images/ic_nfc.png';

const LeituraNFC = () => {
    const [ value, SetValue ] = useState('');
    useEffect(() => {
        NfcManager.start();
        _test();
        NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
            bin2String(tag);
            
            // console.warn('tag', tag);
            // console.warn('value', );
            // SetValue(bin2String(tag));
            // NfcManager.setAlertMessageIOS('I got your tag!');
            //NfcManager.unregisterTagEvent().catch(() => 0);
        });

        return () => {
            NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
            NfcManager.unregisterTagEvent().catch(() => 0);
        }
    });

    const _cancel = () => {
        NfcManager.unregisterTagEvent().catch(() => 0);
    };
    
    const _test = async () => {
        try {
            await NfcManager.registerTagEvent();
        } catch (ex) {
            // console.warn('ex', ex);
            NfcManager.unregisterTagEvent().catch(() => 0);
        }
    };

    const bin2String = async (tag) => {
        const x = Object.values(tag);
        const message = x[0][0]['payload'];

        let result = "";

        for (var i = 0; i < message.length; i++) {
            result = result + String.fromCharCode(message[i]);            
        }

        SetValue(result);
        console.log('XXXXXXXXXXXX: ', value);
      }

    return (
        <View style={styles.container}>
            <Text style={styles.textTitle}>Leitura do Cartão NFC</Text>

            <Image
                style={styles.imageLogo}
                source={NFC}
            />

            <View style={styles.containerMessageWrite}>
                <Text style={styles.textWrite}>{value}</Text>
            </View>            
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center'
    },
    containerMessageWrite:{
        width: 130,
        alignItems: 'flex-start',
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
        fontSize: 18,
        color: 'gray'
    }
})

export default LeituraNFC;
