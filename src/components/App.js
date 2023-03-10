import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Home.js';
import SongList from './SongList.js';
const Stack = createNativeStackNavigator();
export const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="List" component={SongList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
