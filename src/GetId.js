import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';

const GetId = () => {

    useEffect(() => {
        NfcManager.start();

        return () => {
            _cleanUp();
        }
    },[]);

    const _cleanUp = () => {
        NfcManager.cancelTechnologyRequest().catch(() => 0);
    }

    function byteToHex(b) {
        let hexChar = [];

        return hexChar[(b >> 4) & 0x0f] + hexChar[b & 0x0f];
    }
    
    const _test = async () => {
        try {
            let tech = Platform.OS === 'ios' ? NfcTech.MifareIOS : NfcTech.NfcA;

            let resp = await NfcManager.requestTechnology(tech, {
                alertMessage: 'Ready to do some custom Mifare cmd!'
            });

            // console.warn(resp);
        
            // the NFC uid can be found in tag.id
            let tag = await NfcManager.getTag();
            let x = tag.id;

            console.warn(x);

            
        
            if (Platform.OS === 'ios') {
                resp = await NfcManager.sendMifareCommandIOS([0x30, 0x00]);
            } else {
                resp = await NfcManager.transceive([0x30, 0x00]);
            }
            // console.warn(resp);
        
            this._cleanUp();
        } catch (ex) {
            // console.warn('ex', ex);
            _cleanUp();
        }
    }

    return (
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
                onPress={_cleanUp}
            >
                <Text>Cancel Test</Text>
            </TouchableOpacity>
        </View>
    )
}

export default GetId;