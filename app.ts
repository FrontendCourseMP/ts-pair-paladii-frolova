import { 
    CalculationResult, 
    ValidationResult, 
    cleanExpression, 
    validateExpression, 
    calculateExpressionSafe 
} from './mathCalculator';

function processNameForm(lastName: string, firstName: string, middleName: string = ''): string {
    if (!lastName.trim() || !firstName.trim()) {
        return 'Ошибка: Фамилия и имя обязательны для заполнения';
    }
    const parsedLastName = parseName(lastName);
    const parsedFirstName = parseName(firstName);
    const parsedMiddleName = middleName ? parseName(middleName) : '';
    const validationResult = validateNames(parsedLastName, parsedFirstName, parsedMiddleName);
    if (validationResult !== true) {
        return validationResult;
    }
    return formatInitials(parsedLastName, parsedFirstName, parsedMiddleName);
}

function parseName(name: string): string {
    return name
        .trim()
        .replace(/\s+/g, ' ')
        .split(' ')
        .map(word => {
            if (!word) return '';
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join(' ');
}

function validateNames(lastName: string, firstName: string, middleName: string): true | string {
    if (lastName.length < 2) {
        return 'Ошибка: Фамилия должна содержать минимум 2 символа';
    }
    
    if (firstName.length < 2) {
        return 'Ошибка: Имя должно содержать минимум 2 символа';
    }

    if (middleName && middleName.length < 2) {
        return 'Ошибка: Отчество должно содержать минимум 2 символа';
    }
    const nameRegex = /^[A-Za-zА-Яа-яЁё\s-]+$/;
    if (!nameRegex.test(lastName)) {
        return 'Ошибка: Фамилия содержит недопустимые символы';
    }
    if (!nameRegex.test(firstName)) {
        return 'Ошибка: Имя содержит недопустимые символы';
    }
    if (middleName && !nameRegex.test(middleName)) {
        return 'Ошибка: Отчество содержит недопустимые символы';
    }
    const lettersOnlyRegex = /^[A-Za-zА-Яа-яЁё]+$/;
    const lastNameLetters = lastName.replace(/[-\s]/g, '');
    if (!lettersOnlyRegex.test(lastNameLetters)) {
        return 'Ошибка: Фамилия должна содержать только буквы';
    }
    const firstNameLetters = firstName.replace(/[-\s]/g, '');
    if (!lettersOnlyRegex.test(firstNameLetters)) {
        return 'Ошибка: Имя должно содержать только буквы';
    }
    if (middleName) {
        const middleNameLetters = middleName.replace(/[-\s]/g, '');
        if (!lettersOnlyRegex.test(middleNameLetters)) {
            return 'Ошибка: Отчество должно содержать только буквы';
        }
    }
    return true;
}

function formatInitials(lastName: string, firstName: string, middleName: string): string {
    const firstInitial = firstName.charAt(0) + '.';
    const middleInitial = middleName ? middleName.charAt(0) + '.' : '';
    return `${lastName} ${firstInitial}${middleInitial}`.trim();
}

class CalculatorApp {
    private form: HTMLFormElement;
    private expressionInput: HTMLInputElement;
    private resultDiv: HTMLDivElement;
    private calculateBtn: HTMLButtonElement;

    constructor() {
        this.initializeElements();
        this.setupEventListeners();
        console.log("Калькулятор инициализирован!");
    }

    private initializeElements(): void {
        this.form = document.getElementById('calcForm') as HTMLFormElement;
        this.expressionInput = document.getElementById('expression') as HTMLInputElement;
        this.resultDiv = document.getElementById('result') as HTMLDivElement;
        this.calculateBtn = document.getElementById('calculateBtn') as HTMLButtonElement;
        
        console.log("Элементы найдены:", {
            form: !!this.form,
            input: !!this.expressionInput,
            result: !!this.resultDiv,
            button: !!this.calculateBtn
        });
    }

    private setupEventListeners(): void {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        this.expressionInput.addEventListener('focus', () => {
            this.cleanInput();
        });

        this.expressionInput.addEventListener('input', () => {
            this.validateInput();
        });
    }

    private cleanInput(): void {
        this.expressionInput.value = cleanExpression(this.expressionInput.value);
    }

    private validateInput(): void {
        const expression = this.expressionInput.value;
        const validation = validateExpression(expression);
        
        if (validation.isValid) {
            this.expressionInput.style.borderColor = '#4CAF50';
        } else {
            this.expressionInput.style.borderColor = '#ff4444';
        }
    }

    private handleSubmit(event: Event): void {
        event.preventDefault();
        
        const expression = this.expressionInput.value.trim();
        console.log("Вычисляем:", expression);
        
        if (!expression) {
            this.showError("Пожалуйста, введите выражение");
            return;
        }

        this.calculateBtn.disabled = true;
        this.calculateBtn.textContent = 'Вычисление...';

        setTimeout(() => {
            const result = calculateExpressionSafe(expression);
            console.log("Результат:", result);
            this.displayResult(result);
            this.calculateBtn.disabled = false;
            this.calculateBtn.textContent = 'Вычислить';
        }, 100);
    }

    private displayResult(result: CalculationResult): void {
        if (result.success && result.result !== undefined) {
            this.resultDiv.innerHTML = `<strong>Результат:</strong> ${result.result}`;
            this.resultDiv.className = 'result success';
        } else {
            this.resultDiv.innerHTML = `<strong>Ошибка:</strong> ${result.error}`;
            this.resultDiv.className = 'result error';
        }
        this.resultDiv.style.display = 'block';
        console.log("Результат отображен!");
    }

    private showError(message: string): void {
        this.resultDiv.innerHTML = `<strong>Ошибка:</strong> ${message}`;
        this.resultDiv.className = 'result error';
        this.resultDiv.style.display = 'block';
    }
}
(window as any).processNameForm = processNameForm;
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM загружен!");
    new CalculatorApp();
});