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
var GridDeck_1 = require("./GridDeck");
var Grid = /** @class */ (function (_super) {
    __extends(Grid, _super);
    function Grid() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Grid.prototype.render = function () {
        return (React.createElement(React.Fragment, null, this.renderGridDecks()));
    };
    Grid.prototype.renderGridDecks = function () {
        var decks = [];
        for (var i = 1; i <= 18; i++) {
            decks.push(React.createElement(GridDeck_1.default, { index: i }));
        }
        return decks;
    };
    return Grid;
}(React.PureComponent));
;
exports.default = react_redux_1.connect()(Grid);
//# sourceMappingURL=Grid.js.map