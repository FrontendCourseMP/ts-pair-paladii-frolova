"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processNameForm = processNameForm;
exports.parseName = parseName;
exports.validateNames = validateNames;
exports.formatInitials = formatInitials;
function processNameForm(lastName, firstName, middleName = '') {
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
function parseName(name) {
    return name
        .trim()
        .replace(/\s+/g, ' ')
        .split(' ')
        .map(word => {
        if (!word)
            return '';
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
        .join(' ');
}
function validateNames(lastName, firstName, middleName) {
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
function formatInitials(lastName, firstName, middleName) {
    const firstInitial = firstName.charAt(0) + '.';
    const middleInitial = middleName ? middleName.charAt(0) + '.' : '';
    return `${lastName} ${firstInitial}${middleInitial}`.trim();
}
if (typeof window !== 'undefined') {
    window.processNameForm = processNameForm;
}
