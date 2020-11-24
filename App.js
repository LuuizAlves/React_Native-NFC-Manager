import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

import EscritaNFC from './src/EscritaNFC';
import LeituraNFC from './src/LeituraNFC';
import GetId from './src/GetId';

const App = () => {
    const [ textInput, setTextInput] = useState('');
    const [ functionType, setFunctionType ] = useState('');
    const [ x, setX ] = useState(false);

    const buttons = [
        {id: 1, text: 'GRAVAR NO CARTÃO', onPress: () => {setFunctionType('Gravar'), setX(!x)}},
        {id: 2, text: 'LER CARTÃO', onPress: () => {setFunctionType('Ler'), setX(!x)}},
        {id: 3, text: 'ID CARTÃO', onPress: () => {setFunctionType('ID'), setX(!x)}},
        {id: 4, text: 'TESTE LEITURA/GRAVAÇÃO'},
    ];

    function type(){
        switch (functionType) {
            case 'Gravar':
                return(
                    <EscritaNFC text={textInput} restartWrite={x}/>
                );
            case 'Ler':
                return(
                    <LeituraNFC  restartWrite={x} />
                );
            case 'ID':
                return(
                    <GetId />
                )
            default:
                return(
                    <>
                        <Text>Default</Text>
                    </>
                );
        };
    }

    return (
        <View style={styles.container}>
            <Text style={styles.textTitle}>NFC - NDEF</Text>

            <View style={styles.containerButtonsAndList}>
                <View style={styles.containerInputTextAndButtons}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Mensagem Para Gravar no Cartão"
                        placeholderTextColor="#999"
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={textInput}
                        onChangeText={setTextInput}
                    />

                    {buttons.map(({text, onPress}, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.button}
                            onPress={onPress}
                        >
                            <Text style={styles.textButton}>{text}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.containerList}>
                    {
                        type()
                    }
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    button: {
        width: 400,
        height: 40,
        backgroundColor: '#00a6ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderRadius: 5
    },

    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    containerInputTextAndButtons: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerList: {
        width: '45%',
        paddingLeft: 20,
        alignItems: 'center'
    },
    containerButtonsAndList: {
        flexDirection: 'row'
    },

    inputText: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        width: 400,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#898c8a',
        marginBottom: 10,
    },

    textButton: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
    textList: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#898c8a',
        marginBottom: 20
    },
    textTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#4a524c',
        marginVertical: 20
    }
})

export default App;