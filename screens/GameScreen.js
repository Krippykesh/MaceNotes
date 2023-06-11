import { View, Text, StyleSheet, SafeAreaView, Alert, FlatList,useWindowDimensions } from "react-native";
import { useEffect, useState } from "react";
import {Ionicons} from '@expo/vector-icons'
import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/card";
import Colors from "../constants/colors";
import GuessLogItem from "../components/game/GuessLogItem";


function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ userNumber, onGameOver }) {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setcureentGuess] = useState(initialGuess);
  const [guessRounds,setGuessRounds]=useState([initialGuess]);

  const {width,height}=useWindowDimensions();

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRounds.length);
    }
  }, [currentGuess, userNumber, onGameOver]);

  useEffect(()=>{
    minBoundary=1;
    maxBoundary=100;
  },[]);

  function nextGuessHandler(direction) {
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "greater" && currentGuess > userNumber)
    ) {
      Alert.alert("Nashathilekkan Ninte Pokk", "Sathyameva Jayadhe", [
        { text: "Sorry", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRndNummber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setcureentGuess(newRndNummber);
    setGuessRounds(prevGuessRounds =>[newRndNummber,...prevGuessRounds]);
  }

  const guessRoundListLength=guessRounds.length;

  let content =(
    <>
     <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
      <Text style={styles.instructionText}>Higher or Lower</Text>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
          <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
            <Ionicons name="md-remove" size={24} color='white' />
          </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
          <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
          <Ionicons name="md-add" size={24} color='white' />
          </PrimaryButton>
          </View>
        </View>
      </Card>
      </>
  );
   if(width>500){
    content=(
      <>
         <View style={styles.buttonContainerwide}>
         <View style={styles.buttonContainer}>
          <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
            <Ionicons name="md-remove" size={24} color='white' />
          </PrimaryButton>
          </View>
          <NumberContainer>{currentGuess}</NumberContainer>
          <View style={styles.buttonContainer}>
          <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
          <Ionicons name="md-add" size={24} color='white' />
          </PrimaryButton>
          </View>
         </View>
      </>
    )
   }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      {content}
      <View style={styles.listContainer}>
        <FlatList data={guessRounds} renderItem={(itemData)=><GuessLogItem roundNumber={guessRoundListLength- itemData.index} guess={itemData.item}/>}
        keyExtractor={(item)=>item}/>
      </View>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 35,
    alignItems:'center',
  },
    instructionText: {
      color: Colors.accent500,
      fontSize: 24,
      marginBottom:12,
      fontFamily:'open-sans',
    },
    buttonsContainer: {
      flexDirection: "row",
    },
    buttonContainer: {
      flex: 1,
    },
    listContainer:{
      flex:1,
      padding:10 ,
    },
    buttonContainerwide:{
      flexDirection:'row',
      alignItems:'center',
    }
    
});
