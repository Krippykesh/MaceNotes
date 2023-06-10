import { useState,useEffect,View,Text } from 'react';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font'
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import Colors from './constants/colors';
import * as SplashScreen from 'expo-splash-screen';
import Entypo from '@expo/vector-icons/Entypo';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);

  const [fontsLoaded] =useFonts({
    'open-sans-bold':require('./assets/Fonts/OpenSans-Bold.ttf'),
    'open-sans':require('./assets/Fonts/OpenSans-Regular.ttf')
  })
  SplashScreen.preventAutoHideAsync();
  useEffect(() => {
    async function prepare() {
      try {

        await Font.loadAsync( {'open-sans-bold':require('./assets/Fonts/OpenSans-Bold.ttf'),
        'open-sans':require('./assets/Fonts/OpenSans-Regular.ttf')});
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>SplashScreen Demo! 👋</Text>
      <Entypo name="rocket" size={30} />
    </View>
  );


  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }

  function gameOverHandler() {
    setGameIsOver(true);
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

  if (userNumber) {
    screen = (
      <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
    );
  }

  if (gameIsOver && userNumber) {
    screen = <GameOverScreen />;
  }

  return (
    <LinearGradient
      colors={[Colors.primary700, Colors.accent500]}
      style={styles.rootScreen}
    >
      <ImageBackground
        source={require('./assets/images/ayo-ogunseinde-Erstoy-MuVA-unsplash.jpg')}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});