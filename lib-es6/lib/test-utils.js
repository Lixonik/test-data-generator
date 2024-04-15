import { v4 as uuidGenerator } from 'uuid';
import { generatePreparedRuTrie, generatePreparedTrie, CPartNameOpts, CStringOpts, CNumberOpts, } from './utils';
import { PERSONS as PERSONS_RU } from './persons/ru/persons';
import { PERSONS as PERSONS_EN } from './persons/en/persons';
var tries = {
    ru: generatePreparedRuTrie(),
    en: generatePreparedTrie(),
};
var uuidCounter = 0;
var personsListRu = PERSONS_RU;
var personsListEn = PERSONS_EN;
export var generateUUID = function (strictRandom) {
    if (strictRandom === void 0) { strictRandom = false; }
    if (strictRandom)
        return uuidGenerator();
    var currentUuidCounter = uuidCounter.toString(16);
    uuidCounter++;
    if (uuidCounter === 4096) {
        uuidCounter = 0;
    }
    var counterString = currentUuidCounter.padStart(3, '0');
    var baseUUID = 'f-ffff-ffff-ffff-ffffffffffff';
    var customUUID = "".concat(counterString).concat(baseUUID);
    return customUUID;
};
export var generateMeaningfulString = function (length, separator) {
    return tries.en.getRandomFullString(length, separator);
};
export var generateMeaningfulRuString = function (length, separator) {
    return tries.ru.getRandomFullString(length, separator);
};
export var generateRandomString = function (opts) {
    if (opts === void 0) { opts = {}; }
    var _a = new CStringOpts(opts), charSet = _a.charSet, length = _a.length;
    var charSetLength = charSet.length;
    var buffer = new Uint8Array(length);
    crypto.getRandomValues(buffer);
    var result = '';
    for (var i = 0; i < length; i++) {
        var randomIndex = Math.floor(buffer[i] / 256 * charSetLength);
        result += charSet[randomIndex];
    }
    return result;
};
export var generateRandomNumber = function (opts) {
    if (opts === void 0) { opts = {}; }
    var _a = new CNumberOpts(opts), min = _a.min, max = _a.max;
    if (max < min) {
        throw new Error('the maximum limit must be greater than the minimum!');
    }
    var range = max - min + 1;
    return Math.floor(Math.random() * range) + min;
};
/**
 * Declines the given Russian word based on its type and case.
 */
var declineWord = function (word, type, gender, padej) {
    var declensionRules = {
        name: {
            'male': {
                nominative: '', // Иван
                genitive: 'а', // Ивана
                dative: 'у', // Ивану
                accusative: 'а', // Ивана
                instrumental: 'ом', // Иваном
                prepositional: 'е', // Иване
            },
            'female': {
                nominative: '', // Мария
                genitive: 'и', // Марии
                dative: 'и', // Марии
                accusative: 'ю', // Марию
                instrumental: 'ей', // Марией
                prepositional: 'и', // Марии
            },
        },
        surname: {
            'male': {
                nominative: '', // Смирнов
                genitive: 'а', // Смирнова
                dative: 'у', // Смирнову
                accusative: 'а', // Смирнова
                instrumental: 'ом', // Смирновым
                prepositional: 'е', // Смирнове
            },
            'female': {
                nominative: '', // Смирнова
                genitive: 'ой', // Смирновой
                dative: 'ой', // Смирновой
                accusative: 'у', // Смирнову
                instrumental: 'ой', // Смирновой
                prepositional: 'ой', // Смирновой
            },
        },
        patronymic: {
            'male': {
                nominative: '', // Петрович
                genitive: 'а', // Петровича
                dative: 'у', // Петровичу
                accusative: 'а', // Петровича
                instrumental: 'ем', // Петровичем
                prepositional: 'е', // Петровиче
            },
            'female': {
                nominative: '', // Петровна
                genitive: 'ы', // Петровны
                dative: 'е', // Петровне
                accusative: 'у', // Петровну
                instrumental: 'ой', // Петровной
                prepositional: 'е', // Петровне
            },
        },
    };
    if (declensionRules[type][gender][padej]) {
        var suffix = declensionRules[type][gender][padej];
        if (type === 'name') {
            if (['ий', 'ия'].includes(word.slice(-2)) && gender === 'male' && padej !== 'nominative') {
                return "".concat(word.slice(0, -2), "\u0438").concat(suffix);
            }
            if (['ия'].includes(word.slice(-2)) && gender === 'female' && padej !== 'nominative') {
                return "".concat(word.slice(0, -1)).concat(suffix);
            }
            if (['genitive', 'dative', 'instrumental', 'prepositional'].includes(padej) && ['й', 'ь'].includes(word.slice(-1))) {
                return "".concat(word.slice(0, -1)).concat(suffix);
            }
        }
        // Names ending with a consonant need to be softened in some cases
        return word + suffix;
    }
    return word;
};
/**
 * @param opts - Options object for length, gender, and type of name component
 * @param padej - The grammatical case in Russian
 */
export var generatePerson = function (opts) {
    if (opts === void 0) { opts = {}; }
    var _a = new CPartNameOpts(opts), type = _a.type, length = _a.length, gender = _a.gender, padej = _a.padej, language = _a.language;
    var lengthList;
    switch (language) {
        case 'ru':
            lengthList = personsListRu[type][gender][length];
            break;
        case 'en':
            lengthList = personsListEn[type][gender][length];
            break;
        default:
            throw new Error('undefined language');
    }
    // Choose a random name, surname or patronymic based on length and gender
    var chosenWord = lengthList[Math.floor(Math.random() * lengthList.length)];
    // Decline the chosen word according to the specified case.
    return language === 'ru' ? declineWord(chosenWord, type, gender, padej) : chosenWord;
};
