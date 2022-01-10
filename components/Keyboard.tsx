import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

interface Props {
  word: string;
  setWord: (key: string) => void;
  wordLength: number;
}

export default function Keyboard({ word, setWord, wordLength }: Props) {
  const topKeys = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const middleKeys = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const bottomKeys = ["Z", "X", "C", "V", "B", "N", "M"];

  const handlePress = (key: string) => {
    if (key === "enter") {
      if (word.length === wordLength) {
        setWord("");
      }
      return;
    }

    if (key === "backspace") {
      setWord(word.slice(0, -1));
      return;
    }

    if (word.length < wordLength) {
      setWord(word + key);
    }
  };

  return (
    <>
      <View style={styles.row}>
        {topKeys.map((key, i) => (
          <TouchableOpacity
            style={styles.key}
            key={i}
            onPress={() => handlePress(key)}
          >
            <Text style={styles.keyText}>{key}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.row}>
        {middleKeys.map((key, i) => (
          <TouchableOpacity
            onPress={() => handlePress(key)}
            style={styles.key}
            key={i}
          >
            <Text style={styles.keyText}>{key}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => handlePress("enter")}
          style={styles.specialKey}
        >
          <Text style={styles.keyText}>en</Text>
        </TouchableOpacity>
        {bottomKeys.map((key, i) => (
          <TouchableOpacity
            onPress={() => handlePress(key)}
            style={styles.key}
            key={i}
          >
            <Text style={styles.keyText}>{key}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          onPress={() => handlePress("backspace")}
          style={styles.specialKey}
        >
          <Text style={styles.keyText}>bs</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  key: {
    height: 45,
    width: 35,
    borderWidth: 1,
    borderColor: "black",
    justifyContent: "center",
    borderRadius: 6,
    margin: 2,
  },
  keyText: {
    fontSize: 20,
    textAlign: "center",
  },
  specialKey: {
    height: 45,
    width: 45,
    borderWidth: 1,
    borderColor: "black",
    justifyContent: "center",
    borderRadius: 6,
    margin: 2,
    backgroundColor: "lightgray",
  },
});
