import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import NfcManager, { NfcEvents } from 'react-native-nfc-manager';

import NFC from './images/ic_nfc.png';

const LeituraNFC = ({restartWrite}) => {
    const [ id, setID ] = useState('');
    const [ sucessfully, setSucessufully ] = useState('');

    useEffect(() => {
        NfcManager.start();
        _test();   
        
        NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {

            const x = Object.values(tag);

            var message = '';
            var message = x[0][0]['payload'];
            var id = tag.id;

            console.log(tag);

            convertMessage(message, id);
        });

             

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
            console.warn('ex', ex);
            NfcManager.unregisterTagEvent().catch(() => 0);
        }
    };

    function convertMessage(x, id){
        let result = "";

        console.log(x);
        if(x != undefined){
            if( x != ''){
                for (var i = 0; i < x.length; i++) {
                    if(x[i] != 0) result = result + String.fromCharCode(x[i]);            
                }
            }
            converteId(id);
            setSucessufully(result);
            return result;
        }else{
            Alert.alert("","Tipo de cartão não suportado!");
        }
    }

    function converteId(id) {
        // List<String> values = new List<String>();

        var values = [];

        var msg = "";
        var cont = 0;

        for (var i = 0; i < id.length; i++) {
          cont++;
          msg += id[i];

          if (cont == 2) {
            values.push(msg);
            msg = "";
            cont = 0;
          }
        }
        var idInvertido = "";

        values = values.reverse();

        for (var i=0; i < values.length; i++) {
          idInvertido += values[i];
        }

        var resultado = parseInt(idInvertido, 16);
        setID(resultado);
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
                        <Text style={styles.textWrite}>ID Cartão: {id}</Text>
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
