import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import Header from './component/Header';
import axios from 'axios';
import Player from './screens/player';
import FinalPlayer from './screens/FinalPlayer.js';

const Stack = createStackNavigator();

export default function App() {


  return (

    <>
      <Header />

      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} >
          <Stack.Screen name="Player" component={Player} />
          <Stack.Screen name="FinalPlayer" component={FinalPlayer} />
        </Stack.Navigator>
      </NavigationContainer>



    </>

  );
}
