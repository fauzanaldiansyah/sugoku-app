import React from 'react'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import store from './src/store'

import HomeScreen from './src/pages/Home'
import GameScreen from './src/pages/Play'
import FinishScreen from './src/pages/Finish'

const Stack = createStackNavigator()

export default function App() {

  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Game" component={GameScreen} /> 
          <Stack.Screen name="Finish" component={FinishScreen} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}
