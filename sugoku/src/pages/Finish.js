import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { setBoard, setSolve, setInput, setCheck } from '../store/action/action'
import { useSelector, useDispatch } from 'react-redux'

export default function Finish({ route, navigation }) {

    const { name } = route.params

    function regame() {
        navigation.navigate('Home')
    }

    console.log(name, 'ini name di finish')

    return (
        <>
            <Text style={styles.title}>KONGRATZ</Text>
            <Text style={styles.title}>WAW {name} </Text>
            <Text style={styles.title}> DONE </Text>
            <Text style={styles.title}> CONGRATS YOU FINISHED THE GAME </Text>
            <View style={styles.forbutton}>
            <Button title="Back to Home" color='blue' onPress={regame} />
            </View>

        </>
    );
}

const styles = StyleSheet.create({
    title: {
        // flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
        alignItems: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 36,
        margin: 30
    },
    forbutton:{
        margin: 30
    }
});