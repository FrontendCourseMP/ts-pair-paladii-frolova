export interface CalculationResult {
    success: boolean;
    result?: number;
    error?: string;
}

export interface ValidationResult {
    isValid: boolean;
    message: string;
}

export function cleanExpression(expression: string): string {
    const allowedChars = new Set('0123456789.+* '.split(''));
    
    if (!expression) {
        return "";
    }

    const cleaned = expression
        .split('')
        .filter(char => allowedChars.has(char))
        .join('');
    
    return cleaned.replace(/\s+/g, '');
}

export function validateExpression(expression: string): ValidationResult {
    const allowedChars = new Set('0123456789.+* '.split(''));
    
    if (!expression) {
        return { isValid: false, message: "Выражение не может быть пустым" };
    }
    for (const char of expression) {
        if (!allowedChars.has(char)) {
            return { isValid: false, message: `Недопустимый символ: '${char}'` };
        }
    }
    if (expression.startsWith('+') || expression.startsWith('*') || 
        expression.endsWith('+') || expression.endsWith('*')) {
        return { isValid: false, message: "Выражение не может начинаться или заканчиваться оператором" };
    }

    if (/([\+\*]{2,})/.test(expression)) {
        return { isValid: false, message: "Не может быть двух операторов подряд" };
    }

    const numbers = expression.split(/[\+\*]/);
    for (const num of numbers) {
        if (!num) {
            return { isValid: false, message: "Обнаружено пустое число между операторами" };
        }
        if ((num.match(/\./g) || []).length > 1) {
            return { isValid: false, message: `Некорректное число: ${num} (слишком много точек)` };
        }
        const numberValue = parseFloat(num);
        if (isNaN(numberValue)) {
            return { isValid: false, message: `Некорректное число: ${num}` };
        }
    }

    return { isValid: true, message: "Выражение корректно" };
}
function parseExpression(expression: string): { numbers: number[], operators: string[] } {
    const numbers: number[] = [];
    const operators: string[] = [];
    
    let currentNumber = "";

    for (const char of expression) {
        if ('0123456789.'.includes(char)) {
            currentNumber += char;
        } else if ('+*'.includes(char)) {
            if (currentNumber) {
                numbers.push(parseFloat(currentNumber));
                currentNumber = "";
            }
            operators.push(char);
        }
    }
    if (currentNumber) {
        numbers.push(parseFloat(currentNumber));
    }

    return { numbers, operators };
}

export function calculateExpression(expression: string): number {
    const cleanedExpression = cleanExpression(expression);
    const validation = validateExpression(cleanedExpression);
    if (!validation.isValid) {
        throw new Error(validation.message);
    }
    const { numbers, operators } = parseExpression(cleanedExpression);
    
    if (numbers.length !== operators.length + 1) {
        throw new Error("Некорректное количество чисел и операторов");
    }
    const tempNumbers: number[] = [numbers[0]];
    
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === '*') {
            tempNumbers[tempNumbers.length - 1] = tempNumbers[tempNumbers.length - 1] * numbers[i + 1];
        } else { 
            tempNumbers.push(numbers[i + 1]);
        }
    }
    const result = tempNumbers.reduce((sum, num) => sum + num, 0);
    return result;
}

export function calculateExpressionSafe(expression: string): CalculationResult {
    try {
        const result = calculateExpression(expression);
        return { success: true, result };
    } catch (error) {
        return { 
            success: false, 
            error: error instanceof Error ? error.message : String(error) 
        };
    }
}