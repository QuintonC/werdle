import { useState } from "react";
import { StyleSheet, Text, SafeAreaView, View } from "react-native";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  LexendDeca_400Regular,
} from "@expo-google-fonts/lexend-deca";
import Row from "./components/Row";
import Keyboard from "./components/Keyboard";

export default function App() {
  const ROWS = 6;
  const WORD_LENGTH = 5;
  const [row, setRow] = useState(0);
  const [word, setWord] = useState("");
  let [fontsLoaded] = useFonts({
    LexendDeca_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>werdle</Text>
      {Array.from(Array(ROWS), (_, i) => (
        <Row key={i} index={i} row={row} word={word} wordLength={WORD_LENGTH} />
      ))}
      <View style={styles.keyboard}>
        <Keyboard word={word} setWord={setWord} wordLength={WORD_LENGTH} />
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
