import { evaluate } from 'mathjs';

const MAX_EXPRESSION_LENGTH = 120;
const OPERATORS = ['+', '-', '*', '/'];

export const isOperator = (value: string) => OPERATORS.includes(value);

const currentNumber = (expression: string) => expression.split(/[+\-*/]/).pop() ?? '';

export const appendToken = (expression: string, token: string): string => {
  if (expression.length >= MAX_EXPRESSION_LENGTH) {
    return expression;
  }

  if (/^\d$/.test(token)) {
    return expression + token;
  }

  if (token === '.') {
    if (currentNumber(expression).includes('.')) {
      return expression;
    }

    const lastCharacter = expression[expression.length - 1];
    return expression + (!expression || isOperator(lastCharacter) ? '0.' : '.');
  }

  if (!isOperator(token)) {
    return expression;
  }

  const lastCharacter = expression[expression.length - 1];

  if (token === '-') {
    if (!expression || lastCharacter !== '-') {
      return expression + token;
    }

    return expression;
  }

  if (!expression || expression === '-') {
    return expression;
  }

  if (isOperator(lastCharacter)) {
    const previousCharacter = expression[expression.length - 2];

    if (lastCharacter === '-' && isOperator(previousCharacter)) {
      return expression.slice(0, -2) + token;
    }

    return expression.slice(0, -1) + token;
  }

  return expression + token;
};

export const calculateExpression = (expression: string): string => {
  if (!expression || expression === '-') {
    throw new Error('The expression is incomplete.');
  }

  const value = evaluate(expression);

  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new Error('The expression does not have a finite numeric result.');
  }

  if (Object.is(value, -0)) {
    return '0';
  }

  return Number.parseFloat(value.toPrecision(12)).toString();
};
