"use strict";
/**
 * initialization classes
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CMeaningfulStringOpts = exports.CNumberOpts = exports.CStringOpts = exports.CPartNameOpts = void 0;
var constants_1 = require("./constants");
var CPartNameOpts = /** @class */ (function () {
    function CPartNameOpts(opts) {
        this.gender = 'male';
        this.type = 'surname';
        this.length = 'medium';
        this.language = 'en';
        this.padej = 'nominative';
        Object.assign(this, opts);
    }
    return CPartNameOpts;
}());
exports.CPartNameOpts = CPartNameOpts;
var CStringOpts = /** @class */ (function () {
    function CStringOpts(opts) {
        this.charSet = constants_1.ENGLISH_ALPHABET;
        this.length = 5;
        Object.assign(this, opts);
    }
    return CStringOpts;
}());
exports.CStringOpts = CStringOpts;
var CNumberOpts = /** @class */ (function () {
    function CNumberOpts(opts) {
        this.min = 0;
        this.max = 100;
        Object.assign(this, opts);
    }
    return CNumberOpts;
}());
exports.CNumberOpts = CNumberOpts;
var CMeaningfulStringOpts = /** @class */ (function () {
    function CMeaningfulStringOpts(opts) {
        this.length = 5;
        this.language = 'en';
        this.separator = '';
        Object.assign(this, opts);
    }
    return CMeaningfulStringOpts;
}());
exports.CMeaningfulStringOpts = CMeaningfulStringOpts;
