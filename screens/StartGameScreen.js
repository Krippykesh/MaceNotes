import { TextInput, Pressable, View, StyleSheet, Alert,Text,useWindowDimensions,KeyboardAvoidingView,ScrollView} from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import { useState } from "react";
import Colors from "../constants/colors";
import Title from "../components/ui/Title";
import Card from "../components/ui/card";
import instructionText from "../components/ui/instructionText";

function StartGameScreen({ onPickNumber }) {
  const [enteredNumber, setEnteredNumber] = useState("");

  const {width,height}=useWindowDimensions();

  function numberInputHandler(enteredText) {
    setEnteredNumber(enteredText);
  }

  function resetInputHandler() {
    setEnteredNumber("");
  }
  function confirmInputHandler() {
    const chosenNumber = parseInt(enteredNumber);

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert("Invalid Number!", "Pick a number 1-99", [
        { text: "okii", style: "destructive", onPress: resetInputHandler },
      ]);
      return;
    }

    onPickNumber(chosenNumber);
  }

  const marginTopDistance=height<380?30:100;

  return (
    <ScrollView style={styles.screen}>
    <KeyboardAvoidingView style={styles.screen} behavior="position">
    <View style={[styles.rootContainer,{marginTop:marginTopDistance}]}>
      <Title>Guess My Number</Title>
      <Card>
        <Text style={styles.instructionText}>Enter a Number</Text>
        <TextInput
          style={styles.numberInput}
          maxLength={2}
          keyboardType="number-pad"
          onChangeText={numberInputHandler}
          value={enteredNumber}
        />
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
          </View>
        </View>
      </Card>
    </View>
    </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default StartGameScreen;

//const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  screen:{
    flex:1,
  },
  rootContainer: {
    flex: 1,
    //marginTop: deviceWidth<400?30:100,
    alignItems: "center",
  },

  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
    instructionText: {
      color: Colors.accent500,
      fontSize: 24,
      fontFamily:'open-sans'
    },
});
