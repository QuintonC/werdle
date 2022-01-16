// Packages
import { useEffect, useState } from 'react';
import { useColorScheme, StatusBar, Text, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

// Components
import { Keyboard, Row } from 'components';

// Style
import style from './style';

// Constants
import { GAME_ROWS, WORD_LENGTH } from 'constants/';

// Types
import { Guess, Match } from 'types';

const Game = () => {
  const [todaysWord, setTodaysWord] = useState('QUERY'),
    [guessList, setGuessList] = useState<Guess[]>([]),
    [word, setWord] = useState(''),
    colorScheme = useColorScheme();

  useEffect(() => {
    StatusBar.setBarStyle(
      colorScheme === 'dark' ? 'light-content' : 'dark-content',
    );
  }, [colorScheme]);

  // useEffect(() => {
  //   // This is where you can fetch your word of the day from amplify
  //   // :^)
  // }, []);

  const handleSubmit = () => {
    const newGuesses = guessList,
      todaysWordArray = todaysWord.split(''),
      guessArray = word.split(''),
      duplicatesInTodaysWord = todaysWordArray.filter(
        (letter, index) => todaysWordArray.indexOf(letter) !== index,
      );

    const matches: Match[] = guessArray.map((letter, index) => {
      const exists = todaysWord.indexOf(letter),
        match =
          exists > -1 &&
          todaysWordArray[index].toLowerCase() ===
            guessArray[index].toLowerCase(),
        duplicateGuessCheck = guessArray.filter(
          (duplicateLetter, index) =>
            guessArray.indexOf(duplicateLetter) !== index &&
            duplicateLetter === letter,
        );

      return {
        key: letter,
        exists:
          duplicateGuessCheck.length > duplicatesInTodaysWord.length
            ? false
            : exists > -1,
        match,
      };
    });

    const newGuess: Guess = {
      wordGuessed: word,
      matches,
    };

    newGuesses.push(newGuess);
    setGuessList(newGuesses);
    setWord('');
  };

  return (
    <SafeAreaView
      style={[
        style.container,
        { backgroundColor: colorScheme === 'dark' ? '#121213' : '#ffffff' },
      ]}
      edges={['top', 'bottom']}>
      <Text
        style={[
          style.title,
          { color: colorScheme === 'dark' ? '#ffffff' : '#121213' },
        ]}>
        werdle
      </Text>
      <View style={style.row_container}>
        {Array.from(Array(GAME_ROWS), (_, i) => (
          <Row
            key={i}
            index={i}
            guessList={guessList}
            word={word}
            wordLength={WORD_LENGTH}
          />
        ))}
      </View>
      <Keyboard
        guessList={guessList}
        word={word}
        wordLength={WORD_LENGTH}
        setWord={setWord}
        handleSubmit={handleSubmit}
      />
    </SafeAreaView>
  );
};

export default Game;
