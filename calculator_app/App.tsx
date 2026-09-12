import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { evaluate } from 'mathjs';

export default function App() {
  const [result, setResult] = useState<string>('0');
  const [expression, setExpression] = useState<string>('');

  const renderBtn = (value: string) => {
    const handlePress = () => {
      if (value === 'AC') {
        setResult('0');
        setExpression('');
      } else if (value === 'C') {
        setExpression(expression.slice(0, -1));
      } else if (value === '=') {
        try {
          const evalResult = eval(expression);
          setResult(evalResult.toString());
          setExpression('');
        } catch (error) {
          setResult('Error');
          setExpression('');
        }
      } else {
        setExpression(expression + value);
      }
    };
    return (
      <View style={styles.button}>
        <Button
          title={value}
          onPress={handlePress}
        />
      </View>
    );
  };
  return (
    <View style={styles.container}>

      <View style={styles.appBar}>
        <Text style={styles.title}>Calculator</Text>
      </View>

      <View style={styles.results}>
        <Text>{result}</Text>
        <Text>{expression}</Text>
      </View>

      <View style={styles.controls}>

        <View style={styles.row}>
          {renderBtn('7')}
          {renderBtn('8')}
          {renderBtn('9')}
          {renderBtn('/')}
        </View>

        <View style={styles.row}>
          {renderBtn('4')}
          {renderBtn('5')}
          {renderBtn('6')}
          {renderBtn('*')}
        </View>

        <View style={styles.row}>
          {renderBtn('1')}
          {renderBtn('2')}
          {renderBtn('3')}
          {renderBtn('-')}
        </View>

        <View style={styles.row}>
          {renderBtn('0')}
          {renderBtn('.')}
          {renderBtn('=')}
          {renderBtn('+')}
        </View>

        <View style={styles.row}>
          {renderBtn('AC')}
          {renderBtn('C')}
        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  appBar: {
    padding: 20,
    alignItems: 'center',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  results: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    padding: 20,
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