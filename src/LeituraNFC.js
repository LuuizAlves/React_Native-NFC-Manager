import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import NfcManager, { NfcEvents } from 'react-native-nfc-manager';

import NFC from './images/ic_nfc.png';

const LeituraNFC = ({restartWrite}) => {
    const [ value, SetValue ] = useState('');
    const [ sucessfully, setSucessufully ] = useState('');
    const [ restart, setRestart ] = useState(false);

    useEffect(() => {
        NfcManager.start();
        NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {

            const x = Object.values(tag);

            var message = '';
            var message = x[0][0]['payload'];

            convert(message);
        });

        _test();        

        // return () => {
        //     // NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
        //     NfcManager.unregisterTagEvent().catch(() => 0);
        // }
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

    return (
        <View style={styles.container}>
            <Text style={styles.textTitle}>Leitura do Cartão NFC</Text>

            <Image
                style={styles.imageLogo}
                source={NFC}
            />

            <View style={styles.containerMessageWrite}>
                {sucessfully == '' ? (
                    <Text style={styles.textWrite}>Aproxime o Cartão</Text>
                ):(
                    <>
                        <Text style={styles.textWrite}>Leitura com sucesso: </Text>
                        <Text style={styles.textWrite}>{sucessfully}</Text>
                    </>
                )}  
            </View>            
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center'
    },
    containerMessageWrite:{
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
        fontSize: 14,
        color: 'gray'
    }
})

export default LeituraNFC;
