import { StyleSheet, Text, View } from "react-native";

interface Props {
  index: number;
  row: number;
  word: string;
  wordLength: number;
}

export default function Row({ index, row, word, wordLength }: Props) {
  return (
    <View style={styles.row}>
      {Array.from(Array(wordLength), (_, i) => (
        <View key={i} style={styles.letter}>
          <Text style={styles.text}>{row === index ? word[i] : ""}</Text>
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
