// Packages
import { useEffect, useRef } from 'react';
import { Animated, useColorScheme, Text, View } from 'react-native';

// Style
import style from './style';

// Constants
import {
  darkendGreen,
  darkendYellow,
  darkGray,
  gray,
  green,
  yellow,
} from 'constants/colors';

// Types
import { Guess } from 'types';

interface Props {
  index: number;
  guessList: Guess[];
  word: string;
  wordLength: number;
  gameOver?: boolean; // TODO  -- this shouldn't be optional.
}

export default function Row({
  index,
  guessList,
  word,
  wordLength,
  gameOver = false,
}: Props) {
  const colorScheme = useColorScheme(),
    letterBorder = { borderColor: colorScheme === 'dark' ? darkGray : gray },
    matchBg = {
      backgroundColor: colorScheme === 'dark' ? darkendGreen : green,
      borderColor: colorScheme === 'dark' ? darkendGreen : green,
    },
    existBg = {
      backgroundColor: colorScheme === 'dark' ? darkendYellow : yellow,
      borderColor: colorScheme === 'dark' ? darkendYellow : yellow,
    },
    wrongBg = {
      backgroundColor: colorScheme === 'dark' ? darkGray : gray,
    };

  const getElement = (letterIndex: number) => {
    if (guessList[index]) {
      const { wordGuessed, matches } = guessList[index],
        matchElement = matches[letterIndex];

      return (
        <View
          style={[
            style.letter,
            letterBorder,
            matchElement.match
              ? matchBg
              : matchElement.exists
              ? existBg
              : wrongBg,
          ]}
          key={`row${index}letterIndex${letterIndex}`}>
          <Text style={style.text}>{wordGuessed[letterIndex]}</Text>
        </View>
      );
    } else if (index === guessList.length && word !== '') {
      return (
        <View
          style={[style.letter, letterBorder]}
          key={`row${index}letterIndex${letterIndex}`}>
          <Text style={style.text}>{word[letterIndex]}</Text>
        </View>
      );
    } else {
      return (
        <View
          style={[style.letter, letterBorder]}
          key={`row${index}letterIndex${letterIndex}`}>
          <Text style={style.text} />
        </View>
      );
    }
  };

  return (
    <View style={style.row}>
      {Array(wordLength)
        .fill(undefined)
        .map((_, index) => getElement(index))}
    </View>
  );
}
