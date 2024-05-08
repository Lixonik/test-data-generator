"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMeaningfulString = exports.generatePerson = exports.generateString = exports.generateNumber = exports.generateUUID = void 0;
var utils_1 = require("./utils");
var persons_1 = require("./persons/ru/persons");
var persons_2 = require("./persons/en/persons");
var init_classes_1 = require("./init-classes");
var tries = {
    ru: (0, utils_1.generatePreparedRuTrie)(),
    en: (0, utils_1.generatePreparedTrie)(),
};
var personsListRu = persons_1.PERSONS;
var personsListEn = persons_2.PERSONS;
var uuidCounter = 0;
var generateUUID = function (strictRandom) {
    if (strictRandom === void 0) { strictRandom = false; }
    if (strictRandom)
        return crypto.randomUUID();
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
exports.generateUUID = generateUUID;
var generateNumber = function (opts) {
    if (opts === void 0) { opts = {}; }
    var _a = new init_classes_1.CNumberOpts(opts), min = _a.min, max = _a.max;
    if (max < min) {
        throw new Error('the maximum limit must be greater than the minimum!');
    }
    var range = max - min + 1;
    return Math.floor(Math.random() * range) + min;
};
exports.generateNumber = generateNumber;
var generateString = function (opts) {
    if (opts === void 0) { opts = {}; }
    var _a = new init_classes_1.CStringOpts(opts), charSet = _a.charSet, length = _a.length;
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
exports.generateString = generateString;
/**
 * @param opts - Options object for length, gender, and type of name component
 * @param padej - The grammatical case in Russian
 */
var generatePerson = function (opts) {
    if (opts === void 0) { opts = {}; }
    var _a = new init_classes_1.CPartNameOpts(opts), type = _a.type, length = _a.length, gender = _a.gender, padej = _a.padej, language = _a.language;
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
    return language === 'ru' ? (0, utils_1.declineWord)(chosenWord, type, gender, padej) : chosenWord;
};
exports.generatePerson = generatePerson;
var generateMeaningfulString = function (opts) {
    if (opts === void 0) { opts = {}; }
    var _a = new init_classes_1.CMeaningfulStringOpts(opts), length = _a.length, separator = _a.separator, language = _a.language;
    switch (language) {
        case 'en':
            return tries.en.getRandomFullString(length, separator);
        case 'ru':
            return tries.ru.getRandomFullString(length, separator);
        default:
            throw new Error("Unsupported language: ".concat(language));
    }
};
exports.generateMeaningfulString = generateMeaningfulString;
