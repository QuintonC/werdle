import { StyleSheet, Text, View } from "react-native";
import { GuessList, Matches } from "../types";

interface Props {
  index: number;
  guessList: GuessList;
  word: string;
  wordLength: number;
  matches: Matches;
}

export default function Row({
  index,
  guessList,
  word,
  wordLength,
  matches,
}: Props) {
  const getText = (i: number) => {
    if (guessList.length === index) {
      return word[i];
    } else {
      return guessList[index] ? guessList[index][i] : "";
    }
  };

  const getColor = (i: number) => {
    if (guessList[index]) {
      const key = guessList[index][i];
      const { match, index: matchIdx } = matches[key];
      if (match && matchIdx === i) return "green";
      if (match && matchIdx === null) return "yellow";
      return "darkgray";
    }
  };

  return (
    <View style={styles.row}>
      {Array.from(Array(wordLength), (_, i) => (
        <View
          key={i}
          style={{ ...styles.letter, backgroundColor: getColor(i) }}
        >
          <Text style={styles.text}>{getText(i)}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  letter: {
    height: 64,
    width: 64,
    borderColor: "black",
    borderWidth: 1,
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    textAlign: "center",
  },
});
