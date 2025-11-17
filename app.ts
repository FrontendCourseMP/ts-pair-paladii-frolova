// app.ts
import { 
    calculateExpressionSafe, 
    validateExpression, 
    cleanExpression,
    CalculationResult 
} from './mathCalculator';

class CalculatorApp {
    private form: HTMLFormElement;
    private expressionInput: HTMLInputElement;
    private resultDiv: HTMLDivElement;
    private calculateBtn: HTMLButtonElement;

    constructor() {
        this.initializeElements();
        this.setupEventListeners();
    }

    private initializeElements(): void {
        this.form = document.getElementById('calcForm') as HTMLFormElement;
        this.expressionInput = document.getElementById('expression') as HTMLInputElement;
        this.resultDiv = document.getElementById('result') as HTMLDivElement;
        this.calculateBtn = document.getElementById('calculateBtn') as HTMLButtonElement;
    }

    private setupEventListeners(): void {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Очистка поля ввода при фокусе
        this.expressionInput.addEventListener('focus', () => {
            this.cleanInput();
        });

        // Валидация в реальном времени
        this.expressionInput.addEventListener('input', () => {
            this.validateInput();
        });

        // Примеры выражений
        document.querySelectorAll('.example-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const expr = (e.target as HTMLButtonElement).dataset.expr;
                if (expr) {
                    this.expressionInput.value = expr;
                    this.validateInput();
                }
            });
        });
    }

    private cleanInput(): void {
        // Используем функцию очистки из mathCalculator
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
        
        if (!expression) {
            this.showError("Пожалуйста, введите выражение");
            return;
        }

        this.calculateBtn.disabled = true;
        this.calculateBtn.textContent = 'Вычисление...';

        // Используем функцию вычисления из mathCalculator
        setTimeout(() => {
            const result: CalculationResult = calculateExpressionSafe(expression);
            this.displayResult(result);
            this.calculateBtn.disabled = false;
            this.calculateBtn.textContent = 'Вычислить';
        }, 500);
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
    }

    private showError(message: string): void {
        this.resultDiv.innerHTML = `<strong>Ошибка:</strong> ${message}`;
        this.resultDiv.className = 'result error';
        this.resultDiv.style.display = 'block';
    }
}

// Инициализация приложения после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    new CalculatorApp();
});