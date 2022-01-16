import AppLoading from 'expo-app-loading';
import {
  useFonts,
  LexendDeca_400Regular,
} from '@expo-google-fonts/lexend-deca';
import registerRootComponent from 'expo/build/launch/registerRootComponent';

import Game from './src';

const App = () => {
  let [fontsLoaded] = useFonts({
    LexendDeca_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return <Game />;
  }
};

registerRootComponent(App);
