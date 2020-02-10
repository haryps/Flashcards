"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
require("./album.css");
var Introduction_1 = require("./Introduction");
var Grid_1 = require("./Grid");
var Flashcards = function () { return (React.createElement("main", { role: "main" },
    React.createElement(Introduction_1.default, null),
    React.createElement("div", { className: "album py-5 bg-light" },
        React.createElement("div", { className: "container" },
            React.createElement("div", { className: "row" },
                React.createElement(Grid_1.default, null)))))); };
exports.default = react_redux_1.connect()(Flashcards);
//# sourceMappingURL=Flashcards.js.map