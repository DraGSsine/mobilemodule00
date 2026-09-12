import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { appendToken, calculateExpression, isOperator } from './calculator';

const BUTTON_ROWS = [
  ['7', '8', '9', '/'],
  ['4', '5', '6', '*'],
  ['1', '2', '3', '-'],
  ['0', '.', '=', '+'],
  ['AC', 'C'],
];

export default function App() {
  const [result, setResult] = useState<string>('0');
  const [expression, setExpression] = useState<string>('');
  const [hasEvaluated, setHasEvaluated] = useState(false);

  const renderButton = (value: string) => {
    const handlePress = () => {
      console.log(value);

      if (value === 'AC') {
        setResult('0');
        setExpression('');
        setHasEvaluated(false);
      } else if (value === 'C') {
        setExpression((currentExpression) => currentExpression.slice(0, -1));
        setResult('0');
        setHasEvaluated(false);
      } else if (value === '=') {
        try {
          setResult(calculateExpression(expression));
          setHasEvaluated(true);
        } catch {
          setResult('Error');
          setHasEvaluated(true);
        }
      } else {
        if (hasEvaluated) {
          const nextExpression = isOperator(value) && result !== 'Error'
            ? appendToken(result, value)
            : appendToken('', value);

          setExpression(nextExpression);
          setResult('0');
          setHasEvaluated(false);
        } else {
          setExpression((currentExpression) => appendToken(currentExpression, value));
        }
      }
    };

    return (
      <View key={value} style={styles.button}>
        <Button
          title={value}
          onPress={handlePress}
        />
      </View>
    );
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar style="light" />

        <SafeAreaView style={styles.appBar} edges={['top', 'left', 'right']}>
          <Text style={styles.title}>Calculator</Text>
        </SafeAreaView>

        <View style={styles.results}>
          <Text
            style={styles.expression}
            numberOfLines={2}
            adjustsFontSizeToFit
            minimumFontScale={0.5}
          >
            {expression || '0'}
          </Text>
          <Text
            style={[styles.result, result === 'Error' && styles.error]}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.5}
          >
            {result}
          </Text>
        </View>

        <SafeAreaView style={styles.controls} edges={['bottom', 'left', 'right']}>
          {BUTTON_ROWS.map((row, rowIndex) => (
            <View key={`row-${rowIndex}`} style={styles.row}>
              {row.map(renderButton)}
            </View>
          ))}
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  appBar: {
    width: '100%',
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
    width: '100%',
    fontSize: 24,
    color: '#555555',
    textAlign: 'right',
  },

  result: {
    width: '100%',
    fontSize: 36,
    fontWeight: '600',
    textAlign: 'right',
  },

  error: {
    color: '#b00020',
  },

  controls: {
    width: '100%',
    padding: 10,
  },

  row: {
    flexDirection: 'row',
  },

  button: {
    flex: 1,
    margin: 3,
    minWidth: 0,
  },
});
