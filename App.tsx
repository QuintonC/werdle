import { useState } from "react";
import { StyleSheet, Text, SafeAreaView, View } from "react-native";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  LexendDeca_400Regular,
} from "@expo-google-fonts/lexend-deca";
import Row from "./components/Row";
import Keyboard from "./components/Keyboard";
import { GuessList, Matches } from "./types";

// match: true, index: 0 --> green
// match: true, index: null --> yellow
// match: false, index: null --> dark gray

export default function App() {
  const ROWS = 6;
  const WORD_LENGTH = 5;
  const TODAYS_WORD = "QUERY";
  const [guessList, setGuessList] = useState<GuessList>([]);
  const [word, setWord] = useState("");
  const [matches, setMatches] = useState<Matches>({});
  let [fontsLoaded] = useFonts({
    LexendDeca_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const handleSubmit = () => {
    let newMatches: Matches = { ...matches };
    for (let i = 0; i < WORD_LENGTH; i++) {
      if (word[i] == TODAYS_WORD[i]) {
        newMatches[word[i]] = { match: true, index: i };
      } else if (TODAYS_WORD.includes(word[i])) {
        newMatches[word[i]] = {
          match: true,
          index: null,
        };
      } else {
        newMatches[word[i]] = { match: false, index: null };
      }
    }
    setMatches(newMatches);
    setGuessList([...guessList, word]);
    setWord("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>werdle</Text>
      {Array.from(Array(ROWS), (_, i) => (
        <Row
          key={i}
          index={i}
          guessList={guessList}
          word={word}
          wordLength={WORD_LENGTH}
          matches={matches}
        />
      ))}
      <View style={styles.keyboard}>
        <Keyboard
          word={word}
          setWord={setWord}
          wordLength={WORD_LENGTH}
          handleSubmit={handleSubmit}
          matches={matches}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontFamily: "LexendDeca_400Regular",
    marginBottom: 32,
  },
  keyboard: {
    flexGrow: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 48,
  },
});
