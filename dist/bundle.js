'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var inquirer = require('inquirer');
var fs = _interopDefault(require('fs'));

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var copy = function (src, dst) {
    var paths = fs.readdirSync(src); //同步读取当前目录
    paths.forEach(function (path) {
        var _src = src + '/' + path;
        var _dst = dst + '/' + path;
        fs.stat(_src, function (err, stats) {
            if (err)
                throw err;
            if (stats.isFile()) { //如果是个文件则拷贝 
                var readable = fs.createReadStream(_src); //创建读取流
                var writable = fs.createWriteStream(_dst); //创建写入流
                readable.pipe(writable);
            }
            else if (stats.isDirectory()) { //是目录则 递归 
                checkDirectory(_src, _dst, copy);
            }
        });
    });
};
var checkDirectory = function (src, dst, callback) {
    fs.access(dst, fs.constants.F_OK, function (err) {
        if (err) {
            fs.mkdirSync(dst);
            callback(src, dst);
        }
        else {
            callback(src, dst);
        }
    });
};

var cwd = process.cwd() + '/';
var Create = function () {
    var promptList = [
        {
            type: 'input',
            name: 'name',
            message: 'Set your project name: ',
            default: 'my-project'
        },
        {
            type: 'input',
            name: 'version',
            message: 'Set your project version: ',
            default: '1.0.0'
        },
        {
            type: 'input',
            name: 'description',
            message: 'Set your project description: ',
            default: 'description'
        },
        {
            type: 'input',
            name: 'keywords',
            message: "Set your project keywords (Separated by spaces): ",
            default: 'key'
        },
        {
            type: 'list',
            name: 'frame',
            message: 'Choose your frame: ',
            choices: ['react-init']
        }
    ];
    inquirer.prompt(promptList).then(function (_a) {
        var name = _a.name, version = _a.version, description = _a.description, keywords = _a.keywords, frame = _a.frame;
        var input = cwd + 'dist/templist/' + frame;
        new Promise(function (res) {
            checkDirectory(input, cwd + name, copy);
            res();
        }).then(function () {
            var packagePath = input + '/package.json';
            var _package = require(packagePath);
            var newPackage = __assign(__assign({}, _package), { name: name, version: version, description: description, keywords: keywords });
            fs.writeFileSync(packagePath, JSON.stringify(newPackage, null, 4), 'utf-8');
        });
    });
};

var main = {
    create: Create
};

module.exports = main;
