"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var Introduction = /** @class */ (function (_super) {
    __extends(Introduction, _super);
    function Introduction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Introduction.prototype.render = function () {
        return (React.createElement(React.Fragment, null,
            React.createElement("section", { className: "jumbotron text-center" },
                React.createElement("div", { className: "container" },
                    React.createElement("h1", { className: "jumbotron-heading" }, "GRE Vocabulary Flashcards")))));
    };
    return Introduction;
}(React.PureComponent));
;
exports.default = react_redux_1.connect()(Introduction);
//# sourceMappingURL=Introduction.js.map