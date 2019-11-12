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
require("./NavMenu.css");
var Introduction = /** @class */ (function (_super) {
    __extends(Introduction, _super);
    function Introduction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isOpen: false
        };
        _this.toggle = function () {
            _this.setState({
                isOpen: !_this.state.isOpen
            });
        };
        return _this;
    }
    Introduction.prototype.render = function () {
        return (React.createElement("header", null,
            React.createElement("section", null,
                React.createElement("div", null,
                    React.createElement("h1", null, "Album example"),
                    React.createElement("p", null, "Something short and leading about the collection below\u2014its contents, the creator, etc. Make it short and sweet, but not too short so folks don't simply skip over it entirely."),
                    React.createElement("p", null,
                        React.createElement("a", null, "Main call to action"),
                        React.createElement("a", null, "Secondary action"))))));
    };
    return Introduction;
}(React.PureComponent));
exports.default = Introduction;
//# sourceMappingURL=Introduction.js.map