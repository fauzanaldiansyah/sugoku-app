import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Picker, Image, ScrollView, Keyboard } from 'react-native';
import { setBoard, setSolve, setInput, setCheck } from '../store/action/action'
import { useSelector, useDispatch } from 'react-redux'

export default function Home({ navigation: { navigate } }) {

    const [level, setLevel] = useState('')
    const [name, setName] = useState('')
    const [noname, setNoname] = useState('')

    function onPlay(level,name) {
        // console.log('onplay', level, name)
        if(!name){
            setNoname('Username Can Not Be Empty')
        }
        else{
            navigate("Game", { level , name} )
        }
    }

    function onLevel(event) {
        // console.log('masuk onlevel --> ', event)
        setLevel(event)
    }

    function onPlayer(event) {
        // console.log('masuk onplayername --> ', event.nativeEvent.text)
        setName(event.nativeEvent.text)
    }

    return (
        <>
           <ScrollView contentContainerStyle={{flexGrow: 1}}
  keyboardShouldPersistTaps='handled'
>
        <View style={styles.all}>
            <View style={styles.container}>
                <Text style={styles.title}>SUGOKU数独</Text>
                <Text style={styles.inputuname}>Input Username</Text>
                <TextInput style={styles.form} onChange={onPlayer} onSubmitEditing={Keyboard.dismiss}
                />   
                 {!noname?
                    <Text style={styles.noname}> </Text>
                    :
                    <Text style={styles.noname}>{noname}</Text>
                    }
                <Text style={styles.inputuname}>Pick Your Level</Text>
                <Picker
                    style={styles.picker}
                    onValueChange={onLevel}
                >
                    <Picker.Item label="Easy" value="easy" />
                    <Picker.Item label="Medium" value="medium" />
                    <Picker.Item label="Hard" value="hard" />
                    <Picker.Item label="Random" value="random" />
                </Picker>
                <View style={styles.forbutton}>
                    <Button title="Play" style={styles.button} color='green' onPress={() => onPlay(level,name)} />
                </View>
            </View>
            </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    all:{
        backgroundColor: '#fff',
    },
    title: {
        // flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
        alignItems: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 48,
        marginTop: 30
    },
    inputuname:{
        fontSize: 24,
        marginTop:50
    },
    noname:{
        fontSize: 12,
        color: 'red'
    },
    logo: {
        height: 50,
        margin: 30
      },
    container: {
        // flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    form: {
        // flex: 1,
        fontSize: 24,
        flexDirection: 'row',
        height: 50,
        width: 250,
        borderColor: 'gray',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        marginTop: 20
    },
    picker: {
        height: 50, 
        width: 250,
        marginTop: 20
    },
    forbutton:{
        marginTop: 40,
        backgroundColor:'#fff'
    }
});