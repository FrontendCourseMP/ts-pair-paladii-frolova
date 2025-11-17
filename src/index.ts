/**
 * @param lastName - Фамилия
 * @param firstName - Имя  
 * @param middleName - Отчество (опционально)
 * @returns 
 */
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

/**
 * @param name - Имя для парсинга
 * @returns Очищенное имя
 */
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

/**
 * @param lastName - Фамилия
 * @param firstName - Имя
 * @param middleName - Отчество
 * @returns 
 */
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

/**
 * @param lastName - Фамилия
 * @param firstName - Имя
 * @param middleName - Отчество
 * @returns Строка в формате "Фамилия И.О."
 */
function formatInitials(lastName: string, firstName: string, middleName: string): string {
    const firstInitial = firstName.charAt(0) + '.';
    const middleInitial = middleName ? middleName.charAt(0) + '.' : '';
    return `${lastName} ${firstInitial}${middleInitial}`.trim();
}

export { processNameForm, parseName, validateNames, formatInitials };

class NameProcessor {
    /**
     * @param lastName - Фамилия
     * @param firstName - Имя  
     * @param middleName - Отчество (опционально)
     * @returns 
     */
    static processNameForm(lastName: string, firstName: string, middleName: string = ''): string {
        if (!lastName.trim() || !firstName.trim()) {
            return 'Ошибка: Фамилия и имя обязательны для заполнения';
        }
        const parsedLastName = NameProcessor.parseName(lastName);
        const parsedFirstName = NameProcessor.parseName(firstName);
        const parsedMiddleName = middleName ? NameProcessor.parseName(middleName) : '';
        const validationResult = NameProcessor.validateNames(parsedLastName, parsedFirstName, parsedMiddleName);
        if (validationResult !== true) {
            return validationResult;
        }
        return NameProcessor.formatInitials(parsedLastName, parsedFirstName, parsedMiddleName);
    }

    /**
     * @param name - Имя для парсинга
     * @returns Очищенное имя
     */
    private static parseName(name: string): string {
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

    /**
     * @param lastName - Фамилия
     * @param firstName - Имя
     * @param middleName - Отчество
     * @returns 
     */
    private static validateNames(lastName: string, firstName: string, middleName: string): true | string {
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

    /**
     * @param lastName - Фамилия
     * @param firstName - Имя
     * @param middleName - Отчество
     * @returns Строка в формате "Фамилия И.О."
     */
    private static formatInitials(lastName: string, firstName: string, middleName: string): string {
        const firstInitial = firstName.charAt(0) + '.';
        const middleInitial = middleName ? middleName.charAt(0) + '.' : '';
        return `${lastName} ${firstInitial}${middleInitial}`.trim();
    }
}

export { NameProcessor };

const NameUtils = {
    /**
     * @param lastName - Фамилия
     * @param firstName - Имя  
     * @param middleName - Отчество (опционально)
     * @returns 
     */
    processNameForm(lastName: string, firstName: string, middleName: string = ''): string {
        if (!lastName.trim() || !firstName.trim()) {
            return 'Ошибка: Фамилия и имя обязательны для заполнения';
        }
        const parsedLastName = NameUtils.parseName(lastName);
        const parsedFirstName = NameUtils.parseName(firstName);
        const parsedMiddleName = middleName ? NameUtils.parseName(middleName) : '';
        const validationResult = NameUtils.validateNames(parsedLastName, parsedFirstName, parsedMiddleName);
        if (validationResult !== true) {
            return validationResult;
        }
        return NameUtils.formatInitials(parsedLastName, parsedFirstName, parsedMiddleName);
    },

    /**
     * @param name - Имя для парсинга
     * @returns Очищенное имя
     */
    parseName(name: string): string {
        return name
            .trim()
            .replace(/\s+/g, ' ')
            .split(' ')
            .map(word => {
                if (!word) return '';
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            })
            .join(' ');
    },

    /**
     * @param lastName - Фамилия
     * @param firstName - Имя
     * @param middleName - Отчество
     * @returns 
     */
    validateNames(lastName: string, firstName: string, middleName: string): true | string {
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
    },

    /**
     * @param lastName - Фамилия
     * @param firstName - Имя
     * @param middleName - Отчество
     * @returns Строка в формате "Фамилия И.О."
     */
    formatInitials(lastName: string, firstName: string, middleName: string): string {
        const firstInitial = firstName.charAt(0) + '.';
        const middleInitial = middleName ? middleName.charAt(0) + '.' : '';
        return `${lastName} ${firstInitial}${middleInitial}`.trim();
    }
};

export { NameUtils };


// export class MathCalc {
//    private allowedChars: Set<string> = new Set('0123456789.+* '.split(''));
//    public cleanExpression(expression: string): string {
//         if (!expression) {
//             return "";
//         }
//         const cleaned = expression
//             .split('')
//             .filter(char => this.allowedChars.has(char))
//             .join('');
        
//         return cleaned.replace(/\s+/g, '');
//     }
//    private parseExpression(expression:string): {numbers: number[], operators: string[]} {
      
//    }

// }


