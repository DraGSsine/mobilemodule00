import { useState } from 'react';
import { evaluate } from 'mathjs';
import { Button, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const BUTTON_ROWS = [
  ['7', '8', '9', '/'],
  ['4', '5', '6', '*'],
  ['1', '2', '3', '-'],
  ['0', '.', '=', '+'],
  ['AC', 'C'],
];

export default function App() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('0');

  const handlePress = (value: string) => {
    console.log(value);

    if (value === 'AC') {
      setExpression('');
      setResult('0');
    } else if (value === 'C') {
      setExpression(expression.slice(0, -1));
    } else if (value === '=') {
      try {
        const answer = evaluate(expression);

        if (typeof answer !== 'number' || !Number.isFinite(answer)) {
          throw new Error();
        }

        setResult(answer.toString());
      } catch {
        setResult('Error');
      }
    } else {
      setExpression(expression + value);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.appBar}>
          <Text style={styles.title}>Calculator</Text>
        </View>

        <View style={styles.results}>
          <Text style={styles.expression}>{expression || '0'}</Text>
          <Text style={styles.result}>{result}</Text>
        </View>

        <View style={styles.controls}>
          {BUTTON_ROWS.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((value) => (
                <View key={value} style={styles.button}>
                  <Button title={value} onPress={() => handlePress(value)} />
                </View>
              ))}
            </View>
          ))}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  appBar: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#3f51b5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  results: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    padding: 20,
  },
  expression: {
    fontSize: 24,
  },
  result: {
    fontSize: 36,
    fontWeight: '600',
  },
  controls: {
    padding: 10,
  },
  row: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    margin: 3,
  },
});
