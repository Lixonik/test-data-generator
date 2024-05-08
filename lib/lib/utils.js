"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNil = exports.declineWord = exports.generatePreparedRuTrie = exports.generatePreparedTrie = exports.shuffleArray = void 0;
var trie_1 = require("./trie/trie");
var dictionary_1 = require("./locales/en/dictionary");
var dictionary_2 = require("./locales/ru/dictionary");
/**
 * Fisher-Yates Sorting Algorithm
 * https://www.freecodecamp.org/news/how-to-shuffle-an-array-of-items-using-javascript-or-typescript/
 * @param array
 */
function shuffleArray(array) {
    var _a;
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = __read([array[j], array[i]], 2), array[i] = _a[0], array[j] = _a[1];
    }
    return array;
}
exports.shuffleArray = shuffleArray;
var generatePreparedTrie = function () {
    var trie = new trie_1.Trie();
    trie.insertDictionary(dictionary_1.PREFIXES, dictionary_1.WORDS, dictionary_1.SUFFIXES);
    return trie;
};
exports.generatePreparedTrie = generatePreparedTrie;
var generatePreparedRuTrie = function () {
    var trie = new trie_1.Trie();
    trie.insertDictionary(dictionary_2.PREFIXES, dictionary_2.WORDS, dictionary_2.SUFFIXES);
    return trie;
};
exports.generatePreparedRuTrie = generatePreparedRuTrie;
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
exports.declineWord = declineWord;
var isNil = function (value) { return value === undefined || value === null; };
exports.isNil = isNil;
