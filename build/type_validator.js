"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDigitaljs = exports.asDigitaljs = exports.assertIsDigitaljs = exports.isDigitaljs = void 0;
var ajv_1 = __importDefault(require("ajv"));
var schema_1 = __importDefault(require("./schema"));
var pretty_str = function (obj) { return JSON.stringify(obj, undefined, 4); };
var ajv = new ajv_1.default({ jsonPointers: true });
var validate = ajv.compile(schema_1.default);
var isDigitaljs = function (obj) {
    if (validate(obj))
        return true;
    else {
        return false;
    }
};
exports.isDigitaljs = isDigitaljs;
var assertIsDigitaljs = function (obj) {
    if (validate(obj)) {
        return true;
    }
    throw new Error("\n  Failed to validate: \n" + pretty_str(obj) + "\n  with errors: \n" + pretty_str(validate.errors) + "\n");
};
exports.assertIsDigitaljs = assertIsDigitaljs;
var asDigitaljs = function (obj) {
    if (validate(obj)) {
        var djs = obj;
        return djs;
    }
    else
        throw new Error("\n  Failed to validate: \n" + pretty_str(obj) + "\n  with errors: \n" + pretty_str(validate.errors) + "\n");
};
exports.asDigitaljs = asDigitaljs;
var parseDigitaljs = function (text) {
    var json = JSON.parse(text);
    if (exports.isDigitaljs(json))
        return json;
    else
        throw "Failed to validate against digitaljs schema";
};
exports.parseDigitaljs = parseDigitaljs;
