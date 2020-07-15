import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { setBoard, setSolve, setInput, setCheck } from '../store/action/action'
import { useSelector, useDispatch } from 'react-redux'
import { NavigationHelpersContext } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

export default function Play({ route, navigation }) {

  const dispatch = useDispatch()

  const { level, name } = route.params;

  const status = useSelector(state => state.sudReducer.status)
  const data = useSelector(state => state.sudReducer.board)

  const newData = JSON.parse(JSON.stringify(data))

  const [newName, setNewName] = useState({name})

  useEffect(() => {
    if (!level) {
      dispatch(setBoard("easy"))
    }
    else {
      dispatch(setBoard(level))
    }
  }, [dispatch])

  function onSolve(solve) {
    dispatch(setSolve(solve))
  }

  function input(value, col, row) {
    newData[col][row] = Number(value)
    dispatch(setInput(newData))
    console.log(newData, 'diganti')
  }

  function onCheck() {
    dispatch(setCheck(newData))
    if(status === 'unsolved'){
      setNewName('UNSOLVED')
    }
  }

  useEffect(() => {
    dispatch(setCheck(newData))
  }, [status])

  function toDone() {
    navigation.navigate("Finish", { name })
  }


  console.log(status, 'nihstatus')
  console.log(newName, 'niyang asli')
  console.log(newName.name, 'nih name')

  return (
    <>
    <ScrollView contentContainerStyle={{flexGrow: 1}}
  keyboardShouldPersistTaps='handled'
>
      <View style={styles.all}>
        <Text style={styles.title}>SUGOKU 数独</Text>
        {!level ?
          <Text style={styles.difficulty}> Difficulty: easy </Text>
          :
          <Text style={styles.difficulty}> Difficulty: {level} </Text>
        }
        {newName === 'UNSOLVED'? 
        <Text style={styles.playername}> -UNSOLVED- </Text>
        :
        <Text style={styles.playername}> Good Luck, {newName.name} </Text>
      }
        <View style={styles.container}>
          {newData.map((i, ii) => {
            return (
              <View key={ii} style={styles.row} >
                {i.map((j, jj) => {
                  return (
                    <View key={jj} style={styles.col}>
                      {j === 0
                        ? <TextInput style={{ width: 20 }} keyboardType={'numeric'} editable={true} maxLength={1}
                          onChangeText={value => input(value, ii, jj)} />
                        :
                        <Text>{j}</Text>
                      }

                    </View>
                  )
                })}
              </View>
            )
          })}
        </View>
        {status === 'unsolved' ?
          <View style={styles.button}>
            <Button title="Check" color="green" onPress={onCheck} />
            <Button title="Solve" color="red" onPress={() => onSolve(newData)} />
          </View>
          :
          <View style={styles.button}>
            <Button title="Done" color="blue" onPress={toDone} />
          </View>
        }

      </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  all: {
    backgroundColor: '#fff',
  },
  title: {
    // flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 36,
    marginTop: 20
  },
  playername: {
    backgroundColor: '#fff',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 24,
    marginTop: 10,
    marginBottom: 10,
    color: 'red'
  },
  unsolved: {
    backgroundColor: '#fff',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 12,
    // marginTop: 2,
    marginBottom: 2,
    color: 'red'
  },
  difficulty: {
    backgroundColor: '#fff',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 12,
    marginTop: 10,
    color: "green"
  },
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  col: {
    borderWidth: 3,
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 10
  }
});