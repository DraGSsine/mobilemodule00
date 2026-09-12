import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [buttonPressed, setButtonPressed] = useState(false);

  const handlePress = () => {
    console.log('Button pressed');
    setButtonPressed((wasPressed) => !wasPressed);
  };

  return (
    <View style={styles.container}>
      <Text>{buttonPressed ? 'Hello World!' : 'A simple text'}</Text>
      <Button title="Press me" onPress={handlePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
