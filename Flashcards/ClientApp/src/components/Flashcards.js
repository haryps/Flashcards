"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
require("./album.css");
var Flashcards = function () { return (React.createElement("section", { className: "jumbotron text-center" },
    React.createElement("div", { className: "container" },
        React.createElement("h1", { className: "jumbotron-heading" }, "Album example"),
        React.createElement("p", { className: "lead text-muted" }, "Something short and leading about the collection below\u2014its contents, the creator, etc. Make it short and sweet, but not too short so folks don't simply skip over it entirely."),
        React.createElement("p", null,
            React.createElement("a", { href: "#", className: "btn btn-primary my-2" }, "Main call to action"),
            React.createElement("a", { href: "#", className: "btn btn-secondary my-2" }, "Secondary action"))))); };
exports.default = react_redux_1.connect()(Flashcards);
//# sourceMappingURL=Flashcards.js.map